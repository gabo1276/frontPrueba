define(['backbone', 'jquery', 'hbs!Templates/schedule/addSchedule', 'Modules/login', 'Modules/utilForm',
        'Modules/schedule/scheduleConfig', 'Views/schedule/addScheduleValidation', 'Models/schedule'
    ],
    function(Backbone, $, addScheduleTemplate, login, utilForm, scheduleConfig, addScheduleValidation, Schedule) {

        AddScheduleView = Backbone.View.extend({
            template: addScheduleTemplate,

            events: {
                "click #schedule td.nonSelected": "selectDaySection",
                "click #schedule td.selected": "deselectDaySection",
                "click #saveSchedule": "saveSchedule",
                "change #plansScheduleCombo": "fillRestrictionMessage",
            },

            plans: null,

            initialize: function() {

                if (login.verifyIsUserlogded()) {

                    this.plans = this.findPlans();

                    $(this.el).html(addScheduleTemplate({
                        daySections: scheduleConfig,
                        name: this.model.get('name'),
                        description: this.model.get('description'),
                        plans: this.plans
                    }));

                    addScheduleValidation.validateForm();

                    if (this.model.get("id")) {
                        this.selectedPlan(this.model.get('plan'));
                        this._deserializeSchedule(this.model);
                    }
                }
            },
            findPlans: function() {

                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/plan/findAllPlanByTypeOfPlan/typeBlocksPerWeek";
                var dataJson;
                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        dataJson = data;
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });
                return dataJson;
            },
            fillRestrictionMessage: function(event) {

                var id = $(event.currentTarget).find("option:selected").attr("id");
                var planJson;

                for (var i = 0; i < this.plans.length; i++) {
                    if (this.plans[i].id == id) {
                        planJson = this.plans[i];
                    }
                }

                if (planJson) {
                    $("#planHoursRestrictionMessage").text("El plan " + planJson.name + " tiene restricciones horarias de " +
                        planJson.blocksPerWeek + " horas a la semana.");
                    $("#hoursCount").attr("value", planJson.blocksPerWeek);

                } else {    
                    $("#planHoursRestrictionMessage").text('');
                    $("#hoursCount").attr("value", '');
                }

            },
            selectedPlan: function(planJson) {
                if (planJson) {
                    $("#plansScheduleCombo option[id=" + planJson.id + "]").attr("selected", "selected");
                    $("#planHoursRestrictionMessage").text("El plan " + planJson.name + " tiene restricciones horarias de " +
                        planJson.blocksPerWeek + " horas a la semana.");
                    $("#hoursCount").attr("value", planJson.blocksPerWeek);

                }
            },
            selectDaySection: function(td) {
                $(td.toElement).removeClass("nonSelected");
                $(td.toElement).addClass("selected");
            },
            deselectDaySection: function(td) {

                if (td.toElement.getAttribute("id")) {
                    $(td.toElement).removeClass("selected");
                    $(td.toElement).addClass("nonSelected");
                }

            },
            saveSchedule: function() {
                var that = this;

                if (addScheduleValidation.isValidForm()) {

                    var scheduleJson = utilForm.serializeFormToObject("#addScheduleForm .serializable");
                    scheduleJson.plan = {
                        id: $("#plansScheduleCombo option:selected").attr('id')
                    };
                    var scheduleDaySectionJson = this._serializeSchedule();
                    scheduleJson.daySection = scheduleDaySectionJson;

                    this.model.set(scheduleJson);

                    this.model.save({}, {
                        success: function(model, respose) {
                            alertDGC("Horario guardado exitosamente");
                            that._cleanSchedule();
                            $("#planHoursRestrictionMessage").text('');
                            $("#hoursCount").attr("value", planJson.blocksPerWeek);
                        },
                        error: function(model, response) {
                            alertDGC("Error Interno, favor intente más tarde");
                        }
                    });
                }

            },
            _cleanSchedule: function() {

                utilForm.cleanDataForm("#addScheduleForm");

                $('#schedule tr').each(function() {
                    $.each(this.cells, function() {
                        $(this).removeClass("selected");
                    });
                });

            },
            _serializeSchedule: function() {

                var daySectionSchedule = new Array();

                $("#schedule td.selected").each(function() {
                    daySectionSchedule.push({
                        id: $(this).attr("id")
                    });
                });
                return daySectionSchedule;
            },
            _deserializeSchedule: function(schedule) {

                var scheduleDaySections = schedule.get('daySection');
                for (var i = 0; i < scheduleDaySections.length; i++) {
                    var daySection = scheduleDaySections[i].id;
                    $("#scheduleModify table#schedule td#" + daySection).addClass("selected");
                }
            },


        });

        return AddScheduleView;

    });