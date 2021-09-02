#!/bin/zsh

node build/gen/dev/generator.js \
    --tplPath='../commons/src/markdown/index.html' \
    --outDir='../../build/posts' \
    --inDir='../../posts' \
    > gen.dev.log && \
    echo 'All(dev) have been regenerated! @' && \
    date
