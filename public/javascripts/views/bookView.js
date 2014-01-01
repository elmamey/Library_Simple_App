define(['jquery', 'underscore', 'backbone'], function ( $, _, Backbone ) {
    'use strict';
        
    var Book = Backbone.View.extend({
            tagName : 'div',
            className : 'column',
            attributes : {
                'style' : 'position: relative;'
            },
            template: _.template($('#bookTemplate').html()),
            events : {
                'click i.remove' : 'remove'
            },
            initialize: function(){
                this.render();
            },
            render: function(){
                this.$el.html( this.template(this.model.toJSON()));
            },
            remove: function(){
                this.model.destroy();
                this.$el.remove();
            }
        }),
        
        BookList = Backbone.View.extend({
            tagName : 'div',
            className : 'three column doubling ui grid',
            initialize : function(){
                this.collection.on('add', this.addItem, this);
                //this.collection.on('remove', this.removeItem, this);
            },
            removeItem : function(){
                console.log(this.collection);
                //this.$el.remove();
            },
            addItem : function(item){
                var bookView = new Book({ model: item });
                this.$el.append(bookView.el);
            },
            render: function(){
                this.$el.empty();
                this.collection.each(function(book){
                    this.addItem(book);
                }, this);
            }
        }),
        
        BookForm = Backbone.View.extend({
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
        book : Book,
        bookList : BookList,
        bookForm : BookForm
    };
});