#!/bin/zsh

read() {
  node -pe "JSON.parse(process.argv[1]).$1" "$(cat $2)"
}

run() {
  zsh ./src/scripts/$1.zsh ${@:2}
}

while getopts "c:" flag; do
  case "${flag}" in
    c) config="./cfg/workflow/${OPTARG}.json" ;;
  esac
done

if [ ! -z "${config}" ]; then
  clean=$(read "clean" "${config}")
  dist=$(read "dist" "${config}")
  gen=$(read "gen" "${config}")
fi

if [ ! -z "${clean}" ]; then
  run "clean" "-${clean}"
fi

if [ ! -z "${dist}" ]; then
  eval "args=(${dist})"
  run "dist" "${args[@]}"
fi

if [ ! -z "${gen}" ]; then
  eval "args=(${gen})"
  run "gen" "${args[@]}"
fi
