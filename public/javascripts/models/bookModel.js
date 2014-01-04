define(['underscore', 'backbone'], function ( _, Backbone){
    'use strict';

    var book = Backbone.Model.extend({
            defaults : {
                _id : null,
                title : '',
                path : '',
                author : '',
                isbn : '',
                availables : 0
            },
            url : '/books',
            idAttribute: '_id'
        }),
        
        bookCollection = Backbone.Collection.extend({
            initialize: function() {
                this.page = 0;
                this.limit = 30;
                this.count = 0;
            },
            parse: function(response) {
                this.count = response.count;
                return response.data;
            },
            model : book,
            url : '/books'
        });
    
    return {
        book : book,
        bookCollection : bookCollection
    };
});