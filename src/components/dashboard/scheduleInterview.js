import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import InterviewModal from "./modals/InterviewModal";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {API} from "../../utils/services";
import Spinner from "../spinner";
import {parseDate, parseDateAndTime} from "../../utils/base";

export class ScheduleInterviews extends Component {
    page = 1;

    constructor(props) {
        super(props);
        this.state = {
            openInterviewModal: false,
            isResponse: false,
            scheduleInterview: [],
            scheduleInterviewData: {}
        }
    }

    componentDidMount() {
        this.getAllScheduleInterview(this.page)
    }

    getAllScheduleInterview = (page) => {
        API.SCHEDULE_INTERVIEW.getAll(page).then((response) => {
            //console.log("mySchedule", response);
            const {status, data} = response;
            if (status) {
                this.setState({
                    isResponse: true,
                    scheduleInterview: data
                })
            }
        })
    }

    render() {
        let {openInterviewModal, scheduleInterview, isResponse, scheduleInterviewData} = this.state;
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h4>Applications</h4>
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
                                                    {/*<button className="search-btn"><FontAwesomeIcon icon={faMagento}*/}
                                                    {/*                                                className="lnr lnr-magnifier"/>*/}
                                                    {/*</button>*/}
                                                    {/*<input type="text" placeholder="Search in messages"/>*/}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="job-applications-main-block">
                                        <div className="job-applications-table">
                                            <table className="table">
                                                <thead className="gradiant-css">
                                                <tr>
                                                    <th className="text-white width-35 text-nowrap">Applicant Name</th>
                                                    <th className="text-white width-35 text-nowrap">Title</th>
                                                    <th className="text-white width-35 text-nowrap">Employer</th>
                                                    <th className="text-white text-nowrap">Date Time</th>
                                                    <th className="text-white width-23 text-right text-nowrap">Type</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    isResponse ?
                                                        scheduleInterview.length > 0 ?
                                                            scheduleInterview.map((si) =>
                                                                <tr className="job-application-item">
                                                                    <td className="application-job">
                                                                        <h3><NavLink to="#">{si.applicantName}</NavLink></h3>
                                                                    </td>
                                                                    <td className="application-job">
                                                                        <h3><NavLink to="#">{si.jobTitle}</NavLink></h3>
                                                                    </td>
                                                                    <td className="application-job">
                                                                        <h3><NavLink to="#">{si.employer}</NavLink></h3>
                                                                    </td>
                                                                    <td className="application-created">
                                                                        <span> {parseDateAndTime(parseDate(new Date(si.scheduleForInterviewOn)))}</span>
                                                                    </td>
                                                                    <td className="view-application-pop text-right">
                                                                        {
                                                                            si.interviewType === "" || si.interviewType === "Video Conference" ?
                                                                                <NavLink to="#"
                                                                                         onClick={() => this.setState({
                                                                                             scheduleInterviewData: si,
                                                                                             openInterviewModal: true
                                                                                         })}>
                                                                                    <FontAwesomeIcon icon={faEye}
                                                                                                     className="lnr lnr-eye"/>
                                                                                    <span>Video Conference</span>
                                                                                </NavLink> : si.interviewType
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            ) :
                                                            <tr>
                                                                <td>No Data</td>
                                                                <td>No Data</td>
                                                                <td>No Data</td>
                                                                <td>No Data</td>
                                                            </tr>
                                                        : <div className="spinner-holder"
                                                               style={{height: "100vh", position: "absolute"}}>
                                                            <Spinner height={100} width={100} type={"Puff"}/>
                                                        </div>
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="application-pagination mb-30">
                                            <div className="row">
                                                <div className="col-12">
                                                    <ul className="page-pagination justify-content-center">
                                                        <li><NavLink to="#"><i
                                                            className="fa fa-angle-left"/></NavLink></li>
                                                        <li className="active"><NavLink to="#">1</NavLink></li>
                                                        <li><NavLink to="#">2</NavLink></li>
                                                        <li><NavLink to="#"><i
                                                            className="fa fa-angle-right"/></NavLink></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        openInterviewModal &&
                                        (<InterviewModal
                                            data={scheduleInterviewData}
                                            openModal={openInterviewModal}
                                            onClose={() => this.setState({
                                                openInterviewModal: false
                                            })}
                                        />)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}