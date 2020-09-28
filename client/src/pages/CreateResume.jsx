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
        let r = '';
        if (parseInt(step) === 1) {
            r = <Step1 />;
        } else if (parseInt(step) === 2) {
            r = <Step2 uploadFile={onUploadFile} />;
        } else if (parseInt(step) === 3) {
            r = <Step3 uploadFile={onUploadFile} />;
        } else if (parseInt(step) === 4) {
            r = <Step4 uploadFile={onUploadFile} />;
        } else if (parseInt(step) === 5) {
            r = <Step5 />;
        } else if (parseInt(step) === 6) {
            r = <Step6 check={onCheck} />;
        }
        return r;
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
