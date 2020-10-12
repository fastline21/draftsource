import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const SignupModal = ({ isShow, isHide }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
		isHide();
	};
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (isShow) {
			handleShow();
		}
	});

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Modal heading</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="form-group">
					<div className="form-check">
						<input
							type="radio"
							name="signupOption"
							id="signupOption1"
							className="form-check-input"
						/>
						<label htmlFor="signupOption1"></label>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleClose}>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default SignupModal;
