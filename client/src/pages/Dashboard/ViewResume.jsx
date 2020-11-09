import React, { useState, useEffect, Fragment } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';

// Actions
import {
	clearResume,
	addRecruitersComment,
	updateResume,
} from './../../state/actions/candidateAction';
import { setAlert } from './../../state/actions/alertAction';

// Lists
import { ratingList } from './../../list/Rating';
import { salaryList } from './../../list/Salary';
import { monthList } from './../../list/Month';
import { yearList } from './../../list/Year';
import { countryList } from './../../list/Country';

// Components
import ViewImage from './ViewImage';
import ViewSampleWork from './ViewSampleWork';
import ModalActionResume from './ModalActionResume';

const ViewResume = ({
	loadCandidate,
	candidateState: { resume },
	clearResume,
	addRecruitersComment,
	updateResume,
	setAlert,
}) => {
	const [isEdit, setIsEdit] = useState({
		fullname: false,
		headline: false,
		email: false,
		contactNo: false,
		city: false,
		rating: false,
		expectedSalary: false,
		skill: false,
		advancedSoftware: false,
		intermediateSoftware: false,
		workHistory: false,
		education: false,
		recruitmentsComment: false,
		internetResult: false,
		internetType: false,
		hardwareType: false,
		brandName: false,
		processor: false,
		ram: false,
	});

	const [isEditArr, setIsEditArr] = useState({
		workHistory: {
			index: null,
			show: false,
		},
	});

	// Initial
	const initialData = {
		_id: '',
		idCode: '',
		headline: '',
		resumeImage: '',
		aboutYourself: '',
		firstName: '',
		lastName: '',
		city: '',
		linkedIn: '',
		age: '',
		gender: '',
		cellphone: '',
		status: '',
		rating: 'Basic',
		availability: '',
		expectedSalary: '',
		currency: '',
		govID: '',
		cv: '',
		specialty: [],
		advancedSoftware: [],
		intermediateSoftware: [],
		marketType: [],
		countryExperience: [],
		uploadWork: { images: [] },
		workHistory: [],
		education: [],
		recruitmentsComment: '',
		internetType: '',
		hardwareType: '',
		brandName: '',
		internetResult: '',
		email: '',
		processor: '',
		ram: '',
		os: '',
		storage: '',
		graphicsCard: '',
		videoCard: '',
		recruiterName: '',
	};
	const initialViewImage = {
		show: false,
		title: '',
		file: '',
	};
	const initialViewSampleWork = {
		show: false,
		title: '',
		file: '',
	};

	// State
	const [show, setShow] = useState(false);
	const [data, setData] = useState(initialData);
	const [action, setAction] = useState(null);
	const [showModalAction, setShowModalAction] = useState(false);
	const [msg, setMsg] = useState('');
	const [viewImage, setViewImage] = useState(initialViewImage);
	const [viewSampleWork, setViewSampleWork] = useState(initialViewSampleWork);

	const {
		_id,
		idCode,
		headline,
		resumeImage,
		aboutYourself,
		firstName,
		lastName,
		cellphone,
		email,
		age,
		gender,
		linkedIn,
		city,
		status,
		rating,
		expectedSalary,
		govID,
		cv,
		specialty,
		advancedSoftware,
		intermediateSoftware,
		marketType,
		countryExperience,
		uploadWork,
		workHistory,
		education,
		recruitmentsComment,
		internetType,
		hardwareType,
		brandName,
		internetResult,
		processor,
		ram,
		os,
		storage,
		graphicsCard,
		videoCard,
		recruiterName,
	} = data;

	const approveResume = () => {
		if (recruitmentsComment === undefined || recruitmentsComment.length === 0) {
			setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			setAction('approve');
			setShowModalAction(true);
			setMsg(
				'<h2 className="title">Approve Resume?</h2><p>This resume will add to your approved resume tab.</p>'
			);
		}
	};

	const rejectResume = () => {
		if (recruitmentsComment === undefined || recruitmentsComment.length === 0) {
			setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			setAction('reject');
			setShowModalAction(true);
			setMsg(
				'<h2 className="title">Reject Resume?</h2><p>This resume will go to your reject resume tab. You can go back and review it again and decide to reapprove or delete this application.</p>'
			);
		}
	};

	const deleteResume = () => {
		setAction('delete');
		setShowModalAction(true);
		setMsg(
			'<h2 className="title">Delete Resume?</h2><p>This resume will remove from the system and data of draftsource.</p>'
		);
	};

	const reapproveResume = () => {
		setAction('reapprove');
		setShowModalAction(true);
		setMsg(
			'<h2 className="title">Reapprove Resume?</h2><p>This resume will go to your approve resume tab. You can reject this resume later on if you wanted.</p>'
		);
	};

	const hireResume = () => {
		setAction('hire');
		setShowModalAction(true);
		setMsg(
			'<h2 className="title">Hire Resume?</h2><p>This resume will go to your hire resume tab. You can reject this resume later on if you wanted.</p>'
		);
	};

	const actionButton = () => {
		if (status === 'Pending') {
			return (
				<>
					<button className="btn btn-primary button" onClick={approveResume}>
						Approve
					</button>
					<button
						className="btn btn-primary button button1"
						onClick={rejectResume}
					>
						Reject
					</button>
				</>
			);
		} else if (status === 'Approve') {
			return (
				<>
					<button
						className="btn btn-primary button button"
						onClick={hireResume}
					>
						Hire
					</button>
					<button
						className="btn btn-primary button button1"
						onClick={rejectResume}
					>
						Reject
					</button>
				</>
			);
		} else {
			return (
				<>
					<button className="btn btn-primary button" onClick={reapproveResume}>
						Reapprove
					</button>
					<button
						className="btn btn-primary button button1"
						onClick={deleteResume}
					>
						Delete
					</button>
				</>
			);
		}
	};

	const onAddRecruitersComment = () => {
		if (recruitmentsComment === '') {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			addRecruitersComment({ _id, recruitmentsComment });
			setAlert('', 'Add Recruiters Comment Success');
		}
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		if (isEditArr.workHistory.show) {
			workHistory[isEditArr.workHistory.index][name] = value;
			setData({ ...data, workHistory: [...workHistory] });
		} else {
			setData({ ...data, [name]: value });
		}
	};

	const onClickEdit = (category) => {
		setIsEdit({ ...isEdit, [category]: !isEdit[category] });
		if (isEdit[category]) {
			updateResume(data);
		}
	};

	const onClickEditArray = (category, index) => {
		setIsEdit({ ...isEdit, [category]: !isEdit[category] });
		setIsEditArr({
			...isEditArr,
			[category]: { index, show: !isEditArr[category].show },
		});
		if (isEdit[category]) {
			updateResume(data);
		}
	};

	const totalMonths = (m1, m2, y1, y2) => {
		const d2 = moment(
			`${moment().month(m1).format('MM')}/01/${parseInt(y1)}`,
			'MM/DD/YYYY'
		);
		const d1 = moment(
			`${moment().month(m2).format('MM')}/01/${parseInt(y2)}`,
			'MM/DD/YYYY'
		);
		return d1.diff(d2, 'month');
	};

	const handleClose = () => {
		setShow(false);
		clearResume();
	};

	const handleShow = () => setShow(true);

	useEffect(() => {
		if (resume) {
			handleShow();
			setData({ ...data, ...resume });
		}

		// eslint-disable-next-line
	}, [resume]);

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			size="xl"
			id="seeResume"
		>
			<Modal.Body>
				<ViewImage
					viewImage={viewImage}
					isHide={() => setViewImage(initialViewImage)}
				/>
				<ViewSampleWork
					isShow={viewSampleWork.show}
					isHide={() => setViewSampleWork(initialViewSampleWork)}
					viewSampleWork={viewSampleWork}
				/>
				<ModalActionResume
					isShow={showModalAction}
					load={data}
					msg={msg}
					action={action}
					isHide={() => {
						setShowModalAction(false);
						handleClose();
						// loadCandidate();
					}}
				/>
				<button className="close" onClick={handleClose}>
					<span aria-hidden="true">×</span>
					<span className="sr-only">Close</span>
				</button>
				<div className="container-fluid">
					<div className="row pb-5">
						<div className="col-lg-3">
							<img
								src={`/uploads/${resumeImage}`}
								alt=""
								className="img-fluid resume-image mb-3"
							/>
							<audio controls controlsList="nodownload">
								<source src={`/uploads/${aboutYourself}`} />
								Your browser does not support the audio!
							</audio>
						</div>
						<div className="col-lg-6">
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									height: '100%',
								}}
							>
								<div>
									<p className="data-title mb-0">
										ID: {idCode.toString().padStart(6, '0')}
									</p>
									{/* <p className="fullname mb-0">
										{isEdit.fullname ? (
											<Fragment>
												<input
													type="text"
													name="firstName"
													placeholder={firstName}
													className="input"
													onChange={onChange}
												/>
												<input
													type="text"
													name="lastName"
													placeholder={lastName}
													className="input"
													onChange={onChange}
												/>
											</Fragment>
										) : (
											`${firstName} ${lastName}`
										)}
										<i
											className={`fas ${
												isEdit.fullname ? 'fa-save' : 'fa-edit'
											}`}
											onClick={() => onClickEdit('fullname')}
										></i>
									</p> */}
									<p className="data-title mb-0">
										{isEdit.headline ? (
											<textarea
												className="input"
												name="headline"
												onChange={onChange}
												cols="50"
												rows="5"
											>
												{headline}
											</textarea>
										) : (
											headline
										)}
										<i
											className={`fas ${
												isEdit.headline ? 'fa-save' : 'fa-edit'
											}`}
											onClick={() => onClickEdit('headline')}
										></i>
									</p>
									<p className="data-title mb-0">
										Expected Salary:{' '}
										{isEdit.expectedSalary ? (
											<select
												name="expectedSalary"
												className="input"
												onChange={onChange}
												value={expectedSalary}
											>
												{salaryList().map((e, i) => (
													<option value={e} key={i}>
														{e}
													</option>
												))}
											</select>
										) : (
											expectedSalary
										)}
										<i
											className={`fas ${
												isEdit.expectedSalary ? 'fa-save' : 'fa-edit'
											}`}
											onClick={() => onClickEdit('expectedSalary')}
										></i>
									</p>
									<p className="data-title mb-0">
										English Level:{' '}
										{isEdit.rating ? (
											<select
												name="rating"
												className="input"
												onChange={onChange}
												value={rating}
											>
												{ratingList().map((e, i) => (
													<option value={e} key={i}>
														{e}
													</option>
												))}
											</select>
										) : rating === '' ? (
											'Basic'
										) : (
											rating
										)}
										<i
											className={`fas ${isEdit.rating ? 'fa-save' : 'fa-edit'}`}
											onClick={() => onClickEdit('rating')}
										></i>
									</p>
									{/* <p className="data-title mb-0">{email}</p> */}
									{/* <p className="data-title mb-0">{cellphone}</p> */}
									{/* <p className="city">{city}</p> */}
								</div>
								{/* <div className="d-flex justify-content-between">
									<div>
										<p className="data-title mb-0">English Level</p>
										<div className="rating">{rating}</div>
									</div>
									<div className="col-lg-4">
										<p className="data-title mb-0">Expected Salary</p>
										<p className="expected-salary">
											{getSymbolFromCurrency(currency)} {expectedSalary} /hr
										</p>
									</div>
								</div> */}
							</div>
						</div>
						<div className="col-lg-3">{actionButton()}</div>
					</div>
					<div className="row pb-3">
						<div className="col-lg-3">
							<p className="item-title color-1 mb-0">Personal Information</p>
						</div>
						<div className="col-lg-9">
							<div className="row">
								<div className="col-lg-6">
									<table className="table table-borderless personal-info">
										<tbody>
											<tr>
												<th className="pt-0 pl-0 item-title">First Name</th>
												<td className="pt-0 pl-0 item-value">{firstName}</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">Last Name</th>
												<td className="pt-0 pl-0 item-value">{lastName}</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">Email</th>
												<td className="pt-0 pl-0 item-value">{email}</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">Cellphone</th>
												<td className="pt-0 pl-0 item-value">{cellphone}</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">Government ID</th>
												<td className="pt-0 pl-0 item-value">
													<button
														className="btn btn-primary view"
														onClick={() =>
															setViewImage({
																show: true,
																title: 'Government ID',
																file: govID,
															})
														}
													>
														View
													</button>
												</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">CV</th>
												<td className="pt-0 pl-0 item-value">
													<a
														href={`/uploads/${cv}`}
														className="btn btn-primary view"
														download
													>
														View
													</a>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className="col-lg-6">
									<table className="table table-borderless personal-info">
										<tbody>
											<tr>
												<th className="pt-0 pl-0 item-title">Age</th>
												<td className="pt-0 item-value">{age}</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">Gender</th>
												<td className="pt-0 item-value">{gender}</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">City</th>
												<td className="pt-0 item-value">{city}</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">LinkedIn Link</th>
												<td className="pt-0 item-value">
													<a
														href={linkedIn}
														target="_blank"
														className="btn btn-primary view"
														rel="noopener noreferrer"
													>
														View
													</a>
												</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">Recruiter Name</th>
												<td className="pt-0 item-value">{recruiterName}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
							<hr className="line-break" />
						</div>
					</div>
					<div className="row pb-3">
						<div className="col-lg-3">
							<p className="item-title color-1 mb-0">Skills & Specialties</p>
						</div>
						<div className="col-lg-9">
							<p className="specialty-software mb-0">
								{specialty.map((e, i) => (
									<span className="specialty-software-item" key={i}>
										{e}
									</span>
								))}
							</p>
							<hr className="line-break" />
						</div>
					</div>
					<div className="row pb-3">
						<div className="col-lg-3">
							<p className="item-title color-1 mb-0">
								Advanced Software Expertise
							</p>
						</div>
						<div className="col-lg-9">
							<p className="specialty-software mb-0">
								{advancedSoftware.map((e, i) => (
									<span className="specialty-software-item" key={i}>
										{e}
									</span>
								))}
							</p>
							<hr className="line-break" />
						</div>
					</div>
					<div className="row pb-3">
						<div className="col-lg-3">
							<p className="item-title color-1 mb-0">
								Intermediate Software Expertise
							</p>
						</div>
						<div className="col-lg-9">
							<p className="specialty-software mb-0">
								{intermediateSoftware.map((e, i) => (
									<span className="specialty-software-item" key={i}>
										{e}
									</span>
								))}
							</p>
							<hr className="line-break" />
						</div>
					</div>
					<div className="row pb-3">
						<div className="col-lg-3">
							<p className="item-title color-1 mb-0">Market type experience</p>
						</div>
						<div className="col-lg-9">
							<p className="specialty-software mb-0">
								{marketType.map((e, i) => (
									<span className="specialty-software-item" key={i}>
										{e}
									</span>
								))}
							</p>
							<hr className="line-break" />
						</div>
					</div>
					<div className="row pb-5">
						<div className="col-lg-3">
							<p className="item-title color-1 mb-0">Country experience</p>
						</div>
						<div className="col-lg-9">
							<p className="specialty-software mb-0">
								{countryExperience.map((e, i) => (
									<span className="specialty-software-item" key={i}>
										{e}
									</span>
								))}
							</p>
							<hr className="line-break" />
						</div>
					</div>
					<div className="row pb-5">
						<div className="col-lg-3">
							<p className="item-title color-2">Sample Works</p>
						</div>
						<div className="col-lg-9">
							<div className="row pb-3 upload-work-images">
								{uploadWork.images.map((e, i) => (
									<div className="col-lg-3" key={i}>
										<figure
											className="figure"
											style={{ cursor: 'pointer' }}
											onClick={() =>
												setViewSampleWork({
													show: true,
													title: e.title,
													file: e.file,
												})
											}
										>
											<img
												src={`/uploads/${e.file}`}
												alt={e.title}
												className="figure-img img-fluid"
											/>
											<figcaption className="figure-caption">
												{e.title}
											</figcaption>
										</figure>
									</div>
								))}
							</div>
							<hr className="line-break" />
						</div>
					</div>
					<div className="row pb-5">
						<div className="col-lg-3">
							<p className="item-title color-2">Work Experience</p>
						</div>
						<div className="col-lg-9">
							<div id="workHistory" className="work-history">
								{workHistory.map((e, i) => (
									<div className="work-history-item" key={i}>
										<i
											className={`fas ${
												isEdit.workHistory ? 'fa-save' : 'fa-edit'
											}`}
											onClick={() => onClickEditArray('workHistory', i)}
										></i>
										<p className="title">
											{isEditArr.workHistory.show &&
											isEditArr.workHistory.index === i ? (
												<input
													type="text"
													className="input"
													name="title"
													value={e.title}
													onChange={onChange}
												/>
											) : (
												e.title
											)}
										</p>
										<p className="company">
											{isEditArr.workHistory.show &&
											isEditArr.workHistory.index === i ? (
												<input
													type="text"
													className="input mb-2"
													name="company"
													value={e.company}
													onChange={onChange}
												/>
											) : (
												e.company
											)}
										</p>
										<p className="month-year">
											{isEditArr.workHistory.show &&
											isEditArr.workHistory.index === i ? (
												<select
													className="input"
													name="monthStarted"
													value={e.monthStarted}
													onChange={onChange}
												>
													{monthList().map((element, index) => (
														<option value={element} key={index}>
															{element}
														</option>
													))}
												</select>
											) : (
												e.monthStarted
											)}{' '}
											{isEditArr.workHistory.show &&
											isEditArr.workHistory.index === i ? (
												<select
													className="input"
													name="yearStarted"
													value={e.yearStarted}
													onChange={onChange}
												>
													{yearList().map((element, index) => (
														<option value={element} key={index}>
															{element}
														</option>
													))}
												</select>
											) : (
												e.yearStarted
											)}{' '}
											-{' '}
											{isEditArr.workHistory.show &&
											isEditArr.workHistory.index === i ? (
												<select
													className="input"
													name="monthEnded"
													value={e.monthEnded}
													onChange={onChange}
												>
													{monthList().map((element, index) => (
														<option value={element} key={index}>
															{element}
														</option>
													))}
												</select>
											) : (
												e.monthEnded
											)}{' '}
											{isEditArr.workHistory.show &&
											isEditArr.workHistory.index === i ? (
												<select
													className="input"
													name="yearEnded"
													value={e.yearEnded}
													onChange={onChange}
												>
													{yearList().map((element, index) => (
														<option value={element} key={index}>
															{element}
														</option>
													))}
												</select>
											) : (
												e.yearEnded
											)}{' '}
											{`(${totalMonths(
												e.monthStarted,
												e.monthEnded,
												e.yearStarted,
												e.yearEnded
											)} ${
												totalMonths(
													e.monthStarted,
													e.monthEnded,
													e.yearStarted,
													e.yearEnded
												) > 1
													? 'months'
													: 'month'
											})`}
										</p>
										<p className="item-title">Job Description</p>
										<p className="description">
											{isEditArr.workHistory.show &&
											isEditArr.workHistory.index === i ? (
												<textarea
													className="form-control input"
													name="description"
													value={e.description}
													onChange={onChange}
													rows="12"
												>
													{e.description}
												</textarea>
											) : (
												e.description
											)}
										</p>
										<p className="title">About the company</p>
										<p className="item-title">Company Expertise</p>
										<p className="company-expertise">
											{e.companyExpertise.join(', ')}
										</p>
										<br />
										<p className="item-title">Country</p>
										<p className="country">
											{isEditArr.workHistory.show &&
											isEditArr.workHistory.index === i ? (
												<select
													className="input"
													name="country"
													value={e.country}
													onChange={onChange}
												>
													{countryList().map((elm, index) => (
														<option value={elm} key={index}>
															{elm}
														</option>
													))}
												</select>
											) : (
												e.country
											)}
										</p>
										<p className="item-title">Company Size</p>
										<p className="company-size">{e.companySize}</p>
									</div>
								))}
							</div>
							<hr className="line-break" />
						</div>
					</div>
					<div className="row pb-5">
						<div className="col-lg-3">
							<p className="item-title color-2">Education</p>
						</div>
						<div className="col-lg-9">
							<div id="education" className="education">
								{education.map((e, i) => (
									<div className="education-item" key={i}>
										<table className="education-item table table-borderless">
											<tbody>
												{e.choices !== 'License and Certification' ? (
													<tr>
														<td
															className={`item-choices pl-0${
																i === 0 ? ' pt-0' : ''
															}`}
														>
															{e.choices}
														</td>
													</tr>
												) : null}
												{e.choices === 'License and Certification'
													? e.license.map((elm, ind) =>
															ind === 0 ? (
																<tr>
																	<td
																		className="item-title pb-0 pl-0"
																		style={{
																			color: '#298494',
																			fontWeight: 600,
																		}}
																	>
																		License and Certification
																	</td>
																	<td className="item-degree pb-0 item-value">
																		{elm}
																	</td>
																</tr>
															) : (
																<tr>
																	<td></td>
																	<td className="item-degree pb-0 item-value">
																		{elm}
																	</td>
																</tr>
															)
													  )
													: null}
												{e.choices !== 'High School' &&
												e.choices !== 'License and Certification' ? (
													<tr>
														<td className="item-title pb-0 pl-0">Degree</td>
														<td className="item-degree pb-0 item-value">
															{e.degree}
														</td>
													</tr>
												) : null}
												{e.choices !== 'License and Certification' ? (
													<tr>
														<td className="item-title pb-0 pl-0">School</td>
														<td className="item-school pb-0 item-value">
															{e.school}
														</td>
													</tr>
												) : null}
												{e.choices !== 'High School' &&
												e.choices !== 'License and Certification' ? (
													<tr>
														<td className="item-title pb-0 pl-0">Course</td>
														<td className="item-course pb-0 item-value">
															{e.course}
														</td>
													</tr>
												) : null}
												{e.choices !== 'License and Certification' ? (
													<tr>
														<td className="item-title pb-0 pl-0">
															Started - Graduated
														</td>
														<td className="item-month-year pb-0 item-value">
															{e.monthYearStarted} - {e.monthYearGraduated}
														</td>
													</tr>
												) : null}
											</tbody>
										</table>
									</div>
								))}
							</div>
							<hr className="line-break" />
						</div>
					</div>
					<div className="row pb-5">
						<div className="col-lg-3">
							<p className="item-title color-2">Recruiter's Comments</p>
						</div>
						<div className="col-lg-9">
							<div className="pb-5 recruitments-comment">
								<textarea
									name="recruitmentsComment"
									className="form-control input"
									value={recruitmentsComment}
									onChange={onChange}
									cols="30"
									rows="12"
								></textarea>
							</div>
							<div className="text-right">
								<button
									className="btn btn-primary button"
									onClick={onAddRecruitersComment}
								>
									Save
								</button>
							</div>
							<hr className="line-break" />
						</div>
					</div>
					<div className="row pb-5">
						<div className="col-lg-3">
							<p className="item-title color-2">Work from Home Capabilites</p>
						</div>
						<div className="col-lg-9">
							<table className="table table-borderless workspace-item">
								<tbody>
									<tr>
										<th scope="row" className="pt-0 item-title">
											Internet Type
										</th>
										<td id="internetType" className="pt-0 item-value">
											{internetType}
										</td>
									</tr>
									<tr>
										<th scope="row" className="pt-0 item-title">
											Internet Speedtest Result
										</th>
										<td className="pt-0">
											<a
												href={internetResult}
												className="btn btn-primary view"
												target="_blank"
												rel="noopener noreferrer"
											>
												View
											</a>
										</td>
									</tr>
									{hardwareType !== '' ||
									brandName !== '' ||
									processor !== '' ||
									ram !== '' ||
									os !== '' ||
									storage !== '' ||
									graphicsCard !== '' ||
									videoCard !== '' ? (
										<Fragment>
											<tr>
												<th scope="row" className="pt-0 item-title">
													Hardware Type
												</th>
												<td id="hardwareType" className="pt-0 item-value">
													{hardwareType}
												</td>
											</tr>
											<tr>
												<th scope="row" className="pt-0 item-title">
													Brand Name
												</th>
												<td id="brandName" className="pt-0 item-value">
													{brandName}
												</td>
											</tr>
											<tr>
												<th scope="row" className="pt-0 item-title">
													Operating System
												</th>
												<td className="pt-0 item-value">{os}</td>
											</tr>
											<tr>
												<th scope="row" className="pt-0 item-title">
													Processor
												</th>
												<td className="pt-0 item-value">{processor}</td>
											</tr>
											<tr>
												<th scope="row" className="pt-0 item-title">
													RAM
												</th>
												<td className="pt-0 item-value">{ram}</td>
											</tr>
											<tr>
												<th scope="row" className="pt-0 item-title">
													Storage
												</th>
												<td className="pt-0 item-value">{storage}</td>
											</tr>
											<tr>
												<th scope="row" className="pt-0 item-title">
													Graphics Card
												</th>
												<td className="pt-0 item-value">{graphicsCard}</td>
											</tr>
											<tr>
												<th scope="row" className="pt-0 item-title">
													Video Card
												</th>
												<td className="pt-0 item-value">{videoCard}</td>
											</tr>
										</Fragment>
									) : null}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

ViewResume.propTypes = {
	candidateState: PropTypes.object.isRequired,
	clearResume: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	addRecruitersComment: PropTypes.func.isRequired,
	updateResume: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	candidateState: state.candidateState,
});

export default connect(mapStateToProps, {
	clearResume,
	setAlert,
	addRecruitersComment,
	updateResume,
})(ViewResume);
