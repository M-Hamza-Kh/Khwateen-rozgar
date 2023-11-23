import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAddressCard, faFileAlt} from '@fortawesome/free-solid-svg-icons';
import {NavLink} from "react-router-dom";
import {getUserData, isLogin, STRINGS} from "../../utils/base";

//import { far } from '@fortawesome/free-regular-svg-icons';


export class FeatureSection extends Component {
    render() {
        return (
            <div className="feature-section section bg-image-proparty bg_image--2 pt-15 pb-15">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            {/*<!-- Single Feature Start -->*/}
                            <NavLink to={STRINGS.ROUTES.AUTH.SIGN_UP} className="single-feature mb-0">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faAddressCard}/>
                                </div>
                                <div className="feature-content">
                                    <h3 className="title">Register Now</h3>
                                    <p>Create resume free & get a job</p>
                                </div>
                            </NavLink>
                            {/*<!-- Single Feature End -->*/}
                        </div>
                        <div className="col-lg-6">
                            {/*<!-- Single Feature Start -->*/}
                            <NavLink to={`${isLogin() ? getUserData().rights.includes(STRINGS.RIGHTS.JP) ? STRINGS.ROUTES.DASHBOARD.JOB_POST : STRINGS.ROUTES.DASHBOARD.HOME : STRINGS.ROUTES.AUTH.SIGN_IN}`} className="single-feature mb-0">
                                <div className="feature-icon">
                                    <FontAwesomeIcon icon={faFileAlt}/>
                                </div>
                                <div className="feature-content">
                                    <h3 className="title">Post Job Free</h3>
                                    <p>Approach a top million resumes</p>
                                </div>
                            </NavLink>
                            {/*<!-- Single Feature End -->*/}
                        </div>
                        <div className="col-lg-4 d-none">
                            {/*<!-- Single Feature Start -->*/}
                            <div className="single-feature mb-0">
                                <div className="feature-icon">
                                    <i className="fa fa-search-location"/>
                                </div>
                                <div className="feature-content">
                                    <h3 className="title">Find Work</h3>
                                    <p>Get the best jobs in your area</p>
                                </div>
                            </div>
                            {/*<!-- Single Feature End -->*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}