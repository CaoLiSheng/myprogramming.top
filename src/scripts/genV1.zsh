#!/bin/zsh

rm -rf build/v1/posts && \
  node build/gen/dev/generator.min.js \
    --tplPath='src/template/v1/index.html' \
    --cssPath='src/template/v1/index.css' \
    --tplDir='build/gen/dev' \
    --outDir='build/v1/posts' > log1.txt && \
  echo 'All(v1) have been regenerated! @' && \
  date