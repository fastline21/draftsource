import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import { getUserInfo } from './../../state/actions/userAction';

const Fullname = ({ userState: { info }, getUserInfo }) => {
	const initialPersonalInfo = {
		firstName: '',
		lastName: '',
	};
	const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
	const [load, setLoad] = useState(true);

	const { firstName, lastName } = personalInfo;

	useEffect(() => {
		if (load) {
			getUserInfo();
			setLoad(false);
		}

		if (info !== null) {
			setPersonalInfo(info);
		}

		// eslint-disable-next-line
	}, [load, info]);

	return (
		<Fragment>
			{firstName} {lastName}
		</Fragment>
	);
};

Fullname.propTypes = {
	getUserInfo: PropTypes.func.isRequired,
	userState: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	userState: state.userState,
});

export default connect(mapStateToProps, { getUserInfo })(Fullname);
