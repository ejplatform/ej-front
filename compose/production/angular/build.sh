#!/usr/bin/env bash

npm install

echo Starting to build angular project...
echo Environment: $1
echo Output path: $2
echo Home URL: $3

$(npm bin)/ng build --prod --build-optimizer --environment=$1 --output-path $2 --deploy-url $3
