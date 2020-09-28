import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const CreateResumeRoute = ({ component: Component }) => {
    const { search } = useLocation();
    const { step } = queryString.parse(search);

    return (
        <Route
            render={(props) =>
                step === undefined || step > 6 ? (
                    <Redirect to="/create-resume?step=1" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

export default CreateResumeRoute;
