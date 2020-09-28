import React, { useEffect, useState } from 'react';
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
    getShortlisted,
    setShortlisted,
} from './../../state/actions/candidateAction';
import { addFilter, removeFilter } from './../../state/actions/filterAction';

// Components
import ViewResume from './ViewResume';
import PaginationLink from './PaginationLink';

const ShortlistedCandidates = ({
    viewCandidates,
    addFilter,
    removeFilter,
    viewResume,
    clearResume,
    addCandidate,
    removeCandidate,
    getShortlisted,
    setShortlisted,
    candidateState: { candidates, shortlist, shortlistedInfo },
    filterState: { filter },
}) => {
    const queryParams = new URLSearchParams(window.location.search);
    const newUrl = new URL(window.location.href);
    const history = useHistory();
    const [activeMiniSlide, setActiveMiniSlide] = useState(0);
    const [seeResume, setSeeResume] = useState(false);
    const [params, setParams] = useState({
        search: '',
        viewBy: '10',
    });

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
    };

    const addShortlist = (id) => {
        addCandidate(id);
    };

    const removeShortlist = (id) => {
        removeCandidate(id);
        const oldQuery = queryParams.get('candidates');
        let newQuery = '';
        newQuery = oldQuery.split(',');
        newQuery = newQuery.filter((e) => e !== id);
        if (newQuery.length === 0) {
            newUrl.searchParams.delete('candidates');
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
                getShortlisted(queryParams.get('candidates'));
            }
        }

        if (shortlist.length === 0) {
            if (queryParams.get('candidates')) {
                setShortlisted(queryParams.get('candidates'));
            }
        }

        getShortlisted(
            queryParams.get('candidates') !== null
                ? queryParams.get('candidates')
                : []
        );

        // eslint-disable-next-line
    }, [queryParams, params, filter, shortlist, shortlistedInfo]);

    return (
        <div id="shortlistedCandidates">
            <div className="header">
                <input
                    type="text"
                    name="search"
                    className="form-control input"
                    placeholder="Search for software, specialty or keyword"
                    onChange={onChange}
                    value={params.search}
                />
                <label className="form-label view-by-label">View by</label>
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

            {seeResume ? (
                <ViewResume
                    isShow={true}
                    shortlistView={true}
                    isHide={() => {
                        setSeeResume(false);
                        clearResume();
                    }}
                    loadCandidate={() => {
                        viewCandidates();
                        clearResume();
                    }}
                />
            ) : null}
            {shortlistedInfo !== null
                ? shortlistedInfo.map((e, i) => (
                      <div className="candidate" key={i}>
                          <div className="row">
                              <div className="col-lg-2">
                                  <div className="profile mt-3 mb-5">
                                      <img
                                          src={`/uploads/${e.resumeImage}`}
                                          alt=""
                                          className="img-fluid"
                                      />
                                      <p className="name">
                                          {e.firstName} {e.lastName}
                                      </p>
                                  </div>
                                  <p className="address">{e.city}</p>
                                  <p className="per-hour">
                                      {e.expectedSalary}{' '}
                                      <span
                                          style={{
                                              color: '#0c3961',
                                              fontWeight: 600,
                                          }}
                                      >
                                          /hr
                                      </span>
                                  </p>
                                  <p className="available">{e.availability}</p>
                              </div>
                              <div className="col-lg-10">
                                  <div className="row">
                                      <div className="col-lg-7">
                                          <h6 className="title mt-3">
                                              Skills & Specialties
                                          </h6>
                                          <p className="specialty">
                                              {e.specialty}
                                          </p>
                                          <hr className="line-break" />
                                          <h6 className="title mt-3">
                                              Software Use
                                          </h6>
                                          <p className="software">
                                              {e.software}
                                          </p>
                                          <hr className="line-break" />
                                          <div className="eng-rating">
                                              <p className="eng-prof">
                                                  English Language
                                              </p>
                                              <div className="rating d-inline">
                                                  <i className="rating-color fas fa-star"></i>
                                                  <i className="rating-color fas fa-star"></i>
                                                  <i className="rating-color fas fa-star"></i>
                                                  <i className="rating-color fas fa-star"></i>
                                                  <i className="rating-color fas fa-star"></i>
                                              </div>
                                          </div>
                                          <hr className="line-break" />
                                      </div>
                                      <div className="col-lg-5">
                                          <button
                                              className="btn btn-primary button btn-block mt-3"
                                              onClick={() => {
                                                  setSeeResume(true);
                                                  viewResume(e._id);
                                              }}
                                          >
                                              See Full Resume
                                          </button>
                                          <button
                                              className="btn btn-primary button btn-block mt-3"
                                              onClick={() => {
                                                  removeShortlist(e._id);
                                              }}
                                          >
                                              Remove from Shortlist
                                          </button>
                                      </div>
                                      <div className="col-lg-12">
                                          <div className="recruiter-comments">
                                              <p
                                                  style={{
                                                      color: '#298494',
                                                      fontWeight: 600,
                                                  }}
                                              >
                                                  Recruitment's Comments
                                              </p>
                                              {e.recruitmentsComment.length >
                                              0 ? (
                                                  e.recruitmentsComment.map(
                                                      (element, index) => (
                                                          <li
                                                              className="item"
                                                              key={index}
                                                          >
                                                              {element}
                                                          </li>
                                                      )
                                                  )
                                              ) : (
                                                  <p>No comment</p>
                                              )}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))
                : 'No New Candidate'}
            <div className="footer">
                <div
                    className={`ml-auto${
                        shortlist && shortlist.length === 0 ? ' invisible' : ''
                    }`}
                >
                    {/* <PaginationLink /> */}
                </div>
                <label className="form-label view-by-label">View by</label>
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
    );
};

ShortlistedCandidates.propTypes = {
    candidateState: PropTypes.object.isRequired,
    filterState: PropTypes.object.isRequired,
    viewCandidates: PropTypes.func.isRequired,
    addFilter: PropTypes.func.isRequired,
    viewResume: PropTypes.func.isRequired,
    clearResume: PropTypes.func.isRequired,
    addCandidate: PropTypes.func.isRequired,
    removeCandidate: PropTypes.func.isRequired,
    getShortlisted: PropTypes.func.isRequired,
    setShortlisted: PropTypes.func.isRequired,
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
    getShortlisted,
    setShortlisted,
})(ShortlistedCandidates);
