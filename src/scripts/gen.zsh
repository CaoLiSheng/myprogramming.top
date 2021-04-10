#!/bin/zsh

for arg in "$@"; do
    zsh ./src/scripts/gen/${arg}.zsh
done
