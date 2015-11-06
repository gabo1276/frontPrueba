define(['backbone', 'jquery'],
    function(Backbone, $) {

        schedulesInformation = Backbone.View.extend({

            initialize: function(options) {
                if (options.searchSchedulePattern) {
                    var schedulesJson = this.schedulesInformation(options.searchSchedulePattern);

                    if (schedulesJson) {
                        $(this.el).html(options.template({
                            schedules: schedulesJson
                        }));
                    }
                }
            },
            schedulesInformation: function(searchSchedulePattern) {
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/schedule/searchScheduleRestriction/" + searchSchedulePattern;
                var schedulesJson;

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        schedulesJson = data;
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

                return schedulesJson;
            }
        });
        return schedulesInformation;

    });