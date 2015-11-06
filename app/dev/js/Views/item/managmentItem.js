define(['backbone', 'jquery', 'Modules/login', 'hbs!Templates/item/managmentItem', 'hbs!Templates/item/itemTable',
     'Views/item/createItem', 'Models/item'
], 
    
    function(Backbone, $, login, managmentItemTemplate, itemTableTemplate, addItemView, itemModel) {

    ManagmentItem = Backbone.View.extend({
        template: managmentItemTemplate,

        el: $("#applicationContent"),

        childView: null,

        events: {
            "click #search": "searchItem",
            "click #itemInformation #viewItem": "fillItemInformation",
            "click #itemInformation #deleteItem": "deleteItem"
        },

        initialize: function() {
            if (login.verifyIsUserlogded()) {
                $(this.el).html(this.template());
                this.searchItem();
            }
        },
        searchItem: function() {
            var that = this;
            var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/item/getAll";

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {

                    $("#itemTable").html(itemTableTemplate({
                        items: data
                    }));
                },
                error: function(request, error) {
                    alertDGC("Error Interno, favor intente más tarde");
                },
            });

        },
        fillItemInformation: function(eventTd) {
            var that = this;
            var itemId = eventTd.currentTarget.closest("tr");
            var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/item/getOne/" + itemId.id;

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data.id != null) {

                        var item = new itemModel(data);

                        if (that.childView) {
                            that.childView.$el.html('')
                            that.childView.undelegateEvents();
                            that.childView.stopListening();
                            that.childView = null;
                        }

                        that.childView = new addItemView({
                            model: item,
                            el: $("#itemModify")
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
                
                $("#addItemForm :input").prop('disabled',true);
                $("#saveItem").hide();
            }

        },
        deleteItem: function(eventTd) {
            var userProfile = sessionStorage.getItem('userProfile');
            if ( userProfile == "3" || userProfile == "4"){
                alertDGC("No posee permisos para realizar esta tarea");
            }
            else{
                if (confirm("Esta seguro que desea ELIMINAR este Item?") == true) {
                    
                    var that = this;
                    var item = eventTd.currentTarget.closest("tr");
                    var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/item/delete/" + item.id;

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
                                alertDGC("Error: No puede ser borrado este Item");

                            } else {
                                alertDGC("Item Eliminado exitosamente");
                                $(eventTd.currentTarget.closest("tr")).html("");

                                //TODO managment in a backbone Collection
                                if (!$.isEmptyObject(that.childView) && (that.childView.model.get("id") == item.id)) {
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
    return ManagmentItem;

});