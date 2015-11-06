define(['jquery', 'jquery.validate'], function($, jqueryValidate) {

    addScheduleValidation = {

        validateForm: function() {

            $.validator.addMethod("regexp", function(value, element, regexpr) {
                var regexp = new RegExp(regexpr);
                return regexp.test(value);
            }, "Por Favor Ingrese un valor con el formato correcto.");

            $.validator.addMethod("schedule", function() {
                if ($("tr:has(td.selected)").length) {
                    return true;
                }
                return false;
            }, "Error: Ingrese algún bloque al horario");

            $.validator.addMethod("count", function() {
                if ($("#hoursCount").attr("value")) {

                    if ($("#schedule").find("td.selected").length == parseInt($("#hoursCount").attr("value"))) {
                        return true;
                    }
                    return false;

                }
            }, "Error: Ingrese la cantidad de horas con respecto a la restricción de horas del plan");

            $.validator.messages.required = "Campo requerido";

            $("#addScheduleForm").validate({
                ignore: [],
                rules: {
                    name: {
                        required: true,
                        regexp: "^[0-9A-ZÑa-zñ áéíóúÁÉÍÓÚ]+$"
                    },
                    plansScheduleCombo: {
                        required: true
                    },
                    description: {
                        required: true
                    },
                    scheduleValidation: {
                        schedule: true,
                        count: true
                    }
                },
                messages: {
                    name: {
                        regexp: "Formato Incorrecto: Solo números y letras"
                    },
                    plansScheduleCombo: {
                        required: "Por Favor seleccione algúna opción"
                    },
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
            return $("#addScheduleForm").valid();
        }

    }

    return addScheduleValidation;

});

