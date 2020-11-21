import React, { useState } from 'react';
import { useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

const UploadWorkItem = ({ index, data, type, isEdit, isDelete }) => {
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
		if (type === 'image') {
			const generateBgImage = () => {
				setBgImage(URL.createObjectURL(file));
			};
			generateBgImage();
		}
	}, [file]);

	const styles = {
		backgroundImage: `url(${bgImage})`,
	};

	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

	return (
		<div
			className={`upload-work-item`}
			style={type === 'image' ? styles : { position: 'relative' }}
		>
			{type === 'document' && (
				<Document style={{ position: 'absolute', top: 0, left: 0 }} file={file}>
					<Page pageNumber={1} height={120} renderAnnotationLayer={false} />
				</Document>
			)}
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
