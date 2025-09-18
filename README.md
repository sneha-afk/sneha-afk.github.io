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

A tiny Python CLI to manage posts. Automatically updates `index.json` so the frontend sees your posts without extra steps.

### Commands

```bash
# create a new post
python posts_cli.py create --title "My Post" --tags blog,intro

# delete a post (interactive if slug missing)
python posts_cli.py delete

# rename a post (updates filename + front-matter)
python posts_cli.py rename --slug "old-slug" --title "New Title"

# list all posts
python posts_cli.py list
```

### Markdown Front-Matter

```markdown
---
title: "Post Title"
date: "2025-09-17"
tags: [blog, intro]
---

# Start writing your post here
```

* New posts go in `public/posts/`
* `index.json` is generated automatically by the CLI
* Frontend fetches posts dynamically — no manual updates needed

---

## license

feel free to use the components/styling here.
