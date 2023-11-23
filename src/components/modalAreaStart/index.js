import React, {Component} from "react";
import {NavLink} from "react-router-dom";

export class ModalAreaStart extends Component {
    render() {
        return (
            <React.Fragment>
                {/*<!-- Modal Area Start -->*/}
                <div className="modal fade quick-view-modal-container" id="quick-view-modal-container" tabIndex="-1"
                     role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="row no-gutters">

                                        <div className="col-lg-4">
                                            <div className="login-register-form-area">
                                                <div className="login-tab-menu">
                                                    <ul className="nav">
                                                        <li><NavLink className="active show" data-toggle="tab"
                                                                     to="#login">Login</NavLink></li>
                                                        <li><NavLink data-toggle="tab" to="#register">Register</NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="tab-content">
                                                    <div id="login" className="tab-pane fade show active">
                                                        <div className="login-register-form">
                                                            <form action="#" method="post">
                                                                <p>Login to Jotopa with your registered account</p>
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <div className="single-input">
                                                                            <input type="text"
                                                                                   placeholder="Username or Email"
                                                                                   name="name"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="single-input">
                                                                            <input type="password"
                                                                                   placeholder="Password"
                                                                                   name="password"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="checkbox-input">
                                                                            <input type="checkbox"
                                                                                   name="login-form-remember"
                                                                                   id="login-form-remember"/>
                                                                            <label htmlFor="login-form-remember">Remember
                                                                                me</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 mb-25">
                                                                        <button className="ht-btn">Login</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                            <div className="divider">
                                                                <span className="line"></span>
                                                                <span className="circle">or login with</span>
                                                            </div>
                                                            <div className="social-login">
                                                                <ul className="social-icon">
                                                                    <li><NavLink className="facebook" to="#"><i
                                                                        className="fab fa-facebook"></i></NavLink></li>
                                                                    <li><NavLink className="twitter" to="#"><i
                                                                        className="fab fa-twitter"></i></NavLink></li>
                                                                    <li><NavLink className="linkedin" to="#"><i
                                                                        className="fab fa-linkedin"></i></NavLink></li>
                                                                    <li><NavLink className="google" to="#"><i
                                                                        className="fab fa-google-plus"></i></NavLink>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="register" className="tab-pane fade">
                                                        <div className="login-register-form">
                                                            <form action="#" method="post">
                                                                <p>Create Your account</p>
                                                                <div className="row row-5">
                                                                    <div className="col-12">
                                                                        <div className="single-input">
                                                                            <input type="text"
                                                                                   placeholder="Your Username"
                                                                                   name="name"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="single-input">
                                                                            <input type="email"
                                                                                   placeholder="Your Email Address"
                                                                                   name="emain"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="single-input">
                                                                            <input type="password"
                                                                                   placeholder="Password"
                                                                                   name="password"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="single-input">
                                                                            <input type="password"
                                                                                   placeholder="Confirm Password"
                                                                                   name="conPassword"/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="checkbox-input">
                                                                            <input type="checkbox"
                                                                                   name="login-form-candidate"
                                                                                   id="login-form-candidate"/>
                                                                            <label htmlFor="login-form-candidate">I am a
                                                                                candidate</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="checkbox-input">
                                                                            <input type="checkbox"
                                                                                   name="login-form-employer"
                                                                                   id="login-form-employer"/>
                                                                            <label htmlFor="login-form-employer">I am a
                                                                                employer</label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="register-account">
                                                                            <input id="register-terms-conditions"
                                                                                   type="checkbox" className="checkbox"
                                                                                   checked="" required=""/>
                                                                            <label htmlFor="register-terms-conditions">I
                                                                                read and agree to the <NavLink
                                                                                    to="#">Terms &amp; Conditions</NavLink> and <NavLink
                                                                                    to="#">Privacy
                                                                                    Policy</NavLink></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 mb-25">
                                                                        <button className="ht-btn">Register</button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                            <div className="divider">
                                                                <span className="line"></span>
                                                                <span className="circle">or login with</span>
                                                            </div>
                                                            <div className="social-login">
                                                                <ul className="social-icon">
                                                                    <li><NavLink className="facebook" to="#"><i
                                                                        className="fab fa-facebook"></i></NavLink></li>
                                                                    <li><NavLink className="twitter" to="#"><i
                                                                        className="fab fa-twitter"></i></NavLink></li>
                                                                    <li><NavLink className="linkedin" to="#"><i
                                                                        className="fab fa-linkedin"></i></NavLink></li>
                                                                    <li><NavLink className="google" to="#"><i
                                                                        className="fab fa-google-plus"></i></NavLink>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <div className="login-instruction">
                                                <div className="login-instruction-content">
                                                    <h3 className="title">Why Login To Us</h3>
                                                    <p>It’s important for you to have an account and login in order to
                                                        have
                                                        full access at Jotopa. We need to know your account details in
                                                        order
                                                        to allow work together</p>
                                                    <ul className="list-reasons">
                                                        <li className="reason">Be alerted to the latest jobs</li>
                                                        <li className="reason">Apply for jobs with a single click</li>
                                                        <li className="reason">Showcase your CV to thousands of
                                                            employers
                                                        </li>
                                                        <li className="reason">Keep a record of all your applications
                                                        </li>
                                                    </ul>
                                                    <span
                                                        className="sale-text theme-color border-color">Login today &amp; Get 15% Off Coupon for the first planning purchase</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/*<!-- Modal Area End -->*/}
            </React.Fragment>
        );
    }
}