import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Actions
import {
	getShortlisted,
	setShortlisted,
} from './../../state/actions/candidateAction';
import { addFilter, removeFilter } from './../../state/actions/filterAction';

// Components
import ViewResume from './ViewResume';
import PaginationLink from './PaginationLink';
import Candidates from './Candidates';

const ShortlistedCandidates = ({
	addFilter,
	removeFilter,
	getShortlisted,
	setShortlisted,
	candidateState: { candidates, shortlist, shortlistedInfo, resume },
	filterState: { filter },
}) => {
	const queryParams = new URLSearchParams(window.location.search);
	const newUrl = new URL(window.location.href);
	const history = useHistory();
	const [params, setParams] = useState({
		search: '',
		viewBy: '10',
	});

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

		if (queryParams.get('candidates') !== null) {
			if (shortlist.length === 0) {
				getShortlisted(queryParams.get('candidates').split(','));
			}
		}

		if (shortlistedInfo.length !== shortlist.length) {
			getShortlisted(
				queryParams.get('candidates') !== null
					? queryParams.get('candidates').split(',')
					: []
			);
		}

		if (shortlist.length === 0) {
			if (queryParams.get('candidates')) {
				setShortlisted(queryParams.get('candidates').split(','));
			}
		}

		// eslint-disable-next-line
	}, [queryParams, params, filter, shortlist, shortlistedInfo]);

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
						value={parseInt(queryParams.get('limit') || params.viewBy)}
					>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
					</select>
				</div>
			</div>
			<ViewResume isShow={resume !== null ? true : false} />
			<Candidates isShortlisted={true} />
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
						value={parseInt(queryParams.get('limit') || params.viewBy)}
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

ShortlistedCandidates.propTypes = {
	candidateState: PropTypes.object.isRequired,
	filterState: PropTypes.object.isRequired,
	addFilter: PropTypes.func.isRequired,
	getShortlisted: PropTypes.func.isRequired,
	setShortlisted: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	candidateState: state.candidateState,
	filterState: state.filterState,
});

export default connect(mapStateToProps, {
	addFilter,
	removeFilter,
	getShortlisted,
	setShortlisted,
})(ShortlistedCandidates);
