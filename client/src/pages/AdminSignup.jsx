import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { addUser, clearUser, clearError } from './../state/actions/userAction';
import { setAlert } from './../state/actions/alertAction';

const AdminSignup = ({
    addUser,
    setAlert,
    clearUser,
    clearError,
    userState: { user, error },
}) => {
    const initialInfo = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    };

    const [info, setInfo] = useState(initialInfo);

    const { firstName, lastName, email, password } = info;

    const onChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (JSON.stringify(info) === JSON.stringify(initialInfo)) {
            return setAlert(
                '',
                'Please fill-in the required boxes to Proceed.'
            );
        } else {
            addUser({ ...info, type: 'Admin' });
            setInfo(initialInfo);
        }
    };

    useEffect(() => {
        if (error) {
            setAlert('', error.msg);
            clearError();
        }

        if (user) {
            setAlert('/', 'You can now login');
            clearUser();
        }
    }, [user, error]);

    return (
        <div style={{ height: '85vh' }}>
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={onSubmit} className="w-75 mx-auto">
                            <h1 className="text-center">Admin Register</h1>
                            <div className="form-group">
                                <label
                                    htmlFor="firstNameInput"
                                    className="form-label"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstNameInput"
                                    name="firstName"
                                    className="form-control input"
                                    onChange={onChange}
                                    value={firstName}
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="lastNameInput"
                                    className="form-label"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastNameInput"
                                    name="lastName"
                                    className="form-control input"
                                    onChange={onChange}
                                    value={lastName}
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="emailInput"
                                    className="form-label"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="emailInput"
                                    name="email"
                                    className="form-control input"
                                    onChange={onChange}
                                    value={email}
                                />
                            </div>
                            <div className="form-group">
                                <label
                                    htmlFor="passwordInput"
                                    className="form-label"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="passwordInput"
                                    className="form-control input"
                                    onChange={onChange}
                                    value={password}
                                />
                            </div>
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-primary btn-block button"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

AdminSignup.propTypes = {
    addUser: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    clearError: PropTypes.func.isRequired,
    userState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    userState: state.userState,
});

export default connect(mapStateToProps, {
    addUser,
    setAlert,
    clearUser,
    clearError,
})(AdminSignup);
