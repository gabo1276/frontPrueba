define(['backbone', 'jquery', 'hbs!Templates/item/createItem', 'Modules/login', 'Modules/utilForm',
        'Models/item'
    ],
    function(Backbone, $, createItemTemplate, login, utilForm,
        itemModel) {

        CreateItemView = Backbone.View.extend({
            events: {
                "click #saveItem": "saveItem",
            },

            initialize: function() {
                if (this.model) {
                    var stateData = this.getState();
                    var categoryData = this.getCategory();
                    if (login.verifyIsUserlogded()) {
                        $(this.el).html(createItemTemplate({
                            state:stateData,
                            category : categoryData
                        }));
                        
                    }
                }
            },
            saveItem: function() {
                var that = this;
                var itemDataJson = utilForm.serializeFormToObject("#createItemForm :visible");
                var itemJson = {
                    category: {
                        id: $("#categoryCombo option:selected").val()
                    },
                    state: {
                        id: $("#stateCombo option:selected").val()
                    }
                };

                itemJson.name = itemDataJson.name;
                itemJson.quantity = itemDataJson.quantity;
                itemJson.minQuantity = itemDataJson.minQuantity;
                itemJson.unitMeasure = itemDataJson.unitMeasure;
                itemJson.description = itemDataJson.description;


                this.model.set(itemJson);

                this.model.save({}, {
                    success: function(model, respose) {
                        alertDGC("Item guardado exitosamente");
                        utilForm.cleanDataForm("#createItemForm");
                    },
                    error: function(model, response) {
                        alertDGC("Error Interno, favor intente más tarde");
                    }
                });
            },
            getState: function(){

                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/state/getAll";
                var state;
                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        state = data
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });
                return state;
            },

            getCategory:function(){
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/category/getAll";
                var category;
                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        category = data
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });
                return category;

            }


        });

        return CreateItemView;

    });