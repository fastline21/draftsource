import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import PreLoader from './../../layouts/PreLoader';
import CandidateItem from './CandidateItem';

const Candidates = ({
    candidateState: { candidates, loading, shortlistedInfo, shortlist },
    isShortlisted,
}) => {
    if ((!isShortlisted && loading) || candidates === null) {
        return <PreLoader />;
    }

    if ((isShortlisted && loading) || shortlistedInfo === null) {
        return <PreLoader />;
    }

    return (
        <Fragment>
            {isShortlisted ? (
                !loading && shortlistedInfo.length === 0 ? (
                    <p>No candidates to show...</p>
                ) : (
                    shortlistedInfo.map((shortlistInfo, key) => (
                        <CandidateItem candidate={shortlistInfo} key={key} />
                    ))
                )
            ) : !loading && candidates.length === 0 ? (
                <p>No candidates to show...</p>
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
