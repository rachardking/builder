var _ = require('lodash');
var express  = require('express');
var path = require('path');
var bodyParser = require('body-parser');


class Server {

    constructor(systemEnv){

        this.systemEnv = systemEnv;

        

        this.app = express();
        // use middleware body parsers only for certain routes, because of the proxying post request is hanging
        //this.app.use('/public', bodyParser.json(), express.static(path.join(this.systemEnv.serverDir, 'html')));
        this.app.use(express.static(__dirname + '/public'));
        this.app.post('/invoke', bodyParser.json(), (req, res) => {
            'use strict';

            let methodName = req.body.methodName;
            let data = req.body.data || {};
            this[methodName](data)
                .then( response => {
                    res.send({ data: response });
                })
                .catch( err => {
                    let errorMessage = err.message ? err.message : err;
                    res.send({ error: true, errors: [errorMessage] });
                });
        });

        this.server = this.app.listen(2222, () => {
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


}

module.exports = Server;
