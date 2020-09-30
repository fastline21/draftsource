import React, { useState, useEffect, useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';

// Actions
import { setAlert } from './../../state/actions/alertAction';

const ViewSampleWorkDocument = ({
    isShow,
    isHide,
    title,
    file,
    desc,
    titleModal,
}) => {
    // State
    const [show, setShow] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [fileDisplay, setFileDisplay] = useState('');

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
            setFileDisplay(`/uploads/${file}`);
        }
    }, [isShow]);

    return (
        <Modal
            id="uploadWorkImageModal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{titleModal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-7">
                            {file !== '' && <iframe src={fileDisplay} />}
                        </div>
                        <div className="col-lg-5">
                            <h3>Project Title</h3>
                            <p>{title}</p>
                            <h3>Description</h3>
                            <p style={{ wordWrap: 'pre' }}>{desc}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

ViewSampleWorkDocument.propTypes = {
    setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(ViewSampleWorkDocument);
