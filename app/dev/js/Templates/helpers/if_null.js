define('Templates/helpers/if_null', ['handlebars'], function(Handlebars) {

	function if_null(a, opts) {
		if (a)
			return opts.inverse(this);
		else	
			return opts.fn(this);
	}

	Handlebars.registerHelper('if_null', if_null);

});