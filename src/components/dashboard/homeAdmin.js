import React, { Component } from "react";
//import {NavLink} from "react-router-dom";
// import logo1 from '../../content/images/companies_logo/logo-100/logo1.jpg';
// import logo2 from '../../content/images/companies_logo/logo-100/logo2.jpg';
// import logo3 from '../../content/images/companies_logo/logo-100/logo3.jpg';
// import logo4 from '../../content/images/companies_logo/logo-100/logo4.jpg';
//import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {STRINGS} from "../../utils/base";
import { API } from "../../utils/services";
import $ from "jquery";
// import {Divider} from "@material-ui/core";
import { parseDate, parseDateAndTime } from "../../utils/base";
import Spinner from "../spinner";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";
import AdminComponent from "../Widgets/Admin";
import { CToast, CToastBody, CButton, CToastClose } from '@coreui/react'

// import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";


export class HomeAdmin extends Component {
    page = 1;
    state = {
        myApplicantStats: [],
        myCompaniesStats: [],
        myPaymentsStats: [],
        myJobsStats: [],
        myNotifications: [],
        allData: {
            totalJobPosted: 0,
            totalJobProvided: 0,
            totalApprovedJobs: 0,
            totalApplicant: 0,
            totalEmployers: 0,
        },
        tableData: [
            {
                name: "Imran",
                job: "designer",
                package: "xyz",
                purchaseDate: "11/1/2020",
                expiryDate: "22/2/2021",
                amount: "25000"
            },
            {
                name: "Ali Khan",
                job: "developer",
                package: "abc",
                purchaseDate: "15/1/2020",
                expiryDate: "2/7/2021",
                amount: "25574"
            },
            {
                name: "Sarfaraz",
                job: "editor",
                package: "xyz",
                purchaseDate: "11/1/2020",
                expiryDate: "22/2/2021",
                amount: "35000"
            },

        ],
        isResponse: false,
        isResponseStats: false,
    }

    componentDidMount() {
        //this.getMyJobStatus();
        this.getAllStats();
        this.getMyNotification(this.page);
    }

    getAllStats = async () => {
        let data1 = await API.HOME.getAllApplicantStats().then((response) => {
            console.log(response);
            let { status, data } = response;
            if (status) {
                console.log("myApplicantStats", data);
                return { error: false, data: data }
            } else {
                return {
                    error: true, data: []
                }
            }
        })
        let data2 = await API.HOME.getAllCompanyStats().then((response) => {
            console.log(response);
            let { status, data } = response;
            if (status) {
                console.log("myApplicantStats", data);
                return { error: false, data: data }
            } else {
                return {
                    error: true, data: []
                }
            }
        })
        let data3 = await API.HOME.getAllPaymentsStats().then((response) => {
            console.log(response);
            let { status, data } = response;
            if (status) {
                console.log("myApplicantStats", data);
                return { error: false, data: data }
            } else {
                return {
                    error: true, data: []
                }
            }
        })
        let data4 = await API.HOME.getAllJobsStats().then((response) => {
            console.log(response);
            let { status, data } = response;
            if (status) {
                console.log("myApplicantStats", data);
                return { error: false, data: data }
            } else {
                return {
                    error: true, data: []
                }
            }
        })
        let data5 = await API.HOME.getStats().then((response) => {
            console.log(response);
            let { status, data } = response;
            if (status) {
                console.log("myHomeStats", data);
                return { error: false, data: data }
            } else {
                return {
                    error: true, data: []
                }
            }
        })

        if (!data1.error && !data2.error && !data3.error && !data4.error && !data5.error) {
            this.setState({
                myApplicantStats: data1.data,
                myCompaniesStats: data2.data,
                myPaymentsStats: data3.data,
                myJobsStats: data4.data,
                allData: {
                    totalJobPosted: data5.data.totalJobs,
                    totalJobProvided: data5.data.totalJobProvided,
                    totalApprovedJobs: data5.data.totalApprovedJobs,
                    totalApplicant: data5.data.totalCandidates,
                    totalEmployers: data5.data.totalCompanies,
                },
                isResponseStats: true
            })
        }
    }


    getMyNotification = (page) => {
        API.JOBS.getMyNotification(page).then((response) => {
            console.log(response);
            let { status, error, data } = response;
            if (status) {
                console.log("myJob", data);
                this.setState({
                    myNotifications: data,
                    isResponse: true
                })
            } else {
                alert(error)
            }
        })
    }

