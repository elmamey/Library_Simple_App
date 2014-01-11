var login = require('./routes/index')
  , books = require('./routes/books')
  , users = require('./routes/user')
  , passport = require('passport');

exports.route = function(app, socket){
    /**
    * Login Page
    */
    app.get('/', function(req, res, next){
        if (req.isAuthenticated()) { 
            res.redirect('/bookp');
        }else{
            return next();
        }
        
    },login.index);
    
    /**
    * Login Action
    */
    app.post('/login',passport.authenticate('local', { failureRedirect: '/', failureFlash : true}
    ),function(req, res) {
        res.redirect('/bookp');
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
    app.get('/bookp', function(req, res, next){
        if (!req.isAuthenticated()) { 
            res.redirect('/');
        }else{
            return next();
        }
    }, books.index);
    
    /** 
    * Books gets
    */
    app.get('/books', function(req, res, next){
        if (!req.isAuthenticated()) { 
            res.send(403);
        }else{
            return next();
        }
    }, books.get);
    
    /**
    * Books save
    */
    app.post('/books', function(req,res){
        if (!req.isAuthenticated()) { 
            res.send(403);
        }else{
            books.save(req,res, socket);
        }
    });
    
    /** 
    * Books delete
    */
    app.delete('/books/:id', function(req, res){
        if (!req.isAuthenticated()) { 
            res.send(403);
        }else{
            books.delete(req,res,socket);
        }
    });
    
    /**
    * Books update
    */
    app.put('/books/:id', function(req, res){
        if (!req.isAuthenticated()) { 
            res.send(403);
        }else{
            books.update(req,res,socket);
        }
    });
    
    /**
    * User add
    */
    app.post('/users', function(req, res, next){
        if (!req.isAuthenticated()) { 
            res.send(403);
        }else{
            return next();
        }
    },users.add);
};