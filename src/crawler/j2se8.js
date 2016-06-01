/**
 * Created by wangfaxi1985 on 16/6/2.
 */
var HttpClient = require('../lib/httpClient');
var async = require('async');
var fsUtils = require('../lib/fsUtils');
var fs = require('fs');
var cheerio = require('cheerio');


var rootpath = 'http://docs.oracle.com/javase/8/docs/api/';
var htmlRootPath ='docs/j2se8/';

var docs_oracle_j2se8_http_get = function (path, callback) {
    HttpClient.get(rootpath + path, '', '', callback);
};
getPackageHtmlIMPL = function (path,callback) {
    docs_oracle_j2se8_http_get(path, function (error, response, body) {
        fs.writeFile(htmlRootPath+ path, body, function (err) {
            //callback(err);
            //console.log(htmlRootPath + path);
        });
        var $ = cheerio.load(body);
        var nextPage = $('html body div.subNav').first().children('ul.navList').first().children('li').next().children('a');
        console.log(path);
        if(nextPage){
            var nextPath=nextPage.attr('href').replace(/\..\//g,'');
            console.log("nextPath:"+nextPath);
            callback(nextPath);
        }
        callback();
    });
};
getPackageHtml = function (path) {
    if(!path){
        return;
    }
    var paths = path.split('/');

    if (paths.length) {
        paths.pop();
    }
    fsUtils.mkdirsSync(htmlRootPath +paths.join('/'));
    getPackageHtmlIMPL(path,function (nextPath) {
        getPackageHtml(nextPath);
    });
};
exports.getAPI = function (req, res, next) {
    fsUtils.mkdirsSync(htmlRootPath);
    getPackageHtml('java/applet/package-summary.html');
    res.json(200, {});
};