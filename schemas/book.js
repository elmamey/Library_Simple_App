/* 
 * Books Model
 */
var mongoose = require('mongoose'),
    bookSchema = mongoose.Schema({
        _id : mongoose.Schema.Types.ObjectId,
        title : String,
        author : String,
        availables : Number,
        isbn : String
}, { collection: 'books' });

module.exports = mongoose.model('book', bookSchema);