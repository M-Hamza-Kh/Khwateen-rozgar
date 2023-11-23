import React, {Component} from "react";
import {NavLink} from "react-router-dom";
// import logo1 from '../../content/images/companies_logo/logo-100/logo1.jpg';
// import logo2 from '../../content/images/companies_logo/logo-100/logo2.jpg';
// import logo3 from '../../content/images/companies_logo/logo-100/logo3.jpg';
// import logo4 from '../../content/images/companies_logo/logo-100/logo4.jpg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {STRINGS} from "../../utils/base";
import {faAngleRight,} from "@fortawesome/free-solid-svg-icons";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import {API} from "../../utils/services";
import { CToast, CToastBody, CButton, CToastClose } from '@coreui/react'

import {
    parseDate,
    parseDateAndTime,
    parseDateWithoutTime,
    STRINGS
} from "../../utils/base";
import Spinner from "../spinner";
import {Toast, ToastBody, ToastHeader} from "react-bootstrap";
import {MobileHeader} from "../mobile/header";


// import {faChevronRight} from "@fortawesome/free-solid-svg-icons/faChevronRight";


export class Home extends Component {
    page = 1;
    jobStatusPage = 1;
    state = {
        myJobsStatus: [],
        isResponse: true,
        jobStatusPage: 1,
        myNotifications: []
    }

    componentDidMount() {
        this.getMyJobStatus(this.jobStatusPage);
        this.getMyNotification(this.page);
    }

    getMyJobStatus = (page) => {
        API.JOBS.getMyJobStatus(page).then((response) => {
            console.log(response);
            let {status, error, data} = response;
            if (status) {
                console.log("myJob", data);
                this.setState({
                    myJobsStatus: data,
                    isResponse: false
                })
            } else {
                alert(error)
            }
        })
        //     .catch((err) => {
        //     alert(err)
        // })
    }

