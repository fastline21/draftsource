import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Carousel } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// Actions
import {
    rejectedApplicants,
    viewResume,
    clearResume,
} from './../../state/actions/candidateAction';
import { addFilter, removeFilter } from './../../state/actions/filterAction';

// Components
import ViewResume from './ViewResume';
import PaginationLink from './PaginationLink';

const RejectedApplicants = ({
    rejectedApplicants,
    addFilter,
    removeFilter,
    viewResume,
    clearResume,
    candidateState: { candidates },
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

        // eslint-disable-next-line
    }, [queryParams, params, filter, candidates]);

    return (
        <div id="admin">
            <div className="header">
                <input
                    type="text"
                    name="search"
                    className="form-control input"
                    placeholder="Search remote keywords"
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
            <div id="rejectedApplicants">
                {seeResume ? (
                    <ViewResume
                        isShow={true}
                        isHide={() => {
                            setSeeResume(false);
                            clearResume();
                        }}
                        loadCandidate={() => {
                            rejectedApplicants();
                            clearResume();
                        }}
                    />
                ) : null}
                {candidates !== null
                    ? candidates.map((e, i) => (
                          <div className="candidate" key={i}>
                              <div className="row">
                                  <div className="col-lg-8">
                                      <div className="d-flex justify-content-between mt-3">
                                          <div className="profile flex-fill">
                                              <img
                                                  src={`/uploads/${e.resumeImage}`}
                                                  alt=""
                                                  className="img-fluid"
                                              />
                                              <p className="name">
                                                  {e.firstName} {e.lastName}
                                              </p>
                                              <span className="address">
                                                  {e.city}
                                              </span>
                                          </div>
                                          <div className="available mr-5 flex-shrink-1">
                                              <p
                                                  style={{
                                                      fontSize: '12px',
                                                      color: '#606060',
                                                      marginBottom: '6px',
                                                  }}
                                              >
                                                  Availability
                                              </p>
                                              <p className="available">
                                                  {e.availability}
                                              </p>
                                          </div>
                                          <div className="submitted mr-5 flex-shrink-1">
                                              <p
                                                  style={{
                                                      fontSize: '12px',
                                                      color: '#606060',
                                                      marginBottom: '6px',
                                                  }}
                                              >
                                                  Date Submitted
                                              </p>
                                              {moment(e.dateCreated).format(
                                                  'MM-DD-YYYY'
                                              )}
                                          </div>
                                          <div className="submitted flex-shrink-1">
                                              <p
                                                  style={{
                                                      fontSize: '12px',
                                                      color: '#606060',
                                                      marginBottom: '6px',
                                                  }}
                                              >
                                                  Time Submitted
                                              </p>
                                              {moment(e.dateCreated).format(
                                                  'h:mm a'
                                              )}
                                          </div>
                                      </div>
                                      <div className="d-flex"></div>
                                      <hr className="line-break" />
                                      <p className="specialty">
                                          {e.specialty.join(', ')},{' '}
                                          {e.software.join(', ')}
                                      </p>
                                      <button
                                          className="link"
                                          onClick={() => {
                                              setSeeResume(true);
                                              viewResume(e._id);
                                          }}
                                      >
                                          View Resume
                                      </button>
                                  </div>

                                  <div className="col-lg-4">
                                      <div className="mini-slide">
                                          <Carousel
                                              activeIndex={activeMiniSlide}
                                              interval={null}
                                              onSelect={miniSlideSelect}
                                              indicators={false}
                                              nextIcon={
                                                  <i
                                                      className="fas fa-caret-right"
                                                      aria-hidden="true"
                                                  ></i>
                                              }
                                              prevIcon={
                                                  <i
                                                      className="fas fa-caret-left"
                                                      aria-hidden="true"
                                                  ></i>
                                              }
                                          >
                                              {e.uploadWork.images.map(
                                                  (e, i) => (
                                                      <Carousel.Item key={i}>
                                                          <img
                                                              src={`/uploads/${e.file}`}
                                                              className="d-block w-100"
                                                              alt="..."
                                                          />
                                                      </Carousel.Item>
                                                  )
                                              )}
                                          </Carousel>
                                          <span className="num">
                                              {activeMiniSlide + 1} of{' '}
                                              {e.uploadWork.images.length}
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      ))
                    : 'No New Candidate'}
            </div>
            <div className="footer">
                <PaginationLink />
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

RejectedApplicants.propTypes = {
    candidateState: PropTypes.object.isRequired,
    filterState: PropTypes.object.isRequired,
    rejectedApplicants: PropTypes.func.isRequired,
    addFilter: PropTypes.func.isRequired,
    viewResume: PropTypes.func.isRequired,
    clearResume: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    candidateState: state.candidateState,
    filterState: state.filterState,
});

export default connect(mapStateToProps, {
    rejectedApplicants,
    addFilter,
    removeFilter,
    viewResume,
    clearResume,
})(RejectedApplicants);
