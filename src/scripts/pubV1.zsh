#!/bin/zsh

node ./build/gen/prod/generator.min.js \
    --tplPath='src/template/v1/index.html' \
    --cssPath='src/template/v1/index.css' \
    --tplDir='build/gen/prod' \
    --outDir='public/posts' > log1.txt