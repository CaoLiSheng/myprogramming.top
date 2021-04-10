#!/bin/zsh

node build/gen/dev/generator.min.js \
    --tplPath='src/template/v1/index.html' \
    --cssPath='src/template/v1/index.css' \
    --tplDir='build/gen/dev' \
    --outDir='build/tests/markdown-it' \
    --inDir='posts/tests' > gen.test.log && \
  echo 'All(tests) have been regenerated! @' && \
  date