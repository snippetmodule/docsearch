#!/bin/bash

cd `dirname $0`
cd ..
dir=`pwd`

echo "安装 依赖:-------------------------------------------------"
npm install

echo "停止当前 forever 进程:-------------------------------------"
./node_modules/.bin/forever stop src/www

mkdir $dir/logs/server

echo "开发环境下启动:--------------------------------------------"
NODE_ENV=development $dir/node_modules/.bin/forever start -w --watchIgnore "*.log" -a -l $dir/logs/server/forever.log -o $dir/logs/server/out.log -e $dir/logs/server/err.log src/www

echo "线上环境下启动:--------------------------------------------"
#NODE_ENV=production ./node_modules/.bin/forever start -w --watchIgnore "*.log" -a -l $dir/logs/server/forever.log -o $dir/logs/server/out.log -e $dir/logs/server/err.log src/www

echo "forever 正在运行进程列表:----------------------------------"
./node_modules/.bin/forever list