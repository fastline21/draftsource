import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const VerifyViewCandidates = () => {
    return (
        <Route
            render={() => (
                <Redirect to="/view-candidates/top-verified-candidates" />
            )}
        />
    );
};

export default VerifyViewCandidates;
