#!/bin/zsh

# find public/resources -d 1 -type dir -exec cp -a '{}' build/v1/posts \; && \
  node build/gen/dev/generator.min.js \
    --tplPath='src/template/v1/index.html' \
    --cssPath='src/template/v1/index.css' \
    --tplDir='build/v1/dev' \
    --outDir='build/v1/posts' > gen.dev.v1.log && \
  echo 'All(dev v1) have been regenerated! @' && \
  date