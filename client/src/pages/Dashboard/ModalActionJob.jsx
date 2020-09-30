import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

// Actions
import {
    approveJob,
    deleteJob,
    rejectJob,
} from '../../state/actions/jobAction';

const ModalActionJob = ({
    isShow,
    id,
    msg,
    approveJob,
    isHide,
    hideModal,
    deleteJob,
    rejectJob,
    action,
}) => {
    const [show, setShow] = useState(false);

    // Close alert modal
    const handleClose = () => {
        setShow(false);
    };

    // Show alert modal
    const handleShow = () => setShow(true);

    const primaryAction = () => {
        let p = '';
        if (action === 'approve') {
            p = (
                <button
                    className="btn btn-primary button approve"
                    onClick={() => {
                        handleClose();
                        approveJob({ id });
                        isHide();
                    }}
                >
                    Approve
                </button>
            );
        } else if (action === 'reject') {
            p = (
                <button
                    className="btn btn-primary button reject"
                    onClick={() => {
                        handleClose();
                        rejectJob({ id });
                        isHide();
                    }}
                >
                    Reject
                </button>
            );
        } else if (action === 'delete') {
            p = (
                <button
                    className="btn btn-primary button delete"
                    onClick={() => {
                        handleClose();
                        deleteJob(id);
                        isHide();
                    }}
                >
                    Delete
                </button>
            );
        } else if (action === 'reapprove') {
            p = (
                <button
                    className="btn btn-primary button delete"
                    onClick={() => {
                        handleClose();
                        approveJob({ id });
                        isHide();
                    }}
                >
                    Reapprove
                </button>
            );
        } else if (action === 'delete') {
            p = (
                <button
                    className="btn btn-primary button delete"
                    onClick={() => {
                        handleClose();
                        deleteJob(id);
                        isHide();
                    }}
                >
                    Delete
                </button>
            );
        }
        return p;
    };

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
            <Modal.Body>{renderHTML(msg)}</Modal.Body>
            <Modal.Footer>
                <button
                    className="btn btn-primary button approve"
                    onClick={() => {
                        handleClose();
                        hideModal();
                    }}
                >
                    Cancel
                </button>
                {primaryAction()}
            </Modal.Footer>
        </Modal>
    );
};

ModalActionJob.propTypes = {
    approveJob: PropTypes.func.isRequired,
    deleteJob: PropTypes.func.isRequired,
    rejectJob: PropTypes.func.isRequired,
};

export default connect(null, {
    approveJob,
    deleteJob,
    rejectJob,
})(ModalActionJob);
