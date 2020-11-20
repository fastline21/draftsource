import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Carousel } from 'react-bootstrap';

const ViewSampleWork = ({ isShow, isHide, viewSampleWork }) => {
	// State in View Sample Work
	const [show, setShow] = useState(false);
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	// Close modal
	const handleClose = useCallback(() => {
		isHide();
		setShow(false);
	}, [isHide]);

	// Show modal
	const handleShow = () => setShow(true);

	useEffect(() => {
		if (isShow) {
			handleShow();
			setIndex(viewSampleWork.current);
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
			id="viewSampleWork"
		>
			<Modal.Header closeButton>
				<Modal.Title>
					{viewSampleWork.data[index] !== undefined &&
						viewSampleWork.data[index].title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="text-center">
				{viewSampleWork.data.length > 0 && (
					<Carousel
						activeIndex={index}
						onSelect={handleSelect}
						indicators={false}
						interval={null}
						fade={true}
						nextIcon={<i className="fas fa-caret-right" aria-hidden="true"></i>}
						prevIcon={<i className="fas fa-caret-left" aria-hidden="true"></i>}
					>
						{viewSampleWork.data.map((e, i) => (
							<Carousel.Item key={i}>
								{e.type === 'image' ? (
									<img
										src={`/uploads/${e.file}`}
										className="img-fluid"
										alt=""
									/>
								) : (
									<embed
										src={`/uploads/${e.file}`}
										type="application/pdf"
										height="600px"
										width="100%"
									/>
								)}
							</Carousel.Item>
						))}
					</Carousel>
				)}
			</Modal.Body>
		</Modal>
	);
};

export default ViewSampleWork;
