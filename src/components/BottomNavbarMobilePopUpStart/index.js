import React, {Component} from "react";
import {NavLink} from "react-router-dom";

export class BottomNavbarMobilePopUpStart extends Component{
    render() {
        return (
            <div>
                {/*<!-- Bottom Navbar Mobile Popup Start -->*/}
                <div className="mobile-popup">
              <div className="job-list-mobile" id="job-list-mobile-id">
                  <div className="heading">
                      <div className="title">
                          <i className="lnr lnr-list"></i>
                          <h3>All Jobs list</h3>
                      </div>
                      <NavLink className="view-all" to="#">See all jobs</NavLink>
                  </div>
                  <div className="content-popup-scroll">
                      <ul className="list-item">
                          <li><NavLink to="job-listing.html"><i className="lnr lnr-printer"></i>Accounting </NavLink></li>
                          <li><NavLink to="job-listing.html"><i className="lnr lnr-film-play"></i>Broadcasting </NavLink></li>
                          <li><NavLink to="job-listing.html"><i className="lnr lnr-phone"></i>Customer Service </NavLink></li>
                          <li><NavLink to="job-listing.html"><i className="lnr lnr-bullhorn"></i>Digital Marketing </NavLink></li>
                          <li><NavLink to="job-listing.html"><i className="lnr lnr-chart-bars"></i>Finance & Accounting </NavLink>
                          </li>
                          <li><NavLink to="job-listing.html"><i className="lnr lnr-smartphone"></i>Game Mobile </NavLink></li>
                          <li><NavLink to="job-listing.html"><i className="lnr lnr-picture"></i>Graphics & Design </NavLink></li>
                          <li><NavLink to="job-listing.html"><i className="lnr lnr-home"></i>Graphics & Design </NavLink></li>
                          <li><NavLink to="job-listing.html"><i className="lnr lnr-database"></i>Medical Doctor </NavLink></li>
                          <li><NavLink to="job-listing.html"><i className="lnr lnr-dinner"></i>Restaurant </NavLink></li>
                      </ul>
                  </div>
              </div>
              <div className="notifications-mobile" id="notifications-mobile-id">
                  <div className="heading">
                      <div className="title">
                          <i className="lnr lnr-list"></i>
                          <h3>All Notifications</h3>
                      </div>
                      <NavLink className="view-all" to="#">See all jobs</NavLink>
                  </div>
                  <div className="content-popup-scroll">
                      <ul className="list-item">
                          <li><NavLink to="login-register.html"><i className="lnr lnr-book"></i><span><b
                              className="highlight">Register now</b> to reach dream jobs easier.</span> </NavLink></li>
                          <li><NavLink to="login-register.html"><i className="lnr lnr-book"></i><span><b
                              className="highlight">Job suggestion</b> you might be interested based on your profile.</span>
                          </NavLink></li>
                      </ul>
                  </div>
              </div>
          </div>
                {/*<!-- Bottom Navbar Mobile Popup End -->*/}
            </div>
        );
    }
}