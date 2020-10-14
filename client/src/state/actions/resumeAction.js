import axios from 'axios';
import { ADD_RESUME, CLEAR_RESUME, RESUMES_ERROR, CLEAR_ERROR } from './types';

// Add resume
export const addResume = (resume) => (dispatch) => {
	try {
		dispatch({
			type: ADD_RESUME,
			payload: resume,
		});
	} catch (error) {
		dispatch({
			type: RESUMES_ERROR,
			payload: error.response.data,
		});
	}
};

// Get temp user
export const tempUser = (id) => async (dispatch) => {
	try {
		const res = await axios.get('/api/auth/temp/' + id);
		dispatch({
			type: ADD_RESUME,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: RESUMES_ERROR,
			payload: error.response.data,
		});
	}
};

// Submit resume
export const submitResume = (resume) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		await axios.post('/api/resume', resume, config);
		dispatch({
			type: CLEAR_RESUME,
		});
	} catch (error) {
		dispatch({
			type: RESUMES_ERROR,
			payload: error.response.data,
		});
	}
};

// Clear error
export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};
