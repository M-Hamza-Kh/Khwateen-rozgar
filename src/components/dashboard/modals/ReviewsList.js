import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import {faAngleRight, faCircle} from "@fortawesome/free-solid-svg-icons";
import {getUserData, STRINGS} from "../../../utils/base";
import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import {API} from "../../../utils/services";
import Spinner from "../../spinner";
import CompanyReviewDetails from "./CompanyReviewDetails";
import {FormControl, MenuItem, Select} from "@material-ui/core";
import {parseDate, parseDateWithoutTime} from "../../../utils/base";
import Button from '@material-ui/core/Button';

class ReviewsList extends Component {
    filter = {
        pageNo: 1,
        isApproved: false
    }

    constructor(props) {
        super(props);
        this.state = {
            reviewsList: [],
            isResponse: false,
            isApproved: 1,
            pageNo: this.filter.pageNo,
            reviewDetail: {},
            openDetailModal: false
        }
    }

    componentDidMount() {
        this.getAllReviews(this.filter);
    }

    getAllReviews = (filter) => {
        this.setState({
            isResponse: true
        })
        API.REVIEWS.getAllReviewsAdmin(filter).then((response) => {
            let {status, data, error} = response;
            console.log("reviewsList", response)
            if (status) {
                this.setState({
                    reviewsList: data,
                    isResponse: true
                })
            } else {
                alert(error);
                this.setState({
                    isResponse: false
                })
            }
        })
    }

    handlePaging = (page) => {
        if (page > 0) {
            this.setState({
                pageNo: this.filter.pageNo
            })
            this.getAllReviews(this.filter)
        }
    }

    handleViewDetails = (d) => {
        this.setState({
            reviewDetail: d,
            openDetailModal: true
        })
    }



    // handleCompanyPaymentDetail = (id) => {
    //     console.log("getCompanyPayments", id)
    //     window.location.href = `${STRINGS.ROUTES.DASHBOARD.COMPANY_ADMIN_PAYMENT}/${id}`
    //     //history.push(`${STRINGS.ROUTES.DASHBOARD.COMPANY_ADMIN_PAYMENT}/${id}`)
    // }

