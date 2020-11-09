import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Lists
// import { availabilityList } from './../../list/Availability';
import { specialtyList } from './../../list/Specialty';
import { softwareList } from './../../list/Software';
import { marketTypeList } from './../../list/MarketType';
import { experienceList } from '../../list/Experience';
import { countryList } from '../../list/Country';
// import { salaryList } from '../../list/Salary';
import { ratingList } from '../../list/Rating';

// Actions
import {
	addFilter,
	removeFilter,
	updateFilter,
} from './../../state/actions/filterAction';

const Filter = ({
	loadData,
	addFilter,
	updateFilter,
	removeFilter,
	filterState: { filter },
}) => {
	const queryParams = new URLSearchParams(window.location.search);
	const newUrl = new URL(window.location.href);
	const history = useHistory();
	const [show, setShow] = useState({
		// availabilityCat: false,
		specialtyCat: false,
		softwareCat: false,
		marketTypeCat: false,
		experienceCat: false,
		countryCat: false,
		salaryCat: false,
		ratingCat: false,
	});
	const [suggest, setSuggest] = useState({
		text: '',
		suggestions: [],
	});
	const onShow = (e) => {
		e.preventDefault();
		const { name } = e.target;
		if (name !== undefined) {
			setShow({ ...show, [name]: !show[name] });
		} else {
			setShow({
				...show,
				[e.target.parentElement.name]: !show[e.target.parentElement.name],
			});
		}
	};
	const onChange = (e) => {
		const { name, value } = e.target;
		const {
			specialty,
			software,
			marketType,
			experience,
			country,
			salary,
			rating,
		} = filter;

		// if (
		// 	// name === 'availability' ||
		// 	name === 'experience' ||
		// 	name === 'country' ||
		// 	name === 'salary' ||
		// 	name === 'rating'
		// ) {
		// 	addFilter({ [name]: value });
		// }

		if (name === 'specialty') {
			if (specialty === undefined) {
				addFilter({ [name]: [value] });
			} else if (specialty.includes(value)) {
				updateFilter({
					[name]: [...specialty.filter((x) => x !== value)],
				});
			} else {
				updateFilter({ [name]: [...specialty, value] });
			}
		}

		if (name === 'software') {
			if (software === undefined) {
				addFilter({ [name]: [value] });
			} else if (software.includes(value)) {
				updateFilter({
					[name]: [...software.filter((x) => x !== value)],
				});
			} else {
				updateFilter({ [name]: [...software, value] });
			}
		}

		if (name === 'marketType') {
			if (marketType === undefined) {
				addFilter({ [name]: [value] });
			} else if (marketType.includes(value)) {
				updateFilter({
					[name]: [...marketType.filter((x) => x !== value)],
				});
			} else {
				updateFilter({ [name]: [...marketType, value] });
			}
		}

		if (name === 'experience') {
			if (experience === undefined) {
				addFilter({ [name]: [value] });
			} else if (experience.includes(value)) {
				updateFilter({
					[name]: [...experience.filter((x) => x !== value)],
				});
			} else {
				updateFilter({ [name]: [...experience, value] });
			}
		}

		if (name === 'country') {
			if (country === undefined) {
				addFilter({ [name]: [value] });
			} else if (country.includes(value)) {
				updateFilter({
					[name]: [...country.filter((x) => x !== value)],
				});
			} else {
				updateFilter({ [name]: [...country, value] });
			}
		}

		if (name === 'salary') {
			if (salary === undefined) {
				addFilter({ [name]: [value] });
			} else if (salary.includes(value)) {
				updateFilter({
					[name]: [...salary.filter((x) => x !== value)],
				});
			} else {
				updateFilter({ [name]: [...salary, value] });
			}
		}

		if (name === 'rating') {
			if (rating === undefined) {
				addFilter({ [name]: [value] });
			} else if (rating.includes(value)) {
				updateFilter({
					[name]: [...rating.filter((x) => x !== value)],
				});
			} else {
				updateFilter({ [name]: [...rating, value] });
			}
		}

		const oldData = queryParams.get(name);
		let newData;

		if (oldData) {
			newData = oldData.split(',');

			if (newData.includes(value)) {
				newData = newData.filter((e) => e !== value);
			} else {
				newData.push(value);
			}

			if (newData.length !== 0) {
				newData = newData.join(',');
				newUrl.searchParams.set(name, newData);
			} else {
				newUrl.searchParams.delete(name);
			}
			// if (
			// 	// name === 'availability' ||
			// 	name === 'experience' ||
			// 	name === 'country' ||
			// 	name === 'salary' ||
			// 	name === 'rating'
			// ) {
			// 	newUrl.searchParams.set(name, value);
			// } else {
			// 	if (newData.includes(value)) {
			// 		newData = newData.filter((e) => e !== value);
			// 	} else {
			// 		newData.push(value);
			// 	}

			// 	if (newData.length !== 0) {
			// 		newData = newData.join(',');
			// 		newUrl.searchParams.set(name, newData);
			// 	} else {
			// 		newUrl.searchParams.delete(name);
			// 	}
			// }
		} else {
			newUrl.searchParams.set(name, value);
		}

		if (queryParams.get('page')) {
			newUrl.searchParams.set('page', 1);
		}

		history.push({
			pathname: newUrl.pathname,
			search: newUrl.search,
		});

		loadData();
	};
	const onChangeCountry = (e) => {
		const { value } = e.target;
		let suggestions = [];
		if (value.length > 0) {
			const regex = new RegExp(`^${value}`, 'i');
			suggestions = countryList()
				.sort()
				.filter((v) => regex.test(v));
		}
		setSuggest({ ...suggest, suggestions, text: value });
	};
	const renderSuggestionsCountry = () => {
		const { suggestions } = suggest;
		if (suggestions.length === 0) {
			return null;
		}
		return (
			<ul className="list-group pt-3" style={{ marginRight: '15px' }}>
				{suggestions.map((e, i) => (
					<li
						key={i}
						onClick={() => suggestionsSelected(e)}
						className="list-group-item list-group-item-action"
						style={{ cursor: 'pointer' }}
					>
						{e}
					</li>
				))}
			</ul>
		);
	};
	const suggestionsSelected = (value) => {
		addFilter({ country: [value] });
		setSuggest({ ...suggest, text: value, suggestions: [] });
		newUrl.searchParams.set('country', value);
		history.push({
			pathname: newUrl.pathname,
			search: newUrl.search,
		});

		loadData();
	};

	useEffect(() => {
		// if (queryParams.get('availability') !== filter.availability) {
		// 	if (queryParams.get('availability')) {
		// 		addFilter({ availability: queryParams.get('availability') });
		// 	} else {
		// 		if (filter.availability) {
		// 			const { availability, ...newFilter } = filter;
		// 			removeFilter(newFilter);
		// 		}
		// 	}
		// }

		const specialty =
			queryParams.get('specialty') !== null
				? queryParams.get('specialty').split(',')
				: [];

		if (specialty.length > 0) {
			if (filter.specialty === undefined) {
				addFilter({ specialty });
			}
		} else {
			if (filter.specialty) {
				const { specialty, ...newFilter } = filter;
				removeFilter(newFilter);
			}
		}

		const software =
			queryParams.get('software') !== null
				? queryParams.get('software').split(',')
				: [];

		if (software.length > 0) {
			if (filter.software === undefined) {
				addFilter({ software });
			}
		} else {
			if (filter.software) {
				const { software, ...newFilter } = filter;
				removeFilter(newFilter);
			}
		}

		const marketType =
			queryParams.get('marketType') !== null
				? queryParams.get('marketType').split(',')
				: [];

		if (marketType.length > 0) {
			if (filter.marketType === undefined) {
				addFilter({ marketType });
			}
		} else {
			if (filter.marketType) {
				const { marketType, ...newFilter } = filter;
				removeFilter(newFilter);
			}
		}

		const experience =
			queryParams.get('experience') !== null
				? queryParams.get('experience').split(',')
				: [];

		if (experience.length > 0) {
			if (filter.experience === undefined) {
				addFilter({ experience });
			}
		} else {
			if (filter.experience) {
				const { experience, ...newFilter } = filter;
				removeFilter(newFilter);
			}
		}

		const country =
			queryParams.get('country') !== null
				? queryParams.get('country').split(',')
				: [];

		if (country.length > 0) {
			if (filter.country === undefined) {
				addFilter({ country });
				setSuggest({ ...suggest, text: country });
			}
		} else {
			if (filter.country) {
				const { country, ...newFilter } = filter;
				removeFilter(newFilter);
			}
		}

		const salary =
			queryParams.get('salary') !== null
				? queryParams.get('salary').split(',')
				: [];

		if (salary.length > 0) {
			if (filter.salary === undefined) {
				addFilter({ salary });
			}
		} else {
			if (filter.salary) {
				const { salary, ...newFilter } = filter;
				removeFilter(newFilter);
			}
		}

		const rating =
			queryParams.get('rating') !== null
				? queryParams.get('rating').split(',')
				: [];

		if (rating.length > 0) {
			if (filter.rating === undefined) {
				addFilter({ rating });
			}
		} else {
			if (filter.rating) {
				const { rating, ...newFilter } = filter;
				removeFilter(newFilter);
			}
		}

		// eslint-disable-next-line
	}, [queryParams, filter]);

	return (
		<div className="filter">
			<h4 className="title">Filter by</h4>
			<ul className="nav flex-column">
				{/* <li className="nav-item">
					<Link
						className="nav-link"
						to="#"
						name="availabilityCat"
						onClick={onShow}
					>
						Availability{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.availabilityCat ? 'angle-up' : 'angle-down'
							}`}
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.availabilityCat ? ' d-block' : ' d-none'
						}`}
					>
						{availabilityList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.availability &&
									filter.availability === e
										? ' checked'
										: ''
								}`}
							>
								<input
									type="radio"
									name="availability"
									className="filter-input"
									id={`availability${i}`}
									value={e}
									onChange={onChange}
									checked={
										filter.availability &&
										filter.availability === e
									}
								/>
								<label
									htmlFor={`availability${i}`}
									className="filter-label"
								>
									{e}
								</label>
							</li>
						))}
					</ul>
				</li> */}
				<li className="nav-item">
					<Link
						className="nav-link"
						to="#"
						name="specialtyCat"
						onClick={onShow}
					>
						Specialty{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.specialtyCat ? 'angle-up' : 'angle-down'
							}`}
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.specialtyCat ? ' d-block' : ' d-none'
						}`}
					>
						{specialtyList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.specialty && filter.specialty.includes(e)
										? ' checked'
										: ''
								}`}
							>
								<input
									type="checkbox"
									name="specialty"
									className="filter-input"
									id={`specialty${i}`}
									value={e}
									onChange={onChange}
									checked={filter.specialty && filter.specialty.includes(e)}
								/>
								<label htmlFor={`specialty${i}`} className="filter-label">
									{e}
								</label>
							</li>
						))}
					</ul>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="#" name="softwareCat" onClick={onShow}>
						Software Expertise{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.softwareCat ? 'angle-up' : 'angle-down'
							}`}
							name="softwareCat"
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.softwareCat ? ' d-block' : ' d-none'
						}`}
					>
						{softwareList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.software && filter.software.includes(e)
										? ' checked'
										: ''
								}`}
							>
								<input
									type="checkbox"
									name="software"
									className="filter-input"
									id={`software${i}`}
									value={e}
									onChange={onChange}
									checked={filter.software && filter.software.includes(e)}
								/>
								<label htmlFor={`software${i}`} className="filter-label">
									{e}
								</label>
							</li>
						))}
					</ul>
				</li>
				<li className="nav-item">
					<Link
						className="nav-link"
						to="#"
						name="marketTypeCat"
						onClick={onShow}
					>
						Market Experience{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.marketTypeCat ? 'angle-up' : 'angle-down'
							}`}
							name="marketTypeCat"
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.marketTypeCat ? ' d-block' : ' d-none'
						}`}
					>
						{marketTypeList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.marketType && filter.marketType.includes(e)
										? ' checked'
										: ''
								}`}
							>
								<input
									type="checkbox"
									name="marketType"
									className="filter-input"
									id={`marketType${i}`}
									value={e}
									onChange={onChange}
									checked={filter.marketType && filter.marketType.includes(e)}
								/>
								<label htmlFor={`marketType${i}`} className="filter-label">
									{e}
								</label>
							</li>
						))}
					</ul>
				</li>
				<li className="nav-item">
					<Link
						className="nav-link"
						to="#"
						name="experienceCat"
						onClick={onShow}
					>
						Years of Experience{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.experienceCat ? 'angle-up' : 'angle-down'
							}`}
							name="experienceCat"
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.experienceCat ? ' d-block' : ' d-none'
						}`}
					>
						{experienceList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.experience && filter.experience.includes(e)
										? ' checked'
										: ''
								}`}
							>
								<input
									type="checkbox"
									name="experience"
									className="filter-input"
									id={`experience${i}`}
									value={e}
									onChange={onChange}
									checked={filter.experience && filter.experience.includes(e)}
								/>
								<label htmlFor={`experience${i}`} className="filter-label">
									{e}
								</label>
							</li>
						))}
					</ul>
				</li>
				{/* <li className="nav-item">
					<Link className="nav-link" to="#" name="salaryCat" onClick={onShow}>
						Expected Salaries{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.salaryCat ? 'angle-up' : 'angle-down'
							}`}
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.salaryCat ? ' d-block' : ' d-none'
						}`}
					>
						{salaryList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.salary && filter.salary.includes(e) ? ' checked' : ''
								}`}
							>
								<input
									type="checkbox"
									name="salary"
									className="filter-input"
									id={`salary${i}`}
									value={e}
									onChange={onChange}
									checked={filter.salary && filter.salary.includes(e)}
								/>
								<label htmlFor={`salary${i}`} className="filter-label">
									{e}
								</label>
							</li>
						))}
					</ul>
				</li> */}
				<li className="nav-item">
					<Link className="nav-link" to="#" name="ratingCat" onClick={onShow}>
						English Level{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.ratingCat ? 'angle-up' : 'angle-down'
							}`}
							name="ratingCat"
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.ratingCat ? ' d-block' : ' d-none'
						}`}
					>
						{ratingList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.rating && filter.rating.includes(e) ? ' checked' : ''
								}`}
							>
								<input
									type="checkbox"
									name="rating"
									className="filter-input"
									id={`rating${i}`}
									value={e}
									onChange={onChange}
									checked={filter.rating && filter.rating.includes(e)}
								/>
								<label htmlFor={`rating${i}`} className="filter-label">
									{e}
								</label>
							</li>
						))}
					</ul>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="#" name="countryCat" onClick={onShow}>
						Country Experience{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.countryCat ? 'angle-up' : 'angle-down'
							}`}
							name="countryCat"
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.countryCat ? ' d-block' : ' d-none'
						}`}
					>
						{/* {countryList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.country && filter.country.includes(e) ? ' checked' : ''
								}`}
							>
								<input
									type="checkbox"
									name="country"
									className="filter-input"
									id={`country${i}`}
									value={e}
									onChange={onChange}
									checked={filter.country && filter.country.includes(e)}
								/>
								<label htmlFor={`country${i}`} className="filter-label">
									{e}
								</label>
							</li>
						))} */}
						<input
							type="text"
							name="country"
							className="form-control input"
							style={{ width: '190px' }}
							onChange={onChangeCountry}
							value={suggest.text}
						/>
						{renderSuggestionsCountry()}
					</ul>
				</li>
				{/* <li className="nav-item">
					<Link
						className="nav-link"
						to="#"
						name="experienceCat"
						onClick={onShow}
					>
						Years of Experience{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.experienceCat ? 'angle-up' : 'angle-down'
							}`}
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.experienceCat ? ' d-block' : ' d-none'
						}`}
					>
						{experienceList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.experience && filter.experience === e
										? ' checked'
										: ''
								}`}
							>
								<input
									type="radio"
									name="experience"
									className="filter-input"
									id={`experience${i}`}
									value={e}
									onChange={onChange}
									checked={
										filter.experience &&
										filter.experience === e
									}
								/>
								<label
									htmlFor={`experience${i}`}
									className="filter-label"
								>
									{e}
								</label>
							</li>
						))}
					</ul>
				</li> */}
				{/* <li className="nav-item">
					<Link
						className="nav-link"
						to="#"
						name="countryCat"
						onClick={onShow}
					>
						Country Experience{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.countryCat ? 'angle-up' : 'angle-down'
							}`}
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.countryCat ? ' d-block' : ' d-none'
						}`}
					>
						{countryList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.country && filter.country === e
										? ' checked'
										: ''
								}`}
							>
								<input
									type="radio"
									name="country"
									className="filter-input"
									id={`country${i}`}
									value={e}
									onChange={onChange}
									checked={
										filter.country && filter.country === e
									}
								/>
								<label
									htmlFor={`country${i}`}
									className="filter-label"
								>
									{e}
								</label>
							</li>
						))}
					</ul>
				</li> */}
				{/* <li className="nav-item">
					<Link
						className="nav-link"
						to="#"
						name="salaryCat"
						onClick={onShow}
					>
						Expected Salaries{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.salaryCat ? 'angle-up' : 'angle-down'
							}`}
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.salaryCat ? ' d-block' : ' d-none'
						}`}
					>
						{salaryList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.salary && filter.salary === e
										? ' checked'
										: ''
								}`}
							>
								<input
									type="radio"
									name="salary"
									className="filter-input"
									id={`salary${i}`}
									value={e}
									onChange={onChange}
									checked={
										filter.salary && filter.salary === e
									}
								/>
								<label
									htmlFor={`salary${i}`}
									className="filter-label"
								>
									{e}
								</label>
							</li>
						))}
					</ul>
				</li> */}
				{/* <li className="nav-item">
					<Link
						className="nav-link"
						to="#"
						name="ratingCat"
						onClick={onShow}
					>
						English Proficiency{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.ratingCat ? 'angle-up' : 'angle-down'
							}`}
						></i>
					</Link>
					<ul
						className={`nav flex-column filter-dropdown${
							show.ratingCat ? ' d-block' : ' d-none'
						}`}
					>
						{ratingList().map((e, i) => (
							<li
								key={i}
								className={`nav-item${
									filter.rating &&
									filter.rating === e.toString()
										? ' checked'
										: ''
								}`}
							>
								<input
									type="checkbox"
									name="rating"
									className="filter-input"
									id={`rating${i}`}
									value={e}
									onChange={onChange}
									checked={
										filter.rating && filter.rating === e
									}
								/>
								<label
									htmlFor={`rating${i}`}
									className="filter-label"
								>
									<div className="rating">
										<i
											className={`rating-color fas fa-star${
												e >= 1 ? ` checked` : ''
											}`}
										></i>
										<i
											className={`rating-color fas fa-star${
												e >= 2 ? ` checked` : ''
											}`}
										></i>
										<i
											className={`rating-color fas fa-star${
												e >= 3 ? ` checked` : ''
											}`}
										></i>
										<i
											className={`rating-color fas fa-star${
												e >= 4 ? ` checked` : ''
											}`}
										></i>
										<i
											className={`rating-color fas fa-star${
												e === 5 ? ` checked` : ''
											}`}
										></i>
									</div>
								</label>
							</li>
						))}
					</ul>
				</li> */}
			</ul>
		</div>
	);
};

Filter.propTypes = {
	addFilter: PropTypes.func.isRequired,
	updateFilter: PropTypes.func.isRequired,
	filterState: PropTypes.object.isRequired,
	removeFilter: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	filterState: state.filterState,
});

export default connect(mapStateToProps, {
	addFilter,
	updateFilter,
	removeFilter,
})(Filter);
