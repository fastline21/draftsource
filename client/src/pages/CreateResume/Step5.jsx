import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';
import useWindowSize from './../../utils/useWindowSize';

// Action
import { setAlert } from './../../state/actions/alertAction';
import { addResume, clearError } from './../../state/actions/resumeAction';

// List
import { monthList } from './../../list/Month';
import { yearList } from './../../list/Year';
import { companyExpertiseList } from './../../list/CompanyExpertise';

// Components
import WorkHistoryItem from './WorkHistoryItem';
import { countryList } from '../../list/Country';

const Step5 = ({ setAlert, addResume, clearError, resumeState: { error } }) => {
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
		monthStarted: 'January',
		yearStarted: defaultYear,
		monthEnded: 'January',
		yearEnded: defaultYear,
		description: '',
		companyExpertise: [],
		country: 'Afghanistan',
	};

	const [workHistory, setWorkHistory] = useState([]);
	const [workHistoryItem, setWorkHistoryItem] = useState(initialWorkHistory);
	const [current, setCurrent] = useState(null);
	const [submit, setSubmit] = useState(false);

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
	} = workHistoryItem;

	const clearWorkHistoryItem = () => {
		setWorkHistoryItem(initialWorkHistory);
		setCurrent(null);
	};

	const onAdd = (e) => {
		e.preventDefault();

		if (
			title === '' ||
			company === '' ||
			monthStarted === '' ||
			yearStarted === '' ||
			monthEnded === '' ||
			yearEnded === '' ||
			description === '' ||
			companyExpertise.length === 0 ||
			country === ''
		) {
			return setAlert(
				'',
				'Please fill-in the required boxes to Proceed.'
			);
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
		setWorkHistoryItem([
			...workHistory.splice(current, 1, workHistoryItem),
		]);
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
						...companyExpertise.filter(
							(expertise) => expertise !== value
						),
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
			return setAlert(
				'',
				'Please fill-in the required boxes to Proceed.'
			);
		} else {
			addResume({
				workHistory,
			});
			setWorkHistory([]);
			setSubmit(true);
			setPristine();
		}
	};

	useEffect(() => {
		if (workHistory.length === 0) {
			setDirty();
			setMessage('Are you sure you want to leave this page?');
		}

		if (error) {
			setAlert('', error.msg);
			clearError();
		}

		if (submit) {
			setSubmit(false);
			history.push({
				pathname: '/create-resume',
				search: 'step=6',
			});
		}

		// eslint-disable-next-line
	}, [workHistory, submit, error]);

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
										<label className="form-label">
											Job Title / Position
										</label>
										<input
											type="text"
											name="title"
											value={title}
											className="form-control input"
											onChange={onChange}
										/>
									</div>
									<div className="form-group">
										<label className="form-label">
											Company
										</label>
										<input
											type="text"
											name="company"
											value={company}
											onChange={onChange}
											className="form-control input"
										/>
									</div>
									<div className="form-group">
										<label className="form-label">
											Month / Year Started
										</label>
										<div className="form-row">
											<div className="col">
												<select
													name="monthStarted"
													className="form-control input"
													onChange={onChange}
													value={monthStarted}
												>
													{monthList().map((e, i) => (
														<option
															key={i}
															value={e}
														>
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
														<option
															key={i}
															value={e}
														>
															{e}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>
									<div className="form-group">
										<label className="form-label">
											Month / Year Ended
										</label>
										<div className="form-row">
											<div className="col">
												<select
													name="monthEnded"
													className="form-control input"
													onChange={onChange}
													value={monthEnded}
												>
													{monthList().map((e, i) => (
														<option
															key={i}
															value={e}
														>
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
														<option
															key={i}
															value={e}
														>
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
										<label className="form-label">
											Job Description
										</label>
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
									windowSize.width < 1024
										? ' offset-md-3'
										: ''
								}`}
							>
								<div className="content right">
									<div className="form-group">
										<label className="form-label">
											About the company
										</label>
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
													checked={companyExpertise.includes(
														e
													)}
												/>
												<label
													className="form-check-label"
													htmlFor={`companyExpertiseInput${i}`}
												>
													{e}
												</label>
											</div>
										))}
										<label
											htmlFor="countryInput"
											className="form-label"
										>
											Country
										</label>
										<div className="form-inline">
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
												This section will display on
												what you added to your work
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
	clearError: PropTypes.func.isRequired,
	resumeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	resumeState: state.resumeState,
});

export default connect(mapStateToProps, { setAlert, clearError, addResume })(
	Step5
);
