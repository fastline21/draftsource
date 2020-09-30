import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { setAlert } from './../../state/actions/alertAction';
import {
    setStep,
    submitEmployer,
    setSuccess,
    clearError,
} from './../../state/actions/employerAction';

const Step3 = ({
    setAlert,
    setStep,
    submitEmployer,
    setSuccess,
    clearError,
    employerState: { employer, error, step, success },
}) => {
    const initialInfo = {
        name: '',
        position: '',
        industry: '',
        website: '',
    };

    const [info, setInfo] = useState(initialInfo);
    const [load, setLoad] = useState(true);

    const { name, position, industry, website } = info;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (
            name === '' ||
            position === '' ||
            industry === '' ||
            website === ''
        ) {
            return setAlert(
                '',
                'Please fill-in the required boxes to Proceed.'
            );
        } else {
            submitEmployer({
                ...employer,
                company: { name, position, industry, website },
            });
            setInfo(initialInfo);
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
            setAlert('/draft-job', 'You can now draft a job');
            setSuccess();
            setStep(0);
        }
    }, [error, success, load]);

    return (
        <div className="step-3">
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-3">
                            <label className="form-label">Company</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="text"
                                name="name"
                                className="form-control input"
                                onChange={onChange}
                                value={name}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-3">
                            <label className="form-label">Position</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="text"
                                name="position"
                                className="form-control input"
                                onChange={onChange}
                                value={position}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-3">
                            <label className="form-label">Industry</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="text"
                                name="industry"
                                className="form-control input"
                                onChange={onChange}
                                value={industry}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-3">
                            <label className="form-label">Website</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="text"
                                className="form-control input"
                                name="website"
                                onChange={onChange}
                                value={website}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-9 offset-lg-3">
                            <input
                                type="submit"
                                value="Create Account"
                                className="btn btn-primary btn-block button"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

Step3.propTypes = {
    employerState: PropTypes.object.isRequired,
    setAlert: PropTypes.func.isRequired,
    setStep: PropTypes.func.isRequired,
    submitEmployer: PropTypes.func.isRequired,
    setSuccess: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    employerState: state.employerState,
});

export default connect(mapStateToProps, {
    setAlert,
    setStep,
    submitEmployer,
    setSuccess,
    clearError,
})(Step3);
