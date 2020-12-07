import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

// Actions
import { getUsers, deleteUser } from './../../state/actions/userAction';
import { addFilter } from './../../state/actions/filterAction';

// Components
import PreLoader from './../../layouts/PreLoader';
import PaginationLink from './PaginationLink';

// Utils
import useWindowSize from './../../utils/useWindowSize';

const RolesPermissions = ({
	getUsers,
	deleteUser,
	addFilter,
	userState: { users, loading },
}) => {
	const queryParams = new URLSearchParams(window.location.search);
	const newUrl = new URL(window.location.href);
	const history = useHistory();
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState({
		search: '',
		viewBy: '10',
	});
	const windowSize = useWindowSize();
	const onChange = (e) => {
		const { name, value } = e.target;

		if (value === '') {
			newUrl.searchParams.delete(name);
		} else {
			newUrl.searchParams.set(name, value);
		}

		setParams({ ...params, [name]: value });

		if (name === 'limit') {
			addFilter({ [name]: parseInt(value) });
		} else {
			addFilter({ [name]: value });
		}

		if (queryParams.get('page')) {
			newUrl.searchParams.set('page', 1);
		}

		history.push({
			pathname: newUrl.pathname,
			search: newUrl.search,
		});

		getUsers();
	};
	const onDelete = (id) => {
		if (window.confirm('Are you sure to delete this user?')) {
			deleteUser(id);
		}
	};
	useEffect(() => {
		if (windowSize.width > 1023) {
			document.getElementById('filterMobile').removeAttribute('style');
			document.getElementById('mobileOverlay1').removeAttribute('style');
		}

		if (showFilter) {
			document.getElementById('filterMobile').style.left = 0;
			document.getElementById('mobileOverlay1').style.cssText =
				'visibility: visible; opacity: 1';
			setShowFilter(false);
		}

		// eslint-disable-next-line
	}, [showFilter, windowSize]);

	return (
		<Fragment>
			<div className="top align-items-baseline">
				<p className="head-title">
					Roles allow you to set which users are allowed to perform certain
					actions within Close A role defines a group of users who have certain
					permissions within the app.
				</p>
				<div className="view-by">
					<button
						className="btn btn-primary button filter"
						onClick={() => setShowFilter(true)}
					>
						<i className="fas fa-filter"></i> Filter
					</button>
				</div>
			</div>
			{loading ? (
				<PreLoader />
			) : (
				<div className="user">
					<Table responsive striped bordered hover>
						<thead>
							<tr>
								<th>#</th>
								<th>Email</th>
								<th>Type</th>
								<th>Status</th>
								<th>Have Resume</th>
								<th>Date Created</th>
								<th style={{ textAlign: 'center' }}>Action</th>
							</tr>
						</thead>
						<tbody>
							{users &&
								users.map((e, i) => (
									<tr key={i}>
										<td>
											{(queryParams.get('limit')
												? parseInt(queryParams.get('limit'))
												: 10) *
												((queryParams.get('page')
													? parseInt(queryParams.get('page'))
													: 1) -
													1) +
												(i + 1)}
										</td>
										<td>{e.email}</td>
										<td>{e.type}</td>
										<td>{e.active ? 'Active' : 'Not Active'}</td>
										<td>{e.haveResume ? 'Yes' : 'No'}</td>
										<td>
											{moment(e.dateCreated).format('MMMM DD, YYYY, h:mm:ss a')}
										</td>
										<td style={{ textAlign: 'center' }}>
											<i
												className="fas fa-trash-alt"
												style={{ cursor: 'pointer' }}
												onClick={() => onDelete(e._id)}
											></i>
										</td>
									</tr>
								))}
						</tbody>
					</Table>
				</div>
			)}
			<div className="foot">
				<PaginationLink loadUser={getUsers} type="User" />
				<div className="view-by">
					<label htmlFor="viewByInput" className="form-label">
						View By
					</label>
					<select
						className="form-control input"
						name="limit"
						onChange={onChange}
						value={parseInt(queryParams.get('limit') || params.viewBy)}
					>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
					</select>
				</div>
			</div>
		</Fragment>
	);
};

RolesPermissions.propTypes = {
	userState: PropTypes.object.isRequired,
	getUsers: PropTypes.func.isRequired,
	deleteUser: PropTypes.func.isRequired,
	addFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { getUsers, deleteUser, addFilter })(
	RolesPermissions
);
