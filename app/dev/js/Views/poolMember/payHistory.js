define(['backbone', 'jquery', 'hbs!Templates/poolMember/payHistory', 'Modules/login', 'Modules/utilForm',
         'Models/poolMember'
    ],
    function(Backbone, $, payHistory, login, utilForm, poolMemberModel) {

        PayHistory = Backbone.View.extend({
            template: payHistory,


            initialize: function() {

                if (login.verifyIsUserlogded()) {

                    $(this.el).html(payHistory({
                        infoActive: this.model.toJSON()
                    }));

                var userId = sessionStorage.getItem('adminUserIdentificator');
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/payment/swimmingPoolUser/" + userId;


                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        if(data[0]!=null){
                            $("#paymentsInformation").html(payHistory({
                                payments: data

                            }));
                        }
                        else
                            alertDGC("No tiene pagos realizados");
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

                }
            }


    });

return PayHistory;
});





