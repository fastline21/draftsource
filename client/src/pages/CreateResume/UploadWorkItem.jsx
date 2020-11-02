import React, { useState } from 'react';
import { useEffect } from 'react';

const UploadWorkItem = ({ index, data, isEdit, isDelete }) => {
	const [bgImage, setBgImage] = useState('');
	const { title, file } = data;
	const onEdit = (e) => {
		e.preventDefault();
		isEdit(index);
	};

	const onDelete = (e) => {
		e.preventDefault();
		isDelete(index);
	};

	useEffect(() => {
		const generateBgImage = () => {
			setBgImage(URL.createObjectURL(file));
		};
		generateBgImage();
	}, [file]);

	const styles = {
		backgroundImage: `url(${bgImage})`,
	};

	return (
		<div className={`upload-work-item`} style={styles}>
			<h6 className="title">{title}</h6>
			<div className="action">
				<button className="btn btn-primary button" onClick={onEdit}>
					Edit
				</button>
				<span>|</span>
				<button className="btn btn-primary button" onClick={onDelete}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default UploadWorkItem;
