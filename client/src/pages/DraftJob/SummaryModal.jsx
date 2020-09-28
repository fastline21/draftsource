import React, { useState, useEffect, Fragment, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { addJob } from './../../state/actions/jobAction';
import { setAlert } from './../../state/actions/alertAction';

// Components
import { availabilityList } from './../../list/Availability';

const SummaryModal = ({
    isShow,
    isHide,
    addJob,
    setAlert,
    jobState: { job },
    submit,
}) => {
    const initialInfo = {
        title: '',
        specialty: [],
        software: [],
        about: '',
        roles: [],
        keyResponsibilities: [],
        responsibilities: [],
        remoteStaffExpectation: '',
        availability: '',
        expectedSalary: '',
        currency: '',
    };

    const [show, setShow] = useState(false);
    const [showStep, setShowStep] = useState(0);
    const [specialtyVal, setSpecialtyVal] = useState('');
    const [info, setInfo] = useState(initialInfo);
    const [rolesInput, setRolesInput] = useState([]);
    const [keyResponsibilitiesInput, setKeyResponsibilitiesInput] = useState(
        []
    );
    const [responsibilitiesInput, setResponsibilitiesInput] = useState([]);

    const rolesRef = useRef(null);
    const keyResponsibilitiesRef = useRef(null);
    const responsibilitiesRef = useRef(null);

    const handleClose = () => {
        setShow(false);
        isHide();
    };
    const handleShow = () => setShow(true);

    const {
        title,
        specialty,
        software,
        about,
        roles,
        keyResponsibilities,
        responsibilities,
        remoteStaffExpectation,
        availability,
        expectedSalary,
        currency,
    } = job;

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            const { name } = e.target;
            if (name === 'roles') {
                const rolesVal = rolesRef.current.value;
                if (rolesVal === '') {
                    setAlert(
                        '',
                        'Please fill-in the required boxes to Proceed.'
                    );
                } else {
                    setRolesInput((rolesInput) => [...rolesInput, rolesVal]);
                    rolesRef.current.value = '';
                }
            } else if (name === 'keyResponsibilities') {
                const keyResponsibilitiesVal =
                    keyResponsibilitiesRef.current.value;
                if (keyResponsibilitiesVal === '') {
                    setAlert(
                        '',
                        'Please fill-in the required boxes to Proceed.'
                    );
                } else {
                    setKeyResponsibilitiesInput((keyResponsibilitiesInput) => [
                        ...keyResponsibilitiesInput,
                        keyResponsibilitiesVal,
                    ]);
                    keyResponsibilitiesRef.current.value = '';
                }
            } else if (name === 'responsibilities') {
                const responsibilitiesVal = responsibilitiesRef.current.value;
                if (responsibilitiesVal === '') {
                    setAlert(
                        '',
                        'Please fill-in the required boxes to Proceed.'
                    );
                } else {
                    setResponsibilitiesInput((responsibilitiesInput) => [
                        ...responsibilitiesInput,
                        responsibilitiesVal,
                    ]);
                    responsibilitiesRef.current.value = '';
                }
            }
            e.preventDefault();
        }
    };

    const itemClose = (field, index) => {
        if (field === 'roles') {
            setRolesInput((rolesInput) => [
                ...rolesInput.filter((x) => rolesInput.indexOf(x) !== index),
            ]);
        } else if (field === 'keyResponsibilities') {
            setKeyResponsibilitiesInput((keyResponsibilitiesInput) => [
                ...keyResponsibilitiesInput.filter(
                    (x) => keyResponsibilitiesInput.indexOf(x) !== index
                ),
            ]);
        } else if (field === 'responsibilities') {
            setResponsibilitiesInput((responsibilitiesInput) => [
                ...responsibilitiesInput.filter(
                    (x) => responsibilitiesInput.indexOf(x) !== index
                ),
            ]);
        }
    };

    const editClick = (step) => {
        setShowStep(step);
        setInfo({
            ...info,
            title,
            specialty,
            software,
            about,
            remoteStaffExpectation,
            availability,
            expectedSalary,
            currency,
        });
        setRolesInput(roles);
        setKeyResponsibilitiesInput(keyResponsibilities);
        setResponsibilitiesInput(responsibilities);
    };

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === 'specialty' || name === 'software') {
            setInfo({ ...info, [name]: value.split(', ') });
        } else {
            setInfo({ ...info, [name]: value });
        }
    };

    const updateClick = (step) => {
        addJob({
            ...info,
            roles: rolesInput,
            keyResponsibilities: keyResponsibilitiesInput,
            responsibilities: responsibilitiesInput,
        });
        setShowStep(0);
    };

    useEffect(() => {
        if (isShow) {
            handleShow();
        }

        // eslint-disable-next-line
    }, [isShow, job]);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="xl"
            className="preview-job"
        >
            <Modal.Header closeButton>
                <Modal.Title>Draft a Job Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5 line-break-v">
                            <div className="mb-3">
                                <div className="mb-4">
                                    <div className=" d-flex justify-content-between">
                                        <p
                                            className="subtitle"
                                            style={{ color: '#606060' }}
                                        >
                                            Step 1
                                        </p>
                                        {showStep === 1 ? (
                                            <a
                                                href="#"
                                                id="editStep1"
                                                className="edit-link"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    updateClick(1);
                                                }}
                                            >
                                                Save
                                            </a>
                                        ) : (
                                            <a
                                                href="#"
                                                id="editStep1"
                                                className="edit-link"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    editClick(1);
                                                }}
                                            >
                                                Edit
                                            </a>
                                        )}
                                    </div>
                                    <div className="line-break"></div>
                                </div>
                                <h6 className="title">Job Title</h6>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <p className="subtitle">Job Title</p>
                                    </div>
                                    <div className="col-lg-8">
                                        {showStep === 1 ? (
                                            <input
                                                type="text"
                                                name="title"
                                                className="form-control input mb-1"
                                                onChange={onChange}
                                                value={info.title}
                                            />
                                        ) : (
                                            <span className="item" name="title">
                                                {title}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <p className="subtitle">Specialty</p>
                                    </div>
                                    <div className="col-lg-8">
                                        {showStep === 1 ? (
                                            <input
                                                type="text"
                                                name="specialty"
                                                className="form-control input mb-1"
                                                onChange={onChange}
                                                value={info.specialty.join(
                                                    ', '
                                                )}
                                            />
                                        ) : (
                                            <span
                                                className="item"
                                                name="specialty"
                                            >
                                                {specialty.join(', ')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <p className="subtitle">Software Use</p>
                                    </div>
                                    <div className="col-lg-8">
                                        {showStep === 1 ? (
                                            <input
                                                type="text"
                                                name="software"
                                                className="form-control input mb-1"
                                                onChange={onChange}
                                                value={info.software.join(', ')}
                                            />
                                        ) : (
                                            <span
                                                className="item"
                                                name="software"
                                            >
                                                {software.join(', ')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="mb-4">
                                    <div className=" d-flex justify-content-between">
                                        <p
                                            className="subtitle"
                                            style={{ color: '#606060' }}
                                        >
                                            Step 3
                                        </p>
                                        {showStep === 3 ? (
                                            <a
                                                href="#"
                                                id="editStep3"
                                                className="edit-link"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    updateClick(3);
                                                }}
                                            >
                                                Save
                                            </a>
                                        ) : (
                                            <a
                                                href="#"
                                                id="editStep3"
                                                className="edit-link"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    editClick(3);
                                                }}
                                            >
                                                Edit
                                            </a>
                                        )}
                                    </div>
                                    <div className="line-break"></div>
                                </div>
                                <h6 className="title">
                                    Are you looking to hire?
                                </h6>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <p className="subtitle">
                                            Willing to work
                                        </p>
                                    </div>
                                    <div className="col-lg-8">
                                        {showStep === 3 ? (
                                            <select
                                                name="availability"
                                                className="form-control input mb-1"
                                                onChange={onChange}
                                                value={info.availability}
                                            >
                                                {availabilityList().map(
                                                    (e, i) => (
                                                        <option
                                                            value={e}
                                                            key={i}
                                                        >
                                                            {e}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        ) : (
                                            <span
                                                className="item"
                                                name="availability"
                                            >
                                                {availability}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <p className="subtitle">
                                            Expected Salary
                                        </p>
                                    </div>
                                    <div className="col-lg-8">
                                        {showStep === 3 ? (
                                            <div className="form-inline">
                                                <input
                                                    type="text"
                                                    name="expectedSalary"
                                                    className="form-control input mr-auto mb-1"
                                                    onChange={onChange}
                                                    value={info.expectedSalary}
                                                />
                                                <select
                                                    name="currency"
                                                    className="form-control input mb-1"
                                                    onChange={onChange}
                                                    value={info.currency}
                                                >
                                                    <option value="USD">
                                                        USD
                                                    </option>
                                                </select>
                                            </div>
                                        ) : (
                                            <Fragment>
                                                {' '}
                                                <span
                                                    className="item"
                                                    name="expectedSalary"
                                                >
                                                    {expectedSalary}
                                                </span>{' '}
                                                <span
                                                    className="item"
                                                    name="currency"
                                                >
                                                    {currency}
                                                </span>
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="pl-3 mb-4">
                                <div className="mb-5">
                                    <div className="mb-4">
                                        <div className=" d-flex justify-content-between">
                                            <p
                                                className="subtitle"
                                                style={{ color: '#606060' }}
                                            >
                                                Step 2
                                            </p>
                                            {showStep === 2 ? (
                                                <a
                                                    href="#"
                                                    id="editStep2"
                                                    className="edit-link"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        updateClick(2);
                                                    }}
                                                >
                                                    Save
                                                </a>
                                            ) : (
                                                <a
                                                    href="#"
                                                    id="editStep2"
                                                    className="edit-link"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        editClick(2);
                                                    }}
                                                >
                                                    Edit
                                                </a>
                                            )}
                                        </div>
                                        <div className="line-break"></div>
                                    </div>
                                    <h6 className="title">About the Job</h6>
                                    <div className="mb-3">
                                        <p className="subtitle">
                                            Job Description
                                        </p>
                                        {showStep === 2 ? (
                                            <textarea
                                                name="about"
                                                className="form-control input mb-1"
                                                onChange={onChange}
                                                rows="5"
                                                value={info.about}
                                            ></textarea>
                                        ) : (
                                            <span className="item" name="about">
                                                {about}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <p className="subtitle">Roles</p>
                                        {showStep === 2 ? (
                                            <Fragment>
                                                <div className="position-relative">
                                                    <input
                                                        type="text"
                                                        className="form-control input mb-1"
                                                        name="roles"
                                                        onKeyPress={onKeyPress}
                                                        ref={rolesRef}
                                                    />
                                                    <i className="fas fa-plus"></i>
                                                </div>
                                                <ul className="roles-list">
                                                    {rolesInput.length > 0 &&
                                                        rolesInput.map(
                                                            (e, i) => (
                                                                <li key={i}>
                                                                    <span className="roles-item">
                                                                        {e}
                                                                        <span
                                                                            className="roles-close"
                                                                            onClick={() =>
                                                                                itemClose(
                                                                                    'roles',
                                                                                    i
                                                                                )
                                                                            }
                                                                        >
                                                                            x
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </Fragment>
                                        ) : (
                                            <div className="item" name="roles">
                                                <ul className="list">
                                                    {roles.map((e, i) => (
                                                        <li key={i}>{e}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <p className="subtitle">
                                            Key Responsibilities
                                        </p>
                                        {showStep === 2 ? (
                                            <Fragment>
                                                <div className="position-relative">
                                                    <input
                                                        type="text"
                                                        className="form-control input mb-1"
                                                        name="keyResponsibilities"
                                                        onKeyPress={onKeyPress}
                                                        ref={
                                                            keyResponsibilitiesRef
                                                        }
                                                    />
                                                    <i className="fas fa-plus"></i>
                                                </div>
                                                <ul className="key-responsibilities-list">
                                                    {keyResponsibilitiesInput.length >
                                                        0 &&
                                                        keyResponsibilitiesInput.map(
                                                            (e, i) => (
                                                                <li key={i}>
                                                                    <span className="key-responsibilities-item">
                                                                        {e}
                                                                        <span
                                                                            className="key-responsibilities-close"
                                                                            onClick={() =>
                                                                                itemClose(
                                                                                    'keyResponsibilities',
                                                                                    i
                                                                                )
                                                                            }
                                                                        >
                                                                            x
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </Fragment>
                                        ) : (
                                            <div
                                                className="item"
                                                name="keyResponsibilities"
                                            >
                                                <ul className="list">
                                                    {keyResponsibilities.map(
                                                        (e, i) => (
                                                            <li key={i}>{e}</li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <p className="subtitle">
                                            Responsibilities
                                        </p>
                                        {showStep === 2 ? (
                                            <Fragment>
                                                <div className="position-relative">
                                                    <input
                                                        type="text"
                                                        className="form-control input mb-1"
                                                        name="responsibilities"
                                                        onKeyPress={onKeyPress}
                                                        ref={
                                                            responsibilitiesRef
                                                        }
                                                    />
                                                    <i className="fas fa-plus"></i>
                                                </div>
                                                <ul className="responsibilities-list">
                                                    {responsibilitiesInput.length >
                                                        0 &&
                                                        responsibilitiesInput.map(
                                                            (e, i) => (
                                                                <li key={i}>
                                                                    <span className="responsibilities-item">
                                                                        {e}
                                                                        <span
                                                                            className="responsibilities-close"
                                                                            onClick={() =>
                                                                                itemClose(
                                                                                    'responsibilities',
                                                                                    i
                                                                                )
                                                                            }
                                                                        >
                                                                            x
                                                                        </span>
                                                                    </span>
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            </Fragment>
                                        ) : (
                                            <div
                                                className="item"
                                                name="responsibilities"
                                            >
                                                <ul className="list">
                                                    {responsibilities.map(
                                                        (e, i) => (
                                                            <li key={i}>{e}</li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <p className="subtitle">
                                            Remote Staff Expectation
                                        </p>
                                        {showStep === 2 ? (
                                            <textarea
                                                name="remoteStaffExpectation"
                                                className="form-control input mb-1"
                                                onChange={onChange}
                                                rows="5"
                                                value={
                                                    info.remoteStaffExpectation
                                                }
                                            ></textarea>
                                        ) : (
                                            <span
                                                className="item"
                                                name="remoteStaffExpectation"
                                            >
                                                {remoteStaffExpectation}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <button
                                            className="btn button btn-block cancel"
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    <div className="col-lg-6">
                                        <button
                                            className="btn button btn-block submit"
                                            onClick={() => {
                                                handleClose();
                                                submit();
                                            }}
                                        >
                                            Submit Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

SummaryModal.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addJob: PropTypes.func.isRequired,
    jobState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    jobState: state.jobState,
});

export default connect(mapStateToProps, { setAlert, addJob })(SummaryModal);
