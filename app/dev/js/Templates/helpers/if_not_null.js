define('Templates/helpers/if_not_null', ['handlebars'], function(Handlebars) {

	function if_not_null(a, opts) {
		if (a)
			return opts.fn(this);
		else
			return opts.inverse(this);
	}

	Handlebars.registerHelper('if_not_null', if_not_null);

});