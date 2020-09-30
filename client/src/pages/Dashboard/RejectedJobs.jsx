import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

// Actions
import {
    rejectedJobs,
    viewDetails,
    clearDetails,
} from '../../state/actions/jobAction';
import { addFilter, removeFilter } from '../../state/actions/filterAction';

// Components
import ViewDetails from './ViewDetails';
import PaginationLink from './PaginationLink';

const RejectedJobs = ({
    rejectedJobs,
    viewDetails,
    clearDetails,
    addFilter,
    removeFilter,
    jobState: { jobs },
    filterState: { filter },
}) => {
    const queryParams = new URLSearchParams(window.location.search);
    const newUrl = new URL(window.location.href);

    const history = useHistory();

    const [seeDetails, setSeeDetails] = useState(false);
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

        // eslint-disable-next-line
    }, [queryParams, params, filter, jobs]);

    return (
        <div id="admin">
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
            <div id="newJobs">
                {seeDetails ? (
                    <ViewDetails
                        isShow={true}
                        isHide={() => {
                            setSeeDetails(false);
                            clearDetails();
                        }}
                        loadJob={() => {
                            rejectedJobs();
                            clearDetails();
                        }}
                    />
                ) : null}
                {jobs !== null
                    ? jobs.map((e, i) => (
                          <div className="job" key={i}>
                              <div className="row">
                                  <div className="col-lg-12">
                                      <h4 className="title">{e.title}</h4>
                                      <p className="company">{e.company}</p>
                                  </div>
                              </div>
                              <div className="row">
                                  <div className="col-lg-3">
                                      <p>{e.country}</p>
                                  </div>
                                  <div className="col-lg-3">
                                      {' '}
                                      <p className="expected-salary">
                                          {e.expectedSalary} hrs/Week
                                      </p>
                                      <p>{e.availability}</p>
                                  </div>
                                  <div className="col-lg-3">
                                      <p className="date-submitted">
                                          {moment(e.dateCreated).format(
                                              'MM-DD-YYYY'
                                          )}
                                      </p>
                                      <p>Date Submitted</p>
                                  </div>
                                  <div className="col-lg-3">
                                      <p className="time-submitted">
                                          {moment(e.dateCreated).format(
                                              'h:mm a'
                                          )}
                                      </p>

                                      <p>Time Submitted</p>
                                  </div>
                              </div>
                              <div className="line-break"></div>
                              <p>{e.about}</p>
                              <button
                                  className="link"
                                  onClick={() => {
                                      setSeeDetails(true);
                                      viewDetails(e._id);
                                  }}
                              >
                                  View Full Details
                              </button>
                          </div>
                      ))
                    : 'No new job'}
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

RejectedJobs.propTypes = {
    jobState: PropTypes.object.isRequired,
    filterState: PropTypes.object.isRequired,
    rejectedJobs: PropTypes.func.isRequired,
    addFilter: PropTypes.func.isRequired,
    removeFilter: PropTypes.func.isRequired,
    viewDetails: PropTypes.func.isRequired,
    clearDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    jobState: state.jobState,
    filterState: state.filterState,
});

export default connect(mapStateToProps, {
    rejectedJobs,
    addFilter,
    removeFilter,
    viewDetails,
    clearDetails,
})(RejectedJobs);
