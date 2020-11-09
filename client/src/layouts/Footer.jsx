import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import draftsourceLogo from './../images/draftsource_logo.png';
import { companiesWeServeList } from '../list/CompaniesWeServe';
import { popularJobsList } from '../list/PopularJobs';
import { countriesWeServeList } from '../list/CountriesWeServe';

const Footer = () => {
	return (
		<footer id="footer">
			<Container>
				<Row>
					<Col lg="3" md="3" sm="6">
						<h6 className="title">Companies we serve</h6>
						<ul className="list">
							{companiesWeServeList().map((e, i) => (
								<li className="item" key={i}>
									{e}
								</li>
							))}
						</ul>
					</Col>
					<Col lg="3" md="3" sm="6">
						<h6 className="title">Popular jobs</h6>
						<ul className="list">
							{popularJobsList().map((e, i) => (
								<li className="item" key={i}>
									{e}
								</li>
							))}
						</ul>
					</Col>
					<Col lg="3" md="3" sm="6">
						<h6 className="title">Countries we serve</h6>
						<ul className="list">
							{countriesWeServeList().map((e, i) => (
								<li className="item" key={i}>
									{e}
								</li>
							))}
						</ul>
					</Col>
					<Col lg="3" md="3" sm="6">
						<img src={draftsourceLogo} alt="" className="img-fluid logo" />
						<p className="address">
							Draftsource Virtual is a staffing company providing top rated
							Filipino drafters to AEC companies worldwide
						</p>
						<p className="social-media">
							Follow us
							<br />
							<a
								href="https://www.facebook.com/draftsourcevirtualdotcom"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-facebook-f"></i>
							</a>
							<a
								href="https://www.instagram.com/draftsourcevirtual/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-instagram"></i>
							</a>
							<a
								href="https://www.linkedin.com/company/draftsourcevirtual/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-linkedin-in"></i>
							</a>
							<a
								href="https://www.youtube.com/channel/UCGKEYz7JLUSkXQPEI8MDh2w?disable_polymer=true"
								target="_blank"
								rel="noopener noreferrer"
							>
								<i className="fab fa-youtube"></i>
							</a>
						</p>
					</Col>
					<Col sm="12">
						<p className="policy">
							<Link to="/terms-service">Terms of Service</Link>
							<span className="mx-1">|</span>
							<Link to="/privacy-policy">Privacy Policy</Link>
						</p>
						<p className="copyright">
							Copyright <Link to="/create-resume">&copy;</Link> Draftsource
							Global Consulting Services Inc. trading as Draftsource Virtual
						</p>
						<p className="trademark">
							This site is not a part of the Upwork Inc. website. Additionally
							this is not endorsed by Upwork in any way. <br />
							Upwork is a trademark of Upwork Inc.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
