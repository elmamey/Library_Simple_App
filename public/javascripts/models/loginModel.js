define(['underscore', 'backbone'], function ( _, Backbone){
    'use strict';

    var login = Backbone.Model.extend({
            defaults : {
                username : '',
                password : ''
            }
        }),
        
    
    return {
        login : login
    };
});