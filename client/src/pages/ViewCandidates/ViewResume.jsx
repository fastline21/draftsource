import React, { useState, useEffect, useRef } from 'react';
import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useHistory } from 'react-router-dom';

// Actions
import {
	clearResume,
	removeCandidate,
	addCandidate,
} from './../../state/actions/candidateAction';
import { setAlert } from './../../state/actions/alertAction';

// Components
import ViewImage from './ViewImage';
import ViewSampleWork from './ViewSampleWork';

const ViewResume = ({
	isShow,
	loadCandidate,
	candidateState: { resume, shortlist },
	clearResume,
	setAlert,
	removeCandidate,
	addCandidate,
}) => {
	const queryParams = new URLSearchParams(window.location.search);
	const newUrl = new URL(window.location.href);
	const history = useHistory();
	const [showGenInfo, setShowGenInfo] = useState(false);
	const targetGenInfo = useRef(null);

	// Initial
	const initialData = {
		_id: '',
		resumeImage: '',
		aboutYourself: '',
		idCode: '',
		firstName: '',
		lastName: '',
		city: '',
		headline: '',
		age: '',
		gender: '',
		status: '',
		rating: '',
		availability: '',
		expectedSalary: '',
		currency: '',
		specialty: [],
		software: [],
		uploadWork: { images: [] },
		workHistory: [],
		education: [],
		recruitmentsComment: '',
		workspace: '',
		internetType: '',
		hardwareType: '',
		brandName: '',
		internetResult: '',
		processort: '',
		ram: '',
		countryExperience: '',
		marketType: [],
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
	const [msg, setMsg] = useState('');
	const [viewImage, setViewImage] = useState(initialViewImage);
	const [viewSampleWork, setViewSampleWork] = useState(initialViewSampleWork);

	const {
		_id,
		idCode,
		resumeImage,
		aboutYourself,
		firstName,
		lastName,
		city,
		gender,
		headline,
		age,
		status,
		rating,
		availability,
		expectedSalary,
		currency,
		specialty,
		software,
		uploadWork,
		workHistory,
		education,
		recruitmentsComment,
		internetType,
		hardwareType,
		brandName,
		process,
		ram,
		internetResult,
		countryExperience,
		marketType,
	} = data;

	const removeShortlist = (id) => {
		removeCandidate(id);

		if (history.location.pathname.includes('shortlisted-candidates')) {
			handleClose();
			const oldQuery = queryParams.get('candidates');
			let newQuery = '';
			newQuery = oldQuery.split(',');
			newQuery = newQuery.filter((e) => e !== id);
			if (newQuery.length === 0) {
				newUrl.searchParams.delete('candidates');
			} else {
				newUrl.searchParams.set('candidates', newQuery);
			}

			history.push({
				pathname: newUrl.pathname,
				search: newUrl.search,
			});
		}
	};

	const handleClose = () => {
		setShow(false);
		clearResume();
	};

	const handleShow = () => setShow(true);

	useEffect(() => {
		if (isShow) {
			handleShow();
			setData(resume);
		}
	}, [isShow]);

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
									<p className="data-title mb-0" style={{ fontWeight: '700' }}>
										ID: {idCode.toString().padStart(6, '0')}
									</p>
								</div>
								<div>
									{/* <p className="data-title mb-0" style={{ fontWeight: '700' }}>
										Headline
									</p> */}
									<p className="availability" style={{ color: '#000000' }}>
										{headline}
									</p>
								</div>
								{/* <div>
									<p className="data-title mb-0" style={{ fontWeight: '700' }}>
										English Level
									</p>
									<p className="availability">{rating}</p>
									<div className="rating d-inline">
										<i
											style={{ cursor: 'default' }}
											className={`rating-color fas fa-star${
												rating >= 1 ? ' checked' : ''
											}`}
										></i>
										<i
											style={{ cursor: 'default' }}
											className={`rating-color fas fa-star${
												rating >= 2 ? ' checked' : ''
											}`}
										></i>
										<i
											style={{ cursor: 'default' }}
											className={`rating-color fas fa-star${
												rating >= 3 ? ' checked' : ''
											}`}
										></i>
										<i
											style={{ cursor: 'default' }}
											className={`rating-color fas fa-star${
												rating >= 4 ? ' checked' : ''
											}`}
										></i>
										<i
											style={{ cursor: 'default' }}
											className={`rating-color fas fa-star${
												rating === 5 ? ' checked' : ''
											}`}
										></i>
									</div>
								</div> */}
							</div>
						</div>
						<div className="col-lg-3">
							<button
								className={`btn btn-primary button${
									shortlist.includes(_id)
										? ' remove-shortlist'
										: ' add-shortlist'
								}`}
								onClick={() =>
									shortlist.includes(_id)
										? removeShortlist(_id)
										: addCandidate(_id)
								}
							>
								{shortlist.includes(_id)
									? 'Remove from Shortlist'
									: 'Add to Shortlist'}
							</button>
							<button
								onClick={() => {
									history.push(
										`/view-candidates/shortlisted-candidates${
											shortlist.length > 0
												? `?candidates=${shortlist.join(',')}`
												: ''
										}`
									);
									handleClose();
								}}
								className="btn btn-primary button shortlist-candidates"
							>
								Shortlist Candidates
							</button>
						</div>
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
												<th className="pt-0 pl-0 item-title">General Info</th>
												<td className="pt-0 item-value">
													Verified{' '}
													<OverlayTrigger
														key="right"
														placement="right"
														overlay={
															<Tooltip>
																<p className="text-left mb-0">
																	Government ID, Email, Cellphone, and Social
																	Media Verified
																</p>
															</Tooltip>
														}
													>
														<i
															className="fas fa-question-circle"
															style={{ color: '#298494' }}
														></i>
													</OverlayTrigger>
												</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">English Level</th>
												<td className="pt-0 item-value">{rating}</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">Age</th>
												<td className="pt-0 item-value">{age}</td>
											</tr>
											<tr>
												<th className="pt-0 pl-0 item-title">Gender</th>
												<td className="pt-0 item-value">{gender}</td>
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
						<div className="col-lg-8">
							<p id="specialty" className="specialty-software mb-0">
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
							<p className="item-title color-1 mb-0">Software Use</p>
						</div>
						<div className="col-lg-8">
							<p id="specialty" className="specialty-software mb-0">
								{software.map((e, i) => (
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
							<p className="item-title color-1 mb-0">Market type experience</p>
						</div>
						<div className="col-lg-8">
							<p id="specialty" className="specialty-software mb-0">
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
							<p className="item-title color-2">Sample Works</p>
						</div>
						<div className="col-lg-8">
							<div className="row pb-3 upload-work-images">
								{uploadWork.images.map((e, i) => (
									<div className="col-lg-4" key={i}>
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
												className="figure-img img-fluid shadow"
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
						<div className="col-lg-8">
							<div id="workHistory" className="work-history">
								{workHistory.map((e, i) => (
									<div className="work-history-item" key={i}>
										<p className="title">{e.title}</p>
										<p className="company">Employment Period</p>
										<p className="month-year">
											{e.monthStarted} {e.yearStarted} - {e.monthEnded}{' '}
											{e.yearEnded}
										</p>
										<p className="item-title">Job Description</p>
										<p className="description">{e.description}</p>
										<p className="title">About the company</p>
										<p className="item-title">Company Expertise</p>
										<p className="company-expertise">
											{e.companyExpertise.join(', ')}
										</p>
										<p className="item-title">Country</p>
										<p className="country">{e.country}</p>
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
						<div className="col-lg-8">
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
						<div className="col-lg-8">
							<p className="recruitments-comment pb-5">{recruitmentsComment}</p>
							<hr className="line-break" />
						</div>
					</div>
					<div className="row pb-5">
						<div className="col-lg-6 offset-lg-3 d-flex justify-content-between">
							<button
								className={`btn btn-primary button${
									shortlist.includes(_id)
										? ' remove-shortlist'
										: ' add-shortlist'
								}`}
								onClick={() =>
									shortlist.includes(_id)
										? removeShortlist(_id)
										: addCandidate(_id)
								}
							>
								{shortlist.includes(_id)
									? 'Remove from Shortlist'
									: 'Add to Shortlist'}
							</button>
							<button
								onClick={() => {
									history.push(
										`/view-candidates/shortlisted-candidates${
											shortlist.length > 0
												? `?candidates=${shortlist.join(',')}`
												: ''
										}`
									);
									handleClose();
								}}
								className="btn btn-primary button shortlist-candidates"
							>
								Shortlist Candidates
							</button>
						</div>
					</div>
					{/* <div className="row pb-5">
						<div className="col-lg-3">
							<p className="item-title color-2">Work from Home Capabilites</p>
						</div>
						<div className="col-lg-8">
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
											Internet Result
										</th>
										<td id="internetType" className="pt-0 item-value">
											<a
												href={internetResult}
												target="_blank"
												className="btn btn-primary view"
											>
												View
											</a>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div> */}
				</div>
			</Modal.Body>
		</Modal>
	);
};

ViewResume.propTypes = {
	candidateState: PropTypes.object.isRequired,
	clearResume: PropTypes.func.isRequired,
	isShow: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired,
	removeCandidate: PropTypes.func.isRequired,
	addCandidate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	candidateState: state.candidateState,
});

export default connect(mapStateToProps, {
	clearResume,
	setAlert,
	removeCandidate,
	addCandidate,
})(ViewResume);
