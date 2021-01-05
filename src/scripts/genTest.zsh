#!/bin/zsh

rm -rf build/test/posts && \
  mkdir -p build/test/posts && \
  node build/gen/dev/generator.min.js \
    --tplPath='src/template/v1/index.html' \
    --cssPath='src/template/v1/index.css' \
    --tplDir='build/gen/dev' \
    --outDir='build/test/posts' \
    --inDir='posts/tests' > logT.txt && \
  echo 'All(tests) have been regenerated! @' && \
  date