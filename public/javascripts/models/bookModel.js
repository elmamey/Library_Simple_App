define(['underscore', 'backbone'], function ( _, Backbone){
    'use strict';

    var book = Backbone.Model.extend({
            defaults : {
                _id : null,
                title : '',
                path : '',
                author : '',
                isbn : '',
                availables : 0,
                isReservable : true,
                isDeleteable : true,
                isUpdateable : true
            },
            urlRoot: '/books',
            idAttribute: '_id',
            validate: function(attrs, options){
                if (attrs.title === ''){
                    return 'Title is required.';
                }
                
                if (attrs.author === ''){
                    return 'Author is required.';
                }
                
                if (attrs.isbn === ''){
                    return 'ISBN is required.';
                }
                
                if (attrs.availables === ''){
                    return 'Availables is required.';
                }
                
                if (attrs.availables !== '' && isNaN(attrs.availables) === true){
                    return 'Availables only accept numbers.';
                }
            }
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