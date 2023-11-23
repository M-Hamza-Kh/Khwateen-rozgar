import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { isLogin, STRINGS } from "./utils/base";
import ScrollToTop from "react-scroll-up";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Index as VISITOR_INDEX } from './components/visitorIndex';
import { Index as T_AND_C } from './components/visitorIndex/termAndCondition';
import { Index as PRIVACY_POLICY } from './components/visitorIndex/privacyPolicy';
import { Index as About } from './components/visitorIndex/about';
import { Index as CompanyDetails } from './components/visitorIndex/companyDetails';
import { Index as Contact } from './components/visitorIndex/contact';
import Auth from './components/auth/index';
import { Index as JOB_LISTING } from './components/visitorIndex/jobListing';
import { Index as BLOGS } from './components/visitorIndex/blogs';
import { Index as DASHBOARD } from './components/dashboard';
import './styleSheet/vendor/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
// import './styleSheet/vendor/iconfont.min.css';
import './styleSheet/vendor/helper.css';
import "./styleSheet/plugins/plugins.min.css";
import "./styleSheet/KRSStyles.css";
import "./styleSheet/style.css";
import "./styleSheet/custom.css";
import "./styleSheet/scss/custom.scss";
import "./styleSheet/scss/_variabls.scss";
import "./styleSheet/scss/_job-search.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import $ from 'jquery';
import '../src/plugins/jquery-nice-select-1.1.0/js/jquery.nice-select.js';
import Packages from "./components/visitorIndex/packages";
import { Index as BlOG_DETAILS } from "./components/blogDetails";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Testimonial from "./components/visitorIndex/testimonial";
import ReviewsList from "./components/visitorIndex/reviewsList";
// import ReviewDetail from "./components/visitorIndex/reviewDetail";
import ReviewAdd from "./components/visitorIndex/reviewAdd";
import ResetPassword from "./components/visitorIndex/jobsItems/resetPass";
import ReviewDetail from "./components/visitorIndex/reviewDetail";

export default class App extends Component {


    componentDidMount() {
        $(document).ready(function () {
            $('select').niceSelect();
            $("input").keydown((e) => {
                console.log('sss', e)
                // if (!((e.keyCode > 95 && e.keyCode < 106)
                //     || (e.keyCode > 47 && e.keyCode < 58)
                //     || e.keyCode == 8)) {
                //     return false;
                // }
            })
        });
        let allCookies = unescape(document.cookie);
        console.log("allCookies",allCookies.split(","))
    }

    render() {
        return (
            <React.Fragment>
                <Router>
                    <Switch>
                        <Route exact path={STRINGS.ROUTES.AUTH.SIGN_IN} render={() =>
                            !isLogin() ?
                                <Auth /> : <Redirect to={STRINGS.ROUTES.ROOT} />
                        } />
                        <Route exact path={STRINGS.ROUTES.AUTH.SIGN_UP} component={Auth} />
                        <Route exact path={STRINGS.ROUTES.ROOT} component={VISITOR_INDEX} />
                        <Route exact path={STRINGS.ROUTES.JOBS.SKILLS} component={VISITOR_INDEX} />
                        <Route exact path={STRINGS.ROUTES.JOBS.ROLES} component={VISITOR_INDEX} />
                        <Route exact path={STRINGS.ROUTES.JOBS.LOCATION} component={VISITOR_INDEX} />
                        <Route exact path={STRINGS.ROUTES.JOBS.PART_TIME} component={VISITOR_INDEX} />
                        <Route exact path={STRINGS.ROUTES.JOBS.HOME_BASED} component={VISITOR_INDEX} />
                        <Route exact path={STRINGS.ROUTES.JOBS.INTERNSHIP} component={VISITOR_INDEX} />
                        <Route exact path={STRINGS.ROUTES.JOBS.TUTOR} component={VISITOR_INDEX} />
                        <Route exact path={STRINGS.ROUTES.ABOUT} component={About} />
                        <Route exact path={`${STRINGS.ROUTES.COMPANY_DETAIL}/:id?`} component={CompanyDetails} />
                        <Route exact path={STRINGS.ROUTES.TESTIMONIAL} component={Testimonial} />
                        <Route exact path={STRINGS.ROUTES.REVIEWS} component={ReviewsList} />
                        <Route exact path={`${STRINGS.ROUTES.REVIEW_DETAIL}/:id?`} component={ReviewDetail} />
                        <Route exact path={`${STRINGS.ROUTES.REVIEW_ADD}/:id?`} component={ReviewAdd} />
                        <Route exact path={STRINGS.ROUTES.T_AND_C} component={T_AND_C} />
                        <Route exact path={STRINGS.ROUTES.PRIVACY_POLICY} component={PRIVACY_POLICY} />
                        <Route exact path={STRINGS.ROUTES.CONTACT} component={Contact} />
                        <Route exact path={`${STRINGS.ROUTES.RESET_PASSWORD}/:resetCode?`} component={ResetPassword} />
                        <Route exact path={STRINGS.ROUTES.PACKAGES} component={Packages} />
                        <Route exact path={`${STRINGS.ROUTES.JOBS.LISTING}/:id?`} component={JOB_LISTING} />
                        {/*<Route exact path={`${STRINGS.ROUTES.JOBS.JOB}/:id?`} component={JOB}/>*/}
                        <Route exact path={STRINGS.ROUTES.BLOGS} component={BLOGS} />
                        <Route exact path={`${STRINGS.ROUTES.BLOG_DETAILS}/:id?`} component={BlOG_DETAILS} />
                        <Route path={STRINGS.ROUTES.ROOT} render={
                            () => {
                                return isLogin() ? (
                                    <React.Fragment>
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.HOME} component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.PROFILE} component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.MESSENGER} component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.JOBS_ALERTS} component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.CHANGE_PASSWORD}
                                            component={DASHBOARD} />
                                        {/*<Route exact path={STRINGS.ROUTES.DASHBOARD.REVIEWS} component={DASHBOARD}/>*/}
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.REVIEWS_LIST}
                                            component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.SCHEDULES_INTERVIEWS}
                                            component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.JOB_POST} component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.JOB_LIST} component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.JOB_DETAILS} component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.COMPANY_LIST}
                                            component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.SUBSCRIBERS_LIST}
                                            component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.APPLICANT_LIST}
                                            component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.PACKAGES} component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.COMPANY_PACKAGES}
                                            component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.COMPANY_PAYMENT}
                                            component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.SETTINGS} component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.JOB_SEARCH} component={DASHBOARD} />
                                        <Route exact path={STRINGS.ROUTES.DASHBOARD.APPROVALS_LIST}
                                            component={DASHBOARD} />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.COMPANY_ADMIN_PAYMENT}/:id?`}
                                            component={DASHBOARD} />
                                    </React.Fragment>
                                )
                                    : (<Redirect to={STRINGS.ROUTES.ROOT} />)
                            }} />
                    </Switch>
                </Router>
                <ScrollToTop showUnder={320} duration={900} style={{ zIndex: "1" }}>
                    <div id="scrollUp">
                        <FontAwesomeIcon className="i" icon={faAngleUp} />
                    </div>
                </ScrollToTop>
            </React.Fragment>
        );
    }
}



