import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Images
import draftsourceLogo from './../images/draftsource_logo.png';

// Components
import { talkRecruiter } from './../components/TalkRecruiter';

// Actions
import { logoutUser } from './../state/actions/userAction';

const Header = ({ logoutUser, userState: { user } }) => {
	const history = useHistory();

	const onLogout = () => {
		logoutUser();
		history.push('/login');
	};

	return (
		<Navbar bg='white' expand='lg' id='header'>
			<Navbar.Brand as={NavLink} to='/'>
				<img
					src={draftsourceLogo}
					className='d-inline-block align-top'
					alt='Draftsource Logo'
					height='40'
				/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />
			<Navbar.Collapse id='basic-navbar-nav' className='mt-2'>
				<Nav className='mr-auto'>
					<Nav.Link as={NavLink} to='/view-candidates'>
						View Ready to Hire Candidates
					</Nav.Link>
					<Nav.Link as={NavLink} to='/pricing'>
						Pricing
					</Nav.Link>
				</Nav>
				<Nav className='ml-auto'>
					<Nav.Link
						onClick={talkRecruiter}
						className='talk-recruiter'
					>
						Talk to a Recruiter
					</Nav.Link>
				</Nav>
				<Nav>
					{(user && user.type === 'Admin') ||
					(user && user.type === 'Recruiter') ? (
						<Fragment>
							<Nav.Link as={NavLink} to='/dashboard'>
								Dashboard
							</Nav.Link>
							<Nav.Link onClick={onLogout}>Logout</Nav.Link>
						</Fragment>
					) : null}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

Header.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	userState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { logoutUser })(Header);
