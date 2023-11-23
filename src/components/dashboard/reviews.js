import React, {Component} from "react";
import {NavLink} from "react-router-dom";

export class Reviews extends Component{
    render() {
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h4>Reviews</h4>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-overview">
                        <div className="row">
                            <div className="col-xl-12 col-12">
                                <div className="job-applications mb-50">
                                    <div className="applications-heading d-flex">
                                        <div className="message-fields-form p-0 border-0">
                                            <form action="#">
                                                <div className="message-form review-from mt-0">
                                                    <button className="search-btn"><i className="lnr lnr-magnifier"></i>
                                                    </button>
                                                    <input type="text" placeholder="Search in messages"/>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="job-applications-main-block">
                                        <div className="job-applications-table">
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Title</th>
                                                    <th className="width-35">Review</th>
                                                    <th className="width-15">Rating</th>
                                                    <th className="text-right">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr className="job-application-item">
                                                    <td className="application-title">
                                                        <span> Jesse R. Chung </span>
                                                    </td>

                                                    <td className="application-job">
                                                        <h3><NavLink to="#">Awesome Person </NavLink></h3>
                                                    </td>

                                                    <td className="application-review">
                                                                    <span> We been friends for long time now, and I can tell you he is a workaholic.
                                                                        So go on, hire this money machine.  </span>
                                                    </td>

                                                    <td className="application-rating">
                                                        <div className="star">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </td>

                                                    <td className="delete-application text-right">
                                                        <NavLink to="#"><i className="lnr lnr-trash"></i></NavLink>
                                                    </td>
                                                </tr>
                                                <tr className="job-application-item">
                                                    <td className="application-title">
                                                        <span> Senior PHP Web Developer </span>
                                                    </td>

                                                    <td className="application-job">
                                                        <h3><NavLink to="#">Good job</NavLink></h3>
                                                    </td>

                                                    <td className="application-review">
                                                        <span> New good job </span>
                                                    </td>

                                                    <td className="application-rating">
                                                        <div className="star">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </td>

                                                    <td className="delete-application text-right">
                                                        <NavLink to="#"><i className="lnr lnr-trash"></i></NavLink>
                                                    </td>
                                                </tr>
                                                <tr className="job-application-item">
                                                    <td className="application-title">
                                                        <span> BowThemes </span>
                                                    </td>

                                                    <td className="application-job">
                                                        <h3><NavLink to="#">Review Bowtheme</NavLink></h3>
                                                    </td>

                                                    <td className="application-review">
                                                                    <span>
                                                                        Etiam vitae turpis nunc. In sollicitudin, ipsum a porttitor suscipit, velit nisi malesuada ipsum, eu eleifend enim ligula id turpis.  </span>
                                                    </td>

                                                    <td className="application-rating">
                                                        <div className="star">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                        </div>
                                                    </td>

                                                    <td className="delete-application text-right">
                                                        <NavLink to="#"><i className="lnr lnr-trash"></i></NavLink>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="application-pagination mb-30">
                                            <div className="row">
                                                <div className="col-12">
                                                    <ul className="page-pagination justify-content-center">
                                                        <li><NavLink to="#"><i className="fa fa-angle-left"></i></NavLink></li>
                                                        <li className="active"><NavLink to="#">1</NavLink></li>
                                                        <li><NavLink to="#">2</NavLink></li>
                                                        <li><NavLink to="#"><i className="fa fa-angle-right"></i></NavLink></li>
                                                    </ul>
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