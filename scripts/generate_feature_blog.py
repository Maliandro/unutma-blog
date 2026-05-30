#!/usr/bin/env python3
"""Sunday Unutma feature blog — rotates app features (EN), cloud-friendly."""

from __future__ import annotations

import json
import sys
from datetime import datetime
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from generate_post import generate_post_with_fallback, save_as_astro_md  # noqa: E402

SCRIPT_DIR = Path(__file__).resolve().parent
STATE_FILE = SCRIPT_DIR / "feature_blog_state.json"

FEATURE_TOPICS: list[dict[str, str]] = [
    {
        "key": "hizli eylemler",
        "title_en": "Quick Actions",
        "keyword": "quick action habit tracker for forgetful people",
    },
    {
        "key": "hatirlaticilar",
        "title_en": "Reminders",
        "keyword": "private offline reminder app without account",
    },
    {
        "key": "yapilacaklar",
        "title_en": "To-Do Lists",
        "keyword": "offline to do list app that stays on your phone",
    },
    {
        "key": "gunluk",
        "title_en": "Private Journal",
        "keyword": "private journal app with pin lock offline",
    },
    {
        "key": "sifre kasasi",
        "title_en": "Password Vault",
        "keyword": "offline password manager on device no cloud",
    },
    {
        "key": "istek listesi",
        "title_en": "Wishlist",
        "keyword": "personal wishlist organizer app offline",
    },
    {
        "key": "ekonomi takibi",
        "title_en": "Finance Tracker",
        "keyword": "simple personal finance tracker offline privacy",
    },
    {
        "key": "rutinler",
        "title_en": "Routines",
        "keyword": "daily routine checklist app offline",
    },
    {
        "key": "widgetlar",
        "title_en": "Home Screen Widgets",
        "keyword": "productivity widgets for quick logging habits",
    },
    {
        "key": "offline kullanim",
        "title_en": "Offline Mode",
        "keyword": "offline productivity app no account required",
    },
]


def pick_feature() -> dict[str, str]:
    state = {"index": 0}
    if STATE_FILE.exists():
        try:
            state = json.loads(STATE_FILE.read_text(encoding="utf-8"))
        except Exception:
            pass
    idx = int(state.get("index", 0)) % len(FEATURE_TOPICS)
    topic = FEATURE_TOPICS[idx]
    state["index"] = (idx + 1) % len(FEATURE_TOPICS)
    state["last_feature"] = topic["key"]
    state["last_run"] = datetime.now().isoformat()
    STATE_FILE.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")
    return topic


def build_context(topic: dict[str, str]) -> str:
    return (
        f"This is a Sunday FEATURE SPOTLIGHT for the Unutma app.\n"
        f"Focus feature: {topic['title_en']} ({topic['key']}).\n"
        f"Explain what the feature does, who it helps, 3 practical use cases, "
        f"and how it differs from cloud-heavy apps. Tone: warm, expert, not salesy.\n"
        f"Include a section 'How to try it in Unutma' with step-by-step tips.\n"
        f"Mention Washington DC / busy professional life only if natural."
    )


def main() -> None:
    topic = pick_feature()
    keyword = topic["keyword"]
    context = build_context(topic)
    print(f"Feature spotlight: {topic['title_en']} ({topic['key']})")
    print(f"Keyword: {keyword}\n")

    post, provider = generate_post_with_fallback(keyword, context)
    slug_prefix = f"unutma-feature-{topic['key'].replace(' ', '-')}"
    if not str(post.get("slug", "")).startswith("unutma"):
        post["slug"] = slug_prefix

    path = save_as_astro_md(post)
    print(f"Saved: {path}")
    print(f"Provider: {provider}")
    print(f"Title: {post['title']}")


if __name__ == "__main__":
    main()
