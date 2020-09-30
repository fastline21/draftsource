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
} from './../../state/actions/candidateAction';
import { addFilter, removeFilter } from './../../state/actions/filterAction';

// Components
import ViewResume from './ViewResume';
import PaginationLink from './PaginationLink';

const TopVerifiedCandidates = ({
    viewCandidates,
    addFilter,
    removeFilter,
    viewResume,
    clearResume,
    addCandidate,
    removeCandidate,
    candidateState: { candidates, shortlist },
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
        <div id="topVerifiedCandidates">
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
            {candidates !== null
                ? candidates.map((e, i) => (
                      <div className="candidate" key={i}>
                          <div className="row">
                              <div className="col-lg-9">
                                  <div className="d-flex justify-content-between mt-3">
                                      <div className="profile flex-fill">
                                          <img
                                              src={`/uploads/${e.resumeImage}`}
                                              alt=""
                                              className="img-fluid"
                                          />
                                          <audio controls>
                                              <source
                                                  src={`/uploads/${e.aboutYourself}`}
                                              />
                                              Your browser does not support the
                                              audio!
                                          </audio>
                                      </div>
                                      <div className="available flex-fill">
                                          <p className="per-hour">
                                              Availability
                                          </p>
                                          <p className="available">
                                              {e.availability}
                                          </p>
                                      </div>
                                      <div className="eng-rating flex-fill">
                                          <div className="rating">
                                              <i
                                                  className={`rating-color fas fa-star${
                                                      e.rating >= 1
                                                          ? ` checked`
                                                          : ''
                                                  }`}
                                              ></i>
                                              <i
                                                  className={`rating-color fas fa-star${
                                                      e.rating >= 2
                                                          ? ` checked`
                                                          : ''
                                                  }`}
                                              ></i>
                                              <i
                                                  className={`rating-color fas fa-star${
                                                      e.rating >= 3
                                                          ? ` checked`
                                                          : ''
                                                  }`}
                                              ></i>
                                              <i
                                                  className={`rating-color fas fa-star${
                                                      e.rating >= 4
                                                          ? ` checked`
                                                          : ''
                                                  }`}
                                              ></i>
                                              <i
                                                  className={`rating-color fas fa-star${
                                                      e.rating === 5
                                                          ? ` checked`
                                                          : ''
                                                  }`}
                                              ></i>
                                          </div>
                                          <span className="eng-prof d-block">
                                              English Proficiency
                                          </span>
                                      </div>
                                  </div>
                                  <div className="d-flex">
                                      {e.specialty.map((e, i) => (
                                          <span
                                              className="specialty-software"
                                              key={i}
                                          >
                                              {e}
                                          </span>
                                      ))}
                                      {e.software.map((e, i) => (
                                          <span
                                              className="specialty-software"
                                              key={i}
                                          >
                                              {e}
                                          </span>
                                      ))}
                                  </div>
                                  <hr className="line-break" />
                                  <p className="recruiters-comment">
                                      Recruiters Comment:
                                  </p>
                                  {/* {recruitmentsComment.map((e, i) => )} */}
                                  {e.recruitmentsComment.join('. ')}
                                  <button
                                      className="see-resume"
                                      onClick={() => {
                                          setSeeResume(true);
                                          viewResume(e._id);
                                      }}
                                  >
                                      See resume and recruiter comments &gt;
                                  </button>
                              </div>
                              <div className="col-lg-3">
                                  {shortlist && shortlist.includes(e._id) ? (
                                      <button
                                          onClick={() => removeShortlist(e._id)}
                                          className="btn btn-primary button mt-3 remove"
                                      >
                                          Remove from Shortlist
                                      </button>
                                  ) : (
                                      <button
                                          onClick={() => addShortlist(e._id)}
                                          className="btn btn-primary button mt-3"
                                      >
                                          Add to Shortlist
                                      </button>
                                  )}
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
                                          {e.uploadWork.images.map((e, i) => (
                                              <Carousel.Item key={i}>
                                                  <img
                                                      src={`/uploads/${e.file}`}
                                                      className="d-block w-100"
                                                      alt="..."
                                                  />
                                              </Carousel.Item>
                                          ))}
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
            <div className="footer">
                <div
                    className={`ml-auto${
                        candidates && candidates.length === 0
                            ? ' invisible'
                            : ''
                    }`}
                >
                    <PaginationLink />
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
