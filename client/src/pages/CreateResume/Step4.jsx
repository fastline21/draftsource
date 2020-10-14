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
import { availabilityList } from './../../list/Availability';
import { salaryList } from './../../list/Salary';

// Components
import EducationItem from './EducationItem';

const Step4 = ({
	setAlert,
	addResume,
	clearError,
	uploadFile,
	resumeState: { error },
}) => {
	const [
		Prompt,
		setDirty,
		setPristine,
		setMessage,
	] = useUnsavedChangesWarning();

	const windowSize = useWindowSize();

	const history = useHistory();

	const initialInfo = {
		availability: 'Full Time',
		expectedSalary: '$500-$600',
		headline: '',
	};
	const initialEducation = {
		choices: 'High School',
		degree: '',
		school: '',
		course: '',
		monthYearStarted: '',
		monthYearGraduated: '',
		license: '',
	};

	const [info, setInfo] = useState(initialInfo);
	const [education, setEducation] = useState([]);
	const [currentEdu, setCurrentEdu] = useState(null);
	const [disableInput, setDisableInput] = useState({
		highSchool: true,
		license: true,
	});
	const [educationItem, setEducationItem] = useState(initialEducation);
	const [uploadAudio, setUploadAudio] = useState(null);
	const [submit, setSubmit] = useState(false);

	const { availability, expectedSalary, headline } = info;

	const eduItem = (e) => {
		const { name, value } = e.target;
		setEducationItem({ ...educationItem, [name]: value });
		if (name === 'choices') {
			if (value === 'High School') {
				setDisableInput({
					highSchool: true,
					license: true,
				});
				document.querySelector('.input[name=degree]').value = '';
				document.querySelector('.input[name=course]').value = '';
				document.querySelector('.input[name=license]').value = '';
				const copy = {
					...educationItem,
					choices: 'High School',
					degree: '',
					course: '',
					license: '',
				};
				setEducationItem({ ...copy });
			} else if (value === 'License and Certification') {
				setDisableInput({
					highSchool: true,
					license: false,
				});
				document.querySelector('.input[name=degree]').value = '';
				document.querySelector('.input[name=course]').value = '';
				document.querySelector('.input[name=school]').value = '';
				document.querySelector('.input[name=license]').value = '';
				const copy = {
					...educationItem,
					choices: 'License and Certification',
					degree: '',
					course: '',
				};
				setEducationItem({ ...copy });
			} else {
				setDisableInput({
					highSchool: false,
					license: true,
				});
			}
		}
	};

	const uploadButton = (e) => {
		const { files } = e.target;
		setUploadAudio(files[0]);
	};

	const uploadAudioClick = (e) => {
		if (e.target.classList.contains('disabled')) {
			return e.preventDefault();
		}
	};

	const replaceUploadButton = (e) => {
		const { files } = e.target;
		setUploadAudio(files[0]);
	};

	const addEducation = (e) => {
		e.preventDefault();
		const {
			choices,
			degree,
			school,
			course,
			monthYearStarted,
			monthYearGraduated,
			license,
		} = educationItem;
		if (choices === 'High School') {
			if (
				school === '' ||
				monthYearStarted === '' ||
				monthYearGraduated === ''
			) {
				return setAlert(
					'',
					'Please fill-in the required boxes to Proceed.'
				);
			}
		} else if (choices === 'License and Certification') {
			if (license === '') {
				return setAlert(
					'',
					'Please fill-in the required boxes to Proceed.'
				);
			}
		} else {
			if (
				degree === '' ||
				school === '' ||
				course === '' ||
				monthYearStarted === '' ||
				monthYearGraduated === ''
			) {
				return setAlert(
					'',
					'Please fill-in the required boxes to Proceed.'
				);
			}
		}
		setEducation((education) => [...education, educationItem]);
		clearEducationItem();
		setDisableInput({
			highSchool: true,
			license: true,
		});
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	const editEdu = (e) => {
		if (
			education[e]['choices'] !== 'High School' &&
			education[e]['choices'] !== 'License and Certification'
		) {
			setDisableInput({
				highSchool: false,
				license: true,
			});
		} else if (education[e]['choices'] === 'License and Certification') {
			setDisableInput({
				highSchool: true,
				license: false,
			});
		} else if (education[e]['choices'] === 'High School') {
			setDisableInput({
				highSchool: true,
				license: true,
			});
		}
		Array.from(document.querySelectorAll('.center-col .input')).forEach(
			(input) => (input.value = education[e][input.name])
		);
		setEducationItem({ ...education[e] });
		setCurrentEdu(e);
	};

	const updateEdu = (e) => {
		e.preventDefault();
		setEducationItem([...education.splice(currentEdu, 1, educationItem)]);
		clearCurrentEdu();
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	const clearCurrentEduBtn = (e) => {
		e.preventDefault();
		clearCurrentEdu();
	};

	const deleteEdu = (e) => {
		if (currentEdu === e) {
			clearCurrentEdu();
		}
		setEducation((education) => [
			...education.filter((x) => education.indexOf(x) !== e),
		]);
	};

	const clearEducationItem = () => {
		setEducationItem({ ...initialEducation });
		setDisableInput({
			highSchool: true,
			license: true,
		});
		Array.from(document.querySelectorAll('.center-col .input')).forEach(
			(input) => (input.value = initialEducation[input.name])
		);
	};

	const clearCurrentEdu = () => {
		clearEducationItem();
		setCurrentEdu(null);
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setInfo({ ...info, [name]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (
			availability === '' ||
			expectedSalary === '' ||
			headline === '' ||
			uploadAudio === null ||
			education.length === 0
		) {
			return setAlert(
				'',
				'Please fill-in the required boxes to Proceed.'
			);
		} else {
			uploadFile({
				aboutYourself: uploadAudio,
			});
			addResume({
				...info,
				education,
			});
			setInfo(initialInfo);
			setUploadAudio(null);
			setEducation([]);
			setSubmit(true);
			setPristine();
		}
	};

	useEffect(() => {
		if (
			JSON.stringify(info) === JSON.stringify(initialInfo) ||
			education.length === 0
		) {
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
				search: 'step=5',
			});
		}

		// eslint-disable-next-line
	}, [info, education, error, submit]);

	return (
		<div className="step-4">
			{Prompt}
			<div className="row">
				<div className="col-lg-12">
					<form className="form" onSubmit={onSubmit}>
						<div className="form-row">
							<div className="col-lg-4 col-md-6">
								<div className="content">
									<div className="form-group">
										<h5 className="title">
											Are you looking to work?
										</h5>
										{availabilityList().map((e, i) => (
											<div className="form-check">
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
										<label
											className="form-label"
											htmlFor="expectedSalaryInput"
										>
											Expected Salary
										</label>
										<select
											name="expectedSalary"
											className="form-control input"
											id="expectedSalaryInput"
										>
											{salaryList().map((e, i) => (
												<option value={e} key={i}>
													{e}
												</option>
											))}
										</select>
										{/* <div className="form-inline">
											<input
												type="number"
												name="expectedSalary"
												className="form-control input"
												placeholder="per Hour"
												value={expectedSalary}
												onChange={onChange}
											/>
											<select
												name="currency"
												className="form-control input"
												onChange={onChange}
												value={currency}
											>
												<option value="USD">USD</option>
											</select>
										</div> */}
									</div>
									<div className="form-group mb-0">
										<div className="form-inline">
											<label className="form-label upload-audio-label">
												About Yourself
											</label>
											<div className="form-group upload-file">
												<label
													htmlFor="sampleAudioInput"
													className={`form-label${
														uploadAudio
															? ' disabled'
															: ''
													}`}
													onClick={uploadAudioClick}
												>
													Upload Audio
												</label>
												<input
													type="file"
													accept="audio/*"
													name="sampleAudio"
													id="sampleAudioInput"
													className="form-control-file"
													onChange={uploadButton}
												/>
											</div>
										</div>
										<p>
											Record an mp3 or mp4 audio (not more
											than 60 sec) about yourself in
											English
											<br />
											<br />
											<span>
												* do not include name, email and
												contact number
											</span>
										</p>
										<p
											id="sampleAudio"
											className="upload"
											style={{
												display: uploadAudio
													? 'block'
													: 'none',
											}}
										>
											<label
												id="sampleAudioFile"
												className="selected-file"
											>
												{uploadAudio
													? uploadAudio.name
													: null}
											</label>
											<label
												htmlFor="replacesampleAudioInput"
												className="replace-button"
											>
												Replace
											</label>
											<input
												type="file"
												accept="audio/*"
												name="sampleAudio"
												id="replacesampleAudioInput"
												className="form-control-file"
												onChange={replaceUploadButton}
											/>
										</p>
									</div>
									<div className="form-group">
										<label
											htmlFor="headlineInput"
											className="form-label"
										>
											Headline
										</label>
										<textarea
											name="headline"
											id="headlineInput"
											rows="2"
											className="form-control input"
											style={{ borderRadius: '20px' }}
											onChange={onChange}
											value={headline}
										></textarea>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 center-col">
								<div className="content">
									<div className="form-group">
										<h5 className="title">
											Personal Information
										</h5>
										<p className="subtitle">Education</p>
										<div>
											<div className="form-group">
												<label className="form-label">
													Choices
												</label>
												<select
													name="choices"
													className="form-control input"
													onChange={eduItem}
												>
													<option value="High School">
														High School
													</option>
													<option value="College">
														College
													</option>
													<option value="Master's">
														Master's
													</option>
													<option value="Doctor">
														Doctor
													</option>
													<option value="License and Certification">
														License and
														Certification
													</option>
												</select>
											</div>
											<div className="form-group">
												<label className="form-label">
													License and Certification
												</label>
												<input
													type="text"
													name="license"
													className="form-control input"
													onChange={eduItem}
													disabled={
														disableInput.license
													}
												/>
											</div>
											<div className="form-group">
												<label className="form-label">
													Degree
												</label>
												<input
													type="text"
													name="degree"
													className="form-control input"
													onChange={eduItem}
													disabled={
														disableInput.highSchool
													}
												/>
											</div>
											<div className="form-group">
												<label className="form-label">
													Course
												</label>
												<input
													type="text"
													name="course"
													className="form-control input"
													onChange={eduItem}
													disabled={
														disableInput.highSchool
													}
												/>
											</div>
											<div className="form-group">
												<label className="form-label">
													School
												</label>
												<input
													type="text"
													name="school"
													className="form-control input"
													onChange={eduItem}
													disabled={
														!disableInput.license
													}
												/>
											</div>
											<div className="form-group">
												<div className="form-row">
													<div className="col-lg-6">
														<div className="form-group">
															<label
																className="form-label"
																style={
																	windowSize.width >=
																		1024 &&
																	windowSize.width <
																		1140
																		? {
																				marginBottom:
																					'34px',
																		  }
																		: null
																}
															>
																Year Started
															</label>
															<input
																type="text"
																name="monthYearStarted"
																className="form-control input"
																onChange={
																	eduItem
																}
															/>
														</div>
													</div>
													<div className="col-lg-6">
														<div className="form-group">
															<label className="form-label">
																Year Graduated
															</label>
															<input
																type="text"
																name="monthYearGraduated"
																className="form-control input"
																onChange={
																	eduItem
																}
															/>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="form-group">
											{currentEdu === null ? (
												<button
													className="btn btn-primary btn-block button"
													onClick={addEducation}
												>
													Add
												</button>
											) : (
												<>
													<button
														className="btn btn-primary btn-block button"
														onClick={updateEdu}
													>
														Update
													</button>
													<button
														className="btn btn-primary btn-block button clear"
														onClick={
															clearCurrentEduBtn
														}
													>
														Clear
													</button>
												</>
											)}
										</div>
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
								<div className="content">
									<div className="form-group">
										<p
											className="subtitle"
											style={{ marginTop: '44px' }}
										>
											Summary
										</p>
										<div className="summary">
											{education.length === 0 ? (
												<>
													<p className="text">
														This section is for the
														viewing on what you
														added on your
														educational background
														from the left portion.
													</p>
													<p className="text">
														You can fill up and add
														as much as you want but
														always remember that you
														must add an info that
														will or somehow
														contribute to a job
														you're applying for.
													</p>
												</>
											) : (
												education.map((edu, index) => (
													<EducationItem
														education={edu}
														key={index}
														index={index}
														editEdu={editEdu}
														deleteEdu={deleteEdu}
													/>
												))
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="form-row mt-5">
							<div className="col-lg-4 offset-lg-8">
								<div className="form-group mx-auto">
									<input
										type="submit"
										value="Proceed"
										className="btn btn-primary button submit"
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

Step4.propTypes = {
	setAlert: PropTypes.func.isRequired,
	addResume: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
	resumeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	resumeState: state.resumeState,
});

export default connect(mapStateToProps, { setAlert, clearError, addResume })(
	Step4
);
