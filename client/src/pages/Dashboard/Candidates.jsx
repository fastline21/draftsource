import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import PreLoader from './../../layouts/PreLoader';
import CandidateItem from './CandidateItem';

const Candidates = ({ candidateState: { candidates, loading } }) => {
	if (loading || candidates === null) {
		return <PreLoader />;
	}

	return (
		<Fragment>
			{!loading && candidates.length === 0 ? (
				<p className="m-3">No candidates to show...</p>
			) : (
				candidates.map((candidate, key) => (
					<CandidateItem candidate={candidate} key={key} />
				))
			)}
		</Fragment>
	);
};

Candidates.propTypes = {
	candidateState: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	candidateState: state.candidateState,
});

export default connect(mapStateToProps)(Candidates);
