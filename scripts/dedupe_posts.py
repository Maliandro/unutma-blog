#!/usr/bin/env python3
"""Remove near-duplicate Markdown posts, keeping the strongest canonical page."""

from __future__ import annotations

import argparse
import re
from pathlib import Path

BLOG_DIR = Path(__file__).resolve().parents[1] / "src" / "content" / "blog"
STOPWORDS = {
    "a", "an", "and", "app", "apps", "for", "how", "in", "of", "the", "to", "with",
    "your", "you", "tips", "guide", "best", "complete", "ultimate", "why", "what",
}


def frontmatter(text: str) -> dict[str, str]:
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    data: dict[str, str] = {}
    for line in text[3:end].splitlines():
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        data[key.strip()] = value.strip().strip('"')
    return data


def tokens(value: str) -> set[str]:
    return {
        token
        for token in re.findall(r"[a-z0-9]+", value.lower())
        if len(token) > 2 and token not in STOPWORDS
    }


def similarity(a: set[str], b: set[str]) -> float:
    if not a or not b:
        return 0.0
    return len(a & b) / len(a | b)


def canonical_score(path: Path, data: dict[str, str], text: str) -> tuple[int, int, str]:
    featured = 1 if data.get("featured", "").lower() == "true" else 0
    return featured, len(text), path.name


def main() -> None:
    parser = argparse.ArgumentParser(description="Delete near-duplicate blog posts.")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--threshold", type=float, default=0.74)
    args = parser.parse_args()

    posts = []
    for path in sorted(BLOG_DIR.glob("*.md")):
      text = path.read_text(encoding="utf-8")
      data = frontmatter(text)
      title = data.get("title", path.stem)
      fingerprint = tokens(f"{title} {path.stem.replace('-', ' ')}")
      posts.append((path, data, text, fingerprint))

    remove: set[Path] = set()
    for i, left in enumerate(posts):
        for right in posts[i + 1:]:
            if left[0] in remove or right[0] in remove:
                continue
            score = similarity(left[3], right[3])
            if score < args.threshold:
                continue
            winner, loser = sorted(
                [left, right],
                key=lambda item: canonical_score(item[0], item[1], item[2]),
                reverse=True,
            )
            remove.add(loser[0])
            print(f"duplicate {score:.2f}: keep {winner[0].name}, remove {loser[0].name}")

    for path in sorted(remove):
        if not args.dry_run:
            path.unlink()

    print(f"Removed {len(remove)} duplicate post(s).")


if __name__ == "__main__":
    main()
