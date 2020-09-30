import React from 'react';
import { Route, Redirect, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';

const CreateResumeRoute = ({ component: Component }) => {
    const { search } = useLocation();
    const { step } = queryString.parse(search);
    const { type } = useParams();
    console.log(step, type);

    return (
        // <Route
        //     render={(props) =>
        //         step === undefined || step > 6 ? (
        //             <Redirect to="/create-resume?step=1" />
        //         ) : (
        //             <Component {...props} />
        //         )
        //     }
        // />
        null
    );
};

export default CreateResumeRoute;
