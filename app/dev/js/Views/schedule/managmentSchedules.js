define(['backbone', 'jquery', 'Modules/login', 'Views/schedule/addSchedule', 'Modules/schedule/scheduleConfig',
        'hbs!Templates/schedule/managmentSchedules', 'hbs!Templates/schedule/schedulesTable', 'Models/schedule'
    ],
    function(Backbone, $, login, addScheduleView, scheduleConfig,
        managmentSchedules, schedulesTable, schedule) {

        managmentSchedules = Backbone.View.extend({
            template: managmentSchedules,

            schedules: {
                count: 0,
                group: 5,
                array: []
            },

            childView: null,

            el: $("#applicationContent"),

            events: {
                "click #backwardGroupSchedule": "backwardGroupSchedule",
                "click #forwardGroupSchedule": "forwardGroupSchedule",
                "click #scheduleInformation #viewSchedule": "fillScheduleInformation",
                "click #scheduleInformation #deleteSchedule": "eliminateSchedule"
            },
            initialize: function() {

                if (login.verifyIsUserlogded()) {
                    $(this.el).html(this.template());
                    this.searchSchedules();
                }
            },
            searchSchedules: function() {
                var that = this;
                var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/schedule/getAllForName";

                $.ajax({
                    async: false,
                    url: url,
                    type: "GET",
                    success: function(data, status) {
                        that.schedules.array = data;

                        $("#scheduleInfo").html(schedulesTable({
                            // schedules: that.schedules.array.slice(that.schedules.count, that.schedules.count += that.schedules.group)
                            schedules: that.schedules.array
                        }));
                    },
                    error: function(request, error) {
                        alertDGC("Error Interno, favor intente más tarde");
                    },
                });

            },
            // backwardGroupSchedule: function() {
            //     if (this.schedules.count > this.schedules.group) {
            //         console.log("atras" + this.schedules.count);
            //         $("#scheduleInfo").html(schedulesTable({
            //             schedules: this.schedules.array.slice(this.schedules.count -= (this.schedules.group * 2), this.schedules.count += this.schedules.group)
            //         }));
            //     }
            // },
            // forwardGroupSchedule: function() {
            //     if (this.schedules.count < this.schedules.array.length) {
            //         console.log("adelante" + this.schedules.count);
            //         $("#scheduleInfo").html(schedulesTable({
            //             schedules: this.schedules.array.slice(this.schedules.count, this.schedules.count += this.schedules.group)
            //         }));
            //     }
            // },
            fillScheduleInformation: function(eventTd) {

                var id = $(eventTd.currentTarget.closest("tr")).index();
                var scheduleJson = this.schedules.array[id];

                var scheduleModel = new schedule({
                    id: scheduleJson.id,
                    name: scheduleJson.name,
                    description: scheduleJson.description,
                    daySection: scheduleJson.daySection,
                    plan: scheduleJson.plan
                });

                if (this.childView) {
                    this.childView.$el.html('')
                    this.childView.undelegateEvents();
                    this.childView.stopListening();
                    this.childView = null;
                }

                this.childView = new addScheduleView({
                    model: scheduleModel,
                    el: $("#scheduleModify"),
                });

                this.childView.model.on('sync', this.initialize, this);
                var userProfile = sessionStorage.getItem('userProfile');
                if ( userProfile == "3" || userProfile == "4"){
                    
                    $("#addScheduleForm :input").prop('disabled',true);
                    $("#saveSchedule").hide();
                }
            

            },
            eliminateSchedule: function(eventTd) {
                
                
                var userProfile = sessionStorage.getItem('userProfile');
                if ( userProfile == "3" || userProfile == "4"){
                    alertDGC("No posee permisos para realizar esta tarea");
                }

                else{
                    if (confirm("Esta seguro que desea ELIMINAR este Horario?") == true) {
                        var that = this;
                        var schedule = eventTd.currentTarget.closest("tr");
                        var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/schedule/delete/" + schedule.id;

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
                                    alertDGC("Error: Hay Pagos que dependen del Horario");

                                } else {
                                    alertDGC("Horario Eliminado exitosamente");
                                    $(eventTd.currentTarget).closest("tr").html("");

                                    //TODO managment in a backbone Collection
                                    if (!$.isEmptyObject(that.childView) && (that.childView.model.get("id") == schedule.id)) {
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

        return managmentSchedules;

    });