
/*
 * GET users listing.
 */
var mongoose = require('mongoose'),
    UserSchema = require('../schemas/user');

exports.add = function(req, res){
    
    var field = req.body,
        User = new UserSchema();
        User.email = field.email;
        User.password = field.password;
        User.rol = field.rol;
        User.profile = {firstName : field.firstName,lastName : field.lastName,cb : new Date().getTime().toString(36)};
    
    
    UserSchema.findOne({email: field.email}, function(err, data){
        if (data === null){
            User.save(function(err, data){
                if (!err){
                    res.json({
                        code : 200,
                        data : {
                            success : 1,
                            _id : data._id
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
        }else{
           res.json({
                code : 200,
                data : {
                    success : 0,
                    message : 'Email already exist.'
                }
            }); 
        }
    });    
};