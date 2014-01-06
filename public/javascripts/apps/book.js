define(['models/bookModel', 'views/bookView'], function ( model, view ) {
    'use strict';
    var start = function(){
        var bookModel = new model.book(),
            bookCollection = new model.bookCollection(),
            bookList = new view.bookList({collection : bookCollection});

        bookList.render();
        
        $('#book_container').html(bookList.el);
        
        bookCollection.fetch({data : {page : bookList.collection.page, limit : bookList.collection.limit}});
    }
    
    return { start : start }
    
});