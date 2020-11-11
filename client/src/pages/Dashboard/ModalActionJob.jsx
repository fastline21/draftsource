import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

// Actions
import {
	approveJob,
	deleteJob,
	rejectJob,
} from '../../state/actions/jobAction';

const ModalActionJob = ({
	isShow,
	load,
	msg,
	action,
	approveJob,
	deleteJob,
	rejectJob,
	isHide,
}) => {
	// State
	const [show, setShow] = useState(false);

	const primaryAction = () => {
		if (action === 'approve') {
			return (
				<button
					className="btn btn-primary button approve"
					onClick={() => {
						handleClose();
						approveJob(load);
						isHide();
					}}
				>
					Approve
				</button>
			);
		} else if (action === 'reject') {
			return (
				<button
					className="btn btn-primary button reject"
					onClick={() => {
						handleClose();
						rejectJob(load);
						isHide();
					}}
				>
					Reject
				</button>
			);
		} else if (action === 'delete') {
			return (
				<button
					className="btn btn-primary button delete"
					onClick={() => {
						handleClose();
						deleteJob(load);
						isHide();
					}}
				>
					Delete
				</button>
			);
		} else if (action === 'reapprove') {
			return (
				<button
					className="btn btn-primary button delete"
					onClick={() => {
						handleClose();
						approveJob(load);
						isHide();
					}}
				>
					Reapprove
				</button>
			);
		} else if (action === 'delete') {
			return (
				<button
					className="btn btn-primary button delete"
					onClick={() => {
						handleClose();
						deleteJob(load._id);
						isHide();
					}}
				>
					Delete
				</button>
			);
		}
	};

	const handleClose = () => {
		setShow(false);
	};

	const handleShow = () => setShow(true);

	useEffect(() => {
		if (isShow) {
			handleShow();
		}
	}, [isShow]);

	return (
		<Modal
			className="alert-msg"
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Body>{renderHTML(msg)}</Modal.Body>
			<Modal.Footer>
				<button
					className="btn btn-primary button approve"
					onClick={() => {
						handleClose();
					}}
				>
					Cancel
				</button>
				{primaryAction()}
			</Modal.Footer>
		</Modal>
	);
};

ModalActionJob.propTypes = {
	approveJob: PropTypes.func.isRequired,
	deleteJob: PropTypes.func.isRequired,
	rejectJob: PropTypes.func.isRequired,
};

export default connect(null, {
	approveJob,
	deleteJob,
	rejectJob,
})(ModalActionJob);
