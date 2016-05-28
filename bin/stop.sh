#!/bin/bash

cd `dirname $0`
cd ..
dir=`pwd`

# 停止当前 forever 进程
./node_modules/.bin/forever stop src/www