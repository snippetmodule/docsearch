/**
 * Created by wangfaxi1985 on 16/6/2.
 */
var HttpClient = require('../lib/httpClient');
var async = require('async');
var fsUtils = require('../lib/fsUtils');
var fs = require('fs');
var singletonevent = require('node-singleton-event');
var cheerio = require('cheerio');


var rootpath = 'http://docs.oracle.com/javase/8/docs/api/';
var htmlRootPath = 'docs/j2se8/html/';
var jsonRootPath = 'docs/j2se8/json/';
getDirecriory =function (path) {
    var paths = path.split('/');

    if (paths.length) {
        paths.pop();
    }
    return paths.join('/');
};


getClassHTML=function (path) {
    docs_oracle_j2se8_http_get(path, function (error, response, body) {
        fs.writeFile(htmlRootPath + path, body, function (err) {
            //callback(err);
            //console.log(htmlRootPath + path);
        });
        var $ = cheerio.load(body);
        var json={};
        json['subTitle']=$('html body div.header div.subTitle').text();
        json['title']=$('html>body>div.contentContainer>div.description>ul.blockList>li.blockList>pre').text();
        json['description']=$('html>body>div.contentContainer>div.description>ul.blockList>li.blockList>div.block').text();
        json['since']=$('html>body>div.contentContainer>div.description>ul.blockList>li.blockList>dl');
        json['summary']=[];
        $('html>body>div.contentContainer>div.summary>ul.blockList>li.blockList>ul.blockList').each(function (index,item) {
            json.summary[index]={
              'title':$(this).find('h3').text(),

            };
        });

    });
};
getList = function (table,$) {
    var result = {};
    var lists = table.find('tbody').last().find('tr');
    result.summary = table.find('caption span').first().html();
    result.lists = [];
    lists.each(function (index, item) {
        item = $(this);
        var first = item.find('td.colFirst');
        result.lists[index] = {
            'a.href': first.find('a').attr('href'),
            'a.title': first.find('a').text(),
            'description': item.find('td.colLast div.block').text()
        }
    });
    return result;
};
getPackageJSONImpl = function (body, path) {
    var $ = cheerio.load(body);
    var json = {};
    var content = $('html body div ul.blockList li.blockList');
    var contentJSON = [];
    json['docSummary'] = $('html body div.header div.docSummary div.block').html();
    json['since'] = $('html body div.contentContainer dl dd').html();
    json['description'] = $('html body div.contentContainer').children('div.block').text();
    json['content']=contentJSON;

    content.each(function (index, element) {
        contentJSON[index] = getList($(this), $);
    });
    fsUtils.mkdirsSync(jsonRootPath + getDirecriory(path));
    fs.writeFile(jsonRootPath + path, JSON.stringify(json), function (err) {
        console.log(jsonRootPath + path +JSON.stringify(err));
    });
};
getPackageHtmlIMPL = function (path, callback) {
    docs_oracle_j2se8_http_get(path, function (error, response, body) {
        fsUtils.mkdirsSync(htmlRootPath + getDirecriory(path));
        fs.writeFile(htmlRootPath + path, body, function (err) {
            //callback(err);
            //console.log(htmlRootPath + path);
        });
        var $ = cheerio.load(body);
        var nextPage = $('html body div.subNav').first().children('ul.navList').first().children('li').next().children('a');
        console.log(path);
        getPackageJSONImpl(body,path.replace('.html','.json'));
        if (nextPage) {
            var nextPath = nextPage.attr('href').replace(/\..\//g, '');
            console.log("nextPath:" + nextPath);
            callback(nextPath);
        }
        //callback();
    });
};

exports.post = function (eventName, param) {
    singletonevent.emit(eventName, param);
};
exports.onEvent = onEvent;
function onEvent(eventName, callback) {
    singletonevent.on(eventName, callback);
}

onEvent("GET_HTML", function (path) {
    if (!path) {
        return;
    }
    getPackageHtmlIMPL(path, function (nextPath) {
        exports.post("GET_HTML", nextPath);
    });
});
onEvent("GET_CLASS_HTML", function (path) {
    if (!path) {
        return;
    }
    getClassHTML(path);
});
var docs_oracle_j2se8_http_get = function (path, callback) {
    HttpClient.get(rootpath + path, '', '', callback);
};

exports.getAPI = function (req, res, next) {
    fsUtils.mkdirsSync(htmlRootPath);
    fsUtils.mkdirsSync(jsonRootPath);
    exports.post("GET_HTML", 'java/applet/package-summary.html');
    res.json(200, {});
};