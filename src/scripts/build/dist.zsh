#!/bin/zsh

for arg in "$@"; do
    webpack --silent --config=cfg/webpack/${arg}.js
done
