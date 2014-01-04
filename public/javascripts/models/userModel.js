define(['underscore', 'backbone'], function ( _, Backbone){
    'use strict';

    var user = Backbone.Model.extend({
        defaults : {
            _id : null,
            password : '',
            email : '',
            rol : '',
            firstName : '',
            lastName : ''
        },
        idAttribute: '_id',
        url : '/users',
        validate : function(attrs, options){
            if (attrs.firstName === ''){
                return 'First name is required.';
            }
            
            if (attrs.lastName === ''){
                return 'Last name is required.';
            }
            
            if(attrs.rol === ''){
                return 'Rol is required.';
            }
            
            if (!attrs.email.match(/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/)) {
                return 'Email is invalid.';
            }
            
            if(attrs.password.length > 6){
                return 'The password must contain at least 6 characters.';
            }
        }
    });
    
    return {
        userModel : user
    };
});