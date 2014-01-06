
/*
 * GET Book listing.
 */
var mongoose = require('mongoose'),
    BookSchema = require('../schemas/book');

exports.index = function(req, res){
    res.render('books', { user: req.user });
};

exports.get = function(req, res){
    var offset = req.body.page || 0
    , limit = req.body.limit || 30
    , response = {'data' : [], 'count' : 0}
    , isReservable = (req.user.rol === 'admin') ? false : true
    , isDeleteable = (req.user.rol === 'admin') ? true : false
    , isUpdateable = (req.user.rol === 'admin') ? true : false

    BookSchema.find({},function(err,data){
        
        if (!err){
            BookSchema.count({}, function(err, count){
                if (!err){
                    response.count = count;
                    //response.data = data;
                    
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
    }).skip(offset).limit(limit);
};  

exports.delete = function(req, res){
    var id = req.params.id;
    
    BookSchema.remove({_id : id}, function(err, data){
    
        if (err){ res.send(404); }
        
        res.send(204);
        
    });
    
};