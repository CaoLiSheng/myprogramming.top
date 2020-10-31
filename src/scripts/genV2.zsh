#!/bin/zsh

 rm -rf build/v2/posts && \
  node build/gen/dev/generator.min.js \
    --tplPath='build/v2/dev/index.html' \
    --cssPath='src/template/v2/index.css' \
    --tplDir='build/v2/dev' \
    --outDir='build/v2/posts' > log.txt && \
  echo 'All(v2) have been regenerated! @' && \
  date