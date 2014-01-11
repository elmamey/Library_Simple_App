define(['jquery', 'underscore', 'backbone','models/bookModel','text!/templates/editBook.html', 'app'], function ( $, _, Backbone, Model, template, App ) {
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
            el.find('.modal-content').html(this.template(this.model.toJSON()));
        },
        save : function(){
            var form = $('#form_book_edit'),
                fields = {},
                view = this;
            
            form.find('p.text-danger').remove();
            
            form.find('input:text').each(function(){
                var $this = $(this);
                fields[$this.attr('name')] = $this.val();
            });
            
            view.model.parse = function(response){
                var object = {};
                if (response.data.success === 1){
                    _.each(response.data, function(a,b){
                        if (view.model.get(b) !== undefined){
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
            
            view.model.on('request', function(){
                //form.addClass('loading');
            });
            
            if (!view.model.isValid()) {
                var message = $('<p class="text-danger">' + view.model.validationError + '</p>');
                form.prepend(message.show());
            }else{
                view.model.save(fields,{
                    wait: true,
                    success : function(model,xhr){ 
                        if (xhr.data.success === 1){
                            form.find('input:text').val('');
                            view.trigger("book:update", view.model);
                            
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
            
            $('#form_book_edit').find('img').attr('src',$(e.currentTarget).val());
        }
    });
    
    _.extend(book, Backbone.Events);

        
    return {
        bookView : book
    };
});