var io  = require('socket.io');
var server = require('./server/server.js');

process.on('uncaughtException',
    function(err){
        if(err.code === 'EADDRINUSE'){
            console.error('Port is already in use.');
        } else {
            console.log(err);
        }
    }
);

new server({ dirname: __dirname, io: io });