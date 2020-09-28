import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import resumeReducer from './resumeReducer';
import candidateReducer from './candidateReducer';
import filterReducer from './filterReducer';
import jobReducer from './jobReducer';

export default combineReducers({
    alertState: alertReducer,
    userState: userReducer,
    resumeState: resumeReducer,
    candidateState: candidateReducer,
    filterState: filterReducer,
    jobState: jobReducer,
});
