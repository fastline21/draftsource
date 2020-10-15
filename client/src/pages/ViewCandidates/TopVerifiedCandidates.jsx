import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Actions
import {
	viewCandidates,
	viewResume,
	clearResume,
	addCandidate,
	removeCandidate,
} from './../../state/actions/candidateAction';
import { addFilter, removeFilter } from './../../state/actions/filterAction';

// Components
import ViewResume from './ViewResume';
import PaginationLink from './PaginationLink';
import Candidates from './Candidates';

// Utils
import useWindowSize from './../../utils/useWindowSize';

const TopVerifiedCandidates = ({
	viewCandidates,
	addFilter,
	removeFilter,
	viewResume,
	clearResume,
	addCandidate,
	removeCandidate,
	candidateState: { candidates, shortlist, resume },
	filterState: { filter },
}) => {
	const queryParams = new URLSearchParams(window.location.search);
	const newUrl = new URL(window.location.href);
	const history = useHistory();
	const [activeMiniSlide, setActiveMiniSlide] = useState(0);
	const [seeResume, setSeeResume] = useState(false);
	const [showFilter, setShowFilter] = useState(false);
	const [params, setParams] = useState({
		search: '',
		viewBy: '10',
	});
	const windowSize = useWindowSize();

	const miniSlideSelect = (selectedIndex) => {
		setActiveMiniSlide(selectedIndex);
	};

	const onChange = (e) => {
		const { name, value } = e.target;

		if (value === '') {
			newUrl.searchParams.delete(name);
		} else {
			newUrl.searchParams.set(name, value);
		}

		setParams({ ...params, [name]: value });

		if (name === 'limit') {
			addFilter({ [name]: parseInt(value) });
		} else {
			addFilter({ [name]: value });
		}

		if (queryParams.get('page')) {
			newUrl.searchParams.set('page', 1);
		}

		history.push({
			pathname: newUrl.pathname,
			search: newUrl.search,
		});

		viewCandidates();
	};

	const addShortlist = (id) => {
		addCandidate(id);
	};

	const removeShortlist = (id) => {
		removeCandidate(id);
	};

	useEffect(() => {
		if (queryParams.get('search') !== null) {
			if (params.search === '') {
				addFilter({ search: queryParams.get('search') });
				setParams({ ...params, search: queryParams.get('search') });
			}
		} else {
			if (filter.search) {
				const { search, ...newFilter } = filter;
				removeFilter(newFilter);
			}
		}

		if (windowSize.width > 1023) {
			document.getElementById('filterMobile').removeAttribute('style');
			document.getElementById('mobileOverlay1').removeAttribute('style');
		}

		if (showFilter) {
			document.getElementById('filterMobile').style.left = 0;
			document.getElementById('mobileOverlay1').style.cssText =
				'visibility: visible; opacity: 1';
			setShowFilter(false);
		}

		// eslint-disable-next-line
	}, [queryParams, params, filter, candidates, windowSize]);

	return (
		<Fragment>
			<div className="top">
				<input
					type="text"
					className="form-control input"
					name="search"
					placeholder="Search for software, specialty or keyword"
					onChange={onChange}
					value={params.search}
				/>
				<div className="view-by">
					<label htmlFor="viewByInput" className="form-label">
						View By
					</label>
					<select
						className="form-control input"
						name="limit"
						onChange={onChange}
						value={parseInt(
							queryParams.get('limit') || params.viewBy
						)}
					>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
					</select>
					<button
						className="btn btn-primary button filter"
						onClick={() => setShowFilter(true)}
					>
						<i className="fas fa-filter"></i> Filter
					</button>
				</div>
			</div>
			<ViewResume isShow={resume !== null ? true : false} />
			<Candidates isShortlisted={false} />
			<div className="foot">
				<PaginationLink />
				<div className="view-by">
					<label htmlFor="viewByInput" className="form-label">
						View By
					</label>
					<select
						className="form-control input"
						name="limit"
						onChange={onChange}
						value={parseInt(
							queryParams.get('limit') || params.viewBy
						)}
					>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
					</select>
				</div>
			</div>
		</Fragment>
	);
};

TopVerifiedCandidates.propTypes = {
	candidateState: PropTypes.object.isRequired,
	filterState: PropTypes.object.isRequired,
	viewCandidates: PropTypes.func.isRequired,
	addFilter: PropTypes.func.isRequired,
	viewResume: PropTypes.func.isRequired,
	clearResume: PropTypes.func.isRequired,
	addCandidate: PropTypes.func.isRequired,
	removeCandidate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	candidateState: state.candidateState,
	filterState: state.filterState,
});

export default connect(mapStateToProps, {
	viewCandidates,
	addFilter,
	removeFilter,
	viewResume,
	addCandidate,
	removeCandidate,
	clearResume,
})(TopVerifiedCandidates);
