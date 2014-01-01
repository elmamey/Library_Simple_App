require(['jquery','underscore', 'backbone','semantic'], function ( $, _, Backbone ) {
    'use strict';
                
    var View = Backbone.View.extend({
            el : "#optionHeaderProfile",
            events : {
                'click .menu .item' : 'goTo'
            },
            initialize : function(){
                var $el = this.$el;
                $(document).ready(function(){
                    $el.dropdown(); 
                });
            },
            goTo : function(e){
                var target = $(e.currentTarget);
                
                window.location.href = target.data('href');
            }
        });
    new View();
});