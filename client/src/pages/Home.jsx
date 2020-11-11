import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

// Components
// import { talkRecruiter } from './../components/TalkRecruiter';
import RequestSample from '../components/RequestSample';
import ScheduleDemo from './../components/ScheduleDemo';

// Actions
import { resumeStep, resumeSuccess } from './../state/actions/resumeAction';
import { jobStep, jobSuccess } from './../state/actions/jobAction';

const Home = ({
	resumeStep,
	resumeSuccess,
	jobStep,
	jobSuccess,
	resumeState: { step: resStep },
	jobState: { step: jStep },
}) => {
	const [showRequestSample, setShowRequestSample] = useState(false);
	useEffect(() => {
		if (resStep !== 0) {
			resumeStep(0);
			resumeSuccess(false);
		}

		if (jStep !== 0) {
			jobStep(0);
			jobSuccess(false);
		}

		// eslint-disable-next-line
	}, [resStep, jStep]);
	return (
		<div id="home">
			<RequestSample
				isShow={showRequestSample}
				isHide={() => setShowRequestSample(false)}
			/>
			<div style={{ height: '90vh' }}>
				<div className="h-100  align-items-center d-flex">
					<section className="sec-1">
						<h1 className="title">Don’t spend major time on minor tasks</h1>
						<p className="subtitle">
							Hire a dedicated Filipino cabinet vision drafter and estimator and
							avoid paying overpriced contractors. Delegate your shop drawing
							tasks and focus on managing your projects and closing more deals.
						</p>
						<div className="cta">
							<Button
								variant="primary"
								className="button"
								onClick={() => ScheduleDemo()}
							>
								Schedule a Demo
							</Button>
							<span>or</span>
							<Button
								variant="primary"
								className="link"
								onClick={() => setShowRequestSample(true)}
							>
								Request sample projects and price
							</Button>
							{/* <Link to="/view-candidates" className="btn btn-primary button">
								View Candidates
							</Link> */}
							{/* <button
								onClick={talkRecruiter}
								className="btn btn-primary button"
							>
								Talk to a Recruiter
							</button> */}
							{/* <Link to="/draft-job" className="link">
								Request candidates for free
							</Link> */}
						</div>
						<ul className="list">
							<li className="item">No hiring headahces</li>
							<li className="item">No interviews</li>
							<li className="item">No dramas</li>
						</ul>
					</section>
				</div>
			</div>
			{/* <Container className="h-100">
					<Row className="h-100 align-items-center">
						<Col lg={{ span: 8, offset: 2 }}>
							<h1 className="title">
								Hire Full-Time Vetted Filipino Drafters
							</h1>
							<p className="subtitle">
								Build an extension of your drafting team in the
								Philippines and get
								<br /> a very unfair advantage over your
								competitors
							</p>
							<div className="cta my-4">
								<Link
									to="/view-candidates"
									className="btn btn-primary button"
								>
									View Candidates
								</Link>
								<button
									onClick={talkRecruiter}
									className="btn btn-primary button"
								>
									Talk to a Recruiter
								</button>
							</div>
							<ul className="list">
								<li className="item">No recruitment fees</li>
								<li className="item">No salary markups</li>
								<li className="item">No underpaid staff</li>
							</ul>
						</Col>
					</Row>
				</Container> */}
			{/* </section> */}
		</div>
	);
};

Home.propTypes = {
	resumeStep: PropTypes.func.isRequired,
	jobStep: PropTypes.func.isRequired,
	resumeSuccess: PropTypes.func.isRequired,
	jobSuccess: PropTypes.func.isRequired,
	resumeState: PropTypes.object.isRequired,
	jobState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	resumeState: state.resumeState,
	jobState: state.jobState,
});

export default connect(mapStateToProps, {
	resumeStep,
	resumeSuccess,
	jobStep,
	jobSuccess,
})(Home);
