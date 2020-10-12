import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { setAlert } from './../state/actions/alertAction';
import { loginUser, clearError } from './../state/actions/userAction';

// Components
import SignupModal from './Login/SignupModal';

const Login = ({
	setAlert,
	loginUser,
	clearError,
	userState: { user, error },
}) => {
	const history = useHistory();

	const initialInfo = {
		email: '',
		password: '',
	};

	const [info, setInfo] = useState(initialInfo);
	const [stayLogged, setStayLogged] = useState(false);
	const [signupModal, setSignupModal] = useState(false);

	const { email, password } = info;

	const checkStay = (e) => {
		setStayLogged(!stayLogged);
		localStorage.setItem('stayLogged', !stayLogged);
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setInfo({ ...info, [name]: value });
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (email === '' || password === '') {
			return setAlert(
				'',
				'Please fill-in the required boxes to Proceed.'
			);
		} else {
			loginUser({ email, password });
		}
	};

	const onSignup = () => {
		setSignupModal(true);
	};

	useEffect(() => {
		if (error) {
			setAlert('', error.msg);
			clearError();
		}

		if (user) {
			if (user.type === 'Admin' || user.type === 'Recruiter') {
				history.push('/dashboard');
			} else if (user.type === 'Employer') {
				history.push('/draft-job');
			}
		}

		// eslint-disable-next-line
	}, [error, user]);

	return (
		<div id="login">
			<SignupModal
				isShow={signupModal}
				isHide={() => setSignupModal(false)}
			/>
			<div className="container">
				<div className="header">
					<h2 className="title">Login</h2>
					<div className="line-break" />
				</div>
				<div className="row">
					<div className="col-sm-6 offset-sm-3">
						<form className="form" onSubmit={onSubmit}>
							<div className="form-group">
								<div className="form-row">
									<div className="col-lg-3">
										<label className="form-label">
											Email
										</label>
									</div>
									<div className="col-lg-9">
										<input
											type="email"
											name="email"
											className="form-control input"
											onChange={onChange}
											value={email}
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className="form-row">
									<div className="col-lg-3">
										<label className="form-label">
											Password
										</label>
									</div>
									<div className="col-lg-9">
										<input
											type="password"
											name="password"
											className="form-control input"
											onChange={onChange}
											value={password}
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className="form-row">
									<div className="col-lg-9 offset-lg-3">
										<input
											type="submit"
											value="Log In"
											className="btn btn-primary btn-block button"
										/>
									</div>
								</div>
							</div>
							<div className="form-group">
								<div className="form-row">
									<div className="col-lg-9 offset-lg-3">
										<div className="form-inline">
											<div className="form-check">
												<input
													className="form-check-input mb-auto"
													onChange={checkStay}
													type="checkbox"
													id="stayLoggedInInput"
												/>
												<label
													className="form-check-label form-label mt-0"
													htmlFor="stayLoggedInInput"
												>
													Stay logged in
												</label>
											</div>
											<Link
												to="/forget-password"
												className="ml-auto link"
											>
												Forget password?
											</Link>
										</div>
									</div>
									<div className="col-lg-9 offset-lg-3">
										{/* <div className="or">or</div>
                                        <div className="other-login">
                                            <a
                                                href="https://google.com"
                                                className="btn button btn-block"
                                            >
                                                <i className="fab fa-google"></i>{' '}
                                                Continue with Google
                                            </a>
                                            <a
                                                href="https://google.com"
                                                className="btn button btn-block"
                                            >
                                                <i className="fab fa-facebook"></i>{' '}
                                                Continue with Facebook
                                            </a>
                                            <a
                                                href="https://google.com"
                                                className="btn button btn-block"
                                            >
                                                <i className="fab fa-linkedin"></i>{' '}
                                                Continue with LinkedIn
                                            </a>
                                        </div> */}
										{/* <div className="form-inline">
											<span
												style={{
													color: '#0c3961',
													fontWeight: 500,
												}}
											>
												Not registered?
											</span>
											<button
												className="link ml-auto"
												onClick={onSignup}
											>
												Sign Up Now
											</button>
										</div> */}
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

Login.propTypes = {
	setAlert: PropTypes.func.isRequired,
	loginUser: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
	userState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { setAlert, loginUser, clearError })(
	Login
);
