#!/bin/zsh

node build/gen/prod/generator.min.js \
    --tplPath='../commons/src/markdown/index.html' \
    --outDir='../../docs/posts' \
    --inDir='../../posts' \
    > gen.prod.log && \
    echo 'All(dev) have been regenerated! @' && \
    date
