#!/usr/bin/env python3
"""Copy blog posts + script state from monorepo staging to Maliandro/unutma-blog."""

from __future__ import annotations

import argparse
import os
import shutil
import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
SOURCE_ROOT = SCRIPT_DIR.parent
DEFAULT_PUBLISH_REPO = "https://github.com/Maliandro/unutma-blog.git"
DEFAULT_BRANCH = "master"

SYNC_SCRIPT_FILES = (
    "keywords_used.txt",
    "feature_blog_state.json",
)


def publish_clone_url() -> str:
    repo = os.environ.get("UNUTMA_BLOG_PUBLISH_REPO", DEFAULT_PUBLISH_REPO).strip()
    token = os.environ.get("UNUTMA_BLOG_SYNC_TOKEN", "").strip()
    if token and repo.startswith("https://github.com/"):
        return repo.replace("https://", f"https://x-access-token:{token}@", 1)
    return repo


def copy_posts(source: Path, target: Path) -> list[str]:
    src_dir = source / "src" / "content" / "blog"
    dst_dir = target / "src" / "content" / "blog"
    dst_dir.mkdir(parents=True, exist_ok=True)
    copied: list[str] = []
    for md in sorted(src_dir.glob("*.md")):
        dest = dst_dir / md.name
        shutil.copy2(md, dest)
        copied.append(md.name)
    return copied


def copy_script_state(source: Path, target: Path) -> list[str]:
    copied: list[str] = []
    dst_scripts = target / "scripts"
    dst_scripts.mkdir(parents=True, exist_ok=True)
    for name in SYNC_SCRIPT_FILES:
        src = source / "scripts" / name
        if src.exists():
            shutil.copy2(src, dst_scripts / name)
            copied.append(name)
    return copied


def git_commit_push(target: Path, message: str, branch: str) -> bool:
    env = os.environ.copy()
    env.setdefault("GIT_AUTHOR_NAME", "github-actions[bot]")
    env.setdefault("GIT_AUTHOR_EMAIL", "41898282+github-actions[bot]@users.noreply.github.com")

    def run(args: list[str]) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            args,
            cwd=str(target),
            env=env,
            text=True,
            capture_output=True,
            check=False,
        )

    run(["git", "config", "user.name", env["GIT_AUTHOR_NAME"]])
    run(["git", "config", "user.email", env["GIT_AUTHOR_EMAIL"]])
    run(["git", "add", "src/content/blog", "scripts/keywords_used.txt", "scripts/feature_blog_state.json"])

    diff = run(["git", "diff", "--staged", "--quiet"])
    if diff.returncode == 0:
        print("Nothing new to publish.")
        return False

    commit = run(["git", "commit", "-m", message])
    if commit.returncode != 0:
        print(commit.stderr or commit.stdout, file=sys.stderr)
        raise RuntimeError("git commit failed")

    push = run(["git", "push", "origin", f"HEAD:{branch}"])
    if push.returncode != 0:
        print(push.stderr or push.stdout, file=sys.stderr)
        raise RuntimeError("git push failed")
    print(push.stdout)
    return True


def sync_to_publish_repo(
    *,
    publish_dir: Path | None = None,
    clone: bool = True,
    push: bool = True,
    message: str = "chore(blog): sync posts from unutma-app",
) -> dict:
    branch = os.environ.get("UNUTMA_BLOG_PUBLISH_BRANCH", DEFAULT_BRANCH).strip()
    work_dir = publish_dir

    if clone:
        import tempfile

        tmp = Path(tempfile.mkdtemp(prefix="unutma-blog-publish-"))
        work_dir = tmp / "repo"
        clone_cmd = ["git", "clone", "--depth", "1", "--branch", branch, publish_clone_url(), str(work_dir)]
        proc = subprocess.run(clone_cmd, text=True, capture_output=True, check=False)
        if proc.returncode != 0:
            raise RuntimeError(f"git clone failed: {proc.stderr or proc.stdout}")

    if work_dir is None:
        raise ValueError("publish_dir required when clone=False")

    posts = copy_posts(SOURCE_ROOT, work_dir)
    state_files = copy_script_state(SOURCE_ROOT, work_dir)
    published = push and git_commit_push(work_dir, message, branch)

    return {
        "status": "ok",
        "posts_copied": posts,
        "state_files": state_files,
        "published": published,
        "target": str(work_dir.resolve()),
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync blog content to Maliandro/unutma-blog")
    parser.add_argument("--no-push", action="store_true", help="Copy only; skip git push")
    parser.add_argument(
        "--publish-dir",
        default="",
        help="Existing unutma-blog clone (skip git clone). Example: ../../unutma-blog",
    )
    args = parser.parse_args()

    publish_dir = Path(args.publish_dir).resolve() if args.publish_dir else None
    result = sync_to_publish_repo(
        publish_dir=publish_dir,
        clone=publish_dir is None,
        push=not args.no_push,
    )
    print(result)


if __name__ == "__main__":
    main()
