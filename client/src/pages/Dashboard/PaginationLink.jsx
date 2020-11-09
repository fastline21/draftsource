import React, { useEffect, useState } from 'react';
// import { Pagination } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';

// Actions
import { addFilter } from './../../state/actions/filterAction';
import { loadUser } from '../../state/actions/userAction';

const PaginationLink = ({
	type,
	loadCandidate,
	loadJob,
	loadUser,
	addFilter,
	filterState: { filter },
	candidateState: { total: candidateTotal },
	jobState: { total: jobTotal },
	userState: { total: userTotal },
}) => {
	const queryParams = new URLSearchParams(window.location.search);
	const newUrl = new URL(window.location.href);
	const history = useHistory();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [total, setTotal] = useState(0);
	let pageNumbers = [];

	for (let i = 1; i <= Math.ceil(total / filter.limit); i++) {
		pageNumbers.push(i);
	}

	const paginate = (number) => {
		if (number !== page) {
			newUrl.searchParams.set('page', number);
			setPage(number);
			addFilter({ page: number });

			history.push({
				pathname: newUrl.pathname,
				search: newUrl.search,
			});

			if (type === 'Candidate') {
				loadCandidate();
			}

			if (type === 'Job') {
				loadJob();
			}

			if (type === 'User') {
				loadUser();
			}
		}
	};

	useEffect(() => {
		if (parseInt(queryParams.get('page')) !== parseInt(filter.page)) {
			if (parseInt(queryParams.get('page'))) {
				addFilter({ page: parseInt(queryParams.get('page')) });
				setPage(queryParams.get('page'));
			} else {
				if (page !== filter.page) {
					addFilter({ page: 1 });
				}
			}
		}

		if (parseInt(queryParams.get('limit')) !== parseInt(filter.limit)) {
			if (parseInt(queryParams.get('limit'))) {
				addFilter({ limit: parseInt(queryParams.get('limit')) });
				setLimit(queryParams.get('limit'));
			} else {
				if (limit !== filter.limit) {
					addFilter({ limit: 10 });
				}
			}
		}

		if (type === 'Candidate') {
			setTotal(candidateTotal);
		}

		if (type === 'Job') {
			setTotal(jobTotal);
		}

		if (type === 'User') {
			setTotal(userTotal);
		}

		// eslint-disable-next-line
	}, [
		filter,
		queryParams,
		candidateTotal,
		jobTotal,
		pageNumbers,
		type,
		userTotal,
	]);

	const onPageChange = (data) => {
		paginate(data.selected + 1);
	};

	return (
		// <Pagination>
		//     <Pagination.Prev onClick={() => paginate(previous.page)} />
		//     {pageNumbers.map((number) => (
		//         <Pagination.Item
		//             key={number}
		//             active={number === parseInt(page)}
		//             onClick={() => paginate(number)}
		//         >
		//             {number}
		//         </Pagination.Item>
		//     ))}
		//     <Pagination.Next onClick={() => paginate(next.page)} />
		// </Pagination>
		<ReactPaginate
			previousLabel={<i className="fas fa-caret-left"></i>}
			nextLabel={<i className="fas fa-caret-right"></i>}
			breakLabel={'...'}
			breakClassName={'page-item disabled'}
			breakLinkClassName={'page-link'}
			pageCount={pageNumbers.length}
			pageClassName={'page-item'}
			pageLinkClassName={'page-link'}
			previousClassName={'page-item'}
			previousLinkClassName={'page-link'}
			nextLinkClassName={'page-link'}
			nextClassName={'page-item'}
			marginPagesDisplayed={2}
			pageRangeDisplayed={3}
			containerClassName={'pagination'}
			subContainerClassName={'pages pagination'}
			activeClassName={'active'}
			onPageChange={onPageChange}
			forcePage={filter.page - 1}
		/>
	);
};

PaginationLink.propTypes = {
	addFilter: PropTypes.func.isRequired,
	filterState: PropTypes.object.isRequired,
	candidateState: PropTypes.object.isRequired,
	jobState: PropTypes.object.isRequired,
	userState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	filterState: state.filterState,
	candidateState: state.candidateState,
	jobState: state.jobState,
	userState: state.userState,
});

export default connect(mapStateToProps, {
	addFilter,
})(PaginationLink);
