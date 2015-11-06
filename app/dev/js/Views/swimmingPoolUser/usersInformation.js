define(['backbone', 'jquery'],
    function(Backbone, $) {

        usersInformation = Backbone.View.extend({

            initialize: function(options) {

                var usersJson = this.usersInformation(options.searchUserPattern);

                if (usersJson) {
                    $(this.el).html(options.template({
                        users: usersJson
                    }));
                }
            },
            usersInformation: function(searchUserPattern) {
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/users/swimmingPool/searchUsers/" + searchUserPattern;
                var usersJson;

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        if (data.length == 0) {
                            alertDGC("Usuario no encontrado, favor intente nuevamente");
                        } else {
                            usersJson = data;
                        }
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

                return usersJson;
            }
        });
        return usersInformation;

    });