    getMyNotification = (page) => {
        API.JOBS.getMyNotification(page).then((response) => {
            console.log(response);
            let {status, error, data} = response;
            if (status) {
                console.log("myJob", data);
                this.setState({
                    myNotifications: data,
                    isResponse: false
                })
            } else {
                alert(error)
            }
        })
    }
    handleOpenShowMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }
    render() {
        let {isResponse, myJobsStatus, myNotifications,jobStatusPage} = this.state;
        return (
            <div className="col-xl-10 col-lg-9" >
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h4>Dashboard</h4>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-overview">

                        <div className="row">
                            <div className="col-xl-8 col-12">
                                <div className="submited-applications mb-50">
                                    <div className="applications-heading">
                                        <h3>Already Applied</h3>
                                    </div>
                                    <div className="applications-main-block">
                                        <div className="applications-table ov-des" style={{
                                            position: `${isResponse ? "relative" : "initial"}`,
                                            height: `${isResponse ? "100vh" : "initial"}`
                                        }}>
                                            {
                                                !isResponse ?
                                                    <table className="table">
                                                        <thead className="gradiant-css">
                                                        <tr>
                                                            <th className="text-white width-35 text-nowrap">Applied Job</th>
                                                            <th className="text-white width-15 text-nowrap">Employer</th>
                                                            <th className="text-white width-12 text-nowrap">Status</th>
                                                            <th className="text-white width-15 text-nowrap">Applied Date</th>
                                                            <th className="text-white width-30 text-nowrap">Viewed On</th>
                                                            <th className="text-white width-23 text-nowrap text-right">Action</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody style={{position: "relative"}}>
                                                        {
                                                            myJobsStatus.length > 0 ?
                                                                myJobsStatus.map((js, index) =>
                                                                    <tr key={index} className="application-item">
                                                                        <td className="application-job">
                                                                            <h3><NavLink
                                                                                to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${js.jobTitle}&city=${js.city}&type=&page=1`}
                                                                            >{js.jobTitle}</NavLink>
                                                                            </h3>
                                                                        </td>

                                                                        <td className="application-employer">
                                                                            <NavLink className="dotted"
                                                                                     to="#">{js.employer}</NavLink>
                                                                        </td>

                                                                        <td className="status">
                                                                            <span className="pending">{js.state === "Apply" ? "Applied" : js.state === "interviewed" ? "Viewed" : js.state}</span>
                                                                        </td>

                                                                        <td className="application-created">
                                                                            <span> {parseDateWithoutTime(parseDate(new Date(js.appliedOn)))} </span>
                                                                        </td>

                                                                        <td className="application-created">
                                                                            <span> {js.viewedByEmpOn !== null && parseDateWithoutTime(parseDate(new Date(js.viewedByEmpOn)))} </span>
                                                                        </td>

                                                                        <td className="view-application text-xl-right">
                                                                            <NavLink
                                                                                to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${js.jobTitle}&city=${js.city}&type=&page=1`}
                                                                                className="view-application">View</NavLink>
                                                                        </td>
                                                                    </tr>
                                                                ) : "No Data Found"
                                                        }
                                                        </tbody>
                                                    </table>
                                                    :
                                                    <div className="spinner-holder"
                                                         style={{height: "100vh", position: "absolute"}}>
                                                        <Spinner height={100} width={100} type={"Puff"}/>
                                                    </div>
                                            }

                                        </div>
                                        <div className="application-pagination mb-30">
                                            <div className="row">
                                                <div className="col-12">
                                                    <ul className="page-pagination justify-content-center">
                                                        <li
                                                            onClick={() => {
                                                                this.jobStatusPage--
                                                                this.getMyJobStatus(this.jobStatusPage);
                                                            }}
                                                        ><NavLink to="#"><FontAwesomeIcon icon={faAngleLeft}
                                                                                             className="fa fa-angle-left"/></NavLink>
                                                        </li>
                                                        <li className={`${this.jobStatusPage === jobStatusPage && "active"}`}><NavLink to="#">{jobStatusPage}</NavLink></li>
                                                        <li className={`${this.jobStatusPage  === jobStatusPage + 1 && "active"}`}><NavLink to="#">{jobStatusPage + 1}</NavLink></li>
                                                        <li
                                                            onClick={() => {
                                                                this.jobStatusPage++
                                                                this.getMyJobStatus(this.jobStatusPage);
                                                            }}
                                                        ><NavLink to="#"><FontAwesomeIcon icon={faAngleRight}
                                                                                             className="fa fa-angle-right"/></NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*<div className="bookmark-applications mb-50">*/}
                                {/*    <div className="bookmark-heading">*/}
                                {/*        <h3>Bookmarked</h3>*/}
                                {/*        <NavLink to="#">View All <FontAwesomeIcon icon={faChevronRight} className="lnr lnr-chevron-right"/></NavLink>*/}
                                {/*    </div>*/}
                                {/*    <div className="bookmark-main-block">*/}
                                {/*        <div className="bookmark-table">*/}
                                {/*            <table className="table">*/}
                                {/*                <tbody>*/}
                                {/*                <tr className="bookmark-item">*/}
                                {/*                    <td className="bookmark-job">*/}
                                {/*                       /!* <!-- Single Job Start  -->*!/*/}
                                {/*                        <div*/}
                                {/*                            className="single-job style-two border-0 p-0 bg-transparent">*/}
                                {/*                            <div className="info-top">*/}
                                {/*                                <div className="job-image ml-0 mr-10 mr-xs-0">*/}
                                {/*                                    <NavLink to="job-details.html">*/}
                                {/*                                        <img*/}
                                {/*                                            src={logo1}*/}
                                {/*                                            alt="logo"/>*/}
                                {/*                                    </NavLink>*/}
                                {/*                                </div>*/}
                                {/*                                <div className="job-info">*/}
                                {/*                                    <div className="job-info-inner">*/}
                                {/*                                        <div className="job-info-top">*/}
                                {/*                                            <div className="title-name">*/}
                                {/*                                                <h5 className="job-title">*/}
                                {/*                                                    <NavLink to="#">Chief Accountant</NavLink>*/}
                                {/*                                                </h5>*/}
                                {/*                                            </div>*/}
                                {/*                                        </div>*/}
                                {/*                                        <div className="job-meta-two flex-wrap">*/}
                                {/*                                            <FontAwesomeIcon icon={faMoneyBill} color={STRINGS.TYPES.COLORS.RED} className="i gj-icon gj-icon-money"/>*/}
                                {/*                                            <div className="field-salary_from">*/}
                                {/*                                                $500 - $1,000 / month*/}
                                {/*                                            </div>*/}
                                {/*                                            <div className="field-datetime">*/}
                                {/*                                                <FontAwesomeIcon style={{marginRight:"5px"}} icon={faClock} color={STRINGS.TYPES.COLORS.GREY}*/}
                                {/*                                                className="i lnr lnr-clock"/>8 months*/}
                                {/*                                                ago*/}
                                {/*                                            </div>*/}
                                {/*                                            <div className="field-map"><FontAwesomeIcon style={{marginRight:"5px"}} icon={faMapMarker} color={STRINGS.TYPES.COLORS.GREY}*/}
                                {/*                                                className="lnr lnr-map-marker"/>Hanoi,*/}
                                {/*                                                Hanoi*/}
                                {/*                                            </div>*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                        </div>*/}
                                {/*                       /!* <!-- Single Job End -->*!/*/}
                                {/*                    </td>*/}

                                {/*                    <td className="delete-bookmark text-xl-right">*/}
                                {/*                        <NavLink to="#"> <FontAwesomeIcon icon={faTrashAlt} className="lnr lnr-trash"/></NavLink>*/}
                                {/*                    </td>*/}
                                {/*                </tr>*/}
                                {/*                <tr className="bookmark-item">*/}
                                {/*                    <td className="bookmark-job">*/}
                                {/*                       /!* <!-- Single Job Start  -->*!/*/}
                                {/*                        <div*/}
                                {/*                            className="single-job style-two border-0 p-0 bg-transparent">*/}
                                {/*                            <div className="info-top">*/}
                                {/*                                <div className="job-image ml-0 mr-10 mr-xs-0">*/}
                                {/*                                    <NavLink to="job-details.html">*/}
                                {/*                                        <img*/}
                                {/*                                            src={logo2}*/}
                                {/*                                            alt="logo"/>*/}
                                {/*                                    </NavLink>*/}
                                {/*                                </div>*/}
                                {/*                                <div className="job-info">*/}
                                {/*                                    <div className="job-info-inner">*/}
                                {/*                                        <div className="job-info-top">*/}
                                {/*                                            <div className="title-name">*/}
                                {/*                                                <h5 className="job-title">*/}
                                {/*                                                    <NavLink to="#">Computer System*/}
                                {/*                                                        Administrator</NavLink>*/}
                                {/*                                                </h5>*/}
                                {/*                                            </div>*/}
                                {/*                                        </div>*/}
                                {/*                                        <div className="job-meta-two flex-wrap">*/}
                                {/*                                            <div className="field-salary_from">*/}
                                {/*                                                <FontAwesomeIcon icon={faMoneyBill} color={STRINGS.TYPES.COLORS.RED} className="i gj-icon gj-icon-money"/>*/}
                                {/*                                                $700 - $9,000 / month*/}
                                {/*                                            </div>*/}
                                {/*                                            <div className="field-datetime"><FontAwesomeIcon style={{marginRight:"5px"}} icon={faClock} color={STRINGS.TYPES.COLORS.GREY}*/}
                                {/*                                                className="lnr lnr-clock"/>4 months*/}
                                {/*                                                ago*/}
                                {/*                                            </div>*/}
                                {/*                                            <div className="field-map"><FontAwesomeIcon style={{marginRight:"5px"}} icon={faMapMarker} color={STRINGS.TYPES.COLORS.GREY}*/}
                                {/*                                                className="lnr lnr-map-marker"/>Chicago,*/}
                                {/*                                                Illinois*/}
                                {/*                                            </div>*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                        </div>*/}
                                {/*                       /!* <!-- Single Job End -->*!/*/}
                                {/*                    </td>*/}

                                {/*                    <td className="delete-bookmark text-xl-right">*/}
                                {/*                        <NavLink to="#"> <FontAwesomeIcon icon={faTrashAlt} className="lnr lnr-trash"/></NavLink>*/}
                                {/*                    </td>*/}
                                {/*                </tr>*/}
                                {/*                <tr className="bookmark-item">*/}
                                {/*                    <td className="bookmark-job">*/}
                                {/*                       /!* <!-- Single Job Start  -->*!/*/}
                                {/*                        <div*/}
                                {/*                            className="single-job style-two border-0 p-0 bg-transparent">*/}
                                {/*                            <div className="info-top">*/}
                                {/*                                <div className="job-image ml-0 mr-10 mr-xs-0">*/}
                                {/*                                    <NavLink to="job-details.html">*/}
                                {/*                                        <img*/}
                                {/*                                            src={logo3}*/}
                                {/*                                            alt="logo"/>*/}
                                {/*                                    </NavLink>*/}
                                {/*                                </div>*/}
                                {/*                                <div className="job-info">*/}
                                {/*                                    <div className="job-info-inner">*/}
                                {/*                                        <div className="job-info-top">*/}
                                {/*                                            <div className="title-name">*/}
                                {/*                                                <h5 className="job-title">*/}
                                {/*                                                    <NavLink to="#">Android & IOS*/}
                                {/*                                                        Developer</NavLink>*/}
                                {/*                                                </h5>*/}
                                {/*                                            </div>*/}
                                {/*                                        </div>*/}
                                {/*                                        <div className="job-meta-two flex-wrap">*/}
                                {/*                                            <div className="field-salary_from">*/}
                                {/*                                                <FontAwesomeIcon icon={faMoneyBill} color={STRINGS.TYPES.COLORS.RED} className="i gj-icon gj-icon-money"/>*/}
                                {/*                                                $500 - $1,000 / month*/}
                                {/*                                            </div>*/}
                                {/*                                            <div className="field-datetime"><FontAwesomeIcon style={{marginRight:"5px"}} icon={faClock} color={STRINGS.TYPES.COLORS.GREY}*/}
                                {/*                                                className="lnr lnr-clock"/>8 months*/}
                                {/*                                                ago*/}
                                {/*                                            </div>*/}
                                {/*                                            <div className="field-map"><FontAwesomeIcon style={{marginRight:"5px"}} icon={faMapMarker} color={STRINGS.TYPES.COLORS.GREY}*/}
                                {/*                                                className="lnr lnr-map-marker"/>Hanoi,*/}
                                {/*                                                Hanoi*/}
                                {/*                                            </div>*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                        </div>*/}
                                {/*                       /!* <!-- Single Job End -->*!/*/}
                                {/*                    </td>*/}

                                {/*                    <td className="delete-bookmark text-xl-right">*/}
                                {/*                        <NavLink to="#"> <FontAwesomeIcon icon={faTrashAlt} className="lnr lnr-trash"/></NavLink>*/}
                                {/*                    </td>*/}
                                {/*                </tr>*/}
                                {/*                <tr className="bookmark-item">*/}
                                {/*                    <td className="bookmark-job">*/}
                                {/*                       /!* <!-- Single Job Start  -->*!/*/}
                                {/*                        <div*/}
                                {/*                            className="single-job style-two border-0 p-0 bg-transparent">*/}
                                {/*                            <div className="info-top">*/}
                                {/*                                <div className="job-image ml-0 mr-10 mr-xs-0">*/}
                                {/*                                    <NavLink to="job-details.html">*/}
                                {/*                                        <img*/}
                                {/*                                            src={logo4}*/}
                                {/*                                            alt="logo"/>*/}
                                {/*                                    </NavLink>*/}
                                {/*                                </div>*/}
                                {/*                                <div className="job-info">*/}
                                {/*                                    <div className="job-info-inner">*/}
                                {/*                                        <div className="job-info-top">*/}
                                {/*                                            <div className="title-name">*/}
                                {/*                                                <h5 className="job-title">*/}
                                {/*                                                    <NavLink to="#">Senior PHP Web*/}
                                {/*                                                        Developer</NavLink>*/}
                                {/*                                                </h5>*/}
                                {/*                                            </div>*/}
                                {/*                                        </div>*/}
                                {/*                                        <div className="job-meta-two flex-wrap">*/}
                                {/*                                            <div className="field-salary_from">*/}
                                {/*                                                <FontAwesomeIcon icon={faMoneyBill} color={STRINGS.TYPES.COLORS.RED} className="i gj-icon gj-icon-money"/>*/}
                                {/*                                                $500 - $1,000 / month*/}
                                {/*                                            </div>*/}
                                {/*                                            <div className="field-datetime"><FontAwesomeIcon style={{marginRight:"5px"}} icon={faClock} color={STRINGS.TYPES.COLORS.GREY}*/}
                                {/*                                                className="lnr lnr-clock"/>8 months*/}
                                {/*                                                ago*/}
                                {/*                                            </div>*/}
                                {/*                                            <div className="field-map"><FontAwesomeIcon style={{marginRight:"5px"}} icon={faMapMarker} color={STRINGS.TYPES.COLORS.GREY}*/}
                                {/*                                                className="lnr lnr-map-marker"/>Chicago,*/}
                                {/*                                                Illinois*/}
                                {/*                                            </div>*/}
                                {/*                                        </div>*/}
                                {/*                                    </div>*/}
                                {/*                                </div>*/}
                                {/*                            </div>*/}
                                {/*                        </div>*/}
                                {/*                       /!* <!-- Single Job End -->*!/*/}
                                {/*                    </td>*/}

                                {/*                    <td className="delete-bookmark text-xl-right">*/}
                                {/*                        <NavLink to="#"> <FontAwesomeIcon icon={faTrashAlt} className="lnr lnr-trash"/></NavLink>*/}
                                {/*                    </td>*/}
                                {/*                </tr>*/}
                                {/*                </tbody>*/}
                                {/*            </table>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            <div className="col-xl-4 col-12">
                                <div className="notifications-applications mb-20 mb-sm-80 mb-xs-80">
                                    <div className="notifications-heading">
                                        <h3>Notifications</h3>
                                    </div>
                                    <div className="notifications-main-block">
                                        <div className="notification-listing ov-des" style={{padding: "15px",
                                            height: "400px",
                                            overflow: "auto"}}>

                                            {
                                                !isResponse && (
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