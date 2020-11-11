import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

// Actions
import { getCountry } from './../state/actions/countryAction';

const Country = ({ countryState: { country, loading }, getCountry }) => {
	const { pathname, search } = useLocation();
	const history = useHistory();
	useEffect(() => {
		getCountry();
		if (!loading) {
			if (country === 'Philippines') {
				history.push('/not-available');
			}
		}
		// eslint-disable-next-line
	}, [pathname, search, loading, country]);
	return country === 'Philippines' && <Redirect to="/not-available" />;
};

Country.propTypes = {
	getCountry: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	countryState: state.countryState,
});

export default connect(mapStateToProps, {
	getCountry,
})(Country);
