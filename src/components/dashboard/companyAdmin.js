import React, { useEffect, useState } from 'react';
import { DOWNLOAD_URL, parseDate, parseDateWithoutTime, STRINGS, CONTENT_URL } from "../../utils/base";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import { faAngleRight, faLink } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@material-ui/core";
import ReceiptIcon from '@material-ui/icons/Receipt';
import AddPaymentModal from "./modals/addPaymentModal";
import { API } from "../../utils/services";
import Spinner from "../spinner";
import ReferenceDocModal from "./modals/ReferenceDocModal";

const defaultState = {
    isResponse: false,
    companyAdmin: [],
    paymentData: {},
    pageNo: 1
}
let page = 1
const CompanyAdmin = (props) => {
    const [form, setForm] = useState(defaultState);
    const [popUpData, setPopUpData] = useState("");
    const [openPopUp, setOpenPopUp] = useState(false);
    const current_url_id = window.location.pathname.split("/")[2];
    const getAllCompanyPaymentsAdmin = (page) => {
        API.PAYMENTS.getAllPayments(page).then((response) => {
            console.log("getAllPayments", response)
            if (response.status) {
                setForm({
                    ...form,
                    companyAdmin: response.data,
                    isResponse: true
                })
            }
        })
    }
    useEffect(() => {

        console.log("getCompanyPayments", current_url_id)
        if (current_url_id !== undefined) {
            API.COMPANY.getCompanyPayments(current_url_id, page).then((response) => {
                console.log("getCompanyPayments", response)
                if (response.status) {
                    setForm({
                        ...form,
                        companyAdmin: response.data,
                        isResponse: true
                    })
                }
            })
        } else {
            getAllCompanyPaymentsAdmin(page);
        }

    }, [page])


    return (
        <div className="col-xl-10 col-lg-9" style={{maxWidth:`100%`}}>
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
                                    {/*<h3>Your posted job list</h3>*/}
                                </div>
                                <div className="applications-main-block">
                                    <div className="applications-table ov-des" style={{
                                        position: `${form.isResponse ? "relative" : "initial"}`,
                                        height: `${form.isResponse ? "100vh" : "initial"}`
                                    }}>
                                        <table className="table" style={{
                                            width: '-webkit-fill-available',
                                            height: `${form.isResponse ? "initial" : "100vh"}`
                                        }}>
                                            <thead>
                                                <tr>
                                                    {/*<th>S.No</th>*/}
                                                    <th>Name</th>
                                                    <th>Package</th>
                                                    <th>Amount</th>
                                                    <th>Date</th>
                                                    <th>Expired</th>
                                                    <th>Payment Type</th>
                                                    {/*<th>Start Date</th>*/}
                                                    {/*<th>End Date</th>*/}
                                                    {/* <th>Ref No</th> */}
                                                    <th>Status</th>
                                                    <th>Ref Doc</th>
                                                    <th>Add Payment</th>
                                                    <th>Pyament Slip</th>
                                                    {/*<th className="text-center">Action</th>*/}
                                                </tr>
                                            </thead>
                                            <tbody style={{ height: "100vh" }}>
                                                {
                                                    form.isResponse ?
                                                        form.companyAdmin.length > 0 ?
                                                            form.companyAdmin.map((jl, index) =>
                                                                <tr className="application-item" key={index}>
                                                                    <td className="application-employer">
                                                                        {jl.company}
                                                                    </td>
                                                                    <td className="view-application ">
                                                                        <NavLink to="#"
                                                                            className="view-application text-decoration-none text-nowrap">{jl.package}</NavLink>
                                                                    </td>
                                                                    <td className="application-employer">
                                                                        {jl.amount}
                                                                    </td>
                                                                    <td className="application-employer text-nowrap">
                                                                        {parseDateWithoutTime(parseDate(new Date(jl.createdOn)))}
                                                                    </td>
                                                                    {
                                                                        parseDateWithoutTime(parseDate(new Date("Mon, Jan 1, 1"))) < parseDateWithoutTime(parseDate(new Date(jl.expiredDate))) ?
                                                                            <td className="application-employer text-nowrap">
                                                                                {parseDateWithoutTime(parseDate(new Date(jl.expiredDate)))}
                                                                            </td>

                                                                            :

                                                                            <td>
                                                                                {/* {(date)} */}
                                                                            </td>
                                                                    }

                                                                    <td className="application-employer">
                                                                        {jl.paymentType}
                                                                    </td>
                                                                    {/*<td className="application-created">*/}
                                                                    {/*    <span> {parseDateWithoutTime(parseDate(new Date(jl.paymentStart)))} </span>*/}
                                                                    {/*</td>*/}
                                                                    {/*<td className="application-created">*/}
                                                                    {/*    <span> {parseDateWithoutTime(parseDate(new Date(jl.paymentEnd)))} </span>*/}
                                                                    {/*</td>*/}
                                                                    {/* <td className="application-employer">
                                                                        <span> {jl.transactionID} </span>
                                                                    </td> */}
                                                                    <td className="status">
                                                                        <span
                                                                            className={`${jl.status === "Fail" ? "fail" : jl.status === "Successful" ? "success" : "pending"}`}>{jl.status}</span>
                                                                    </td>
                                                                    <td className="view-application-pop text-right">
                                                                        {
                                                                            jl.paymentType !== "Online" && (

                                                                                <a className="downloadWithName"
                                                                                    target={"_blank"}
                                                                                    href={`${CONTENT_URL}/webapi${jl.reffDocURL}`}
                                                                                    download
                                                                                    style={{
                                                                                        display: "flex",
                                                                                        flex: "1"
                                                                                    }}>
                                                                                        <FontAwesomeIcon
                                                                                            icon={faLink}
                                                                                            className="lnr lnr-eye ml-2 mr-2" /><span>Link</span>
                                                                                </a>
                                                                                
                                                                            )
                                                                        }

                                                                    </td>
                                                                    <td>
                                                                        <Button
                                                                            style={{
                                                                                backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                color: "white"
                                                                            }}
                                                                            onClick={() => {
                                                                                setForm({
                                                                                    ...form,
                                                                                    openAddPayment: true,
                                                                                    paymentData: jl
                                                                                })
                                                                            }}
                                                                        >
                                                                            <ReceiptIcon
                                                                                style={{
                                                                                    color: "white",
                                                                                    marginRight: "4px"
                                                                                }} />
                                                                            Add Payment
                                                                        </Button>
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            jl.status === "Successful" && (
                                                                                <a download
                                                                                    href={`${DOWNLOAD_URL}/${jl.id}`}
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
                                        {
                                            form.openAddPayment && (
                                                <AddPaymentModal openAddPayment={form.openAddPayment}
                                                    data={form.paymentData} onClose={() => {
                                                        setForm({
                                                            ...form,
                                                            openAddPayment: false,
                                                            paymentData: {}
                                                        })
                                                    }} />
                                            )
                                        }
                                        {
                                            openPopUp && (
                                                <ReferenceDocModal data={popUpData}
                                                    onClose={() => setOpenPopUp(false)} />
                                            )
                                        }
                                    </div>
                                    <div className="application-pagination mb-30">
                                        <div className="row">
                                            <div className="col-12">
                                                <ul className="page-pagination justify-content-center">
                                                    <li
                                                        onClick={() => {
                                                            page--
                                                            getAllCompanyPaymentsAdmin(page)
                                                        }}
                                                    ><NavLink to="#"
                                                    ><FontAwesomeIcon
                                                                icon={faAngleLeft}
                                                                className="fa fa-angle-left" /></NavLink></li>
                                                    <li className={`${page === form.pageNo && "active"}`}
                                                    // onClick={() => this.handlePaging(pageNo)}
                                                    ><NavLink to="#">{form.pageNo}</NavLink>
                                                    </li>
                                                    <li className={`${page === form.pageNo + 1 && "active"}`}
                                                    // onClick={() => this.handlePaging(pageNo+1)}
                                                    ><NavLink to="#">{form.pageNo + 1}</NavLink></li>
                                                    <li
                                                        onClick={() => {
                                                            page++
                                                            getAllCompanyPaymentsAdmin(page)
                                                        }}
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
};

export default CompanyAdmin;