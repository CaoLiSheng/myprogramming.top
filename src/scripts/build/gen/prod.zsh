#!/bin/zsh

node ./build/gen/prod/generator.min.js \
    --tplPath='src/markdown/index.html' \
    --outDir='public/posts' > gen.prod.log