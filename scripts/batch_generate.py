#!/usr/bin/env python3
"""
Batch content generator — run daily via cron or GitHub Actions.
Generates N posts from keywords.txt. Git commit is handled by CI (see generate.yml).
"""

import os
import sys
from pathlib import Path

# Allow imports from scripts/
sys.path.insert(0, str(Path(__file__).resolve().parent))

from generate_post import generate_post, load_keywords, save_as_astro_md  # noqa: E402

SCRIPT_DIR = Path(__file__).resolve().parent
USED_KEYWORDS_FILE = SCRIPT_DIR / "keywords_used.txt"
POSTS_PER_BATCH = 3


def get_used_keywords() -> set[str]:
    if USED_KEYWORDS_FILE.exists():
        return set(USED_KEYWORDS_FILE.read_text(encoding="utf-8").splitlines())
    return set()


def mark_keyword_used(keyword: str) -> None:
    with USED_KEYWORDS_FILE.open("a", encoding="utf-8") as f:
        f.write(keyword + "\n")


def main() -> None:
    all_keywords = load_keywords()
    used = get_used_keywords()
    remaining = [kw for kw in all_keywords if kw not in used]

    if not remaining:
        print("All keywords used! Add more to scripts/keywords.txt")
        return

    batch = remaining[:POSTS_PER_BATCH]
    print(f"Generating {len(batch)} posts...\n")

    generated = 0
    for kw in batch:
        print(f"  -> {kw!r}")
        try:
            post = generate_post(kw)
            save_as_astro_md(post)
            mark_keyword_used(kw)
            generated += 1
            print(f"    Done: {post['slug']}")
        except Exception as e:
            print(f"    Error: {e}")

    if generated > 0:
        print(f"\nGenerated {generated} post(s).")
        if not os.environ.get("GITHUB_ACTIONS"):
            print("Run: git add . && git commit -m 'Add blog posts' && git push")
    else:
        print("\nNo posts generated")


if __name__ == "__main__":
    main()
