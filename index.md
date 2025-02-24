---
layout: default
title: /home
back_link: false
display_title: false
---
## welcome

under construction...

### posts
{% for post in site.posts %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
