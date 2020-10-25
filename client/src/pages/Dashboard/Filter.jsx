import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Lists
import { availabilityList } from './../../list/Availability';
import { specialtyList } from './../../list/Specialty';
import { softwareList } from './../../list/Software';

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
		availabilityCat: false,
		specialtyCat: false,
		softwareCat: false,
	});
	const onShow = (e) => {
		e.preventDefault();
		const { name } = e.target;
		setShow({ ...show, [name]: !show[name] });
	};
	const onChange = (e) => {
		const { name, value } = e.target;
		const { specialty, software } = filter;

		if (name === 'availability') {
			addFilter({ [name]: value });
		}

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

		const oldData = queryParams.get(name);
		let newData;

		if (oldData) {
			newData = oldData.split(',');

			if (name === 'availability') {
				newUrl.searchParams.set(name, value);
			} else {
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
			}
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

	useEffect(() => {
		if (queryParams.get('availability') !== filter.availability) {
			if (queryParams.get('availability')) {
				addFilter({ availability: queryParams.get('availability') });
			} else {
				if (filter.availability) {
					const { availability, ...newFilter } = filter;
					removeFilter(newFilter);
				}
			}
		}

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

		// eslint-disable-next-line
	}, [queryParams, filter]);

	return (
		<div className="filter">
			<h4 className="title">Filter by</h4>
			<ul className="nav flex-column">
				<li className="nav-item">
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
									filter.availability && filter.availability === e
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
									checked={filter.availability && filter.availability === e}
								/>
								<label htmlFor={`availability${i}`} className="filter-label">
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
						Software Use{' '}
						<i
							className={`fas float-right pt-1 fa-${
								show.softwareCat ? 'angle-up' : 'angle-down'
							}`}
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
