import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Container } from 'react-bootstrap';

import Step1 from './DraftJob/Step1';
import Step2 from './DraftJob/Step2';
import Step3 from './DraftJob/Step3';

const DraftJob = () => {
    const { search } = useLocation();
    const { step } = queryString.parse(search);
    const history = useHistory();

    const renderStep = () => {
        if (parseInt(step) === 1) {
            return <Step1 />;
        } else if (parseInt(step) === 2) {
            return <Step2 />;
        } else if (parseInt(step) === 3) {
            return <Step3 />;
        } else {
            history.push({
                pathname: `/draft-job`,
                search: 'step=1',
            });
        }
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
