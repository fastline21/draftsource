import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

// Actions
import {
    approveResume,
    deleteResume,
    rejectResume,
} from '../../state/actions/candidateAction';

const ModalActionResume = ({
    isShow,
    id,
    msg,
    rate,
    salary,
    comments,
    approveResume,
    isHide,
    hideModal,
    deleteResume,
    rejectResume,
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
                        approveResume({ id, rate, salary, comments });
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
                        rejectResume({ id, rate, salary, comments });
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
                        deleteResume(id);
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
                        approveResume({ id, rate, salary, comments });
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
                        deleteResume(id);
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

ModalActionResume.propTypes = {
    approveResume: PropTypes.func.isRequired,
    deleteResume: PropTypes.func.isRequired,
    rejectResume: PropTypes.func.isRequired,
};

export default connect(null, {
    approveResume,
    deleteResume,
    rejectResume,
})(ModalActionResume);
