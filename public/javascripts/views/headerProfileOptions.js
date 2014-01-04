require(['require','jquery','underscore', 'backbone','semantic'], function ( require, $, _, Backbone ) {
    'use strict';
                
    var View = Backbone.View.extend({
            el : "#optionHeaderProfile",
            events : {
                'click .menu .item:first-child' : 'goTo',
                'click #add-user-modal' : 'addUser'
            },
            modalUserAdd : null,
            initialize : function(){
                var $this = this,
                    $el = $this.$el;

                $(document).ready(function(){
                    $el.dropdown();
                    
                    require(['views/addUserView'], function(view){
                        var view = new view.userView({el : '#addUserModal'});
                        $this.modalUserAdd = $('#addUserModal');
                        
                        view.on('user:save', function(model){
                            $this.modalUserAdd.modal('hide');
                            alert('User registered');
                        });
                    });
                });
            },
            goTo : function(e){
                var target = $(e.currentTarget);
                window.location.href = target.data('href');
            },
            addUser : function(){
                this.modalUserAdd.modal('show');
            }
        });
    new View();
});