import {
    ADD_JOB,
    CLEAR_JOB,
    JOBS_ERROR,
    CLEAR_ERROR,
} from './../actions/types';

const initialState = {
    job: null,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_JOB:
            return {
                ...state,
                job: { ...state.job, ...action.payload },
            };
        case CLEAR_JOB:
            return {
                ...state,
                job: null,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        case JOBS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
