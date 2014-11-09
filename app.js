var debug = require('debug')('newbeesite');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-locals')
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var flash = require("connect-flash");


var index = require('./routes/index');
var users = require('./routes/userRouter');
var posts = require('./routes/postRouter');
var Utils = require('./utils.js');
var admin = require('./routes/admin');


require('./dao/db');

var app = express();

app.engine('ejs', engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));



app.use(cookieParser());
app.use(session({
    secret: 'NEWBEE',
    store: new mongoStore({
              url: 'mongodb://localhost/nb_blog'
        }),
    resave: true,
    saveUninitialized: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);
app.use('/admin',admin);

app.locals.dateFormat= Utils.dateFormat;
app.locals.success = null ;
app.locals.error = null ;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//not used in express 4.0,changed to locals
// app.dynamicHelpers ({
//     user: function(req,res){
//         return req.session.user;
//     }
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

module.exports = app;
