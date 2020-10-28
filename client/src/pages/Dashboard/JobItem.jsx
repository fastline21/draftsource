import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { viewJob } from './../../state/actions/jobAction';

const JobItem = ({ job, viewJob }) => {
	const initialData = {
		_id: '',
		title: '',
		description: '',
		budget: {
			min: '',
			max: '',
		},
		company: '',
		country: '',
		dateCreated: '',
	};
	const [data, setData] = useState(initialData);
	const {
		_id,
		title,
		description,
		budget,
		company,
		country,
		dateCreated,
	} = data;

	useEffect(() => {
		if (job) {
			setData(job);
		}

		// eslint-disable-next-line
	}, []);
	return (
		<div className="job">
			<div className="title-company">
				<h3 className="title">{title}</h3>
				<p className="company">{company}</p>
			</div>
			<div className="country-budget-date">
				<div>
					<p className="label">Country</p>
					<p className="country">{country}</p>
				</div>
				<div>
					<p className="label">Budget</p>
					<p className="budget">
						{budget.min} to {budget.max}/hrs
					</p>
				</div>
				<div>
					<p className="label">Date Submitted</p>
					<p className="date">{moment(dateCreated).format('MM-DD-YYYY')}</p>
				</div>
				<div>
					<p className="label">Time Submitted</p>
					<p className="date">{moment(dateCreated).format('h:mm a')}</p>
				</div>
			</div>
			<hr className="line-break" />
			<div>
				<p className="label">Job Description</p>
				<p className="description">{description}</p>
			</div>
			<div>
				<button className="link" onClick={() => viewJob(_id)}>
					View Full Details
				</button>
			</div>
		</div>
	);
};

JobItem.propTypes = {
	viewJob: PropTypes.func.isRequired,
};

export default connect(null, { viewJob })(JobItem);
