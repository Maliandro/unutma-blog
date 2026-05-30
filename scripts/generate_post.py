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
        "https://apps.apple.com/app/id6758889495",
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

GEMINI_MODEL = os.environ.get("GEMINI_BLOG_MODEL", "gemini-2.0-flash")


def slugify(text: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return slug[:80] or "unutma-post"


def parse_llm_json(response_text: str) -> dict:
    try:
        return json.loads(response_text)
    except json.JSONDecodeError:
        json_match = re.search(r"\{[\s\S]+\}", response_text)
        if json_match:
            return json.loads(json_match.group())
        raise ValueError(f"Could not parse response as JSON:\n{response_text[:500]}") from None


def build_user_prompt(keyword: str, extra_context: str = "") -> str:
    return f"""Write a comprehensive, SEO-optimized blog post targeting this keyword:

KEYWORD: {keyword}

{f"ADDITIONAL CONTEXT: {extra_context}" if extra_context else ""}

Remember:
- Natural Unutma mentions (1-2 max, only where relevant)
- 1200-1800 words
- Engaging, human tone
- Actionable advice
- Proper heading structure"""


def generate_post_claude(keyword: str, extra_context: str = "") -> dict:
    import anthropic

    api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not api_key:
        raise ValueError("ANTHROPIC_API_KEY boş")
    client = anthropic.Anthropic(api_key=api_key)
    message = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": build_user_prompt(keyword, extra_context)}],
    )
    return parse_llm_json(message.content[0].text)


def generate_post_gemini(keyword: str, extra_context: str = "") -> dict:
    import google.generativeai as genai

    api_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if not api_key:
        raise ValueError("GEMINI_API_KEY boş")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel(
        GEMINI_MODEL,
        system_instruction=SYSTEM_PROMPT,
    )
    response = model.generate_content(build_user_prompt(keyword, extra_context))
    return parse_llm_json(response.text)


def generate_post_template(keyword: str, extra_context: str = "") -> dict:
    title = keyword.strip().title()
    if not title:
        title = "Organize Your Private Life with Unutma"
    slug = slugify(keyword or "unutma-private-life-organizer")
    context_line = extra_context.strip()
    content = f"""## Why {title} Matters

{context_line or f"Many people search for help with {keyword.lower()} — not because they are lazy, but because modern life is noisy."}

When reminders live in five different apps, it is easy to miss what matters. A calm, offline-first approach keeps your routines private and under your control.

## What Gets in the Way

- Too many notifications from apps that want your attention
- Cloud accounts and sync friction when you just need a quick log
- Tools that feel like work instead of relief

## How to Build a Simple System

Start with one habit: capture the thought immediately, review once a day, and celebrate small wins. Pair lists with gentle reminders instead of alarm spam.

## Where Unutma Fits

[Unutma](/blog/welcome-to-unutma-blog/) is a privacy-first organizer — to-dos, journal, password vault, wishlists, routines, and quick-action logging — **on your device**, offline, with no ads.

If {keyword.lower()} is part of your daily stress, try dedicating one screen in Unutma to it for a week.

## Key Takeaways

- One trusted place beats five scattered apps
- Offline + on-device storage protects your private life
- Small daily reviews beat perfect systems you never open

## Quick Tips

1. Log quick actions the moment you think of them
2. Keep lists short and actionable
3. Review at the same time each evening

## Your Turn

What is the one thing you forget most often — and would a single private app help?

Read more on the [Unutma blog](/blog/welcome-to-unutma-blog/)."""
    desc = (
        f"Practical guide to {keyword.lower()} with privacy-first tips. "
        "Learn how Unutma helps you stay organized offline."
    )[:160]
    return {
        "title": f"{title}: A Calm, Private Way to Stay Organized",
        "slug": slug,
        "description": desc,
        "tags": ["unutma", "productivity", "privacy"],
        "content": content,
    }


def generate_post_with_fallback(keyword: str, extra_context: str = "") -> tuple[dict, str]:
    errors: list[str] = []
    if os.environ.get("ANTHROPIC_API_KEY", "").strip():
        try:
            return generate_post_claude(keyword, extra_context), "claude"
        except Exception as exc:
            errors.append(f"claude: {exc}")
    if os.environ.get("GEMINI_API_KEY", "").strip():
        try:
            return generate_post_gemini(keyword, extra_context), "gemini"
        except Exception as exc:
            errors.append(f"gemini: {exc}")
    if errors:
        print("LLM fallback chain:", "; ".join(errors))
    return generate_post_template(keyword, extra_context), "template"


def generate_post(keyword: str, extra_context: str = "") -> dict:
    post, _provider = generate_post_with_fallback(keyword, extra_context)
    return post


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
    has_llm = bool(os.environ.get("ANTHROPIC_API_KEY", "").strip()) or bool(
        os.environ.get("GEMINI_API_KEY", "").strip()
    )
    if not has_llm:
        print("No LLM keys found — template fallback will be used.")
        print("Optional secrets: ANTHROPIC_API_KEY and/or GEMINI_API_KEY\n")

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
            post_data, provider = generate_post_with_fallback(kw)
            filepath = save_as_astro_md(post_data)
            print(f"  Saved: {filepath}")
            print(f"  Provider: {provider}")
            print(f"  Title: {post_data['title']}\n")
        except Exception as e:
            print(f"  Error: {e}\n")

    print("Done. Commit and push to deploy, or open a PR.")


if __name__ == "__main__":
    main()
