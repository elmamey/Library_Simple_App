
/*
 * GET Book listing.
 */
var mongoose = require('mongoose'),
    BookSchema = require('../schemas/book');

exports.index = function(req, res){
    res.render('books', { user: req.user });
};

exports.get = function(req, res){
    var page = req.query.page || 0
    , limit = req.query.limit || 30
    , offset = page * limit
    , response = {'data' : [], 'count' : 0}
    , isReservable = (req.user.rol === 'admin') ? false : true
    , isDeleteable = (req.user.rol === 'admin') ? true : false
    , isUpdateable = (req.user.rol === 'admin') ? true : false;
    
    console.log(req.event);
    
    //req.res.socket.broadcast.emit('get','asd');
    
    BookSchema.find({}).skip(offset).limit(limit).exec(function(err,data){
        if (!err){
            BookSchema.count({}, function(err, count){
                if (!err){
                    response.count = count;
                    
                    for(var i = 0, length = data.length; i < length; i++){
                        
                        var inf = {
                            isReservable : isReservable,
                            isDeleteable : isDeleteable,
                            isUpdateable : isUpdateable,
                            _id : data[i]._id,
                            title : data[i].title,
                            path : data[i].path,
                            author : data[i].author,
                            isbn : data[i].isbn,
                            availables : data[i].availables
                        };
                        
                        if (data[i].availables < 0){
                            inf['isReservable'] = false;
                        } 
                        response.data.push(inf);
                    }
                    res.json(response);
                }else{
                    res.send(500);
                }
            });
        }else{
            res.send(500);
        }
    });
};  

exports.save = function(req, res, socket){
    
    var field = req.body,
        Book = new BookSchema();
    
    Book.title = field.title;
    Book.author = field.author;
    Book.isbn = field.isbn;
    Book.path = field.path;
    Book.availables = field.availables;
    
    var isReservable = (req.user.rol === 'admin') ? false : true
        , isDeleteable = (req.user.rol === 'admin') ? true : false
        , isUpdateable = (req.user.rol === 'admin') ? true : false
    
    Book.save(function(err, data){
        if (!err){
            
            if (data.availables < 0){
                isReservable = false;
            } 
            
            socket.sockets.emit('book:save', data);
            
            res.json({
                code : 200,
                data : {
                    success : 1,
                    _id : data._id,
                    isReservable : isReservable,
                    isDeleteable : isDeleteable,
                    isUpdateable : isUpdateable
                }
            });
        }else{
            res.json({
                code : 500,
                data : {
                    success : 0,
                    message : err
                }
            });
        }
    });
};

exports.delete = function(req, res, socket){
    var id = req.params.id;
    
    BookSchema.remove({_id : id}, function(err, data){
    
        if (err){ res.send(404); }
        
        socket.sockets.emit('book:delete', id);
        
        res.send(204);
    });
};

exports.update = function(req, res){
    var id = req.params.id,
        field = req.body;
    
    BookSchema.findByIdAndUpdate({ _id: id }, 
        { $set: { 
            title: field.title,
            author: field.author,
            availables: field.availables,
            path: field.path,
            isbn: field.isbn
        }}, function(err, data){
        
            if (!err){
                res.json({
                    code : 200,
                    data : {
                        success : 1
                    }
                });
                
            }else{
                
                res.json({
                    code : 500,
                    data : {
                        success : 0,
                        message : err
                    }
                });
                
            }
    });
};