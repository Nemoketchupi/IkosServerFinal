// ============ SERVER SETUP ============
console.log('-- Define server setup');

// PATH TO FILES
var path = require('path');

// HTTPS
var fs = require('fs');
var https = require('https');
var options = {
  key: fs.readFileSync('keys/server-no-key.pem', 'utf8'),
  cert: fs.readFileSync('keys/server-cert.pem', 'utf8')
};

// EXPRESS AND BODY PARSING
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// ROUTING
var routes = require('./routes/index');

// ============ SERVER BODY
console.log('-- Define server body');

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// EXPRESS SETUP
app.use(bodyParser.urlencoded({extended: true}));

// DEFINE ROUTING
app.use('/', routes);

/// CATCH 404 AND FORWARD TO ERROR HANDLER
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// DEVELOPMENT ERROR HANDLER
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});

// ============ SERVER CREATION ============
console.log('-- Create HTTPS server');

var httpsServer = https.createServer(options, app);

// TODO: DEFINE SERVER LISTENING PORT
app.set('port', process.env.PORT || 8080);

// LISTENING ON DEFINE PORT
httpsServer.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + httpsServer.address().port);
});
