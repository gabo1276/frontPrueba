validateForm = {

    validateForm: function() {

    $.validator.addMethod("regexp", function(value, element, regexpr) {
        var regexp = new RegExp(regexpr);
        return regexp.test(value);
    }, "Por Favor Ingrese un valor con el formato correcto.");
    $.validator.messages.required = "Campo requerido";

    // validate signup form on keyup and submit
    $("#sendEmailform").validate({
        rules: {
            from: {
                required: true,
                regexp: "^[A-Za-zñ ]+$"
            },
            to: {
                required: true,
                regexp: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[.][a-zA-Z0-9-.]+$"
            },
            content: {
                required: true,
                regexp: "^[a-zA-Z0-9 ]+$"
            }
        },
        messages: {
            from: {
                regexp: "Formato Incorrecto, Ej: Juan Mendez"
            },
            to: {
                regexp: "Formato Incorrecto: Ej: Nombre_Apellido@dominio.com"
            },
            content: {
                regexp: "Favor no insertar caracteres especiales"
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
    isValidForm: function(){
        return $("#sendEmailform").valid();
    }
}
