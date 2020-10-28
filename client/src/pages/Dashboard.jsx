import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import {
	approvedApplicants,
	newApplicants,
	rejectedApplicants,
} from './../state/actions/candidateAction';
import {
	newJobs,
	approvedJobs,
	rejectedJobs,
} from './../state/actions/jobAction';
import { getUsers } from './../state/actions/userAction';

// Components
import Filter from './Dashboard/Filter';
import NewApplicants from './Dashboard/NewApplicants';
import ApprovedApplicants from './Dashboard/ApprovedApplicants';
import RejectedApplicants from './Dashboard/RejectedApplicants';
import JobRequest from './Dashboard/JobRequest';
import ApprovedJobs from './Dashboard/ApprovedJobs';
import RejectedJobs from './Dashboard/RejectedJobs';
import RolesPermissions from './Dashboard/RolesPermissions';
import Fullname from './Dashboard/Fullname';

const Dashboard = ({
	newApplicants,
	approvedApplicants,
	rejectedApplicants,
	newJobs,
	approvedJobs,
	rejectedJobs,
	getUsers,
	userState: { user, info },
	filterState: { filter },
}) => {
	const { menu } = useParams();
	const location = useLocation();
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (menu === 'new-applicants') {
			newApplicants();
		} else if (menu === 'approved-applicants') {
			approvedApplicants();
		} else if (menu === 'rejected-applicants') {
			rejectedApplicants();
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
									New Job Request
								</Link>
							</li>
							<li
								className={`nav-item sidebar-item${
									menu === 'approved-jobs' ? ' active' : ''
								}`}
							>
								<Link to="/dashboard/approved-jobs" className="nav-link">
									Approved Job Request
								</Link>
							</li>
							<li
								className={`nav-item sidebar-item${
									menu === 'rejected-jobs' ? ' active' : ''
								}`}
							>
								<Link to="/dashboard/rejected-jobs" className="nav-link">
									Rejected Job Request
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
									<Link to="/dashboard/roles-permissions" className="nav-link">
										Roles & Permissions
									</Link>
								</li>
							</ul>
						</div>
					)}
				</nav>
				<main className="main">
					{menu === 'new-applicants' ? <NewApplicants /> : null}
					{menu === 'approved-applicants' ? <ApprovedApplicants /> : null}
					{menu === 'rejected-applicants' ? <RejectedApplicants /> : null}
					{menu === 'new-jobs' ||
					menu === 'approved-jobs' ||
					menu === 'rejected-jobs' ? (
						<JobRequest />
					) : null}
					{/* {menu === '' ? <ApprovedJobs /> : null} */}
					{/* {menu === 'rejected-jobs' ? <RejectedJobs /> : null} */}
					{menu === 'roles-permissions' ? <RolesPermissions /> : null}
				</main>
			</div>
		</div>
		// <div id="dashboard">
		// 	<div className="container-fluid">
		// 		<div className="header">
		// 			<h2 className="title">
		// 				Welcome,{' '}
		// 				<span>
		// 					{firstName} {lastName}
		// 				</span>
		// 			</h2>
		// 			<div className="line-break" />
		// 		</div>
		// 		<div className="row">
		// 			<nav className="d-none d-sm-block col-sm-2 sidebar">
		// 				<div className="remote-worker">
		// 					<h5 className="title">Remote Worker</h5>
		// 					<ul className="nav flex-column">
		// 						<li
		// 							className={`nav-item sidebar-item${
		// 								menu === 'new-applicants'
		// 									? ' active'
		// 									: ''
		// 							}`}
		// 						>
		// 							<Link
		// 								to="/dashboard/new-applicants"
		// 								className="nav-link"
		// 							>
		// 								New Applicants{' '}
		// 								<i
		// 									className={`fas fa-${
		// 										menu === 'new-applicants'
		// 											? 'angle-up'
		// 											: 'angle-down'
		// 									} float-right pt-1`}
		// 								></i>
		// 							</Link>
		// 							{menu === 'new-applicants' ? (
		// 								<Filter loadData={newApplicants} />
		// 							) : null}
		// 						</li>
		// 						<li
		// 							className={`nav-item sidebar-item${
		// 								menu === 'approved-applicants'
		// 									? ' active'
		// 									: ''
		// 							}`}
		// 						>
		// 							<Link
		// 								to="/dashboard/approved-applicants"
		// 								className="nav-link"
		// 							>
		// 								Approved Applicants{' '}
		// 								<i
		// 									className={`fas fa-${
		// 										menu === 'approved-applicants'
		// 											? 'angle-up'
		// 											: 'angle-down'
		// 									} float-right pt-1`}
		// 								></i>
		// 							</Link>
		// 							{menu === 'approved-applicants' ? (
		// 								<Filter loadData={approvedApplicants} />
		// 							) : null}
		// 						</li>
		// 						<li
		// 							className={`nav-item sidebar-item${
		// 								menu === 'rejected-applicants'
		// 									? ' active'
		// 									: ''
		// 							}`}
		// 						>
		// 							<Link
		// 								to="/dashboard/rejected-applicants"
		// 								className="nav-link"
		// 							>
		// 								Rejected Appplicants{' '}
		// 								<i
		// 									className={`fas fa-${
		// 										menu === 'rejected-applicants'
		// 											? 'angle-up'
		// 											: 'angle-down'
		// 									} float-right pt-1`}
		// 								></i>
		// 							</Link>
		// 							{menu === 'rejected-applicants' ? (
		// 								<Filter loadData={rejectedApplicants} />
		// 							) : null}
		// 						</li>
		// 					</ul>
		// 				</div>
		// 				<div className="employer">
		// 					<h5 className="title">Employer</h5>
		// 					<ul className="nav flex-column">
		// 						<li
		// 							className={`nav-item sidebar-item${
		// 								menu === 'new-jobs' ? ' active' : ''
		// 							}`}
		// 						>
		// 							<Link
		// 								to="/dashboard/new-jobs"
		// 								className="nav-link"
		// 							>
		// 								New Job Request
		// 							</Link>
		// 						</li>
		// 						<li
		// 							className={`nav-item sidebar-item${
		// 								menu === 'approved-jobs'
		// 									? ' active'
		// 									: ''
		// 							}`}
		// 						>
		// 							<Link
		// 								to="/dashboard/approved-jobs"
		// 								className="nav-link"
		// 							>
		// 								Approved Job Request
		// 							</Link>
		// 						</li>
		// 						<li
		// 							className={`nav-item sidebar-item${
		// 								menu === 'rejected-jobs'
		// 									? ' active'
		// 									: ''
		// 							}`}
		// 						>
		// 							<Link
		// 								to="/dashboard/rejected-jobs"
		// 								className="nav-link"
		// 							>
		// 								Rejected Job Request
		// 							</Link>
		// 						</li>
		// 					</ul>
		// 				</div>
		// 				{user && user.type === 'Admin' && (
		// 					<div className="settings">
		// 						<h5 className="title">Settings</h5>
		// 						<ul className="nav flex-column">
		// 							<li
		// 								className={`nav-item sidebar-item${
		// 									menu === 'roles-permissions'
		// 										? ' active'
		// 										: ''
		// 								}`}
		// 							>
		// 								<Link
		// 									to="/dashboard/roles-permissions"
		// 									className="nav-link"
		// 								>
		// 									Roles & Permissions
		// 								</Link>
		// 							</li>
		// 						</ul>
		// 					</div>
		// 				)}
		// 			</nav>
		// 			<main className="col-sm-10 main">
		// 				{menu === 'new-applicants' ? <NewApplicants /> : null}
		// 				{menu === 'approved-applicants' ? (
		// 					<ApprovedApplicants />
		// 				) : null}
		// 				{menu === 'rejected-applicants' ? (
		// 					<RejectedApplicants />
		// 				) : null}
		// 				{menu === 'new-jobs' ? <NewJobs /> : null}
		// 				{menu === 'approved-jobs' ? <ApprovedJobs /> : null}
		// 				{menu === 'rejected-jobs' ? <RejectedJobs /> : null}
		// 				{menu === 'roles-permissions' ? (
		// 					<RolesPermissions />
		// 				) : null}
		// 			</main>
		// 		</div>
		// 	</div>
		// </div>
	);
};

Dashboard.propTypes = {
	userState: PropTypes.object.isRequired,
	newApplicants: PropTypes.func.isRequired,
	approvedApplicants: PropTypes.func.isRequired,
	rejectedApplicants: PropTypes.func.isRequired,
	filterState: PropTypes.object.isRequired,
	newJobs: PropTypes.func.isRequired,
	approvedJobs: PropTypes.func.isRequired,
	rejectedJobs: PropTypes.func.isRequired,
	getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
	filterState: state.filterState,
});

export default connect(mapStateToProps, {
	newApplicants,
	approvedApplicants,
	rejectedApplicants,
	newJobs,
	approvedJobs,
	rejectedJobs,
	getUsers,
})(Dashboard);
