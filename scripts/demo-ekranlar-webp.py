"""Gercek 3.30 ekranlarini dilimlere ayirir (mesaj/kart bloklari) ve site icin webp uretir.
Cikti: bands.json  {lang: {screen: {hb, ib, bg, bands:[[y0,y1],...]}}}  (oranlar 0..1)
"""
import json, sys
from PIL import Image
import numpy as np

SRC = r'C:/projelerim/PROJELERİM/marketing/unutma/magaza-3.30/ham'
OUT_IMG = r'C:/projelerim/PROJELERİM/UNUTTUM MU APP/.vscode/unutma-blog/public/img/app/v330'
OUT_JSON = sys.argv[1]

# ekran: (icerik bolgesi ust siniri arama baslangici, alt sinir arama) piksel @2796
SCREENS = {
    'e-home': None,
    'a2-ask': 'chat', 'a2': 'chat', 'a1-bday': 'chat', 'a3': 'chat',
    'a4-ask': 'chat', 'a4': 'chat',
    'e-actions': 'list', 'e-reminders': 'list', 'e-economy': 'list',
}

def analyse(a, kind):
    H, W, _ = a.shape
    if kind == 'chat':
        # sohbet zemini: ortadaki bos alan rengi
        bg = np.median(a[600:700, 20:60].reshape(-1, 3), axis=0)
        hb = 230  # ust cubuk alti
        # giris kutusu ustu: alttan yukari ilk tamamen zemin satiri
        y = H - 300
        while y > H // 2 and not row_bg(a[y], bg):
            y -= 1
        ib = y
    else:
        bg = None
        hb = ib = 0
    return bg, hb, ib

def row_bg(row, bg, tol=10):
    return np.all(np.abs(row.astype(int) - bg.astype(int)).max(axis=1) <= tol)

def blocks(a, bg, y0, y1, gap=14, tol=10):
    out, start, last = [], None, None
    for y in range(y0, y1):
        if row_bg(a[y], bg, tol):
            continue
        if start is None:
            start = y
        elif y - last > gap:
            out.append([start, last + 1]); start = y
        last = y
    if start is not None:
        out.append([start, last + 1])
    return out

res = {}
for lang in ['tr', 'en']:
    res[lang] = {}
    for name, kind in SCREENS.items():
        im = Image.open(f'{SRC}/{lang}/{name}.png').convert('RGB')
        a = np.asarray(im)
        H, W, _ = a.shape
        info = {'w': W, 'h': H}
        if kind == 'chat':
            bg, hb, ib = analyse(a, kind)
            bl = blocks(a, bg, hb, ib)
            info.update(bg='#%02x%02x%02x' % tuple(int(v) for v in bg), hb=hb / H, ib=ib / H,
                        bands=[[round((b0 - 6) / H, 5), round((b1 + 6) / H, 5)] for b0, b1 in bl], px=bl, ibpx=ib)
        elif kind == 'list':
            bg = np.median(a[H // 2:H // 2 + 40, 4:12].reshape(-1, 3), axis=0)
            info['bg'] = '#%02x%02x%02x' % tuple(int(v) for v in bg)
        res[lang][name] = info
        small = im.resize((720, round(H * 720 / W)), Image.LANCZOS)
        small.save(f'{OUT_IMG}/{lang}/{name}.webp', 'WEBP', quality=82, method=6)
json.dump(res, open(OUT_JSON, 'w'), indent=1)
for lang in res:
    for n, i in res[lang].items():
        if 'px' in i:
            print(lang, n, 'bg', i['bg'], 'ib', i['ibpx'], i['px'])
