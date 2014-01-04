/* 
 * Books Model
 */
var mongoose = require('mongoose'),
    bookSchema = mongoose.Schema({
        title : String,
        author : String,
        availables : Number,
        path : String,
        isbn : String
}, { collection: 'books' });

module.exports = mongoose.model('book', bookSchema);