"""Gercek 3.30 ekranlarindan demo verisi uretir -> src/data/demo-ekranlar.json
Tum olculer gercek PNG'den (1290x2796) piksel analiziyle cikar; oran (0..1) olarak yazilir.
"""
import json, sys
from PIL import Image
import numpy as np

R = r'C:/projelerim/PROJELERİM/marketing/unutma/magaza-3.30/ham/'
OUT = r'C:/projelerim/PROJELERİM/UNUTTUM MU APP/.vscode/unutma-blog/src/data/demo-ekranlar.json'
W, H = 1290, 2796
BG = np.array([248, 250, 248])

def load(lang, n):
    return np.asarray(Image.open(f'{R}{lang}/{n}.png').convert('RGB')).astype(int)

def blocks(a, y0, y1, gap=14, tol=2, x0=0, x1=None, bg=BG):
    out, s, l = [], None, None
    for y in range(y0, y1):
        if (np.abs(a[y, x0:x1] - bg).max(axis=1) <= tol).all():
            continue
        if s is None:
            s = y
        elif y - l > gap:
            out.append([s, l + 1]); s = y
        l = y
    if s is not None:
        out.append([s, l + 1])
    return out

def bbox(mask, x0=0, y0=0):
    ys, xs = np.nonzero(mask)
    return [int(xs.min()) + x0, int(ys.min()) + y0, int(xs.max()) + 1 + x0, int(ys.max()) + 1 + y0]

def fr(v, d):
    return round(v / d, 5)

def rect(b, pad=0):
    x0, y0, x1, y1 = b
    return [fr(x0 - pad, W), fr(y0 - pad, H), fr(x1 + pad, W), fr(y1 + pad, H)]

CHAT_HB, CHAT_IB = 242, 2530

def chat(lang, n, pad=8):
    a = load(lang, n)
    bl = [b for b in blocks(a, CHAT_HB, CHAT_IB, tol=6) if b[1] - b[0] > 6]
    # giris kutusundaki yer tutucu yazi (koyu gri) -> kapatilacak alan
    y0, y1, x0, x1 = 2570, 2690, 170, 1080
    sub = a[y0:y1, x0:x1]
    m = sub.max(axis=2) < 170
    ib = bbox(m, x0, y0)
    return {
        'img': n, 'kind': 'chat', 'hb': fr(CHAT_HB, H), 'ib': fr(CHAT_IB, H), 'bg': '#f8faf8',
        'bands': [[fr(max(CHAT_HB, b0 - pad), H), fr(min(CHAT_IB, b1 + pad), H)] for b0, b1 in bl],
        'input': {'r': rect([ib[0] - 6, ib[1] - 8, 1080, ib[3] + 8]), 'cover': '#ffffff', 'color': '#1d2b24', 'size': fr(ib[3] - ib[1], W)},
        '_px': bl,
    }

def green_btn(a, band):
    """Bant icindeki koyu yesil dolu dugmenin merkezi (Evet / Save all)."""
    y0, y1 = band
    sub = a[y0:y1, 0:700]
    r, g, b = sub[..., 0], sub[..., 1], sub[..., 2]
    m = (g > 95) & (g < 140) & (r < 40) & (b > 55) & (b < 95)
    # en alttaki kume (dugme satiri)
    ys, xs = np.nonzero(m)
    if len(ys) == 0:
        return None
    ymax = ys.max()
    sel = ys > ymax - 90
    return [fr(xs[sel].mean(), W), fr(ys[sel].mean() + y0, H)]

def home(lang):
    a = load(lang, 'e-home')
    # "ya da yaz" kutusu: beyaz yazi, yesil zemin
    y0, y1, x0, x1 = 2050, 2140, 70, 900
    sub = a[y0:y1, x0:x1]
    m = sub.min(axis=2) > 190
    tb = bbox(m, x0, y0)
    cy = (tb[1] + tb[3]) // 2
    cov = a[cy, tb[0] - 14]
    return {
        'img': 'e-home', 'kind': 'plain',
        'input': {'r': rect([tb[0] - 4, tb[1] - 10, 1020, tb[3] + 10]), 'cover': '#%02x%02x%02x' % tuple(cov), 'color': '#ffffff', 'size': fr(tb[3] - tb[1], W)},
        'orb': [0.5, fr(993, H), 0.16],
    }

def listscreen(lang, n, hb, ib):
    a = load(lang, n)
    bl = [b for b in blocks(a, hb, ib, tol=2) if b[1] - b[0] > 6]
    return {'img': n, 'kind': 'list', 'hb': fr(hb, H), 'ib': fr(ib, H), 'bg': '#f8faf8',
            'bands': [[fr(b0 - 6, H), fr(b1 + 6, H)] for b0, b1 in bl], '_px': bl}

def actions(lang):
    a = load(lang, 'e-actions')
    # sag taraftaki saat yazilari (Hizli Eylemler satirlari)
    x0, x1, y0, y1 = 1000, 1215, 1500, 2400
    sub = a[y0:y1, x0:x1]
    dark = (sub.max(axis=2) < 175).any(axis=1)
    runs, s = [], None
    for i, v in enumerate(dark):
        if v and s is None:
            s = i
        if not v and s is not None:
            runs.append([s + y0, i + y0]); s = None
    masks = []
    for ry0, ry1 in runs:
        m = sub[ry0 - y0:ry1 - y0].max(axis=2) < 175
        b = bbox(m, x0, ry0)
        masks.append({'r': rect(b, 6), 'tap': [0.42, fr((b[1] + b[3]) / 2, H)]})
    return {'img': 'e-actions', 'kind': 'plain', 'masks': masks, 'maskColor': '#ffffff'}

data = {}
for lang in ['tr', 'en']:
    L = {}
    L['home'] = home(lang)
    for n in ['a2-ask', 'a2', 'a1-bday', 'a3', 'a4-ask', 'a4']:
        L[n] = chat(lang, n)
    a = load(lang, 'a4-ask')
    L['a4-ask']['tap'] = green_btn(a, L['a4-ask']['_px'][-1])
    if lang == 'en':
        a = load(lang, 'a2-ask')
        L['a2-ask']['tap'] = green_btn(a, L['a2-ask']['_px'][-1])
    L['e-actions'] = actions(lang)
    L['e-reminders'] = listscreen(lang, 'e-reminders', 258, 2246)
    L['e-economy'] = listscreen(lang, 'e-economy', 446, 2014)
    data[lang] = L

for lang in data:
    for k, v in data[lang].items():
        print(lang, k, v.get('_px'), v.get('tap'), v.get('input'), v.get('masks'))
for lang in data:
    for v in data[lang].values():
        v.pop('_px', None)
json.dump(data, open(OUT, 'w', encoding='utf-8'), indent=1)
