import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const DraftJobRoute = ({ component: Component }) => {
    const { search } = useLocation();
    const { step } = queryString.parse(search);

    return (
        <Route
            render={(props) =>
                step === undefined || step > 6 ? (
                    <Redirect to="/draft-job?step=1" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default DraftJobRoute;
