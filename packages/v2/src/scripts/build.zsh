#!/bin/zsh

read() {
  node -pe "JSON.parse(process.argv[1]).$1" "$(cat $2)"
}

run() {
  zsh ./src/scripts/build/$1.zsh ${@:2}
}

while getopts "c:" flag; do
  case "${flag}" in
    c) config="./cfg/build/${OPTARG}.json" ;;
  esac
done

if [ ! -z "${config}" ]; then
  props=("clean" "dist" "gen")
  for prop in "${props[@]}"; do
    value=$(read "${prop}" "${config}")
    if [ ! -z "${value}" ]; then
      eval "args=(${value})"
      run "${prop}" "${args[@]}"
    fi
  done
fi
