define(['models/bookModel', 'views/bookView','app', 'socketio'], function ( model, view, App, io ) {
    'use strict';
        
    var start = function(){
        App.collections.bookCollection = new model.bookCollection();
        App.views.bookList = new view.bookList({collection : App.collections.bookCollection, showMore : $('#showMoreBooks')});

        App.views.bookList.render();
        
        $('#book_container').html(App.views.bookList.el);
        
        App.collections.bookCollection.fetch({data : {page : App.views.bookList.collection.page, limit : App.views.bookList.collection.limit}, success: function(){ App.collections.bookCollection.page = App.collections.bookCollection.page + 1; }});
        
        try{
            var socket = io.connect("http://"+window.location.hostname);
            socket.on('book:save', function (data) {
                var bookModel = new model.book(data);
                if (App.collections.bookCollection.get(data._id) === undefined){
                    App.collections.bookCollection.add(bookModel);
                }
            });
            
            socket.on('book:delete', function (id) {
                if (App.collections.bookCollection.get(id) !== undefined){
                    var model = App.collections.bookCollection.get(id);
                    App.collections.bookCollection.remove(model);
                }
            });
        }catch (e){ }
    }
    
    return { start : start }
    
});