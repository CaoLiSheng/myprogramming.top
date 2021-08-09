#!/bin/zsh

node ./build/gen/prod/generator.min.js \
    --tplPath='src/markdown/index.html' \
    --outDir='docs/posts' > gen.prod.log
