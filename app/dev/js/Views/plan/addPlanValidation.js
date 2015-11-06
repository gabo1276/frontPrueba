define(['jquery', 'jquery.validate'], function($, jqueryValidate) {

    addPlanValidation = {

        validateForm: function() {

            $.validator.addMethod("regexp", function(value, element, regexpr) {
                var regexp = new RegExp(regexpr);
                return regexp.test(value);

            }, "Por Favor Ingrese un valor con el formato correcto.");

            $.validator.addMethod("typeOfPlanValidation", function() {

                var element;
                if ($("#hoursPerWeek").val()) {
                    element = $("#hoursPerWeek").val();
                } else if ($("#blocksPerWeek").val()) {
                    element = $("#blocksPerWeek").val();
                }

                if ($("#blocksPerWeekContainer").is(':visible') || $("#hoursPerWeekContainer").is(':visible')) {
                    var regexp = new RegExp("^[0-9]+$");
                    return regexp.test(element);
                }
                return true;

            }, "Solo números Ej: 6");


            $.validator.messages.required = "Campo requerido";

            $("#addPlanForm").validate({
                ignore: [],
                rules: {
                    name: {
                        required: true,
                        regexp: "^[0-9A-ZÑa-zñ áéíóúÁÉÍÓÚ]+$"
                    },
                    description: {
                        required: true
                    },
                    price: {
                        required: true,
                        regexp: "^[0-9]+$"
                    },
                    typeOfPlan: {
                        required: true,
                    },
                    addPlanValidation: {
                        typeOfPlanValidation: true
                    }
                },
                messages: {
                    name: {
                        regexp: "Formato Incorrecto: Solo números y letras"
                    },
                    price: {
                        regexp: "Solo números Ej: 35000"
                    },
                    typeOfPlan: {
                        required: "Seleccione alguna opción"
                    },
                    addPlanValidation: {
                        typeOfPlanValidation: "Solo números Ej: 6"
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
            return $("#addPlanForm").valid();
        }

    }

    return addPlanValidation;

});