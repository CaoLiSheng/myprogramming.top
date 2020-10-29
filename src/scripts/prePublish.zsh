#!/bin/zsh

rm -rf public && \
  cp -a loader public && \
  mkdir -p public/resources && \
  find posts -d 1 -type dir -exec cp -a '{}' public/resources \;