import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import ScrollToTop from './components/ScrollToTop';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import ViewCandidates from './pages/ViewCandidates';
import CreateResume from './pages/CreateResume';
import CreateResumeRoute from './routing/CreateResumeRoute';
import Alert from './layouts/Alert';
import Verify from './components/Verify';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LoadUser from './components/LoadUser';
import PrivateRoute from './routing/PrivateRoute';
import VerifyDashboard from './components/VerifyDashboard';
import VerifyViewCandidates from './components/VerifyViewCandidates';
import DraftJobRoute from './routing/DraftJobRoute';
import DraftJob from './pages/DraftJob';
import AdminSignup from './pages/AdminSignup';

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <ScrollToTop />
                    <LoadUser />
                    <Alert />
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/view-candidates"
                            component={VerifyViewCandidates}
                        />
                        <Route
                            path="/view-candidates/:menu"
                            component={ViewCandidates}
                        />
                        <Route path="/pricing" component={Pricing} />
                        <CreateResumeRoute
                            path="/create-resume"
                            component={CreateResume}
                        />
                        <DraftJobRoute path="/draft-job" component={DraftJob} />
                        <Route path="/verify/:token" component={Verify} />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={VerifyDashboard}
                        />
                        <PrivateRoute
                            path="/dashboard/:menu"
                            component={Dashboard}
                        />
                        <Route path="/login" component={Login} />
                        <Route path="/admin-signup" component={AdminSignup} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                    <Footer />
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
