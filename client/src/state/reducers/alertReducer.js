import { SET_ALERT, REMOVE_ALERT } from './../actions/types';

const initialState = {
    redirect: '',
    msg: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                redirect: action.payload.redirect,
                msg: action.payload.msg,
            };
        case REMOVE_ALERT:
            return {
                ...state,
                ...initialState,
            };
        default:
            return state;
    }
};
