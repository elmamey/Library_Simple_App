
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
var utils = require('util');

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

var app = express(),
    cookieParse = express.cookieParser('library'),
    sessionStore = new express.session.MemoryStore();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(cookieParse);
app.use(express.session({secret: 'library', key: 'express.sid', store : sessionStore, cookie: {httpOnly: true}}));
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

var server = http.createServer(app),
    socket = io.listen(server);


// Socket io
socket.set('authorization', function (data, accept) {
    if (!data.headers.cookie) { return accept('No cookie transmitted.', false); }

    cookieParse(data,{}, function(err){

        var sidCookie = (data.secureCookies && data.secureCookies['express.sid']) ||
                        (data.signedCookies && data.signedCookies['express.sid']) ||
                        (data.cookie && data.cookie['express.sid']);

        sessionStore.load(sidCookie, function(err, session) {
                        
            if (err || !session) {
                accept('Error', false);
            } else {
                data.session = session;
                accept(null, true);
            }
        });
    });
});

socket.sockets.on('connection', function (socket) {
    var hs = socket.handshake;
    var intervalID = setInterval(function () {
        hs.session.reload( function () { 
            hs.session.touch().save();
        });
    }, 60 * 1000);
    
    socket.on('disconnect', function () {
        clearInterval(intervalID);
    });

});

// Router Module
router.route(app, socket);

server.listen(app.get('port'), function(){
    console.log('Server runing');
});
