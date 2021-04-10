#!/bin/zsh

while getopts "012gt" flag; do
  case "${flag}" in
    0) rm -rf public/posts public/v1 public/v2 build/gen/prod build/v1/prod build/v2/prod ;;
    1) rm -rf build/gen/dev build/v1/dev build/v1/posts ;;
    2) rm -rf build/gen/dev build/v2/dev build/v2/posts ;;
    g) rm -rf build/gen/dev build/*/posts ;;
    t) rm -rf build/gen/dev build/tests/markdown-it ;;
  esac
done
