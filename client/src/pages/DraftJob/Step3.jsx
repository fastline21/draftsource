import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// List
// import { availabilityList } from './../../list/Availability';
import { countryList } from './../../list/Country';

// Actions
import { addJob, submitJob, clearError } from '../../state/actions/jobAction';
import { setAlert } from '../../state/actions/alertAction';
import { clearUser } from './../../state/actions/userAction';

// Components
// import SummaryModal from './SummaryModal';
import PreLoader from './../../layouts/PreLoader';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

const Step3 = ({
	addJob,
	submitJob,
	setAlert,
	setStep,
	setSuccess,
	clearError,
	clearUser,
	jobState: { job, error, step, success, loading },
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
		company: '',
		website: '',
		cellphone: '',
		country: countryList()[0],
		linkedIn: '',
		agentName: '',
		agree: false,
	};
	const [info, setInfo] = useState(initialInfo);

	const {
		firstName,
		lastName,
		email,
		company,
		website,
		cellphone,
		country,
		linkedIn,
		agentName,
		agree,
	} = info;

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === 'agree') {
			setInfo({ ...info, [name]: !agree });
		} else {
			setInfo({ ...info, [name]: value });
		}
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			company === '' ||
			website === '' ||
			cellphone === '' ||
			country === '' ||
			linkedIn === ''
		) {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			submitJob({
				...job,
				firstName,
				lastName,
				email,
				company,
				website,
				cellphone,
				country,
				linkedIn,
				agentName,
			});
			setInfo(initialInfo);
			setPristine();
		}
	};

	useEffect(() => {
		if (step === 3) {
			setDirty();
			setMessage('Are you sure you want to leave this page?');
		}

		if (step !== 3) {
			setPristine();
			setAlert(
				'/draft-job?step=1',
				'You are not authorize to go in this page. Please start at Step 1'
			);
		}

		if (success) {
			setAlert(
				'/',
				'<h2 class="title">Thank you for drafting a job</h2><p class="subtitle">We will call you within 72 hours to verify your profile</p>'
			);
			setPristine();
		}

		if (error) {
			setDirty();
			setMessage('Are you sure you want to leave this page?');
			setAlert('', error.msg);
			clearError();
		}

		// eslint-disable-next-line
	}, [success, step, error]);

	// const initialInfo = {
	// 	availability: 'Full Time',
	// 	expectedSalary: '',
	// 	currency: 'USD',
	// };

	// const [info, setInfo] = useState(initialInfo);
	// const [submit, setSubmit] = useState(false);
	// const [load, setLoad] = useState(true);
	// const [summaryModal, setSummaryModal] = useState(false);

	// const { availability, expectedSalary, currency } = info;

	// const onChange = (e) => {
	// 	const { name, value } = e.target;
	// 	setInfo({ ...info, [name]: value });
	// 	setDirty();
	// 	setMessage('Are you sure you want to leave this page?');
	// };

	// const onSubmit = (e) => {
	// 	e.preventDefault();

	// 	if (availability === '' || expectedSalary === '' || currency === '') {
	// 		return setAlert('', 'Please fill-in the required boxes to Proceed.');
	// 	} else {
	// 		addJob({ availability, expectedSalary, currency });
	// 		setInfo(initialInfo);
	// 		setSummaryModal(true);
	// 	}
	// };

	// useEffect(() => {
	// 	if (load) {
	// 		if (step !== 3) {
	// 			setAlert(
	// 				'/draft-job?step=1',
	// 				'You are not authorize to go in this page. Please start at Step 1'
	// 			);
	// 			setStep(1);
	// 		}
	// 		setLoad(false);
	// 	}

	// 	if (error) {
	// 		setAlert('', error.msg);
	// 		clearError();
	// 	}

	// 	if (success) {
	// 		localStorage.clear();
	// 		setAlert(
	// 			'/',
	// 			'<h2 class="title">Thank you for drafting a job</h2><p class="subtitle">We will call you within 72 hours to verify your profile</p>'
	// 		);
	// 		setSuccess();
	// 		setStep(0);
	// 		clearUser();
	// 	}
	// }, [success, error, load]);

	return (
		<div className="step-3">
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
										Business Email
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
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
									<label htmlFor="companyInput" className="form-label">
										Company
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
										className="form-control input"
										id="companyInput"
										name="company"
										value={company}
										onChange={onChange}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="websiteInput" className="form-label">
										Website
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
										className="form-control input"
										id="websiteInput"
										name="website"
										value={website}
										onChange={onChange}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="cellphoneInput" className="form-label">
										Cellphone
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
										className="form-control input"
										id="cellphoneInput"
										name="cellphone"
										value={cellphone}
										onChange={onChange}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="countryInput" className="form-label">
										Country
									</label>
								</div>
								<div className="col-lg-8">
									<select
										name="country"
										id="countryInput"
										value={country}
										onChange={onChange}
										className="form-control input"
									>
										{countryList().map((e, i) => (
											<option value={e} key={i}>
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
									<label htmlFor="linkedInInput" className="form-label">
										LinkedIn Link
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
										className="form-control input"
										id="linkedInInput"
										name="linkedIn"
										value={linkedIn}
										onChange={onChange}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-4">
									<label htmlFor="agentNameInput" className="form-label">
										Agent's Name
									</label>
								</div>
								<div className="col-lg-8">
									<input
										type="text"
										className="form-control input"
										id="agentNameInput"
										name="agentName"
										value={agentName}
										onChange={onChange}
										placeholder="If applicable"
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
										value="Submit to Recruiter"
										disabled={!agree}
									/>
								</div>
							</div>
						</div>
						<div className="form-group">
							<div className="form-row">
								<div className="col-lg-8 offset-lg-4">
									<div className="form-check form-check-inline">
										<input
											className="form-check-input mb-4"
											type="checkbox"
											id="agreeCheck"
											name="agree"
											onChange={onChange}
										/>
										<label className="form-check-label" htmlFor="agreeCheck">
											by clicking submit you agree to our terms of service
										</label>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			{/* {summaryModal ? (
				<SummaryModal
					isShow={summaryModal}
					isHide={() => setSummaryModal(!summaryModal)}
					submit={() => {
						submitJob(job);
						setPristine();
					}}
				/>
			) : null}
			<div className="row">
				<div className="col-lg-6 offset-lg-3">
					<form className="form" onSubmit={onSubmit}>
						<div className="form-group">
							<h5 className="title">Are you looking to hire?</h5>
							{availabilityList().map((e, i) => (
								<div className="form-check" key={i}>
									<input
										type="radio"
										name="availability"
										id={`availability${i}`}
										className="form-check-input input"
										value={e}
										onChange={onChange}
										checked={availability === e}
									/>
									<label
										htmlFor={`availability${i}`}
										className="form-check-label"
									>
										{e}
									</label>
								</div>
							))}
						</div>
						<div className="form-group">
							<label className="form-label">Budget</label>
							<div className="form-inline">
								<input
									type="number"
									id="expectedSalaryInput"
									className="form-control input"
									name="expectedSalary"
									placeholder="per Hour"
									onChange={onChange}
									value={expectedSalary}
								/>
								<select
									name="currency"
									className="form-control input"
									onChange={onChange}
									value={currency}
								>
									<option value="USD">USD</option>
								</select>
							</div>
						</div>
						<div className="form-group">
							<button className="btn btn-primary btn-block button">
								Are you looking to hire?
							</button>
						</div>
					</form>
				</div>
			</div> */}
		</div>
	);
};

Step3.propTypes = {
	setAlert: PropTypes.func.isRequired,
	addJob: PropTypes.func.isRequired,
	submitJob: PropTypes.func.isRequired,
	jobState: PropTypes.object.isRequired,
	clearError: PropTypes.func.isRequired,
	clearUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	jobState: state.jobState,
});

export default connect(mapStateToProps, {
	setAlert,
	addJob,
	submitJob,
	clearError,
	clearUser,
})(Step3);
