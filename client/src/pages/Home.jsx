import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import { talkRecruiter } from './../components/TalkRecruiter';

const Home = () => {
    return (
        <div id="home">
            <section className="sec-1">
                <Container className="h-100">
                    <Row className="h-100 align-items-center">
                        <Col lg={{ span: 8, offset: 2 }}>
                            <h1 className="title">
                                Hire Full-Time Dedicated Filipino CAD Drafter,
                                Quantity Surveyors & More
                            </h1>
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

export default Home;
