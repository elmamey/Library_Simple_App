define(['models/bookModel', 'views/bookView','app'], function ( model, view, App ) {
    'use strict';
        
    var start = function(){
        var bookModel = new model.book();
        App.collections.bookCollection = new model.bookCollection();
        App.views.bookList = new view.bookList({collection : App.collections.bookCollection, showMore : $('#showMoreBooks')});

        App.views.bookList.render();
        
        $('#book_container').html(App.views.bookList.el);
        
        App.collections.bookCollection.fetch({data : {page : App.views.bookList.collection.page, limit : App.views.bookList.collection.limit}, success: function(){ App.collections.bookCollection.page = App.collections.bookCollection.page + 1; }});
    }
    
    return { start : start }
    
});