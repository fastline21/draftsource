import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';
import useWindowSize from './../../utils/useWindowSize';
import getTotalMonth from './../../utils/getTotalMonth';

// Action
import { setAlert } from './../../state/actions/alertAction';
import {
	addResume,
	resumeStep,
	clearError,
	resumeSuccess,
} from './../../state/actions/resumeAction';

// List
import { monthList } from './../../list/Month';
import { yearList } from './../../list/Year';
import { companyExpertiseList } from './../../list/CompanyExpertise';
import { companySizeList } from './../../list/CompanySize';
import { countryList } from '../../list/Country';

// Components
import WorkHistoryItem from './WorkHistoryItem';

const Step5 = ({
	setAlert,
	addResume,
	resumeStep,
	clearError,
	resumeSuccess,
	resumeState: { error, success, step },
}) => {
	const [
		Prompt,
		setDirty,
		setPristine,
		setMessage,
	] = useUnsavedChangesWarning();

	const history = useHistory();

	const windowSize = useWindowSize();

	const defaultYear = new Date().getFullYear();

	const initialWorkHistory = {
		title: '',
		company: '',
		monthStarted: monthList()[0],
		yearStarted: defaultYear,
		monthEnded: monthList()[0],
		yearEnded: defaultYear,
		description: '',
		companyExpertise: [],
		country: countryList()[0],
		companySize: companySizeList()[0],
	};

	const [workHistory, setWorkHistory] = useState([]);
	const [workHistoryItem, setWorkHistoryItem] = useState(initialWorkHistory);
	const [current, setCurrent] = useState(null);

	const {
		title,
		company,
		monthStarted,
		yearStarted,
		monthEnded,
		yearEnded,
		description,
		companyExpertise,
		country,
		companySize,
	} = workHistoryItem;

	const clearWorkHistoryItem = () => {
		setWorkHistoryItem(initialWorkHistory);
		setCurrent(null);
	};

	const onAdd = (e) => {
		e.preventDefault();

		const date1 = getTotalMonth(
			monthStarted,
			1,
			parseInt(yearStarted),
			'MM/DD/YYYY'
		);
		const date2 = getTotalMonth(
			monthEnded,
			1,
			parseInt(yearEnded),
			'MM/DD/YYYY'
		);
		const totalMonth = date2.diff(date1, 'month');

		if (
			title === '' ||
			company === '' ||
			monthStarted === '' ||
			yearStarted === '' ||
			monthEnded === '' ||
			yearEnded === '' ||
			description === '' ||
			companyExpertise.length === 0 ||
			country === '' ||
			companySize === ''
		) {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else if (totalMonth < 0) {
			return setAlert('', 'Invalid Date');
		}
		setWorkHistory((workHistory) => [...workHistory, workHistoryItem]);
		clearWorkHistoryItem();
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	const onEdit = (e) => {
		setCurrent(e);
		setWorkHistoryItem(workHistory[e]);
	};

	const onUpdate = (e) => {
		e.preventDefault();
		const date1 = getTotalMonth(
			monthStarted,
			1,
			parseInt(yearStarted),
			'MM/DD/YYYY'
		);
		const date2 = getTotalMonth(
			monthEnded,
			1,
			parseInt(yearEnded),
			'MM/DD/YYYY'
		);
		const totalMonth = date2.diff(date1, 'month');

		if (
			title === '' ||
			company === '' ||
			monthStarted === '' ||
			yearStarted === '' ||
			monthEnded === '' ||
			yearEnded === '' ||
			description === '' ||
			companyExpertise.length === 0 ||
			country === '' ||
			companySize === ''
		) {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else if (totalMonth < 0) {
			return setAlert('', 'Invalid Date');
		}
		setWorkHistoryItem([...workHistory.splice(current, 1, workHistoryItem)]);
		clearWorkHistoryItem();
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	const onDelete = (e) => {
		if (current === e) {
			clearWorkHistoryItem();
		}
		setWorkHistory((workHistory) => [
			...workHistory.filter((x) => workHistory.indexOf(x) !== e),
		]);
	};

	const onClear = (e) => {
		e.preventDefault();
		clearWorkHistoryItem();
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		if (name === 'companyExpertise') {
			if (companyExpertise.includes(value)) {
				setWorkHistoryItem({
					...workHistoryItem,
					[name]: [
						...companyExpertise.filter((expertise) => expertise !== value),
					],
				});
			} else {
				setWorkHistoryItem({
					...workHistoryItem,
					[name]: [...companyExpertise, value],
				});
			}
		} else {
			setWorkHistoryItem({ ...workHistoryItem, [name]: value });
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (workHistory.length === 0) {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			addResume({
				workHistory,
			});
			setWorkHistory([]);
			setPristine();
		}
	};

	useEffect(() => {
		if (step === 5) {
			setDirty();
			setMessage('Are you sure you want to leave this page?');
		}

		if (step !== 5) {
			setPristine();
			setAlert(
				'/create-resume?step=1',
				'You are not authorize to go in this page. Please start at Step 1'
			);
		}

		if (error) {
			setDirty();
			setMessage('Are you sure you want to leave this page?');
			setAlert('', error.msg);
			clearError();
		}

		if (success) {
			resumeSuccess(false);
			resumeStep(6);
			history.push({
				pathname: '/create-resume',
				search: 'step=6',
			});
		}

		// eslint-disable-next-line
	}, [success, step, error]);

	return (
		<div className="step-5">
			{Prompt}
			<div className="row">
				<div className="col-lg-12">
					<form className="form" onSubmit={onSubmit}>
						<div className="form-row">
							<div className="col-lg-4 col-md-6">
								<div className="content">
									<h5 className="title">Work History</h5>
									<div className="form-group">
										<label className="form-label">Job Title / Position</label>
										<input
											type="text"
											name="title"
											value={title}
											className="form-control input"
											onChange={onChange}
										/>
									</div>
									<div className="form-group">
										<label className="form-label">Company</label>
										<input
											type="text"
											name="company"
											value={company}
											onChange={onChange}
											className="form-control input"
										/>
									</div>
									<div className="form-group">
										<label className="form-label">Month / Year Started</label>
										<div className="form-row">
											<div className="col">
												<select
													name="monthStarted"
													className="form-control input"
													onChange={onChange}
													value={monthStarted}
												>
													{monthList().map((e, i) => (
														<option key={i} value={e}>
															{e}
														</option>
													))}
												</select>
											</div>
											<div className="col">
												<select
													name="yearStarted"
													className="form-control input"
													onChange={onChange}
													value={yearStarted}
												>
													{yearList().map((e, i) => (
														<option key={i} value={e}>
															{e}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>
									<div className="form-group">
										<label className="form-label">Month / Year Ended</label>
										<div className="form-row">
											<div className="col">
												<select
													name="monthEnded"
													className="form-control input"
													onChange={onChange}
													value={monthEnded}
												>
													{monthList().map((e, i) => (
														<option key={i} value={e}>
															{e}
														</option>
													))}
												</select>
											</div>
											<div className="col">
												<select
													name="yearEnded"
													className="form-control input"
													onChange={onChange}
													value={yearEnded}
												>
													{yearList().map((e, i) => (
														<option key={i} value={e}>
															{e}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 center-col">
								<div className="content center">
									<div className="form-group">
										<label className="form-label">Job Description</label>
										<textarea
											name="description"
											value={description}
											onChange={onChange}
											className="form-control input"
											cols="30"
											rows="12"
										></textarea>
									</div>
								</div>
							</div>
							<div
								className={`col-lg-4 col-md-6${
									windowSize.width < 1024 ? ' offset-md-3' : ''
								}`}
							>
								<div className="content right">
									<div className="form-group">
										<label className="form-label">About the company</label>
										{/* <textarea
                                            name="about"
                                            value={about}
                                            onChange={onChange}
                                            className="form-control input"
                                            cols="30"
                                            rows="12"
                                        ></textarea> */}
										<br />
										<label
											htmlFor="companyExpertiseInput"
											className="form-label"
										>
											Company Expertise
										</label>
										<br />
										{companyExpertiseList().map((e, i) => (
											<div className="form-group form-check mb-0">
												<input
													type="checkbox"
													className="form-check-input"
													id={`companyExpertiseInput${i}`}
													name="companyExpertise"
													onChange={onChange}
													value={e}
													checked={companyExpertise.includes(e)}
												/>
												<label
													className="form-check-label"
													htmlFor={`companyExpertiseInput${i}`}
												>
													{e}
												</label>
											</div>
										))}
										<div className="form-group row">
											<div className="form-group col">
												<label htmlFor="countryInput" className="form-label">
													Country
												</label>
												<select
													name="country"
													id="countryInput"
													className="form-control input"
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
											<div className="form-group col">
												<label htmlFor="countryInput" className="form-label">
													Company Size
												</label>
												<select
													name="companySize"
													id="companySizeInput"
													className="form-control input"
													onChange={onChange}
													value={companySize}
												>
													{companySizeList().map((e, i) => (
														<option key={i} value={e}>
															{e}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="form-row mb-5">
							<div className="col-lg-4 offset-lg-8">
								<div className="form-inline">
									{current === null ? (
										<>
											<button
												className="btn btn-primary button add"
												onClick={onAdd}
											>
												Add
											</button>
											<input
												type="submit"
												value="Almost done"
												className="btn btn-primary button submit"
											/>
										</>
									) : (
										<>
											<button
												className="btn btn-primary button update"
												onClick={onUpdate}
											>
												Update
											</button>
											<button
												className="btn btn-primary button clear"
												onClick={onClear}
											>
												Clear
											</button>
										</>
									)}
								</div>
							</div>
						</div>
						<div className="form-row">
							<div className="col-lg-12">
								<div className="form-row">
									<div className="col-lg-4">
										<p className="subtitle">Summary</p>
									</div>
									<div className="col-lg-8 border-top">
										{workHistory.length === 0 ? (
											<p className="text">
												This section will display on what you added to your work
												history from the top section.
											</p>
										) : null}
									</div>
								</div>
							</div>
							<div className="col-lg-12">
								{workHistory.length !== 0
									? workHistory.map((work, index) => (
											<WorkHistoryItem
												key={index}
												workHistory={work}
												index={index}
												editWork={onEdit}
												deleteWork={onDelete}
											/>
									  ))
									: null}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

Step5.propTypes = {
	setAlert: PropTypes.func.isRequired,
	addResume: PropTypes.func.isRequired,
	resumeStep: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
	resumeSuccess: PropTypes.func.isRequired,
	resumeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	resumeState: state.resumeState,
});

export default connect(mapStateToProps, {
	setAlert,
	addResume,
	resumeStep,
	clearError,
	resumeSuccess,
})(Step5);