    render() {
        let { isResponse, isResponseStats, myApplicantStats, myCompaniesStats, myPaymentsStats, allData, myNotifications, myJobsStats, tableData } = this.state;
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h4>Dashboard</h4>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-overview">

                        <div className="container">
                            {
                                isResponse ?
                                    !$.isEmptyObject(allData) ?
                                        <div className="row col-xl-8 col-12" style={{ flexWrap: "inherit" }}>
                                            <div className="col-md-3">
                                                <div className="dbox dbox--color-2">
                                                    <div className="dbox__icon">
                                                        {/*<i className="glyphicon glyphicon-heart"></i>*/}
                                                        {/*<FontAwesomeIcon icon={faCloud} style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                        {/*                 className="glyphicon glyphicon-cloud"/>*/}
                                                    </div>
                                                    <div className="dbox__body">
                                                        <span
                                                            className="dbox__count">{allData.totalEmployers}</span>
                                                        <span className="dbox__title">Total Employers</span>
                                                    </div>

                                                    {/*<div className="dbox__action">*/}
                                                    {/*    <button className="dbox__action__btn">More Info</button>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-4">
                                                <div className="dbox dbox--color-2">
                                                    <div className="dbox__icon">
                                                        {/*<i className="glyphicon glyphicon-heart"></i>*/}
                                                        {/*<FontAwesomeIcon icon={faCloud} style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                        {/*                 className="glyphicon glyphicon-cloud"/>*/}
                                                    </div>
                                                    <div className="dbox__body">
                                                        <span
                                                            className="dbox__count">{allData.totalApplicant}</span>
                                                        <span className="dbox__title">Total Applicant</span>
                                                    </div>

                                                    {/*<div className="dbox__action">*/}
                                                    {/*    <button className="dbox__action__btn">More Info</button>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                            <div className="col-md-3 mb-4">
                                                <div className="dbox dbox--color-2">
                                                    <div className="dbox__icon">
                                                        {/*<FontAwesomeIcon icon={faCloud} style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                        {/*                 className="glyphicon glyphicon-cloud"/>*/}
                                                    </div>
                                                    <div className="dbox__body">
                                                        <span className="dbox__count">{allData.totalJobPosted}</span>
                                                        <span className="dbox__title">Job Posted</span>
                                                    </div>

                                                    {/*<div className="dbox__action">*/}
                                                    {/*    <button className="dbox__action__btn">More Info</button>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>

                                            <div className="col-md-4 mb-4">
                                                <div className="dbox dbox--color-2">
                                                    <div className="dbox__icon">
                                                        {/*<i className="glyphicon glyphicon-heart"></i>*/}
                                                        {/*<FontAwesomeIcon icon={faCloud} style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                        {/*                 className="glyphicon glyphicon-cloud"/>*/}
                                                    </div>
                                                    <div className="dbox__body">
                                                        <span
                                                            className="dbox__count">{allData.totalApprovedJobs}</span>
                                                        <span className="dbox__title">Jobs Approved</span>
                                                    </div>

                                                    {/*<div className="dbox__action">*/}
                                                    {/*    <button className="dbox__action__btn">More Info</button>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="dbox dbox--color-2">
                                                    <div className="dbox__icon">
                                                        {/*<i className="glyphicon glyphicon-download"></i>*/}
                                                        {/*<FontAwesomeIcon icon={faCloud} style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                        {/*                 className="glyphicon glyphicon-cloud"/>*/}
                                                    </div>
                                                    <div className="dbox__body">
                                                        <span
                                                            className="dbox__count">{allData.totalJobProvided}</span>
                                                        <span className="dbox__title">Jobs Provided</span>
                                                    </div>

                                                    {/*<div className="dbox__action">*/}
                                                    {/*    <button className="dbox__action__btn">More Info</button>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                            {/*<div className="d-flex justify-content-center align-items-center">*/}
                                            {/*    <div className="notifications-applications"*/}
                                            {/*         style={{padding: "16px", height: "initial"}}>*/}
                                            {/*        <div className="notifications-main-block">*/}
                                            {/*            <div className="notification-listing">*/}
                                            {/*                <div className="d-flex width-100 flex-column">*/}
                                            {/*                    <div className="flex mb-1 text-nowrap">*/}
                                            {/*                        Package : {allData.package}*/}
                                            {/*                    </div>*/}
                                            {/*                    <Divider variant="horizontal" style={{*/}
                                            {/*                        backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,*/}
                                            {/*                        width: "100%",*/}
                                            {/*                        height: "2px"*/}
                                            {/*                    }}/>*/}
                                            {/*                    /!*<div className="flex mb-1">*!/*/}
                                            {/*                    /!*    No of jobs : 0/1*!/*/}
                                            {/*                    /!*</div>*!/*/}
                                            {/*                    /!*<Divider variant="horizontal" style={{*!/*/}
                                            {/*                    /!*    backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,*!/*/}
                                            {/*                    /!*    width: "100%",*!/*/}
                                            {/*                    /!*    height: "2px"*!/*/}
                                            {/*                    /!*}}/>*!/*/}

                                            {/*                    <div className="flex mb-1 text-nowrap">*/}
                                            {/*                        Start Date : {parseDateAndTime(parseDate(new Date(allData.packageStart)))}*/}
                                            {/*                    </div>*/}
                                            {/*                    <Divider variant="horizontal" style={{*/}
                                            {/*                        backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,*/}
                                            {/*                        width: "100%",*/}
                                            {/*                        height: "2px"*/}
                                            {/*                    }}/>*/}

                                            {/*                    <div className="flex mb-1 text-nowrap">*/}
                                            {/*                        End Date : {parseDateAndTime(parseDate(new Date(allData.packageEnd)))}*/}
                                            {/*                    </div>*/}
                                            {/*                    <Divider variant="horizontal" style={{*/}
                                            {/*                        backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,*/}
                                            {/*                        width: "100%",*/}
                                            {/*                        height: "2px"*/}
                                            {/*                    }}/>*/}

                                            {/*                    <div className="d-flex mb-1 text-nowrap">*/}
                                            {/*                        Status :*/}
                                            {/*                        <div className="d-flex ml-4 mr-4">*/}
                                            {/*                            <div className="d-flex width-35">{allData.packageStatus}</div>*/}
                                            {/*                        </div>*/}
                                            {/*                    </div>*/}
                                            {/*                    <Divider variant="horizontal" style={{*/}
                                            {/*                        backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,*/}
                                            {/*                        width: "100%",*/}
                                            {/*                        height: "2px"*/}
                                            {/*                    }}/>*/}

                                            {/*                </div>*/}
                                            {/*            </div>*/}
                                            {/*        </div>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div> :
                                        "No Data Found..."
                                    : <div className="spinner-holder"
                                        style={{ height: "100vh", position: "absolute" }}>
                                        <Spinner height={100} width={100} type={"Puff"} />
                                    </div>
                            }
                        </div>
                        <div className="row">
                            <div className="col-xl-8 col-12">
                                <div className="d-flex flex-column w-100 bg-white p-2 admin-dashboard">
                                    {
                                        isResponseStats && (
                                            <AdminComponent
                                                applicantStats={myApplicantStats}
                                                companiesStats={myCompaniesStats}
                                                paymentsStats={myPaymentsStats}
                                                jobsStats={myJobsStats}
                                            />
                                        )
                                    }

                                    <br />
                                    {/*<table className="table">*/}
                                    {/*    <thead className="gradiant-css">*/}
                                    {/*    <tr>*/}
                                    {/*        <th className="text-white width-35 text-nowrap">Customer</th>*/}
                                    {/*        <th className="text-white width-15 text-nowrap">Job</th>*/}
                                    {/*        <th className="text-white width-12 text-nowrap">Package</th>*/}
                                    {/*        <th className="text-white width-15 text-nowrap">Purchase Date</th>*/}
                                    {/*        <th className="text-white width-30 text-nowrap">Expiry Date</th>*/}
                                    {/*        <th className="text-white width-23 text-nowrap text-right">Amount</th>*/}
                                    {/*    </tr>*/}
                                    {/*    </thead>*/}
                                    {/*    <tbody style={{position: "relative"}}>*/}
                                    {/*    {*/}
                                    {/*        tableData.length > 0 ?*/}
                                    {/*            tableData.map((js) =>*/}
                                    {/*                <tr className="application-item">*/}
                                    {/*                    <td className="application-job">*/}
                                    {/*                        <NavLink*/}
                                    {/*                            to="/"*/}
                                    {/*                            // to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${js.jobTitle}&city=${js.city}&type=&page=1`}*/}
                                    {/*                        >{js.name}</NavLink>*/}
                                    {/*                    </td>*/}

                                    {/*                    <td className="application-employer">*/}
                                    {/*                        <NavLink className="dotted"*/}
                                    {/*                                 to="#">{js.job}</NavLink>*/}
                                    {/*                    </td>*/}

                                    {/*                    <td className="status">*/}
                                    {/*                        <span className="pending">{js.package}</span>*/}
                                    {/*                    </td>*/}

                                    {/*                    <td className="application-created">*/}
                                    {/*                        <span> {parseDateWithoutTime(parseDate(new Date(js.purchaseDate)))} </span>*/}
                                    {/*                    </td>*/}

                                    {/*                    <td className="application-created">*/}
                                    {/*                        <span> {js.expiryDate !== null && parseDateWithoutTime(parseDate(new Date(js.expiryDate)))} </span>*/}
                                    {/*                    </td>*/}
                                    {/*                    <td>*/}
                                    {/*                        <span> {js.amount} </span>*/}
                                    {/*                    </td>*/}

                                    {/*                    /!*<td className="view-application text-xl-right">*!/*/}
                                    {/*                    /!*    <NavLink*!/*/}
                                    {/*                    /!*        to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${js.jobTitle}&city=${js.city}&type=&page=1`}*!/*/}
                                    {/*                    /!*        className="view-application">View</NavLink>*!/*/}
                                    {/*                    /!*</td>*!/*/}
                                    {/*                </tr>*/}
                                    {/*            ) :*/}
                                    {/*            <tr>*/}
                                    {/*                <td>No Data Found</td>*/}
                                    {/*                <td>No Data Found</td>*/}
                                    {/*                <td>No Data Found</td>*/}
                                    {/*                <td>No Data Found</td>*/}
                                    {/*                <td>No Data Found</td>*/}
                                    {/*                <td>No Data Found</td>*/}
                                    {/*            </tr>*/}
                                    {/*    }*/}
                                    {/*    </tbody>*/}
                                    {/*</table>*/}
                                    {/*<div className="application-pagination mb-30">*/}
                                    {/*    <div className="row">*/}
                                    {/*        <div className="col-12">*/}
                                    {/*            <ul className="page-pagination justify-content-center">*/}
                                    {/*                <li><NavLink to="#"><FontAwesomeIcon icon={faAngleLeft}*/}
                                    {/*                                                     className="fa fa-angle-left"/></NavLink>*/}
                                    {/*                </li>*/}
                                    {/*                <li className="active"><NavLink to="#">1</NavLink></li>*/}
                                    {/*                <li><NavLink to="#">2</NavLink></li>*/}
                                    {/*                <li><NavLink to="#"><FontAwesomeIcon icon={faAngleRight}*/}
                                    {/*                                                     className="fa fa-angle-right"/></NavLink>*/}
                                    {/*                </li>*/}
                                    {/*            </ul>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            <div className="col-xl-4 col-12">
                                <div className="notifications-applications mb-20 mb-sm-80 mb-xs-80">
                                    <div className="notifications-heading">
                                        <h3>Notifications</h3>
                                    </div>
                                    <div className="notifications-main-block">
                                        <div className="notification-listing ov-des" style={{
                                            padding: "15px",
                                            height: "400px",
                                            overflow: "auto"
                                        }}>

                                            {
                                                isResponse && (
                                                    myNotifications.length > 0 ?

                                                        myNotifications.map((notIf, index) =>
                                                            <CToast key={index} autohide={false} visible={true}>
                                                                <CToastBody className="gradiant-css text-white">
                                                                    <img src="#" className="rounded mr-2" alt="" />
                                                                    <strong className="mr-auto"></strong>
                                                                    <small style={{ fontWeight: `bold`, marginRight: `5px` }}> {parseDateAndTime(parseDate(new Date(notIf.createdOn)))}</small>
                                                                    <CToastClose aria-label="Close" component={CButton} style={{ backgroundColor: `rgb(110, 60, 121)`, border: `black`, float: `right`, position: `relative`, height: `30px`, padding: `.1rem .75rem`, fontSize: `0.75rem` }}>
                                                                        x
                                                                    </CToastClose>
                                                                    <div className="mt-2 pt-2 border-top">
                                                                        <CButton type="button" color="primary" size="sm" style={{ backgroundColor: `transparent`, border: `transparent`, textAlign: `left`, fontWeight: `bold` }}>
                                                                            {notIf.message}
                                                                        </CButton>
                                                                    </div>
                                                                </CToastBody>
                                                            </CToast>

                                                        )
                                                        :
                                                        <div className="empty">
                                                            <h3>There are no notifications</h3>
                                                            <p>Your latest notifications will be displayed here</p>
                                                        </div>
                                                )
                                            }


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