#!/usr/bin/env python3
"""
new_post.py - Create a new Markdown blog post with front-matter
- Front-matter: title, date, optional tags

Usage:
    python new_post.py                # Run interactively with prompts
    python new_post.py --title "My Post" --date 2025-09-16 --tags blog,intro
    python new_post.py --help         # Show this help message
"""

import os
import re
import sys
import argparse
from datetime import date

POSTS_DIR = "src/posts"

def slugify(text: str) -> str:
    """Convert a string into a URL-friendly slug"""
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")

def main():
    parser = argparse.ArgumentParser(description="Create a new Markdown blog post")
    parser.add_argument("--title", type=str, help="Title of the post")
    parser.add_argument("--date", type=str, help="Date of the post (YYYY-MM-DD)")
    parser.add_argument("--tags", type=str, help="Comma-separated tags")
    args = parser.parse_args()

    # Interactive input if not provided as arguments
    if args.title:
        title = args.title.strip()
    else:
        title = input("Post title: ").strip()
        if not title:
            print("Error: Title cannot be empty.")
            return

    post_date = args.date or input("Post date (YYYY-MM-DD, leave blank for today): ").strip() or date.today().isoformat()
    tags_input = args.tags or input("Tags (comma separated, optional): ").strip()
    tags = [t.strip() for t in tags_input.split(",") if t.strip()]

    slug = slugify(title)
    filename = f"{slug}.md"
    filepath = os.path.join(POSTS_DIR, filename)

    if os.path.exists(filepath):
        print(f"Error: Post '{filename}' already exists.")
        return

    # Generate front-matter
    front_matter = [
        "---",
        f'title: "{title}"',
        f'date: "{post_date}"'
    ]
    if tags:
        front_matter.append(f"tags: [{', '.join(f'\"{t}\"' for t in tags)}]")
    front_matter.append("---\n")
    front_matter.append("# Start writing your post here\n")

    content = "\n".join(front_matter)

    os.makedirs(POSTS_DIR, exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"✅ New post created at {filepath}")

if __name__ == "__main__":
    main()
