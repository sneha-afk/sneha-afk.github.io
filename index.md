---
layout: default
title: /home
back_link: false
display_title: false
---
## /welcome

hello, i'm sneha (she/her) and you've found your way here!

i am currently a master's student in computer science at [uc san diego](https://cse.ucsd.edu/) and obtained my bachelor's in the same at [uc santa cruz](https://engineering.ucsc.edu/departments/computer-science-and-engineering/). 🍌🐌 ❤️ 🧜‍♀️🔱

in my quest to know a bit of everything, my interests are primarly in os and systems development, networking, and ai/ml.

outside of cs, i love to travel and try new food from any cuisine. and for a fun fact, i practiced Shotokan karate for seven years and reached Sandan (3rd degree black belt)!

see my resume at [/resume](./pages/resume.md) for more details on my experience.

thank you for visiting, have a good one :)

## /posts
{% for post in site.posts %}
- {{ post.date | date: "%Y-%m-%d" }}: [{{ post.title }}]({{ post.url }})
{% endfor %}
