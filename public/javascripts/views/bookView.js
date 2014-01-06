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
                'click button:has(i.fa-times)' : 'remove'
            },
            initialize: function(){
                this.render();
            },
            render: function(){
                this.$el.html( this.template(this.model.toJSON()));
            },
            remove: function(){
                var el = this.$el,
                    loader = $('<div class="shape-panel">'+
                             '<div><i class="fa fa-spinner fa-spin fa-2x"></i></div>'+
                             '</div>');
                el.find('.panels-book').append(loader);

                this.model.destroy({
                    success: function(){
                        el.remove();
                    },
                    error: function(){ 
                        loader.find('div').first().text('Error Deleting this element');
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