import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";


export class JobAlerts extends Component{
    render() {
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h4>Job Alerts</h4>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-overview">
                        <div className="row">
                            <div className="col-xl-12 col-12">
                                <div className="job-applications mb-50">
                                    <div className="job-applications-main-block">
                                        <div className="job-applications-table ov-des">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Alert Title</th>
                                                    <th className="width-35">Query</th>
                                                    <th>Created</th>
                                                    <th>Update</th>
                                                    <th className="text-right">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr className="job-application-item">
                                                    <td className="application-job">
                                                        <h3><NavLink to="#">CNACA</NavLink></h3>
                                                    </td>

                                                    <td className="application-query">
                                                        <NavLink to="http://360clouderp.net/khawateen/job-listing.html">http://360clouderp.net/khawateen/job-listing.html </NavLink>
                                                    </td>

                                                    <td className="application-created">
                                                        <span> May 19, 2020 </span>
                                                    </td>

                                                    <td className="application-update">
                                                        <span> Weekly </span>
                                                    </td>

                                                    <td className="delete-application text-right">
                                                        <NavLink to="#"><FontAwesomeIcon icon={faTrash} className="lnr lnr-trash"/></NavLink>
                                                    </td>
                                                </tr>
                                                <tr className="job-application-item">
                                                    <td className="application-job">
                                                        <h3><NavLink to="#">Account manager</NavLink></h3>
                                                    </td>

                                                    <td className="application-query">
                                                        <NavLink to="http://360clouderp.net/khawateen/job-listing.html">http://360clouderp.net/khawateen/job-listing.html </NavLink>
                                                    </td>

                                                    <td className="application-created">
                                                        <span> Apr 24, 2020 </span>
                                                    </td>

                                                    <td className="application-update">
                                                        <span> Weekly </span>
                                                    </td>

                                                    <td className="delete-application text-right">
                                                        <NavLink to="#"><FontAwesomeIcon icon={faTrash} className="lnr lnr-trash"/></NavLink>
                                                    </td>
                                                </tr>
                                                <tr className="job-application-item">
                                                    <td className="application-job">
                                                        <h3><NavLink to="#">HTML5</NavLink></h3>
                                                    </td>

                                                    <td className="application-query">
                                                        <NavLink to="http://360clouderp.net/khawateen/job-listing.html">http://360clouderp.net/khawateen/job-listing.html </NavLink>
                                                    </td>

                                                    <td className="application-created">
                                                        <span> May 19, 2020 </span>
                                                    </td>

                                                    <td className="application-update">
                                                        <span> Weekly </span>
                                                    </td>

                                                    <td className="delete-application text-right">
                                                        <NavLink to="#"><FontAwesomeIcon icon={faTrash} className="lnr lnr-trash"/></NavLink>
                                                    </td>
                                                </tr>
                                                <tr className="job-application-item">
                                                    <td className="application-job">
                                                        <h3><NavLink to="#">Adoroi</NavLink></h3>
                                                    </td>

                                                    <td className="application-query">
                                                        <NavLink to="http://360clouderp.net/khawateen/job-listing.html">http://360clouderp.net/khawateen/job-listing.html </NavLink>
                                                    </td>

                                                    <td className="application-created">
                                                        <span> Oct 25, 2019  </span>
                                                    </td>

                                                    <td className="application-update">
                                                        <span> Weekly </span>
                                                    </td>

                                                    <td className="delete-application text-right">
                                                        <NavLink to="#"><FontAwesomeIcon icon={faTrash} className="lnr lnr-trash"/></NavLink>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
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