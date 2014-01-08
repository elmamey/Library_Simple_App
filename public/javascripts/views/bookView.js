define(['jquery', 'underscore', 'backbone','text!/templates/book.html', 'app'], function ( $, _, Backbone, template, App ) {
    'use strict';
        
    var Book = Backbone.View.extend({
            tagName : 'div',
            className : 'col-xs-4',
            attributes : {
                'style' : 'position: relative;'
            },
            template: _.template(template),
            events : {
                'click button:has(i.fa-times)' : 'remove',
                'click button:has(i.fa-edit)' : 'edit'
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
            },
            edit : function(){
                App.router.navigate('modal/editBook/' + this.model.get('_id'), {trigger: true});
            }
        }),
        
        BookList = Backbone.View.extend({
            tagName : 'div',
            className : 'row',
            showMore : $('#showMoreBooks'),
            initialize : function(){
                var self = this;
                self.collection.on('add', this.addItem, this);
                self.collection.bind('reset', this.render);
                self.collection.on('remove', this.removeItem, this);

                self.showMore.on('click', function(e){ self.showMoreAction(e); });
                
                self.showMoreState();
            },
            removeItem : function(){
                this.collection.count = this.collection.count - 1;
            },
            addItem : function(item){
                var bookView = new Book({ model: item });
                this.$el.append(bookView.el);
                this.showMoreState();
            },
            render: function(){
                $(this.el).empty();
                this.collection.each(function(book){
                    this.addItem(book);
                }, this);
            },
            showMoreState: function(){
                if (this.showMore !== null){
                    if (this.collection.count - this.collection.length > 0){
                        this.showMore.prop('disabled', false).show();
                    }else{
                         this.showMore.hide();
                    }
                }
            },
            showMoreAction: function(e){
                var $this = $(e.target), self = this;
                $this.prop('disabled', true).text('Loading...');
                self.collection.fetch({remove: false,data : {page : self.collection.page, limit : self.collection.limit}, success: function(){ 
                    self.collection.page = self.collection.page + 1; 
                    $this.prop('disabled', false).text('Show More');
                }});
            }
        });
    
    return {
        book : Book,
        bookList : BookList
    };
});