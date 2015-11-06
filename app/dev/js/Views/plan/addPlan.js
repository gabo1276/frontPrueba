define(['backbone', 'jquery', 'hbs!Templates/plan/addPlan', 'Modules/login', 'Modules/utilForm',
    'Views/plan/addPlanValidation', 'Models/plan'
],
function(Backbone, $, addPlanTemplate, login, utilForm, addPlanValidation, planModel) {

    AddPlanView = Backbone.View.extend({
            template: addPlanTemplate,

            events: {
                "click #savePlan": "savePlan",
                "change #typeOfPlan": "showTypeOfPlan",
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {

                    if (!this.model.isNew()) {

                        $(this.el).html(addPlanTemplate({
                            plan: this.model.toJSON(),
                            disabledTypeOfPlan: 'disabled'
                        }));
                        this.selectedTypeOfPlan(this.model.get("typeOfPlan"));

                    }
                     else {

                        $(this.el).html(addPlanTemplate({
                            plan: this.model.toJSON(),
                        }));
                    }
                }

                addPlanValidation.validateForm();
        },
        savePlan: function() {
            var that = this;

            if (addPlanValidation.isValidForm()) {

                var planJson = utilForm.serializeFormToObject("#addPlanForm :visible");

                this.model.set(planJson);

                this.model.save({}, {
                    success: function(model, respose) {
                        alertDGC("Plan guardado exitosamente");
                        utilForm.cleanDataForm("#addPlanForm");
                    },
                    error: function(model, response) {
                        alertDGC("Error Interno, favor intente más tarde");
                    }
                });
            }

        },
        showTypeOfPlan: function(event) {
            this.selectedTypeOfPlan($(event.currentTarget.selectedOptions).attr("value"));
        },
        selectedTypeOfPlan: function(typeOfPlan){
             if (typeOfPlan == "typeHoursPerWeek") {
                $("#blocksPerWeek").val("");
                $("#blocksPerWeekContainer").hide();
                $("#hoursPerWeekContainer").show();

            } else if (typeOfPlan == "typeBlocksPerWeek") {
                $("#hoursPerWeek").val("");
                $("#hoursPerWeekContainer").hide();
                $("#blocksPerWeekContainer").show();

            } else {
                $("#addPlanValidation-error").remove();
                $("#hoursPerWeek").val("");
                $("#hoursPerWeekContainer").hide();
                $("#blocksPerWeek").val("");
                $("#blocksPerWeekContainer").hide();
            }
        }


    });

return AddPlanView;

});