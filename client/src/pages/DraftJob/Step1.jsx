import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import { specialtyList } from './../../list/Specialty';
import { softwareList } from './../../list/Software';
import SpecialtyItem from './SpecialtyItem';
import SoftwareItem from './SpecialtyItem';
import Specialty from './Specialty';
import Software from './Software';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

// Actions
import { setAlert } from './../../state/actions/alertAction';
import { addJob, setStep } from './../../state/actions/jobAction';

const Step1 = ({ setAlert, addJob, setStep }) => {
	const history = useHistory();
	const [
		Prompt,
		setDirty,
		setPristine,
		setMessage,
	] = useUnsavedChangesWarning();
	const initialInfo = {
		title: '',
	};
	const [info, setInfo] = useState(initialInfo);
	const [specialty, setSpecialty] = useState([]);
	const [software, setSoftware] = useState([]);
	const [submit, setSubmit] = useState(false);
	const otherSpecialtyRef = useRef(null);
	const otherSoftwareRef = useRef(null);
	const generateSpecialty = () => {
		let key = 0;
		let list = [];
		const perItem = Math.round(specialtyList().length / 2);
		for (let x = 0; x < 2; x++) {
			let item = [];
			for (let y = 0; y < perItem; y++) {
				item.push(
					<SpecialtyItem
						key={key}
						index={key}
						value={specialtyList()[key]}
						select={onSelectSpecialty}
					/>
				);
				key++;
			}
			list.push(
				<div className="col-lg-6 col-md-6 col-sm-6" key={x}>
					<ul className="nav flex-column">{item}</ul>
				</div>
			);
		}
		return list;
	};
	const generateSoftware = () => {
		let key = 0;
		let list = [];
		const perItem = Math.round(softwareList().length / 2);
		for (let x = 0; x < 2; x++) {
			let item = [];
			for (let y = 0; y < perItem; y++) {
				item.push(
					<SoftwareItem
						key={key}
						index={key}
						value={softwareList()[key]}
						select={onSelectSoftware}
					/>
				);
				key++;
			}
			list.push(
				<div className="col-lg-6 col-md-6 col-sm-6" key={x}>
					<ul className="nav flex-column">{item}</ul>
				</div>
			);
		}
		return list;
	};
	const onSelectSpecialty = (e) => {
		if (specialty.includes(specialtyList()[e])) {
			setSpecialty((specialty) => [
				...specialty.filter(
					(x) => specialty.indexOf(x) !== specialty.indexOf(specialtyList()[e])
				),
			]);
			Array.from(document.querySelectorAll('.specialty .list .nav-item'))
				.find((el) => el.textContent === specialtyList()[e])
				.classList.remove('active');
		} else {
			setSpecialty((specialty) => [...specialty, specialtyList()[e]]);
			Array.from(document.querySelectorAll('.specialty .list .nav-item'))
				.find((el) => el.textContent === specialtyList()[e])
				.classList.add('active');
		}
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};
	const onSelectSoftware = (e) => {
		if (software.includes(softwareList()[e])) {
			setSoftware((software) => [
				...software.filter(
					(x) => software.indexOf(x) !== software.indexOf(softwareList()[e])
				),
			]);
			Array.from(document.querySelectorAll('.software .list .nav-item'))
				.find((el) => el.textContent === softwareList()[e])
				.classList.remove('active');
		} else {
			setSoftware((software) => [...software, softwareList()[e]]);
			Array.from(document.querySelectorAll('.software .list .nav-item'))
				.find((el) => el.textContent === softwareList()[e])
				.classList.add('active');
		}
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};
	const onSpecialtyClose = (e) => {
		const item = specialty[e];
		if (specialtyList().includes(item)) {
			Array.from(document.querySelectorAll('.specialty .list .nav-item'))
				.find((el) => el.textContent === item)
				.classList.remove('active');
		}
		setSpecialty((specialty) => [
			...specialty.filter((x) => specialty.indexOf(x) !== e),
		]);
	};
	const onSoftwareClose = (e) => {
		const item = software[e];
		if (softwareList().includes(item)) {
			Array.from(document.querySelectorAll('.software .list .nav-item'))
				.find((el) => el.textContent === item)
				.classList.remove('active');
		}
		setSoftware((software) => [
			...software.filter((x) => software.indexOf(x) !== e),
		]);
	};
	const onkeyPressOtherSpecialty = (e) => {
		if (e.key === 'Enter') {
			if (otherSpecialtyRef.current.value === '') {
				setAlert('', 'Please fill-in the required boxes to Proceed.');
			} else {
				const lowerSpecialty = specialtyList().map((el) => el.toLowerCase());
				const lowerOther = otherSpecialtyRef.current.value;
				if (lowerSpecialty.includes(lowerOther.toLowerCase())) {
					const index = lowerSpecialty.indexOf(lowerOther.toLowerCase());
					setSpecialty((specialty) => [...specialty, specialtyList()[index]]);
					Array.from(document.querySelectorAll('.specialty .list .nav-item'))
						.find((el) => el.textContent === specialtyList()[index])
						.classList.add('active');
				} else {
					setSpecialty((specialty) => [...specialty, lowerOther]);
				}
				otherSpecialtyRef.current.value = '';
			}
			setDirty();
			setMessage('Are you sure you want to leave this page?');
			e.preventDefault();
		}
	};

	const onKeyPressOtherSpecify = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	};

	const onkeyPressOtherSoftware = (e) => {
		if (e.key === 'Enter') {
			if (otherSoftwareRef.current.value === '') {
				setAlert('', 'Please fill-in the required boxes to Proceed.');
			} else {
				const lowerSoftware = softwareList().map((el) => el.toLowerCase());
				const lowerOther = otherSoftwareRef.current.value;
				if (lowerSoftware.includes(lowerOther.toLowerCase())) {
					const index = lowerSoftware.indexOf(lowerOther.toLowerCase());
					setSoftware((software) => [...software, softwareList()[index]]);
					Array.from(document.querySelectorAll('.software .list .nav-item'))
						.find((el) => el.textContent === softwareList()[index])
						.classList.add('active');
				} else {
					setSoftware((software) => [...software, lowerOther]);
				}
				otherSoftwareRef.current.value = '';
			}
			setDirty();
			setMessage('Are you sure you want to leave this page?');
			e.preventDefault();
		}
	};

	const addOtherSpecialty = (e) => {
		e.preventDefault();

		if (otherSpecialtyRef.current.value === '') {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			const lowerSpecialty = specialtyList().map((el) => el.toLowerCase());
			const lowerOther = otherSpecialtyRef.current.value;
			if (lowerSpecialty.includes(lowerOther.toLowerCase())) {
				const index = lowerSpecialty.indexOf(lowerOther.toLowerCase());
				setSpecialty((specialty) => [...specialty, specialtyList()[index]]);
				Array.from(document.querySelectorAll('.specialty .list .nav-item'))
					.find((el) => el.textContent === specialtyList()[index])
					.classList.add('active');
			} else {
				setSpecialty((specialty) => [...specialty, lowerOther]);
			}
			otherSpecialtyRef.current.value = '';
			setDirty();
			setMessage('Are you sure you want to leave this page?');
		}
	};

	// Add Other Software
	const addOtherSoftware = (e) => {
		e.preventDefault();

		if (otherSoftwareRef.current.value === '') {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			const lowerSoftware = softwareList().map((el) => el.toLowerCase());
			const lowerOther = otherSoftwareRef.current.value;
			if (lowerSoftware.includes(lowerOther.toLowerCase())) {
				const index = lowerSoftware.indexOf(lowerOther.toLowerCase());
				setSoftware((software) => [...software, softwareList()[index]]);
				Array.from(document.querySelectorAll('.software .list .nav-item'))
					.find((el) => el.textContent === softwareList()[index])
					.classList.add('active');
			} else {
				setSoftware((software) => [...software, lowerOther]);
			}
			otherSoftwareRef.current.value = '';
			setDirty();
			setMessage('Are you sure you want to leave this page?');
		}
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setInfo({ ...info, [name]: value });
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};
	const onSubmit = (e) => {
		e.preventDefault();
		if (
			JSON.stringify(info) === JSON.stringify(initialInfo) ||
			specialty.length === 0 ||
			software.length === 0
		) {
			setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			const data = {
				...info,
				specialty,
				software,
			};
			addJob(data);
			setInfo(initialInfo);
			setSpecialty([]);
			setSoftware([]);
			setPristine();
			setSubmit(true);
		}
	};

	useEffect(() => {
		// if (JSON.stringify(info) === JSON.stringify(initialInfo)) {
		// 	setDirty();
		// 	setMessage('Are you sure you want to leave this page?');
		// }

		if (submit) {
			setSubmit(false);
			setStep(2);
			history.push({
				pathname: '/draft-job',
				search: 'step=2',
			});
		}

		// eslint-disable-next-line
	}, [submit]);
	return (
		<div className="step-1">
			{Prompt}
			<form className="form" onSubmit={onSubmit}>
				<div className="row">
					<div className="form-row specialty">
						<div className="col-lg-4">
							<h5 className="title">
								Specialty <span>Atleast (3) three skills</span>
							</h5>
							{specialty.length === 0 ? (
								<p className="subtitle">
									This section wil view your selected specialties. Choose
									atleast (3) three or more skills and still relevant to the job
									position you are applying for.
								</p>
							) : (
								specialty.map((e, i) => (
									<Specialty
										key={i}
										value={e}
										index={i}
										onSpecialtyClose={onSpecialtyClose}
									/>
								))
							)}
						</div>
						<div className="col-lg-8">
							<div className="list">
								<div className="form-row">{generateSpecialty()}</div>
							</div>
							<div className="form-inline">
								<input
									type="text"
									placeholder="Other Specialty"
									className="form-control input other-input"
									ref={otherSpecialtyRef}
									onKeyPress={onKeyPressOtherSpecify}
								/>
								<button
									className="btn btn-primary button other-add"
									onClick={addOtherSpecialty}
								>
									Add
								</button>
							</div>
						</div>
					</div>
					<div className="form-row software">
						<div className="col-lg-4">
							<h5 className="title">
								Software <span>Atleast (3) three software use</span>
							</h5>
							{software.length === 0 ? (
								<p className="subtitle">
									This section will view your selected software you usually or
									regularly used in order to perform on asuch of wuality output
									and strill matched to the job position you are applying for.
								</p>
							) : (
								software.map((e, i) => (
									<Software
										key={i}
										value={e}
										index={i}
										onSoftwareClose={onSoftwareClose}
									/>
								))
							)}
						</div>
						<div className="col-lg-8">
							<div className="list">
								<div className="form-row">{generateSoftware()}</div>
							</div>
							<div className="form-inline">
								<input
									type="text"
									placeholder="Other Software"
									className="form-control input other-input"
									ref={otherSoftwareRef}
									onKeyPress={onKeyPressOtherSpecify}
								/>
								<button
									className="btn btn-primary button other-add"
									onClick={addOtherSoftware}
								>
									Add
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-row">
                                    <div className="col-lg-3">
                                        <label
                                            htmlFor="titleInput"
                                            className="form-label"
                                        >
                                            Job Title
                                        </label>
                                    </div>
                                    <div className="col-lg-9">
                                        <input
                                            type="text"
                                            name="title"
                                            id="titleInput"
                                            className="form-control input"
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="form-row mt-4 specialty">
                                    <div className="col-lg-3">
                                        <label
                                            htmlFor="specialtyInput"
                                            className="form-label"
                                        >
                                            Specialty
                                        </label>
                                        <p className="subtitle">
                                            Atleast (3) three skills
                                        </p>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="form-row list">
                                            {generateSpecialty()}
                                        </div>
                                        <div className="form-group specialty-line-break">
                                            <input
                                                type="text"
                                                name="otherSpecialty"
                                                className="form-control input mt-3"
                                                placeholder="Other specify and press enter"
                                                onKeyPress={
                                                    onkeyPressOtherSpecialty
                                                }
                                                ref={otherSpecialtyRef}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="form-row">
                                    {specialty.length === 0 ? (
                                        <p className="subtitle desc">
                                            This section will display on what
                                            you added from Specialty section
                                        </p>
                                    ) : (
                                        specialty.map((e, i) => (
                                            <Specialty
                                                key={i}
                                                value={e}
                                                index={i}
                                                onSpecialtyClose={
                                                    onSpecialtyClose
                                                }
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-row mt-4 software">
                                    <div className="col-lg-3">
                                        <label
                                            htmlFor="softwareInput"
                                            className="form-label"
                                        >
                                            Software Use
                                        </label>
                                        <p className="subtitle">
                                            Atleast (3) three skills
                                        </p>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="form-row list">
                                            {generateSoftware()}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="otherSoftware"
                                                className="form-control input mt-3"
                                                placeholder="Other specify and press enter"
                                                onKeyPress={
                                                    onkeyPressOtherSoftware
                                                }
                                                ref={otherSoftwareRef}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="form-row">
                                    {software.length === 0 ? (
                                        <p className="subtitle desc">
                                            This section will display on what
                                            you added from Software Use section
                                        </p>
                                    ) : (
                                        software.map((e, i) => (
                                            <Software
                                                key={i}
                                                value={e}
                                                index={i}
                                                onSoftwareClose={
                                                    onSoftwareClose
                                                }
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3 offset-sm-9">
                                <input
                                    type="submit"
                                    value="Proceed"
                                    className="btn btn-primary btn-block button"
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
			</form>
		</div>
	);
};

Step1.propTypes = {
	setAlert: PropTypes.func.isRequired,
	addJob: PropTypes.func.isRequired,
	setStep: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, addJob, setStep })(Step1);
