import axios from 'axios';
import {
	ADD_JOB,
	CLEAR_JOB,
	JOBS_ERROR,
	CLEAR_ERROR,
	JOB_SUCCESS,
	JOB_STEP,
	GET_JOBS,
	CLEAR_DETAILS,
	VIEW_DETAILS,
	JOB_LOADING,
	VIEW_JOB,
} from './types';

const reloadData = (menu, dispatch) => {
	if (menu === 'new-jobs') {
		newJobs()(dispatch);
	} else if (menu === 'approved-jobs') {
		approvedJobs()(dispatch);
	} else {
		rejectedJobs()(dispatch);
	}
};

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
		jobLoading()(dispatch);
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
export const jobLoading = () => (dispatch) => {
	dispatch({
		type: JOB_LOADING,
	});
};

// Set success
export const jobSuccess = () => {
	return {
		type: JOB_SUCCESS,
	};
};

// Clear error
export const clearError = () => {
	return {
		type: CLEAR_ERROR,
	};
};

// Set step
export const jobStep = (step) => (dispatch) => {
	dispatch({
		type: JOB_STEP,
		payload: step,
	});
};

// New job
export const newJobs = () => async (dispatch) => {
	try {
		jobLoading()(dispatch);

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
		jobLoading()(dispatch);

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
		jobLoading()(dispatch);

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
		const { menu, ...rest } = data;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.put('/api/job/approve-job', rest, config);
		reloadData(menu, dispatch);
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
		const { menu, ...rest } = data;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.put('/api/job/reject-job', rest, config);
		reloadData(menu, dispatch);
	} catch (error) {
		dispatch({
			type: JOBS_ERROR,
			payload: error.response.data,
		});
	}
};

// Delete resume
export const deleteJob = (data) => async (dispatch) => {
	try {
		const { menu, _id } = data;
		await axios.delete(`/api/job/delete-job/${_id}`);
		reloadData(menu, dispatch);
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

// View job
export const viewJob = (id) => async (dispatch) => {
	try {
		const res = await axios.get('/api/job/view-job/' + id);
		dispatch({
			type: VIEW_JOB,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: JOBS_ERROR,
			payload: error.response.data,
		});
	}
};
