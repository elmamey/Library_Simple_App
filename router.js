var login = require('./routes/index')
  , books = require('./routes/books')
  , passport = require('passport');

exports.route = function(app){
    /**
    * Login Page
    */
    app.get('/', function(req, res, next){
        if (req.isAuthenticated()) { 
            res.redirect('/books');
        }else{
            return next();
        }
        
    },login.index);
    
    /**
    * Login Action
    */
    app.post('/login',passport.authenticate('local', { failureRedirect: '/', failureFlash : true}
    ),function(req, res) {
        res.redirect('/books');
    });
    
    /**
    *Logout Action
    */
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
    });
    
    /**
    * Books Page 
    */
    app.get('/books', function(req, res, next){
        if (!req.isAuthenticated()) { 
            res.redirect('/');
        }else{
            return next();
        }
    }, books.index);
    
    /** 
    Books gets
    */
    app.get('/books/:offset/:limit', function(req, res, next){
        if (!req.isAuthenticated()) { 
            res.send(403);
        }else{
            return next();
        }
    }, books.get)
    
};