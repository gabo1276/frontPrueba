define('Templates/helpers/isProductActive', ['handlebars'], function(Handlebars) {

	function isProductActive(startValidDateString, endValidDateString, opts) {

			var dates = {
				convert: function(d) {
					// Converts the date in d to a date-object. The input can be:
					//   a date object: returned without modification
					//  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
					//   a number     : Interpreted as number of milliseconds
					//                  since 1 Jan 1970 (a timestamp) 
					//   a string     : Any format supported by the javascript engine, like
					//                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
					//  an object     : Interpreted as an object with year, month and date
					//                  attributes.  **NOTE** month is 0-11.
					return (
						d.constructor === Date ? d :
						d.constructor === Array ? new Date(d[0], d[1], d[2]) :
						d.constructor === Number ? new Date(d) :
						d.constructor === String ? new Date(d) :
						typeof d === "object" ? new Date(d.year, d.month, d.date) :
						NaN
					);
				},
				inRange: function(d, start, end) {
					// Checks if date in d is between dates in start and end.
					// Returns a boolean or NaN:
					//    true  : if d is between start and end (inclusive)
					//    false : if d is before start or after end
					//    NaN   : if one or more of the dates is illegal.
					// NOTE: The code inside isFinite does an assignment (=).
					return (
						isFinite(d = this.convert(d).valueOf()) &&
						isFinite(start = this.convert(start).valueOf()) &&
						isFinite(end = this.convert(end).valueOf()) ?
						start <= d && d <= end :
						NaN
					);
				}
			}

		var startValidDateArray = startValidDateString.split("/")
		startValidDateString = startValidDateArray[1] + "/" + startValidDateArray[0] + "/" + startValidDateArray[2];
		var startValidDate = new Date(startValidDateString);

		var endValidDateArray = endValidDateString.split("/")
		endValidDateString = endValidDateArray[1] + "/" + endValidDateArray[0] + "/" + endValidDateArray[2];
		var endValidDate = new Date(endValidDateString);

		var todayDate = new Date();

		if (dates.inRange(todayDate, startValidDate, endValidDate)) {
			return opts.fn(this);
		} else {
			return opts.inverse(this);
		}
	}

	Handlebars.registerHelper('isProductActive', isProductActive);

});