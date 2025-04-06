---
layout: default
title: /home
back_link: false
display_title: false
---
## welcome

hello, i'm sneha (she/her) and you've found your way here!

## /posts
{% for post in site.posts %}
- {{ post.date | date: "%Y-%m-%d" }}: [{{ post.title }}]({{ post.url }})
{% endfor %}
