/**
 * Created by wangfaxi1985 on 16/6/2.
 */

var path = require('path');
var fs = require('fs');

//创建多层文件夹 同步
exports.mkdirsSync= function (dirpath, mode) {
    if (!fs.existsSync(dirpath)) {
        var pathtmp;
        dirpath.split(path.sep).forEach(function(dirname) {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, dirname);
            }
            else {
                pathtmp = dirname;
            }
            if (!fs.existsSync(pathtmp)) {
                if (!fs.mkdirSync(pathtmp, mode)) {
                    return false;
                }
            }
        });
    }
    return true;
}
//创建多层文件夹 异步
exports.mkdirs=function (dirpath, mode, callback) {
    callback = callback ||
        function() {};

    fs.exists(dirpath,
        function(exitsmain) {
            if (!exitsmain) {
                //目录不存在
                var pathlist = dirpath.split(path.sep);

                mkdir_auto_next(mode, pathlist, pathlist.length,
                    function(callresult) {
                        if (callresult) {
                            callback(true);
                        }
                        else {
                            callback(false);
                        }
                    });

            }
            else {
                callback(true);
            }

        });
}

// 异步文件夹创建 递归方法
function mkdir_auto_next(mode, pathlist, pathlistlength, callback, pathlistlengthseed, pathtmp) {
    callback = callback ||
        function() {};
    if (pathlistlength > 0) {

        if (!pathlistlengthseed) {
            pathlistlengthseed = 0;
        }

        if (pathlistlengthseed >= pathlistlength) {
            callback(true);
        }
        else {

            if (pathtmp) {
                pathtmp = path.join(pathtmp, pathlist[pathlistlengthseed]);
            }
            else {
                pathtmp = pathlist[pathlistlengthseed];
            }

            fs.exists(pathtmp,
                function(exists) {
                    if (!exists) {
                        fs.mkdir(pathtmp, mode,
                            function(isok) {
                                if (!isok) {
                                    mkdir_auto_next(mode, pathlist, pathlistlength,
                                        function(callresult) {
                                            callback(callresult);
                                        },
                                        pathlistlengthseed + 1, pathtmp);
                                }
                                else {
                                    callback(false);
                                }
                            });
                    }
                    else {
                        mkdir_auto_next(mode, pathlist, pathlistlength,
                            function(callresult) {
                                callback(callresult);
                            },
                            pathlistlengthseed + 1, pathtmp);
                    }
                });

        }

    }
    else {
        callback(true);
    }

}
