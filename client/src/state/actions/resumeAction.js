import axios from 'axios';
import {
	ADD_RESUME,
	CLEAR_RESUME,
	RESUMES_ERROR,
	CLEAR_ERROR,
	RESUME_STEP,
	RESET_STEP,
	SET_SUCCESS,
	RESUME_LOADING,
} from './types';

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
		setLoading()(dispatch);

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

// Set success
export const setSuccess = () => {
	return {
		type: SET_SUCCESS,
	};
};

// Set loading to true
export const setLoading = () => (dispatch) => {
	dispatch({
		type: RESUME_LOADING,
	});
};

// Clear error
export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};

// Set step
export const setStep = (step) => (dispatch) => {
	dispatch({
		type: RESUME_STEP,
		payload: step,
	});
};

// Reset step
export const resetStep = () => {
	return {
		type: RESET_STEP,
	};
};
