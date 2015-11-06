define(['backbone', 'jquery', 'hbs!Templates/category/createCategory', 'Modules/login', 'Modules/utilForm',
        'Models/category'
    ],
    function(Backbone, $, createCategoryTemplate, login, utilForm,
        categoryModel) {

        CreateCategoryView = Backbone.View.extend({
            template: createCategoryTemplate,
            events: {
                "click #saveCategory": "saveCategory",
            },

            initialize: function() {
                if (this.model) {

                    if (login.verifyIsUserlogded()) {
                        var stateData = this.getState();
                        $(this.el).html(createCategoryTemplate({
                            state : stateData
                        }));
                    }
                }
            },
            saveCategory: function() {
                var that = this;
                var categoryJson = {
                    state: {
                        id: $("#stateCombo option:selected").val()
                    }
                };
                var categoryDataJson = utilForm.serializeFormToObject("#createCategoryForm :visible");

                categoryJson.description=categoryDataJson.description;
                categoryJson.name=categoryDataJson.name;


                this.model.set(categoryJson);

                this.model.save({}, {
                    success: function(model, respose) {
                        alertDGC("Categoria guardado exitosamente");
                        utilForm.cleanDataForm("#createCategoryForm");
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
                        state= data
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });
                return state;
                
            },

        });

     return CreateCategoryView;

    });