import React from 'react';

const SpecialtyItem = ({ index, value, select }) => {
	const selectItem = () => {
		select(index);
	};

	return (
		<li className='nav-item' onClick={selectItem}>
			{value}
		</li>
	);
};

export default SpecialtyItem;
