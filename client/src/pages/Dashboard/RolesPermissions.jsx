import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import moment from 'moment';
// Actions
import { getUsers } from './../../state/actions/userAction';

const RolesPermissions = ({ getUsers, user: { users } }) => {
	const onDelete = (id) => {
		console.log(id);
	};

	useEffect(() => {
		getUsers();
	}, [users]);

	return (
		<div id="admin">
			<div className="header">
				<p>
					Roles allow you to set which users are allowed to perform
					certain actions within Close A role defines a group of users
					who have certain permissions within the app.
				</p>
			</div>
			<div className="roles-permissions">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Email</th>
							<th>Type</th>
							<th>Status</th>
							<th>Date Created</th>
							<th style={{ textAlign: 'center' }}>Action</th>
						</tr>
					</thead>
					<tbody>
						{users &&
							users.map((e, i) => (
								<tr key={i}>
									<td>{i}</td>
									<td>{e.email}</td>
									<td>{e.type}</td>
									<td>
										{e.active ? 'Acitve' : 'Not Active'}
									</td>
									<td>
										{moment(e.dateCreated).format(
											'MMMM DD, YYYY, h:mm:ss a'
										)}
									</td>
									<td style={{ textAlign: 'center' }}>
										<i
											className="fas fa-trash-alt"
											style={{ cursor: 'pointer' }}
											onClick={onDelete}
										></i>
									</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

RolesPermissions.propTypes = {
	user: PropTypes.object.isRequired,
	getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.userState,
});

export default connect(mapStateToProps, { getUsers })(RolesPermissions);
