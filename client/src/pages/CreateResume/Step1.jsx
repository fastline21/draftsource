import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// List
import { genderList } from './../../list/Gender';
// import { countryList } from './../../list/Country';

// Action
import { setAlert } from './../../state/actions/alertAction';
import {
	addUser,
	clearError,
	clearUser,
} from './../../state/actions/userAction';
import { resumeStep } from './../../state/actions/resumeAction';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

// Components
import PreLoader from './../../layouts/PreLoader';

const Step1 = ({
	setAlert,
	addUser,
	clearError,
	clearUser,
	resumeStep,

	userState: { success, error, loading, user },
	resumeState: { step },
}) => {
	const [
		Prompt,
		setDirty,
		setPristine,
		setMessage,
	] = useUnsavedChangesWarning();

	const initialInfo = {
		firstName: '',
		lastName: '',
		email: '',
		cellphone: '',
		city: '',
		age: '',
		gender: genderList()[0],
		// country: 'Afghanistan',
		linkedIn: '',
		recruiterName: '',
	};

	const [info, setInfo] = useState(initialInfo);

	const {
		firstName,
		lastName,
		email,
		cellphone,
		city,
		// country,
		age,
		gender,
		linkedIn,
		recruiterName,
	} = info;

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
			cellphone === '' ||
			city === '' ||
			// country === '' ||
			age === '' ||
			gender === '' ||
			linkedIn === '' ||
			recruiterName === ''
		) {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			addUser({ ...info, type: 'Remote Worker' });
			setInfo(initialInfo);
			setPristine();
		}
	};

	useEffect(() => {
		if (step === 0) {
			resumeStep(1);
		}

		if (user) {
			localStorage.clear();
			clearUser();
		}

		if (error) {
			localStorage.clear();
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

		if (step > 1) {
			setAlert(
				'/create-resume?step=1',
				'You are not authorize to go in this page. Please start at Step 1'
			);
		}

		// eslint-disable-next-line
	}, [error, success, step, loading, user]);
	return (
		<div className="step-1">
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
			<div className="row">
				<div className="col-lg-6 offset-lg-3">
					<form className="form" onSubmit={onSubmit}>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="firstNameInput" className="form-label">
										First Name
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
										className="form-control input"
										id="firstNameInput"
										name="firstName"
										value={firstName}
										onChange={onChange}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="lastNameInput" className="form-label">
										Last Name
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
										className="form-control input"
										id="lastNameInput"
										name="lastName"
										value={lastName}
										onChange={onChange}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="emailInput" className="form-label">
										Email
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="email"
										className="form-control input"
										id="emailInput"
										name="email"
										value={email}
										onChange={onChange}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="cellphoneInput" className="form-label">
										Cellphone No.
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
										className="form-control input"
										id="cellphoneInput"
										value={cellphone}
										name="cellphone"
										onChange={onChange}
									/>
								</div>
							</div>
						</div>
						{/* <div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="cityInput" className="form-label">
										Country
									</label>
								</div>
								<div className="col-lg-8">
									<select
										id="countryInput"
										className="form-control input"
										name="country"
										onChange={onChange}
										value={country}
									>
										{countryList().map((e, i) => (
											<option key={i} value={e}>
												{e}
											</option>
										))}
									</select>
								</div>
							</div>
						</div> */}
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="ageInput" className="form-label">
										Age
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="number"
										name="age"
										value={age}
										onChange={onChange}
										className="form-control input"
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="genderInput" className="form-label">
										Gender
									</label>
								</div>
								<div className="col-lg-8">
									<select
										id="genderInput"
										className="form-control input"
										name="gender"
										onChange={onChange}
										value={gender}
									>
										{genderList().map((e, i) => (
											<option key={i} value={e}>
												{e}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="cityInput" className="form-label">
										City
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
										className="form-control input"
										id="cityInput"
										name="city"
										value={city}
										onChange={onChange}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="linkedInInput" className="form-label">
										LinkedIn Link
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
										className="form-control input"
										id="linkedInInput"
										value={linkedIn}
										name="linkedIn"
										onChange={onChange}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="recruiterNameInput" className="form-label">
										Recruiter Name
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
										className="form-control input"
										id="recruiterNameInput"
										value={recruiterName}
										name="recruiterName"
										onChange={onChange}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-8 offset-lg-4">
									<input
										type="submit"
										className="btn btn-primary btn-block button"
										value="Create Resume"
									/>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

Step1.propTypes = {
	setAlert: PropTypes.func.isRequired,
	addUser: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
	clearUser: PropTypes.func.isRequired,
	resumeStep: PropTypes.func.isRequired,
	userState: PropTypes.object.isRequired,
	resumeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
	resumeState: state.resumeState,
});

export default connect(mapStateToProps, {
	setAlert,
	addUser,
	clearError,
	clearUser,
	resumeStep,
})(Step1);
