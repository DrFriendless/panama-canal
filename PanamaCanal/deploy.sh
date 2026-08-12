#!/usr/bin/env bash

COMPONENT=PanamaCanal
SOURCE=./dist-pc
mkdir -p ../../extstats-home/public/$COMPONENT
cp $SOURCE/browser/*.js ../../extstats-home/public/$COMPONENT/
cp $SOURCE/browser/*.js.map ../../extstats-home/public/$COMPONENT/
cp $SOURCE/browser/*.css ../../extstats-home/public/$COMPONENT
echo Files were copied to extstats-home/$COMPONENT

COMPONENT=BullPen
SOURCE=./dist-bp
mkdir -p ../../extstats-home/public/$COMPONENT
cp $SOURCE/browser/*.js ../../extstats-home/public/$COMPONENT/
cp $SOURCE/browser/*.js.map ../../extstats-home/public/$COMPONENT/
cp $SOURCE/browser/*.css ../../extstats-home/public/$COMPONENT
echo Files were copied to extstats-home/$COMPONENT
date
