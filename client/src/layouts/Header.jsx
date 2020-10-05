import React, { Fragment, useEffect, useState } from 'react';
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

// Utils
import useWindowSize from './../utils/useWindowSize';

const Header = ({ logoutUser, userState: { user } }) => {
	const windowSize = useWindowSize();
	const history = useHistory();
	const [mobileNav, setMobileNav] = useState(false);

	const onLogout = () => {
		logoutUser();
		history.push('/login');
	};

	// Open Mobile Nav
	const onOpenNav = () => {
		setMobileNav(true);
	};

	// Close Mobile Nav
	const onCloseNav = (e) => {
		e.preventDefault();
		setMobileNav(false);
	};

	// Mobile Link
	const mobileLink = () => {
		setMobileNav(false);
	};

	useEffect(() => {
		// Resize Window Width
		if (windowSize.width > 1009) {
			setMobileNav(false);
		}

		// Show Mobile Nav
		if (mobileNav) {
			document.getElementById('mobileMenu').style.right = 0;
			document.getElementById('mobileOverlay').style.cssText =
				'visibility: visible; opacity: 1';
		} else {
			document.getElementById('mobileMenu').removeAttribute('style');
			document.getElementById('mobileOverlay').removeAttribute('style');
		}
	}, [mobileNav, windowSize]);

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
			<button
				className='navbar-toggler'
				type='button'
				onClick={onOpenNav}
			>
				<i className='fas fa-bars'></i>
			</button>
			<Navbar.Collapse className='mt-2'>
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
			<div id='mobileMenu' className='overlay'>
				<a className='mobile-close' href='/' onClick={onCloseNav}>
					CLOSE X
				</a>
				<ul className='mobile-main-menu'>
					<li>
						<NavLink to='/view-candidates' onClick={mobileLink}>
							View Ready to Hire Candidates
						</NavLink>
					</li>
					<li>
						<NavLink to='/pricing' onClick={mobileLink}>
							Pricing
						</NavLink>
					</li>
					<li>
						<NavLink to='/watch-video' onClick={mobileLink}>
							Watch Video
						</NavLink>
					</li>
					<li>
						<NavLink to='/talk-recruiter' onClick={mobileLink}>
							Talk to a Recruiter
						</NavLink>
					</li>
				</ul>
				<ul className='mobile-main-menu d-block d-sm-none'>
					<li>
						<NavLink
							to='/dashboard/new-applicant'
							onClick={mobileLink}
						>
							New Applicant
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/dashboard/approved-applicants'
							onClick={mobileLink}
						>
							Approve Applicants
						</NavLink>
					</li>
					<li>
						<NavLink
							to='/dashboard/rejected-applicants'
							onClick={mobileLink}
						>
							Rejected Applicants
						</NavLink>
					</li>
					<li>
						<NavLink to='/talk-recruiter' onClick={mobileLink}>
							Talk to a Recruiter
						</NavLink>
					</li>
				</ul>
			</div>
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
