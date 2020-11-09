import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

// Actions
import { setAlert } from './../state/actions/alertAction';
import { addUser, clearError, clearUser } from './../state/actions/userAction';

// Utils
import useUnsavedChangesWarning from './../utils/useUnsavedChangesWarning';

// Components
import PreLoader from './../layouts/PreLoader';

const Step1 = ({
	userState: { success, error, loading },
	setAlert,
	addUser,
	clearError,
	clearUser,
}) => {
	const [
		Prompt,
		setDirty,
		setPristine,
		setMessage,
	] = useUnsavedChangesWarning();

	const { type } = useParams();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

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
			const adminPassword = prompt('Enter password', '');
			if (adminPassword === '12345') {
				addUser({ ...info, type: type.capitalize() });
				setInfo(initialInfo);
				setPristine();
			}
		}
	};

	useEffect(() => {
		if (error) {
			setAlert('', error.msg);
			clearError();
		}

		if (success) {
			setAlert(
				'/',
				'Kindly check <span>email</span> for confirmation to proceed.'
			);
			clearUser();
		}

		// eslint-disable-next-line
	}, [success, error]);

	return (
		<div className="admin">
			{Prompt}
			{loading ? (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						height: '100vh',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						zIndex: 1031,
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					>
						<PreLoader />
					</div>
				</div>
			) : null}
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<div className="form-row">
						<div className="col-lg-4">
							<label className="form-label">First Name</label>
						</div>
						<div className="col-lg-8">
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
						<div className="col-lg-4">
							<label className="form-label">Last Name</label>
						</div>
						<div className="col-lg-8">
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
						<div className="col-lg-4">
							<label className="form-label">Email</label>
						</div>
						<div className="col-lg-8">
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
						<div className="col-lg-4">
							<label className="form-label">Password</label>
						</div>
						<div className="col-lg-8">
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
						<div className="col-lg-4">
							<label className="form-label">Confirm Password</label>
						</div>
						<div className="col-lg-8">
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
						<div className="col-lg-8 offset-lg-4">
							<input
								type="submit"
								value="Signup"
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
	userState: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
	addUser: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
	clearUser: PropTypes.func.isRequired,
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
