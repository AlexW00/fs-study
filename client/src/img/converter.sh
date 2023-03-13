#!/bin/sh

# converts all png images (nested) to jpg

for i in `find . -name "*.jpg"`; do
    convert "$i" -quality 1 `echo $i | sed 's/jpg$/jpg/'`
done