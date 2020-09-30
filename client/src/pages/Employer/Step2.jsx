import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// List
import { countryList } from './../../list/Country';

// Actions
import { setAlert } from './../../state/actions/alertAction';
import { addEmployer, setStep } from './../../state/actions/employerAction';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

const Step2 = ({ setAlert, addEmployer, setStep, employerState: { step } }) => {
    const [
        Prompt,
        setDirty,
        setPristine,
        setMessage,
    ] = useUnsavedChangesWarning();

    const history = useHistory();

    const initialInfo = {
        firstName: '',
        lastName: '',
        contactNo: '',
        country: 'Afghanistan',
    };

    const [info, setInfo] = useState(initialInfo);
    const [load, setLoad] = useState(true);
    const [submit, setSubmit] = useState(false);

    const { firstName, lastName, contactNo, country } = info;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (
            firstName === '' ||
            lastName === '' ||
            contactNo === '' ||
            country === ''
        ) {
            return setAlert(
                '',
                'Please fill-in the required boxes to Proceed.'
            );
        } else {
            addEmployer(info);
            setInfo(initialInfo);
            setPristine();
            setSubmit(true);
        }
    };

    useEffect(() => {
        if (load) {
            if (step !== 2) {
                setAlert(
                    '/',
                    'You are not authorize to go in this page. Please start at Step 1'
                );
            }
            setLoad(false);
        }

        if (submit) {
            setStep(3);
            history.push({
                pathname: '/signup/employer',
                search: 'step=3',
            });
        }
    }, [load, submit]);

    return (
        <div className="step-2">
            {Prompt}
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-3">
                            <label className="form-label">First Name</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="text"
                                name="firstName"
                                className="form-control input"
                                onChange={onChange}
                                value={firstName}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-3">
                            <label className="form-label">Last Name</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="text"
                                name="lastName"
                                className="form-control input"
                                onChange={onChange}
                                value={lastName}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-3">
                            <label className="form-label">Contact No.</label>
                        </div>
                        <div className="col-lg-9">
                            <input
                                type="number"
                                name="contactNo"
                                className="form-control input"
                                onChange={onChange}
                                value={contactNo}
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-3">
                            <label className="form-label">Contact No.</label>
                        </div>
                        <div className="col-lg-9">
                            <select
                                className="form-control input"
                                name="country"
                            >
                                {countryList().map((e, i) => (
                                    <option value={e} key={i}>
                                        {e}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col-lg-9 offset-lg-3">
                            <input
                                type="submit"
                                value="Nextss"
                                className="btn btn-primary btn-block button"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

Step2.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addEmployer: PropTypes.func.isRequired,
    setStep: PropTypes.func.isRequired,
    employerState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    employerState: state.employerState,
});

export default connect(mapStateToProps, {
    setAlert,
    addEmployer,
    setStep,
})(Step2);
