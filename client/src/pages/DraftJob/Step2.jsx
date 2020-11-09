import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import timezones from 'timezones-list';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

// Actions
import { setAlert } from './../../state/actions/alertAction';
import { addJob, jobStep, jobSuccess } from './../../state/actions/jobAction';

// Lists
import { workDurationList } from './../../list/WorkDuration';
import { budgetList } from './../../list/Budget';

const Step2 = ({
	setAlert,
	addJob,
	jobStep,
	jobSuccess,
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
		timeZone: timezones[0].label,
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
		setDirty();
		setMessage('Are you sure you want to leave this page?');
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
		if (step === 2) {
			setDirty();
			setMessage('Are you sure you want to leave this page?');
		}

		if (step !== 2) {
			setPristine();
			setAlert(
				'/draft-job?step=1',
				'You are not authorize to go in this page. Please start at Step 1'
			);
		}

		if (success) {
			jobSuccess();
			jobStep(3);
			history.push({
				pathname: '/draft-job',
				search: 'step=3',
			});
		}

		// eslint-disable-next-line
	}, [success, step]);

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
								rows="10"
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
								rows="10"
								className="form-control input"
								onChange={onChange}
								value={about}
							></textarea>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="form-row">
							<div className="col-lg-7">
								<div className="form-group">
									<label
										htmlFor="budgetInput"
										style={{
											color: '#606060',
											fontWeight: 500,
											margin: '10px 0',
										}}
									>
										Budget per hour (80-160 hours){' '}
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
							<div className="col-lg-5">
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
														You can replace a staff after serving for a minimum
														of 7 days
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
									{/* <input
										type="text"
										name="timeZone"
										id="timeZoneInput"
										className="form-control input"
										onChange={onChange}
										value={timeZone}
									/> */}
									<select
										name="timezone"
										id="timezoneInput"
										className="form-control input"
									>
										{timezones.map((e, i) => (
											<option value={e.label} key={i}>
												{e.label}
											</option>
										))}
									</select>
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
	jobStep: PropTypes.func.isRequired,
	jobSuccess: PropTypes.func.isRequired,
	jobState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	jobState: state.jobState,
});

export default connect(mapStateToProps, {
	setAlert,
	addJob,
	jobStep,
	jobSuccess,
})(Step2);
