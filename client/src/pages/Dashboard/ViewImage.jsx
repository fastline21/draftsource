import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const ViewImage = ({ viewImage, isHide }) => {
	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
		isHide();
	};
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (viewImage.show) {
			handleShow();
		}
	}, [viewImage]);

	return (
		<Modal
			show={show}
			onHide={handleClose}
			backdrop='static'
			keyboard={false}
			size='xl'
		>
			<Modal.Header closeButton>
				<Modal.Title>{viewImage.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body className='text-center'>
				<img
					src={`/uploads/${viewImage.file}`}
					alt=''
					className='img-fluid'
				/>
			</Modal.Body>
		</Modal>
	);
};

export default ViewImage;
