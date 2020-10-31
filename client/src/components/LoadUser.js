import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { loadUser } from './../state/actions/userAction';

const LoadUser = ({ loadUser }) => {
	const { pathname, search } = useLocation();

	useEffect(() => {
		if (localStorage.token) {
			loadUser();
		}

		// eslint-disable-next-line
	}, [pathname, search]);

	return null;
};

LoadUser.propTypes = {
	loadUser: PropTypes.func.isRequired,
};

export default connect(null, { loadUser })(LoadUser);
