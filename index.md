---
layout: default
title: /home
back_link: false
display_title: false
---
## /welcome

hello, i'm sneha (she/her) and you've found your way here!

---

I am currently a Master's student in Computer Science at [UC San Diego](https://cse.ucsd.edu/) and obtained my Bachelor's in the same at [UC Santa Cruz](https://engineering.ucsc.edu/departments/computer-science-and-engineering/) 🍌🐌 ❤️ 🧜‍♀️🔱.

In my quest to know a bit of everything, my interests in tech lie primarily in OS and systems development, networked services, and AI/ML.

Outside of CS, I love to travel and try new food from any cuisine. And for a fun fact, I practiced Shotokan karate for eight years and reached Sandan (3rd degree black belt)!

See my resume at [/resume](./pages/resume.md) for more details on my experience.

Thank you for visiting, have a good one :)

## /recent-posts
{% assign sorted_posts = site.posts | sort: "date" | reverse %}
{% for post in sorted_posts limit:5 %}
- `{{ post.date | date: "%Y-%m-%d" }}` <b>[{{ post.title }}]({{ post.url }})</b>
{% endfor %}
