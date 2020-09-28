import React from 'react';

const Software = ({ value, index, onSoftwareClose }) => {
	const onClose = () => {
		onSoftwareClose(index);
	};

	return (
		<span className='item'>
			{value}
			<span className='close' onClick={onClose}>
				x
			</span>
		</span>
	);
};

export default Software;
