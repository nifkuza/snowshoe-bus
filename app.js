var logme = require('logme');
var express = require('express');

process.on('uncaughtException', function(err) {
    debugger;
    logme.error('Caught Error ' + err);
    if (err.stack) {
        logme.error('Stack ' + err.stack);
    }
});

// create the express web application server
var app = express();

app.configure(function() {
    app.set('view engine', 'jade');
    app.set("views", __dirname + '/views');
    app.enable('jsonp callback');
    app.enable('trust proxy');

    app.use(express.favicon(__dirname + '/public/img/favicon.ico'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());

    /**
     *  Routes for serving up static content
     **/
    app.use(express.static(__dirname + '/public', {clientMaxAge: -1}));
    app.use(express.compress());

    /**
     *  Router must happen after session and static route definition
     **/
    app.use(app.router);

    /**
     *  Default error handler when things go wrong
     **/
    app.use(function(err, req, res, next){
        logme.error(err.stack);
        res.json({error:'Internal Server Error'},500);
        next();
    });

    // API
    require('./routes/stamp')(app);

});

// start the web application server
var port = 8080;
app.listen(port);
logme.info('server started on port ' + port);
module.exports = app;
