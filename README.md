express-rewrite
===============

Express middleware for rewriting URLs without doing an http redirect.

Usage
------------

You must install the express-rewrite middleware before any other middleware. Repeat: the first time you call server.use(), you must call it on express-rewrite.  This is because it modifies the value of req.url, and you want that to happen before any other middleware looks at the request.

	var rewriter = require('express-rewrite');

	var server = express.createServer();
    server.configure(function() {
        server.use(rewriter);
		server.use(server.router);
	});

To rewrite a URL, you use the usual Express routing functions, but with a call to rewriter.rewrite() as the callback.

	server.get('/from/some/url', rewriter.rewrite('/to/another/url'));

You can replace parts of the rewritten URL with matched groups from the original URL. This works the same way as string.replace() when called with a regular expression. Actually, it is a call to string.replace() using the regular expression compiled by the Express router.

	server.get('/post/:year/:month', rewriter.rewrite('/post?year=$1&month=$2'));

Installation
------------

    $ npm install express-rewrite

License 
-------

Copyright 2011 Joe Hewitt

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
