import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import Filter from './ViewCandidates/Filter';
import TopVerifedCandidates from './ViewCandidates/TopVerifiedCandidates';
import ShortlistedCandidates from './ViewCandidates/ShortlistedCandidates';
import { bookInterview } from './../components/BookInterview';
import { talkRecruiter } from './../components/TalkRecruiter';

// Actions
import {
    viewCandidates,
    getShortlisted,
} from './../state/actions/candidateAction';

const ViewCandidates = ({
    viewCandidates,
    getShortlisted,
    candidateState: { shortlist },
    filterState: { filter },
}) => {
    const { menu } = useParams();

    const onClick = () => {
        getShortlisted(shortlist);
    };

    useEffect(() => {
        if (menu === 'top-verified-candidates') {
            viewCandidates();
        }

        if (menu === 'shortlisted-candidates') {
            viewCandidates();
        }

        // eslint-disable-next-line
    }, [menu, filter]);

    return (
        <div id="viewCandidates">
            <div className="container-fluid">
                <div className="header">
                    {menu === 'top-verified-candidates' && (
                        <Fragment>
                            <h2 className="title">Top Verifed Candidates</h2>
                            <Link
                                className="btn btn-primary button"
                                to={`/view-candidates/shortlisted-candidates${
                                    shortlist.length > 0
                                        ? `?candidates=${shortlist.join(',')}`
                                        : ''
                                }`}
                                onClick={onClick}
                            >
                                Shortlisted Candidates
                            </Link>
                        </Fragment>
                    )}
                    {menu === 'shortlisted-candidates' && (
                        <Fragment>
                            <h2 className="title">
                                Your Shortlisted Candidates{' '}
                                <sup>({shortlist.length})</sup>
                            </h2>
                            <button
                                className="btn btn-primary button"
                                onClick={() => bookInterview()}
                            >
                                Book an Interview
                            </button>
                        </Fragment>
                    )}
                </div>
                <div className="line-break" />
                <div className="row">
                    <nav className="d-none d-sm-block col-sm-2 sidebar">
                        <Filter loadData={viewCandidates} />
                    </nav>
                    <main className="col-sm-10 main">
                        {menu === 'top-verified-candidates' && (
                            <TopVerifedCandidates />
                        )}
                        {menu === 'shortlisted-candidates' && (
                            <ShortlistedCandidates />
                        )}
                    </main>
                </div>
                {menu === 'top-verified-candidates' && (
                    <div className="row">
                        <div className="col-lg-12">
                            <footer>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-9 text-right">
                                            <h1 className="title">
                                                Didn’t see the talent you’re
                                                looking for?
                                            </h1>
                                        </div>
                                        <div className="col-lg-3">
                                            <button
                                                className="btn btn-primary button"
                                                onClick={talkRecruiter}
                                            >
                                                Talk to a Recruiter
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

ViewCandidates.propTypes = {
    viewCandidates: PropTypes.func.isRequired,
    filterState: PropTypes.object.isRequired,
    candidateState: PropTypes.object.isRequired,
    getShortlisted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    filterState: state.filterState,
    candidateState: state.candidateState,
});

export default connect(mapStateToProps, {
    viewCandidates,
    getShortlisted,
})(ViewCandidates);
