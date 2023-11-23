import React, { Component } from "react";
import { getUserData, handleHideShow, STRINGS } from "../../utils/base";
import { Header } from "../header";
import { Footer } from "../footer";
import { NavBar } from "./navBar";
import { Route, Switch } from "react-router-dom";
import { Home } from "./home";
//import {Profile} from "./profile";
import { Messenger } from "./messenger";
import { JobAlerts } from "./jobAlerts";
import { Reviews } from "./reviews";
import { ScheduleInterviews } from "./scheduleInterview";
import { ChangePassword } from "./changePassword";
import { ProfileUpdated } from "./profileUpdated";
import JobPost from "./jobPost";
import JobTabs from "./jobTabsUpdated";
import $ from "jquery";
import JobList from "./jobList";
//import Packages from "../visitorIndex/packages";
import Settings from "./settings";
import JobSearch from "./jobSearch";
import AddPackages from "./addPackages";
import CompanyList from "./companyList";
import ApplicantList from "./applicantsList";
import Packages from "../visitorIndex/packages";
import HomeCompany from "./homeCompany";
import { HomeAdmin } from "./homeAdmin";
import Payment from "./payment";
import ApprovalsList from "./approvalsList";
import CompanyAdmin from "./companyAdmin";
import { MobileHeader } from "../mobile/header";
import { StartPopUpMenuDashboard } from "./StartPopUpMenuDashboard";
import ReviewsList from "./modals/ReviewsList";
import SubscribersList from "./subscribersList";
import axios from "axios";
import "../../App.css";

import Card from "../../components/dashboard/Card";


export class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lightHeader: `black-logo-version header-sticky sticky-black d-none d-lg-block`,
            responsePending: true,
            showMenu: false,
            rights: [],
            content: {}
        }
        handleHideShow(localStorage.getItem("navBarUI"))
    }

    componentDidMount() {
        $(document).ready(function () {
            $('select').niceSelect();
        });

        const fetchData = () => {
            axios
                .get(
                    "https://www.khawateenrozgar.com/webapi/api/job/63db70f8443f799ebc7df047"
                )
                .then((res) => {
                    this.setState(res);
                    console.log("datas", res.data.data);
                });
        };
        fetchData();

        $(document).ready(() => {
            if (window.innerWidth <= 1000) {
                $(".job-map-wrapper").css({ overflow: "auto" })
                $("#dashboard-sidebar").css({ display: "none" })
            } else {
                $(".job-map-wrapper").css({ overflow: "visible" })
                $("#dashboard-sidebar").css({ display: "block" })
            }
        })

        window.onresize = () => {
            if (window.innerWidth <= 1000) {
                $("#dashboard-sidebar").css({ display: "none" })
                $(".job-map-wrapper").css({ overflow: "auto" })
            } else {
                $("#dashboard-sidebar").css({ display: "block" })
                $(".job-map-wrapper").css({ overflow: "visible" })

            }
        }

        this.setUpRights();
    }

    setUpRights = () => {
        const user = getUserData();//JSON.parse(localStorage.getItem(STRINGS.STORAGE.user));
        if (user !== null && user.rights.length > 0) {
            this.setState({
                rights: user.rights,
                responsePending: false
            })
        }
    };

    handleOpenShowMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    render() {
        let { lightHeader, rights, responsePending, showMenu } = this.state;
        return (
            <div className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
                <Header headerClass={lightHeader} logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN} />
                <MobileHeader openShowMenu={this.handleOpenShowMenu} />
                {
                    !responsePending && (
                        <StartPopUpMenuDashboard rights={rights} closeShowMenu={this.handleOpenShowMenu} />
                    )
                }


                <div className="dashboard-content-section section bg_color--5">
                    <div className="container-fluid p-0">
                        {
                            !responsePending ?
                                <div className="row no-gutters">
                                    <div id="sideNavContainer" className="col-xl-2 col-lg-3">{/*col-xl-2 col-lg-3*/}
                                        <NavBar rights={rights} />
                                    </div>

                                    <Switch>
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.HOME}`} render={
                                            () =>
                                                getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                    <HomeCompany /> :
                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE ?
                                                        <HomeAdmin /> :
                                                        <Home />

                                        } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.PROFILE}`} render={
                                            () =>
                                                // <Profile/>
                                                <ProfileUpdated />
                                        } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.MESSENGER}`} render={
                                            () =>
                                                <Messenger />
                                        } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.JOBS_ALERTS}`} render={
                                            () =>
                                                <JobAlerts />
                                        } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.JOB_POST}`} render={
                                            () =>
                                                <JobPost />
                                        } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.APPROVALS_LIST}`} render={
                                            () =>
                                                <ApprovalsList />
                                        } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.JOB_LIST}`} render={
                                            () =>
                                                <JobList />
                                        } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.REVIEWS_LIST}`} render={
                                            () =>
                                                <ReviewsList />
                                        } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.COMPANY_ADMIN_PAYMENT}/:id?`}
                                            render={
                                                () =>
                                                    <CompanyAdmin />
                                            } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}`} render={
                                            () =>
                                                <JobTabs />
                                        } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.REVIEWS}`} render={
                                            () =>
                                                <Reviews />
                                        } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.SCHEDULES_INTERVIEWS}`}
                                            render={
                                                () =>
                                                    <ScheduleInterviews />
                                            } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.COMPANY_LIST}`}
                                            render={
                                                () =>
                                                    <CompanyList />
                                            } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.SUBSCRIBERS_LIST}`}
                                            render={
                                                () =>
                                                    <SubscribersList />
                                            } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.APPLICANT_LIST}`}
                                            render={
                                                () =>
                                                    <ApplicantList />
                                            } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.SETTINGS}`}
                                            render={
                                                () =>
                                                    <Settings />
                                            } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.PACKAGES}`}
                                            render={
                                                () => <AddPackages />
                                                // <Packages hideHF/>
                                            } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.COMPANY_PACKAGES}`}
                                            render={
                                                () => <Packages hideHF />
                                            } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.COMPANY_PAYMENT}`}
                                            render={
                                                () => <Payment />
                                            } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.JOB_SEARCH}`}
                                            render={
                                                () =>
                                                    <JobSearch db />
                                            } />
                                        <Route exact path={`${STRINGS.ROUTES.DASHBOARD.CHANGE_PASSWORD}`} render={
                                            () =>
                                                <ChangePassword />
                                        } />
                                    </Switch>
                                </div>
                                : 'Loading....'
                        }
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}