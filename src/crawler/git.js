/**
 * Created by wfx on 16-5-28.
 */
var HttpClient = require('../lib/httpClient');
var async = require('async');
var fs = require('fs');
var cheerio = require('cheerio');

var devdocs_io_git_http_get = function (url, jsonParams, callback) {
    var options = {
        headers: {
            'Origin': 'http://devdocs.io',
            'Referer': url,
            'Accept': 'text/html',
            'Host': 'docs.devdocs.io'
        }
    };
    HttpClient.get(url, jsonParams, options, callback);
};
exports.getList = function (req, res, next) {
    fs.exists('docs/git-html-2.8.0/', function (exist) {
        if (!exist) {
            fs.mkdir('docs/git-html-2.8.0/');
        }
    });
    fs.exists('docs/git-json-2.8.0/', function (exist) {
        if (!exist) {
            fs.mkdir('docs/git-json-2.8.0/');
        }
    });
    async.each(json.entries, function (entry, callback) {
        devdocs_io_git_http_get('http://devdocs.io/git/' + entry.path + ".html", '', function (error, response, body) {
            fs.writeFile('docs/git-html-2.8.0/' + entry.path + ".html", body, function (err) {
                // callback(err);
            });
            var $ = cheerio.load(body);
            var h2 = $('h2');
            var length = h2.length;
            var json = {};
            var key;
            var value;
            for (var i = 0; i < length; i++) {
                key = h2.html();
                h2 = h2.next();
                value = h2.html();
                h2 = h2.next();
                // console.log(entry.path +": " +length +" key :"+ key);
                json[key] = value;
            }

            fs.writeFile('docs/git-json-2.8.0/' + entry.path + ".json", JSON.stringify(json), function (err) {
                callback(err);
            });

        });
    }, function (err) {
        res.json(200, err);
    });
};

