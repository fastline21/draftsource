import axios from 'axios';
import { GET_COUNTRY, COUNTRY_LOADING } from './types';

export const getCountry = () => async (dispatch) => {
	countryLoading();
	const res = await axios.get('/api/country');
	dispatch({
		type: GET_COUNTRY,
		payload: res.data,
	});
};

export const countryLoading = () => {
	return {
		type: COUNTRY_LOADING,
	};
};
