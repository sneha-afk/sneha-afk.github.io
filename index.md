---
layout: default
title: /home
back_link: false
display_title: false
---
## welcome

under construction...

## /resume
Contact: on [LinkedIn](https://www.linkedin.com/in/sneha-de/)

Links: [LinkedIn](https://www.linkedin.com/in/sneha-de/) -- [GitHub](https://github.com/sneha-afk/)

Skills, Education, Experience: see [/about](/pages/about.md)

## /posts
{% for post in site.posts %}
- {{ post.date | date: "%Y-%m-%d" }}: [{{ post.title }}]({{ post.url }})
{% endfor %}
