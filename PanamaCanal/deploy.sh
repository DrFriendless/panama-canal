#!/usr/bin/env bash

COMPONENT=PanamaCanal
mkdir -p ../../extstats-home/public/$COMPONENT
cp ./dist/browser/*.js ../../extstats-home/public/$COMPONENT/
cp ./dist/browser/*.js.map ../../extstats-home/public/$COMPONENT/
cp ./src/styles.css ../../extstats-home/public/$COMPONENT/
echo Files were copied to extstats-home/$COMPONENT
DIST=../test-app/src/dist/$COMPONENT
mkdir -p $DIST
cp ./dist/browser/*.js $DIST
cp ./dist/browser/*.js.map $DIST
cp ./src/styles.css $DIST
echo Files were copied to $DIST
date
