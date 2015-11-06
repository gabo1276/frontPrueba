define(['backbone', 'jquery', 'jquery.table2excel', 'hbs!Templates/payment/reportSales','hbs!Templates/payment/closeTurnTable', 'Modules/login', 'Modules/utilForm',
    'Models/payment'
    ],
    function(Backbone, $, jqueryExportExcel,reportSalesTemplate,closeTurnTable, login, utilForm,
        paymentModel) {

        ReportSalesView = Backbone.View.extend({
            events: {
                "click #btnSearchPay": "SearchPay",
                "click #btnExport":"ExportToExcel"
            },

            initialize: function() {
                if (login.verifyIsUserlogded()) {
                    $(this.el).html(reportSalesTemplate({}));
                }
            },
            SearchPay: function(event) {
                var dateStart = $("#dateStart").val();
                dateStart= dateStart.split("/");
                dtStart=dateStart[0]+"-"+dateStart[1]+"-"+dateStart[2];
                

                var dateEnd = $("#dateEnd").val();
                dateEnd= dateEnd.split("/");
                dtEnd=dateEnd[0]+"-"+dateEnd[1]+"-"+dateEnd[2];                
                

                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/payment/salesReportBetweenDates/" + dtStart +"/"+ dtEnd;

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        var dataTotal=data;
                        var sum=0;
                        var precio=0;
                        for (var i = 0; i < dataTotal.length; i++) {
                            sum=dataTotal[i].product.productPK.plan.price+sum;
                            precio = dataTotal[i].product.productPK.plan.price;
                            precio = (precio.toLocaleString()).replace(",",".");
                            dataTotal[i].product.productPK.plan.price = precio;
                        }sum=(sum.toLocaleString()).replace(",",".");
                        $("#closeTurnInformation").html(closeTurnTable({
                            closeTurnInfo: data,
                            addTotal:sum
                        }));
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

            },

            ExportToExcel: function(event) {
                var f = new Date();
                var d= f.getDate() + "_" + (f.getMonth() +1) + "_" + f.getFullYear() + "_" + f.getHours() +"_"+ f.getMinutes() + sessionStorage.getItem('userName');;
                $("#closeTurnInformation").table2excel({
                    exclude: ".excludeThisClass",
                    name: "Worksheet Name",
                    filename: d //do not include extension
                });

            },

        });

        return ReportSalesView;

    });