define(['backbone', 'jquery'], function(Backbone, $) {

	User = Backbone.Model.extend({
		url: SwimmingPoolApplicationHost + "/SwimmingPool/rest/users/swimmingPool/",

		getCustomUrl: function(method) {
			switch (method) {
				case 'read':
					return this.url + this.id;
					break;
				case 'create':
					return this.url + 'add';
					break;
				case 'update':
					return this.url + 'modify';
					break;
				case 'delete':
					return this.url + 'delete' + this.id;
					break;
			}
		},
		sync: function(method, model, options) {
			options || (options = {});
			options.url = this.getCustomUrl(method.toLowerCase());

			return Backbone.sync.apply(this, arguments);
		},
		validate: function(attrs, options) {
			var url = SwimmingPoolApplicationHost + "/SwimmingPool/rest/users/isUserExist/" + attrs.rut;
			var error;

			if (this.isNew()) {

				$.ajax({
					async: false,
					url: url,
					type: "GET",
					success: function(data, status) {
						if (data.result == true) {
							error = "El Usuario con ese rut, ya existe en nuestros registros.";
						}
					},
					error: function(request, error) {
						error = "Error Interno, favor intente más tarde";
					}
				});

			}

			return error;

		}

	});

	return User;

});