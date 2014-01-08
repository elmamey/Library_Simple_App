require.config({
    baseUrl : '/javascripts',
    paths: {
        jquery: 'jquery',
        underscore: 'underscore',
        backbone: 'backbone',
        bootstrap : 'bootstrap.min'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        "bootstrap": ['jquery']
    }
});

require(["app", "router"], function(App, router){
});