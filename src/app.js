require('./lib/logger/log4j');
module.exports = function (server) {
    // crawler 爬虫
    var path = 'api/docs/crawler/git';
    server.get(path, require('./crawler/git').getList);

};