var json = {
    "entries": [
        {
            "name": "git",
            "path": "git",
            "type": null
        },
        {
            "name": "git add",
            "path": "git-add",
            "type": null
        },
        {
            "name": "git am",
            "path": "git-am",
            "type": null
        },
        {
            "name": "git apply",
            "path": "git-apply",
            "type": null
        },
        {
            "name": "git archive",
            "path": "git-archive",
            "type": null
        },
        {
            "name": "git bisect",
            "path": "git-bisect",
            "type": null
        },
        {
            "name": "git blame",
            "path": "git-blame",
            "type": null
        },
        {
            "name": "git branch",
            "path": "git-branch",
            "type": null
        },
        {
            "name": "git bundle",
            "path": "git-bundle",
            "type": null
        },
        {
            "name": "git cat-file",
            "path": "git-cat-file",
            "type": null
        },
        {
            "name": "git checkout",
            "path": "git-checkout",
            "type": null
        },
        {
            "name": "git cherry-pick",
            "path": "git-cherry-pick",
            "type": null
        },
        {
            "name": "git clean",
            "path": "git-clean",
            "type": null
        },
        {
            "name": "git clone",
            "path": "git-clone",
            "type": null
        },
        {
            "name": "git commit",
            "path": "git-commit",
            "type": null
        },
        {
            "name": "git commit-tree",
            "path": "git-commit-tree",
            "type": null
        },
        {
            "name": "git config",
            "path": "git-config",
            "type": null
        },
        {
            "name": "git count-objects",
            "path": "git-count-objects",
            "type": null
        },
        {
            "name": "git daemon",
            "path": "git-daemon",
            "type": null
        },
        {
            "name": "git describe",
            "path": "git-describe",
            "type": null
        },
        {
            "name": "git diff",
            "path": "git-diff",
            "type": null
        },
        {
            "name": "git diff-index",
            "path": "git-diff-index",
            "type": null
        },
        {
            "name": "git fast-import",
            "path": "git-fast-import",
            "type": null
        },
        {
            "name": "git fetch",
            "path": "git-fetch",
            "type": null
        },
        {
            "name": "git filter-branch",
            "path": "git-filter-branch",
            "type": null
        },
        {
            "name": "git for-each-ref",
            "path": "git-for-each-ref",
            "type": null
        },
        {
            "name": "git format-patch",
            "path": "git-format-patch",
            "type": null
        },
        {
            "name": "git fsck",
            "path": "git-fsck",
            "type": null
        },
        {
            "name": "git gc",
            "path": "git-gc",
            "type": null
        },
        {
            "name": "git grep",
            "path": "git-grep",
            "type": null
        },
        {
            "name": "git hash-object",
            "path": "git-hash-object",
            "type": null
        },
        {
            "name": "git help",
            "path": "git-help",
            "type": null
        },
        {
            "name": "git init",
            "path": "git-init",
            "type": null
        },
        {
            "name": "git instaweb",
            "path": "git-instaweb",
            "type": null
        },
        {
            "name": "git log",
            "path": "git-log",
            "type": null
        },
        {
            "name": "git ls-files",
            "path": "git-ls-files",
            "type": null
        },
        {
            "name": "git merge",
            "path": "git-merge",
            "type": null
        },
        {
            "name": "git merge-base",
            "path": "git-merge-base",
            "type": null
        },
        {
            "name": "git mergetool",
            "path": "git-mergetool",
            "type": null
        },
        {
            "name": "git mv",
            "path": "git-mv",
            "type": null
        },
        {
            "name": "git pull",
            "path": "git-pull",
            "type": null
        },
        {
            "name": "git push",
            "path": "git-push",
            "type": null
        },
        {
            "name": "git read-tree",
            "path": "git-read-tree",
            "type": null
        },
        {
            "name": "git rebase",
            "path": "git-rebase",
            "type": null
        },
        {
            "name": "git reflog",
            "path": "git-reflog",
            "type": null
        },
        {
            "name": "git remote",
            "path": "git-remote",
            "type": null
        },
        {
            "name": "git request-pull",
            "path": "git-request-pull",
            "type": null
        },
        {
            "name": "git reset",
            "path": "git-reset",
            "type": null
        },
        {
            "name": "git rev-list",
            "path": "git-rev-list",
            "type": null
        },
        {
            "name": "git rev-parse",
            "path": "git-rev-parse",
            "type": null
        },
        {
            "name": "git revert",
            "path": "git-revert",
            "type": null
        },
        {
            "name": "git rm",
            "path": "git-rm",
            "type": null
        },
        {
            "name": "git send-email",
            "path": "git-send-email",
            "type": null
        },
        {
            "name": "git shortlog",
            "path": "git-shortlog",
            "type": null
        },
        {
            "name": "git show",
            "path": "git-show",
            "type": null
        },
        {
            "name": "git show-ref",
            "path": "git-show-ref",
            "type": null
        },
        {
            "name": "git stash",
            "path": "git-stash",
            "type": null
        },
        {
            "name": "git status",
            "path": "git-status",
            "type": null
        },
        {
            "name": "git submodule",
            "path": "git-submodule",
            "type": null
        },
        {
            "name": "git svn",
            "path": "git-svn",
            "type": null
        },
        {
            "name": "git symbolic-ref",
            "path": "git-symbolic-ref",
            "type": null
        },
        {
            "name": "git tag",
            "path": "git-tag",
            "type": null
        },
        {
            "name": "git update-index",
            "path": "git-update-index",
            "type": null
        },
        {
            "name": "git update-ref",
            "path": "git-update-ref",
            "type": null
        },
        {
            "name": "git update-server-info",
            "path": "git-update-server-info",
            "type": null
        },
        {
            "name": "git verify-pack",
            "path": "git-verify-pack",
            "type": null
        },
        {
            "name": "git write-tree",
            "path": "git-write-tree",
            "type": null
        }
    ],
    "types": []
};