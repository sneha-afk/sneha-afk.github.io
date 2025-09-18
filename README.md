# my site 💻

🌐 [sneha-afk.github.io](https://sneha-afk.github.io)

---

## tech stack

* **React + TypeScript**
* **Vite**
* **SCSS**
* **React Markdown + front-matter** — blog posts
* **GitHub Pages** — hosting

All posts live in `public/posts` as Markdown.

---

## blog CLI

A tiny Python tool to manage Markdown blog posts. Automatically updates `index.json` so your frontend sees new posts instantly—no manual steps needed.

### Quick Commands

```bash
# Create a new post
python posts_cli.py create --title "My Post" --tags blog,intro

# Delete a post (shows list if slug omitted)
python posts_cli.py delete

# Rename a post (updates both filename and front-matter)
python posts_cli.py rename --slug "old-slug" --title "New Title"

# Edit post metadata
python posts_cli.py edit --slug my-post --field tags --value "tech,react"

# List all posts (add --verbose for details)
python posts_cli.py list

# Force regenerate index.json
python posts_cli.py generate-index
```

Should also work just off `./post_cli.py`.

### how it works

- Posts live in `public/posts/` as `.md` files with clean front-matter
- Every CLI command automatically updates `index.json` with post metadata
- Frontend loads metadata from the index and content from individual files
- Pure Python—no dependencies or setup required


```markdown
---
title: "Post Title"
date: "2025-09-17"
tags: [blog, intro]
---
```

---

## license

feel free to use the components/styling here.
