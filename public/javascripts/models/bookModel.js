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
            model : book
        });
    
    return {
        book : book,
        bookCollection : bookCollection
    };
});