    render() {
        let {reviewsList, isResponse, pageNo, openDetailModal, reviewDetail} = this.state;
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h1>Reviews List</h1>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-overview">
                        <div className="row">
                            <div className="col-xl-12 col-12">
                                <div className="submited-applications mb-50">
                                    <div className="applications-main-block">
                                        <div className="applications-table ov-des" style={{
                                            position: `${isResponse ? "relative" : "initial"}`,
                                            height: `${isResponse ? "100vh" : "initial"}`
                                        }}>
                                            <table className="table" style={{
                                                width: '100%',
                                                height: `${isResponse ? "initial" : "100vh"}`
                                            }}>
                                                <thead>
                                                <tr>
                                                    {/*<th>S.No</th>*/}
                                                    <th className="width-12">Title</th>
                                                    <th>City</th>
                                                    <th>Address</th>
                                                    <th className="width-12">Updated Reviews</th>
                                                    {/*<th>End Date</th>*/}
                                                    {/*<th>Status</th>*/}
                                                    <th className="text-center">Action</th>
                                                </tr>
                                                </thead>
                                                <tbody style={{height: "20vh"}}>
                                                {
                                                    isResponse ?
                                                        reviewsList.length > 0 ?
                                                            reviewsList.map((jl, index) =>
                                                                <tr className="application-item" key={index}>
                                                                    {/*<td className="application-job">*/}
                                                                    {/*    1*/}
                                                                    {/*</td>*/}
                                                                    <td className="view-application text-nowrap">
                                                                        <NavLink to="#"
                                                                                 className="view-application text-decoration-none">{jl.company}</NavLink>
                                                                    </td>
                                                                    <td className="application-employer">
                                                                        {jl.city}
                                                                    </td>
                                                                    <td className="status" style={{width: "40vh"}}>
                                                                        <span className="pending">{jl.address}</span>
                                                                    </td>

                                                                    {
                                                                    parseDateWithoutTime(parseDate(new Date(jl.createdOn))) <= parseDateWithoutTime(parseDate(new Date(jl.modifiedOn)))  ?
                                                                    <td className="New Date" style={{padding: `5px 5px`}}>
                                                                    <Button variant="outlined" color="secondary">{parseDateWithoutTime(parseDate(new Date(jl.modifiedOn)))}</Button>
                                                                    </td>

                                                                    :
                                                                    <td>
                                                                    {/* {(date)} */}
                                                                    </td>
                                                                   }
                                                                    
                                                                    {/*<td className="view-application-pop">*/}
                                                                    {/*    {*/}
                                                                    {/*        !jl.isApproved && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE ? (*/}
                                                                    {/*            <NavLink*/}
                                                                    {/*                style={{marginRight: "4px"}}*/}
                                                                    {/*                to="#"*/}
                                                                    {/*                onClick={() => this.handleApproved(jl)}*/}
                                                                    {/*            ><FontAwesomeIcon*/}
                                                                    {/*                icon={faCircle}*/}
                                                                    {/*                className="lnr lnr-eye mr-2"/><span>Approve</span></NavLink>*/}
                                                                    {/*            // <Button*/}
                                                                    {/*            //     // variant="contained"*/}
                                                                    {/*            //*/}
                                                                    {/*            //     style={{*/}
                                                                    {/*            //         backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,*/}
                                                                    {/*            //         color: "white !important",*/}
                                                                    {/*            //         marginRight:"4px"*/}
                                                                    {/*            //     }}*/}
                                                                    {/*            // ><span className="text-white"></span></Button>*/}
                                                                    {/*        ) : <span className="pending">Approved</span>*/}
                                                                    {/*    }*/}
                                                                    {/*</td>*/}
                                                                    <td className="view-application-pop text-center">
                                                                        <NavLink
                                                                            to={`#`}
                                                                            onClick={() => this.handleViewDetails(jl)}><FontAwesomeIcon
                                                                            icon={faEye} className="lnr lnr-eye"/><span>View Details</span></NavLink>
                                                                    </td>
                                                                </tr>
                                                            ) : <tr>
                                                                <td className="text-nowrap">No Data Found</td>
                                                                <td>No Data Found</td>
                                                                <td>No Data Found</td>
                                                                {/*<td>No Data Found</td>*/}
                                                                <td>No Data Found</td>
                                                            </tr>
                                                        :
                                                        <tr>
                                                            <td>
                                                                <div className="spinner-holder"
                                                                     style={{position: "absolute"}}>
                                                                    <Spinner width={100} height={100} type={"Puff"}/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="application-pagination mb-30">
                                            <div className="row">
                                                <div className="col-12">
                                                    <ul className="page-pagination justify-content-center">
                                                        <li
                                                            onClick={() => this.handlePaging(this.filter.pageNo--)}
                                                        ><NavLink to="#"
                                                        ><FontAwesomeIcon
                                                            icon={faAngleLeft}
                                                            className="fa fa-angle-left"/></NavLink></li>
                                                        <li className={`${this.filter.pageNo === pageNo && "active"}`}
                                                            // onClick={() => this.handlePaging(pageNo)}
                                                        ><NavLink to="#">{pageNo}</NavLink>
                                                        </li>
                                                        <li className={`${this.filter.pageNo === pageNo + 1 && "active"}`}
                                                            // onClick={() => this.handlePaging(pageNo+1)}
                                                        ><NavLink to="#">{pageNo + 1}</NavLink></li>
                                                        <li
                                                            onClick={() => this.handlePaging(this.filter.pageNo++)}
                                                        ><NavLink to="#"><FontAwesomeIcon
                                                            icon={faAngleRight}
                                                            className="fa fa-angle-right"
                                                        /></NavLink></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {
                                openDetailModal && (
                                    <CompanyReviewDetails openDetailModal={openDetailModal}
                                                          reviewDetail={reviewDetail}
                                                          onClose={() => this.setState({
                                                              reviewDetail: {},
                                                              openDetailModal: false
                                                          })}/>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReviewsList;