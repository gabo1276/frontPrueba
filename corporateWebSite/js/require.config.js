require.config({
    baseUrl: 'app/dev/js',

    paths: {

        jquery: '../../../bower_components/jquery/dist/jquery',
        "jquery.validate": '../../../bower_components/jquery-validation/dist/jquery.validate',
        styles: '../../styles',
    },
    shim: {
        'jquery.validate': {
            deps: ['jquery']
        }
    },
});
