#!/usr/bin/env python3
"""
posts_cli.py - Manage Markdown blog posts in public/posts

Usage:
    python posts_cli.py create --title "My Post" --date 2025-09-17 --tags blog,intro
    python posts_cli.py delete --slug "my-post"
    python posts_cli.py list
    python posts_cli.py rename --slug "my-post" --title "New Title"
"""

import os
import re
import json
import argparse
from datetime import date

POSTS_DIR = "public/posts"
INDEX_FILE = os.path.join(POSTS_DIR, "index.json")

def slugify(text: str) -> str:
    """Convert a string into a URL-friendly slug"""
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")

def generate_index():
    """Regenerate index.json based on current markdown files"""
    md_files = [f.replace(".md", "") for f in os.listdir(POSTS_DIR) if f.endswith(".md")]
    os.makedirs(POSTS_DIR, exist_ok=True)
    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        json.dump(md_files, f, indent=2)
    return md_files

def create_post(title: str, post_date: str = None, tags: list[str] = None):
    post_date = post_date or date.today().isoformat()
    tags = tags or []

    slug = slugify(title)
    filename = f"{slug}.md"
    filepath = os.path.join(POSTS_DIR, filename)

    if os.path.exists(filepath):
        print(f"Post '{filename}' already exists.")
        return

    front_matter = [
        "---",
        f'title: "{title}"',
        f'date: "{post_date}"'
    ]
    if tags:
        front_matter.append(f"tags: [{', '.join(f'\"{t}\"' for t in tags)}]")
    front_matter.append("---\n")
    front_matter.append("# Start writing your post here\n")

    os.makedirs(POSTS_DIR, exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write("\n".join(front_matter))

    print(f"Post created at {filepath}")
    generate_index()

def delete_post(slug: str = None):
    posts = generate_index()
    if not posts:
        print("No posts found to delete.")
        return

    if not slug:
        print("Available posts:")
        for p in posts:
            print(f" - {p}")
        slug = input("Enter the slug of the post to delete: ").strip()
        if not slug:
            print("No slug provided. Aborting.")
            return

    filename = f"{slug}.md"
    filepath = os.path.join(POSTS_DIR, filename)

    if not os.path.exists(filepath):
        print(f"Post '{filename}' does not exist.")
        return

    os.remove(filepath)
    print(f"Post '{filename}' deleted.")
    generate_index()

def rename_post(slug: str, new_title: str):
    old_file = os.path.join(POSTS_DIR, f"{slug}.md")
    if not os.path.exists(old_file):
        print(f"Post '{slug}.md' does not exist.")
        return

    new_slug = slugify(new_title)
    new_file = os.path.join(POSTS_DIR, f"{new_slug}.md")
    if os.path.exists(new_file):
        print(f"A post with slug '{new_slug}' already exists.")
        return

    # Read old content
    with open(old_file, "r", encoding="utf-8") as f:
        content = f.read()

    # Update title in front-matter
    content = re.sub(r'title: ".*"', f'title: "{new_title}"', content, count=1)

    # Write to new file and delete old
    with open(new_file, "w", encoding="utf-8") as f:
        f.write(content)
    os.remove(old_file)

    print(f"Post renamed to '{new_slug}.md'")
    generate_index()

def list_posts():
    posts = generate_index()
    if posts:
        print("Posts:")
        for p in posts:
            print(f" - {p}")
    else:
        print("No posts found.")

def main():
    parser = argparse.ArgumentParser(description="Manage Markdown blog posts")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # Create command
    create_parser = subparsers.add_parser("create", help="Create a new post")
    create_parser.add_argument("--title", required=True, help="Title of the post")
    create_parser.add_argument("--date", help="Date of the post (YYYY-MM-DD)")
    create_parser.add_argument("--tags", help="Comma-separated tags")

    # Delete command
    delete_parser = subparsers.add_parser("delete", help="Delete a post")
    delete_parser.add_argument("--slug", help="Slug of the post to delete")

    # Rename command
    rename_parser = subparsers.add_parser("rename", help="Rename a post")
    rename_parser.add_argument("--slug", required=True, help="Slug of the post to rename")
    rename_parser.add_argument("--title", required=True, help="New title for the post")

    # List command
    subparsers.add_parser("list", help="List all posts")

    args = parser.parse_args()

    if args.command == "create":
        tags = [t.strip() for t in args.tags.split(",")] if args.tags else []
        create_post(args.title, args.date, tags)
    elif args.command == "delete":
        delete_post(args.slug)
    elif args.command == "rename":
        rename_post(args.slug, args.title)
    elif args.command == "list":
        list_posts()

if __name__ == "__main__":
    main()
