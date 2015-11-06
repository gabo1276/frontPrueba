require(['backbone', 'marionette', 'jquery', 'Views/login', 
    'Views/item/createItem', 'Views/item/managmentItem', 'Views/category/createCategory', 'Views/category/managmentCategory', 'Views/swimmingPoolUser/addUser', 'Views/swimmingPoolUser/managmentUsers', 
    'Views/schedule/addSchedule', 'Views/schedule/managmentSchedules',
    'Views/plan/addPlan', 'Views/plan/managmentPlans', 'Views/payment/managmentPayments','Views/payment/closeTurn', 'Views/payment/reportSales',
    'Views/product/addProduct', 'Views/controlAccess/controlAccess',
    'Views/poolMember/changePass','Views/poolMember/poolMemberInfoActive','Views/poolMember/payHistory', 
    'Models/plan', 'Models/schedule', 'Models/User', 'Models/poolMember', 'Models/item','Models/category',
    ],
    function(Backbone, Marionette, $, login, createItem, managmentItem, createCategory, managmentCategory, addUser, managmentUsers, addSchedule, managmentSchedules, addPlan, 
        managmentPlans, managmentPayments, closeTurn, reportSales, addProduct,
        controlAccess,
        changePass, poolMemberInfoActive, payHistory, 
        planModel, scheduleModel, userModel, poolMemberModel, itemModel, categoryModel) {


        var myRouter = Backbone.Router.extend({

            routes: {
                "": "handleLogin",
                "createItem":"createItem",
                "managmentItem": "managmentItem",
                "createCategory":"createCategory",
                "managmentCategory": "managmentCategory",
                "addUser": "addUser",
                "managmentUsers": "managmentUsers",
                "addSchedule": "addSchedule",
                "managmentSchedules": "managmentSchedules",
                "addPlan": "addPlan",
                "managmentPlans": "managmentPlans",
                "addProduct": "addProduct",
                "managmentPayments": "managmentPayments",
                "closeTurn":"closeTurn",
                "reportSales":"reportSales",
                "controlAccess": "controlAccess",
                "changePass":"changePass",
                "poolMemberInfoActive":"poolMemberInfoActive",
                "payHistory":"payHistory",
                "exitUser": "exitUser"

            },

            currentView: null,

            handleLogin: function() {
                this.login = new login();
            },
            createItem: function() {
                this.switchView(this.createItem = new createItem({
                    model: new itemModel({}),
                    el: $("#applicationContent")
                }));
            },
            managmentItem: function() {
                this.switchView(new managmentItem());
            },
            createCategory: function() {
                this.switchView(this.createCategory = new createCategory({
                    model: new categoryModel({}),
                    el: $("#applicationContent")
                }));
            },
            managmentCategory: function() {
                this.switchView(new managmentCategory());
            },
            addUser: function() {
                this.switchView(this.addUser = new addUser({
                    model: new userModel({}),
                    el: $("#applicationContent")
                }));
            },
            managmentUsers: function() {
                this.switchView(new managmentUsers());
            },
            addSchedule: function() {
                this.switchView(new addSchedule({
                    model: new scheduleModel({}),
                    el: $("#applicationContent")
                }));
            },
            managmentSchedules: function() {
                this.switchView(new managmentSchedules());
            },
            addPlan: function() {
                this.switchView(new addPlan({
                    model: new planModel({}),
                    el: $("#applicationContent")
                }));
            },
            addProduct: function() {
                this.switchView(new addProduct({
                    el: $("#applicationContent")
                }));
            },
            changePass: function() {
                this.switchView(this.changePass = new changePass({
                    model: new poolMemberModel({}),
                    el: $("#applicationContent")
                }));
            },
            poolMemberInfoActive: function() {
                this.switchView(this.poolMemberInfoActive = new poolMemberInfoActive({
                    model: new poolMemberModel({}),
                    el: $("#applicationContent")
                }));
            },
            payHistory: function() {
                this.switchView(this.payHistory = new payHistory({
                    model: new poolMemberModel({}),
                    el: $("#applicationContent")
                }));
            },
            managmentPlans: function() {
                this.switchView(new managmentPlans());
            },
            managmentPayments: function() {
                this.switchView(new managmentPayments());
            },
            closeTurn: function() {
                this.switchView(new closeTurn({
                    el: $("#applicationContent")
                }));
            },
            reportSales: function() {
                this.switchView(new reportSales({
                    el: $("#applicationContent")
                }));
            },
            controlAccess: function() {
                this.switchView(new controlAccess());
            },
            exitUser: function() {
                sessionStorage.clear();
                window.location.href = "/corporateWebSite/index.html";
            },
            switchView: function(view) {
                if (this.currentView) {
                    this.currentView.undelegateEvents();
                    this.currentView.stopListening();
                    this.currentView = null;
                }
                this.currentView = view;
            },


        });

        router = new myRouter();
        Backbone.history.start();
        return router;

    });