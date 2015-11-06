define(['backbone', 'jquery', 'hbs!Templates/product/addProduct', 'Modules/login', 'Modules/utilForm',
        'Views/product/addProductValidation',
        'Views/swimmingPoolUser/usersInformation', 'hbs!Templates/swimmingPoolUser/usersCombo',
        'Views/swimmingPoolUser/userDetailInformation', 'hbs!Templates/swimmingPoolUser/userDetailInformation',
        'Views/plan/plansInformation', 'hbs!Templates/plan/plansCombo',
        'Views/plan/planDetailInformation', 'hbs!Templates/plan/planDetailInformation',
        'Views/schedule/schedulesInformation', 'hbs!Templates/schedule/schedulesCombo',
        'Views/schedule/scheduleDetailInformation', 'Views/schedule/scheduleFreeHoursPerWeekDetailInformation', 'hbs!Templates/schedule/scheduleDetailInformation',
        'Views/payment/addPayment', 'hbs!Templates/payment/addPayment',
        'Models/payment'
    ],
    function(Backbone, $, addProductTemplate, login, utilForm, addProductValidation,
        usersInformationView, usersInformationTemplate,
        userDetailInformationView, userDetailInformationTemplate,
        plansInformationView, plansInformationTemplate,
        planDetailInformationView, planDetailInformationTemplate,
        schedulesInformationView, schedulesInformationTemplate,
        scheduleDetailInformationView, scheduleFreeHoursPerWeekDetailInformationView, scheduleDetailInformationTemplate,
        addPaymentView,addPaymentTemplate,
        paymentModel) {

        AddProductView = Backbone.View.extend({
            template: addProductTemplate,
            
            paymentView: null,

            events: {
                "click #searchUsers": "searchUsers",
                "click #followPaymentForm": "followPaymentForm",
                "click #previousProductForm": "previousProductForm",
                "change #usersCombo": "fillUserInformation",
                "change #plansCombo": "fillPlanInformation",
                "change #schedulesCombo": "fillScheduleInformation",
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {
                    $(this.el).html(addProductTemplate({}));
                    addProductValidation.validateForm();
                }
            },
            searchUsers: function() {

                new usersInformationView({
                    el: $("#usersInformation"),
                    template: usersInformationTemplate,
                    searchUserPattern: $("#userId").val()
                });

            },
            fillUserInformation: function(event) {

                $("#userDetailInformation").html('');
                var userId = $(event.currentTarget).find("option:selected").attr("id")
                new userDetailInformationView({
                    el: $("#userDetailInformation"),
                    template: userDetailInformationTemplate,
                    userId: userId
                });

                $("#plansInformation").html('');
                new plansInformationView({
                    el: $("#plansInformation"),
                    template: plansInformationTemplate
                });

            },
            fillPlanInformation: function(event) {

                $("#planDetailInformation").html('');
                var planId = $(event.currentTarget).find("option:selected").attr("id");
                new planDetailInformationView({
                    el: $("#planDetailInformation"),
                    template: planDetailInformationTemplate,
                    planId: planId
                });

                var typeOfPlan = $(event.currentTarget).find("option:selected").attr("typeOfPlan");

                if (typeOfPlan == "typeBlocksPerWeek") {

                    $("#schedulesInformation").html('');
                    $("#scheduleDetailInformation").html('');
                    new schedulesInformationView({
                        el: $("#schedulesInformation"),
                        template: schedulesInformationTemplate,
                        searchSchedulePattern: $(event.currentTarget).find("option:selected").attr("blocksPerWeek")
                    });

                } else if (typeOfPlan == "typeHoursPerWeek") {

                    $("#schedulesInformation").html('');
                    $("#scheduleDetailInformation").html('');
                    new scheduleFreeHoursPerWeekDetailInformationView({
                        el: $("#scheduleDetailInformation"),
                        template: scheduleDetailInformationTemplate,
                        hoursPerWeek: $(event.currentTarget).find("option:selected").attr("hoursPerWeek")
                    });
                    
                }

            },
            fillScheduleInformation: function(event) {

                $("#scheduleDetailInformation").html('');
                var scheduleId = $(event.currentTarget).find("option:selected").attr("id");
                new scheduleDetailInformationView({
                    el: $("#scheduleDetailInformation"),
                    template: scheduleDetailInformationTemplate,
                    scheduleId: scheduleId
                });

            },
            followPaymentForm: function() {
                var that = this;

                if (addProductValidation.isValidForm()) {

                    var ProductJson = this.serializeFormToObject();
                    $("#addProduct").hide();
                    
                    if(!that.paymentView){

                        var payment = new paymentModel(ProductJson);
                        that.paymentView = new addPaymentView({model: payment, el: $("#addPayment")});

                        that.paymentView.model.on('sync', function() {
                            that.$el.html('');
                            that.initialize();
                            that.render();
                            that.initialize();

                            that.paymentView.$el.html('')
                            that.paymentView.undelegateEvents();
                            that.paymentView.stopListening();
                            that.paymentView = null;                      
                        }, that);

                    }
                    else{

                        that.paymentView.model = new paymentModel(ProductJson);

                         that.paymentView.model.on('sync', function() {
                            that.$el.html('');
                            that.initialize();
                            that.render();
                            that.initialize();

                            that.paymentView.$el.html('')
                            that.paymentView.undelegateEvents();
                            that.paymentView.stopListening();
                            that.paymentView = null;

                        }, that);

                        $(that.paymentView.el).show();
                    }
                }
            },
            previousProductForm: function(){

                $("#addPayment").hide();
                $("#addProduct").show();

            },
            serializeFormToObject: function() {

                var prodcutJson = {
                    swimmingPoolUser: {
                        id: $("#usersCombo").find("option:selected").attr("id")
                    },
                    adminUser: {
                        id: sessionStorage.getItem('adminUserIdentificator')
                    },
                    product: {
                        productPK: {
                            plan: {
                                id: $("#plansCombo").find("option:selected").attr("id")
                            }
                        }
                    }
                };

                if ($("#schedulesCombo").find("option:selected").attr("id")) {

                    prodcutJson.product.productPK["schedule"] = {
                        id: $("#schedulesCombo").find("option:selected").attr("id")
                    };
                }

                var prodcutDataJson = utilForm.serializeFormToObject("#addProductForm :visible");

                prodcutJson.product["startValidDate"] = prodcutDataJson.startValidDate;
                prodcutJson.product["endValidDate"] = prodcutDataJson.endValidDate;

                return prodcutJson;

            },
            cleanDataForm: function() {

                //TODO charge the paymentView

                utilForm.cleanDataForm("#addProductForm");
                $("#addProductForm").hide('');
                $("#usersInformation").html('');
                $("#userDetailInformation").html('');
                $("#plansInformation").html('');
                $("#planDetailInformation").html('');
                $("#schedulesInformation").html('');
                $("#scheduleDetailInformation").html('');

            }

        });

        return AddProductView;

    });