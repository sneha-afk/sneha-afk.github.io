#!/usr/bin/env python3

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

def parse_frontmatter(content: str):
    """
    Parse front matter from markdown content manually.
    Returns (metadata_dict, content_without_frontmatter)
    """
    metadata = {}
    content_lines = content.split('\n')

    # Check if content starts with front matter
    if not content_lines or content_lines[0].strip() != '---':
        return metadata, content

    # Find the end of front matter
    end_index = None
    for i, line in enumerate(content_lines[1:], 1):
        if line.strip() == '---':
            end_index = i
            break

    if end_index is None:
        return metadata, content  # No closing --- found

    # Parse front matter lines
    for line in content_lines[1:end_index]:
        line = line.strip()
        if not line or line.startswith('#'):
            continue

        # Split key: value
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()

            # Handle different value types
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]  # Remove quotes
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1]  # Remove quotes
            elif value.startswith('[') and value.endswith(']'):
                # Parse array (like tags)
                value = [item.strip().strip('"\'') for item in value[1:-1].split(',')]

            metadata[key] = value

    # Get content without front matter
    content_without_frontmatter = '\n'.join(content_lines[end_index + 1:])
    return metadata, content_without_frontmatter

def read_post_file(filepath: str):
    """Read and parse a post file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        return parse_frontmatter(content)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return {}, ""

def serialize_frontmatter(metadata: dict) -> str:
    """Convert metadata dictionary to front matter string"""
    front_matter_lines = ["---"]
    for key, value in metadata.items():
        if isinstance(value, list):
            value_str = ", ".join(f'"{v}"' for v in value)
            front_matter_lines.append(f"{key}: [{value_str}]")
        else:
            front_matter_lines.append(f'{key}: "{value}"')
    front_matter_lines.append("---")
    return "\n".join(front_matter_lines)

def write_post_file(filepath: str, metadata: dict, content: str):
    """Write post with front matter and content to file"""
    front_matter = serialize_frontmatter(metadata)
    new_content = front_matter + "\n" + content
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)

def generate_index():
    """Regenerate index.json with full metadata for all posts"""
    if not os.path.exists(POSTS_DIR):
        os.makedirs(POSTS_DIR)
        with open(INDEX_FILE, "w", encoding="utf-8") as f:
            json.dump([], f, indent=2)
        return []

    md_files = [f for f in os.listdir(POSTS_DIR) if f.endswith(".md")]
    posts_meta = []

    for filename in md_files:
        slug = filename.replace(".md", "")
        filepath = os.path.join(POSTS_DIR, filename)
        metadata, _ = read_post_file(filepath)

        post_meta = {
            "slug": slug,
            "title": metadata.get("title", "Untitled").strip(),
            "date": metadata.get("date", "").strip(),
            "tags": metadata.get("tags", [])
        }

        if isinstance(post_meta["tags"], str):
            post_meta["tags"] = [tag.strip() for tag in post_meta["tags"].split(",")]

        if not post_meta["date"]:
            print(f"Warning: Post '{slug}' is missing a date")

        posts_meta.append(post_meta)

    with open(INDEX_FILE, "w", encoding="utf-8") as f:
        json.dump(posts_meta, f, indent=2, ensure_ascii=False)

    print(f"Index generated with {len(posts_meta)} posts")
    return posts_meta

def create_post(title: str, post_date: str = None, tags: list[str] = None):
    """Create a new blog post"""
    post_date = post_date or date.today().isoformat()
    tags = tags or []

    slug = slugify(title)
    filename = f"{slug}.md"
    filepath = os.path.join(POSTS_DIR, filename)

    if os.path.exists(filepath):
        print(f"Post '{filename}' already exists.")
        return

    metadata = {
        "title": title,
        "date": post_date,
        "tags": tags
    }

    content = "# Start writing your post here\n\nYour content goes here..."

    os.makedirs(POSTS_DIR, exist_ok=True)
    write_post_file(filepath, metadata, content)

    print(f"Post created at {filepath}")
    generate_index()

def delete_post(slug: str = None):
    """Delete a blog post"""
    posts = generate_index()
    if not posts:
        print("No posts found to delete.")
        return

    if not slug:
        print("Available posts:")
        for p in posts:
            print(f" - {p['slug']} ({p['title']})")
        slug = input("Enter the slug of the post to delete: ").strip()
        if not slug:
            print("No slug provided. Aborting.")
            return

    filename = f"{slug}.md"
    filepath = os.path.join(POSTS_DIR, filename)

    if not os.path.exists(filepath):
        print(f"Post '{filename}' does not exist.")
        return

    confirm = input(f"Are you sure you want to delete '{filename}'? (y/N): ")
    if confirm.lower() != 'y':
        print("Deletion cancelled.")
        return

    os.remove(filepath)
    print(f"Post '{filename}' deleted.")
    generate_index()

def rename_post(slug: str, new_title: str):
    """Rename a blog post and update its title"""
    old_file = os.path.join(POSTS_DIR, f"{slug}.md")
    if not os.path.exists(old_file):
        print(f"Post '{slug}.md' does not exist.")
        return

    new_slug = slugify(new_title)
    new_file = os.path.join(POSTS_DIR, f"{new_slug}.md")
    if os.path.exists(new_file):
        print(f"A post with slug '{new_slug}' already exists.")
        return

    metadata, content = read_post_file(old_file)
    metadata["title"] = new_title

    write_post_file(new_file, metadata, content)
    os.remove(old_file)

    print(f"Post renamed from '{slug}' to '{new_slug}'")
    generate_index()

def edit_post(slug: str, field: str, value: str):
    """Edit a specific field of a post"""
    filepath = os.path.join(POSTS_DIR, f"{slug}.md")
    if not os.path.exists(filepath):
        print(f"Post '{slug}.md' does not exist.")
        return

    metadata, content = read_post_file(filepath)

    if field == "tags":
        metadata[field] = [t.strip() for t in value.split(",")]
    else:
        metadata[field] = value

    write_post_file(filepath, metadata, content)
    print(f"Updated {field} for post '{slug}'")
    generate_index()

def list_posts(verbose: bool = False):
    """List all blog posts"""
    posts = generate_index()
    if posts:
        print(f"Found {len(posts)} posts:")
        for i, post in enumerate(posts, 1):
            if verbose:
                tags = ", ".join(post.get("tags", []))
                print(f"  {i}. {post['slug']}")
                print(f"     Title: {post['title']}")
                print(f"     Date: {post['date']}")
                if tags:
                    print(f"     Tags: {tags}")
                print()
            else:
                print(f"  {i}. {post['slug']} - {post['title']} ({post['date']})")
    else:
        print("No posts found.")

def main():
    parser = argparse.ArgumentParser(description="sneha's doohickey Markdown post tool")
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

    # Edit command
    edit_parser = subparsers.add_parser("edit", help="Edit a post's metadata")
    edit_parser.add_argument("--slug", required=True, help="Slug of the post to edit")
    edit_parser.add_argument("--field", required=True, choices=["title", "date", "tags"], help="Field to edit")
    edit_parser.add_argument("--value", required=True, help="New value for the field")

    # List command
    list_parser = subparsers.add_parser("list", help="List all posts")
    list_parser.add_argument("--verbose", action="store_true", help="Show detailed information")

    # Generate index command
    subparsers.add_parser("generate-index", help="Regenerate the index.json file")

    args = parser.parse_args()

    if args.command == "create":
        tags = [t.strip() for t in args.tags.split(",")] if args.tags else []
        create_post(args.title, args.date, tags)
    elif args.command == "delete":
        delete_post(args.slug)
    elif args.command == "rename":
        rename_post(args.slug, args.title)
    elif args.command == "edit":
        edit_post(args.slug, args.field, args.value)
    elif args.command == "list":
        list_posts(args.verbose)
    elif args.command == "generate-index":
        generate_index()

if __name__ == "__main__":
    main()
