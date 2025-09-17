---
layout: default
date: "2025-02-23"
title: /testing-css
mathjax: true
---

Kitchen sink of CSS elements since I tried to make it from scratch.

## Typography

Regular font: [Geist by Vercel](https://vercel.com/font)

`Monospace font: Geist Mono`

## Headers

# H1

## H2

### H3

#### H4

##### H5

###### H6

## Text Formatting

**Bold text**

_Italic text_

~~Strikethrough text~~

`Inline code`

<span style="color: red;">Inline HTML</span>

[Link to Google](https://www.google.com)

## Lists

### Unordered List

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2
- Item 3

### Ordered List

1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2
3. Third item

## Code Blocks

Inline code `looks like this`.

Code blocks look like:

```python
def hello_world():
    print("Hello, world!")
```

```c
#include <stdio.h>

void main() {
  printf("hello world!");
  return 0;
}
```

```lua
vim.g.is_windows = vim.fn.has("win32") or vim.fn.has("win64")
```

## Tables

| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Row 1    | Data 1   | Data 2   |
| Row 2    | Data 3   | Data 4   |
| Row 3    | Data 5   | Data 6   |

| Header 1 | Header 2 | Header 3 | Header 4 |
| -------- | -------- | -------- | -------- |
| Row 1    | Data 1   | Data 2   | Data x   |
| Row 2    | Data 3   | Data 4   | Data y   |
| Row 3    | Data 5   | Data 6   | Data z   |

## Blockquotes

> This is a blockquote.

> INFO: Info blockquote

> WARNING: Warning blockquote

> DANGER: Danger blockquote

> TIP: Tip blockquote

> NOTE: Note blockquote

## Images

### Inline Image

![Alt text for inline image](https://placehold.co/100x50/png "Inline Image")

### Centered Image

<img src="https://placehold.co/200x100/png" alt="Centered Image" title="Centered Image" class="img-center">

## MathJax

MathJax allows you to include mathematical equations in your Markdown. Here are a few examples:

Inline: $E = mc^2$

Block:

$$
\int_{a}^{b} x^2 dx
$$

More complex:

$$
\frac{\partial u}{\partial t} + u \cdot \nabla u = -\frac{1}{\rho} \nabla p + \nu \nabla^2 u
$$

## Horizontal Rule

---

## Footnotes

Here is a footnote reference[^1].

[^1]: This is the footnote content.

## Task List

- [x] Task 1
- [ ] Task 2
- [ ] Task 3
