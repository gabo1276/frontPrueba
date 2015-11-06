define(['backbone', 'jquery', 'hbs!Templates/poolMember/poolMemberInfoActive', 'Modules/login', 'Modules/utilForm',
         'Models/poolMember',
        'Views/plan/planDetailInformation', 'hbs!Templates/plan/planDetailInformation',
        'Views/schedule/scheduleDetailInformation', 'hbs!Templates/schedule/scheduleDetailInformation','hbs!Templates/poolMember/tablePayment'
    ],
    function(Backbone, $, infoActiveTemplate, login, utilForm, poolMemberModel,planDetailInformationView, planDetailInformationTemplate,
        scheduleDetailInformationView, scheduleDetailInformationTemplate,paymentsTableTemplate) {

        InfoActiveView = Backbone.View.extend({
            template: infoActiveTemplate,
            
            el: $("#applicationContent"),
            events: {
                "click #viewPayment": "fillPaymentInformation",
                "click #deletePayment": "eliminatePayment",
                "change #usersInformation": "fillPaymentsTable",
            },

            initialize: function() {

                if (login.verifyIsUserlogded()) {

                    $(this.el).html(infoActiveTemplate({
                        infoActive: this.model.toJSON()
                    }));

                    var userId = sessionStorage.getItem('adminUserIdentificator');
                    var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/payment/swimmingPoolUser/" + userId;

                    $.ajax({
                        async: false,
                        url: url,
                        type: "GET",
                        success: function(data, status) {
                            if(data[0]!=null){
                                var idPayment = data[0].id;
                                $("#paymentsInformation").html(paymentsTableTemplate({
                                payments: data })); 

                                sessionStorage.setItem('idPayment', idPayment);   
                    
                            }
                            
                        },
                        error: function(request, error) {
                            alertDGC("Error, favor intente más tarde");
                        },
                    });
                    this.fillPaymentInformation(sessionStorage.getItem('idPayment'));
                    

                }
            },

            fillPaymentInformation: function(idPayment) {
                if(idPayment!=null){
                    var that = this;
                    var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/payment/" + idPayment;
    
    
                    $.ajax({
                        async: false,
                        url: url,
                        type: "GET",
                        success: function(data, status) {
    
                            var payment = data;
                            that.currentPaymentId = payment.id;
                            var planId = payment.product.productPK.plan.id;
    
                            $("#planDetailInformation").html('');
                            $("#scheduleDetailInformation").html('');
    
                            new planDetailInformationView({
                                el: $("#planDetailInformation"),
                                template: planDetailInformationTemplate,
                                planId: planId
                            });
    
                            var typeOfPlan = payment.product.productPK.plan.typeOfPlan;
    
                            if (typeOfPlan == "typeBlocksPerWeek") {
    
                                var scheduleId = payment.product.productPK.schedule.id;
    
                                new scheduleDetailInformationView({
                                    el: $("#scheduleDetailInformation"),
                                    template: scheduleDetailInformationTemplate,
                                    scheduleId: scheduleId
                                });
                            }
    
                        },
                        error: function(request, error) {
                            alertDGC("Error, favor intente más tarde");
                        },
                    });
                }
                else
                    alertDGC("No posee plan vigente");


            },
            eliminatePayment: function(eventTd) {
                var that = this;
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/payment/delete/" + $(eventTd.currentTarget.closest("tr")).attr("id");


                $.ajax({
                    async: false,
                    url: url,
                    type: "DELETE",
                    success: function(data, status) {
                        alertDGC("Horario Eliminado exitosamente");

                        if ($(eventTd.currentTarget).closest("tr").attr("id") == that.currentPaymentId) {    
                            $("#planDetailInformation").html('');
                            $("#scheduleDetailInformation").html('');
                        }

                        $(eventTd.currentTarget).closest("tr").html("");


                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    }
                });
            }
        });
return InfoActiveView;
});
