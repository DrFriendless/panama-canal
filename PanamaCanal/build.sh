#!/usr/bin/env bash

rm -rf ./dist/*
rm -rf ./dist-pc/*
rm -rf ./dist-bp/*
npm run build-panama-canal
npm run build-bull-pen
