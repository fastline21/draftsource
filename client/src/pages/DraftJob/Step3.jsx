import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// List
import { availabilityList } from './../../list/Availability';

// Actions
import {
    addJob,
    submitJob,
    setStep,
    setSuccess,
    clearError,
} from '../../state/actions/jobAction';
import { setAlert } from '../../state/actions/alertAction';
import { clearUser } from './../../state/actions/userAction';

// Components
import SummaryModal from './SummaryModal';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

const Step3 = ({
    addJob,
    submitJob,
    setAlert,
    setStep,
    setSuccess,
    clearError,
    clearUser,
    jobState: { job, error, step, success },
}) => {
    const [
        Prompt,
        setDirty,
        setPristine,
        setMessage,
    ] = useUnsavedChangesWarning();

    const initialInfo = {
        availability: 'Full Time',
        expectedSalary: '',
        currency: 'USD',
    };

    const [info, setInfo] = useState(initialInfo);
    const [submit, setSubmit] = useState(false);
    const [load, setLoad] = useState(true);
    const [summaryModal, setSummaryModal] = useState(false);

    const { availability, expectedSalary, currency } = info;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (availability === '' || expectedSalary === '' || currency === '') {
            return setAlert(
                '',
                'Please fill-in the required boxes to Proceed.'
            );
        } else {
            addJob({ availability, expectedSalary, currency });
            setInfo(initialInfo);
            setSummaryModal(true);
        }
    };

    useEffect(() => {
        if (load) {
            if (step !== 3) {
                setAlert(
                    '/',
                    'You are not authorize to go in this page. Please start at Step 1'
                );
            }
            setLoad(false);
        }

        if (error) {
            setAlert('', error.msg);
            clearError();
        }

        if (success) {
            localStorage.clear();
            setAlert(
                '/',
                '<h2 class="title">Thank you for drafting a job</h2><p class="subtitle">We will call you within 72 hours to verify your profile</p>'
            );
            setSuccess();
            setStep(0);
            clearUser();
        }
    }, [success, error, load]);

    return (
        <div className="step-3">
            {summaryModal ? (
                <SummaryModal
                    isShow={summaryModal}
                    isHide={() => setSummaryModal(!summaryModal)}
                    submit={() => {
                        submitJob(job);
                        setPristine();
                    }}
                />
            ) : null}
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <h5 className="title">Are you looking to work?</h5>
                            {availabilityList().map((e, i) => (
                                <div className="form-check" key={i}>
                                    <input
                                        type="radio"
                                        name="availability"
                                        id={`availability${i}`}
                                        className="form-check-input input"
                                        value={e}
                                        onChange={onChange}
                                        checked={availability === e}
                                    />
                                    <label
                                        htmlFor={`availability${i}`}
                                        className="form-check-label"
                                    >
                                        {e}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="form-group">
                            <label className="form-label">
                                Expected Salary
                            </label>
                            <div className="form-inline">
                                <input
                                    type="number"
                                    id="expectedSalaryInput"
                                    className="form-control input"
                                    name="expectedSalary"
                                    placeholder="per Hour"
                                    onChange={onChange}
                                    value={expectedSalary}
                                />
                                <select
                                    name="currency"
                                    className="form-control input"
                                    onChange={onChange}
                                    value={currency}
                                >
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block button">
                                Send & Post Job
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

Step3.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addJob: PropTypes.func.isRequired,
    submitJob: PropTypes.func.isRequired,
    jobState: PropTypes.object.isRequired,
    setStep: PropTypes.func.isRequired,
    setSuccess: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    jobState: state.jobState,
});

export default connect(mapStateToProps, {
    setAlert,
    addJob,
    submitJob,
    setStep,
    setSuccess,
    clearError,
    clearUser,
})(Step3);
