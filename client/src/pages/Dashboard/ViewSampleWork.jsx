import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'react-bootstrap';

const ViewSampleWork = ({ isShow, isHide, viewSampleWork }) => {
	const [show, setShow] = useState(false);

	const handleClose = useCallback(() => {
		isHide();
		setShow(false);
	}, [isHide]);
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (isShow) {
			handleShow();
		}

		// eslint-disable-next-line
	}, [isShow]);

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			size="xl"
		>
			<Modal.Header closeButton />
			<Modal.Body className="text-center">
				<img
					src={`/uploads/${viewSampleWork.file}`}
					className="img-fluid"
					alt=""
				/>
				<h4 className="title text-center">{viewSampleWork.title}</h4>
			</Modal.Body>
		</Modal>
	);
};

export default ViewSampleWork;
