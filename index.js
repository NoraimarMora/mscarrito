'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var {PORT, SERVER_HOSTNAME, DB_HOST, DB_PORT} = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + DB_HOST + ':' + DB_PORT + '/ms_carrito', { useNewUrlParser: true })
    .then(() => {
        console.log('Connection to the database established successfully');

        // Creacion del servidor
        app.listen(PORT, () => {
            console.log(`Server running correctly in the url: http://${SERVER_HOSTNAME}:${PORT}`);
        });
    }).catch(error => {
    	console.log('Error in DB connection', error);
    });