define('Templates/helpers/if_eq', ['handlebars'], function(Handlebars) {

	function if_eq(a, b, opts) {
		if (a == b)
			return opts.fn(this);
		else
			return opts.inverse(this);
	}

	Handlebars.registerHelper('if_eq', if_eq);

});