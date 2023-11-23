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
import ExportToXl from "./ExportToXl";
import AddPaymentModal from "./modals/addPaymentModal";
import {Button} from "@material-ui/core";
import ReceiptIcon from "@material-ui/icons/Receipt";

class CompanyList extends Component {
    filter = {
        page: 1,
        City: "",
        Name: "",
        Email: "",
    }

    constructor(props) {
        super(props);
        this.state = {
            companyList: [],
            allCompanyList: [],
            callForData: false,
            allListResponse: false,
            openAddPayment: false,
            getJobSkills: [],
            getJobQualification: [],
            isResponse: false,
            openComposer: false,
            companyCounter: 0,
            companyDetails: {},
            pageNo: this.filter.page
        }

    }

    componentDidMount() {
        this.getAllCompanyList(this.filter);
    }

    defaultComboBox = () => {
        API.SETTINGS.getJobSkills().then((response) => {
            //console.log("types", response)
            let {status, error, data} = response;
            if (status) {
                this.setState({
                    getJobSkills: data
                })
            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        })

        API.SETTINGS.getJobQualification().then((response) => {
            //console.log("types", response)
            let {status, error, data} = response;
            if (status) {
                this.setState({
                    getJobQualification: data
                })
            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        })
    }

    getOverAllExport = (filter) => {
        this.setState({
            allListResponse: true
        })
        API.ADMIN.getAllCompany(filter).then((response) => {
            let {status, data, error} = response;
            //console.log("companyList", response)
            if (status) {
                this.setState({
                    allCompanyList: data.records,
                    allListResponse: false,
                    callForData: true,
                })
            } else {
                alert(error);
                this.setState({
                    allListResponse: false
                })
            }
        })
    }

    getAllCompanyList = (filter) => {
        // console.log("allFilter",filter)
        this.setState({
            isResponse: true
        })
        API.ADMIN.getAllCompany(filter).then((response) => {
            let {status, data, error} = response;
            //console.log("companyList", response)
            if (status) {
                this.setState({
                    companyList: data.records,
                    companyCounter: data.recordCount,
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
            this.getAllCompanyList(this.filter)
        }
    }

    handleFilter = (filter) => {
        filter.page = this.filter.page
        this.filter = filter
        this.getAllCompanyList(this.filter)
    }

    handleExportData = () => {
        this.filter.page = -1
        this.getOverAllExport(this.filter)
    }

    render() {
        let {companyList, isResponse, openComposer, companyDetails, pageNo, companyCounter, allCompanyList, callForData, allListResponse, openAddPayment} = this.state;
        //console.log("companyList", companyList)
        // getJobQualification, getJobSkills
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h1>Company List</h1>
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
                                                <h3>Results ( {companyCounter} )
                                                    {
                                                        !allListResponse ?
                                                            (<div className="d-flex w-100">
                                                                <ExportToXl
                                                                    data={allCompanyList}
                                                                    callForData={callForData}
                                                                    getResponse={this.handleExportData}
                                                                    onClose={() => {
                                                                        this.setState({
                                                                            allCompanyList: [],
                                                                            callForData: false,
                                                                            allListResponse: false,
                                                                        })
                                                                    }}
                                                                />
                                                            </div>) : (
                                                                <div className="d-flex flex-column">
                                                                    <div className="spinner-holder">
                                                                        <Spinner width={35} height={35} type={"Puff"}/>
                                                                    </div>
                                                                    <p>Preparing for download data....</p>
                                                                </div>
                                                            )

                                                    }
                                                </h3>
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
                                                        style={{whiteSpace: "nowrap"}}>Company Title
                                                    </th>
                                                    <th className="text-center">Create Date</th>
                                                    <th className="text-center">City</th>
                                                    <th className="text-center">Status</th>
                                                    <th className="text-center">Action</th>
                                                    {
                                                        getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                            <th className="text-center">Add Payment</th>
                                                        )
                                                    }

                                                </tr>
                                                </thead>
                                                <tbody style={{height: "100vh"}}>
                                                {
                                                    isResponse ?
                                                        companyList.length > 0 ?
                                                            companyList.map((jl, index) =>
                                                                <tr className="application-item" key={index}>
                                                                    {/*<td className="application-job">*/}
                                                                    {/*    1*/}
                                                                    {/*</td>*/}

                                                                    <td className="view-application ">
                                                                        <NavLink to="#"
                                                                                 className="view-application text-decoration-none">{jl.company}</NavLink>
                                                                    </td>
                                                                    <td className="application-created text-center">
                                                                        <span> {parseDateWithoutTime(parseDate(new Date(jl.createdOn)))} </span>
                                                                    </td>
                                                                    <td className="application-created text-center">
                                                                        <span> {jl.city} </span>
                                                                    </td>
                                                                    <td className="status">
                                                                    <span
                                                                        className="pending">{jl.isActive ? "Active" : "In Active"}</span>
                                                                    </td>
                                                                    <td className="view-application-pop text-center">
                                                                        <NavLink to="#" className="text-decoration-none"
                                                                                 onClick={() => this.setState({
                                                                                     openComposer: true,
                                                                                     companyDetails: jl
                                                                                 })}
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={faEye}
                                                                                className="lnr lnr-eye"
                                                                            /><span>View Details</span></NavLink>
                                                                    </td>
                                                                    {
                                                                        getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                                            <td>
                                                                                <Button
                                                                                    style={{
                                                                                        backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                        color: "white"
                                                                                    }}
                                                                                    onClick={() => {
                                                                                        this.setState({
                                                                                            openAddPayment: true,
                                                                                            companyDetails: jl
                                                                                        })
                                                                                    }}
                                                                                >
                                                                                    <ReceiptIcon
                                                                                        style={{
                                                                                            color: "white",
                                                                                            marginRight: "4px"
                                                                                        }}/>
                                                                                    Add Payment
                                                                                </Button>
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
                                            {
                                                openAddPayment && (
                                                    <AddPaymentModal openAddPayment={openAddPayment}
                                                                     data={companyDetails} onClose={() => {
                                                        this.setState({
                                                            openAddPayment: false,
                                                            companyDetails: {}
                                                        })
                                                    }}/>
                                                )
                                            }
                                            {
                                                openComposer && (
                                                    <ProfileViewPopUp data={companyDetails}
                                                                      onClose={() => this.setState({openComposer: false})}/>
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
                                        <Filters isCompany onFilter={this.handleFilter}/>
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

export default CompanyList;