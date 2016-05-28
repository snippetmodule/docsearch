/**
 * Created by 王发喜 on 2015-03-13 10:47.
 */
var CONFIG = require('../config');
var mongoose = require('mongoose');
//数据库链接属性
var dbOptions = {
    db: {native_parser: true},
    server: {poolSize: 5},
    user: CONFIG.API_DB_USER,
    pass: CONFIG.API_DB_USER_PWD
};

//数据库链接错误处理
mongoose.connection.on('err', function (err) {
    console.error(err.message);
    //console.log(err.message);
});
mongoose.connection.on('open', function () {
    console.info('数据库连接已经打开');
});
//链接数据库
mongoose.connect(CONFIG.API_DB, dbOptions);

module.exports=mongoose;