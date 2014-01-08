define(['jquery', 'underscore', 'backbone','models/bookModel','text!/templates/addBook.html', 'app'], function ( $, _, Backbone, Model, template, App ) {
    'use strict';
    
    var book = Backbone.View.extend({
        template: _.template(template),
        initialize: function(){
            var el = this.$el;
            this.render();
        },
        events : {
            'click button[data-attr= "submit"]' : 'save',
            'keyup input:text[name = "path"]' : 'updateImg'
        },
        render: function(){
            var el = this.$el;
            el.find('.modal-content').html(this.template({}));
        },
        save : function(){
            var form = $('#form_book_add'),
                fields = {},
                view = this;
            
            form.find('p.text-danger').remove();
            
            form.find('input:text, input:hidden, input:password, select').each(function(){
                var $this = $(this);
                fields[$this.attr('name')] = $this.val();
            });
            
            var bookModel = new Model.book(fields);
            bookModel.parse = function(response){
                var object = {};
                if (response.data.success === 1){
                    _.each(response.data, function(a,b){
                        if (bookModel.get(b) !== undefined){
                            object[b] = a;
                        }
                    });
                    return object;
                }else{

                    var message = $('<p class="text-danger">'+ response.data.message +'</p>');
                    form.prepend(message.show());
                    setTimeout(function(){
                        message.remove();
                    },3500);
                    
                    return false;
                }
            };
            
            bookModel.on('request', function(){
                //form.addClass('loading');
            });
            
            if (!bookModel.isValid()) {
                var message = $('<p class="text-danger">' + userModel.validationError + '</p>');
                form.prepend(message.show());
            }else{
                bookModel.save(null,{
                    success : function(model,xhr){ 
                        if (xhr.data.success === 1){
                            form.find('input:text').val('');
                            view.trigger("book:save", bookModel);
                            
                            if (App.collections.hasOwnProperty('bookCollection')){
                                App.collections.bookCollection.add(model,{at: 0});
                            }
                        }
                    },
                    error : function(){
                        var message = $('<p class="text-danger">Problem with the server</p>');
                        form.prepend(message.show());
                        setTimeout(function(){
                            message.remove();
                        },3500);
                    }
                });
            }
        },
        updateImg : function(e){
            
            $('#form_book_add').find('img').attr('src',$(e.currentTarget).val());
        }
    });
    
    _.extend(book, Backbone.Events);

        
    return {
        bookView : book
    };
});