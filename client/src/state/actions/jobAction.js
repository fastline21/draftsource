import axios from 'axios';
import {
	ADD_JOB,
	CLEAR_JOB,
	JOBS_ERROR,
	CLEAR_ERROR,
	SET_SUCCESS,
	JOB_STEP,
	GET_JOBS,
	CLEAR_DETAILS,
	VIEW_DETAILS,
	JOB_LOADING,
} from './types';

// Add job
export const addJob = (job) => (dispatch) => {
	dispatch({
		type: ADD_JOB,
		payload: job,
	});
};

// Submit job
export const submitJob = (job) => async (dispatch) => {
	try {
		setLoading()(dispatch);
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.post('/api/job', job, config);
		dispatch({
			type: CLEAR_JOB,
		});
	} catch (error) {
		dispatch({
			type: JOBS_ERROR,
			payload: error.response.data,
		});
	}
};

// Set loading to true
export const setLoading = () => (dispatch) => {
	dispatch({
		type: JOB_LOADING,
	});
};

// Set success
export const setSuccess = () => {
	return {
		type: SET_SUCCESS,
	};
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
		type: JOB_STEP,
		payload: step,
	});
};

// New job
export const newJobs = () => async (dispatch) => {
	try {
		const getSearch = window.location.search;
		const res = await axios.get(`/api/job/new-jobs${getSearch}`);
		dispatch({
			type: GET_JOBS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: JOBS_ERROR,
			payload: error.response.data,
		});
	}
};

// Rejected job
export const rejectedJobs = () => async (dispatch) => {
	try {
		const getSearch = window.location.search;
		const res = await axios.get(`/api/job/rejected-jobs${getSearch}`);
		dispatch({
			type: GET_JOBS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: JOBS_ERROR,
			payload: error.response.data,
		});
	}
};

// Approved applicants
export const approvedJobs = () => async (dispatch) => {
	try {
		const getSearch = window.location.search;
		const res = await axios.get(`/api/job/approved-jobs${getSearch}`);
		dispatch({
			type: GET_JOBS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: JOBS_ERROR,
			payload: error.response.data,
		});
	}
};

// Approve resume
export const approveJob = (data) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.put('/api/job/approve-job', data, config);
	} catch (error) {
		dispatch({
			type: JOBS_ERROR,
			payload: error.response.data,
		});
	}
};

// Reject resume
export const rejectJob = (data) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.put('/api/job/reject-job', data, config);
	} catch (error) {
		dispatch({
			type: JOBS_ERROR,
			payload: error.response.data,
		});
	}
};

// Delete resume
export const deleteJob = (id) => async (dispatch) => {
	try {
		await axios.delete(`/api/job/delete-job/${id}`);
	} catch (error) {
		dispatch({
			type: JOBS_ERROR,
			payload: error.response.data,
		});
	}
};

// Clear details
export const clearDetails = () => {
	return {
		type: CLEAR_DETAILS,
	};
};

// View details
export const viewDetails = (id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post('/api/job/view-details', { id }, config);
		dispatch({
			type: VIEW_DETAILS,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: JOBS_ERROR,
			payload: error.response.data,
		});
	}
};
