#!/usr/bin/env python3
"""
Unutma Blog - SEO Content Generator
Generates SEO-optimized blog posts using Claude API.
Posts are saved as Astro-compatible .md files.
"""

import json
import os
import re
import sys
from datetime import datetime
from pathlib import Path

# ─── CONFIG ───────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
BLOG_CONTENT_DIR = REPO_ROOT / "src" / "content" / "blog"

# unutma-blog/.env içinden ANTHROPIC_API_KEY (Git’e girmez — .gitignore)
try:
    from dotenv import load_dotenv

    load_dotenv(REPO_ROOT / ".env")
except ImportError:
    pass
MODEL = "claude-sonnet-4-20250514"
MAX_TOKENS = 4000

UNUTMA_LINKS = {
    "play_store": os.environ.get(
        "PLAY_STORE_URL",
        "https://play.google.com/store/apps/details?id=com.mehmet.unutma",
    ),
    "app_store": os.environ.get(
        "APP_STORE_URL",
        "https://apps.apple.com/app/unutma/id674480934",
    ),
}


def cover_for_slug(slug: str) -> int:
    h = 0
    for c in slug:
        h = (31 * h + ord(c)) & 0xFFFFFFFF
    return (abs(h) % 4) + 1

SYSTEM_PROMPT = """You are an expert SEO blog writer for a productivity and personal organization blog.

BLOG CONTEXT:
- The blog belongs to "Unutma", a privacy-first, offline personal organization app
- Unutma features: to-do lists, journal, password vault, wishlist, finance tracker, routines, quick-action logging, mini games
- Key selling points: no account required, all data stored on-device, 8-language support, works offline
- Available on both Google Play and App Store

WRITING RULES:
1. Write in a natural, helpful, engaging tone — NOT robotic or salesy
2. Target the given keyword naturally — use it in the title, first paragraph, and 2-3 subheadings
3. Include 1-2 natural mentions of Unutma as a solution (NOT forced — only where it genuinely fits)
4. Article length: 1200-1800 words
5. Use H2 and H3 subheadings for structure
6. Include a compelling meta description (150-160 chars)
7. Add a short, actionable conclusion
8. Write for humans first, SEO second
9. Include a "Key Takeaways" or "Quick Tips" section somewhere in the article
10. End with a question to encourage comments/engagement
11. Include 2-3 internal links to other blog paths like /blog/welcome-to-unutma-blog/ as markdown links where relevant

OUTPUT FORMAT (strict JSON):
{
  "title": "SEO-optimized title with keyword",
  "slug": "url-friendly-slug",
  "description": "Meta description 150-160 chars",
  "tags": ["tag1", "tag2", "tag3"],
  "content": "Full markdown article content (H2 = ##, H3 = ###)"
}

Respond ONLY with valid JSON. No markdown fences, no preamble."""


def generate_post(keyword: str, extra_context: str = "") -> dict:
    import anthropic

    api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not api_key:
        raise ValueError("ANTHROPIC_API_KEY boş")
    # Baş/son boşluk veya yanlış yapıştırma 401 verir
    client = anthropic.Anthropic(api_key=api_key)

    user_prompt = f"""Write a comprehensive, SEO-optimized blog post targeting this keyword:

KEYWORD: {keyword}

{f"ADDITIONAL CONTEXT: {extra_context}" if extra_context else ""}

Remember:
- Natural Unutma mentions (1-2 max, only where relevant)
- 1200-1800 words
- Engaging, human tone
- Actionable advice
- Proper heading structure"""

    message = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    )

    response_text = message.content[0].text

    try:
        post_data = json.loads(response_text)
    except json.JSONDecodeError:
        json_match = re.search(r"\{[\s\S]+\}", response_text)
        if json_match:
            post_data = json.loads(json_match.group())
        else:
            raise ValueError(f"Could not parse response as JSON:\n{response_text[:500]}") from None

    return post_data


def save_as_astro_md(post_data: dict, content_dir: Path = BLOG_CONTENT_DIR) -> Path:
    content_dir.mkdir(parents=True, exist_ok=True)

    slug = post_data["slug"]
    date_str = datetime.now().strftime("%Y-%m-%d")

    tags_json = json.dumps(post_data["tags"])
    title_esc = post_data["title"].replace('"', '\\"')
    desc_esc = post_data["description"].replace('"', '\\"')
    cover_n = cover_for_slug(slug)

    frontmatter = f"""---
title: "{title_esc}"
description: "{desc_esc}"
pubDate: {date_str}
tags: {tags_json}
image: /blog/covers/cover-{cover_n}.svg
draft: false
---"""

    cta_section = f"""

---

**Ready to get organized?** [Download Unutma]({UNUTMA_LINKS['play_store']}) — free, offline, and private. Available on [Google Play]({UNUTMA_LINKS['play_store']}) and [App Store]({UNUTMA_LINKS['app_store']}).
"""

    full_content = f"{frontmatter}\n\n{post_data['content']}\n{cta_section}"

    # Filename = slug only so URLs stay /blog/{slug}/ (date lives in frontmatter)
    filepath = content_dir / f"{slug}.md"
    filepath.write_text(full_content, encoding="utf-8")

    return filepath


def load_keywords(filepath: str | None = None) -> list[str]:
    path = Path(filepath) if filepath else SCRIPT_DIR / "keywords.txt"
    if not path.exists():
        return []
    return [
        line.strip()
        for line in path.read_text(encoding="utf-8").splitlines()
        if line.strip() and not line.strip().startswith("#")
    ]


def main() -> None:
    if not os.environ.get("ANTHROPIC_API_KEY", "").strip():
        env_file = REPO_ROOT / ".env"
        print("ANTHROPIC_API_KEY bulunamadı (ortam değişkeni boş).\n")
        if not env_file.exists():
            print(f"  Beklenen dosya yok: {env_file}")
            print("  Çözüm: .env.example → .env kopyala, içine şunu ekle:")
            print("  ANTHROPIC_API_KEY=sk-ant-api03-...\n")
        else:
            print(f"  Dosya var: {env_file}")
            print("  Kontrol: satır ANTHROPIC_API_KEY= ile başlasın, başta/sonda boşluk olmasın.")
            print("  Not: Anahtarı tırnak içinde yazdıysan bazen sorun çıkar; tırnaksız dene.\n")
        print("  Alternatif (PowerShell, sadece o oturum için):")
        print('  $env:ANTHROPIC_API_KEY = "sk-ant-api03-..."\n')
        sys.exit(1)

    if len(sys.argv) > 1:
        keyword = " ".join(sys.argv[1:])
        keywords = [keyword]
    else:
        keywords = load_keywords()
        if not keywords:
            print("Usage: python generate_post.py <keyword>")
            print("   or: Add keywords to scripts/keywords.txt (one per line)")
            sys.exit(1)

    print(f"Generating {len(keywords)} post(s)...\n")

    for i, kw in enumerate(keywords, 1):
        print(f"[{i}/{len(keywords)}] Generating: {kw!r}")
        try:
            post_data = generate_post(kw)
            filepath = save_as_astro_md(post_data)
            print(f"  Saved: {filepath}")
            print(f"  Title: {post_data['title']}\n")
        except Exception as e:
            print(f"  Error: {e}\n")

    print("Done. Commit and push to deploy, or open a PR.")


if __name__ == "__main__":
    main()
