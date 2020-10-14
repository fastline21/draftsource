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
	getShortlisted,
} from './../../state/actions/candidateAction';

// Utils
import useWindowSize from './../../utils/useWindowSize';

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
	const windowSize = useWindowSize();

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
		idCode,
		headline,
	} = candidate;

	const [activeMiniSlide, setActiveMiniSlide] = useState(0);

	const miniSlideSelect = (selectedIndex) => {
		setActiveMiniSlide(selectedIndex);
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

	const onViewResume = () => {
		viewResume(_id);
	};

	useEffect(() => {
		specialtySoftwareRef.current.scrollLeft = 0;

		if (
			specialtySoftwareRef.current.scrollWidth >
			specialtySoftwareRef.current.clientWidth
		) {
			setVisibleArrow(true);
		} else {
			setVisibleArrow(false);
		}
	}, [specialtySoftwareRef, windowSize]);

	return (
		<div className="candidate">
			<div className="profile-left">
				<div className="profile-identity" onClick={onViewResume}>
					<div className="box-1">
						<img
							src={`/uploads/${resumeImage}`}
							alt="Resume Image"
							className="img-fluid resume-image"
						/>
					</div>
					<div className="box-2">
						<p className="id-code">
							ID: {idCode.toString().padStart(6, '0')}
						</p>
						<p className="headline">{headline}</p>
					</div>
				</div>
				<div className="profile-stats" onClick={onViewResume}>
					<div className="box-1">
						<audio
							controls
							className="about-yourself"
							controlsList="nodownload"
						>
							<source src={`/uploads/${aboutYourself}`} />
						</audio>
					</div>
					<div className="box-2">
						<p className="box-label">Availability:</p>
						<p className="availability">{availability}</p>
					</div>
					<div className="box-3">
						<p className="box-label">English Profiecy</p>
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
				</div>
				<hr className="line-break" onClick={onViewResume} />
				<div className="specialty-software">
					{visibleArrow && (
						<button
							className="specialty-software-arrow"
							onClick={() =>
								(specialtySoftwareRef.current.scrollLeft -= 200)
							}
						>
							<i className="fas fa-angle-left"></i>
						</button>
					)}
					<div
						className="specialty-software-list"
						ref={specialtySoftwareRef}
						onClick={onViewResume}
					>
						{specialty.map((e, i) => (
							<span className="specialty-software-item" key={i}>
								{e}
							</span>
						))}
						{software.map((e, i) => (
							<span className="specialty-software-item" key={i}>
								{e}
							</span>
						))}
					</div>
					{visibleArrow && (
						<button
							className="specialty-software-arrow"
							onClick={() =>
								(specialtySoftwareRef.current.scrollLeft += 200)
							}
						>
							<i className="fas fa-angle-right"></i>
						</button>
					)}
				</div>
				<div className="recruitment-comments" onClick={onViewResume}>
					<p className="box-label">Recruiter's Comments:</p>
					<p className="recruiters-comment">{recruitmentsComment}</p>
				</div>
				<div onClick={onViewResume}>
					<button className="btn btn-primary see-resume">
						See Full Profile and Recruiter Comments
					</button>
				</div>
			</div>
			<div className="profile-right">
				{shortlist && shortlist.includes(_id) ? (
					<button
						className="btn btn-primary btn-block button remove"
						onClick={() => removeShortlist(_id)}
					>
						Remove from Shortlist
					</button>
				) : (
					<button
						className="btn btn-primary btn-block button"
						onClick={() => {
							addCandidate(_id);
						}}
					>
						Add to Shortlist
					</button>
				)}
				<div className="mini-slide shadow">
					<Carousel
						activeIndex={activeMiniSlide}
						interval={null}
						onSelect={miniSlideSelect}
						indicators={false}
						nextIcon={
							<i
								className="fas fa-caret-right"
								aria-hidden="true"
							></i>
						}
						prevIcon={
							<i
								className="fas fa-caret-left"
								aria-hidden="true"
							></i>
						}
						fade={true}
					>
						{uploadWork.images.map((e, i) => (
							<Carousel.Item key={i} onClick={onViewResume}>
								<img src={`/uploads/${e.file}`} alt="..." />
							</Carousel.Item>
						))}
					</Carousel>
					<span className="num">
						{activeMiniSlide + 1} of {uploadWork.images.length}
					</span>
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
