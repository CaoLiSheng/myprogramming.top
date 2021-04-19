#!/bin/zsh

baseUrl="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.13.2/fonts/"
exts=(".woff2" ".woff" ".ttf")
files=("KaTeX_AMS-Regular" "KaTeX_Caligraphic-Bold" "KaTeX_Caligraphic-Regular" "KaTeX_Fraktur-Bold" "KaTeX_Fraktur-Regular" "KaTeX_Main-Bold" "KaTeX_Main-BoldItalic" "KaTeX_Main-Italic" "KaTeX_Main-Regular" "KaTeX_Math-BoldItalic" "KaTeX_Math-Italic" "KaTeX_SansSerif-Bold" "KaTeX_SansSerif-Italic" "KaTeX_SansSerif-Regular" "KaTeX_Script-Regular" "KaTeX_Size1-Regular" "KaTeX_Size2-Regular" "KaTeX_Size3-Regular" "KaTeX_Size4-Regular" "KaTeX_Typewriter-Regular")

for ext in "${exts[@]}"; do
    for file in "${files[@]}"; do
        if [ ! -e "public/resources/fonts/${file}${ext}" ]; then
            curl "${baseUrl}${file}${ext}" -o "public/resources/fonts/${file}${ext}"
        fi
    done
done
