define(['backbone', 'jquery', 'hbs!Templates/poolMember/changePass', 'Modules/login', 'Modules/utilForm',
        'Views/poolMember/changePassValidation', 'Models/poolMember'
    ],
    function(Backbone, $, changePassTemplate, login, utilForm, changePassValidation, poolMemberModel) {

        ChangePassView = Backbone.View.extend({
            template: changePassTemplate,

            events: {
                "click #change": "changePass",
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {

                    $(this.el).html(changePassTemplate({
                        plan: this.model.toJSON()
                    }));

                    changePassValidation.validateForm();

                }
            },
            changePass: function() {
                var that = this;
                if (changePassValidation.isValidForm()) {
                    $("#id").val(sessionStorage.getItem('adminUserIdentificator'));

                    var poolManagerJson = utilForm.serializeFormToObjectChangePass("#changePassForm");

                    this.model.set(poolManagerJson);

                    this.model.save({}, {
                        success: function(model, respose) {
                            alertDGC("Clave cambiada correctamente");
                            utilForm.cleanDataForm("#changePassForm");
                        },
                        error: function(model, response) {
                            alertDGC("Error, favor intente más tarde");
                        }
                    });
                }

            }


        });

        return ChangePassView;

    });
