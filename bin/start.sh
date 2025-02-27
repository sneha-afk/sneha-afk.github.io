#!/bin/sh

rm -rf ../_site/
bundle exec jekyll clean
bundle exec jekyll serve --livereload
