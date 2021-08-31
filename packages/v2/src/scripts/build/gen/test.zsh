#!/bin/zsh

node build/gen/dev/generator.js \
    --tplPath='src/markdown/index.html' \
    --outDir='build/tests/markdown-it' \
    --inDir='posts/tests' > gen.test.log && \
  echo 'All(tests) have been regenerated! @' && \
  date
