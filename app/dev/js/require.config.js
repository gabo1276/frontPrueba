var SwimmingPoolApplicationHost = "http://localhost:8080";

require.config({
    baseUrl: '../app/dev/js',

    paths: {

        jquery: '../../../bower_components/jquery/dist/jquery',
        "jquery.validate": '../../../bower_components/jquery-validation/dist/jquery.validate',
        "jquery.table2excel": '../../../bower_components/jquery-table2excel/src/jquery.table2excel',

        backbone: '../../../bower_components/backbone/backbone',
        marionette: '../../../bower_components/backbone.marionette/lib/backbone.marionette',
        underscore: '../../../bower_components/underscore/underscore',
        'bootstrap-modal': '../../../bower_components/bootstrap/js/modal',

        /* handlebars from the require handlerbars plugin below */
        handlebars: '../../../bower_components/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../../../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../../../bower_components/require-handlebars-plugin/hbs/json2',
        hbs: '../../../bower_components/require-handlebars-plugin/hbs',

    },
    shim: {
        'jquery.validate': {
            deps: ['jquery']
        },
        'jquery.table2excel': {
            deps: ['jquery']
        }

    },
    hbs: {
        disableI18n: true,
        helperPathCallback:
            function(name) {
            return 'Templates/helpers/' + name;
        },
    },

});
