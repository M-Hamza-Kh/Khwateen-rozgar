import React, { useEffect, useState } from 'react';
import "./index.css"
import { parseDate, parseDateAndTime, parseDateWithoutTime, STRINGS } from "../../utils/base";
import { Divider } from "@material-ui/core";
import { API } from "../../utils/services";
import Spinner from "../spinner";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";
import { CToast, CToastBody, CButton, CToastClose } from '@coreui/react'

const defaultState = {
    allData: {},
    isResponse: false,
    isNotificationResponse: false,
    myNotifications: [],
    myJobsStatus: [],
}

const filter_ = {
    page: 1
}

const HomeCompany = () => {
    const [state, setState] = useState(defaultState);

    useEffect(() => {

        const initialize = async () => {
            const getStatus = await API.COMPANY.getMyCompanyStatus().then((response) => {
                // console.log("getMyCompanyStatus", response)
                if (response.status) {
                    return response.data
                    // setState({
                    //     ...state,
                    //     allData: response.data,
                    //     isResponse: true,
                    // })
                    //console.log("getMyCompanyStatus", response)
                }
            });
            const getNotification = await API.JOBS.getMyNotification(filter_.page).then((response) => {
                // console.log(response);
                let { status, error } = response;
                if (status) {
                    // console.log("myJob", data);
                    return response.data
                    // setState({
                    //     ...state,
                    //     myNotifications: response.data,
                    //     isNotificationResponse: true,
                    // })
                } else {
                    alert(error)
                }
            })

            setState({
                ...state,
                allData: getStatus,
                myNotifications: getNotification,
                isResponse: true,
                isNotificationResponse: getNotification.length > 0,
            })
        }

        initialize();

        // const getCompanyStatus = () => {
        //     API.COMPANY.getMyCompanyStatus().then((response) => {
        //         console.log("getMyCompanyStatus", response)
        //         if (response.status) {
        //             setState({
        //                 ...state,
        //                 allData: response.data,
        //                 isResponse: true,
        //             })
        //             //console.log("getMyCompanyStatus", response)
        //         }
        //     });
        //
        // }
        // getCompanyStatus();
        // const getMyNotification = (page) => {
        //     API.JOBS.getMyNotification(page).then((response) => {
        //         console.log(response);
        //         let {status, error, data} = response;
        //         if (status) {
        //             console.log("myJob", data);
        //             setState({
        //                 ...state,
        //                 myNotifications: response.data,
        //                 isNotificationResponse: true,
        //             })
        //         } else {
        //             alert(error)
        //         }
        //     })
        // }
        // getMyNotification(filter_.page);
    }, []);



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
            </div>
            <div className="dashboard-overview">
                <div className="container">
                    {
                        state.isResponse ?
                            !$.isEmptyObject(state.allData) ?
                                <div className="row col-xl-8 col-12" style={{ flexWrap: "inherit" }}>
                                    <div className="col-md-4">
                                        <div className="dbox dbox--color-2">
                                            <div className="dbox__icon">
                                                {/*<FontAwesomeIcon icon={faCloud} style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                {/*                 className="glyphicon glyphicon-cloud"/>*/}
                                            </div>
                                            <div className="dbox__body">
                                                <span className="dbox__count">{state.allData.totalJobPosted}</span>
                                                <span className="dbox__title">Job Posted</span>
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
                                                    className="dbox__count">{state.allData.totalApplicantApplied}</span>
                                                <span className="dbox__title">Candidate Applied</span>
                                            </div>

                                            {/*<div className="dbox__action">*/}
                                            {/*    <button className="dbox__action__btn">More Info</button>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="dbox dbox--color-2">
                                            <div className="dbox__icon">
                                                {/*<i className="glyphicon glyphicon-heart"></i>*/}
                                                {/*<FontAwesomeIcon icon={faCloud} style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                {/*                 className="glyphicon glyphicon-cloud"/>*/}
                                            </div>
                                            <div className="dbox__body">
                                                <span
                                                    className="dbox__count">{state.allData.totalApplicantSelected}</span>
                                                <span className="dbox__title">Candidate Selected</span>
                                            </div>

                                            {/*<div className="dbox__action">*/}
                                            {/*    <button className="dbox__action__btn">More Info</button>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="notifications-applications"
                                            style={{ padding: "16px", height: "initial" }}>
                                            <div className="notifications-main-block">
                                                <div className="notification-listing">
                                                    <div className="d-flex width-100 flex-column">
                                                        <div className="flex mb-1 text-nowrap">
                                                            Package : {state.allData.package}
                                                        </div>
                                                        <Divider variant="horizontal" style={{
                                                            backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                            width: "100%",
                                                            height: "2px"
                                                        }} />
                                                        {/*<div className="flex mb-1">*/}
                                                        {/*    No of jobs : 0/1*/}
                                                        {/*</div>*/}
                                                        {/*<Divider variant="horizontal" style={{*/}
                                                        {/*    backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,*/}
                                                        {/*    width: "100%",*/}
                                                        {/*    height: "2px"*/}
                                                        {/*}}/>*/}

                                                        <div className="flex mb-1 text-nowrap">
                                                            Start Date
                                                            : {parseDateAndTime(parseDate(new Date(state.allData.packageStart)))}
                                                        </div>
                                                        <Divider variant="horizontal" style={{
                                                            backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                            width: "100%",
                                                            height: "2px"
                                                        }} />

                                                        <div className="flex mb-1 text-nowrap">
                                                            End Date
                                                            : {parseDateAndTime(parseDate(new Date(state.allData.packageEnd)))}
                                                        </div>
                                                        <Divider variant="horizontal" style={{
                                                            backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                            width: "100%",
                                                            height: "2px"
                                                        }} />

                                                        <div className="d-flex mb-1 text-nowrap">
                                                            Status :
                                                            <div className="d-flex ml-4 mr-4">
                                                                <div
                                                                    className="d-flex width-35">{state.allData.packageStatus}</div>
                                                            </div>
                                                        </div>
                                                        <Divider variant="horizontal" style={{
                                                            backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                            width: "100%",
                                                            height: "2px"
                                                        }} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                "No Data Found..."
                            : <div className="spinner-holder"
                                style={{ height: "100vh", position: "absolute" }}>
                                <Spinner height={100} width={100} type={"Puff"} />
                            </div>
                    }
                </div>
                {/*<div className="row">*/}
                {/*    <div className="col-xl-8 col-12">*/}

                {/*    </div>*/}

                {/*</div>*/}
                <div className="row mt-4 mr-4 ml-4">
                    <div className="col-xl-7 col-12">
                        {/*<table className="table">*/}
                        {/*    <thead className="gradiant-css">*/}
                        {/*    <tr>*/}
                        {/*        <th className="text-white width-35 text-nowrap">Name</th>*/}
                        {/*        <th className="text-white width-15 text-nowrap">Company</th>*/}
                        {/*        <th className="text-white width-12 text-nowrap">Status</th>*/}
                        {/*        <th className="text-white width-15 text-nowrap">Applied Date</th>*/}
                        {/*        <th className="text-white width-30 text-nowrap">Viewed On</th>*/}
                        {/*        <th className="text-white width-23 text-nowrap text-right">Action</th>*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody style={{position: "relative"}}>*/}
                        {/*    {*/}
                        {/*       state.myJobsStatus.length > 0 ?*/}
                        {/*           state.myJobsStatus.map((js) =>*/}
                        {/*                <tr className="application-item">*/}
                        {/*                    <td className="application-job">*/}
                        {/*                        <h3><NavLink*/}
                        {/*                            to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${js.jobTitle}&city=${js.city}&type=&page=1`}*/}
                        {/*                        >{js.jobTitle}</NavLink>*/}
                        {/*                        </h3>*/}
                        {/*                    </td>*/}

                        {/*                    <td className="application-employer">*/}
                        {/*                        <NavLink className="dotted"*/}
                        {/*                                 to="#">{js.employer}</NavLink>*/}
                        {/*                    </td>*/}

                        {/*                    <td className="status">*/}
                        {/*                        <span className="pending">{js.state}</span>*/}
                        {/*                    </td>*/}

                        {/*                    <td className="application-created">*/}
                        {/*                        <span> {parseDateWithoutTime(parseDate(new Date(js.appliedOn)))} </span>*/}
                        {/*                    </td>*/}

                        {/*                    <td className="application-created">*/}
                        {/*                        <span> {js.viewedByEmpOn !== null && parseDateWithoutTime(parseDate(new Date(js.viewedByEmpOn)))} </span>*/}
                        {/*                    </td>*/}

                        {/*                    <td className="view-application text-xl-right">*/}
                        {/*                        <NavLink*/}
                        {/*                            to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${js.jobTitle}&city=${js.city}&type=&page=1`}*/}
                        {/*                            className="view-application">View</NavLink>*/}
                        {/*                    </td>*/}
                        {/*                </tr>*/}
                        {/*            ) : "No Data Found"*/}
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
                    <div className="col-xl-5 col-12">
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
                                        state.isNotificationResponse && (
                                            state.myNotifications.length > 0 ?

                                                state.myNotifications.map((notIf, index) =>
                                                    <CToast key={index} autohide={false} visible={true} style={{ maxWidth: `545px` }}>
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

                                                ) :

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
    );
};

export default HomeCompany;