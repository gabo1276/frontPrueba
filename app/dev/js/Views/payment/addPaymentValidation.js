define(['jquery', 'jquery.validate'], function($, jqueryValidate) {

    addPaymentValidation = {

        validateForm: function() {

            $.validator.addMethod("regexp", function(value, element, regexpr) {
                var regexp = new RegExp(regexpr);
                if (value) {
                    return regexp.test(value);
                } else {
                    return true;
                }

            }, "Por Favor Ingrese un valor con el formato correcto.");
            $.validator.messages.required = "Campo requerido";


            $("#addPaymentForm").validate({
                ignore: '',
                rules: {
                    numberOfTicket: {
                        required: true,
                        regexp: "^[0-9]+$"
                    },
                    usersCombo:{
                        required: true
                    },
                    plansCombo:{
                        required: true
                    },
                    formOfPayment: {
                        required: true,
                    },
                    chequeNumber:{
                        regexp: "^[0-9]+$"
                    }
                },
                messages: {
                    numberOfTicket: {
                        regexp: "Formato Incorrecto: Solo números"
                    },
                    chequeNumber: {
                        regexp: "Formato Incorrecto: Solo números"
                    },
                    plansCombo:{
                        required: "Seleccione alguna opción"
                    },
                    usersCombo:{
                        required: "Seleccione alguna opción"
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
            return $("#addPaymentForm").valid();
        }

    }

    return addPaymentValidation;

});