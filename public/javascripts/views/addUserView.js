define(['jquery', 'underscore', 'backbone','models/userModel','text!/templates/addUser.html', 'semantic'], function ( $, _, Backbone, Model, template ) {
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
            el.html( this.template({}));
        },
        save : function(){
            var form = $('#form_user_add'),
                fields = {},
                view = this;
            
            form.find('div.message').remove();
            
            form.find('input:text, input:hidden, input:password, select').each(function(){
                var $this = $(this);
                fields[$this.attr('name')] = $this.val();
                $this.val('');
            });
            
            var userModel = new Model.userModel(fields);
            userModel.parse = function(response){
                var object = {};
                _.each(response.data, function(a,b){
                    if (userModel.get(b) !== undefined){
                        object[b] = a;
                    }
                });
                return object;
            };
            
            userModel.on('request', function(){
                form.addClass('loading');
            });
            
            if (!userModel.isValid()) {
                var message = $('<div class="ui error message"><p>' + user.validationError + '</p></div>');
                form.prepend(message.show());
            }else{
                userModel.save(null,{
                    success : function(model,xhr){ 
                        form.removeClass('loading');
                        view.trigger("user:save", userModel); 
                    },
                    error : function(){
                        form.removeClass('loading');
                        var message = $('<div class="ui error message"><p>Problem with the server</p></div>');
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