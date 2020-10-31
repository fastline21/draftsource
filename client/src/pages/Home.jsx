import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
// import { talkRecruiter } from './../components/TalkRecruiter';

// Actions
import { resumeStep, resumeSuccess } from './../state/actions/resumeAction';

const Home = ({
	resumeStep,
	resumeSuccess,
	resumeState: { step: resStep },
}) => {
	useEffect(() => {
		if (resStep !== 0) {
			resumeStep(0);
			resumeSuccess(false);
		}
	}, [resStep]);
	return (
		<div id="home">
			<div style={{ height: '90vh' }}>
				<div className="h-100  align-items-center d-flex">
					<section className="sec-1">
						<h1 className="title">
							Supercharge your drafting projects with Draftsource
						</h1>
						<p className="subtitle">
							Hire full-time vetted Filipino drafters and avoid screening
							high-stacks of unqualified resumes. Draftsource eliminates hiring
							headaches, recruitment risks and remote worker dramas.
						</p>
						<div className="cta">
							<Link to="/view-candidates" className="btn btn-primary button">
								View Candidates
							</Link>
							<span>or</span>
							{/* <button
								onClick={talkRecruiter}
								className="btn btn-primary button"
							>
								Talk to a Recruiter
							</button> */}
							<Link to="/draft-job" className="link">
								Request candidates for free
							</Link>
						</div>
						<ul className="list">
							<li className="item">No recruitment fees</li>
							<li className="item">No long term contracts</li>
							<li className="item">No work no pay</li>
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
	resumeSuccess: PropTypes.func.isRequired,
	resumeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	resumeState: state.resumeState,
});

export default connect(mapStateToProps, { resumeStep, resumeSuccess })(Home);
