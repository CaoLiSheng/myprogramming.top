#!/bin/zsh

for arg in "$@"; do
    case "${arg}" in
      b) rm -rf public/posts public/v1 public/v2 build/gen/prod ;;
      bt) rm -rf public/posts public/v2 build/gen/prod ;;
      d) rm -rf build/gen/dev build/posts ;;
      t) rm -rf build/gen/dev build/tests/markdown-it ;;
    esac
done
