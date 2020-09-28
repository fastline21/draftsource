import React from 'react';

const SoftwareItem = ({ index, value, select }) => {
	const selectItem = () => {
		select(index);
	};

	return (
		<li className='nav-item' onClick={selectItem}>
			{value}
		</li>
	);
};

export default SoftwareItem;
