import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import { ProfileUpdated } from "../profileUpdated";
import Spinner from "../../spinner";
import { API } from "../../../utils/services";
import $ from "jquery";
import { parseDate, parseDateAndTime, STRINGS } from "../../../utils/base";
import { Toast, ToastBody, ToastHeader } from "react-bootstrap";
import { CToast, CToastBody, CButton, CToastClose } from '@coreui/react'

const JobListApplicantItem = (props) => {
    const { data } = props;
    const JOB_PATH = new URL(window.location.href).pathname;
    const JOB_ID = new URL(window.location.href).searchParams.get("id");
    const JOB_TAB = new URL(window.location.href).searchParams.get("f");
    const JOB_SEARCH = `${JOB_PATH}?id=${JOB_ID}&f=${JOB_TAB}`
    const [isResponse, setIsResponse] = useState(false);
    const [details] = useState(data);
    const [applicantDetail, setApplicantDetail] = useState({});
    const [appDetail, setAppDetail] = useState({});
    useEffect(() => {
        if (data.length > 0) {
            setIsResponse(true)
        } else {
            setIsResponse(true);
        }
    }, [setIsResponse])
    const handleGetApplicantDetail = (dt) => {
        //console.log("sssss", data.applicantID)
        setIsResponse(false)
        API.USER.getUser(dt.applicantID).then((response) => {
            let { status, data } = response;
            if (status) {
                setApplicantDetail(data);
                setIsResponse(true);
                if (dt.viewedByEmpOn === null) {
                    API.JOBS.viewed(dt).then(() => {
                        // console.log("viewed", response)
                    });
                }

            }
        }).catch((err) => {
            alert(err)
        })
    }
    // console.log("gfg", details);
    return (
        <div id="job-applied" className="tab-pane fade show active">
            <div className="row no-gutters">
                <div className="col-xl-2 col-lg-3">
                    <div className="jd-vertical-tabs overflow-auto"
                        style={{ height: "650px" }}>
                        <ul
                            className="nav nav-pills nav-stacked flex-column">
                            {
                                details.length > 0 ?
                                    details.map((dt) =>
                                        <li className="active">
                                            <NavLink
                                                className="a sel act"
                                                data-toggle="tab"
                                                to={`${JOB_SEARCH}&t=profile-${dt.applicantName}`}
                                                onClick={(e) => {
                                                    handleGetApplicantDetail(dt);
                                                    setAppDetail(dt)
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <div className="n">{
                                                    dt.applicantName
                                                }
                                                </div>
                                                <div className="n" style={{ whiteSpace: "pre-wrap" }}>
                                                    {
                                                        dt.headline
                                                    }
                                                </div>
                                                <div
                                                    className="n">{dt.city}
                                                </div>
                                            </NavLink>
                                        </li>
                                    ) : ""
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-8">
                    <div
                        className="jd-vertical-tab-content pl-15">
                        <div className="tab-content ov-des">
                            {
                                isResponse ?
                                    (
                                        !$.isEmptyObject(applicantDetail) ?
                                            <div className="d-flex w-100">
                                                <ProfileUpdated applicantDetail={appDetail} userData={applicantDetail} />
                                                {
                                                    appDetail.state === STRINGS.TYPES.JOB_LIST_TYPE.INTERVIEW && (
                                                        <CToast autohide={false} visible={true} style={{ maxWidth: `400px`, maxHeight: `250px` }}>
                                                            <CToastBody className="gradiant-css text-white">
                                                                <strong style={{marginRight:`10px`}}>Comments</strong>
                                                                <CToastClose aria-label="Close" component={CButton} style={{ backgroundColor: `rgb(110, 60, 121)`, border: `black`, float: `right`, height: `30px`, padding: `.1rem .75rem`, fontSize: `0.75rem` }}>
                                                                    x
                                                                </CToastClose>
                                                                <div className="mt-2 pt-2 border-top">
                                                                    <CButton type="button" color="primary" size="sm" style={{ backgroundColor: `transparent`, border: `transparent`, textAlign: `left`, fontWeight: `bold`, overflowWrap:`anywhere` }}>
                                                                        {appDetail.interviewComments}
                                                                    </CButton>
                                                                </div>
                                                            </CToastBody>
                                                        </CToast>
                                                    )
                                                }

                                            </div>
                                            :
                                            <div className="d-flex w-100 justify-content-center align-items-center">
                                                Please select candidate to view details
                                            </div>
                                    ) : <div className="spinner-holder">
                                        <Spinner type={"Puff"} />
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListApplicantItem;