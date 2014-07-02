var url = require('url');

function rewriter(req, res, next) {
    var requrl = url.parse(req.url);
    var result = req.app.match(requrl.pathname);
    result.forEach(function(item) {
        item.callbacks.forEach(function(callback) {
            if (callback && callback.rewriteTarget) {
                req.urlRewritten = req.url;
                requrl.pathname = requrl.pathname.replace(item.regexp, callback.rewriteTarget);
                req.url = url.format(requrl);
            }
        });
    });
    next();
}

rewriter.rewrite = function(target) {
    var handler = function(req, res, next) {
        // This route should never ever be handler because it will be
        // intercepted by the rewriter middleware before it gets here. If this
        // ever gets called, it means you forgot to use the rewriter middleware.
        res.send(500);
    };
    handler.rewriteTarget = target;
    return handler;
}

module.exports = rewriter;
