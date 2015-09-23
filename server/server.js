var _ = require('lodash');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');
var http = require('http');
var proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    ws: true
});
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, '../', 'public');


function Server(systemEnv) {
     this.systemEnv = systemEnv;

        var app = this.app = express();

        app.use(express.static(publicPath));
        app.post('/invoke', bodyParser.json(), (req, res) => {
            'use strict';

            var methodName = req.body.methodName;
            var data = req.body.data || {};
            this[methodName](data)
                .then( response => {
                    res.send({ data: response });
                })
                .catch( err => {
                    let errorMessage = err.message ? err.message : err;
                    res.send({ error: true, errors: [errorMessage] });
                });
        });

       
        //webpack workflow
        if (!isProduction) {

            var bundle = require('./serverBundle.js');
            bundle();
            app.all('/build/*', function(req, res) {
                proxy.web(req, res, {
                    target: 'http://127.0.0.1:3001'
                });
            });
            app.all('/socket.io*', function(req, res) {
                proxy.web(req, res, {
                    target: 'http://127.0.0.1:3001'
                });
            });


            proxy.on('error', function(e) {
                // Just catch it
            });

            // We need to use basic HTTP service to proxy
            // websocket requests from webpack
            // var server = http.createServer(app);

            // server.on('upgrade', function(req, socket, head) {
            //     proxy.ws(req, socket, head);
            // });

            // server.listen(port, function() {
            //     console.log('Server running on port ' + port);
            // });
        } else {
            // And run the server
            // app.listen(port, function() {
            //     console.log('Server running on port ' + port);
            // });

        }
 

        this.server = app.listen(port, () => {
            console.log(
                'React UI Builder started successfully.\nPlease go to http://localhost:%d/builder',
                this.server.address().port
            );
            if(this.systemEnv.io){
                this.socket = this.systemEnv.io(this.server);
                this.socket.on('connection', socket => {
                    this.socketClient = socket;
                });
            }
        });


}



module.exports = Server;