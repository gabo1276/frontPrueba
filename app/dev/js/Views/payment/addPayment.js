define(['backbone', 'jquery', 'hbs!Templates/payment/addPayment', 'Modules/login', 'Modules/utilForm',
        'Views/payment/addPaymentValidation',
        'Models/payment'
    ],
    function(Backbone, $, addPaymentTemplate, login, utilForm, addPaymentValidation,
        paymentModel) {

        AddPaymentView = Backbone.View.extend({
            events: {
                "click #savePayment": "savePayment",
            },

            initialize: function() {
                if (this.model) {

                    if (login.verifyIsUserlogded()) {
                        $(this.el).html(addPaymentTemplate({}));
                        addPaymentValidation.validateForm();
                    }
                }
            },
            savePayment: function() {
                var that = this;

                if (addPaymentValidation.isValidForm()) {

                    var PaymentJson = this.serializeFormToObject();
                    this.model.set(PaymentJson);

                    this.model.save({}, {
                        success: function(model, respose) {
                            alertDGC("Pago guardado exitosamente");
                            that.cleanDataForm();
                        },
                        error: function(model, response) {
                            alertDGC("Error Interno, favor intente más tarde");
                        }
                    });

                }
            },
            serializeFormToObject: function() {

                var paymentJson = utilForm.serializeFormToObject("#addPaymentForm :visible");
                this.model.set(paymentJson);

                // this.model.set("numberOfTicket"] = paymentJson.numberOfTicket;
                // this.model["formOfPayment"] = paymentJson.formOfPayment;
                // this.model["chequeNumber"] = paymentJson.chequeNumber;
                // this.model["bank"] = paymentJson.bank;
                // this.model["observations"] = paymentJson.observations;

            },
            cleanDataForm: function() {

                utilForm.cleanDataForm("#addPaymentForm");
                this.remove();

            }

        });

        return AddPaymentView;

    });