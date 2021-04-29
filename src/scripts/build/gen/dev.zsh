#!/bin/zsh

# find public/resources -d 1 -type dir -exec cp -a '{}' build/v1/posts \; && \
  node build/gen/dev/generator.js \
    --tplPath='src/template/index.html' \
    --outDir='build/posts' > gen.dev.log && \
  echo 'All(dev) have been regenerated! @' && \
  date
