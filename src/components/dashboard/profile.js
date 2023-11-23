import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import author1 from "../../content/images/author/author1.jpg";

export class Profile extends Component{
    render() {
        return (
            <div>
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h1>Profile</h1>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-overview">
                        <div className="row">
                            <div className="col-xl-12 col-12">
                                <div className="profile-applications mb-50">
                                    <div className="profile-applications-heading">
                                        <ul className="nav">
                                            <li><NavLink className="active" to="profile.html">My profile</NavLink></li>
                                            <li className="d-none"><NavLink to="resume-profile.html">Resume profile</NavLink></li>
                                        </ul>
                                    </div>
                                    <div className="profile-applications-main-block">
                                        <div className="profile-applications-form">
                                            <form action="#">
                                                <div className="row mb-30">
                                                    <div className="col-lg-2">
                                                        <div className="profile-avatar mb-30">
                                                            <label className="d-block"><span>Avatar</span></label>
                                                            <img src={author1} alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-10">
                                                        <div className="row">

                                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                                {/*<!-- Single Input Start -->*/}
                                                                <div className="single-input mb-25">
                                                                    <label htmlFor="first-name">First
                                                                        Name <span>*</span></label>
                                                                    <input type="text" id="first-name" name="first-name"
                                                                           placeholder="First Name" value="First Name"/>
                                                                </div>
                                                                {/*<!-- Single Input End -->*/}
                                                            </div>

                                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                                {/*<!-- Single Input Start -->*/}
                                                                <div className="single-input mb-25">
                                                                    <label htmlFor="last-name">Last Name <span>*</span></label>
                                                                    <input type="text" id="last-name" name="last-name"
                                                                           placeholder="Last Name" value="Last Name"/>
                                                                </div>
                                                                {/*<!-- Single Input End -->*/}
                                                            </div>

                                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                                {/*<!-- Single Input Start -->*/}
                                                                <div className="single-input mb-25">
                                                                    <label htmlFor="email">Email <span>*</span></label>
                                                                    <input type="email" id="email" name="email"
                                                                           placeholder="Enter your Email"
                                                                           value="email@domain.com"/>
                                                                </div>
                                                                {/*<!-- Single Input End -->*/}
                                                            </div>

                                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                                {/*<!-- Single Input Start -->*/}
                                                                <div className="single-input mb-25">
                                                                    <label htmlFor="url">Url <span>*</span></label>
                                                                    <input type="url" id="url" name="url"
                                                                           placeholder="Enter your Url"
                                                                           value="https://domain.com/"/>
                                                                </div>
                                                                {/*<!-- Single Input End -->*/}
                                                            </div>

                                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                                {/*<!-- Single Input Start -->*/}
                                                                <div className="single-input mb-25">
                                                                    <label htmlFor="address-one">Address line 1</label>
                                                                    <input type="text" id="address-one"
                                                                           name="address-one"
                                                                           placeholder="Enter your Address" value=""/>
                                                                </div>
                                                                {/*<!-- Single Input End -->*/}
                                                            </div>

                                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                                {/*<!-- Single Input Start -->*/}
                                                                <div className="single-input mb-25">
                                                                    <label htmlFor="address-two">Address line 2</label>
                                                                    <input type="text" id="address-two"
                                                                           name="address-two"
                                                                           placeholder="Enter your Address" value=""/>
                                                                </div>
                                                                {/*<!-- Single Input End -->*/}
                                                            </div>

                                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                                {/*<!-- Single Input Start -->*/}
                                                                <div className="single-input mb-25">
                                                                    <label htmlFor="new-password">New Password</label>
                                                                    <input type="password" id="new-password"
                                                                           name="new-password" placeholder="" value=""/>
                                                                </div>
                                                                {/*<!-- Single Input End -->*/}
                                                            </div>

                                                            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                                {/*<!-- Single Input Start -->*/}
                                                                <div className="single-input mb-25">
                                                                    <label htmlFor="confirm-password">Confirm
                                                                        Password</label>
                                                                    <input type="password" id="confirm-password"
                                                                           name="confirm-password" placeholder=""
                                                                           value=""/>
                                                                </div>
                                                                {/*<!-- Single Input End -->*/}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div
                                                            className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">
                                                            <button
                                                                className="ht-btn theme-btn theme-btn-two mb-xs-20">Update
                                                                Profile
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}