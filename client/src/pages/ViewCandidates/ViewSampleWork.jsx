import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import Cropper from 'react-easy-crop';

// Actions
import { setAlert } from './../../state/actions/alertAction';

const ViewSampleWork = ({ isShow, isHide, viewSampleWork }) => {
    // State
    const [show, setShow] = useState(false);

    // Close Modal
    const handleClose = useCallback(() => {
        isHide();
        setShow(false);
    }, [isHide]);

    // Show Modal
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (isShow) {
            handleShow();
        }
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
            <Modal.Body>
                <img
                    src={`/uploads/${viewSampleWork.file}`}
                    className="img-fluid"
                />
                <h4 className="title text-center">{viewSampleWork.title}</h4>
            </Modal.Body>
        </Modal>
    );
};

export default ViewSampleWork;
