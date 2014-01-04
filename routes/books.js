
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
    , response = {'data' : [], 'count' : 0};

    BookSchema.find({},function(err,data){
        if (!err){
            BookSchema.count({}, function(err, count){
                if (!err){
                    response.count = count;
                    response.data = data;
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