/* 
 * Users Model
 */
var mongoose = require('mongoose'),
    usersSchema = mongoose.Schema({
        _id : mongoose.Schema.Types.ObjectId,
        password : String,
        email : String,
        created : { type: Date, "default" : Date.now },
        rol : String,
        profile : {
            cb : String,
            firstName : String,
            lastName : String
        }
}, { collection: 'users' });

usersSchema.methods.findById = function(id, fn){
    this.model('user').findOne({'_id' : id}, function(err, data){
        if (!err){
            if (data !== null && data !== undefined){
                fn(null, data);
            }else{
                fn(new Error('User ' + id + ' does not exist'));
            }
        }else{
            fn(new Error('User ' + id + ' does not exist'));
        }
    });
};

usersSchema.methods.findByEmail = function(email, fn){
    this.model('user').findOne({'email' : email}, function(err, data){
        if (!err){
            if (data !== null && data !== undefined){
                fn(null, data);
            }else{
                fn(null, null);
            }
        }else{
            fn(null ,null);
        }
    });
};

module.exports = mongoose.model('user', usersSchema);