#!/bin/zsh

# `>/dev/null 2>&1 || true` is used for "lint fix" commands to silence any errors that can't be automatically fixed. The lint command will report the errors instead.

echo "💆 Sorting package.json..."
sort-package-json "package.json"

echo "💆 Sorting imports..."
import-sort --write '**/*.{js,jsx,ts,tsx,vue}'

echo "💆 Fixing JS/TS/VUE..."
npm run lint:es -- --fix >/dev/null 2>&1 || true

echo "💆 Fixing CSS/SCSS/STYLUS..."
npm run lint:style -- --fix >/dev/null 2>&1 || true

echo "💆 Prettier..."
prettier --write '**/*.{json,yaml,yml}'
