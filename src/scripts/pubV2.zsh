#!/bin/zsh

node build/gen/prod/generator.min.js \
    --tplPath='build/v2/prod/index.html' \
    --cssPath='src/template/v2/index.css' \
    --tplDir='build/v2/prod' \
    --outDir='public/v2' > gen.prod.v2.log
