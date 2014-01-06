require(['require','jquery','underscore', 'backbone','bootstrap'], function ( require, $, _, Backbone ) {
    'use strict';
                
    var View = Backbone.View.extend({
            el : '#header_app',
            events : {
                'click #add-user-modal' : 'addUser'
            },
            modalUserAdd : null,
            initialize : function(){
                var $this = this,
                    $el = $this.$el;
                    
                require(['views/addUserView'], function(view){
                    var view = new view.userView({el : '#addUserModal'});
                    $this.modalUserAdd = $('#addUserModal');

                    view.on('user:save', function(model){
                        $this.modalUserAdd.modal('hide');
                        alert('User registered');
                    });
                });
            },
            addUser : function(e){
                e.preventDefault();
                this.modalUserAdd.modal('show');
            }
        });
    $(document).ready(function(){
        new View();
    });
});