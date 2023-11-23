import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import $ from 'jquery';
import {parseDate, parseDateWithoutTime, STRINGS} from "../../utils/base";
// import {ProfileUpdated} from "./profileUpdated";
import {API} from "../../utils/services";
import JobViews from "./jobItems/jobViews";
import Spinner from "../spinner";
import JobListApplicantItem from "./jobItems/jobListApplicantItem";

class JobTabs extends Component {
    tabMenu = React.createRef();
    subTab = React.createRef();
    filterJobDetail = {
        id: "",
        type: "",
        page: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            tab: "job-views",
            profileTab: "profile-sidra",
            location: "?f=job-views",
            profileLocation: "?f=profile-sidra",
            jobDetail: {},
            jobViewDetails: {},
            jobListData: {},
            isResponse:false
        }
        this.getJobDetail();
    }

    componentDidMount() {
        this.onRoutChange();
        this.onProfileRoutChange();
    }

    getJobDetail = () => {
        let job_id = new URL(window.location.href).searchParams.get("id");
        if (job_id !== undefined) {
            this.filterJobDetail.id = job_id;
            this.filterJobDetail.page = 1;
            API.JOBS.getJobById(job_id).then((response) => {
                //console.log("jobDetail", response);
                let {status, data} = response;
                if (status) {
                    this.setState({
                        jobDetail: data
                    });
                }
            }).catch((err) => {
                alert(err)
            })
            API.JOBS.getJobStats(job_id).then((response) => {
               // console.log("jobStats", response);
                let {status, data} = response;
                if (status) {
                    this.setState({
                        jobViewDetails: data
                    });
                }
            }).catch((err) => {
                alert(err)
            })
        } else {
            window.location.href = STRINGS.ROUTES.AUTH.SIGN_IN
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("",window.location.search)
        // console.log("",prevState.location)
        // console.log("",this.state.location)
        //if (this.props.location !== prevProps.location) this.onRoutChange()
        if (window.location.search !== this.state.location) this.onRoutChange()
        if (window.location.search !== this.state.profileLocation) this.onProfileRoutChange()
    }

    onRoutChange() {
        const listItems = $(this.tabMenu.current).children('li');
        const listAnchor = $(this.tabMenu.current).children('li').children('.a');
        listItems.removeClass('active');
        listAnchor.removeClass('active');
        switch (new URL(window.location.href).searchParams.get("f")) {
            case "job-views":
                $(listItems[0]).addClass('active');
                $(listAnchor[0]).addClass('active');
                this.setState({tab: "job-views", location: window.location.search});
                break;
            case "job-applied":
                $(listItems[1]).addClass('active');
                $(listAnchor[1]).addClass('active');
                this.setState({
                    isResponse:false
                })
                this.filterJobDetail.type = STRINGS.TYPES.JOB_LIST_TYPE.APPLY;
                this.getApplicantsJobDetail(this.filterJobDetail);
                this.setState({tab: "job-applied", location: window.location.search});
                break;
            case "job-short-listed":
                $(listItems[2]).addClass('active');
                $(listAnchor[2]).addClass('active');
                this.setState({
                    isResponse:false
                })
                this.filterJobDetail.type = STRINGS.TYPES.JOB_LIST_TYPE.SHORT_LIST;
                this.getApplicantsJobDetail(this.filterJobDetail);
                this.setState({tab: "job-short-listed", location: window.location.search});
                break;
            case "job-schedule-interview":
                $(listItems[3]).addClass('active');
                $(listAnchor[3]).addClass('active');
                this.setState({
                    isResponse:false
                })
                this.filterJobDetail.type = STRINGS.TYPES.JOB_LIST_TYPE.SCHEDULE;
                this.getApplicantsJobDetail(this.filterJobDetail);
                this.setState({tab: "job-schedule-interview", location: window.location.search});
                break;
            case "job-interviewed":
                $(listItems[4]).addClass('active');
                $(listAnchor[4]).addClass('active');
                this.setState({
                    isResponse:false
                })
                this.filterJobDetail.type = STRINGS.TYPES.JOB_LIST_TYPE.INTERVIEW;
                this.getApplicantsJobDetail(this.filterJobDetail);
                this.setState({tab: "job-interviewed", location: window.location.search});
                break;
            case "job-selected":
                $(listItems[5]).addClass('active');
                $(listAnchor[5]).addClass('active');
                this.setState({
                    isResponse:false
                })
                this.filterJobDetail.type = STRINGS.TYPES.JOB_LIST_TYPE.SELECTED;
                this.getApplicantsJobDetail(this.filterJobDetail);
                this.setState({tab: "job-selected", location: window.location.search});
                break;
            case "job-rejected":
                $(listItems[6]).addClass('active');
                $(listAnchor[6]).addClass('active');
                this.setState({
                    isResponse:false
                })
                this.filterJobDetail.type = STRINGS.TYPES.JOB_LIST_TYPE.REJECT;
                this.getApplicantsJobDetail(this.filterJobDetail);
                this.setState({tab: "job-rejected", location: window.location.search});
                break;
            default:
                $(listItems[0]).addClass('active');
                $(listAnchor[0]).addClass('active');
        }

    }

    onProfileRoutChange() {
        const listItems = $(this.subTab.current).children('li');
        const listAnchor = $(this.subTab.current).children('li').children('.a');
        listItems.removeClass('active');
        listAnchor.removeClass('act');
        //console.log(listItems)
        //console.log(listAnchor)
        switch (new URL(window.location.href).searchParams.get("t")) {
            case "profile-sidra":
                $(listItems[0]).addClass('active');
                $(listAnchor[0]).addClass('act');
                this.setState({profileTab: "profile-sidra", profileLocation: window.location.search});
                break;
            case "profile-ayan":
                $(listItems[1]).addClass('active');
                $(listAnchor[1]).addClass('act');
                this.setState({profileTab: "profile-ayan", profileLocation: window.location.search});
                break;
            case "profile-adeel":
                $(listItems[2]).addClass('active');
                $(listAnchor[2]).addClass('act');
                this.setState({profileTab: "profile-adeel", profileLocation: window.location.search});
                break;
            case "profile-fayaz":
                $(listItems[3]).addClass('active');
                $(listAnchor[3]).addClass('act');
                this.setState({profileTab: "profile-fayaz", profileLocation: window.location.search});
                break;
            case "profile-zeeshan":
                $(listItems[4]).addClass('active');
                $(listAnchor[4]).addClass('act');
                this.setState({profileTab: "profile-zeeshan", profileLocation: window.location.search});
                break;
            default:
                $(listItems[0]).addClass('active');
                $(listAnchor[0]).addClass('act');
        }

    }

    getApplicantsJobDetail = (filter) => {
            API.JOBS.getJobDetails(filter).then((response)=>{
                //console.log("jobDetais",response)
                let {status,data} = response;
                if(status){
                    console.log(data);
                    this.setState({
                        jobListData:data,
                        isResponse:true
                    })
                }
            }).catch(()=>{
                this.setState({
                    isResponse:true
                })
            })
    }

    render() {
        let {tab, profileTab, jobDetail, jobViewDetails, jobListData,isResponse} = this.state;
        console.log(profileTab)
        return (
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
                                    {/*<ul className="nav">*/}
                                    {/*    <li>*/}
                                    {/*        <NavLink className="active" to="#">*/}
                                    {/*        Job Title Goes*/}
                                    {/*        Here</NavLink>*/}
                                    {/*    </li>*/}
                                    {/*</ul>*/}
                                    <div className="row">
                                        <label>Job Title :</label>
                                        <div className="desc"> {jobDetail.title} </div>
                                    </div>
                                    {/*<div className="row">*/}
                                    {/*    <label>Job ID :</label>*/}
                                    {/*    <div className="desc"> {jobDetail.id} </div>*/}
                                    {/*</div>*/}
                                    <div className="row">
                                        <label>Post Date :</label>
                                        <div
                                            className="desc"> {parseDateWithoutTime(parseDate(new Date(jobDetail.jobPostDate)))} </div>
                                    </div>
                                    <div className="row">
                                        <label>End Date :</label>
                                        <div
                                            className="desc"> {parseDateWithoutTime(parseDate(new Date(jobDetail.lastDatePosting)))} </div>
                                    </div>
                                    <div className="row">
                                        <label>Job Status :</label>
                                        <div className="desc"> {jobDetail.status} </div>
                                    </div>
                                </div>
                                <div className="profile-applications-main-block pt-0">
                                    <div className="row mb-30 pt-10">
                                        <div className="col-lg-12">
                                            <div className="jd-justified-tabs">
                                                <ul ref={this.tabMenu}
                                                    className="nav nav-tabs justify-content-center">
                                                    <li className="active">
                                                        <NavLink className="a" data-toggle="tab"
                                                                 to={`${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${jobDetail.id}&f=job-views`}>Summary</NavLink>
                                                    </li>
                                                    <li className=""><NavLink className="a"
                                                                              data-toggle="tab"
                                                                              to={`${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${jobDetail.id}&f=job-applied`}
                                                    >Applied</NavLink>
                                                    </li>
                                                    <li className=""><NavLink className="a"
                                                                              data-toggle="tab"
                                                                              to={`${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${jobDetail.id}&f=job-short-listed`}
                                                    >Short
                                                        Listed</NavLink></li>
                                                    <li className=""><NavLink className="a"
                                                                              data-toggle="tab"
                                                                              to={`${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${jobDetail.id}&f=job-schedule-interview`}
                                                    >Schedule
                                                        For Interview</NavLink></li>
                                                    <li className=""><NavLink className="a"
                                                                              data-toggle="tab"
                                                                              to={`${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${jobDetail.id}&f=job-interviewed`}
                                                    >Interviewed</NavLink>
                                                    </li>
                                                    <li className=""><NavLink className="a"
                                                                              data-toggle="tab"
                                                                              to={`${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${jobDetail.id}&f=job-selected`}
                                                    >Selected</NavLink>
                                                    </li>
                                                    <li className=""><NavLink className="a"
                                                                              data-toggle="tab"
                                                                              to={`${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${jobDetail.id}&f=job-rejected`}
                                                    >Rejected</NavLink>
                                                    </li>
                                                </ul>

                                                <div className="row justify-content-end">
                                                    <div className="message-form" style={{margin: "5px"}}>
                                                        <input type="text" placeholder="Search..."/>
                                                    </div>
                                                    <div className="a previous round ">&#8249;</div>
                                                    <div className="a next round active">&#8250;</div>
                                                </div>

                                                <div className="tab-content pt-15" style={{overflow: 'hidden'}}>
                                                    {tab === "job-views" &&
                                                    (
                                                        !$.isEmptyObject(jobViewDetails) ? (
                                                                <JobViews data={jobViewDetails}/>
                                                            ) :
                                                            <div className="spinner-holder">
                                                                <Spinner type={"Puff"}/>
                                                            </div>
                                                    )}
                                                    {tab === "job-applied" && (
                                                        isResponse ?
                                                            <JobListApplicantItem data={jobListData}/> :
                                                            <div className="spinner-holder">
                                                                <Spinner type={"Puff"}/>
                                                            </div>
                                                    )}
                                                    {tab === "job-rejected" && (
                                                        isResponse ?
                                                            <JobListApplicantItem data={jobListData}/> :
                                                            <div className="spinner-holder">
                                                                <Spinner type={"Puff"}/>
                                                            </div>
                                                    )}
                                                    {tab === "job-short-listed" && (
                                                        isResponse ?
                                                            <JobListApplicantItem data={jobListData}/> :
                                                            <div className="spinner-holder">
                                                                <Spinner type={"Puff"}/>
                                                            </div>)}
                                                    {tab === "job-schedule-interview" && (
                                                        isResponse ?
                                                            <JobListApplicantItem data={jobListData}/> :
                                                            <div className="spinner-holder">
                                                                <Spinner type={"Puff"}/>
                                                            </div>)}
                                                    {tab === "job-interviewed" && (
                                                        isResponse ?
                                                            <JobListApplicantItem data={jobListData}/> :
                                                            <div className="spinner-holder">
                                                                <Spinner type={"Puff"}/>
                                                            </div>)}
                                                    {tab === "job-selected" && (isResponse ?
                                                        <JobListApplicantItem data={jobListData}/> :
                                                        <div className="spinner-holder">
                                                            <Spinner type={"Puff"}/>
                                                        </div>)}
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