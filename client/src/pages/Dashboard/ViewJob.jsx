import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import moment from 'moment';

// Actions
import { clearDetails } from './../../state/actions/jobAction';

// Components
import ModalActionJob from './ModalActionJob';

const ViewJob = ({ menu, jobState: { details }, clearDetails, loadJob }) => {
	const initialData = {
		title: '',
		specialty: [],
		software: [],
		marketType: [],
		description: '',
		about: '',
		budget: {
			min: '',
			max: '',
		},
		workDuration: '',
		timeZone: '',
		firstName: '',
		lastName: '',
		email: '',
		company: '',
		website: '',
		cellphone: '',
		country: '',
		linkedIn: '',
		agentName: '',
		status: '',
		dateCreated: '',
		menu: '',
	};
	const [data, setData] = useState(initialData);
	const [show, setShow] = useState(false);
	const [action, setAction] = useState(null);
	const [showModalAction, setShowModalAction] = useState(false);
	const [msg, setMsg] = useState('');
	const {
		title,
		specialty,
		software,
		marketType,
		description,
		about,
		budget,
		workDuration,
		timeZone,
		firstName,
		lastName,
		email,
		company,
		website,
		cellphone,
		country,
		linkedIn,
		agentName,
		status,
		dateCreated,
	} = data;
	const approveJob = () => {
		setAction('approve');
		setShowModalAction(true);
		setMsg(
			'<h2 className="title">Approve Job?</h2><p>This resume will add to your approved resume tab.</p>'
		);
	};

	const rejectJob = () => {
		setAction('reject');
		setShowModalAction(true);
		setMsg(
			'<h2 className="title">Reject Job?</h2><p>This resume will go to your reject resume tab. You can go back and review it again and decide to reapprove or delete this application.</p>'
		);
	};

	const deleteJob = () => {
		setAction('delete');
		setShowModalAction(true);
		setMsg(
			'<h2 className="title">Delete Job?</h2><p>This resume will remove from the system and data of draftsource.</p>'
		);
	};

	const reapproveJob = () => {
		setAction('reapprove');
		setShowModalAction(true);
		setMsg(
			'<h2 className="title">Reapprove Job?</h2><p>This resume will go to your approve resume tab. You can reject this resume later on if you wanted.</p>'
		);
	};
	const actionButton = () => {
		if (status === 'Pending') {
			return (
				<>
					<button className="btn btn-primary button" onClick={approveJob}>
						Approve
					</button>
					<button
						className="btn btn-primary button button1"
						onClick={rejectJob}
					>
						Reject
					</button>
				</>
			);
		} else if (status === 'Approve') {
			return (
				<button className="btn btn-primary button button" onClick={rejectJob}>
					Reject
				</button>
			);
		} else if (status === 'Reject') {
			return (
				<>
					<button className="btn btn-primary button" onClick={reapproveJob}>
						Reapprove
					</button>
					<button
						className="btn btn-primary button button1"
						onClick={deleteJob}
					>
						Delete
					</button>
				</>
			);
		}
	};
	const handleClose = () => {
		setShow(false);
		clearDetails();
	};
	const handleShow = () => setShow(true);
	useEffect(() => {
		if (details) {
			setData({ ...data, ...details, menu });
			handleShow();
		}
	}, [details]);
	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			size="xl"
			id="seeJob"
		>
			<Modal.Body>
				<ModalActionJob
					isShow={showModalAction}
					load={data}
					msg={msg}
					action={action}
					isHide={() => {
						setShowModalAction(false);
						handleClose();
						loadJob();
					}}
				/>
				<button className="close" onClick={handleClose}>
					<span aria-hidden="true">×</span>
					<span className="sr-only">Close</span>
				</button>
				<div className="container-fluid">
					<div className="row pb-3">
						<div className="col-lg-9">
							<div className="mb-3">
								<h3 className="title">{title}</h3>
								<p className="company">{company}</p>
							</div>
							<div className="d-flex justify-content-between mb-3">
								<div>
									<p className="item-title color-2 mb-0">Country</p>
									<p className="country">{country}</p>
								</div>
								<div>
									<p className="item-title color-2 mb-0">Budget</p>
									<p className="budget">
										{budget.min} to {budget.max}/hrs
									</p>
								</div>
								<div>
									<p className="item-title color-2 mb-0">Date Submitted</p>
									<p className="date">
										{moment(dateCreated).format('MM-DD-YYYY')}
									</p>
								</div>
								<div>
									<p className="item-title color-2 mb-0">Time Submitted</p>
									<p className="date">{moment(dateCreated).format('h:mm a')}</p>
								</div>
							</div>
							<div className="line-break" />
							<div className="my-3">
								<p className="item-title color-1 mb-1">Personal Information</p>
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
													<th className="pt-0 pl-0 item-title">
														Work Duration
													</th>
													<td className="pt-0 pl-0 item-value">
														{workDuration}
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<div className="col-lg-6">
										<table className="table table-borderless personal-info">
											<tbody>
												<tr>
													<th className="pt-0 pl-0 item-title">Agent's Name</th>
													<td className="pt-0 pl-0 item-value">{agentName}</td>
												</tr>
												<tr>
													<th className="pt-0 pl-0 item-title">Time Zone</th>
													<td className="pt-0 pl-0 item-value">{timeZone}</td>
												</tr>
												<tr>
													<th className="pt-0 pl-0 item-title">Website</th>
													<td className="pt-0 pl-0 item-value">
														<a
															href={website}
															target="_blank"
															className="btn btn-primary view"
															rel="noopener noreferrer"
														>
															View
														</a>
													</td>
												</tr>
												<tr>
													<th className="pt-0 pl-0 item-title">
														LinkedIn Link
													</th>
													<td className="pt-0 pl-0 item-value">
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
											</tbody>
										</table>
									</div>
								</div>
							</div>
							<div className="line-break" />
							<div className="my-3">
								<p className="item-title color-1 mb-1">Skills & Specialties</p>
								<p className="specialty-software mb-0">
									{specialty.map((e, i) => (
										<span className="specialty-software-item" key={i}>
											{e}
										</span>
									))}
								</p>
							</div>
							<div className="line-break" />
							<div className="my-3">
								<p className="item-title color-1 mb-1">Software Use</p>
								<p className="specialty-software mb-0">
									{software.map((e, i) => (
										<span className="specialty-software-item" key={i}>
											{e}
										</span>
									))}
								</p>
							</div>
							<div className="line-break" />
							<div className="my-3">
								<p className="item-title color-1 mb-1">Market type</p>
								<p className="specialty-software mb-0">
									{marketType.map((e, i) => (
										<span className="specialty-software-item" key={i}>
											{e}
										</span>
									))}
								</p>
							</div>
							<div className="line-break" />
						</div>
						<div className="col-lg-3">{actionButton()}</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<p className="item-title color-1 mb-1">Job Description</p>
							<p className="description">{description}</p>
						</div>
						<div className="col-lg-12">
							<p className="item-title color-1 mb-1">About the company</p>
							<p className="about">{about}</p>
						</div>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

ViewJob.propTypes = {
	jobState: PropTypes.object.isRequired,
	clearDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	jobState: state.jobState,
});

export default connect(mapStateToProps, { clearDetails })(ViewJob);
