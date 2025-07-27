---
title: /posts
permalink: /posts
---

<html lang="en">
{% for post in site.posts %}
    {{ post.date | date: "%Y-%m-%d" }}: <b><a href="{{ post.url }}">{{ post.title }}</a></b>
    {% if post.excerpt %}
        <blockquote style="font-size: 11px;">{{ post.excerpt }}</blockquote>
    {% endif %}
{% endfor %}
</html>

