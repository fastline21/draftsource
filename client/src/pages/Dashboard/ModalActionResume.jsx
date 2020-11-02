import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

// Actions
import {
	approveResume,
	deleteResume,
	rejectResume,
	hireResume,
} from '../../state/actions/candidateAction';

const ModalActionResume = ({
	isShow,
	load,
	msg,
	action,
	approveResume,
	deleteResume,
	rejectResume,
	hireResume,
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
						approveResume(load);
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
						rejectResume(load);
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
						deleteResume(load._id);
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
						approveResume(load);
						isHide();
					}}
				>
					Reapprove
				</button>
			);
		} else if (action === 'hire') {
			return (
				<button
					className="btn btn-primary button delete"
					onClick={() => {
						handleClose();
						hireResume(load);
						isHide();
					}}
				>
					Hire
				</button>
			);
		} else if (action === 'delete') {
			return (
				<button
					className="btn btn-primary button delete"
					onClick={() => {
						handleClose();
						deleteResume(load._id);
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

ModalActionResume.propTypes = {
	approveResume: PropTypes.func.isRequired,
	deleteResume: PropTypes.func.isRequired,
	rejectResume: PropTypes.func.isRequired,
	hireResume: PropTypes.func.isRequired,
};

export default connect(null, {
	approveResume,
	deleteResume,
	rejectResume,
	hireResume,
})(ModalActionResume);
