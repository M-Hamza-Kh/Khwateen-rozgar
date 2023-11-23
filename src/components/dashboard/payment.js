import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {API} from "../../utils/services";
import Spinner from "../spinner";
import {DOWNLOAD_URL, parseDate, parseDateWithoutTime, STRINGS} from "../../utils/base";

class Payment extends Component {
    page = 1;

    constructor(props) {
        super(props);
        this.state = {
            paymentList: [
                {
                    date: "1-1-2020",
                    sdate: "1-1-2020",
                    edate: "",
                    ref: "1213133",
                    amount: "2000",
                    status: "Error",
                    package: "Package 1"
                },
                {
                    date: "1-1-2020",
                    sdate: "1-1-2020",
                    edate: "",
                    ref: "2323233",
                    amount: "2000",
                    status: "Complete",
                    package: "Package 1"
                },
            ],
            isResponse: true,
            pageNo: 1,
        }
    }

    componentDidMount() {
        //this.getAllJobList();
        this.getAllCompanyPayments(this.page)
    }


    getAllCompanyPayments = (page) => {
        this.setState({
            isResponse: false
        })
        API.PAYMENTS.getAllPayments(page).then((response) => {
            console.log("getAllPayments", response)
            if (response.status) {
                this.setState({
                    paymentList: response.data,
                    isResponse: true
                })
            } else {
                this.setState({
                    isResponse: true
                })
            }
        })
    }

    handlePaging = (page) => {
        if(page > 0){
            this.setState({
                pageNo:this.page
            })
            this.getAllCompanyPayments(this.page)
        }
    }

    render() {
        let {paymentList, isResponse,pageNo} = this.state;
        return (
            <div className="col-xl-10 col-lg-9">
            <div className="dashboard-main-inner">
                <div className="row">
                    <div className="col-12">
                        <div className="page-breadcrumb-content">
                            <h1>Payments</h1>
                        </div>
                    </div>
                </div>
                <div className="dashboard-overview">
                    <div className="row">
                        <div className="col-xl-12 col-12">
                            <div className="submited-applications mb-50">
                                <div className="applications-heading">
                                    <h3>Payments Summary</h3>
                                </div>
                                <div className="applications-main-block">
                                    <div className="applications-table ov-des" style={{
                                        position: `${isResponse ? "relative" : "initial"}`,
                                        height: `${isResponse ? "initial" : "initial"}`
                                    }}>
                                        <table className="table" style={{
                                            width: 'inherit',
                                            height: `${isResponse ? "initial" : "100vh"}`
                                        }}>
                                            <thead>
                                            <tr>
                                                {/*<th>S.No</th>*/}
                                                <th>Date</th>
                                                <th>Package</th>
                                                <th>Amount</th>
                                                <th className="width-12">Reference No</th>
                                                {/*<th>Start Date</th>*/}
                                                {/*<th>End Date</th>*/}
                                                <th>Status</th>
                                                <th>Download Payment</th>
                                                {/*<th className="text-center">Action</th>*/}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                isResponse ?
                                                    paymentList.length > 0 ?
                                                        paymentList.map((pl, index) =>
                                                            <tr className="application-item" key={index}>
                                                                <td className="">
                                                                    <span> {parseDateWithoutTime(parseDate(new Date(pl.createdOn)))} </span>
                                                                </td>
                                                                <td className="application-created">
                                                                    <span> {pl.package} </span>
                                                                </td>

                                                                <td className="view-application ">
                                                                    <NavLink to="#"
                                                                             className="view-application text-decoration-none">{pl.amount}</NavLink>
                                                                </td>
                                                                <td className="">
                                                                    <span className="">{pl.transactionID}</span>
                                                                </td>
                                                                {/*<td className="">*/}
                                                                {/*    <span*/}
                                                                {/*        className="">{parseDateWithoutTime(parseDate(new Date(pl.paymentStart)))}</span>*/}
                                                                {/*</td>*/}
                                                                {/*<td className="">*/}
                                                                {/*    <span*/}
                                                                {/*        className="">{parseDateWithoutTime(parseDate(new Date(pl.paymentEnd)))}</span>*/}
                                                                {/*</td>*/}
                                                                <td className="status">
                                                                    <span className={`${pl.status === "Fail" ? "fail" : pl.status === "Successful" ? "success": "pending"}`}>{pl.status}</span>
                                                                </td>
                                                                <td>
                                                                    {
                                                                        pl.status === "Successful" && (
                                                                            <a download
                                                                               href={`${DOWNLOAD_URL}/${pl.id}`}
                                                                               style={{
                                                                                   backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                   color: "white",
                                                                                   padding: "0.5rem",
                                                                                   borderRadius: "3px"
                                                                               }}
                                                                            >
                                                                                Download
                                                                            </a>
                                                                        )
                                                                    }
                                                                </td>
                                                                {/*<td className="view-application-pop text-right">*/}
                                                                {/*    <NavLink*/}
                                                                {/*        to={`${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${pl.id}`}><FontAwesomeIcon*/}
                                                                {/*        icon={faEye} className="lnr lnr-eye"/><span>View Details</span></NavLink>*/}
                                                                {/*</td>*/}
                                                            </tr>
                                                        ) : <tr>
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
                                                        onClick={() => this.handlePaging(this.page--)}
                                                    ><NavLink to="#"
                                                    ><FontAwesomeIcon
                                                        icon={faAngleLeft}
                                                        className="fa fa-angle-left"/></NavLink></li>
                                                    <li className={`${this.page === pageNo && "active"}`}
                                                        // onClick={() => this.handlePaging(pageNo)}
                                                    ><NavLink to="#">{pageNo}</NavLink>
                                                    </li>
                                                    {/*<li className={`${this.page === pageNo+1 && "active"}`}*/}
                                                    {/*    // onClick={() => this.handlePaging(pageNo+1)}*/}
                                                    {/*><NavLink to="#">{pageNo + 1}</NavLink></li>*/}
                                                    <li
                                                        onClick={() => this.handlePaging(this.page++)}
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

                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default Payment;