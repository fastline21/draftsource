import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MultiCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// Actions
import {
	viewResume,
	removeCandidate,
	addCandidate,
} from './../../state/actions/candidateAction';

const CandidateItem = ({
	candidate,
	viewResume,
	removeCandidate,
	addCandidate,
	candidateState: { shortlist },
}) => {
	const queryParams = new URLSearchParams(window.location.search);
	const newUrl = new URL(window.location.href);
	const history = useHistory();
	const specialtySoftwareRef = useRef(null);
	const [visibleArrow, setVisibleArrow] = useState(false);

	const {
		_id,
		resumeImage,
		firstName,
		lastName,
		city,
		availability,
		dateCreated,
		specialty,
		software,
		uploadWork,
		aboutYourself,
		rating,
		recruitmentsComment,
	} = candidate;

	const [activeMiniSlide, setActiveMiniSlide] = useState(0);

	const miniSlideSelect = (selectedIndex) => {
		setActiveMiniSlide(selectedIndex);
	};

	const onViewResume = () => {
		viewResume(_id);
	};

	const removeShortlist = (id) => {
		removeCandidate(id);

		if (history.location.pathname.includes('shortlisted-candidates')) {
			const oldQuery = queryParams.get('candidates');
			let newQuery = '';
			newQuery = oldQuery.split(',');
			newQuery = newQuery.filter((e) => e !== id);
			if (newQuery.length === 0) {
				newUrl.searchParams.delete('candidates');
			} else {
				newUrl.searchParams.set('candidates', newQuery);
			}

			history.push({
				pathname: newUrl.pathname,
				search: newUrl.search,
			});
		}
	};

	useEffect(() => {
		specialtySoftwareRef.current.scrollLeft = 0;

		if (
			specialtySoftwareRef.current.scrollWidth >
			specialtySoftwareRef.current.clientWidth
		) {
			setVisibleArrow(true);
		}
	}, [specialtySoftwareRef]);

	return (
		<div className='candidate'>
			<div className='row'>
				<div className='col-lg-9'>
					<div className='row'>
						<div className='col-lg-5'>
							<div className='profile d-flex'>
								<img
									src={`/uploads/${resumeImage}`}
									alt=''
									className='img-fluid resume-image'
								/>
								<div className=''>
									<p className='id-code'>ID Code</p>
									<audio
										controls
										controlsList='nodownload'
										className='about-yourself'
									>
										<source
											src={`/uploads/${aboutYourself}`}
										/>
										Your browser does not support the audio!
									</audio>
								</div>
							</div>
						</div>
						<div className='col'>
							<p className='title'>Availability</p>
							<p className='available'>{availability}</p>
						</div>
						<div className='col'>
							<p className='title'>English Proficiency</p>
							<i
								className={`rating-color fas fa-star${
									rating >= 1 ? ` checked` : ''
								}`}
							></i>
							<i
								className={`rating-color fas fa-star${
									rating >= 2 ? ` checked` : ''
								}`}
							></i>
							<i
								className={`rating-color fas fa-star${
									rating >= 3 ? ` checked` : ''
								}`}
							></i>
							<i
								className={`rating-color fas fa-star${
									rating >= 4 ? ` checked` : ''
								}`}
							></i>
							<i
								className={`rating-color fas fa-star${
									rating === 5 ? ` checked` : ''
								}`}
							></i>
						</div>
					</div>
					{/* <div className="d-flex justify-content-between mt-3">
                        <div className="profile flex-fill">
                            <img
                                src={`/uploads/${resumeImage}`}
                                alt=""
                                className="img-fluid resume-image"
                            />
                            <audio
                                controls
                                controlsList="nodownload"
                                className="about-yourself"
                            >
                                <source src={`/uploads/${aboutYourself}`} />
                                Your browser does not support the audio!
                            </audio>
                        </div>
                        <div className="available mr-5 flex-shrink-1">
                            <p
                                style={{
                                    fontSize: '12px',
                                    color: '#606060',
                                    marginBottom: '6px',
                                }}
                            >
                                Availability
                            </p>
                            <p className="available">{availability}</p>
                        </div>
                        <div className="available mr-5 flex-shrink-1">
                            <p>English Proficiency</p>
                            <div className="rating">
                                <i
                                    className={`rating-color fas fa-star${
                                        rating >= 1 ? ` checked` : ''
                                    }`}
                                ></i>
                                <i
                                    className={`rating-color fas fa-star${
                                        rating >= 2 ? ` checked` : ''
                                    }`}
                                ></i>
                                <i
                                    className={`rating-color fas fa-star${
                                        rating >= 3 ? ` checked` : ''
                                    }`}
                                ></i>
                                <i
                                    className={`rating-color fas fa-star${
                                        rating >= 4 ? ` checked` : ''
                                    }`}
                                ></i>
                                <i
                                    className={`rating-color fas fa-star${
                                        rating === 5 ? ` checked` : ''
                                    }`}
                                ></i>
                            </div>
                        </div>
                    </div> */}
					<hr className='line-break' />
					<div className='mb-3'>
						<div className='specialty-software-div'>
							{visibleArrow && (
								<button
									className='specialty-software-arrow'
									onClick={() =>
										(specialtySoftwareRef.current.scrollLeft -= 40)
									}
								>
									<i className='fas fa-angle-left'></i>
								</button>
							)}
							<div
								className='specialty-software'
								ref={specialtySoftwareRef}
							>
								{specialty.map((element, index) => (
									<span
										className='specialty-software-item'
										key={index}
									>
										{element}
									</span>
								))}
								{software.map((element, index) => (
									<span
										className='specialty-software-item'
										key={index}
									>
										{element}
									</span>
								))}
							</div>
							{visibleArrow && (
								<button
									className='specialty-software-arrow'
									onClick={() =>
										(specialtySoftwareRef.current.scrollLeft += 40)
									}
								>
									<i className='fas fa-angle-right'></i>
								</button>
							)}
						</div>
					</div>
					<p className='title'>Recruiter's Comments:</p>
					<p className='recruiters-comment'>{recruitmentsComment}</p>
					<button
						className='see-resume'
						onClick={() => onViewResume()}
					>
						See resume and recruiter comments &gt;
					</button>
				</div>
				<div className='col-lg-3'>
					{shortlist && shortlist.includes(_id) ? (
						<button
							onClick={() => removeShortlist(_id)}
							className='btn btn-primary button remove'
						>
							Remove from Shortlist
						</button>
					) : (
						<button
							onClick={() => addCandidate(_id)}
							className='btn btn-primary button'
						>
							Add to Shortlist
						</button>
					)}
					<div className='mini-slide shadow'>
						<Carousel
							activeIndex={activeMiniSlide}
							interval={null}
							onSelect={miniSlideSelect}
							indicators={false}
							nextIcon={
								<i
									className='fas fa-caret-right'
									aria-hidden='true'
								></i>
							}
							prevIcon={
								<i
									className='fas fa-caret-left'
									aria-hidden='true'
								></i>
							}
							fade={true}
						>
							{uploadWork.images.map((e, i) => (
								<Carousel.Item key={i}>
									<img
										src={`/uploads/${e.file}`}
										className='d-block w-100'
										alt='...'
									/>
								</Carousel.Item>
							))}
						</Carousel>
						<span className='num'>
							{activeMiniSlide + 1} of {uploadWork.images.length}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

CandidateItem.propTypes = {
	viewResume: PropTypes.func.isRequired,
	candidateState: PropTypes.object.isRequired,
	removeCandidate: PropTypes.func.isRequired,
	addCandidate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	candidateState: state.candidateState,
});

export default connect(mapStateToProps, {
	viewResume,
	removeCandidate,
	addCandidate,
})(CandidateItem);
