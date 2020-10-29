const moment = require('moment');

const getTotalMonth = (month, day, year, format) => {
	// the format of get total month using moment.js
	// moment('month/day/year', format)
	return moment(
		`${moment().month(month).format('MM')}/${parseInt(day)}/${parseInt(year)}`,
		format
	);
};

module.exports = getTotalMonth;
