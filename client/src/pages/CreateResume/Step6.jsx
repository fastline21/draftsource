import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import useUnsavedChangesWarning from './../../utils/useUnsavedChangesWarning';

// Components
import SpecialtyItem from './SpecialtyItem';
import SpecialtySelected from './SpecialtySelected';
import AdvancedSoftwareItem from './AdvancedSoftwareItem';
import AdvancedSoftwareSelected from './AdvancedSoftwareSelected';
import IntermediateSoftwareItem from './IntermediateSoftwareItem';
import IntermediateSoftwareSelected from './IntermediateSoftwareSelected';
import MarketTypeItem from './MarketTypeItem';
import MarketTypeSelected from './MarketTypeSelected';
import CountryExperienceItem from './CountryExperienceItem';
import CountryExperienceSelected from './CountryExperienceSelected';
import UploadWorkImageModal from './UploadWorkImageModal';
import UploadWorkDocumentModal from './UploadWorkDocumentModal';
import UploadWorkItem from './UploadWorkItem';
import PreLoader from './../../layouts/PreLoader';

// List
import { specialtyList } from './../../list/Specialty';
import { softwareList } from './../../list/Software';
import { marketTypeList } from './../../list/MarketType';
import { countryExperienceList } from './../../list/CountryExperience';

// Action
import { setAlert } from './../../state/actions/alertAction';
import { clearUser } from './../../state/actions/userAction';
import {
	submitResume,
	resumeStep,
	clearError,
	resumeSuccess,
} from './../../state/actions/resumeAction';

