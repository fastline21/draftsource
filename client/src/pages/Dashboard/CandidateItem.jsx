import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { Carousel } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { viewResume } from './../../state/actions/candidateAction';

// Utils
import useWindowSize from './../../utils/useWindowSize';

const CandidateItem = ({ candidate, viewResume }) => {
	const {
		_id,
		resumeImage,
		firstName,
		lastName,
		city,
		dateCreated,
		specialty,
		advancedSoftware,
		intermediateSoftware,
		marketType,
		uploadWork,
		recruitmentsComment,
	} = candidate;

	const windowSize = useWindowSize();

	const [activeMiniSlide, setActiveMiniSlide] = useState(0);
	const [visibleArrow, setVisibleArrow] = useState(false);
	const specialtySoftwareRef = useRef(null);

	const miniSlideSelect = (selectedIndex) => {
		setActiveMiniSlide(selectedIndex);
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

		// eslint-disable-next-line
	}, [specialtySoftwareRef, windowSize]);

	return (
		<div className="candidate">
			<div className="profile-left">
				<div className="profile-identity">
					<div className="box-a">
						<div className="box-1">
							<img
								src={`/uploads/${resumeImage}`}
								alt="Resume"
								className="img-fluid resume-image"
							/>
						</div>
						<div className="box-2">
							<p className="firstname-lastname">
								{firstName} {lastName}
							</p>
							<p className="city">{city}</p>
						</div>
					</div>
					<div className="box-b">
						<div className="box-2">
							<p className="box-title">Date Submitted</p>
							<p className="date-time-submitted">
								{moment(dateCreated).format('MM-DD-YYYY')}
							</p>
						</div>
						<div className="box-3">
							<p className="box-title">Time Submitted</p>
							<p className="date-time-submitted">
								{moment(dateCreated).format('h:mm a')}
							</p>
						</div>
					</div>
				</div>
				<hr className="line-break" />
				<div className="specialty-software">
					{visibleArrow && (
						<button
							className="specialty-software-arrow"
							onClick={() => (specialtySoftwareRef.current.scrollLeft -= 200)}
						>
							<i className="fas fa-angle-left"></i>
						</button>
					)}
					<div className="specialty-software-list" ref={specialtySoftwareRef}>
						{specialty.map((e, i) => (
							<span className="specialty-software-item" key={i}>
								{e}
							</span>
						))}
						{advancedSoftware.map((e, i) => (
							<span className="specialty-software-item" key={i}>
								{e}
							</span>
						))}
						{intermediateSoftware.map((e, i) => (
							<span className="specialty-software-item" key={i}>
								{e}
							</span>
						))}
						{marketType.map((e, i) => (
							<span className="specialty-software-item" key={i}>
								{e}
							</span>
						))}
					</div>
					{visibleArrow && (
						<button
							className="specialty-software-arrow"
							onClick={() => (specialtySoftwareRef.current.scrollLeft += 200)}
						>
							<i className="fas fa-angle-right"></i>
						</button>
					)}
				</div>
				{recruitmentsComment && (
					<div className="recruitment-comments">
						<p className="box-title">Recruiter's Comments:</p>
						<p className="recruiters-comment">{recruitmentsComment}</p>
					</div>
				)}
				<div>
					<button className="btn btn-primary see-resume" onClick={onViewResume}>
						View Resume
					</button>
				</div>
			</div>
			<div className="profile-right">
				<div className="mini-slide shadow">
					<Carousel
						activeIndex={activeMiniSlide}
						interval={null}
						onSelect={miniSlideSelect}
						indicators={false}
						nextIcon={<i className="fas fa-caret-right" aria-hidden="true"></i>}
						prevIcon={<i className="fas fa-caret-left" aria-hidden="true"></i>}
						fade={true}
					>
						{uploadWork.images.map((e, i) => (
							<Carousel.Item key={i}>
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
};

export default connect(null, { viewResume })(CandidateItem);
