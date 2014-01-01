define(['jquery', 'underscore', 'backbone'], function ( $, _, Backbone ) {
    'use strict';
                
    var LoginForm = Backbone.View.extend({
            el : "#form_book",
            events : {
                'click button[type = "submit"]' : 'add'
            },
            add : function(e){
                e.preventDefault();
                
                this.collection.add({
                    title: this.$('input[type=text]').val(),
                    path: 'www.google.com'
                });
            }
        });
    
    return {
        login : LoginForm
    };
});