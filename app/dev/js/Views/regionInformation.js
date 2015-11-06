define(['backbone', 'jquery'],
    function(Backbone, $) {

        regionInformation = Backbone.View.extend({

            initialize: function(options) {

                var regionsJson = this.regionsInformation();
                var userInfo=options.varieble;
                if (regionsJson) {
                    $(this.el).html(options.template({
                        regionCombo: regionsJson,
                        user:userInfo
                    }));
                }
            },
            regionsInformation: function(getAllRegions) {
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/address/region/getAll";
                var regionsJson;

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        if (data.length == 0) {
                            alertDGC("Usuario no encontrado, favor intente nuevamente");
                        } else {
                            regionsJson = data;
                        }
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

                return regionsJson;
            }
        });
        return regionInformation;

    });