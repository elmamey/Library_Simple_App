require.config({
    baseUrl : '/javascripts',
    paths: {
        jquery: 'jquery',
        underscore: 'underscore',
        backbone: 'backbone',
        bootstrap : 'bootstrap.min',
        socketio : '/socket.io/socket.io'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        "bootstrap": ['jquery'],
        'socketio': {
            exports: 'io'
        }
    }
});

require(["app", "router"], function(App, Router){
    Router.initialize(App);
});