define('Templates/helpers/selected', ['handlebars'], function(Handlebars) {

	function selected(foo, bar) {
		if (foo && (foo == bar)) {
			return ' selected';
		} else {
			return '';
		}
	}

	Handlebars.registerHelper('selected', selected);

});