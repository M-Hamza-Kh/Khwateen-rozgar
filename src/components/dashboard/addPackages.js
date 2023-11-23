import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {parseDate, parseDateWithoutTime, STRINGS} from "../../utils/base";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {Button} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Spinner from "../spinner";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import AddPackageModal from "./modals/AddPackageModal";
import {API} from "../../utils/services";
//import defaultUserImg from "../../content/images/location/upload-icon-30.png";


const defaultState = {
    isResponse: false,
    openAddPackage: false,
    packagesAdmin: [],
    packageData: {},
    pageNo: 1
}

let page = 1

const AddPackages = () => {
    const [form, setForm] = useState(defaultState);

    const getAllPackagesAdmin = (page) => {
        API.PACKAGES.getAllPackagesAdmin(page).then((response) => {
            console.log("getAllPackagesAdmin", response)
            if (response.status) {
                setForm({
                    ...form,
                    packagesAdmin: response.data,
                    isResponse: true
                })
            }
        })
    }

    useEffect(() => {
        getAllPackagesAdmin(page);
    }, [page]);


    return (
        <div className="col-xl-10 col-lg-9">
            <div className="dashboard-main-inner">
                <div className="row">
                    <div className="col-12">
                        <div className="page-breadcrumb-content">
                            <h4>Add Packages</h4>
                            <div className="d-flex ml-2 mr-2 mb-2 mt-2">
                                <Button
                                    style={{
                                        backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                        color: "white"
                                    }}
                                    onClick={() => {
                                        setForm({
                                            ...form,
                                            openAddPackage: true
                                        })
                                    }}
                                >
                                    Add Package
                                </Button>
                            </div>
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
                                                <th>Title</th>
                                                <th>Recommended</th>
                                                <th>Amount</th>
                                                <th>Duration</th>
                                                <th>Duration Value</th>
                                                <th>Job Allowed</th>
                                                <th>Sponsor Job Amount</th>
                                                <th>Position</th>
                                                <th>Status</th>
                                                <th>Create Date</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody >
                                            {
                                                form.isResponse ?
                                                    form.packagesAdmin.length > 0 ?
                                                        form.packagesAdmin.map((jl, index) =>
                                                            <tr className="application-item" key={index}
                                                            style={{
                                                                backgroundColor:`${jl.isActive ? "#afeab5" : "initial"}`,
                                                                border:`1px solid ${jl.isActive ? STRINGS.TYPES.COLORS.DEFAULT : "initial"}`
                                                            }}
                                                            >
                                                                <td className="application-employer text-nowrap">
                                                                    {jl.title}
                                                                </td>
                                                                <td className="view-application ">
                                                                    <NavLink to="#"
                                                                             className="view-application text-decoration-none text-nowrap">{jl.recommended && "Yes"}</NavLink>
                                                                </td>
                                                                <td className="application-employer">
                                                                    {jl.amount}
                                                                </td>

                                                                <td className="application-employer">
                                                                    {jl.duration}
                                                                </td>
                                                                <td className="application-employer">
                                                                    {jl.durationVslue === 0 ? "" : jl.durationVslue}
                                                                </td>
                                                                <td className="application-created">
                                                                    <span> {jl.jobsAlloweded === -1 ? "Unlimited Job Posting" : `${jl.jobsAlloweded} Job Posting`} </span>
                                                                </td>
                                                                <td className="application-created">
                                                                    <span> {jl.sponsorJobsAmount} </span>
                                                                </td>
                                                                <td className="application-created">
                                                                    <span> {jl.position} </span>
                                                                </td>
                                                                <td className="text-nowrap">
                                                                    {jl.isActive ? "Active" : "De-active"}
                                                                </td>
                                                                <td className="application-employer text-nowrap">
                                                                    {parseDateWithoutTime(parseDate(new Date(jl.createdOn)))}
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
                                                                                openAddPackage: true,
                                                                                packageData: jl
                                                                            })
                                                                        }}
                                                                    >
                                                                        <EditIcon
                                                                            style={{
                                                                                color: "white",
                                                                                marginRight: "4px"
                                                                            }}/>
                                                                        Edit
                                                                    </Button>
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
                                            form.openAddPackage && (
                                                <AddPackageModal openAddPackage={form.openAddPackage}
                                                                 data={form.packageData} onClose={() => {
                                                    setForm({
                                                        ...form,
                                                        openAddPackage: false,
                                                        packageData: {}
                                                    })
                                                }}/>
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
                                                            getAllPackagesAdmin(page)
                                                        }}
                                                    ><NavLink to="#"
                                                    ><FontAwesomeIcon
                                                        icon={faAngleLeft}
                                                        className="fa fa-angle-left"/></NavLink></li>
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
                                                            getAllPackagesAdmin(page)
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
}

export default AddPackages;