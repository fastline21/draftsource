import {
    ADD_RESUME,
    RESUMES_ERROR,
    CLEAR_RESUME,
    CLEAR_ERROR,
} from '../actions/types';

const initialState = {
    resume: null,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_RESUME:
            return {
                ...state,
                resume: { ...state.resume, ...action.payload },
            };
        case CLEAR_RESUME:
            return {
                ...state,
                resume: null,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        case RESUMES_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};
