import React from 'react';

const MarketTypeSelected = ({ value, index, onMarketTypeClose }) => {
	const onClose = () => {
		onMarketTypeClose(index);
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

export default MarketTypeSelected;
