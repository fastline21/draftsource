import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';
import { useHistory } from 'react-router-dom';

import { removeAlert } from './../state/actions/alertAction';

const Alert = ({ removeAlert, alert: { msg, redirect } }) => {
    const history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => {
        removeAlert();
        setShow(false);
        if (redirect !== '') {
            history.push(redirect);
        }
    };
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (msg !== '') {
            handleShow();
        }
    }, [msg]);
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
                    className="btn btn-primary btn-block button"
                    onClick={handleClose}
                >
                    OK
                </button>
            </Modal.Footer>
        </Modal>
    );
};

Alert.propTypes = {
    removeAlert: PropTypes.func.isRequired,
    alert: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    alert: state.alertState,
});

export default connect(mapStateToProps, { removeAlert })(Alert);
