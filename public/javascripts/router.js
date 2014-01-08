define([
    'jquery',
    'underscore',
    'backbone',
    'views/editBookView'
    ], function($, _, Backbone, EditBook) {
  
        var AppRouter = Backbone.Router.extend({
            routes: {

                'modal/editBook/:id': 'modalEditBook',
      
                // Default
                '*actions': 'defaultAction'
            },
            modalEditBook : function(id){
                
                
            }
        });
        
        var initialize = function(app){
            
            var app_router = new AppRouter();
            app.router = app_router;
            
            app_router.on('route:modalEditBook', function(id){
    
                if (app.collections.hasOwnProperty('bookCollection')){
                    
                    $('body').find('.modal').modal('hide');
                    
                    var model = app.collections.bookCollection.get(id),
                        modal = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"></div></div></div>'),
                        editBook = new EditBook.bookView({model : model, el : modal.get(0)});
                        editBook.render();
                    $('body').append(editBook.el);
                    modal.modal('show');
                    modal.on('hidden.bs.modal', function (e) {
                        modal.remove();
                        app_router.navigate('');
                    });

                }
            });
            
            Backbone.history.start();
        };
        
        return {
            
            initialize: initialize
        };
    
});