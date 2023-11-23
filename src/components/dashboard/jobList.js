import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import { getUserData, parseDate, parseDateWithoutTime, STRINGS } from "../../utils/base";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import Button from '@material-ui/core/Button';
import FiltersJob from "./FilterJob";

import { API } from "../../utils/services";
import Spinner from "../spinner";
import JobPostDetailModal from "./modals/JobPostDetailModal";

class JobList extends Component {
    filter = {
        page: 1,
        Company:"",        
        City: "",
        Title: "",
        type: "",
    }

    constructor(props) {

        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        super(props);
        this.state = {
            jobList: [],
            jobPostDetail: {},
            isResponse: false,
            activeJob: false,
            openJobPostDetails: false,
            pageNo: this.filter.page,
            date: date
        }
    }

    componentDidMount() {
        this.getAllJobList(this.filter);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.jobList !== prevState.jobList) {
            this.setState({
                jobList: this.state.jobList
            })
        }
    }

    getAllJobList = (filter) => {
        this.setState({
            isResponse: true
        })
        API.COMPANY.getAllPostedJob(filter.page, filter.Company, filter.City, filter.Title, filter.type ).then((response) => {
            let { status, data, error } = response;
            console.log("joblist", response)
            if (status) {
                this.setState({
                    jobList: data,
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

    handleFilter = (filter) => {
        filter.page = this.filter.page
        this.filter = filter
        this.getAllJobList(this.filter)
    }

    handleApproved = (rowObj) => {
        this.setState({
            openJobPostDetails: true,
            jobPostDetail: rowObj
        })
        // API.JOBS.jobApproved(rowObj.id, rowObj).then((response) => {
        //     if (response.status) {
        //         alert("Job Approved Successfully");
        //         window.location.href = STRINGS.ROUTES.DASHBOARD.JOB_LIST
        //     }
        // });
    }

    handlePaging = (page) => {
        if (page > 0) {
            this.setState({
                pageNo: this.filter.page
            })
            this.getAllJobList(this.filter)
        }
    }

    handleActiveDeActiveJob = (jl) => {

        API.JOBS.activeDeActive(jl.id, !jl.isActive).then((response) => {
            if (response.status) {
                this.setState(prevState => {
                    let jobList = prevState.jobList;
                    jobList.map((d) => {
                        if (d.id === jl.id) {
                            d.isActive = !jl.isActive
                        }
                    });
                    return { jobList: jobList }
                })
            } else {
                alert(response.error)
            }
        })

    }

    // handleCompanyPaymentDetail = (id) => {
    //     console.log("getCompanyPayments", id)
    //     window.location.href = `${STRINGS.ROUTES.DASHBOARD.COMPANY_ADMIN_PAYMENT}/${id}`
    //     //history.push(`${STRINGS.ROUTES.DASHBOARD.COMPANY_ADMIN_PAYMENT}/${id}`)
    // }

    render() {
        let { jobList, isResponse, pageNo, openJobPostDetails, jobPostDetail, activeJob, date } = this.state;
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h1>Job List</h1>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-overview">
                        {
                            openJobPostDetails && (
                                <JobPostDetailModal
                                    openJobPostDetails={openJobPostDetails}
                                    data={jobPostDetail}
                                    onClose={() => {
                                        this.setState({
                                            openJobPostDetails: false,
                                        });
                                        this.getAllJobList(this.filter);
                                    }} />
                            )
                        }
                        <div className="row">
                            {/* <div className="col-xl-9 col-12"> */}
                            <div className={`${getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE ? "col-xl-9 col-lg-12" : "col-xl-12 col-lg-12"}`}>
                                <div className="submited-applications mb-50">
                                    <div className="applications-heading">
                                        <h3>Your posted job list</h3>
                                    </div>
                                    <div className="applications-main-block">
                                        <div className="applications-table ov-des" style={{
                                            position: `${isResponse ? "relative" : "initial"}`,
                                            height: `${isResponse ? "100vh" : "initial"}`
                                        }}>
                                            <table className="table" style={{
                                                width: 'inherit',
                                                height: `${isResponse ? "initial" : "100vh"}`
                                            }}>
                                                <thead>
                                                    <tr>
                                                        {
                                                            getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                                <th>Active/De-active Job</th>
                                                            )
                                                        }
                                                        <th className="width-12">Job Title</th>
                                                        <th>Employer</th>
                                                        <th>City</th>
                                                        <th>Post Date</th>
                                                        {/*<th>End Date</th>*/}
                                                        <th>Job Status</th>
                                                        {
                                                            getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                                <th>Updated Jobs</th>
                                                            )
                                                        }
                                                        <th className="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{ height: "20vh" }}>
                                                    {
                                                        isResponse ?
                                                            jobList.length > 0 ?
                                                                jobList.map((jl, index) =>
                                                                    <tr className="application-item" key={index}>
                                                                        {
                                                                            getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                                                <td className="application-job">
                                                                                    <input type="checkbox"
                                                                                        checked={jl.isActive}
                                                                                        onChange={() => this.handleActiveDeActiveJob(jl)}
                                                                                        name="activeJob"
                                                                                        id="activeJob" />
                                                                                    <span
                                                                                        className="mr-2 ml-2">{jl.isActive ? "Active" : "De-Active"}</span>
                                                                                </td>
                                                                            )
                                                                        }
                                                                        <td className="view-application ">
                                                                            <NavLink to="#"
                                                                                className="view-application text-decoration-none">{jl.title}</NavLink>
                                                                        </td>
                                                                        <td className="view-application ">
                                                                            <NavLink
                                                                                to={getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE ? `${STRINGS.ROUTES.DASHBOARD.COMPANY_ADMIN_PAYMENT}/${jl.companyID}` : "#"}
                                                                                //onClick={() => this.handleCompanyPaymentDetail(jl.companyID)}
                                                                                className="view-application text-decoration-none">{jl.company}</NavLink>
                                                                        </td>
                                                                        <td className="application-employer">
                                                                            {jl.city}
                                                                        </td>
                                                                        <td className="application-created">
                                                                            <span> {parseDateWithoutTime(parseDate(new Date(jl.jobPostDate)))} </span>
                                                                        </td>
                                                                        {/*<td className="application-created">*/}
                                                                        {/*    <span> {parseDateWithoutTime(parseDate(new Date(jl.lastDatePosting)))} </span>*/}
                                                                        {/*</td>*/}
                                                                        <td className="status">
                                                                            <span className="pending">{jl.status}</span>
                                                                        </td>
                                                                        {
                                                                            getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                                                parseDateWithoutTime(parseDate(new Date(jl.approvedOn))) < parseDateWithoutTime(parseDate(new Date(jl.modifiedOn))) ?
                                                                                <td className="New Date">
                                                                                    <Button variant="outlined" color="secondary">{parseDateWithoutTime(parseDate(new Date(jl.modifiedOn)))}</Button>
                                                                                </td>
                                                                                :
                                                                                <td></td>
                                                                            )
                                                                        }
                                                                        <td className="view-application-pop text-right" style={{ paddingRight: `0px` }}>
                                                                            {
                                                                                getUserData().type !== STRINGS.USER_TYPE.APPLICANT_TYPE && (
                                                                                    <NavLink
                                                                                        style={{ marginRight: "4px" }}
                                                                                        to="#"
                                                                                        onClick={() => this.handleApproved(jl)}
                                                                                    ><FontAwesomeIcon
                                                                                            icon={faCircle}
                                                                                            className="lnr lnr-eye mr-2" /><span>View</span></NavLink>
                                                                                    // <Button
                                                                                    //     // variant="contained"
                                                                                    //
                                                                                    //     style={{
                                                                                    //         backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                    //         color: "white !important",
                                                                                    //         marginRight:"4px"
                                                                                    //     }}
                                                                                    // ><span className="text-white"></span></Button>
                                                                                )
                                                                            }
                                                                            <NavLink
                                                                                to={`${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${jl.id}`}><FontAwesomeIcon
                                                                                    icon={faEye} className="lnr lnr-eye" /><span>View Candidates</span></NavLink>
                                                                        </td>
                                                                    </tr>
                                                                ) : <tr>
                                                                    <td>No Data Found</td>
                                                                    <td>No Data Found</td>
                                                                    <td>No Data Found</td>
                                                                    <td>No Data Found</td>
                                                                    <td>No Data Found</td>
                                                                    <td>No Data Found</td>
                                                                    <td>No Data Found</td>
                                                                    <td>No Data Found</td>
                                                                </tr>
                                                            :
                                                            <tr>
                                                                <td>
                                                                    <div className="spinner-holder"
                                                                        style={{ position: "absolute" }}>
                                                                        <Spinner width={100} height={100} type={"Puff"} />
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
                                                            onClick={() => this.handlePaging(this.filter.page--)}
                                                        ><NavLink to="#"
                                                        ><FontAwesomeIcon
                                                                    icon={faAngleLeft}
                                                                    className="fa fa-angle-left" /></NavLink></li>
                                                        <li className={`${this.filter.page === pageNo && "active"}`}
                                                        // onClick={() => this.handlePaging(pageNo)}
                                                        ><NavLink to="#"
                                                            onClick={() => this.handlePaging(this.filter.page = pageNo)}>{pageNo}</NavLink>
                                                        </li>
                                                        <li className={`${this.filter.page === pageNo + 1 && "active"}`}
                                                        // onClick={() => this.handlePaging(pageNo+1)}
                                                        ><NavLink to="#"
                                                            onClick={() => this.handlePaging(this.filter.page = pageNo + 1)}>{pageNo + 1}</NavLink>
                                                        </li>
                                                        <li
                                                            onClick={() => this.handlePaging(this.filter.page++)}
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
                                getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                    <div className="col-xl-3 col-12">
                                        <div className="notifications-applications mb-20 mb-sm-80 mb-xs-80">
                                            <div className="notifications-heading">
                                                <h3>Filters</h3>
                                            </div>
                                            <div className="notifications-main-block">
                                                <FiltersJob isCompany onFilter={this.handleFilter} />
                                            </div>
                                        </div>
                                    </div>

                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JobList;