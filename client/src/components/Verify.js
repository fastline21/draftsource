import React, { useEffect, useState } from 'react';
import { useParams, Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { verifyUser, clearError } from './../state/actions/userAction';
import { setAlert } from './../state/actions/alertAction';
import {
	addResume,
	tempUser,
	resumeStep,
} from './../state/actions/resumeAction';
import { setStep } from './../state/actions/employerAction';

const Verify = ({
	verifyUser,
	setAlert,
	clearError,
	addResume,
	resumeStep,
	setStep,
	tempUser,
	userState: { user, error },
}) => {
	let { token } = useParams();
	const [load, setLoad] = useState(true);
	const [link, setLink] = useState(null);
	useEffect(() => {
		if (load) {
			verifyUser({ verificationToken: token });
			setLoad(false);
		}
		if (error) {
			setAlert('/', error.msg);
			clearError();
		}

		if (user) {
			if (user.type === 'Remote Worker') {
				// tempUser(user._id);
				resumeStep(2);
				setLink('/create-resume?step=2');
			} else if (user.type === 'Employer') {
				setStep(2);
				setLink('/signup/employer?step=2');
			} else if (user.type === 'Recruiter') {
				setLink('/login');
			} else {
				setLink('/');
			}
		}

		// eslint-disable-next-line
	}, [error, load, user]);

	return <Route render={() => link && <Redirect to={link} />} />;
};

Verify.propTypes = {
	verifyUser: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
	addResume: PropTypes.func.isRequired,
	setStep: PropTypes.func.isRequired,
	tempUser: PropTypes.func.isRequired,
	resumeStep: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, {
	verifyUser,
	setAlert,
	clearError,
	addResume,
	setStep,
	tempUser,
	resumeStep,
})(Verify);
