import axios from 'axios';
import { ADD_JOB, CLEAR_JOB, JOBS_ERROR, CLEAR_ERROR } from './types';

// Add job
export const addJob = (job) => (dispatch) => {
    try {
        dispatch({
            type: ADD_JOB,
            payload: job,
        });
    } catch (error) {
        dispatch({
            type: JOBS_ERROR,
            payload: error.response.data,
        });
    }
};

// Submit job
export const submitJob = (job) => async (dispatch) => {
    try {
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

// Clear error
export const clearError = () => {
    return {
        type: CLEAR_ERROR,
    };
};

// New job
export const newJobs = () => async (dispatch) => {
    try {
    } catch (error) {
        dispatch({
            type: JOBS_ERROR,
            payload: error.response.data,
        });
    }
};
