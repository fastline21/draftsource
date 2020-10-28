import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BookInterviewModal = ({ isShow, isHide, agree }) => {
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
	}, [isShow]);

	return (
		<Modal
			className="alert-msg"
			show={show}
			onHide={handleClose}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Body style={{ color: '#000' }}>
				To book an interview you must agree to our{' '}
				<Link
					to="/terms-service"
					style={{ textDecoration: 'underline', color: '#000' }}
				>
					terms of service
				</Link>{' '}
				and{' '}
				<Link
					to="/privacy-policy"
					style={{ textDecoration: 'underline', color: '#000' }}
				>
					privacy policy
				</Link>
			</Modal.Body>
			<Modal.Footer style={{ width: 'auto' }}>
				<button
					className="btn btn-primary button"
					style={{ backgroundColor: '#298494', borderColor: '#298494' }}
					onClick={() => {
						handleClose();
						agree();
					}}
				>
					Yes, I agree
				</button>
				<button
					className="btn btn-primary button"
					style={{
						backgroundColor: '#fff',
						color: '#298494',
						borderColor: '#298494',
					}}
					onClick={handleClose}
				>
					No, I disagree
				</button>
			</Modal.Footer>
		</Modal>
	);
};

export default BookInterviewModal;
