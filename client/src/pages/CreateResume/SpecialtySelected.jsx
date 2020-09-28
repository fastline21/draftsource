import React from 'react';

const SpecialtySelected = ({ value, index, onSpecialtyClose }) => {
    const onClose = () => {
        onSpecialtyClose(index);
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

export default SpecialtySelected;
