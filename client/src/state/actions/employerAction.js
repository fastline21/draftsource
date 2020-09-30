import axios from 'axios';
import {
    ADD_EMPLOYER,
    EMPLOYERS_ERROR,
    EMPLOYER_STEP,
    CLEAR_EMPLOYER,
    SET_SUCCESS,
    CLEAR_ERROR,
} from './types';

// Add employer
export const addEmployer = (employer) => (dispatch) => {
    dispatch({
        type: ADD_EMPLOYER,
        payload: employer,
    });
};

// Set step
export const setStep = (step) => (dispatch) => {
    dispatch({
        type: EMPLOYER_STEP,
        payload: step,
    });
};

// Submit employer
export const submitEmployer = (employer) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        await axios.post('/api/employer', employer, config);
        dispatch({
            type: CLEAR_EMPLOYER,
        });
    } catch (error) {
        dispatch({
            type: EMPLOYERS_ERROR,
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

// Clear error
export const clearError = () => {
    return {
        type: CLEAR_ERROR,
    };
};
