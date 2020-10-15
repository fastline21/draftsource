import React, { useState, useRef, useEffect, Fragment } from 'react';
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
		availability,
		dateCreated,
		specialty,
		software,
		uploadWork,
		recruitmentsComment,
		idCode,
		headline,
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
	}, [specialtySoftwareRef, windowSize]);

	return (
		<div className="candidate">
			<div className="profile-left">
				<div className="profile-identity">
					<div className="box-a">
						<div className="box-1">
							<img
								src={`/uploads/${resumeImage}`}
								alt="Resume Image"
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
						<div className="box-1">
							<p className="box-title">Availability</p>
							<p className="availability">{availability}</p>
						</div>
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
				{recruitmentsComment && (
					<div className="recruitment-comments">
						<p className="box-title">Recruiter's Comments:</p>
						<p className="recruiters-comment">
							{recruitmentsComment}
						</p>
					</div>
				)}
				<div>
					<button
						className="btn btn-primary see-resume"
						onClick={onViewResume}
					>
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
		// <div className="candidate">
		// 	<div className="row">
		// 		<div className="col-lg-9">
		// 			<div className="d-flex justify-content-between mt-3">
		// 				<div className="profile flex-fill">
		// 					<img
		// 						src={`/uploads/${resumeImage}`}
		// 						alt=""
		// 						className="img-fluid"
		// 					/>
		// 					<p className="name">
		// 						{firstName} {lastName}
		// 					</p>
		// 					<span className="address">{city}</span>
		// 				</div>
		// 				<div className="available mr-5 flex-shrink-1">
		// 					<p
		// 						style={{
		// 							fontSize: '12px',
		// 							color: '#606060',
		// 							marginBottom: '6px',
		// 							textAlign: 'center',
		// 						}}
		// 					>
		// 						Availability
		// 					</p>
		// 					<p className="available">{availability}</p>
		// 				</div>
		// 				<div className="submitted mr-5 flex-shrink-1">
		// 					<p
		// 						style={{
		// 							fontSize: '12px',
		// 							color: '#606060',
		// 							marginBottom: '6px',
		// 						}}
		// 					>
		// 						Date Submitted
		// 					</p>
		// 					{moment(dateCreated).format('MM-DD-YYYY')}
		// 				</div>
		// 				<div className="submitted flex-shrink-1">
		// 					<p
		// 						style={{
		// 							fontSize: '12px',
		// 							color: '#606060',
		// 							marginBottom: '6px',
		// 						}}
		// 					>
		// 						Time Submitted
		// 					</p>
		// 					{moment(dateCreated).format('h:mm a')}
		// 				</div>
		// 			</div>
		// 			<div className="d-flex"></div>
		// 			<hr className="line-break" />
		// 			<div className="specialty-software-div">
		// 				{visibleArrow && (
		// 					<button
		// 						className="specialty-software-arrow"
		// 						onClick={() =>
		// 							(specialtySoftwareRef.current.scrollLeft -= 40)
		// 						}
		// 					>
		// 						<i className="fas fa-angle-left"></i>
		// 					</button>
		// 				)}
		// 				<div
		// 					className="specialty-software"
		// 					ref={specialtySoftwareRef}
		// 				>
		// 					{specialty.map((element, index) => (
		// 						<span
		// 							className="specialty-software-item"
		// 							key={index}
		// 						>
		// 							{element}
		// 						</span>
		// 					))}
		// 					{software.map((element, index) => (
		// 						<span
		// 							className="specialty-software-item"
		// 							key={index}
		// 						>
		// 							{element}
		// 						</span>
		// 					))}
		// 				</div>
		// 				{visibleArrow && (
		// 					<button
		// 						className="specialty-software-arrow"
		// 						onClick={() =>
		// 							(specialtySoftwareRef.current.scrollLeft += 40)
		// 						}
		// 					>
		// 						<i className="fas fa-angle-right"></i>
		// 					</button>
		// 				)}
		// 			</div>
		// 			{recruitmentsComment && (
		// 				<Fragment>
		// 					<p className="title">Recruiter's Comments:</p>
		// 					<p className="recruiters-comment">
		// 						{recruitmentsComment}
		// 					</p>
		// 				</Fragment>
		// 			)}
		// 			<button className="link" onClick={() => onViewResume()}>
		// 				View Resume
		// 			</button>
		// 		</div>
		// 		<div className="col-lg-3">
		// 			<div className="mini-slide shadow">
		// 				<Carousel
		// 					activeIndex={activeMiniSlide}
		// 					interval={null}
		// 					onSelect={miniSlideSelect}
		// 					indicators={false}
		// 					nextIcon={
		// 						<i
		// 							className="fas fa-caret-right"
		// 							aria-hidden="true"
		// 						></i>
		// 					}
		// 					prevIcon={
		// 						<i
		// 							className="fas fa-caret-left"
		// 							aria-hidden="true"
		// 						></i>
		// 					}
		// 					fade={true}
		// 				>
		// 					{uploadWork.images.map((e, i) => (
		// 						<Carousel.Item key={i}>
		// 							<img
		// 								src={`/uploads/${e.file}`}
		// 								className="d-block w-100"
		// 								alt="..."
		// 							/>
		// 						</Carousel.Item>
		// 					))}
		// 				</Carousel>
		// 				<span className="num">
		// 					{activeMiniSlide + 1} of {uploadWork.images.length}
		// 				</span>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
};

CandidateItem.propTypes = {
	viewResume: PropTypes.func.isRequired,
};

export default connect(null, { viewResume })(CandidateItem);
