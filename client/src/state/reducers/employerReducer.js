import {
    ADD_EMPLOYER,
    EMPLOYERS_ERROR,
    EMPLOYER_STEP,
    CLEAR_EMPLOYER,
    SET_SUCCESS,
    CLEAR_ERROR,
} from './../actions/types';

const initialState = {
    employer: null,
    error: null,
    step: 0,
    success: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_EMPLOYER:
            return {
                ...state,
                employer: { ...state.employer, ...action.payload },
            };
        case EMPLOYERS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case EMPLOYER_STEP:
            return {
                ...state,
                step: action.payload,
            };
        case CLEAR_EMPLOYER:
            return {
                ...state,
                employer: null,
                success: true,
            };
        case SET_SUCCESS:
            return {
                ...state,
                success: false,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
