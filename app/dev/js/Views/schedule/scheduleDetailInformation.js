define(['backbone', 'jquery', 'hbs!Templates/schedule/scheduleDetailInformation', 'Modules/schedule/scheduleConfig'],
    function(Backbone, $, scheduleDetailInformationTemplate, scheduleConfig) {

        scheduleDetailInformation = Backbone.View.extend({
            template: scheduleDetailInformationTemplate,

            initialize: function(options) {
                if (options.scheduleId) {

                    scheduleJson = this.fillScheduleInformation(options.scheduleId);
                    if (scheduleJson) {
                        $(this.el).html(this.template({
                            daySections: scheduleConfig,
                            name: scheduleJson.name,
                        }));

                        this._deserializeSchedule(scheduleJson);
                    }

                }

            },
            fillScheduleInformation: function(scheduleId) {
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/schedule/" + scheduleId;
                var scheduleJson;
                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        scheduleJson = data;
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

                return scheduleJson;
            },
            _deserializeSchedule: function(schedule) {

                var scheduleDaySections = schedule.daySection;
                for (var i = 0; i < scheduleDaySections.length; i++) {
                    var daySection = scheduleDaySections[i].id;
                    $("#scheduleDetailInformation td#" + daySection).addClass("selected");
                }
            },

        });
        return scheduleDetailInformation;

    });