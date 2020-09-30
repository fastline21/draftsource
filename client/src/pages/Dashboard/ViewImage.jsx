import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const ViewImage = ({ isShow, isHide, image, title }) => {
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
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={`/uploads/${image}`} alt="" className="img-fluid" />
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
};

export default ViewImage;
