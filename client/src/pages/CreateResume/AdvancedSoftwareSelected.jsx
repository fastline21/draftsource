import React from 'react';

const AdvancedSoftwareSelected = ({
	value,
	index,
	onAdvancedSoftwareClose,
}) => {
	const onClose = () => {
		onAdvancedSoftwareClose(index);
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

export default AdvancedSoftwareSelected;
