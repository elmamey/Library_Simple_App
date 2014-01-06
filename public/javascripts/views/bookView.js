define(['jquery', 'underscore', 'backbone','text!/templates/book.html'], function ( $, _, Backbone, template ) {
    'use strict';
        
    var Book = Backbone.View.extend({
            tagName : 'div',
            className : 'col-xs-4',
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
                var el = this.$el,
                    loader = $('<div class="ui active dimmer">'+
                             '<div class="ui text loader">Loading</div>'+
                             '</div>');
                el.find('.segment').append(loader);
                this.model.destroy({
                    success: function(){
                        el.remove();
                    },
                    error: function(){ 
                        loader.find('.text').removeClass('loader').text('Error Deleting this element');
                        setTimeout(function(){
                            loader.remove();
                        },3500);
                    }
                });

            }
        }),
        
        BookList = Backbone.View.extend({
            tagName : 'div',
            className : 'row',
            initialize : function(){
                this.collection.on('add', this.addItem, this);
                this.collection.bind('reset', this.render);
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
                $(this.el).empty();
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