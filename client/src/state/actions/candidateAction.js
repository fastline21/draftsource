import axios from 'axios';
import {
	GET_CANDIDATES,
	CANDIDATES_ERROR,
	VIEW_RESUME,
	CLEAR_RESUME,
	ADD_CANDIDATE,
	REMOVE_CANDIDATE,
	GET_SHORTLISTED,
	SET_SHORTLISTED,
	CANDIDATE_LOADING,
	STATUS_CANDIDATE,
	REMOVE_SAMPLE_WORK,
} from './types';

const reloadData = (menu, dispatch) => {
	if (menu === 'new-applicants') {
		newApplicants()(dispatch);
	} else if (menu === 'approved-applicants') {
		approvedApplicants()(dispatch);
	} else if (menu === 'rejected-applicants') {
		rejectedApplicants()(dispatch);
	} else {
		hiredApplicants()(dispatch);
	}
};

// New applicants
export const newApplicants = () => async (dispatch) => {
	try {
		setLoading()(dispatch);

		const getSearch = window.location.search;
		const res = await axios.get(`/api/candidate/new-applicants${getSearch}`);
		dispatch({
			type: GET_CANDIDATES,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Rejected applicants
export const rejectedApplicants = () => async (dispatch) => {
	try {
		setLoading()(dispatch);

		const getSearch = window.location.search;
		const res = await axios.get(
			`/api/candidate/rejected-applicants${getSearch}`
		);
		dispatch({
			type: GET_CANDIDATES,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Approved applicants
export const approvedApplicants = () => async (dispatch) => {
	try {
		setLoading()(dispatch);

		const getSearch = window.location.search;
		const res = await axios.get(
			`/api/candidate/approved-applicants${getSearch}`
		);
		dispatch({
			type: GET_CANDIDATES,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Hired applicants
export const hiredApplicants = () => async (dispatch) => {
	try {
		setLoading()(dispatch);

		const getSearch = window.location.search;
		const res = await axios.get(`/api/candidate/hired-applicants${getSearch}`);
		dispatch({
			type: GET_CANDIDATES,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Approve resume
export const approveResume = (data) => async (dispatch) => {
	try {
		const { menu, ...rest } = data;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.put('/api/candidate/approve-resume', rest, config);
		reloadData(menu, dispatch);
		dispatch({
			type: STATUS_CANDIDATE,
			payload: data._id,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Reject resume
export const rejectResume = (data) => async (dispatch) => {
	try {
		const { menu, ...rest } = data;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.put('/api/candidate/reject-resume', rest, config);
		reloadData(menu, dispatch);
		dispatch({
			type: STATUS_CANDIDATE,
			payload: data._id,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Hire resume
export const hireResume = (data) => async (dispatch) => {
	try {
		const { menu, ...rest } = data;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.put('/api/candidate/hire-resume', rest, config);
		reloadData(menu, dispatch);
		dispatch({
			type: STATUS_CANDIDATE,
			payload: data._id,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Delete resume
export const deleteResume = (data) => async (dispatch) => {
	try {
		const { menu, _id } = data;
		await axios.delete(`/api/candidate/delete-resume/${_id}`);
		reloadData(menu, dispatch);
		dispatch({
			type: STATUS_CANDIDATE,
			payload: _id,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Update resume
export const updateResume = (resume) => async (dispatch) => {
	try {
		const { _id, ...rest } = resume;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.put(`/api/candidate/update-resume/${_id}`, rest, config);
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Remove sample work
export const removeSampleWork = (data) => async (dispatch) => {
	try {
		const { _id, file, type } = data;
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.delete(
			`/api/candidate/remove-sample-work/${_id}/${file}/${type}`,
			config
		);
		dispatch({
			type: REMOVE_SAMPLE_WORK,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// View resume
export const viewResume = (id) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const res = await axios.post('/api/candidate/view-resume', { id }, config);
		dispatch({
			type: VIEW_RESUME,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Clear resume
export const clearResume = () => {
	return {
		type: CLEAR_RESUME,
	};
};

// View candidates
export const viewCandidates = () => async (dispatch) => {
	try {
		setLoading()(dispatch);

		const getSearch = window.location.search;
		const res = await axios.get(`/api/candidate/view-candidates${getSearch}`);
		dispatch({
			type: GET_CANDIDATES,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Add candidate to shortlist
export const addCandidate = (id) => (dispatch) => {
	dispatch({
		type: ADD_CANDIDATE,
		payload: id,
	});
};

// Remove candidate from shortlist
export const removeCandidate = (id) => (dispatch) => {
	dispatch({
		type: REMOVE_CANDIDATE,
		payload: id,
	});
};

// Set shortlisted
export const setShortlisted = (shortlist) => (dispatch) => {
	dispatch({
		type: SET_SHORTLISTED,
		payload: shortlist,
	});
};

// Get shortlist info
export const getShortlisted = (shortlisted) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const res = await axios.post(
			'/api/candidate/shortlisted',
			{ shortlisted },
			config
		);

		dispatch({
			type: GET_SHORTLISTED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};

// Set loading to true
export const setLoading = () => (dispatch) => {
	dispatch({
		type: CANDIDATE_LOADING,
	});
};

// Add recruiters comment
export const addRecruitersComment = (comment) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		await axios.put('/api/candidate/recruiters-comment', comment, config);
	} catch (error) {
		dispatch({
			type: CANDIDATES_ERROR,
			payload: error.response.data,
		});
	}
};
