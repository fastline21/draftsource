import axios from 'axios';
import {
	REQUEST_SAMPLE_SUCCESS,
	REQUEST_SAMPLE_ERROR,
	REQUEST_SAMPLE_DEFAULT,
	REQUEST_SAMPLE_LOADING,
} from './types';

// Submit
export const requestSampleSubmit = (data) => async (dispatch) => {
	try {
		requestSampleLoading()(dispatch);
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.post('/api/request-sample', data, config);
		dispatch({
			type: REQUEST_SAMPLE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: REQUEST_SAMPLE_ERROR,
			payload: error.response.data,
		});
	}
};

// Set to default state
export const requestSampleDefault = () => {
	return {
		type: REQUEST_SAMPLE_DEFAULT,
	};
};

// Set loading to true
export const requestSampleLoading = () => (dispatch) => {
	dispatch({
		type: REQUEST_SAMPLE_LOADING,
	});
};
