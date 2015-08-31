var _ = require('underscore');
var express = require("express");
var path = require('path');
var bodyParser = require('body-parser');
var httpProxy = require('http-proxy');

var app = null;
var socket = null;
var server = null;
var io = null;
var proxy = null;

var systemEnv = {
    builderDir: './',
    fileConfigPath: './react-builder.json',

    templateDirPath: './template',
    serviceDirUrl: '/.data'
};


function webpackDevMiddleware(req, res, next) {
    var filename = getFilenameFromUrl(req.url);
    if (filename === false) return next();

    // in lazy mode, rebuild on bundle request
    if(options.lazy && (!options.filename || options.filename.test(filename)))
        rebuild();

    // delay the request until we have a vaild bundle
    ready(function() {
        try {
            var stat = fs.statSync(filename);
            if(!stat.isFile()) {
                if (stat.isDirectory()) {
                    filename = path.join(filename, "index.html");
                    stat = fs.statSync(filename);
                    if(!stat.isFile()) throw "next";
                } else {
                    throw "next";
                }
            }
        } catch(e) {
            return next();
        }

        // server content
        var content = fs.readFileSync(filename);
        res.setHeader("Access-Control-Allow-Origin", "*"); // To support XHR, etc.
        res.setHeader("Content-Type", mime.lookup(filename));
        res.setHeader("Content-Length", content.length);
        if(options.headers) {
            for(var name in options.headers) {
                res.setHeader(name, options.headers[name]);
            }
        }
        res.end(content);
    }, req);
}

if(options.dirname){
    systemEnv.builderDir = options.dirname;
    systemEnv.fileConfigPath = path.join(options.dirname, 'react-builder.json');
    systemEnv.templateDirPath = path.join(options.dirname, 'template');
}

app = express();
app.use(bodyParser.json());

app.use('/builder', express.static(path.join(systemEnv.builderDir, 'html')));
app.use('/.data', express.static(path.join(systemEnv.builderDir, '.data')));
app.post('/invoke', function(req, res){
    var methodName = req.body.methodName;
    var data = req.body.data;
    this[methodName](data, function(response){
        res.send(response);
    });
}.bind(this));


var webpack = require("webpack");

// returns a Compiler instance
var compiler = webpack({
    // configuration
});

compiler.run(function(err, stats) {
    // ...
});
// or
compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
    // ...
});

server = app.listen(2222, function() {
    console.log(
        'React UI Builder started successfully.\nPlease go to http://localhost:%d/builder',
        server.address().port
    );
    if(options.io) {
        io = options.io;
    }
    if(io){
        socket = io(server);
        socket.on('connection', function(socket){
            socketClient = socket;
        });
    }
});