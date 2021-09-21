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
    echo "\t-t Post Title."
    echo "\t-g Post Tags."
    echo "\t-s Style."
    exit 0
}

while getopts 'hcbd:n:t:g:s:' flag; do
  case "${flag}" in
    b) beta="true" ;;
    c) nocmt="true" ;;
    n) name="${OPTARG}" ;;
    g) tags="${OPTARG}" ;;
    t) title="${OPTARG}" ;;
    d) ddate="${OPTARG}" ;;
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

if [ ! -z "${tags}" ] ; then
  tags=($( echo ${tags} | sed "s/ /%20/g" | tr "," " " ))
  ttags=""
  for tag in "${tags[@]}"; do
    ttags+="\n  - $( echo ${tag} | sed "s/%20/ /g" )"
  done
else
  ttags="\n  - \n"
fi

echo "---${settings}
style: ${style}
title: ${title}
date: ${ddate}
tags: ${ttags}
---
" > ${dir}${name}.md