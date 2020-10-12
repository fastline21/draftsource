import React from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

// Components
import EmpStep1 from './Employer/Step1';
import EmpStep2 from './Employer/Step2';
import EmpStep3 from './Employer/Step3';
import Recruiter from './Recruiter';
import Admin from './Admin';

const Signup = () => {
	const { type } = useParams();
	const { search } = useLocation();
	const { step } = queryString.parse(search);
	const history = useHistory();

	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	if (type !== 'employer' && type !== 'recruiter') {
		history.push('/signup');
	}

	const renderSignup = () => {
		if (type === 'recruiter') {
			return <Recruiter />;
		} else if (type === 'admin') {
			return <Admin />;
		}
		// if (parseInt(step) === 1) {
		// 	if (type === 'employer') {
		// 		return <EmpStep1 />;
		// 	} else if (type === 'recruiter') {
		// 		return <RecruiterStep1 />;
		// 	}
		// } else if (parseInt(step) === 2) {
		// 	if (type === 'employer') {
		// 		return <EmpStep2 />;
		// 	}
		// } else if (parseInt(step) === 3) {
		// 	if (type === 'employer') {
		// 		return <EmpStep3 />;
		// 	}
		// } else {

		// }
	};

	return (
		<div id="signup">
			<div className="container">
				<div className="header">
					<h2 className="title">Signup for {type.capitalize()}</h2>
					<div className="line-break" />
				</div>
				<div className="row">
					<div className="col-sm-6 offset-sm-3">{renderSignup()}</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
