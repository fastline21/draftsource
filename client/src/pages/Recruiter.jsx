import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { setAlert } from './../state/actions/alertAction';
import { addUser, clearError, clearUser } from './../state/actions/userAction';

// Utils
import useUnsavedChangesWarning from './../utils/useUnsavedChangesWarning';

const Step1 = ({
	setAlert,
	addUser,
	clearError,
	clearUser,
	userState: { user, error },
}) => {
	const [
		Prompt,
		setDirty,
		setPristine,
		setMessage,
	] = useUnsavedChangesWarning();

	const { type } = useParams();

	localStorage.clear();

	const initialInfo = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		password2: '',
	};
	const [info, setInfo] = useState(initialInfo);

	const { firstName, lastName, email, password, password2 } = info;

	const onChange = (e) => {
		const { name, value } = e.target;
		setInfo({ ...info, [name]: value });
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			password === '' ||
			password !== password2
		) {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			addUser({ ...info, type: type.capitalize() });
			setInfo(initialInfo);
			setPristine();
		}
	};

	useEffect(() => {
		if (error) {
			setAlert('', error.msg);
			clearError();
		}

		if (user) {
			setAlert(
				'/',
				'Kindly check <span>email</span> for confirmation to proceed.'
			);
			clearUser();
		}

		// eslint-disable-next-line
	}, [user, error]);

	return (
		<div className="recruiter">
			{Prompt}
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<div className="form-row">
						<div className="col-lg-3">
							<label className="form-label">First Name</label>
						</div>
						<div className="col-lg-9">
							<input
								type="text"
								name="firstName"
								className="form-control input"
								onChange={onChange}
								value={firstName}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="form-row">
						<div className="col-lg-3">
							<label className="form-label">Last Name</label>
						</div>
						<div className="col-lg-9">
							<input
								type="text"
								name="lastName"
								className="form-control input"
								onChange={onChange}
								value={lastName}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="form-row">
						<div className="col-lg-3">
							<label className="form-label">Email</label>
						</div>
						<div className="col-lg-9">
							<input
								type="email"
								name="email"
								className="form-control input"
								onChange={onChange}
								value={email}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="form-row">
						<div className="col-lg-3">
							<label className="form-label">Password</label>
						</div>
						<div className="col-lg-9">
							<input
								type="password"
								name="password"
								className="form-control input"
								onChange={onChange}
								value={password}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="form-row">
						<div className="col-lg-3">
							<label className="form-label">Confirm Password</label>
						</div>
						<div className="col-lg-9">
							<input
								type="password"
								name="password2"
								className="form-control input"
								onChange={onChange}
								value={password2}
							/>
						</div>
					</div>
				</div>
				<div className="form-group">
					<div className="form-row">
						<div className="col-lg-9 offset-lg-3">
							<input
								type="submit"
								value="Log In"
								className="btn btn-primary btn-block button"
							/>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

Step1.propTypes = {
	setAlert: PropTypes.func.isRequired,
	addUser: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
	clearUser: PropTypes.func.isRequired,
	userState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, {
	setAlert,
	addUser,
	clearError,
	clearUser,
})(Step1);
