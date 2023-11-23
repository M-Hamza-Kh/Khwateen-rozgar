import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {getUserData, parseDate, parseDateWithoutTime, STRINGS} from "../../utils/base";
import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import {API} from "../../utils/services";
import Spinner from "../spinner";
import ProfileViewPopUp from "./modals/profileViewModal";
import Filters from "./Filters";
import RightsModal from "./modals/rightsModal";
import ExportToXl from "./ExportToXl";

class ApplicantList extends Component {
    filter = {
        page: 1,
        City: "",
        Phone: "",
        Name: "",
        Email: "",
        Skill: "",
        Education: ""
    }

    constructor(props) {
        super(props);
        this.state = {
            applicantList: [],
            allApplicantList: [],
            allApplicantListResponse: false,
            callForData: false,
            isResponse: false,
            applicantDetails: {},
            openComposer: false,
            openRightsComposer: false,
            applicantCounter: 0,
            pageNo: this.filter.page
        }
    }

    componentDidMount() {
        this.getAllApplicantList(this.filter);
    }

    getOverAllApplicantList = (page) => {
        this.setState({
            allApplicantListResponse: true
        })

        API.ADMIN.getAllApplicant(page).then((response) => {
            let {status, data, error} = response;
            //console.log("companyList",response)
            if (status) {
                this.setState({
                    allApplicantList: data.records,
                    allApplicantListResponse: false,
                    callForData: true,
                })
            } else {
                alert(error);
                this.setState({
                    allApplicantListResponse: false
                })
            }
        })
    }

