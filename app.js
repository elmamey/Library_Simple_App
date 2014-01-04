
/**
 * Module dependencies.
 */
var flash = require('connect-flash');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var router = require('./router');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var UserSchema = require('./schemas/user');
var dbconf = require('./dbconf');
var io = require('socket.io');
var utils = require('utils');

mongoose.connect('mongodb://' + dbconf.host + ':' + dbconf.port + '/' + dbconf.db);
var userModel = new UserSchema();

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  userModel.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    function(email, password, done) {
        process.nextTick(function () {
            userModel.findByEmail(email, function(err, user) {
                if (err) { 
                    return done(err); 
                }
                if (!user) { 
                    return done(null, false, { message: 'User don\'t exist'}); 
                }
                if (user.password !== password) { 
                    return done(null, false, { message: 'Invalid password' }); 
                }
                return done(null, user);
            });
        });
    }
));

var app = express();
var socket = io.listen(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.cookieParser('library'));
app.use(express.session({secret: 'library', key: 'express.sid'}));
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Router Module
router.route(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Socket io
socket.set('authorization', function (data, accept) {
    if (data.headers.cookie) {
        data.cookie = utils.parseCookie(data.headers.cookie);
        data.sessionID = data.cookie['express.sid'];
    } else {
       return accept('No cookie transmitted.', false);
    }
    accept(null, true);
});