const Step6 = ({
	setAlert,
	submitResume,
	clearError,
	clearUser,
	check,
	resumeSuccess,
	resumeStep,
	resumeState: { resume, error, success, loading, percent, step },
}) => {
	// Unsaved data
	const [
		Prompt,
		setDirty,
		setPristine,
		setMessage,
	] = useUnsavedChangesWarning();

	// Other specific input ref
	const otherSpecialtyRef = useRef(null);
	const otherAdvancedSoftwareRef = useRef(null);
	const otherIntermediateSoftwareRef = useRef(null);
	const otherMarketTypeRef = useRef(null);
	const otherCountryExperienceRef = useRef(null);

	// Initial value for upload modal
	const initialUploadModal = {
		show: false,
		title: '',
		note: '',
		data: '',
		index: '',
	};

	// State for step 6
	const [specialty, setSpecialty] = useState([]);
	const [advancedSoftware, setAdvancedSoftware] = useState([]);
	const [intermediateSoftware, setIntermediateSoftware] = useState([]);
	const [marketType, setMarketType] = useState([]);
	const [countryExperience, setCountryExperience] = useState([]);
	const [uploadWork, setUploadWork] = useState({
		images: [],
		documents: [],
	});
	const [uploadWorkImageModal, setUploadWorkImageModal] = useState(
		initialUploadModal
	);
	const [uploadWorkDocumentModal, setUploadWorkDocumentModal] = useState(
		initialUploadModal
	);

	// Exclude MS Word in Intermediate Software List
	const newSoftwareList = softwareList().filter((soft) => soft !== 'MS Word');

	// Select Specialty
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

	// Select Advanced Software
	const onSelectAdvancedSoftware = (e) => {
		if (advancedSoftware.includes(newSoftwareList[e])) {
			setAdvancedSoftware((advancedSoftware) => [
				...advancedSoftware.filter(
					(x) =>
						advancedSoftware.indexOf(x) !==
						advancedSoftware.indexOf(newSoftwareList[e])
				),
			]);
			Array.from(
				document.querySelectorAll('.advanced-software .list .nav-item')
			)
				.find((el) => el.textContent === newSoftwareList[e])
				.classList.remove('active');
		} else {
			setAdvancedSoftware((advancedSoftware) => [
				...advancedSoftware,
				newSoftwareList[e],
			]);
			Array.from(
				document.querySelectorAll('.advanced-software .list .nav-item')
			)
				.find((el) => el.textContent === newSoftwareList[e])
				.classList.add('active');
		}
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	// Select Intermediate Software
	const onSelectIntermediateSoftware = (e) => {
		if (intermediateSoftware.includes(softwareList()[e])) {
			setIntermediateSoftware((intermediateSoftware) => [
				...intermediateSoftware.filter(
					(x) =>
						intermediateSoftware.indexOf(x) !==
						intermediateSoftware.indexOf(softwareList()[e])
				),
			]);
			Array.from(
				document.querySelectorAll('.intermediate-software .list .nav-item')
			)
				.find((el) => el.textContent === softwareList()[e])
				.classList.remove('active');
		} else {
			setIntermediateSoftware((intermediateSoftware) => [
				...intermediateSoftware,
				softwareList()[e],
			]);
			Array.from(
				document.querySelectorAll('.intermediate-software .list .nav-item')
			)
				.find((el) => el.textContent === softwareList()[e])
				.classList.add('active');
		}
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	// Select Market Type
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

	// Select Country Experience
	const onSelectCountryExperience = (e) => {
		if (countryExperience.includes(countryExperienceList()[e])) {
			setCountryExperience((countryExperience) => [
				...countryExperience.filter(
					(x) =>
						countryExperience.indexOf(x) !==
						countryExperience.indexOf(countryExperienceList()[e])
				),
			]);
			Array.from(
				document.querySelectorAll('.country-experience .list .nav-item')
			)
				.find((el) => el.textContent === countryExperienceList()[e])
				.classList.remove('active');
		} else {
			setCountryExperience((countryExperience) => [
				...countryExperience,
				countryExperienceList()[e],
			]);
			Array.from(
				document.querySelectorAll('.country-experience .list .nav-item')
			)
				.find((el) => el.textContent === countryExperienceList()[e])
				.classList.add('active');
		}
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	// Specialty List
	const specialtyListGenerate = () => {
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

	// Advanced Software List
	const advancedSoftwareGenerate = () => {
		let key = 0;
		let list = [];
		const total = Math.ceil(newSoftwareList.length / 4);
		for (let x = 0; x < 4; x++) {
			let item = [];
			for (let y = 0; y < total; y++) {
				item.push(
					<AdvancedSoftwareItem
						key={key}
						index={key}
						value={newSoftwareList[key]}
						select={onSelectAdvancedSoftware}
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

	// Intermediate Software List
	const intermediateSoftwareListGenerate = () => {
		let key = 0;
		let list = [];
		const total = Math.ceil(softwareList().length / 4);
		for (let x = 0; x < 4; x++) {
			let item = [];
			for (let y = 0; y < total; y++) {
				item.push(
					<IntermediateSoftwareItem
						key={key}
						index={key}
						value={softwareList()[key]}
						select={onSelectIntermediateSoftware}
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

	// Market Type List
	const marketTypeListGenerate = () => {
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

	// Country Experience List
	const countryExperienceListGenerate = () => {
		let key = 0;
		let list = [];
		const total = Math.ceil(countryExperienceList().length / 4);
		for (let x = 0; x < 4; x++) {
			let item = [];
			for (let y = 0; y < total; y++) {
				item.push(
					<CountryExperienceItem
						key={key}
						index={key}
						value={countryExperienceList()[key]}
						select={onSelectCountryExperience}
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

	// Specialty Close
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

	// Advanced Software Close
	const onAdvancedSoftwareClose = (e) => {
		const item = advancedSoftware[e];
		if (newSoftwareList.includes(item)) {
			Array.from(
				document.querySelectorAll('.advanced-software .list .nav-item')
			)
				.find((el) => el.textContent === item)
				.classList.remove('active');
		}
		setAdvancedSoftware((advancedSoftware) => [
			...advancedSoftware.filter((x) => advancedSoftware.indexOf(x) !== e),
		]);
	};

	// Intermediate Software Close
	const onIntermediateSoftwareClose = (e) => {
		const item = intermediateSoftware[e];
		if (softwareList().includes(item)) {
			Array.from(
				document.querySelectorAll('.intermediate-software .list .nav-item')
			)
				.find((el) => el.textContent === item)
				.classList.remove('active');
		}
		setIntermediateSoftware((intermediateSoftware) => [
			...intermediateSoftware.filter(
				(x) => intermediateSoftware.indexOf(x) !== e
			),
		]);
	};

	// Market Type Close
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

	// Country Experience Close
	const onCountryExperienceClose = (e) => {
		const item = countryExperience[e];
		if (countryExperienceList().includes(item)) {
			Array.from(
				document.querySelectorAll('.country-experience .list .nav-item')
			)
				.find((el) => el.textContent === item)
				.classList.remove('active');
		}
		setCountryExperience((countryExperience) => [
			...countryExperience.filter((x) => countryExperience.indexOf(x) !== e),
		]);
	};

	// Add Other Specialty
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

	// Add Other Advanced Software
	const addOtherAdvancedSoftware = (e) => {
		e.preventDefault();

		if (otherAdvancedSoftwareRef.current.value === '') {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			const lowerAdvancedSoftware = newSoftwareList.map((el) =>
				el.toLowerCase()
			);
			const lowerOther = otherAdvancedSoftwareRef.current.value;
			if (lowerAdvancedSoftware.includes(lowerOther.toLowerCase())) {
				const index = lowerAdvancedSoftware.indexOf(lowerOther.toLowerCase());
				setAdvancedSoftware((advancedSoftware) => [
					...advancedSoftware,
					newSoftwareList[index],
				]);
				Array.from(
					document.querySelectorAll('.advanced-software .list .nav-item')
				)
					.find((el) => el.textContent === newSoftwareList[index])
					.classList.add('active');
			} else {
				setAdvancedSoftware((advancedSoftware) => [
					...advancedSoftware,
					lowerOther,
				]);
			}
			otherAdvancedSoftwareRef.current.value = '';
			setDirty();
			setMessage('Are you sure you want to leave this page?');
		}
	};

	// Add Other Intermediate Software
	const addOtherIntermediateSoftware = (e) => {
		e.preventDefault();

		if (otherIntermediateSoftwareRef.current.value === '') {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			const lowerIntermediateSoftware = softwareList().map((el) =>
				el.toLowerCase()
			);
			const lowerOther = otherIntermediateSoftwareRef.current.value;
			if (lowerIntermediateSoftware.includes(lowerOther.toLowerCase())) {
				const index = lowerIntermediateSoftware.indexOf(
					lowerOther.toLowerCase()
				);
				setIntermediateSoftware((intermediateSoftware) => [
					...intermediateSoftware,
					softwareList()[index],
				]);
				Array.from(
					document.querySelectorAll('.intermediate-software .list .nav-item')
				)
					.find((el) => el.textContent === softwareList()[index])
					.classList.add('active');
			} else {
				setIntermediateSoftware((intermediateSoftware) => [
					...intermediateSoftware,
					lowerOther,
				]);
			}
			otherIntermediateSoftwareRef.current.value = '';
			setDirty();
			setMessage('Are you sure you want to leave this page?');
		}
	};

	// Add Other Market Type
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

	// Add Other Country Experience
	const addOtherCountryExperience = (e) => {
		e.preventDefault();

		if (otherCountryExperienceRef.current.value === '') {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else {
			const lowerCountryExperience = countryExperienceList().map((el) =>
				el.toLowerCase()
			);
			const lowerOther = otherCountryExperienceRef.current.value;
			if (lowerCountryExperience.includes(lowerOther.toLowerCase())) {
				const index = lowerCountryExperience.indexOf(lowerOther.toLowerCase());
				setCountryExperience((countryExperience) => [
					...countryExperience,
					countryExperienceList()[index],
				]);
				Array.from(
					document.querySelectorAll('.country-experience .list .nav-item')
				)
					.find((el) => el.textContent === countryExperienceList()[index])
					.classList.add('active');
			} else {
				setCountryExperience((countryExperience) => [
					...countryExperience,
					lowerOther,
				]);
			}
			otherCountryExperienceRef.current.value = '';
			setDirty();
			setMessage('Are you sure you want to leave this page?');
		}
	};

	// Upload Work Image Modal Click
	const onUploadWorkImageModal = (e) => {
		e.preventDefault();
		setUploadWorkImageModal({
			show: true,
			title: 'Upload your JPG or PNG',
			note: [
				'Upload your jpeg or png but not exceed on 3mb',
				'Minimum size W 1200 x H 1100 pixels',
				'Preferred no texts layered on top of the image to keep it clean look',
			],
			caption: 'Draft a JPEG or PNG',
			data: '',
			index: '',
		});
	};

	// Upload Work Document Modal Click
	const onUploadWorkDocumentModal = (e) => {
		e.preventDefault();
		setUploadWorkDocumentModal({
			show: true,
			title: 'Upload your PDF',
			note: [
				'Upload your pdf not exceeding to 5mb',
				'Concise and professionaly done is a must',
				'Avoid unnecessary elements to make it more direct',
				'A clean and modern look attracts client',
			],
			caption: 'Draft PDF',
			data: '',
			index: '',
		});
	};

	// Hide Upload Work Image Modal
	const isHideImage = () => {
		setUploadWorkImageModal(initialUploadModal);
	};

	// Hide Upload Work Document Modal
	const isHideDocument = () => {
		setUploadWorkDocumentModal(initialUploadModal);
	};

	// Upload Work Image Data
	const uploadWorkImageData = (data) => {
		setUploadWork({ ...uploadWork, images: [...uploadWork.images, data] });
		setUploadWorkImageModal(initialUploadModal);
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	// Upload Work Document Data
	const uploadWorkDocumentData = (data) => {
		setUploadWork({
			...uploadWork,
			documents: [...uploadWork.documents, data],
		});
		setUploadWorkImageModal(initialUploadModal);
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	// Edit Upload Work Image Modal
	const onEditWorkImage = (index) => {
		setUploadWorkImageModal({
			show: true,
			title: 'Upload your JPG or PNG',
			note: [
				'Minimum size W 1200 x H 1100 pixels',
				'No texts layered on top of the image to keep it clean look',
				'Do not put company name or personal branding',
			],
			caption: 'Draft a JPEG or PNG',
			data: uploadWork.images[index],
			index,
		});
	};

	// Edit Upload Work Document Modal
	const onEditWorkDocument = (index) => {
		setUploadWorkDocumentModal({
			show: true,
			title: 'Upload your PDF',
			note: [
				'Upload your pdf not exceeding to 5mb',
				'Concise and professionaly done is a must',
				'Avoid unnecessary elements to make it more direct',
				'A clean and modern look attracts client',
			],
			caption: 'Draft a PDF',
			data: uploadWork.documents[index],
			index,
		});
	};

	// Delete Upload Work Image
	const onDeleteWorkImage = (current) => {
		const { images } = uploadWork;
		const removeItem = images.filter((image, index) => index !== current);
		setUploadWork({ ...uploadWork, images: [...removeItem] });
		setUploadWorkImageModal(initialUploadModal);
	};

	// Delete Upload Work Document
	const onDeleteWorkDocument = (current) => {
		const { documents } = uploadWork;
		const removeItem = documents.filter((document, index) => index !== current);
		setUploadWork({ ...uploadWork, documents: [...removeItem] });
		setUploadWorkDocumentModal(initialUploadModal);
	};

	// Update Upload Work Image
	const updateWorkImageData = (current, data) => {
		const { images } = uploadWork;
		const newUpdate = images.map((image, index) =>
			index === current ? data : image
		);
		setUploadWork({ ...uploadWork, images: [...newUpdate] });
		setUploadWorkImageModal(initialUploadModal);
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	// Update Upload Work Document
	const updateWorkDocumentData = (current, data) => {
		const { documents } = uploadWork;
		const newUpdate = documents.map((document, index) =>
			index === current ? data : document
		);
		setUploadWork({ ...uploadWork, documents: [...newUpdate] });
		setUploadWorkDocumentModal(initialUploadModal);
		setDirty();
		setMessage('Are you sure you want to leave this page?');
	};

	// On key press in other specialty
	const onKeyPressOtherSpecify = (e) => {
		if (e.key === 'Enter') {
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
		}
	};

	// On key press other advanced software
	const onKeyPressOtherAdvancedSoftware = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (otherAdvancedSoftwareRef.current.value === '') {
				return setAlert('', 'Please fill-in the required boxes to Proceed.');
			} else {
				const lowerAdvancedSoftware = newSoftwareList.map((el) =>
					el.toLowerCase()
				);
				const lowerOther = otherAdvancedSoftwareRef.current.value;
				if (lowerAdvancedSoftware.includes(lowerOther.toLowerCase())) {
					const index = lowerAdvancedSoftware.indexOf(lowerOther.toLowerCase());
					setAdvancedSoftware((advancedSoftware) => [
						...advancedSoftware,
						newSoftwareList[index],
					]);
					Array.from(
						document.querySelectorAll('.advanced-software .list .nav-item')
					)
						.find((el) => el.textContent === newSoftwareList[index])
						.classList.add('active');
				} else {
					setAdvancedSoftware((advancedSoftware) => [
						...advancedSoftware,
						lowerOther,
					]);
				}
				otherAdvancedSoftwareRef.current.value = '';
				setDirty();
				setMessage('Are you sure you want to leave this page?');
			}
		}
	};

	// On key press other intermediate software
	const onKeyPressOtherIntermediateSoftware = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (otherIntermediateSoftwareRef.current.value === '') {
				return setAlert('', 'Please fill-in the required boxes to Proceed.');
			} else {
				const lowerIntermediateSoftware = softwareList().map((el) =>
					el.toLowerCase()
				);
				const lowerOther = otherIntermediateSoftwareRef.current.value;
				if (lowerIntermediateSoftware.includes(lowerOther.toLowerCase())) {
					const index = lowerIntermediateSoftware.indexOf(
						lowerOther.toLowerCase()
					);
					setIntermediateSoftware((intermediateSoftware) => [
						...intermediateSoftware,
						softwareList()[index],
					]);
					Array.from(
						document.querySelectorAll('.intermediate-software .list .nav-item')
					)
						.find((el) => el.textContent === softwareList()[index])
						.classList.add('active');
				} else {
					setIntermediateSoftware((intermediateSoftware) => [
						...intermediateSoftware,
						lowerOther,
					]);
				}
				otherIntermediateSoftwareRef.current.value = '';
				setDirty();
				setMessage('Are you sure you want to leave this page?');
			}
		}
	};

	// On key press other martket type
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

	// On key press other country experience
	const onKeyPressOtherCountryExperience = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();

			if (otherCountryExperienceRef.current.value === '') {
				return setAlert('', 'Please fill-in the required boxes to Proceed.');
			} else {
				const lowerCountryExperience = countryExperienceList().map((el) =>
					el.toLowerCase()
				);
				const lowerOther = otherCountryExperienceRef.current.value;
				if (lowerCountryExperience.includes(lowerOther.toLowerCase())) {
					const index = lowerCountryExperience.indexOf(
						lowerOther.toLowerCase()
					);
					setCountryExperience((countryExperience) => [
						...countryExperience,
						countryExperienceList()[index],
					]);
					Array.from(
						document.querySelectorAll('.country-experience .list .nav-item')
					)
						.find((el) => el.textContent === countryExperienceList()[index])
						.classList.add('active');
				} else {
					setCountryExperience((countryExperience) => [
						...countryExperience,
						lowerOther,
					]);
				}
				otherCountryExperienceRef.current.value = '';
				setDirty();
				setMessage('Are you sure you want to leave this page?');
			}
		}
	};

	// Submit form
	const onSubmit = (e) => {
		e.preventDefault();
		if (
			specialty.length === 0 ||
			advancedSoftware.length === 0 ||
			intermediateSoftware.length === 0 ||
			marketType.length === 0 ||
			countryExperience.length === 0 ||
			(uploadWork.images.length === 0 && uploadWork.documents.length === 0)
		) {
			return setAlert('', 'Please fill-in the required boxes to Proceed.');
		} else if (specialty.length < 3) {
			return setAlert('', 'Please choose atleast 3 skills');
		} else if (marketType.length < 3) {
			return setAlert('', 'Please choose atleast 3 market type');
		} else {
			// Generate new formdata
			const formData = new FormData();

			// Get all resume data and append in formdata
			for (const [key, value] of Object.entries(resume)) {
				if (key === 'education' || key === 'workHistory') {
					formData.append(key, JSON.stringify(value));
				} else {
					formData.append(key, value);
				}
			}

			// Get all file upload and append in formdata
			for (const [key, value] of Object.entries(check())) {
				formData.append(key, value);
			}

			// Append all upload work in formdata
			for (const property in uploadWork) {
				uploadWork[property].forEach((element) => {
					formData.append([property], element.file);
				});
			}

			// Append all data in step 6 in formdata
			formData.append('specialty', specialty);
			formData.append('advancedSoftware', advancedSoftware);
			formData.append('intermediateSoftware', intermediateSoftware);
			formData.append('marketType', marketType);
			formData.append('countryExperience', countryExperience);
			formData.append('uploadWork', JSON.stringify(uploadWork));

			// Submit resume
			submitResume(formData);

			// Reset all data in step 6
			setSpecialty([]);
			setAdvancedSoftware([]);
			setIntermediateSoftware([]);
			setMarketType([]);
			setCountryExperience([]);
			setUploadWork({
				images: [],
				documents: [],
			});
			setPristine();
		}
	};

	useEffect(() => {
		if (step === 6) {
			setDirty();
			setMessage('Are you sure you want to leave this page?');
		}
		if (step !== 6) {
			setPristine();
			setAlert(
				'/create-resume?step=1',
				'You are not authorize to go in this page. Please start at Step 1'
			);
		}
		if (error) {
			setDirty();
			setMessage('Are you sure you want to leave this page?');
			setAlert('', error.msg);
			clearError();
		}
		if (success) {
			clearUser();
			setAlert(
				'/',
				'<h2 class="title">Thank you for your resume</h2><p class="subtitle">We will call you within 72 hours to verify your profile.</p>'
			);
			setPristine();
		}
		// eslint-disable-next-line
	}, [error, success, step]);

	return (
		<div className="step-6">
			{Prompt}
			{uploadWorkImageModal.show ? (
				<UploadWorkImageModal
					titleModal={uploadWorkImageModal.title}
					note={uploadWorkImageModal.note}
					isHide={isHideImage}
					isShow={uploadWorkImageModal.show}
					caption={uploadWorkImageModal.caption}
					uploadData={uploadWorkImageData}
					data={uploadWorkImageModal.data}
					index={uploadWorkImageModal.index}
					updateData={updateWorkImageData}
				/>
			) : null}
			{uploadWorkDocumentModal.show ? (
				<UploadWorkDocumentModal
					titleModal={uploadWorkDocumentModal.title}
					note={uploadWorkDocumentModal.note}
					isHide={isHideDocument}
					isShow={uploadWorkDocumentModal.show}
					caption={uploadWorkDocumentModal.caption}
					uploadData={uploadWorkDocumentData}
					data={uploadWorkDocumentModal.data}
					index={uploadWorkDocumentModal.index}
					updateData={updateWorkDocumentData}
				/>
			) : null}
			{loading ? <PreLoader percent={percent} /> : null}
			<div className="row">
				<div className="col-lg-12">
					<form className="form" onSubmit={onSubmit}>
						<div className="form-row specialty">
							<div className="col-lg-4">
								<h5 className="title">
									Specialty <span>Atleast (3) three skills</span>
								</h5>
								{specialty.length === 0 ? (
									<p className="subtitle">
										This section wil view your selected specialties. Choose
										atleast (3) three or more skills and still relevant to the
										job position you are applying for.
									</p>
								) : (
									specialty.map((e, i) => (
										<SpecialtySelected
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
									<div className="form-row">{specialtyListGenerate()}</div>
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
						<div className="form-row advanced-software">
							<div className="col-lg-4">
								<h5 className="title">Advanced Software Expertise</h5>
								{advancedSoftware.length === 0 ? (
									<p className="subtitle">
										This section will view your selected software you are
										confident in using or regularly used in order to perform on
										such of quality output and still matched to the job position
										you are applying for.
									</p>
								) : (
									advancedSoftware.map((e, i) => (
										<AdvancedSoftwareSelected
											key={i}
											value={e}
											index={i}
											onAdvancedSoftwareClose={onAdvancedSoftwareClose}
										/>
									))
								)}
							</div>
							<div className="col-lg-8">
								<div className="list">
									<div className="form-row">{advancedSoftwareGenerate()}</div>
								</div>
								<div className="form-inline">
									<input
										type="text"
										placeholder="Other Advanced Software"
										className="form-control input other-input"
										ref={otherAdvancedSoftwareRef}
										onKeyPress={onKeyPressOtherAdvancedSoftware}
									/>
									<button
										className="btn btn-primary button other-add"
										onClick={addOtherAdvancedSoftware}
									>
										Add
									</button>
								</div>
							</div>
						</div>
						<div className="form-row intermediate-software">
							<div className="col-lg-4">
								<h5 className="title">Intermediate Software Expertise</h5>
								{intermediateSoftware.length === 0 ? (
									<p className="subtitle">
										This section will view your selected software you usually
										use but you are not an expert in this software to perform on
										such of quality output and still matched to the job position
										you are applying for.
									</p>
								) : (
									intermediateSoftware.map((e, i) => (
										<IntermediateSoftwareSelected
											key={i}
											value={e}
											index={i}
											onIntermediateSoftwareClose={onIntermediateSoftwareClose}
										/>
									))
								)}
							</div>
							<div className="col-lg-8">
								<div className="list">
									<div className="form-row">
										{intermediateSoftwareListGenerate()}
									</div>
								</div>
								<div className="form-inline">
									<input
										type="text"
										placeholder="Other Intermediate Software"
										className="form-control input other-input"
										ref={otherIntermediateSoftwareRef}
										onKeyPress={onKeyPressOtherIntermediateSoftware}
									/>
									<button
										className="btn btn-primary button other-add"
										onClick={addOtherIntermediateSoftware}
									>
										Add
									</button>
								</div>
							</div>
						</div>
						<div className="form-row market-type">
							<div className="col-lg-4">
								<h5 className="title">
									Market type experience{' '}
									<span>Atleast (3) three market type use</span>
								</h5>
								{marketType.length === 0 ? (
									<p className="subtitle">
										This section view is your project or market type experience.
										This will determine how big or how small how experienced or
										inexperienced you are in the position you are applying for.
									</p>
								) : (
									marketType.map((e, i) => (
										<MarketTypeSelected
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
									<div className="form-row">{marketTypeListGenerate()}</div>
								</div>
								<div className="form-inline">
									<input
										type="text"
										placeholder="Other Market type experience"
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
						<div className="form-row country-experience">
							<div className="col-lg-4">
								<h5 className="title">
									Country experience{' '}
									<span>Atleast (1) one country experience use</span>
								</h5>
								{countryExperience.length === 0 ? (
									<p className="subtitle">
										This section will view your your country experience or which
										projects you have taken on different clients in different
										countries.
									</p>
								) : (
									countryExperience.map((e, i) => (
										<CountryExperienceSelected
											key={i}
											value={e}
											index={i}
											onCountryExperienceClose={onCountryExperienceClose}
										/>
									))
								)}
							</div>
							<div className="col-lg-8">
								<div className="list">
									<div className="form-row">
										{countryExperienceListGenerate()}
									</div>
								</div>
								<div className="form-inline">
									<input
										type="text"
										placeholder="Other Country experience"
										className="form-control input other-input"
										ref={otherCountryExperienceRef}
										onKeyPress={onKeyPressOtherCountryExperience}
									/>
									<button
										className="btn btn-primary button other-add"
										onClick={addOtherCountryExperience}
									>
										Add
									</button>
								</div>
							</div>
						</div>
						<div className="form-row upload-work">
							<div className="col-lg-4">
								<h5 className="title">
									Upload Your Work <span>upto 50mb</span>
								</h5>
								<p className="subtitle">
									Avoid putting names on your photos such as emails, brand
									names, company names. such action will result to revoking of
									resumes.
								</p>
							</div>
							<div className="col-lg-8">
								<div className="upload-image">
									<label className="form-label">JPEG or PNG's</label>
									{uploadWork.images.length === 0 ? (
										<button
											className="btn btn-primary button"
											onClick={onUploadWorkImageModal}
										>
											Add your first sample project as JPEG or PNG format
											<i className="fas fa-plus"></i>
										</button>
									) : (
										<div className="row">
											{uploadWork.images.map((e, i) => (
												<div className="col-lg-3 col-md-3 col-sm-3" key={i}>
													<UploadWorkItem
														index={i}
														data={e}
														isEdit={onEditWorkImage}
														isDelete={onDeleteWorkImage}
														type="image"
													/>
												</div>
											))}
											<div className="col-lg-3 col-md-3 col-sm-3">
												<div
													className="add-entry"
													onClick={onUploadWorkImageModal}
												>
													<i className="fas fa-plus"></i>
												</div>
											</div>
										</div>
									)}
								</div>
								<div className="upload-document">
									<label className="form-label">PDF</label>
									{uploadWork.documents.length === 0 ? (
										<button
											className="btn btn-primary button"
											onClick={onUploadWorkDocumentModal}
										>
											Add your first sample project as PDF format
											<i className="fas fa-plus"></i>
										</button>
									) : (
										<div className="row">
											{uploadWork.documents.map((e, i) => (
												<div className="col-lg-3 col-md-3 col-sm-3" key={i}>
													<UploadWorkItem
														index={i}
														data={e}
														isEdit={onEditWorkDocument}
														isDelete={onDeleteWorkDocument}
														type="document"
													/>
												</div>
											))}
											<div className="col-lg-3 col-md-3 col-sm-3">
												<div
													className="add-entry"
													onClick={onUploadWorkDocumentModal}
												>
													<i className="fas fa-plus"></i>
												</div>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="form-row">
							<div className="col-lg-2 offset-lg-10">
								<input
									type="submit"
									value="Submit"
									className="btn btn-primary btn-block button submit"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

Step6.propTypes = {
	setAlert: PropTypes.func.isRequired,
	submitResume: PropTypes.func.isRequired,
	clearError: PropTypes.func.isRequired,
	clearUser: PropTypes.func.isRequired,
	resumeSuccess: PropTypes.func.isRequired,
	resumeStep: PropTypes.func.isRequired,
	resumeState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	resumeState: state.resumeState,
});

export default connect(mapStateToProps, {
	setAlert,
	clearError,
	submitResume,
	clearUser,
	resumeSuccess,
	resumeStep,
})(Step6);
