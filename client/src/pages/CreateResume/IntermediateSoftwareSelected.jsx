import React from 'react';

const IntermediateSoftwareSelected = ({
	value,
	index,
	onIntermediateSoftwareClose,
}) => {
	const onClose = () => {
		onIntermediateSoftwareClose(index);
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

export default IntermediateSoftwareSelected;
