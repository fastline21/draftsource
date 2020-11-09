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
						<h1 className="title">Experience based pricing</h1>
						<ul className="list">
							<li className="item">No recruitment fees.</li>
							<li className="item">No long term contracts.</li>
							<li className="item">14-day risk free.</li>
						</ul>
					</div>
					<Row>
						<div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12">
							<div className="card">
								<div className="card-body">
									<div className="card-content">
										<h3 className="card-title">Staff Leasing</h3>
										<p className="card-subtitle">
											Perfect plan for long term growth
										</p>
										<hr className="line-break" />
										<h3 className="card-title">USD $8-$15 per hour</h3>
										<button
											className="btn btn-primary button"
											onClick={talkRecruiter}
										>
											Talk to a Recruiter
										</button>
										<p className="card-subtitle font-italic">
											Price includes staff salary, equipment rental
											fast-internet and service fee 80-160 hours per staff per
											month; No freelancing
										</p>
										<hr className="line-break" />
										<div className="checklist">
											<h6 className="checklist-title">
												Recruitment Assistance
											</h6>
											<ul className="list">
												<li className="item">Vetted Professionals</li>
												<li className="item">English Proficient Only</li>
												<li className="item">Sourcing and Screening</li>
												<li className="item">Profile Verification</li>
												<li className="item">Staff Replacement</li>
											</ul>
										</div>
										<hr className="line-break" />
										<div className="checklist">
											<h6 className="checklist-title">Support Service</h6>
											<ul className="list">
												<li className="item">Time Tracking Access</li>
												<li className="item">
													Payroll & Government Compliance
												</li>
												<li className="item">IT Assistance</li>
												<li className="item">Onboarding Training</li>
												<li className="item">Dedicated Account Manager</li>
												<li className="item">Live Staff Monitoring</li>
												<li className="item">Dedicated HR Management</li>
											</ul>
										</div>
										<hr className="line-break" />
										<div className="checklist">
											<h6 className="checklist-title">Equipment</h6>
											<ul className="list">
												<li className="item">Laptop 8-32GB RAM i7 Processor</li>
												<li className="item">25 MBPS Internet Connection</li>
												<li className="item">Noise Cancelling Headphones</li>
												<li className="item">Software Requirements</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							{/* <div className="card">
								<div className="card-body">
									<h3 className="card-title">Remote Staffing</h3>
									<p className="subtitle">
										Contractor’s Rate + Full Management Support Service Fee
									</p>
									<hr className="line-break" />
									<h3 className="card-title">USD $6 - $11 per hour</h3>
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
											Average price includes service fee 80-160 hours per staff
											per month <br />
											No fixed based project; No freelancing
										</i>
									</p>
									<hr className="line-break" />

									<ul className="list">
										<li className="item">Mid-Senior Level Expertise</li>
										<li className="item">Sourcing and Screening</li>
										<li className="item">Profile Verification</li>
										<li className="item">Salary Negotiation</li>
										<li className="item">No Long Term Contracts</li>
										<li className="item">Unlimited Staff Replacement</li>
										<li className="item">Recruitment Assistance</li>
										<li className="item">Time Tracking Access</li>
										<li className="item">Payroll Guarantee</li>
										<li className="item">IT Assistance</li>
										<li className="item">Onboarding Training</li>
										<li className="item">Dedicated Account Manager</li>
										<li className="item">Live Staff Monitoring</li>
										<li className="item">Dedicated HR Management</li>
										<li className="item">Daily Team Huddles</li>
									</ul>
								</div>
							</div> */}
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
									In order to attract good talent, they must feel secure that
									they are working for a legit employer who can actually pay
									their salaries and not a bogus freeloader.
								</p>
								<p className="text">
									We require a one-month advance payroll for security purposes
									after the interview or before official onboarding.
								</p>
								<p className="text">
									We deduct every hour and send you weekly updates every after
									the end of the week.
								</p>
							</div>
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									How long does it take to get started?
								</h6>
								<p className="text">
									We can onboard a new hire once payment is secured in 3-5 days.
								</p>
								<p className="text">
									For sourcing and qualification of new candidates it may take
									us not more than a week, depending on how difficult the
									requirements are.
								</p>
								<p className="text">
									You may{' '}
									<Link to="/talk-recruiter">
										<u>talk to a recruiter</u>
									</Link>{' '}
									to ask for assistance. We have more applicants in our database
									that are not uploaded to our website. Or you may{' '}
									<Link to="/draft-job">
										<u>draft a job</u>
									</Link>{' '}
									to request for candidates.
								</p>
							</div>
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									Will they work according to our timezones?
								</h6>
								<p className="text">Absolutely! </p>
								<p className="text">
									We only get people who are willing to work according to your
									timezones. We don’t force people to work if they are not
									comfortable with the arrangement.
								</p>
								<p className="text">
									You will be assured that the person we will recommend will be
									happily working for you, anytime you want.
								</p>
							</div>
						</Col>
						<Col lg="6" className="mt-3">
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									What if I’m not happy with my hire?
								</h6>
								<p className="text">
									We are confident with our vetted professionals that we are
									willing to take a 7-day risk free guarantee per hire.
								</p>
								<p className="text">
									If you’re not happy with our services and the staff we
									recommend, you don’t have to pay us anything.
								</p>
								<p className="text">
									We can even replace a staff and find you the perfect staff for
									another 7-day risk free trial with no obligations whatsoever.{' '}
								</p>
							</div>
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									Are there any long term contracts?
								</h6>
								<p className="text">None! </p>
								<p className="text">
									Draftsource Virtual is a month to month basis. You can always
									scale up or down when needed.
								</p>
								<p className="text">
									We can even set up the same team every time you’ll be needing
									them.
								</p>
							</div>
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									What are your payment options?
								</h6>
								<p className="text">
									We accept all major credit cards in USD and AUD for Visa, AmEx
									and Mastercard.
								</p>
								<p className="text">For Paypal, we only accept AUD and USD.</p>
							</div>
							<div className="mb-5 mr-5">
								<h6 className="font-weight-bold mb-4">
									When will I pay Draftsource?
								</h6>
								<p className="text">
									You will receive a billing update every week and you are
									billed at the end of the 3rd week if you wish to continue
									working with your staff. You have to settle before the 4th
									week ends or it may result to termination of contract.
								</p>
								<p className="text">
									* Failure to pay on time will result to an unpaid staff and
									contract termination
								</p>
							</div>
						</Col>
					</Row>
					<Row className="task mb-5">
						<Col sm="12">
							<h1 className="title">14 Day Risk Free Guarantee</h1>
							<p className="subtitle">
								Get pre-screened candidates straight to your inbox - obligation
								free
							</p>
							<div className="cta">
								<Link to="/draft-job" className="btn btn-primary button">
									Draft a Job
								</Link>
								<button
									className="btn btn-primary button"
									onClick={talkRecruiter}
								>
									Talk to a Recruiter
								</button>
							</div>
							<ul className="list">
								<li className="item">No recruitment fees</li>
								<li className="item">No long term contracts</li>
								<li className="item">No work no pay</li>
							</ul>
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
};

export default Pricing;
