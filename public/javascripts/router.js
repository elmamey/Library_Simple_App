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
            }
        })
            , modalTemplate = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"></div></div></div>')
            , activeModal = null
            , initialize = function(app){
            
            var app_router = new AppRouter();
            app.router = app_router;
                
            app_router.on('route:modalEditBook', function(id){
    
                if (app.collections.hasOwnProperty('bookCollection')){
                    
                    if (app.collections.bookCollection.get(id) !== undefined){
                        
                        if (activeModal !== null){ activeModal.modal('hide'); }
                        activeModal = modalTemplate;
                        var model = app.collections.bookCollection.get(id),
                            editBook = new EditBook.bookView({model : model, el : activeModal.get(0)});
                        editBook.render();
                        
                        editBook.on('book:update', function(){
                            modal.modal('hide');
                        });
                        
                        $('body').append(editBook.el);
                        activeModal.modal('show');
                        activeModal.on('hidden.bs.modal', function (e) {
                            activeModal.remove();
                            app_router.navigate('');
                            activeModal = null;
                        });
                    }else{
                        app_router.navigate('');
                    }
                }
            });
                
            app_router.on('route:defaultAction', function(){
                if(activeModal !== null){
                    activeModal.modal('hide');
                }
                
                
            });
                        
            Backbone.history.start();
        };
        
        return {
            
            initialize: initialize
        };
    
});