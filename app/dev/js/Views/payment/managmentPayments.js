define(['backbone', 'jquery', 'Modules/login', 'Views/payment/addPayment',
        'hbs!Templates/payment/managmentPayments', 'hbs!Templates/payment/paymentsTable', 'Models/payment',
        'Views/swimmingPoolUser/usersInformation', 'hbs!Templates/swimmingPoolUser/usersCombo',
        'Views/plan/planDetailInformation', 'hbs!Templates/plan/planDetailInformation',
        'Views/schedule/scheduleDetailInformation', 'hbs!Templates/schedule/scheduleDetailInformation',
        'hbs!Templates/payment/paymentDetailInformation'
    ],
    function(Backbone, $, login, addpaymentView,
        managmentPayments, paymentsTableTemplate, paymentModel,
        usersInformationView, usersInformationTemplate,
        planDetailInformationView, planDetailInformationTemplate,
        scheduleDetailInformationView, scheduleDetailInformationTemplate,
        paymentDetailInformationTemplate) {

        managmentPayments = Backbone.View.extend({
            template: managmentPayments,

            currentPaymentId: null,

            el: $("#applicationContent"),

            events: {
                "click #searchUsers": "searchUsers",
                "click #viewPayment": "fillPaymentInformation",
                "click #deletePayment": "eliminatePayment",
                "change #usersInformation": "fillPaymentsTable",
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {
                    $(this.el).html(this.template());
                }
            },
            searchUsers: function() {

                new usersInformationView({
                    el: $("#usersInformation"),
                    template: usersInformationTemplate,
                    searchUserPattern: $("#userId").val()
                });

            },
            fillPaymentsTable: function(event) {
                var userId = $(event.currentTarget).find("option:selected").attr("id");
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/payment/swimmingPoolUser/" + userId;


                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {

                        $("#paymentsInformation").html(paymentsTableTemplate({
                            payments: data
                        }));
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

            },
            fillPaymentInformation: function(eventTd) {
                var that = this;
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/payment/" + $(eventTd.currentTarget.closest("tr")).attr("id");


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
                        $("#paymentDetailInformation").html('');
                        $("#paymentDetailInformation").html(paymentDetailInformationTemplate({payment : payment}));


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
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });



            },
            eliminatePayment: function(eventTd) {
                var userProfile = sessionStorage.getItem('userProfile');
                if ( userProfile == "3" || userProfile == "4"){
                    alertDGC("No posee permisos para realizar esta tarea");
                }
                else{
                    if (confirm("Esta seguro que desea ELIMINAR este Pago?") == true) {
                    
                        var that = this;
                        var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/payment/delete/" + $(eventTd.currentTarget.closest("tr")).attr("id");


                        $.ajax({
                            async: false,
                            url: url,
                            type: "DELETE",
                            success: function(data, status) {
                                alertDGC("Pago Eliminado exitosamente");

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
                }
            }
        });

        return managmentPayments;

    });