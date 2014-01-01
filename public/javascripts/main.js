require.config({
    baseUrl : '/javascripts',
    paths: {
        jquery: 'jquery',
        underscore: 'underscore',
        backbone: 'backbone',
        semantic : 'semantic'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        "semantic": ['jquery']
    }
});