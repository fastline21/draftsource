import moment from 'moment';

const getTotalMonth = (month, day, year, format) => {
	return moment(
		`${moment().month(month).format('MM')}/${parseInt(day)}/${parseInt(year)}`,
		format
	);
};

export default getTotalMonth;
