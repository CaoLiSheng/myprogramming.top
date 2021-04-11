#!/bin/zsh

for arg in "$@"; do
    zsh ./src/scripts/build/gen/${arg}.zsh
done