    getAllApplicantList = (page) => {
        this.setState({
            isResponse: true
        })
        API.ADMIN.getAllApplicant(page).then((response) => {
            let {status, data, error} = response;
            //console.log("companyList",response)
            if (status) {
                this.setState({
                    applicantList: data.records,
                    applicantCounter: data.recordCount,
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
                pageNo: this.filter.page
            })
            this.getAllApplicantList(this.filter)
        }
    }

    handleFilter = (filter) => {
        filter.page = this.filter.page
        this.filter = filter
        this.getAllApplicantList(this.filter)
    }

    handleExportData = () => {
        this.filter.page = -1;
        this.getOverAllApplicantList(this.filter);
    }

    render() {
        let {applicantList, isResponse, applicantDetails, openComposer, pageNo, applicantCounter, openRightsComposer,allApplicantList,allApplicantListResponse,callForData} = this.state;
        //console.log("companyList",applicantList)
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h1>Applicant List</h1>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-overview">
                        <div className="row">
                            <div className="col-xl-9 col-12">
                                <div className="submited-applications mb-50">
                                    <div className="applications-heading">
                                        {
                                            isResponse && (
                                                <h3>Results ( {applicantCounter} ) {
                                                    isResponse &&
                                                    applicantList.length > 0 &&
                                                    (<div className="d-flex w-100">
                                                        {
                                                            !allApplicantListResponse ? (
                                                                <ExportToXl
                                                                    data={allApplicantList}
                                                                    callForData={callForData}
                                                                    getResponse={this.handleExportData}
                                                                    onClose={()=>{
                                                                        this.setState({
                                                                            allApplicantList: [],
                                                                            allApplicantListResponse: false,
                                                                            callForData: false,
                                                                        })
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div className="d-flex flex-column">
                                                                    <div className="spinner-holder">
                                                                        <Spinner width={35} height={35} type={"Puff"}/>
                                                                    </div>
                                                                    <p>Preparing for download data....</p>
                                                                </div>
                                                            )
                                                        }

                                                    </div>)

                                                } </h3>
                                            )
                                        }
                                    </div>
                                    <div className="applications-main-block">
                                        <div className="applications-table ov-des" style={{
                                            position: `${isResponse ? "relative" : "initial"}`,
                                            height: `${isResponse ? "100%" : "initial"}`
                                        }}>
                                            <table className="table" style={{
                                                width: 'inherit',
                                                height: `${isResponse ? "initial" : "100vh"}`
                                            }}>
                                                <thead>
                                                <tr>
                                                    {/*<th>S.No</th>*/}
                                                    <th className="width-12 text-center"
                                                        style={{whiteSpace: "nowrap"}}>Applicant Name
                                                    </th>
                                                    <th className="text-center">Date of birth</th>
                                                    <th className="text-center">City</th>
                                                    <th className="text-center">Status</th>
                                                    <th className="text-center">type</th>
                                                    <th className="text-center">Action</th>
                                                    {
                                                        getUserData().updateRights && (
                                                            <th className="text-center">Rights</th>
                                                        )
                                                    }

                                                </tr>
                                                </thead>
                                                <tbody style={{height: "100vh"}}>
                                                {
                                                    isResponse ?
                                                        applicantList.length > 0 ?
                                                            applicantList.map((jl) =>
                                                                <tr className="application-item">
                                                                    {/*<td className="application-job">*/}
                                                                    {/*    1*/}
                                                                    {/*</td>*/}
                                                                    <td className="view-application">
                                                                        <NavLink to="#"
                                                                                 className="view-application text-decoration-none">{jl.firstName + " " + jl.lastName}</NavLink>
                                                                    </td>
                                                                    <td className="application-created text-center">
                                                                        <span> {parseDateWithoutTime(parseDate(new Date(jl.dob)))} </span>
                                                                    </td>
                                                                    <td className="application-created text-center">
                                                                        <span> {jl.city}</span>
                                                                    </td>

                                                                    <td className="status">
                                                                        <span
                                                                            className="pending">{jl.isActive ? "Active" : "In Active"}</span>
                                                                    </td>
                                                                    <td className="status">
                                                                        <span
                                                                            className="approved">{jl.type === STRINGS.USER_TYPE.ADMIN_TYPE ? "Admin" : jl.type === STRINGS.USER_TYPE.APPLICANT_TYPE ? "User" : ""}</span>
                                                                    </td>
                                                                    <td className="view-application-pop text-center">
                                                                        <NavLink to="#" className="text-decoration-none"
                                                                                 onClick={() => this.setState({
                                                                                     openComposer: true,
                                                                                     applicantDetails: jl
                                                                                 })}
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={faEye}
                                                                                className="lnr lnr-eye"
                                                                            /><span>View Details</span></NavLink>
                                                                    </td>
                                                                    {
                                                                        getUserData().updateRights && (
                                                                            <td className="view-application-pop text-center">
                                                                                <NavLink to="#"
                                                                                         className="text-decoration-none"
                                                                                         onClick={() => this.setState({
                                                                                             openRightsComposer: true,
                                                                                             applicantDetails: jl
                                                                                         })}
                                                                                >
                                                                                    <FontAwesomeIcon
                                                                                        icon={faEye}
                                                                                        className="lnr lnr-eye"
                                                                                    /><span>Rights</span></NavLink>
                                                                            </td>
                                                                        )
                                                                    }
                                                                </tr>
                                                            ) : <tr>
                                                                <td>No Data Found</td>
                                                                <td>No Data Found</td>
                                                                <td>No Data Found</td>
                                                                <td>No Data Found</td>
                                                                <td>No Data Found</td>
                                                                <td>No Data Found</td>
                                                                <td>No Data Found</td>
                                                            </tr>
                                                        :
                                                        <div className="spinner-holder" style={{position: "absolute"}}>
                                                            <Spinner width={100} height={100} type={"Puff"}/>
                                                        </div>
                                                }
                                                </tbody>
                                            </table>
                                            {
                                                openComposer && (
                                                    <ProfileViewPopUp data={applicantDetails}
                                                                      onClose={() => this.setState({openComposer: false})}/>
                                                )
                                            }
                                            {
                                                openRightsComposer && (
                                                    <RightsModal data={applicantDetails}
                                                                 onSuccess={() => this.getAllApplicantList(this.filter)}
                                                                 onClose={() => this.setState({openRightsComposer: false})}
                                                    />
                                                )
                                            }
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
                                                            className="fa fa-angle-left"/></NavLink></li>
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
                            <div className="col-xl-3 col-12">
                                <div className="notifications-applications mb-20 mb-sm-80 mb-xs-80">
                                    <div className="notifications-heading">
                                        <h3>Filters</h3>
                                    </div>
                                    <div className="notifications-main-block">
                                        <Filters onFilter={this.handleFilter}/>
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

export default ApplicantList;