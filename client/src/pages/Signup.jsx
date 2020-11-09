import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

// Components
import Recruiter from './Recruiter';
import Admin from './Admin';

const Signup = () => {
	const { type } = useParams();
	const history = useHistory();

	// eslint-disable-next-line no-extend-native
	String.prototype.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	};

	if (type !== 'employer' && type !== 'recruiter' && type !== 'admin') {
		history.push('/signup');
	}

	const renderSignup = () => {
		if (type === 'recruiter') {
			return <Recruiter />;
		} else if (type === 'admin') {
			return <Admin />;
		}
	};

	return (
		<div id="signup">
			<div className="container">
				<div className="header">
					<h2 className="title">Signup for {type.capitalize()}</h2>
					<div className="line-break" />
				</div>
				<div className="row">
					<div className="col-lg-6 offset-lg-3">{renderSignup()}</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
