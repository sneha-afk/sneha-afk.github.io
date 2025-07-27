#!/bin/sh

# Can pass in flags like --drafts directly while calling this script
# ./start --drafts

rm -rf ../_site/
bundle exec jekyll clean
bundle exec jekyll serve --livereload $@
