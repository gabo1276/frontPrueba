define(['jquery', 'jquery.validate'], function($, jqueryValidate) {

    loginValidation = {

        validateForm: function() {

            $.validator.addMethod("regexp", function(value, element, regexpr) {
                var regexp = new RegExp(regexpr);
                return regexp.test(value);
            }, "Por Favor Ingrese un valor con el formato correcto.");

            $.validator.messages.required = "Campo requerido";

            $("#loginForm").validate({
                ignore: [],
                rules: {
                    rut: {
                        required: true,
                        regexp: "^([0-9]+)-[0-9|kK]$"
                    },
                    password: {
                        required: true
                    }
                },
                messages: {
                    rut: {
                        regexp: "Formato Incorrecto, Ej: 00000000-k (Sin puntos y con guión)"
                    }
                },
                errorPlacement: function(error, element) {
                    error.css({
                        'color': 'red'
                    });
                    error.insertAfter(element);
                }
            });

        },

        isValidForm: function() {
            return $("#loginForm").valid();
        }

    }

    return loginValidation;

});