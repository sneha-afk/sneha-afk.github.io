---
title: /posts
---

{% for post in site.posts %}
### [{{ post.title }}]({{ post.url | relative_url }})
*{{ post.date | date: "%B %-d, %Y" }}*

<!-- {% if post.excerpt %}
{{ post.excerpt }} -->
<!-- [Read more &raquo;]({{ post.url | relative_url }})
{% endif %} -->

{% endfor %}