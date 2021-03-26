#!/bin/zsh

 rm -rf build/v2/posts && \
  mkdir -p build/v2/posts && \
  find public/resources -d 1 -type dir -exec cp -a '{}' build/v2/posts \; && \
  node build/gen/dev/generator.min.js \
    --tplPath='build/v2/dev/index.html' \
    --cssPath='src/template/v2/index.css' \
    --tplDir='build/v2/dev' \
    --outDir='build/v2/posts' > log.dev.v2.txt && \
  echo 'All(v2) have been regenerated! @' && \
  date