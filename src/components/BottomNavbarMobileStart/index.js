import React, {Component} from "react";
import {NavLink} from "react-router-dom";

export class BottomNavbarMobileStart extends Component {
    render() {
        return (
            <React.Fragment>
                {/*<!-- Bottom Navbar Mobile Start -->*/}
                <div className="bottom-navbar-mobile section d-block d-lg-none">
                    <nav>
                        <ul className="list-actions">
                            <li>
                                <NavLink className="toggle-btn active" to="#">
                                    <span><i className="lnr lnr-home"/></span>
                                    <span className="text">Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="toggle-btn toggle-btn-js" data-target="#job-list-mobile-id" to="#">
                                    <span><i className="lnr lnr-list"/></span>
                                    <span className="text">Jobs list</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="#">
                                    <span><i className="lnr lnr-heart"/></span>
                                    <span className="text">Save</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="toggle-btn-two toggle-btn-js" data-target="#notifications-mobile-id"
                                         to="#">
                                    <span><i className="lnr lnr-alarm"/></span>
                                    <span className="text">Notifications</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="#">
                                    <span><i className="lnr lnr-user"/></span>
                                    <span className="text">Account</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                {/*<!-- Bottom Navbar Mobile End -->*/}
            </React.Fragment>
        );
    }
}