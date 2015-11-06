define(['backbone', 'jquery', 'Modules/login', 'hbs!Templates/category/managmentCategory', 'hbs!Templates/category/categoryTable',
    'Views/category/createCategory', 'Models/category'
], 
    
    function(Backbone, $, login, managmentCategoryTemplate, categoryTableTemplate, addcategoryView, categoryModel) {

    ManagmentCategory = Backbone.View.extend({
        template: managmentCategoryTemplate,

        el: $("#applicationContent"),

        childView: null,

        events: {
            "click #search": "searchCategory",
            "click #categoryInformation #viewCategory": "fillCategoryInformation",
            "click #categoryInformation #deleteCategory": "deleteCategory"
        },

        initialize: function() {
            if (login.verifyIsUserlogded()) {
                $(this.el).html(this.template());
                this.searchCategory();
            }
        },
        searchCategory: function() {
            var that = this;
            var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/category/getAll";

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {

                    $("#categoryTable").html(categoryTableTemplate({
                        categorys: data
                    }));
                },
                error: function(request, error) {
                    alertDGC("Error Interno, favor intente más tarde");
                },
            });

        },
        fillCategoryInformation: function(eventTd) {
            var that = this;
            var categoryId = eventTd.currentTarget.closest("tr");
            var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/category/getOne/" + categoryId.id;

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data.id != null) {

                        var category = new categoryModel(data);

                        if (that.childView) {
                            that.childView.$el.html('')
                            that.childView.undelegateEvents();
                            that.childView.stopListening();
                            that.childView = null;
                        }

                        that.childView = new addcategoryView({
                            model: category,
                            el: $("#categoryModify")
                        });

                        that.childView.model.on('sync', function() {
                            that.$el.html('');
                            that.initialize();
                            that.render();
                            return that;
                        }, that);
                    }
                    
                },
                error: function(request, error) {
                    alertDGC("Error Interno, favor intente más tarde");
                },
            });
            var userProfile = sessionStorage.getItem('userProfile');
            if ( userProfile == "3" || userProfile == "4"){
                
                $("#addPlanForm :input").prop('disabled',true);
                $("#savePlan").hide();
            }

        },
        deleteCategory: function(eventTd) {
            var userProfile = sessionStorage.getItem('userProfile');
            if ( userProfile == "3" || userProfile == "4"){
                alertDGC("No posee permisos para realizar esta tarea");
            }
            else{
                if (confirm("Esta seguro que desea ELIMINAR esta Categoria?") == true) {
                    
                    var that = this;
                    var plan = eventTd.currentTarget.closest("tr");
                    var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/category/delete/" + plan.id;

                    $.ajax({
                        async: false,
                        url: url,
                        type: "DELETE",
                        success: function(data, status) {
                            if (data == false) {
                                // var scheduleMessage = "\n";
                                // for (var count in data) {
                                //     var schedule = data[count];
                                //     scheduleMessage += "Nombre Horario:" + schedule.name + "\n";
                                // }
                                // alertDGC("Error: Hay Horarios que dependen del plan, \n" + scheduleMessage);
                                alertDGC("Error: No se peude eliminar mientras esta categoria tenga Items");

                            } else {
                                alertDGC("Categoria Eliminada exitosamente");
                                $(eventTd.currentTarget.closest("tr")).html("");

                                //TODO managment in a backbone Collection
                                if (!$.isEmptyObject(that.childView) && (that.childView.model.get("id") == plan.id)) {
                                    that.childView.$el.html('')
                                    that.childView.undelegateEvents();
                                    that.childView.stopListening();
                                    that.childView = null;
                                }
                            }
                        },
                        error: function(request, error) {
                            alertDGC("Error Interno, favor intente más tarde");
                        }
                    });
                }
            }
        }
    });
    return ManagmentCategory;

});