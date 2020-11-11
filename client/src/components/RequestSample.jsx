import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { setAlert } from '../state/actions/alertAction';
import {
	requestSampleSubmit,
	requestSampleDefault,
} from '../state/actions/requestSampleAction';

// Components
import PreLoader from './../layouts/PreLoader';

const RequestSample = ({
	requestSampleState: {
		success: requestSampleSuccess,
		error: requestSampleError,
		loading: requestSampleLoading,
	},
	isShow,
	isHide,
	setAlert,
	requestSampleSubmit,
	requestSampleDefault,
}) => {
	const initialInfo = {
		fullName: '',
		businessEmail: '',
		mobileNumber: '',
		companyName: '',
		website: '',
		country: '',
	};
	const [show, setShow] = useState(false);
	const [info, setInfo] = useState(initialInfo);
	const {
		fullName,
		businessEmail,
		mobileNumber,
		companyName,
		website,
		country,
	} = info;
	const handleClose = () => {
		setShow(false);
		isHide();
	};
	const handleShow = () => setShow(true);
	const onChange = (e) => {
		const { name, value } = e.target;
		setInfo({ ...info, [name]: value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		if (
			fullName === '' ||
			businessEmail === '' ||
			mobileNumber === '' ||
			companyName === '' ||
			website === '' ||
			country === ''
		) {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		}
		requestSampleSubmit({
			fullName,
			businessEmail,
			mobileNumber,
			companyName,
			website,
			country,
		});
		setInfo(initialInfo);
	};
	useEffect(() => {
		if (isShow) {
			handleShow();
		}
		if (requestSampleSuccess) {
			setAlert('/', 'Please check your email for sample projects and price');
			requestSampleDefault();
			handleClose();
		}
		if (requestSampleError) {
			setAlert('', requestSampleError.msg);
			requestSampleDefault();
		}
	}, [isShow, requestSampleSuccess, requestSampleError, requestSampleLoading]);
	return (
		<Modal show={show} onHide={handleClose}>
			{requestSampleLoading ? (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						height: '100vh',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
						zIndex: 1031,
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
						}}
					>
						<PreLoader />
					</div>
				</div>
			) : null}
			<Form onSubmit={onSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Request sample projects and price</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="fullNameInput">
						<Form.Control
							type="text"
							placeholder="Full Name*"
							required
							onChange={onChange}
							name="fullName"
							value={fullName}
						/>
					</Form.Group>
					<Form.Group controlId="businessEmailInput">
						<Form.Control
							type="email"
							placeholder="Business Email*"
							required
							onChange={onChange}
							name="businessEmail"
							value={businessEmail}
						/>
					</Form.Group>
					<Form.Group controlId="mobileNumberInput">
						<Form.Control
							type="number"
							placeholder="Mobile Number*"
							required
							onChange={onChange}
							name="mobileNumber"
							value={mobileNumber}
						/>
					</Form.Group>
					<Form.Group controlId="companyNameInput">
						<Form.Control
							type="text"
							placeholder="Company Name*"
							required
							onChange={onChange}
							name="companyName"
							value={companyName}
						/>
					</Form.Group>
					<Form.Group controlId="websiteInput">
						<Form.Control
							type="text"
							placeholder="Website*"
							required
							onChange={onChange}
							name="website"
							value={website}
						/>
					</Form.Group>
					<Form.Group controlId="countryInput">
						<Form.Control
							type="text"
							placeholder="Country*"
							required
							onChange={onChange}
							name="country"
							value={country}
						/>
					</Form.Group>
					<Form.Group className="mb-0">
						<Form.Text className="text-muted">
							We may communicate with you about the information you’re
							downloading and other Draftsource services. The use of your
							information is governed by Draftsource’s Privacy Policy.
						</Form.Text>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer className="justify-content-start">
					<Button variant="primary" className="button px-5" type="submit">
						Request
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

RequestSample.propTypes = {
	requestSampleState: PropTypes.object.isRequired,
	setAlert: PropTypes.func.isRequired,
	requestSampleSubmit: PropTypes.func.isRequired,
	requestSampleDefault: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	requestSampleState: state.requestSampleState,
});

export default connect(mapStateToProps, {
	setAlert,
	requestSampleSubmit,
	requestSampleDefault,
})(RequestSample);
