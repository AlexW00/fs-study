#!/bin/sh

cd ./client
npm install
npm run build
cd ../server
npm install
npm run build