#!/bin/zsh

 rm -rf build/v2/posts && \
  node build/gen/dev/generator.min.js --td='build/v2/dev' --tp='build/v2/dev/index.html' --op='build/v2/posts' > log.txt && \
  echo 'All(v2) have been regenerated! @' && \
  date