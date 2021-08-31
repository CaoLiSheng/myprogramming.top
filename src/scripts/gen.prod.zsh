#!/bin/zsh

node packages/00/build/gen/prod/generator.min.js \
    --tplPath='packages/00/src/markdown/index.html' \
    --outDir='docs/posts' \
    --inDir='posts' \
    > gen.prod.log && \
    echo 'All(dev) have been regenerated! @' && \
    date
