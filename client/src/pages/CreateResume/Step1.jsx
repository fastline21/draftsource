import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// List
import { countryList } from './../../list/Country';

// Action
import { setAlert } from './../../state/actions/alertAction';
import {
    addUser,
    clearError,
    clearUser,
} from './../../state/actions/userAction';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

const Step1 = ({
    setAlert,
    addUser,
    clearError,
    clearUser,
    userState: { user, error },
}) => {
    const [
        Prompt,
        setDirty,
        setPristine,
        setMessage,
    ] = useUnsavedChangesWarning();

    const initialInfo = {
        firstName: '',
        lastName: '',
        email: '',
        cellphone: '',
        city: '',
        country: 'Afghanistan',
        facebook: '',
    };

    const [info, setInfo] = useState(initialInfo);
    const [load, setLoad] = useState(true);

    const {
        firstName,
        lastName,
        email,
        cellphone,
        city,
        country,
        facebook,
    } = info;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
        setDirty();
        setMessage('Are you sure you want to leave this page?');
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (JSON.stringify(info) === JSON.stringify(initialInfo)) {
            return setAlert(
                '',
                'Please fill-in the required boxes to Proceed.'
            );
        } else {
            for (const property in info) {
                localStorage.setItem([property], info[property]);
            }
            addUser({ ...info, type: 'Remote Worker' });
            setInfo(initialInfo);
            setPristine();
        }
    };

    useEffect(() => {
        if (load) {
            localStorage.clear();
            setLoad(false);
        }

        if (JSON.stringify(info) !== JSON.stringify(initialInfo)) {
            setDirty();
            setMessage('Are you sure you want to leave this page?');
        }

        if (error) {
            localStorage.clear();
            setAlert('', error.msg);
            clearError();
        }

        if (user) {
            setAlert(
                '/',
                'Kindly check <span>email</span> for confirmation to proceed.'
            );
            clearUser();
        }

        // eslint-disable-next-line
    }, [info, load, error, user]);
    return (
        <div className="step-1">
            {Prompt}
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-lg-4">
                                    <label
                                        htmlFor="firstNameInput"
                                        className="form-label"
                                    >
                                        First Name
                                    </label>
                                </div>
                                <div className="col-lg-8">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        id="firstNameInput"
                                        name="firstName"
                                        value={firstName}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-lg-4">
                                    <label
                                        htmlFor="lastNameInput"
                                        className="form-label"
                                    >
                                        Last Name
                                    </label>
                                </div>
                                <div className="col-lg-8">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        id="lastNameInput"
                                        name="lastName"
                                        value={lastName}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-lg-4">
                                    <label
                                        htmlFor="emailInput"
                                        className="form-label"
                                    >
                                        Email
                                    </label>
                                </div>
                                <div className="col-lg-8">
                                    <input
                                        type="email"
                                        className="form-control input"
                                        id="emailInput"
                                        name="email"
                                        value={email}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-lg-4">
                                    <label
                                        htmlFor="cellphoneInput"
                                        className="form-label"
                                    >
                                        Cellphone No.
                                    </label>
                                </div>
                                <div className="col-lg-8">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        id="cellphoneInput"
                                        value={cellphone}
                                        name="cellphone"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-lg-4">
                                    <label
                                        htmlFor="cityInput"
                                        className="form-label"
                                    >
                                        Country
                                    </label>
                                </div>
                                <div className="col-lg-8">
                                    <select
                                        id="countryInput"
                                        className="form-control input"
                                        name="country"
                                        onChange={onChange}
                                        value={country}
                                    >
                                        {countryList().map((e, i) => (
                                            <option key={i} value={e}>
                                                {e}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-lg-4">
                                    <label
                                        htmlFor="cityInput"
                                        className="form-label"
                                    >
                                        City
                                    </label>
                                </div>
                                <div className="col-lg-8">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        id="cityInput"
                                        name="city"
                                        value={city}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-lg-4">
                                    <label
                                        htmlFor="facebookInput"
                                        className="form-label"
                                    >
                                        Facebook Link
                                    </label>
                                </div>
                                <div className="col-lg-8">
                                    <input
                                        type="text"
                                        className="form-control input"
                                        id="facebookInput"
                                        value={facebook}
                                        name="facebook"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col-lg-8 offset-lg-4">
                                    <input
                                        type="submit"
                                        className="btn btn-primary btn-block button"
                                        value="Create Resume"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

Step1.propTypes = {
    setAlert: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    userState: PropTypes.object.isRequired,
    clearError: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userState: state.userState,
});

export default connect(mapStateToProps, {
    setAlert,
    addUser,
    clearError,
    clearUser,
})(Step1);
