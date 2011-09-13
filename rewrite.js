
function rewriter(req, res, next) {
    var result = req.app.match(req.url);
    result.forEach(function(item) {
        item.callbacks.forEach(function(callback) {
            if (callback && callback.rewriteTarget) {
                req.urlRewritten = req.url;
                req.url = req.url.replace(item.regexp, callback.rewriteTarget);
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
