define(['underscore', 'backbone'], function ( _, Backbone){
    'use strict';

    var book = Backbone.Model.extend({
            defaults : {
                title : '',
                path : '',
                author : '',
                isbn : '',
                availables : 0
            }
        }),
        
        bookCollection = Backbone.Collection.extend({
            initialize: function() {
                this.page = 0;
                this.limit = 30;
            },
            model : book,
            url : '/books/0/30'
        });
    
    return {
        book : book,
        bookCollection : bookCollection
    };
});