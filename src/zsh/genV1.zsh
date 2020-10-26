#!/bin/zsh

node ./build/gen/dev/generator.min.js --td='build/gen/dev' --tp='src/template/v1/index.html' --op='build/v1/posts' > log.txt && \
  echo 'All(v1) have been regenerated! @' && date