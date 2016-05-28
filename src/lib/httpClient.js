/**
 *
 */
var request = require('request');
var querystring = require('querystring');

function get(url, jsonParams, options, callback) {
    request.get(url + "?" + querystring.stringify(jsonParams), options, function (error, response, body) {
        callback(error, response, body);
    });
}

function post(url, jsonParams, options, callback) {
    // var options = {
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // };
    request.post(url, options, function (error, response, body) {
        callback(error, response, body);
    }).form(jsonParams);
}

exports.get = get;
exports.post = post;