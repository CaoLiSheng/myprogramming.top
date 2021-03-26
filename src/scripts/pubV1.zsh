#!/bin/zsh

node ./build/gen/prod/generator.min.js \
    --tplPath='src/template/v1/index.html' \
    --cssPath='src/template/v1/index.css' \
    --tplDir='build/v1/prod' \
    --outDir='public/posts' > gen.prod.v1.log