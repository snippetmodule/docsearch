/**
 *
 */
var request = require('request');
var querystring = require('querystring');

exports.get = function (url, jsonParams, options, callback) {
    request.get(url + "?" + querystring.stringify(jsonParams), options, function (error, response, body) {
        callback(error, response, body);
    });
};
exports.post = function (url, jsonParams, options, callback) {
    // var options = {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // };
    request.post(url, options, function (error, response, body) {
        callback(error, response, body);
    }).form(jsonParams);
};