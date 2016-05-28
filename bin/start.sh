#!/bin/bash

cd `dirname $0`
cd ..
dir=`pwd`

# 安装 依赖
npm install

# 停止当前 forever 进程
./node_modules/.bin/forever stop src/www

# 开发环境下启动
#NODE_ENV=development $dir/node_modules/.bin/forever start -w --watchIgnore "*.log" -a -l $dir/logs/server/forever.log -o $dir/logs/server/out.log -e $dir/logs/server/err.log $dir/bin/www

# 线上环境下启动
NODE_ENV=production ./node_modules/.bin/forever start -w --watchIgnore "*.log" -a -l $dir/logs/server/forever.log -o $dir/logs/server/out.log -e $dir/logs/server/err.log src/www

# forever 正在运行进程列表
#./node_modules/.bin/forever list