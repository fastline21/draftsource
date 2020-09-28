import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

// Actions
import { setAlert } from './../../state/actions/alertAction';
import { addJob } from './../../state/actions/jobAction';

const Step2 = ({ setAlert, addJob, jobState: { error } }) => {
    const [
        Prompt,
        setDirty,
        setPristine,
        setMessage,
    ] = useUnsavedChangesWarning();

    const history = useHistory();

    const initialInfo = {
        about: '',
        remoteStaffExpectation: '',
    };

    const [roles, setRoles] = useState([]);
    const [keyResponsibilities, setKeyResponsibilities] = useState([]);
    const [responsibilities, setResponsibilities] = useState([]);
    const [info, setInfo] = useState(initialInfo);
    const [submit, setSubmit] = useState(false);

    const { about, remoteStaffExpectation } = info;

    const rolesRef = useRef(null);
    const keyResponsibilitiesRef = useRef(null);
    const responsibilitiesRef = useRef(null);

    const onChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };

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
                    setRoles((roles) => [...roles, rolesVal]);
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
                    setKeyResponsibilities((keyResponsibilities) => [
                        ...keyResponsibilities,
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
                    setResponsibilities((responsibilities) => [
                        ...responsibilities,
                        responsibilitiesVal,
                    ]);
                    responsibilitiesRef.current.value = '';
                }
            }
            setDirty();
            setMessage('Are you sure you want to leave this page?');
            e.preventDefault();
        }
    };

    const itemClose = (field, index) => {
        if (field === 'roles') {
            setRoles((roles) => [
                ...roles.filter((x) => roles.indexOf(x) !== index),
            ]);
        } else if (field === 'keyResponsibilities') {
            setKeyResponsibilities((keyResponsibilities) => [
                ...keyResponsibilities.filter(
                    (x) => keyResponsibilities.indexOf(x) !== index
                ),
            ]);
        } else if (field === 'responsibilities') {
            setResponsibilities((responsibilities) => [
                ...responsibilities.filter(
                    (x) => responsibilities.indexOf(x) !== index
                ),
            ]);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (
            roles.length === 0 ||
            keyResponsibilities.length === 0 ||
            responsibilities.length === 0 ||
            about === '' ||
            remoteStaffExpectation === ''
        ) {
            setAlert('', 'Please fill-in the required boxes to Proceed.');
        } else {
            addJob({
                about,
                roles,
                keyResponsibilities,
                responsibilities,
                remoteStaffExpectation,
            });
            setInfo(initialInfo);
            setRoles([]);
            setKeyResponsibilities([]);
            setResponsibilities([]);
            setSubmit(true);
            setPristine();
        }
    };

    useEffect(() => {
        if (JSON.stringify(info) === JSON.stringify(initialInfo)) {
            setDirty();
            setMessage('Are you sure you want to leave this page?');
        }

        if (error) {
            setAlert('', error.msg);
        }

        if (submit) {
            setSubmit(false);
            history.push('/draft-job?step=3');
        }
    }, [submit, error, info]);

    return (
        <div className="step-2">
            {Prompt}
            <form className="form" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <h6 className="title">About the job</h6>
                        <div className="form-group">
                            <label
                                for="aboutInput"
                                style={{
                                    color: '#606060',
                                    fontWeight: 500,
                                    margin: '10px 0',
                                }}
                            >
                                Job Description
                            </label>
                            <textarea
                                name="about"
                                rows="5"
                                className="form-control input"
                                onChange={onChange}
                                value={about}
                            ></textarea>
                        </div>
                        <div className="clearfix">
                            <hr className="line-break" />
                        </div>
                        <div className="form-group">
                            <label for="rolesInput" className="form-label">
                                Roles
                            </label>
                            <div className="position-relative">
                                <input
                                    type="text"
                                    id="rolesInput"
                                    className="form-control input"
                                    name="roles"
                                    onKeyPress={onKeyPress}
                                    ref={rolesRef}
                                />
                                <i className="fas fa-plus"></i>
                            </div>
                            <ul className="roles-list">
                                {roles.length > 0 &&
                                    roles.map((e, i) => (
                                        <li key={i}>
                                            <span className="roles-item">
                                                {e}
                                                <span
                                                    className="roles-close"
                                                    onClick={() =>
                                                        itemClose('roles', i)
                                                    }
                                                >
                                                    x
                                                </span>
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <div className="clearfix">
                            <hr className="line-break" />
                        </div>
                        <div className="form-group">
                            <label
                                for="keyResponsibilitiesInput"
                                className="form-label"
                            >
                                Key Responsibilities
                            </label>
                            <div className="position-relative">
                                <input
                                    type="text"
                                    id="keyResponsibilitiesInput"
                                    className="form-control input"
                                    name="keyResponsibilities"
                                    onKeyPress={onKeyPress}
                                    ref={keyResponsibilitiesRef}
                                />
                                <i className="fas fa-plus"></i>
                            </div>
                            <ul className="key-responsibilities-list">
                                {keyResponsibilities.length > 0 &&
                                    keyResponsibilities.map((e, i) => (
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
                                    ))}
                            </ul>
                        </div>
                        <div className="clearfix">
                            <hr className="line-break" />
                        </div>
                        <div className="form-group">
                            <label
                                for="responsibilitiesInput"
                                className="form-label"
                            >
                                Responsibilities
                            </label>
                            <div className="position-relative">
                                <input
                                    type="text"
                                    id="responsibilitiesInput"
                                    className="form-control input"
                                    name="responsibilities"
                                    onKeyPress={onKeyPress}
                                    ref={responsibilitiesRef}
                                />
                                <i className="fas fa-plus"></i>
                            </div>
                            <ul className="responsibilities-list">
                                {responsibilities.length > 0 &&
                                    responsibilities.map((e, i) => (
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
                                    ))}
                            </ul>
                        </div>
                        <div className="clearfix">
                            <hr className="line-break" />
                        </div>
                        <div className="form-group">
                            <label
                                for="remoteStaffExpectationInput"
                                className="form-label"
                            >
                                Remote Staff Expectation
                            </label>
                            <textarea
                                rows="5"
                                id="remoteStaffExpectationInput"
                                className="form-control input"
                                name="remoteStaffExpectation"
                                onChange={onChange}
                                value={remoteStaffExpectation}
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-lg-4 offset-lg-8">
                                    <input
                                        type="submit"
                                        className="btn button btn-block mt-5"
                                        value="One more to go"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

Step2.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addJob: PropTypes.func.isRequired,
    jobState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    jobState: state.jobState,
});

export default connect(mapStateToProps, { setAlert, addJob })(Step2);
