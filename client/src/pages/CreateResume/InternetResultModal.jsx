import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';

// Images
import image from '../../images/speedtest_sample.jpg';

const InternetResultModal = ({ isShow, isHide, uploadModal }) => {
    const [show, setShow] = useState(false);
    const [upload, setUpload] = useState(null);

    const handleClose = useCallback(() => {
        isHide();
        setShow(false);
    }, [isHide]);

    const handleShow = () => setShow(true);

    const onUpload = (e) => {
        setUpload(e.target.files[0]);
    };

    useEffect(() => {
        if (isShow) {
            handleShow();
        }

        if (upload !== null) {
            uploadModal('internetResult', upload);
            handleClose();
        }
    }, [handleClose, isShow, upload, uploadModal]);
    return (
        <Modal
            className="step-3-upload-modal"
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Speedtest Screenshot Guideline</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="desc">
                    Screenshot your whole laptop / desktop monitor of your
                    minimized Speedtest browser window on a top of the Work from
                    Home Capabilities page. See example below
                </p>
                <img src={image} className="img-fluid" alt="Sample Upload" />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    onClick={handleClose}
                    className="button cancel"
                >
                    Cancel
                </Button>
                <label
                    className="btn btn-primary button upload"
                    htmlFor="uploadInput"
                >
                    Upload
                </label>
                <input
                    type="file"
                    accept="image/*"
                    name="upload"
                    id="uploadInput"
                    className="form-control-file"
                    onChange={onUpload}
                />
            </Modal.Footer>
        </Modal>
    );
};

export default InternetResultModal;
