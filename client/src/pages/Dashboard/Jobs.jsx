import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import PreLoader from './../../layouts/PreLoader';
import JobItem from './JobItem';

const Jobs = ({ jobState: { jobs, loading } }) => {
	if (loading || jobs === null) {
		return <PreLoader />;
	}

	return (
		<Fragment>
			{!loading && jobs.length === 0 ? (
				<p className="m-3">No jobs to show...</p>
			) : (
				jobs.map((job, key) => <JobItem job={job} key={key} />)
			)}
		</Fragment>
	);
};

Jobs.propTypes = {
	jobState: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	jobState: state.jobState,
});

export default connect(mapStateToProps)(Jobs);
