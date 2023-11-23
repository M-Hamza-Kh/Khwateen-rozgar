import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Spinner from "../spinner";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {API} from "../../utils/services";
import TestimonialItem from "../visitorIndex/testimonialItems/testimonialItem";
import {STRINGS} from "../../utils/base";
import {FormControl, MenuItem, Select} from "@material-ui/core";

const filter = {
    isApproved: false,
    pageNo: 1
}

const defaultState = {
    approvals: [],
    isResponse: false,
    isApproved: 2,
    pageNo: filter.pageNo
}

const ApprovalsList = () => {
    const [form, setForm] = useState(defaultState);

    useEffect(() => {
        getAllTestAdmin(filter)
    }, [])

    const getAllTestAdmin = ({pageNo, isApproved}) => {
        const obj = {
            isApproved,
            pageNo
        }
        API.TESTIMONIALS.getAllTestAdmin(obj).then((response) => {
            console.log("admin", response)
            if (response.status) {
                setForm({
                    ...form,
                    approvals: response.data,
                    isResponse: true,
                    isApproved: isApproved ? 1 : 2
                })
            } else {
                alert(response.error)
            }
        })
    }

    const handleApproved = (data) => {
        API.TESTIMONIALS.approveTestimonial(data, data.id).then((response) => {
            if (response.status) {
                getAllTestAdmin(filter)
            } else {
                alert(response.error)
            }
        })
    }

    const handleOnChangeDropDown = (ev) => {
        console.log("admin", ev.target.value)
        if (ev.target.value === 1) {
            filter.isApproved = true
            getAllTestAdmin(filter)
            setForm({
                ...form,
                isApproved: 1
            })
        }
        if (ev.target.value === 2) {
            filter.isApproved = false
            getAllTestAdmin(filter)
            setForm({
                ...form,
                isApproved: 2
            })
        }
    }

    const handleDelete = () => {
        getAllTestAdmin(filter)
    }

    return (
        <div className="col-xl-10 col-lg-9">
        <div className="dashboard-main-inner">
            <div className="row">
                <div className="col-12">
                    <div className="page-breadcrumb-content">
                        <h1>Testimonials</h1>
                    </div>
                </div>
            </div>
            <div className="dashboard-overview">
                <div className="row">
                    <div className="col-xl-12 col-12">
                        <div className="submited-applications mb-50">
                            <div className="applications-heading">
                                <FormControl style={{
                                    display: "flex",
                                    width: "10rem",
                                    margin: "5px",
                                    color: `${STRINGS.TYPES.COLORS.DEFAULT}`
                                }}>
                                    {/*<InputLabel id="demo-simple-select-label"*/}
                                    {/*            style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}>Types</InputLabel>*/}
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={form.isApproved}
                                        style={{borderBottomColor: `${STRINGS.TYPES.COLORS.DEFAULT}`}}
                                        onChange={handleOnChangeDropDown}
                                    >
                                        <MenuItem value={1}>Approved</MenuItem>
                                        <MenuItem value={2}>Not Approved</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="applications-main-block">
                                <div className="applications-table ov-des d-flex flex-wrap pb-10 pt-10 pl-10 pr-10">
                                    {
                                        form.isResponse ?
                                            form.approvals.length > 0 ?
                                                form.approvals.map((jl, index) =>
                                                    <div className="flex width-35 ml-10 mr-10 mt-10 mb-10">
                                                        <div className="col-lg-12">
                                                            <TestimonialItem onSuccessDelete={handleDelete} data={jl} onApprove={handleApproved}/>
                                                        </div>
                                                    </div>
                                                ) : "No Data Found"
                                            :
                                            <div className="spinner-holder"
                                                 style={{position: "absolute"}}>
                                                <Spinner width={100} height={100} type={"Puff"}/>
                                            </div>
                                    }
                                </div>
                                <div className="application-pagination mb-30">
                                    <div className="row">
                                        <div className="col-12">
                                            <ul className="page-pagination justify-content-center">
                                                <li
                                                    onClick={() => {
                                                        filter.pageNo--
                                                        getAllTestAdmin(filter)
                                                    }}
                                                ><NavLink to="#"
                                                ><FontAwesomeIcon
                                                    icon={faAngleLeft}
                                                    className="fa fa-angle-left"/></NavLink></li>
                                                <li className={`${filter.pageNo === form.pageNo && "active"}`}
                                                    // onClick={() => this.handlePaging(pageNo)}
                                                ><NavLink to="#">{form.pageNo}</NavLink>
                                                </li>
                                                <li className={`${filter.pageNo === form.pageNo + 1 && "active"}`}
                                                    // onClick={() => this.handlePaging(pageNo+1)}
                                                ><NavLink to="#">{form.pageNo + 1}</NavLink></li>
                                                <li
                                                    onClick={() => {
                                                        filter.pageNo++
                                                        getAllTestAdmin(filter)
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

export default ApprovalsList;