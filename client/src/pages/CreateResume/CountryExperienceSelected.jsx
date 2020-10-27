import React from 'react';

const CountryExperienceSelected = ({
	value,
	index,
	onCountryExperienceClose,
}) => {
	const onClose = () => {
		onCountryExperienceClose(index);
	};

	return (
		<span className="item">
			{value}
			<span className="close" onClick={onClose}>
				x
			</span>
		</span>
	);
};

export default CountryExperienceSelected;
