import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import moment from 'moment';

// Actions
import { getUsers, deleteUser } from './../../state/actions/userAction';

// Components
import PreLoader from './../../layouts/PreLoader';

const RolesPermissions = ({
	getUsers,
	deleteUser,
	userState: { users, loading },
}) => {
	const onDelete = (id) => {
		if (window.confirm('Are you sure to delete this user?')) {
			deleteUser(id);
			getUsers();
		}
	};

	return (
		<Fragment>
			<div className="top">
				<p>
					Roles allow you to set which users are allowed to perform certain
					actions within Close A role defines a group of users who have certain
					permissions within the app.
				</p>
			</div>
			{loading ? (
				<PreLoader />
			) : (
				<div className="user">
					<Table striped bordered hover>
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
										<td>{i + 1}</td>
										<td>{e.email}</td>
										<td>{e.type}</td>
										<td>{e.active ? 'Acitve' : 'Not Active'}</td>
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
		</Fragment>
	);
};

RolesPermissions.propTypes = {
	userState: PropTypes.object.isRequired,
	getUsers: PropTypes.func.isRequired,
	deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { getUsers, deleteUser })(
	RolesPermissions
);
