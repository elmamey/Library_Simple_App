require(['require','jquery','underscore', 'backbone','bootstrap'], function ( require, $, _, Backbone ) {
    'use strict';
                
    var View = Backbone.View.extend({
            el : '#header_app',
            events : {
                'click #add-user-modal' : 'addUser',
                'click #add-book-modal' : 'addBook'
            },
            modalUserAdd : null,
            modalBookAdd : null,
            initialize : function(){
                var $this = this,
                    $el = $this.$el;
                    
                require(['views/addUserView','views/addBookView'], function(userView, bookView){
                    var user = new userView.userView({el : '#addUserModal'}),
                        book = new bookView.bookView({el : '#addBookModal'});
                    $this.modalUserAdd = $('#addUserModal');
                    $this.modalBookAdd = $('#addBookModal');
                    
                    user.on('user:save', function(model){
                        $this.modalUserAdd.modal('hide');
                        alert('User registered');
                    });
                    
                    book.on('book:save', function(model){
                        $this.modalBookAdd.modal('hide');
                        alert('Book registered');
                    });
                });
            },
            addUser : function(e){
                e.preventDefault();
                this.modalUserAdd.modal('show');
            },
            addBook : function(e){
                e.preventDefault();
                this.modalBookAdd.modal('show');
            }
        });
    $(document).ready(function(){
        new View();
    });
});