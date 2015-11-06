define(['backbone', 'jquery'], function(Backbone, $) {

    
    PoolMember = Backbone.Model.extend({
        url: SwimmingPoolApplicationHost + "/SwimmingPool/rest/users/",
    	
    	getCustomUrl: function (method) {
        switch (method) {
            case 'update':
                return this.url + 'changePass' ;
                break;
        }
    },
    sync: function (method, model, options) {
        options || (options = {});
        options.url = this.getCustomUrl(method.toLowerCase());
        
        return Backbone.sync.apply(this, arguments);
    }

    });

    return PoolMember;

});