#!/bin/zsh

if [ -z $(lsof -i:5555) ]; then
  echo Yeah
fi