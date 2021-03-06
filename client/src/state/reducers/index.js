import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import userReducer from './userReducer';
import resumeReducer from './resumeReducer';
import candidateReducer from './candidateReducer';
import filterReducer from './filterReducer';
import employerReducer from './employerReducer';
import jobReducer from './jobReducer';
import requestSampleReducer from './requestSampleReducer';
import countryReducer from './countryReducer';

export default combineReducers({
	alertState: alertReducer,
	userState: userReducer,
	resumeState: resumeReducer,
	candidateState: candidateReducer,
	filterState: filterReducer,
	employerState: employerReducer,
	jobState: jobReducer,
	requestSampleState: requestSampleReducer,
	countryState: countryReducer,
});
