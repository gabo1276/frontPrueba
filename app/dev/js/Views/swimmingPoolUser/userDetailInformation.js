define(['backbone', 'jquery'], function(Backbone, $) {

    userDetailInformation = Backbone.View.extend({

        initialize: function(options) {
            if (options.userId) {
                userJson = this.fillUserInformation(options.userId);

                if (userJson) {
                    $(this.el).html(options.template({
                        user: userJson
                    }));
                }
            }
        },
        fillUserInformation: function(userId) {
            var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/users/swimmingPool/" + userId;
            var userJson;
            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data.rut != null) {
                        userJson = data;
                    }
                },
                error: function(request, error) {
                    alertDGC("Error Interno, favor intente más tarde");
                },
            });

            return userJson;
        },

    });
    return userDetailInformation;

});