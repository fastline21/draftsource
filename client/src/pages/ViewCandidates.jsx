import React, { Fragment, useEffect, useState } from 'react';
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
import BookInterviewModal from './ViewCandidates/BookInterviewModal';

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
	const [showBookInterview, setShowBookInterview] = useState(false);

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
	}, [menu]);

	return (
		<div id="viewCandidates">
			<div className="head">
				{menu === 'top-verified-candidates' && (
					<Fragment>
						<h2 className="title">Top Verifed Candidates</h2>
						<Link
							className="btn btn-primary button"
							to={`/view-candidates/shortlisted-candidates${
								shortlist.length > 0 ? `?candidates=${shortlist.join(',')}` : ''
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
							Your Shortlisted Candidates <sup>({shortlist.length})</sup>
						</h2>
						<button
							className="btn btn-primary button book-interview"
							// onClick={() => bookInterview()}
							onClick={() => setShowBookInterview(true)}
						>
							Book an Interview
						</button>
					</Fragment>
				)}
			</div>
			<BookInterviewModal
				isShow={showBookInterview}
				isHide={() => setShowBookInterview(!showBookInterview)}
				agree={() => bookInterview()}
			/>
			<div className="content">
				<div id="filterMobile" className="sidebar d-block px-3">
					<a
						className="mobile-close"
						href="/"
						onClick={(e) => {
							e.preventDefault();
							document.getElementById('filterMobile').removeAttribute('style');
							document
								.getElementById('mobileOverlay1')
								.removeAttribute('style');
						}}
					>
						CLOSE X
					</a>
					<Filter loadData={viewCandidates} />
				</div>
				<nav className="sidebar">
					<Filter loadData={viewCandidates} />
				</nav>
				<main className="main">
					{menu === 'top-verified-candidates' && <TopVerifedCandidates />}
					{menu === 'shortlisted-candidates' && <ShortlistedCandidates />}
				</main>
			</div>
			{menu === 'top-verified-candidates' && (
				<div className="talk-recruiter">
					<h1 className="title">Didn’t see the talent you’re looking for?</h1>
					<p className="subtitle">
						Get pre-screened candidates straight to your inbox - obligation free
					</p>
					<div className="cta">
						<Link to="/draft-job" className="btn btn-primary button">
							Draft a Job
						</Link>
						<button className="btn btn-primary button" onClick={talkRecruiter}>
							Talk to a Recruiter
						</button>
					</div>
					<ul className="list">
						<li className="item">No recruitment fees</li>
						<li className="item">No long term contracts</li>
						<li className="item">No work no pay</li>
					</ul>
				</div>
				// <div className="row">
				// 	<div className="col-lg-12">
				// 		<footer>
				// 			<div className="container">
				// 				<div className="row">
				// 					<div className="col-lg-9 text-right">
				// 						<h1 className="title">
				// 							Didn’t see the talent you’re looking
				// 							for?
				// 						</h1>
				// 					</div>
				// 					<div className="col-lg-3">
				// 						<button
				// 							className="btn btn-primary button"
				// 							onClick={talkRecruiter}
				// 						>
				// 							Talk to a Recruiter
				// 						</button>
				// 					</div>
				// 				</div>
				// 			</div>
				// 		</footer>
				// 	</div>
				// </div>
			)}
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
