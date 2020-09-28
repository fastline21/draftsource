import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const VerifyDashboard = ({ userState: { user } }) => {
    const [load, setLoad] = useState(true);
    const [link, setLink] = useState(null);
    useEffect(() => {
        if (load) {
            setLoad(false);
        }

        if (user) {
            if (user.type === 'Admin') {
                setLink('/dashboard/new-applicants');
            }
        }

        // eslint-disable-next-line
    }, [load, user]);

    return <Route render={() => link && <Redirect to={link} />} />;
};

VerifyDashboard.propTypes = {
    userState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    userState: state.userState,
});

export default connect(mapStateToProps)(VerifyDashboard);
