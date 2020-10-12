import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Components
import { talkRecruiter } from './../components/TalkRecruiter';

const Pricing = () => {
	return (
		<div id="pricing">
			<section className="sec-1">
				<Container>
					<div className="head">
						<h1 className="title">Transparent Pricing</h1>
						<ul className="list">
							<li className="item">No recruitment fees.</li>
							<li className="item">No salary markups.</li>
							<li className="item">No underpaid staff.</li>
						</ul>
					</div>
					<Row>
						<div className="col-lg-6 offset-lg-3">
							<div className="card">
								<div className="card-body">
									<h3 className="card-title">
										Remote Staffing
									</h3>
									<p className="subtitle">
										Contractor’s Rate + Full Management
										Support Service Fee
									</p>
									<hr className="line-break" />
									<h3 className="card-title">
										USD $6 - $11 per hour
									</h3>
									<button
										className="btn btn-primary button"
										onClick={talkRecruiter}
									>
										Talk to a Recruiter
									</button>
									<p
										className="subtitle pt-3 pb-1"
										style={{
											marginLeft: '44px',
											marginRight: '50px',
										}}
									>
										<i>
											Average price includes service fee
											80-160 hours per staff per month{' '}
											<br />
											No fixed based project; No
											freelancing
										</i>
									</p>
									<hr className="line-break" />

									<ul className="list">
										<li className="item">
											Mid-Senior Level Expertise
										</li>
										<li className="item">
											Sourcing and Screening
										</li>
										<li className="item">
											Profile Verification
										</li>
										<li className="item">
											Salary Negotiation
										</li>
										<li className="item">
											No Long Term Contracts
										</li>
										<li className="item">
											Unlimited Staff Replacement
										</li>
										<li className="item">
											Recruitment Assistance
										</li>
										<li className="item">
											Time Tracking Access
										</li>
										<li className="item">
											Payroll Guarantee
										</li>
										<li className="item">IT Assistance</li>
										<li className="item">
											Onboarding Training
										</li>
										<li className="item">
											Dedicated Account Manager
										</li>
										<li className="item">
											Live Staff Monitoring
										</li>
										<li className="item">
											Dedicated HR Management
										</li>
										<li className="item">
											Daily Team Huddles
										</li>
									</ul>
								</div>
							</div>
						</div>
					</Row>
					<Row className="question">
						<Col lg="12">
							<h1 className="text-center mt-3 mb-5">
								Common Questions and Concerns
							</h1>
						</Col>
						<Col lg="6" className="mt-3">
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									Are we required to pay in advance?
								</h6>
								<p className="text">Yes!</p>
								<p className="text">
									In order to attract good talent, they must
									feel secure that they are working for a
									legit employer who can actually pay and not
									a bogus freeloader.
								</p>
								<p className="text">
									We require a one-month advance payroll for
									security purposes after the interview or
									before official onboarding.
								</p>
								<p className="text">
									We deduct every hour and send you weekly
									updates every after the end of the week.
								</p>
								<p className="text">
									If you wish to continue, simple pay in
									advance for the following month before the
									4th week starts.
								</p>
							</div>
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									How long does it take to get started?
								</h6>
								<p className="text">
									We can onboard a new hire once payment is
									secured in 3-5 days.
								</p>
								<p className="text">
									For sourcing and qualification of new
									candidates it may takes us not more than 2
									weeks, depending on how difficult the
									requirements are.
								</p>
								<p className="text">
									You can{' '}
									<Link to="/draft-job">
										<u>draft a job</u>
									</Link>{' '}
									if you already have someone in mind or you{' '}
									<Link to="/talk-recruiter">
										<u>talk to a recruiter</u>
									</Link>{' '}
									to ask for assistance. We have more
									applicants in our database that are not
									uploaded onsite.
								</p>
							</div>
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									Will they work according to our timezones?
								</h6>
								<p className="text">Absolutely!</p>
								<p className="text">
									We only get people who are willing to work
									according to your timezones. We don’t force
									people to work if they are not comfortable
									with the arrangement.
								</p>
								<p className="text">
									You will be assured that the person we will
									recommend will be happily working for you,
									anytime you want.
								</p>
							</div>
						</Col>
						<Col lg="6" className="mt-3">
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									What if I’m not happy with my hire?
								</h6>
								<p className="text">
									We are absolutely convinced with the staff
									that we will recommend. It usually takes an
									average of 2-3 weeks for a staff to adapt to
									a remote working environment and it takes
									the same time for people who are new to
									remote working like you.
								</p>
								<p className="text">
									But in the off chance you’re not completely
									happy, we’ll do whatever we can to fix it.
									You can even have a strategy session with
									our Founder for free.
								</p>
							</div>
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									Are there any long term contracts?
								</h6>
								<p className="text">None!</p>
								<p className="text">
									Draftsoure Virtual is a month to month
									basis. You can replace your staff until you
									find the right fit.
								</p>
								<p className="text">
									You can replace a staff after serving for a
									minimum of 40 hours or 5 days working for
									you. Not unless that person wasn’t able to
									provide you for what you’re require them, we
									will have to replace that staff immediately
								</p>
							</div>
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									What are your payment options?
								</h6>
								<p className="text">
									We accept all major credit cards in USD and
									AUD for Visa, AmEx and Mastercard.
								</p>
								<p className="text">
									For Paypal, we only accept AUD and USD.
								</p>
							</div>
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									When will I pay Draftsource?
								</h6>
								<p className="text">
									You will receive a billing update every week
									and you are billed at the end of the 3rd
									week if you wish to continue working with
									your staff. You have to settle before the
									4th week ends or it may result to
									termination of contract.
								</p>
								<p className="text">
									Unconsumed hours will be returned within 5
									days upon end of a 4 week period.
								</p>
							</div>
						</Col>
					</Row>
					<Row className="task mb-5">
						<Col sm="12">
							<h1 className="title">
								Build an extension of your drafting team and
								focus on closing more projects
							</h1>
							<div className="cta mt-4">
								<Link
									to="/view-candidates"
									className="btn btn-primary button"
								>
									View Candidates
								</Link>
								<button
									className="btn btn-primary button"
									onClick={talkRecruiter}
								>
									Talk to a Recruiter
								</button>
							</div>
							<ul className="list mt-3">
								<li className="item">No hiring headcaches</li>
								<li className="item">No interviews</li>
								<li className="item">No dramas</li>
							</ul>
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
};

export default Pricing;
