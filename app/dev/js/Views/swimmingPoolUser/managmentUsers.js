define(['backbone', 'jquery', 'Modules/login', 'hbs!Templates/swimmingPoolUser/managmentUsers', 'hbs!Templates/swimmingPoolUser/usersTable',
    'Views/swimmingPoolUser/addUser', 'Models/User'
], function(Backbone, $, login, managmentUsers, usersTable, addUserView, userModel) {

    managmentUsers = Backbone.View.extend({
        template: managmentUsers,

        el: $("#applicationContent"),

        childView: null,

        searchUserPattern: '',

        events: {
            "click #search": "searchUsers",
            "click #usersInfo #viewUser": "fillUserInformation",
            "click #usersInfo #eliminateUser": "eliminateUser"
        },

        initialize: function() {
            if (login.verifyIsUserlogded()) {
                $(this.el).html(this.template());
            }
        },
        searchUsers: function() {
            var that = this;
            this.searchUserPattern = this.searchUserPattern || $("#userId").val();

            var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/users/swimmingPool/searchUsers/" + this.searchUserPattern;

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data.length == 0) {
                        alertDGC("Usuario no encontrado, favor intente nuevamente");
                    } else {
                        $("#usersInfo").html("");
                        $("#usersInfo").append(usersTable({
                            users: data
                        }));
                    }
                },
                error: function(request, error) {
                    alertDGC("Error Interno, favor intente más tarde");
                },
            });

        },
        fillUserInformation: function(eventTd) {
            var that = this;
            var user = eventTd.currentTarget.closest("tr");
            var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/users/swimmingPool/" + user.id;

            $.ajax({
                async: false,
                url: url,
                type: "GET",
                success: function(data, status) {
                    if (data.rut != null) {

                        var user = new userModel(data);

                        if (that.childView) {
                            that.childView.$el.html('')
                            that.childView.undelegateEvents();
                            that.childView.stopListening();
                            that.childView = null;
                        }

                        that.childView = new addUserView({
                            model: user,
                            el: $("#userModify")
                        });

                        that.childView.model.on('sync', function() {
                            that.$el.html('');
                            that.initialize();
                            that.render();
                            that.searchUsers(that.searchUserPattern);
                            return that;
                        }, that);
                    }
                },
                error: function(request, error) {
                    alertDGC("Error Interno, favor intente más tarde");
                },
            });

            var userProfile = sessionStorage.getItem('userProfile');
            if ( userProfile == "3"){
                
                $("#addUserform :input").prop('disabled',true);
                $("#save").hide();
            }

        },
        eliminateUser: function(eventTd) {
            var userProfile = sessionStorage.getItem('userProfile');
            if ( userProfile == "3" || userProfile == "5"){
                alertDGC("No posee permisos para realizar esta tarea");
            }
            else{
                if (confirm("Esta seguro que desea ELIMINAR este Usuario?") == true) {
                    
                    var that = this;
                    var user = eventTd.currentTarget.closest("tr");
                    var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/users/delete/" + user.id;

                    $.ajax({
                        async: false,
                        url: url,
                        type: "DELETE",
                        success: function(data, status) {
                            alertDGC("Usuario de la Piscina Eliminado exitosamente");
                            $(eventTd.currentTarget.closest("tr")).html("");

                            //TODO managment in a backbone Collection
                            if (!$.isEmptyObject(that.childView) && (that.childView.model.get("id") == user.id)) {
                                that.childView.$el.html('')
                                that.childView.undelegateEvents();
                                that.childView.stopListening();
                                that.childView = null;
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
    return managmentUsers;

});