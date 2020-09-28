import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { setAlert } from './../../state/actions/alertAction';

// Components
import ModalAction from './ModalAction';

const ViewDetails = ({ isShow, isHide, loadJob, jobState: { details } }) => {
    const [show, setShow] = useState(false);
    const [showModalAction, setShowModalAction] = useState(false);
    const [action, setAction] = useState('');
    const [msg, setMsg] = useState('');
    const initialData = {
        _id: '',
        country: '',
        title: '',
        company: '',
        expectedSalary: '',
        availability: '',
        specialty: '',
        software: '',
        about: '',
        roles: '',
        keyResponsibilities: '',
        responsibilities: '',
        remoteStaffExpectation: '',
    };

    const handleClose = () => {
        setData(initialData);
        setShow(false);
        isHide(true);
    };

    const handleShow = () => setShow(true);

    const viewImage = (file) => {};

    const {
        _id,
        country,
        title,
        company,
        expectedSalary,
        availability,
        specialty,
        software,
        about,
        roles,
        keyResponsibilities,
        responsibilities,
        remoteStaffExpectation,
    } = data;

    const approveJob = () => {
        setAction('approve');
        setShowModalAction(true);
        setMsg(
            '<h2 className="title">Approve Job?</h2><p>This job will add to your approved job tab.</p>'
        );
    };

    const rejectJob = () => {
        setAction('reject');
        setShowModalAction(true);
        setMsg(
            '<h2 className="title">Reject Job?</h2><p>This job will go to your reject job tab. You can go back and review it again and decide to reapprove or delete this application.</p>'
        );
    };

    const deleteJob = () => {
        setAction('delete');
        setShowModalAction(true);
        setMsg(
            '<h2 className="title">Delete Job?</h2><p>This job will remove from the system and data of draftsource.</p>'
        );
    };

    const reapproveJob = () => {
        setAction('reapprove');
        setShowModalAction(true);
        setMsg(
            '<h2 className="title">Reapprove Job?</h2><p>This job will go to your approve job tab. You can reject this job later on if you wanted.</p>'
        );
    };

    const actionButton = () => {
        let a = '';
        if (status === 'Pending') {
            a = (
                <>
                    <button
                        className="btn btn-primary button"
                        onClick={approveJob}
                    >
                        Approve
                    </button>
                    <button
                        className="btn btn-primary button button1"
                        onClick={rejectJob}
                    >
                        Reject
                    </button>
                </>
            );
        } else if (status === 'Approve') {
            a = (
                <button
                    className="btn btn-primary button button"
                    onClick={rejectJob}
                >
                    Reject
                </button>
            );
        } else if (status === 'Reject') {
            a = (
                <>
                    <button
                        className="btn btn-primary button"
                        onClick={reapproveJob}
                    >
                        Reapprove
                    </button>
                    <button
                        className="btn btn-primary button button1"
                        onClick={deleteJob}
                    >
                        Delete
                    </button>
                </>
            );
        }
        return a;
    };

    useEffect(() => {
        if (isShow) {
            handleShow();
        }

        if (resume !== null) {
            setData(resume);
        }
    }, [resume, isShow]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
            id="seeDetails"
        >
            <Modal.Body>
                <ModalAction
                    isShow={showModalAction}
                    id={_id}
                    msg={msg}
                    action={action}
                    isHide={() => {
                        handleClose();
                        loadJob();
                    }}
                    hideModal={() => setShowModalAction(false)}
                />
                <button className="close" onClick={handleClose}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
                <div className="container-fluid">
                    <div className="row pb-5">
                        <div className="col-lg-9">
                            <div className="mb-3">
                                <h3 className="title">{title}</h3>
                                <p>{company}</p>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <div>
                                    <p>{country}</p>
                                </div>
                                <div>
                                    <p>${expectedSalary}/hrs</p>
                                    <p>{availability}</p>
                                </div>
                            </div>
                            <div className="line-break" />
                            <div>
                                <p>Specialty</p>
                                <p>{specialty.join(', ')}</p>
                            </div>
                            <div className="line-break" />
                            <div>
                                <p>Software Use</p>
                                <p>{software.join(', ')}</p>
                            </div>
                            <div className="line-break" />
                        </div>
                        <div className="col-lg-3">{actionButton()}</div>
                        <div className="row">
                            <div className="col-lg-12">
                                <p>About this Job</p>
                                <p>Job Description</p>
                                <p>{about}</p>
                            </div>
                            <div className="col-lg-12">
                                <p>Roles</p>
                                <ul>
                                    {roles.map((e, i) => (
                                        <li key={i}>{e}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-12">
                                <p>Key Responsibilities</p>
                                <ul>
                                    {keyResponsibilities.map((e, i) => (
                                        <li key={i}>{e}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-12">
                                <p>Responsibilities</p>
                                <ul>
                                    {responsibilities.map((e, i) => (
                                        <li key={i}>{e}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-lg-12">
                                <p>Remote Staff Expectation</p>
                                <p>{remoteStaffExpectation}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

ViewDetails.propTypes = {
    setAlert: PropTypes.func.isRequired,
    jobState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    jobState: state.jobState,
});

export default connect(mapStateToProps, { setAlert })(ViewDetails);
