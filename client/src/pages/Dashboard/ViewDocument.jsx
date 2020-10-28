import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const ViewDocument = ({ viewDocument, isHide }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
		isHide();
	};
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (viewDocument.show) {
			handleShow();
		}
	}, [viewDocument]);

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
			size="xl"
		>
			<Modal.Header closeButton>
				<Modal.Title>{viewDocument.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body className="text-center">
				{/* <img
					src={`/uploads/${viewDocument.file}`}
					alt=''
					className='img-fluid'
				/> */}
				<iframe src={`/uploads/${viewDocument.file}`} frameborder="0"></iframe>
			</Modal.Body>
		</Modal>
	);
};

export default ViewDocument;
