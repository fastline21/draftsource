import { SET_PERCENTAGE } from './types';

// Set percentage
export const setPercentage = (percent) => (dispatch) => {
	console.log(percent);
	dispatch({
		type: SET_PERCENTAGE,
		payload: percent,
	});
};
