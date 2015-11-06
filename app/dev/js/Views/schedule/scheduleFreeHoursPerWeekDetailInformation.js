define(['backbone', 'jquery', 'hbs!Templates/schedule/scheduleDetailInformation', 'Modules/schedule/scheduleConfig'],
    function(Backbone, $, scheduleDetailInformationTemplate, scheduleConfig) {

        scheduleDetailInformation = Backbone.View.extend({
            template: scheduleDetailInformationTemplate,

            initialize: function(options) {
                if (options.freeHoursPerWeek) {

                    $(this.el).html(this.template({
                        daySections: scheduleConfig,
                        name: "Ejemplo Nado Libre",
                    }));

                    this._deserializeSchedule(options.freeHoursPerWeek);
                }



            },
            _deserializeSchedule: function(hoursPerWeek) {

                var scheduleDaySections = schedule.daySection;
                for (var i = 0; i < scheduleDaySections.length; i++) {
                    var daySection = scheduleDaySections[i].id;
                    $("#scheduleDetailInformation td#" + daySection).addClass("selected");
                }
            },

        });
        return scheduleDetailInformation;

    });