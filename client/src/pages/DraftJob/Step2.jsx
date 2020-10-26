import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

// Actions
import { setAlert } from './../../state/actions/alertAction';
import { addJob, setStep, setSuccess } from './../../state/actions/jobAction';

// Lists
import { workDurationList } from './../../list/WorkDuration';
import { budgetList } from './../../list/Budget';

const Step2 = ({
	setAlert,
	addJob,
	setStep,
	setSuccess,
	jobState: { step, success },
}) => {
	const [
		Prompt,
		setDirty,
		setPristine,
		setMessage,
	] = useUnsavedChangesWarning();

	const history = useHistory();
	const initialInfo = {
		description: '',
		about: '',
		budget: {
			min: '',
			max: '',
		},
		workDuration: workDurationList()[0],
		timeZone: '',
	};
	const [info, setInfo] = useState(initialInfo);

	const { description, about, budget, workDuration, timeZone } = info;

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === 'budgetMin') {
			setInfo({ ...info, budget: { ...budget, min: value } });
		} else if (name === 'budgetMax') {
			setInfo({ ...info, budget: { ...budget, max: value } });
		} else {
			setInfo({ ...info, [name]: value });
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (
			description === '' ||
			about === '' ||
			budget.min === '' ||
			budget.max === '' ||
			workDuration === '' ||
			timeZone === ''
		) {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			addJob({
				description,
				about,
				budget,
				workDuration,
				timeZone,
			});
			setInfo(initialInfo);
			setPristine();
		}
	};

	useEffect(() => {
		if (success) {
			setSuccess();
			setStep(3);
			history.push({
				pathname: '/draft-job',
				search: 'step=3',
			});
		}
	}, [success]);

	// const initialInfo = {
	// 	about: '',
	// 	remoteStaffExpectation: '',
	// };

	// const [roles, setRoles] = useState([]);
	// const [keyResponsibilities, setKeyResponsibilities] = useState([]);
	// const [responsibilities, setResponsibilities] = useState([]);

	// const [submit, setSubmit] = useState(false);
	// const [load, setLoad] = useState(true);

	// const { about, remoteStaffExpectation } = info;

	// const rolesRef = useRef(null);
	// const keyResponsibilitiesRef = useRef(null);
	// const responsibilitiesRef = useRef(null);

	// const onKeyPress = (e) => {
	// 	if (e.key === 'Enter') {
	// 		const { name } = e.target;
	// 		if (name === 'roles') {
	// 			const rolesVal = rolesRef.current.value;
	// 			if (rolesVal === '') {
	// 				setAlert('', 'Please fill-in the required boxes to Proceed.');
	// 			} else {
	// 				setRoles((roles) => [...roles, rolesVal]);
	// 				rolesRef.current.value = '';
	// 			}
	// 		} else if (name === 'keyResponsibilities') {
	// 			const keyResponsibilitiesVal = keyResponsibilitiesRef.current.value;
	// 			if (keyResponsibilitiesVal === '') {
	// 				setAlert('', 'Please fill-in the required boxes to Proceed.');
	// 			} else {
	// 				setKeyResponsibilities((keyResponsibilities) => [
	// 					...keyResponsibilities,
	// 					keyResponsibilitiesVal,
	// 				]);
	// 				keyResponsibilitiesRef.current.value = '';
	// 			}
	// 		} else if (name === 'responsibilities') {
	// 			const responsibilitiesVal = responsibilitiesRef.current.value;
	// 			if (responsibilitiesVal === '') {
	// 				setAlert('', 'Please fill-in the required boxes to Proceed.');
	// 			} else {
	// 				setResponsibilities((responsibilities) => [
	// 					...responsibilities,
	// 					responsibilitiesVal,
	// 				]);
	// 				responsibilitiesRef.current.value = '';
	// 			}
	// 		}
	// 		setDirty();
	// 		setMessage('Are you sure you want to leave this page?');
	// 		e.preventDefault();
	// 	}
	// };

	// const itemClose = (field, index) => {
	// 	if (field === 'roles') {
	// 		setRoles((roles) => [...roles.filter((x) => roles.indexOf(x) !== index)]);
	// 	} else if (field === 'keyResponsibilities') {
	// 		setKeyResponsibilities((keyResponsibilities) => [
	// 			...keyResponsibilities.filter(
	// 				(x) => keyResponsibilities.indexOf(x) !== index
	// 			),
	// 		]);
	// 	} else if (field === 'responsibilities') {
	// 		setResponsibilities((responsibilities) => [
	// 			...responsibilities.filter(
	// 				(x) => responsibilities.indexOf(x) !== index
	// 			),
	// 		]);
	// 	}
	// };

	// const onSubmit = (e) => {
	// 	e.preventDefault();
	// 	if (
	// 		roles.length === 0 ||
	// 		keyResponsibilities.length === 0 ||
	// 		responsibilities.length === 0 ||
	// 		about === '' ||
	// 		remoteStaffExpectation === ''
	// 	) {
	// 		setAlert('', 'Please fill-in the required boxes to Proceed.');
	// 	} else {
	// 		addJob({
	// 			about,
	// 			roles,
	// 			keyResponsibilities,
	// 			responsibilities,
	// 			remoteStaffExpectation,
	// 		});
	// 		setInfo(initialInfo);
	// 		setRoles([]);
	// 		setKeyResponsibilities([]);
	// 		setResponsibilities([]);
	// 		setSubmit(true);
	// 		setPristine();
	// 	}
	// };

	// useEffect(() => {
	// 	if (load) {
	// 		if (step !== 2) {
	// 		    setAlert(
	// 		        '/',
	// 		        'You are not authorize to go in this page. Please start at Step 1'
	// 		    );
	// 		}
	// 		setLoad(false);
	// 	}
	// 	if (JSON.stringify(info) === JSON.stringify(initialInfo)) {
	// 		setDirty();
	// 		setMessage('Are you sure you want to leave this page?');
	// 	}

	// 	if (submit) {
	// 		setSubmit(false);
	// 		setStep(3);
	// 		history.push({
	// 			pathname: '/draft-job',
	// 			search: 'step=3',
	// 		});
	// 	}
	// }, [submit, info, load]);

	return (
		<div className="step-2">
			{Prompt}
			<form className="form" onSubmit={onSubmit}>
				<h6 className="title">About the job</h6>
				<div className="row">
					<div className="col-lg-6">
						<div className="form-group">
							<label
								for="aboutInput"
								style={{
									color: '#606060',
									fontWeight: 500,
									margin: '10px 0',
								}}
							>
								Job Description
							</label>
							<textarea
								name="description"
								rows="5"
								className="form-control input"
								onChange={onChange}
								value={description}
							></textarea>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-group">
							<label
								for="aboutInput"
								style={{
									color: '#606060',
									fontWeight: 500,
									margin: '10px 0',
								}}
							>
								About the company
							</label>
							<textarea
								name="about"
								rows="5"
								className="form-control input"
								onChange={onChange}
								value={about}
							></textarea>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-row">
							<div className="col-lg-6">
								<div className="form-group">
									<label
										htmlFor="budgetInput"
										style={{
											color: '#606060',
											fontWeight: 500,
											margin: '10px 0',
										}}
									>
										Budget per hour (160 hours){' '}
										<OverlayTrigger
											key="right"
											placement="right"
											overlay={
												<Tooltip>
													<p className="text-left mb-0">
														Budget includes staff salary plus equipment,
														software requirements fast-internet and service fee
														<br />
														<br />
														Draftsource is using a fair market standard rate to
														attract quality talents.
														<br />
														<br />
														No part-time, no freelancing no side-gigs. Full-time
														only
													</p>
												</Tooltip>
											}
										>
											<i className="fas fa-question-circle"></i>
										</OverlayTrigger>
									</label>
									<div className="form-inline">
										<select
											name="budgetMin"
											className="form-control input"
											onChange={onChange}
											value={budget.min}
										>
											<option value="" selected disabled>
												Min
											</option>
											{budgetList().map((e, i) => (
												<option value={e} key={i}>
													{e}
												</option>
											))}
										</select>
										<span className="mx-2">-</span>
										<select
											name="budgetMax"
											className="form-control input"
											onChange={onChange}
											value={budget.max}
										>
											<option value="" selected disabled>
												Max
											</option>
											{budgetList().map((e, i) => (
												<option value={e} key={i}>
													{e}
												</option>
											))}
										</select>
									</div>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="form-group">
									<label
										htmlFor="workDurationInput"
										style={{
											color: '#606060',
											fontWeight: 500,
											margin: '10px 0',
										}}
									>
										Work Contract{' '}
										<OverlayTrigger
											key="right"
											placement="right"
											overlay={
												<Tooltip>
													<p className="text-left mb-0">
														You can replace your staff after one month until you
														find the right fit.
														<br />
														<br />
														The quality of hire will depend on your budget and
														how long the contract will be.
													</p>
												</Tooltip>
											}
										>
											<i className="fas fa-question-circle"></i>
										</OverlayTrigger>
									</label>
									<select
										name="workDuration"
										id="workDurationInput"
										className="form-control input"
										onChange={onChange}
										value={workDuration}
									>
										{workDurationList().map((e, i) => (
											<option value={e} key={i}>
												{e}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-row">
							<div className="col-lg-6">
								<div className="form-group">
									<label
										htmlFor="timeZoneInput"
										style={{
											color: '#606060',
											fontWeight: 500,
											margin: '10px 0',
										}}
									>
										Time Zone Preference
									</label>
									<input
										type="text"
										name="timeZone"
										id="timeZoneInput"
										className="form-control input"
										onChange={onChange}
										value={timeZone}
									/>
								</div>
							</div>
							<div className="col-lg-6">
								<input
									type="submit"
									value="Proceed"
									className="btn btn-primary button"
								/>
							</div>
						</div>
					</div>
					{/* <div className="col-lg-6 offset-lg-3">
						<h6 className="title">About the job</h6>
						<div className="form-group">
							<label
								for="aboutInput"
								style={{
									color: '#606060',
									fontWeight: 500,
									margin: '10px 0',
								}}
							>
								Job Description
							</label>
							<textarea
								name="about"
								rows="5"
								className="form-control input"
								onChange={onChange}
								value={about}
							></textarea>
						</div>
						<div className="clearfix">
							<hr className="line-break" />
						</div>
						<div className="form-group">
							<label for="rolesInput" className="form-label">
								Roles
							</label>
							<div className="position-relative">
								<input
									type="text"
									id="rolesInput"
									className="form-control input"
									name="roles"
									onKeyPress={onKeyPress}
									placeholder="Type and Press Enter"
									ref={rolesRef}
								/>
								<i className="fas fa-plus"></i>
							</div>
							<ul className="roles-list">
								{roles.length > 0 &&
									roles.map((e, i) => (
										<li key={i}>
											<span className="roles-item">
												{e}
												<span
													className="roles-close"
													onClick={() => itemClose('roles', i)}
												>
													x
												</span>
											</span>
										</li>
									))}
							</ul>
						</div>
						<div className="clearfix">
							<hr className="line-break" />
						</div>
						<div className="form-group">
							<label for="keyResponsibilitiesInput" className="form-label">
								Key Responsibilities
							</label>
							<div className="position-relative">
								<input
									type="text"
									id="keyResponsibilitiesInput"
									className="form-control input"
									name="keyResponsibilities"
									onKeyPress={onKeyPress}
									placeholder="Type and Press Enter"
									ref={keyResponsibilitiesRef}
								/>
								<i className="fas fa-plus"></i>
							</div>
							<ul className="key-responsibilities-list">
								{keyResponsibilities.length > 0 &&
									keyResponsibilities.map((e, i) => (
										<li key={i}>
											<span className="key-responsibilities-item">
												{e}
												<span
													className="key-responsibilities-close"
													onClick={() => itemClose('keyResponsibilities', i)}
												>
													x
												</span>
											</span>
										</li>
									))}
							</ul>
						</div>
						<div className="clearfix">
							<hr className="line-break" />
						</div>
						<div className="form-group">
							<label for="responsibilitiesInput" className="form-label">
								Responsibilities
							</label>
							<div className="position-relative">
								<input
									type="text"
									id="responsibilitiesInput"
									className="form-control input"
									name="responsibilities"
									onKeyPress={onKeyPress}
									placeholder="Type and Press Enter"
									ref={responsibilitiesRef}
								/>
								<i className="fas fa-plus"></i>
							</div>
							<ul className="responsibilities-list">
								{responsibilities.length > 0 &&
									responsibilities.map((e, i) => (
										<li key={i}>
											<span className="responsibilities-item">
												{e}
												<span
													className="responsibilities-close"
													onClick={() => itemClose('responsibilities', i)}
												>
													x
												</span>
											</span>
										</li>
									))}
							</ul>
						</div>
						<div className="clearfix">
							<hr className="line-break" />
						</div>
						<div className="form-group">
							<label for="remoteStaffExpectationInput" className="form-label">
								Virtual Staff Expectation
							</label>
							<textarea
								rows="5"
								id="remoteStaffExpectationInput"
								className="form-control input"
								name="remoteStaffExpectation"
								onChange={onChange}
								value={remoteStaffExpectation}
							></textarea>
						</div>
						<div className="form-group">
							<div className="row">
								<div className="col-lg-4 offset-lg-8">
									<input
										type="submit"
										className="btn button btn-block mt-5"
										value="One more to go"
									/>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</form>
		</div>
	);
};

Step2.propTypes = {
	setAlert: PropTypes.func.isRequired,
	addJob: PropTypes.func.isRequired,
	setStep: PropTypes.func.isRequired,
	setSuccess: PropTypes.func.isRequired,
	jobState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	jobState: state.jobState,
});

export default connect(mapStateToProps, {
	setAlert,
	addJob,
	setStep,
	setSuccess,
})(Step2);
