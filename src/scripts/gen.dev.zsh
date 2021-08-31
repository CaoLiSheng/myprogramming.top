#!/bin/zsh

node packages/00/build/gen/dev/generator.js \
    --tplPath='packages/00/src/markdown/index.html' \
    --outDir='build/posts' \
    --inDir='posts' \
    > gen.dev.log && \
    echo 'All(dev) have been regenerated! @' && \
    date
