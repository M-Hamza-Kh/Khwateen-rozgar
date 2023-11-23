import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class JobTabs extends Component {
    render() {
        return (
            <div className="dashboard-content-section section bg_color--5">
                <div className="container-fluid p-0">
                    <div className="row no-gutters">
                        <div className="col-xl-10 col-lg-9">

                            <div className="dashboard-main-inner">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="page-breadcrumb-content">
                                            <h4>Job Detail</h4>
                                        </div>
                                    </div>
                                </div>


                                <div className="dashboard-overview">
                                    <div className="row">
                                        <div className="col-xl-12 col-12">
                                            <div className="profile-applications mb-50">
                                                <div className="profile-applications-heading">
                                                    <ul className="nav">
                                                        <li><NavLink className="active" to="#">Job Title Goes Here</NavLink></li>
                                                    </ul>
                                                </div>
                                                <div className="profile-applications-main-block pt-0">
                                                    <div className="row mb-30 pt-10">


                                                        <div className="col-lg-12">
                                                            <div className="jd-justified-tabs">
                                                                <ul className="nav justify-content-center">
                                                                    <li className="nav-item"><NavLink className="active show"
                                                                                                data-toggle="tab"
                                                                                                to="#job-views">Views</NavLink>
                                                                    </li>
                                                                    <li className="nav-item"><NavLink data-toggle="tab"
                                                                                                to="#job-applied">Applied</NavLink>
                                                                    </li>
                                                                    <li className="nav-item"><NavLink data-toggle="tab"
                                                                                                to="#job-short-listed">Short
                                                                        Listed</NavLink></li>
                                                                    <li className="nav-item"><NavLink data-toggle="tab"
                                                                                                to="#job-schedule-interview">Schedule
                                                                        For Interview</NavLink></li>
                                                                    <li className="nav-item"><NavLink data-toggle="tab"
                                                                                                to="#job-interviewed">Interviewed</NavLink>
                                                                    </li>
                                                                    <li className="nav-item"><NavLink data-toggle="tab"
                                                                                                to="#job-selected">Selected</NavLink>
                                                                    </li>
                                                                </ul>

                                                                <div className="tab-content pt-50">
                                                                    <div id="job-views"
                                                                         className="tab-pane fade show active">
                                                                        <table
                                                                            className="table table-bordered table-hover table-striped"
                                                                            cellSpacing="0" cellPadding="0">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>S.No</th>
                                                                                <th>Title</th>
                                                                                <th>Short Detail</th>
                                                                                <th>Code</th>
                                                                                <th>Count</th>
                                                                                <th style={{width: '130px'}}>Action</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>1025</td>
                                                                                <td>5</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>1025</td>
                                                                                <td>5</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>3</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>1025</td>
                                                                                <td>5</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>

                                                                    </div>
                                                                    <div id="job-applied" className="tab-pane fade">
                                                                        <table
                                                                            className="table table-bordered table-hover table-striped"
                                                                            cellSpacing="0" cellPadding="0">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>S.No</th>
                                                                                <th>Title</th>
                                                                                <th>Short Detail</th>
                                                                                <th>Code</th>
                                                                                <th>Count</th>
                                                                                <th style={{width: '130px'}}>Action</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>2536</td>
                                                                                <td>3</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>105</td>
                                                                                <td>9</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>3</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>9863</td>
                                                                                <td>7</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>

                                                                    </div>
                                                                    <div id="job-short-listed"
                                                                         className="tab-pane fade">
                                                                        <table
                                                                            className="table table-bordered table-hover table-striped"
                                                                            cellSpacing="0" cellPadding="0">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>S.No</th>
                                                                                <th>Title</th>
                                                                                <th>Short Detail</th>
                                                                                <th>Code</th>
                                                                                <th>Count</th>
                                                                                <th style={{width: '130px'}}>Action</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>11</td>
                                                                                <td>0</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>985</td>
                                                                                <td>0</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>3</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>1536</td>
                                                                                <td>5</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <div id="job-schedule-interview"
                                                                         className="tab-pane fade">
                                                                        <table
                                                                            className="table table-bordered table-hover table-striped"
                                                                            cellSpacing="0" cellPadding="0">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>S.No</th>
                                                                                <th>Title</th>
                                                                                <th>Short Detail</th>
                                                                                <th>Code</th>
                                                                                <th>Count</th>
                                                                                <th style={{width: '130px'}}>Action</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>1292</td>
                                                                                <td>1</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>396</td>
                                                                                <td>0</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>3</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>428</td>
                                                                                <td>5</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>4</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>925</td>
                                                                                <td>9</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <div id="job-interviewed" className="tab-pane fade">
                                                                        <table
                                                                            className="table table-bordered table-hover table-striped"
                                                                            cellSpacing="0" cellPadding="0">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>S.No</th>
                                                                                <th>Title</th>
                                                                                <th>Short Detail</th>
                                                                                <th>Code</th>
                                                                                <th>Count</th>
                                                                                <th style={{width: '130px'}}>Action</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>1298</td>
                                                                                <td>4</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>500</td>
                                                                                <td>1</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>3</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>9825</td>
                                                                                <td>2</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                    <div id="job-selected" className="tab-pane fade">
                                                                        <table
                                                                            className="table table-bordered table-hover table-striped"
                                                                            cellSpacing="0" cellPadding="0">
                                                                            <thead>
                                                                            <tr>
                                                                                <th>S.No</th>
                                                                                <th>Title</th>
                                                                                <th>Short Detail</th>
                                                                                <th>Code</th>
                                                                                <th>Count</th>
                                                                                <th style={{width: '130px'}}>Action</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>1025</td>
                                                                                <td>5</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>Title</td>
                                                                                <td>Some Short Detail</td>
                                                                                <td>1025</td>
                                                                                <td>5</td>
                                                                                <td className="text-center"><NavLink to="#"
                                                                                                               className="ht-btn xs-btn">view
                                                                                    detail</NavLink></td>
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

export default JobTabs;