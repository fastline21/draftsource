import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import { specialtyList } from './../../list/Specialty';
import { softwareList } from './../../list/Software';
import { marketTypeList } from './../../list/MarketType';
import SpecialtyItem from './SpecialtyItem';
import SoftwareItem from './SoftwareItem';
import MarketTypeItem from './MarketTypeItem';
import Specialty from './Specialty';
import Software from './Software';
import MarketType from './MarketType';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

// Actions
import { setAlert } from './../../state/actions/alertAction';
import { addJob, jobStep, jobSuccess } from './../../state/actions/jobAction';

const Step1 = ({
	setAlert,
	addJob,
	jobStep,
	jobSuccess,
	jobState: { step, success },
}) => {
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
	const { title } = info;
	const [specialty, setSpecialty] = useState([]);
	const [software, setSoftware] = useState([]);
	const [marketType, setMarketType] = useState([]);
	const otherSpecialtyRef = useRef(null);
	const otherSoftwareRef = useRef(null);
	const otherMarketTypeRef = useRef(null);
	const generateSpecialty = () => {
		let key = 0;
		let list = [];
		const total = Math.ceil(specialtyList().length / 4);
		for (let x = 0; x < 4; x++) {
			let item = [];
			for (let y = 0; y < total; y++) {
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
				<div className="col-lg-3 col-md-6 col-sm-6" key={x}>
					<ul className="nav flex-column">{item}</ul>
				</div>
			);
		}
		return list;
	};
	const generateSoftware = () => {
		let key = 0;
		let list = [];
		const total = Math.ceil(softwareList().length / 4);
		for (let x = 0; x < 4; x++) {
			let item = [];
			for (let y = 0; y < total; y++) {
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
				<div className="col-lg-3 col-md-6 col-sm-6" key={x}>
					<ul className="nav flex-column">{item}</ul>
				</div>
			);
		}
		return list;
	};
	const generateMarketType = () => {
		let key = 0;
		let list = [];
		const total = Math.ceil(marketTypeList().length / 4);
		for (let x = 0; x < 4; x++) {
			let item = [];
			for (let y = 0; y < total; y++) {
				item.push(
					<MarketTypeItem
						key={key}
						index={key}
						value={marketTypeList()[key]}
						select={onSelectMarketType}
					/>
				);
				key++;
			}
			list.push(
				<div className="col-lg-3 col-md-6 col-sm-6" key={x}>
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
	const onSelectMarketType = (e) => {
		if (marketType.includes(marketTypeList()[e])) {
			setMarketType((marketType) => [
				...marketType.filter(
					(x) =>
						marketType.indexOf(x) !== marketType.indexOf(marketTypeList()[e])
				),
			]);
			Array.from(document.querySelectorAll('.market-type .list .nav-item'))
				.find((el) => el.textContent === marketTypeList()[e])
				.classList.remove('active');
		} else {
			setMarketType((marketType) => [...marketType, marketTypeList()[e]]);
			Array.from(document.querySelectorAll('.market-type .list .nav-item'))
				.find((el) => el.textContent === marketTypeList()[e])
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
	const onMarketTypeClose = (e) => {
		const item = marketType[e];
		if (marketTypeList().includes(item)) {
			Array.from(document.querySelectorAll('.market-type .list .nav-item'))
				.find((el) => el.textContent === item)
				.classList.remove('active');
		}
		setMarketType((marketType) => [
			...marketType.filter((x) => marketType.indexOf(x) !== e),
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

	const onKeyPressOtherSoftware = (e) => {
		if (e.key === 'Enter') {
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
		}
	};

	const onKeyPressOtherMarketType = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (otherMarketTypeRef.current.value === '') {
				return setAlert('', 'Please fill-in the required boxes to Proceed.');
			} else {
				const lowerMarketType = marketTypeList().map((el) => el.toLowerCase());
				const lowerOther = otherMarketTypeRef.current.value;
				if (lowerMarketType.includes(lowerOther.toLowerCase())) {
					const index = lowerMarketType.indexOf(lowerOther.toLowerCase());
					setMarketType((marketType) => [
						...marketType,
						marketTypeList()[index],
					]);
					Array.from(document.querySelectorAll('.market-type .list .nav-item'))
						.find((el) => el.textContent === marketTypeList()[index])
						.classList.add('active');
				} else {
					setMarketType((marketType) => [...marketType, lowerOther]);
				}
				otherMarketTypeRef.current.value = '';
				setDirty();
				setMessage('Are you sure you want to leave this page?');
			}
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

	const addOtherMarketType = (e) => {
		e.preventDefault();

		if (otherMarketTypeRef.current.value === '') {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			const lowerMarketType = marketTypeList().map((el) => el.toLowerCase());
			const lowerOther = otherMarketTypeRef.current.value;
			if (lowerMarketType.includes(lowerOther.toLowerCase())) {
				const index = lowerMarketType.indexOf(lowerOther.toLowerCase());
				setMarketType((marketType) => [...marketType, marketTypeList()[index]]);
				Array.from(document.querySelectorAll('.market-type .list .nav-item'))
					.find((el) => el.textContent === marketTypeList()[index])
					.classList.add('active');
			} else {
				setMarketType((marketType) => [...marketType, lowerOther]);
			}
			otherMarketTypeRef.current.value = '';
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
			title === '' ||
			specialty.length === 0 ||
			software.length === 0 ||
			marketType.length === 0
		) {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			addJob({
				title,
				specialty,
				software,
				marketType,
			});
			setInfo(initialInfo);
			setSpecialty([]);
			setSoftware([]);
			setMarketType([]);
			setPristine();
		}
	};

	useEffect(() => {
		if (step === 0) {
			jobStep(1);
		}

		if (step > 1) {
			setPristine();
			setAlert(
				'/draft-job?step=1',
				'You are not authorize to go in this page. Please start at Step 1'
			);
		}

		if (success) {
			jobSuccess();
			jobStep(2);
			history.push({
				pathname: '/draft-job',
				search: 'step=2',
			});
		}

		// eslint-disable-next-line
	}, [success, step]);
	return (
		<div className="step-1">
			{Prompt}
			<form className="form" onSubmit={onSubmit}>
				<div className="form-row specialty-software">
					<div className="col-lg-12">
						<div className="form-inline">
							<h5 className="title mb-0 mr-4">Job Title</h5>
							<input
								type="text"
								name="title"
								id="titleInput"
								className="form-control input"
								onChange={onChange}
								value={title}
							/>
						</div>
					</div>
				</div>
				<div className="form-row specialty-software specialty">
					<div className="col-lg-4">
						<h5 className="title">
							Specialty <span>Atleast (3) three skills</span>
						</h5>
						{specialty.length === 0 ? (
							<p className="subtitle">
								This section wil view your selected specialties. Choose atleast
								(3) three or more skills and still relevant to the job position
								you are applying for.
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
								onKeyPress={onkeyPressOtherSpecialty}
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
				<div className="form-row specialty-software software">
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
								onKeyPress={onKeyPressOtherSoftware}
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
				<div className="form-row specialty-software market-type">
					<div className="col-lg-4">
						<h5 className="title">
							Market type <span>Atleast (3) three market type</span>
						</h5>
						{marketType.length === 0 ? (
							<p className="subtitle">
								This section view is your project or market type experience.
								This will determine how big or how small how experienced or
								inexperienced you are in the position you are applying for.
							</p>
						) : (
							marketType.map((e, i) => (
								<MarketType
									key={i}
									value={e}
									index={i}
									onMarketTypeClose={onMarketTypeClose}
								/>
							))
						)}
					</div>
					<div className="col-lg-8">
						<div className="list">
							<div className="form-row">{generateMarketType()}</div>
						</div>
						<div className="form-inline">
							<input
								type="text"
								placeholder="Other Market type"
								className="form-control input other-input"
								ref={otherMarketTypeRef}
								onKeyPress={onKeyPressOtherMarketType}
							/>
							<button
								className="btn btn-primary button other-add"
								onClick={addOtherMarketType}
							>
								Add
							</button>
						</div>
					</div>
				</div>
				<div className="form-row mt-5">
					<div className="col-sm-3 offset-sm-9">
						<input
							type="submit"
							value="Proceed"
							className="btn btn-primary btn-block button"
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

Step1.propTypes = {
	setAlert: PropTypes.func.isRequired,
	addJob: PropTypes.func.isRequired,
	jobSuccess: PropTypes.func.isRequired,
	jobStep: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	jobState: state.jobState,
});

export default connect(mapStateToProps, {
	setAlert,
	addJob,
	jobStep,
	jobSuccess,
})(Step1);
