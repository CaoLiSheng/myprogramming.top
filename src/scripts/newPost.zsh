#!/bin/zsh

usage() {
    echo "Usage:"
    echo "\tnpm run new -- [-h] [-b] [-c] [-d yyyy-mm-dd] -n name [-s book|tech]"
    echo "Description:"
    echo "\t-h Help, Print usage."
    echo "\t-b Beta, Using beta dir."
    echo "\t-c No Comments."
    echo "\t-d Date."
    echo "\t-n File Name."
    echo "\t-s Style."
    exit 0
}

while getopts 'hcbd:n:s:' flag; do
  case "${flag}" in
    b) beta="true" ;;
    c) nocmt="true" ;;
    d) ddate="${OPTARG}" ;;
    n) name="${OPTARG}" ;;
    s)
        case "${OPTARG}" in
            book) style="antique" ;;
            tech) style="github" ;;
        esac
        ;;
    h) usage ;;
  esac
done

[[ ${name} = "" ]] && usage

ddate="${ddate-$(date '+%Y-%m-%d')}"
style="${style-"bountiful"}"

[[ ${beta} = "true" ]] && dir="./posts/tests/" || dir="./posts/"
[[ ${nocmt} = "true" ]] && settings="\nno-receive-emails: true" || settings=""

echo "---${settings}
style: ${style}
title: 
date: ${ddate}
tags:
  - 
---
" > ${dir}${name}.md
