define(['models/bookModel', 'views/bookView'], function ( model, view ) {
    'use strict';
    var start = function(){
        var bookModel = new model.book(),
            bookCollection = new model.bookCollection({title: 'David Flanagan',path: 'http://akamaicovers.oreilly.com/images/0636920016182/cat.gif'}),
            bookList = new view.bookList({collection : bookCollection}),
            bookForm = new view.bookForm({collection : bookCollection});
        
        bookList.render();
        
        $('#book_container').html(bookList.el);
    }
    
    return { start : start }
    
});