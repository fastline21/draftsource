import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Container } from 'react-bootstrap';

import Step1 from './CreateResume/Step1';
import Step2 from './CreateResume/Step2';
import Step3 from './CreateResume/Step3';
import Step4 from './CreateResume/Step4';
import Step5 from './CreateResume/Step5';
import Step6 from './CreateResume/Step6';

const CreateResume = () => {
	const { search } = useLocation();
	const { step } = queryString.parse(search);
	const [uploadFile, setUploadFile] = useState(null);

	const onUploadFile = (data) => {
		setUploadFile({ ...uploadFile, ...data });
	};

	const onCheck = () => {
		return uploadFile;
	};

	const renderStep = () => {
		const parseStep = parseInt(step);

		if (parseStep === 1) {
			return <Step1 />;
		} else if (parseStep === 2) {
			return <Step2 uploadFile={onUploadFile} />;
		} else if (parseStep === 3) {
			return <Step3 uploadFile={onUploadFile} />;
		} else if (parseStep === 4) {
			return <Step4 uploadFile={onUploadFile} />;
		} else if (parseStep === 5) {
			return <Step5 />;
		} else if (parseStep === 6) {
			return <Step6 check={onCheck} />;
		}
	};

	return (
		<div id="createResume">
			<Container>
				<h2 className="title">Create your resume</h2>
				<div className="clearfix">
					<div className="line-break"></div>
					<p className={`step ${step >= 1 ? 'active' : ''}`}>1</p>
					<p className={`step ${step >= 2 ? 'active' : ''}`}>2</p>
					<p className={`step ${step >= 3 ? 'active' : ''}`}>3</p>
					<p className={`step ${step >= 4 ? 'active' : ''}`}>4</p>
					<p className={`step ${step >= 5 ? 'active' : ''}`}>5</p>
					<p className={`step ${step >= 6 ? 'active' : ''}`}>6</p>
				</div>
				{renderStep()}
			</Container>
		</div>
	);
};

export default CreateResume;
