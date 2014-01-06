define(['jquery', 'underscore', 'backbone','models/userModel','text!/templates/addUser.html'], function ( $, _, Backbone, Model, template ) {
    'use strict';
        
    var user = Backbone.View.extend({
        template: _.template(template),
        initialize: function(){
            var el = this.$el;
            this.render();
        },
        events : {
            'click button[data-attr= "submit"]' : 'save'
        },
        render: function(){
            var el = this.$el;
            el.find('.modal-content').html(this.template({}));
        },
        save : function(){
            var form = $('#form_user_add'),
                fields = {},
                view = this;
            
            form.find('p.text-danger').remove();
            
            form.find('input:text, input:hidden, input:password, select').each(function(){
                var $this = $(this);
                fields[$this.attr('name')] = $this.val();
            });
            
            var userModel = new Model.userModel(fields);
            userModel.parse = function(response){
                var object = {};
                if (response.data.success === 1){
                    _.each(response.data, function(a,b){
                        if (userModel.get(b) !== undefined){
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
            
            userModel.on('request', function(){
                form.addClass('loading');
            });
            
            if (!userModel.isValid()) {
                var message = $('<p class="text-danger">' + userModel.validationError + '</p>');
                form.prepend(message.show());
            }else{
                userModel.save(null,{
                    success : function(model,xhr){ 
                        if (xhr.data.success === 1){
                            form.find('input:text, input:hidden, input:password, select').val('');
                            view.trigger("user:save", userModel); 
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

        }
    });
    
    _.extend(user, Backbone.Events);

        
    return {
        userView : user
    };
});