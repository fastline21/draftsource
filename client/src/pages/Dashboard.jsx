import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import {
	approvedApplicants,
	newApplicants,
	rejectedApplicants,
	hiredApplicants,
} from './../state/actions/candidateAction';
import {
	newJobs,
	approvedJobs,
	rejectedJobs,
} from './../state/actions/jobAction';
import { getUsers } from './../state/actions/userAction';

// Components
import Filter from './Dashboard/Filter';
import JobRequest from './Dashboard/JobRequest';
import RolesPermissions from './Dashboard/RolesPermissions';
import Fullname from './Dashboard/Fullname';
import Applicants from './Dashboard/Applicants';

const Dashboard = ({
	newApplicants,
	approvedApplicants,
	rejectedApplicants,
	hiredApplicants,
	newJobs,
	approvedJobs,
	rejectedJobs,
	getUsers,
	userState: { user },
}) => {
	const { menu } = useParams();

	const closeSidebar = () => {
		document.getElementById('filterMobile').removeAttribute('style');
		document.getElementById('mobileOverlay1').removeAttribute('style');
	};

	useEffect(() => {
		if (menu === 'new-applicants') {
			newApplicants();
		} else if (menu === 'approved-applicants') {
			approvedApplicants();
		} else if (menu === 'rejected-applicants') {
			rejectedApplicants();
		} else if (menu === 'hired-applicants') {
			hiredApplicants();
		} else if (menu === 'new-jobs') {
			newJobs();
		} else if (menu === 'approved-jobs') {
			approvedJobs();
		} else if (menu === 'rejected-jobs') {
			rejectedJobs();
		} else if (menu === 'roles-permissions') {
			getUsers();
		}

		// eslint-disable-next-line
	}, [menu]);

	return (
		<div id="dashboard">
			<div className="head">
				<h2 className="title">
					Welcome,{' '}
					<span className="fullname">
						<Fullname />
					</span>
				</h2>
			</div>
			<div className="content">
				<div id="filterMobile" className="sidebar d-block px-3">
					<a
						className="mobile-close"
						href="/"
						onClick={(e) => {
							e.preventDefault();
							closeSidebar();
						}}
					>
						CLOSE X
					</a>
					<div className="remote-worker">
						<h5 className="title">Remote Worker</h5>
						<ul className="nav flex-column">
							<li
								className={`nav-item sidebar-item${
									menu === 'new-applicants' ? ' active' : ''
								}`}
							>
								<Link
									to="/dashboard/new-applicants"
									className="nav-link"
									onClick={closeSidebar}
								>
									New Applicants{' '}
									<i
										className={`fas fa-${
											menu === 'new-applicants' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
								{menu === 'new-applicants' ? (
									<Filter loadData={newApplicants} />
								) : null}
							</li>
							<li
								className={`nav-item sidebar-item${
									menu === 'approved-applicants' ? ' active' : ''
								}`}
							>
								<Link
									to="/dashboard/approved-applicants"
									className="nav-link"
									onClick={closeSidebar}
								>
									Approved Applicants{' '}
									<i
										className={`fas fa-${
											menu === 'approved-applicants' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
								{menu === 'approved-applicants' ? (
									<Filter loadData={approvedApplicants} />
								) : null}
							</li>
							<li
								className={`nav-item sidebar-item${
									menu === 'rejected-applicants' ? ' active' : ''
								}`}
							>
								<Link
									to="/dashboard/rejected-applicants"
									className="nav-link"
									onClick={closeSidebar}
								>
									Rejected Appplicants{' '}
									<i
										className={`fas fa-${
											menu === 'rejected-applicants' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
								{menu === 'rejected-applicants' ? (
									<Filter loadData={rejectedApplicants} />
								) : null}
							</li>
						</ul>
					</div>
					<div className="employer">
						<h5 className="title">Employer</h5>
						<ul className="nav flex-column">
							<li
								className={`nav-item sidebar-item${
									menu === 'new-jobs' ? ' active' : ''
								}`}
							>
								<Link
									to="/dashboard/new-jobs"
									className="nav-link"
									onClick={closeSidebar}
								>
									New Job Request{' '}
									<i
										className={`fas fa-${
											menu === 'new-jobs' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
							</li>
							<li
								className={`nav-item sidebar-item${
									menu === 'approved-jobs' ? ' active' : ''
								}`}
							>
								<Link
									to="/dashboard/approved-jobs"
									className="nav-link"
									onClick={closeSidebar}
								>
									Approved Job Request{' '}
									<i
										className={`fas fa-${
											menu === 'approved-jobs' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
							</li>
							<li
								className={`nav-item sidebar-item${
									menu === 'rejected-jobs' ? ' active' : ''
								}`}
							>
								<Link
									to="/dashboard/rejected-jobs"
									className="nav-link"
									onClick={closeSidebar}
								>
									Rejected Job Request{' '}
									<i
										className={`fas fa-${
											menu === 'rejected-jobs' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
							</li>
						</ul>
					</div>
					{user && user.type === 'Admin' && (
						<div className="settings">
							<h5 className="title">Settings</h5>
							<ul className="nav flex-column">
								<li
									className={`nav-item sidebar-item${
										menu === 'roles-permissions' ? ' active' : ''
									}`}
								>
									<Link
										to="/dashboard/roles-permissions"
										className="nav-link"
										onClick={closeSidebar}
									>
										Roles & Permissions
									</Link>
								</li>
							</ul>
						</div>
					)}
				</div>
				<nav className="sidebar">
					<div className="remote-worker">
						<h5 className="title">Remote Worker</h5>
						<ul className="nav flex-column">
							<li
								className={`nav-item sidebar-item${
									menu === 'new-applicants' ? ' active' : ''
								}`}
							>
								<Link to="/dashboard/new-applicants" className="nav-link">
									New Applicants{' '}
									<i
										className={`fas fa-${
											menu === 'new-applicants' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
								{menu === 'new-applicants' ? (
									<Filter loadData={newApplicants} />
								) : null}
							</li>
							<li
								className={`nav-item sidebar-item${
									menu === 'approved-applicants' ? ' active' : ''
								}`}
							>
								<Link to="/dashboard/approved-applicants" className="nav-link">
									Approved Applicants{' '}
									<i
										className={`fas fa-${
											menu === 'approved-applicants' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
								{menu === 'approved-applicants' ? (
									<Filter loadData={approvedApplicants} />
								) : null}
							</li>
							<li
								className={`nav-item sidebar-item${
									menu === 'hired-applicants' ? ' active' : ''
								}`}
							>
								<Link to="/dashboard/hired-applicants" className="nav-link">
									Hired Applicants{' '}
									<i
										className={`fas fa-${
											menu === 'hired-applicants' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
								{menu === 'hired-applicants' ? (
									<Filter loadData={hiredApplicants} />
								) : null}
							</li>
							<li
								className={`nav-item sidebar-item${
									menu === 'rejected-applicants' ? ' active' : ''
								}`}
							>
								<Link to="/dashboard/rejected-applicants" className="nav-link">
									Rejected Appplicants{' '}
									<i
										className={`fas fa-${
											menu === 'rejected-applicants' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
								{menu === 'rejected-applicants' ? (
									<Filter loadData={rejectedApplicants} />
								) : null}
							</li>
						</ul>
					</div>
					<div className="employer">
						<h5 className="title">Employer</h5>
						<ul className="nav flex-column">
							<li
								className={`nav-item sidebar-item${
									menu === 'new-jobs' ? ' active' : ''
								}`}
							>
								<Link to="/dashboard/new-jobs" className="nav-link">
									New Job Request{' '}
									<i
										className={`fas fa-${
											menu === 'new-jobs' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
								{menu === 'new-jobs' ? (
									<Filter loadData={newJobs} isJob={true} />
								) : null}
							</li>
							<li
								className={`nav-item sidebar-item${
									menu === 'approved-jobs' ? ' active' : ''
								}`}
							>
								<Link to="/dashboard/approved-jobs" className="nav-link">
									Approved Job Request{' '}
									<i
										className={`fas fa-${
											menu === 'approved-jobs' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
								{menu === 'approved-jobs' ? (
									<Filter loadData={approvedJobs} isJob={true} />
								) : null}
							</li>
							<li
								className={`nav-item sidebar-item${
									menu === 'rejected-jobs' ? ' active' : ''
								}`}
							>
								<Link to="/dashboard/rejected-jobs" className="nav-link">
									Rejected Job Request{' '}
									<i
										className={`fas fa-${
											menu === 'rejected-jobs' ? 'angle-up' : 'angle-down'
										} float-right pt-1`}
									></i>
								</Link>
								{menu === 'rejected-jobs' ? (
									<Filter loadData={rejectedJobs} isJob={true} />
								) : null}
							</li>
						</ul>
					</div>
					{user && user.type === 'Admin' && (
						<div className="settings">
							<h5 className="title">Settings</h5>
							<ul className="nav flex-column">
								<li
									className={`nav-item sidebar-item${
										menu === 'roles-permissions' ? ' active' : ''
									}`}
								>
									<Link to="/dashboard/roles-permissions" className="nav-link">
										Roles & Permissions
									</Link>
								</li>
							</ul>
						</div>
					)}
				</nav>
				<main className="main">
					{menu === 'new-applicants' ||
					menu === 'approved-applicants' ||
					menu === 'hired-applicants' ||
					menu === 'rejected-applicants' ? (
						<Applicants />
					) : null}
					{menu === 'new-jobs' ||
					menu === 'approved-jobs' ||
					menu === 'rejected-jobs' ? (
						<JobRequest />
					) : null}
					{menu === 'roles-permissions' ? <RolesPermissions /> : null}
				</main>
			</div>
		</div>
	);
};

Dashboard.propTypes = {
	userState: PropTypes.object.isRequired,
	newApplicants: PropTypes.func.isRequired,
	approvedApplicants: PropTypes.func.isRequired,
	rejectedApplicants: PropTypes.func.isRequired,
	hiredApplicants: PropTypes.func.isRequired,
	newJobs: PropTypes.func.isRequired,
	approvedJobs: PropTypes.func.isRequired,
	rejectedJobs: PropTypes.func.isRequired,
	getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, {
	newApplicants,
	approvedApplicants,
	rejectedApplicants,
	hiredApplicants,
	newJobs,
	approvedJobs,
	rejectedJobs,
	getUsers,
})(Dashboard);
