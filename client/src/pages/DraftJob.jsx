import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Container } from 'react-bootstrap';

import Step1 from './DraftJob/Step1';
import Step2 from './DraftJob/Step2';
import Step3 from './DraftJob/Step3';

const DraftJob = () => {
    const { search } = useLocation();
    const { step } = queryString.parse(search);

    const renderStep = () => {
        let r = '';
        if (parseInt(step) === 1) {
            r = <Step1 />;
        } else if (parseInt(step) === 2) {
            r = <Step2 />;
        } else if (parseInt(step) === 3) {
            r = <Step3 />;
        }
        return r;
    };

    return (
        <div id="draftJob">
            <Container>
                <h2 className="title">Draft a Job</h2>
                <div className="clearfix">
                    <div className="line-break"></div>
                    <p className={`step ${step >= 1 ? 'active' : ''}`}>1</p>
                    <p className={`step ${step >= 2 ? 'active' : ''}`}>2</p>
                    <p className={`step ${step >= 3 ? 'active' : ''}`}>3</p>
                </div>
                {renderStep()}
            </Container>
        </div>
    );
};

export default DraftJob;
