define(['backbone', 'jquery', 'Modules/login', 'Modules/utilForm',
        'hbs!Templates/swimmingPoolUser/createdUser', 'Views/swimmingPoolUser/addSwimmingPoolUserValidation',
        'hbs!Templates/comboRegion', 'Views/regionInformation','hbs!Templates/comboCommunes'
    ],
    function(Backbone, $, login, utilForm, createdUser, addSwimmingPoolUserValidation,templateComboRegion, viewRegionInformation,
        templateComboCommune) {

        addUserView = Backbone.View.extend({
            template: createdUser,
            el: $("#applicationContent"),
            events: {
                "click #save": "saveUser",
                "change #region" : "getCommunes",
                
            },
            getCommunes: function(event){
                var idRegion = $(event.currentTarget).find("option:selected").attr("id");
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/address/commune/findAllCommuneByIdRegion/" + idRegion;


                var communeCombo;
                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        $("#divComboCommunes").html(templateComboCommune({
                            communeCombo: data
                        }));
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

            
            },
            initialize: function(options) {
                var prueba;
                if (login.verifyIsUserlogded()) {
                    if (!this.model.isNew()) {
                        $(this.el).html(this.template({
                            disabledIdUser: "disabled",
                            user: this.model.toJSON(),

                        }));
                        var prueba1 = this.model.toJSON();
                        new viewRegionInformation({
                            el: $("#divComboRegion"),
                            template: templateComboRegion,
                            varieble:  prueba1
                        });
                    } else {
                        $(this.el).html(this.template({
                            disabledPassUser:"disabled",
                            user: this.model.toJSON(),
                        }));
                        var prueba1 = this.model.toJSON();
                        new viewRegionInformation({
                            el: $("#divComboRegion"),
                            template: templateComboRegion,
                            varieble:prueba
                        });
                    }

                    addSwimmingPoolUserValidation.validateForm();
                    
                    //verify if move code to model
                    this.model.on('invalid', function(model, error) {
                        alertDGC(error);
                    });
                }

            },
            remove: function() {
                this.$el.html('');
                this.stopListening();
                return this;
            },
            saveUser: function() {

                var textRut = $("#rut").val();

                if (addSwimmingPoolUserValidation.isValidForm()) {

                    var modelJson = utilForm.serializeFormToJson("#addUserform");
                    modelJson.commune = {
                        id: $("#commune option:selected").attr('id')
                    };
                    modelJson.password = textRut.substr(0,6);
                    this.model.set(modelJson);

                    this.model.save({}, {
                        success: function(model, respose) {
                            alertDGC("Usuario de la Piscina guardado exitosamente");
                            utilForm.cleanDataForm("#addUserform");

                        },
                        error: function(model, response) {
                            alertDGC("Error Interno, favor intente más tarde");
                        }
                    });

                }
            }

        });

        return addUserView;

    });
