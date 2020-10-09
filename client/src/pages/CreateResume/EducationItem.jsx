import React from 'react';

const EducationItem = ({ index, education, editEdu, deleteEdu }) => {
	const {
		choices,
		degree,
		school,
		course,
		monthYearStarted,
		monthYearGraduated,
		license,
	} = education;
	const onEditEdu = (e) => {
		e.preventDefault();
		editEdu(index);
	};

	const onDeleteEdu = (e) => {
		e.preventDefault();
		deleteEdu(index);
	};

	return (
		<div className="education-entry">
			<div className="row">
				<div className="col-lg-8 col-sm-8">
					{choices ? (
						<h6 className="item choices">{choices}</h6>
					) : null}
					{degree ? <p className="item degree">{degree}</p> : null}
					{school ? <p className="item">{school}</p> : null}
					{course ? <p className="item">{course}</p> : null}
					{license ? <p className="item">{license}</p> : null}
					{monthYearStarted && monthYearGraduated ? (
						<p className="mb-0">
							<span className="item">{monthYearStarted}</span> -{' '}
							<span className="item">{monthYearGraduated}</span>
						</p>
					) : null}
				</div>
				<div className="col-lg-4 col-sm-4 d-flex justify-content-between">
					<div>
						<button onClick={onEditEdu}>Edit</button>
					</div>
					<div>
						<button onClick={onDeleteEdu}>Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EducationItem;
