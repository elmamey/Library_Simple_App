define(['jquery', 'underscore', 'backbone','text!/templates/book.html'], function ( $, _, Backbone, template ) {
    'use strict';
        
    var Book = Backbone.View.extend({
            tagName : 'div',
            className : 'column',
            attributes : {
                'style' : 'position: relative;'
            },
            template: _.template(template),
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
        });
    
    return {
        book : Book,
        bookList : BookList
    };
});