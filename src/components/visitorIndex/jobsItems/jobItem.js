import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from "react-router-dom";
import { CONTENT_URL, getUserData, isLogin, STRINGS, WEB_HOST_URL } from "../../../utils/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faPaperPlane, faThumbsUp, faTimes, faWindowClose } from "@fortawesome/free-solid-svg-icons";
//import authorIcon from "../../../content/images/author/author2.jpg";
import ZoomImageLightBox from "../../ZoomImageLightBox";
import { API } from "../../../utils/services";
import Spinner from "../../spinner";
import defaultImage from "../../../content/images/hero/bg_home_01.jpg";
import defaultProfile from "../../../content/images/portfolio/user_default.jpg";
import ApplyConfirmModal from "../../dashboard/modals/applyConfirmModal";
import Share from "../../shareComponent/share";
import DetailsTable from "./detailsTable";
import swal from 'sweetalert';
import axios from "axios";
import "../../../App.css";

import Card from "../../../components/dashboard/Card";

const JobItem = (props) => {
    const JOB_SEARCH = new URL(window.location.href).pathname;
    let { handleShowJobDetails, id, share } = props;
    // let {jobTitle, jobDescription, objective, skills, niceToHave, pickAndDrop, accommodation,uploadedPlace_1,uploadedPlace_2} = data;
    const [zoomImage1, setZoomImage1] = useState(false);
    const [zoomImage2, setZoomImage2] = useState(false);
    const [data, setData] = useState({});
    const [jobTitle, setJobTitle] = useState("");
    const [isResponse, setIsResponse] = useState(false);
    const [openConfirmModal, setOpenModal] = useState(false);
    const [companyData, setCompanyData] = useState(null);
    const [userData, setUserData] = useState(null);
    const childDiv = useRef(null)
    //console.log("data", data)

    const getJobDetails = (id) => {
        API.JOBS.getJobById(id).then((response) => {
            let { status, data, error } = response;
            //console.log("jobid", response)
            if (status) {
                setData(data);
                setIsResponse(true)
                const titleWithDash = data.title.split(" ").join("-");
                //console.log("titleWithDash", titleWithDash)
                setJobTitle(titleWithDash)
                if (response.data.showCompanyInfo) {
                    getCompanyDetails(data.companyID);
                }
            } else {
                alert(error)
            }
        })
    }

    const getCompanyDetails = (id) => {
        API.USER.getCompany(id).then((response) => {
            let { status, data, error } = response;
            //console.log("comapny", response)
            if (status) {
                setCompanyData(data)
            } else {
                alert(error)
            }
        })
    }

    const handleApplyJob = ({ confirmObj, id }) => {
        const applyObj = {
            ShowVideo: confirmObj.showVideo === STRINGS.TYPES.APPLY_JOB.SHOW_CV.YES,
            ApplyType: confirmObj.applyType,
            cvurl: confirmObj.applyType === STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.UPLOAD ? confirmObj.uploadFile : "",
            id: id
        }
        //console.log("applyType", applyObj)
        API.JOBS.applyJob(applyObj).then((response) => {
            let { status, error } = response;
            //console.log("applyType", response)
            if (status) {
                if (confirmObj.applyType === STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.UPLOAD) {
                    userData.cvurl = confirmObj.uploadFile;
                    //console.log("applyType", userData)
                    API.USER.updateUser(userData).then((response) => {
                        //console.log("userUpdate", response)
                        let { status, error } = response;
                        if (status) {
                            //  alert("Successfully applied");
                            swal("", "Successfully applied", "success")
                        } else {
                            alert(error)
                        }
                    })
                } else {
                    // alert("Successfully applied");
                    swal("", "Successfully applied", "success")
                }
                getJobDetails(id);
                //setData(data);
                //setIsResponse(true)
            } else {
                alert(error)
            }
        })
    }
    useEffect(() => {
        setCompanyData(null)
        getJobDetails(id);

        const handleScroll = () => {
            const { index, selected } = props
            if (index === selected) {
                setTimeout(() => {
                    childDiv.current.scrollIntoView({ behavior: 'smooth' })
                }, 500)
            }
        }
        handleScroll();
        const getUserDetail = () => {
            if (isLogin()) {
                const user_id = getUserData().id
                API.USER.getUser(user_id).then((response) => {
                    console.log("ApplicationData", response.data)
                    if (response.status) {
                        setUserData(response.data)
                    } else {
                        alert(response.error)
                    }
                })
            }

        }
        getUserDetail();
    }, [id, setOpenModal, openConfirmModal])

    return (
        <div id="job-item1" className='tab-pane fade active show' ref={childDiv}>
            {share === undefined && <NavLink className="tab-close"
                to={`${JOB_SEARCH}?title=${data.title}&city=${data.city}&type=${data.type}&page=1`}
                onClick={() => handleShowJobDetails()}
            ><FontAwesomeIcon icon={faTimes} /></NavLink>}
            <div className="job-detail-content bg_color--3 pl-30 pr-30 pt-30 pb-30">
                <div className="field-descriptions mb-60 mb-sm-30 mb-xs-30">

                    {
                        isResponse ?
                            <React.Fragment>
                                <div className="row">
                                    <p>
                                        {/*<FontAwesomeIcon icon={faBuilding}*/}
                                        {/*                color={STRINGS.TYPES.COLORS.DEFAULT}/>*/}
                                        <div className="d-flex flex-column">
                                            {
                                                companyData !== null && (
                                                    <img alt={"#"}
                                                        src={companyData.pictureURL !== "" && companyData.pictureURL !== null ? `${CONTENT_URL}/webapi${companyData.pictureURL}` : defaultProfile}
                                                        style={{
                                                            width: "100px",
                                                            height: "100px",
                                                            margin: "3px",
                                                            border: "1px solid #c355a0",
                                                            borderRadius: "5px"
                                                        }} />
                                                )
                                            }
                                        </div>
                                    </p>
                                    <div className="col-md-7">
                                        <h3 style={{ marginBottom: "0" }} className="mt-0 pt-15">{data.title}</h3>
                                        <h6 style={{ color: "#c355a0" }}>{companyData !== null && companyData.company}</h6>
                                    </div>
                                    <div style={{ position: `initial` }} className={`${props.db !== undefined && props.db ? `col-md-6` : `col-md-4`}`}>
                                        <div className="job-apply float-left" style={{ marginRight: `6px` }}>
                                            {
                                                !isLogin() ?
                                                    (<NavLink
                                                        className="apply-btn ht-btn theme-btn text-center"
                                                        // onClick={()=> handleApplyJob(data.id)}
                                                        to={`${STRINGS.ROUTES.AUTH.SIGN_IN}`}
                                                    >
                                                        Login here to Apply this job?
                                                        <FontAwesomeIcon icon={faPaperPlane}
                                                            className="ml-10 mr-0 fa fa-paper-plane" />
                                                    </NavLink>) :
                                                    <React.Fragment>
                                                        {
                                                            !data.isApplied ? (
                                                                <div
                                                                    className="apply-btn ht-btn theme-btn text-center"
                                                                    onClick={() => {
                                                                        getUserData().type === STRINGS.USER_TYPE.APPLICANT_TYPE ?
                                                                            setOpenModal(true) : alert("Please Login as Candidate")
                                                                    }}
                                                                // to={`${JOB_SEARCH}?title=${data.title}&city=${data.city}&type=${data.type}&page=1`}
                                                                >
                                                                    Apply now
                                                                    <FontAwesomeIcon icon={faPaperPlane}
                                                                        className="ml-10 mr-0 fa fa-paper-plane" />
                                                                </div>
                                                            ) : (
                                                                <div
                                                                    className="apply-btn ht-btn bg-success text-center"
                                                                >
                                                                    Applied
                                                                    <FontAwesomeIcon icon={faThumbsUp}
                                                                        className="ml-10 mr-0 fa fa-paper-plane" />
                                                                </div>
                                                            )
                                                        }
                                                    </React.Fragment>

                                            }
                                            {
                                                openConfirmModal && (
                                                    <ApplyConfirmModal
                                                        openConfirmModal={openConfirmModal}
                                                        title={data.title}
                                                        onSave={(confirm) => handleApplyJob({
                                                            confirmObj: confirm,
                                                            id: data.id
                                                        })}
                                                        onClose={() => {
                                                            setOpenModal(false)
                                                        }}
                                                    />
                                                )
                                            }
                                        </div>
                                        <div className="sidebar-job-share float-left" style={{ marginTop: `1px` }}>
                                            <div className="job-share candidate-action">
                                                <ul>
                                                    <li><NavLink style={{ paddingBottom: `5px`, paddingTop: `5px`, display: `flex` }}
                                                        to={"#"}
                                                    //to={`${JOB_SEARCH}?title=${data.title}&city=${data.city}&type=${data.type}&page=1`}
                                                    ><i
                                                            className="lnr lnr-bubble" /> <span style={{ paddingBottom: `5px`, paddingTop: `5px` }}
                                                                className="text">Share </span>
                                                    </NavLink>
                                                        {/* <Share
                                                            // url={`${WEB_HOST_URL}/job_listing/?title=${data.title}&type=${data.type}&page=1`} />
                                                            url={`${WEB_HOST_URL}/job_listing/?title=${data.title}&type=${data.type}&page=1`} /> */}

                                                        <Card
                                                            url={`${WEB_HOST_URL}/job_listing/?title=${data.title}&type=${data.type}&page=1`}
                                                            designation={data.title}
                                                            cityName={data.city}
                                                            comanyName={data.company}
                                                        />
                                                        {/*<li><NavLink*/}
                                                        {/*    to={`${JOB_SEARCH}?title=${data.title}&city=${data.city}&type=${data.type}&page=1`}><i*/}
                                                        {/*    className="fab fa-facebook-f"/></NavLink>*/}
                                                        {/*</li>*/}
                                                        {/*<li><NavLink*/}
                                                        {/*    to={`${JOB_SEARCH}?title=${data.title}&city=${data.city}&type=${data.type}&page=1`}><i*/}
                                                        {/*    className="fab fa-twitter"/></NavLink>*/}
                                                        {/*</li>*/}
                                                        {/*<li><NavLink*/}
                                                        {/*    to={`${JOB_SEARCH}?title=${data.title}&city=${data.city}&type=${data.type}&page=1`}><i*/}
                                                        {/*    className="fab fa-linkedin-in"/></NavLink>*/}
                                                        {/*</li>*/}
                                                        {/*<li><NavLink*/}
                                                        {/*    to={`${JOB_SEARCH}?title=${data.title}&city=${data.city}&type=${data.type}&page=1`}><i*/}
                                                        {/*    className="far fa-envelope"/></NavLink>*/}
                                                        {/*</li>*/}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h3>Job Description</h3>

                                <ul>
                                    {/*{*/}
                                    {/*    data.description.map((jd, index) => <li key={index}>{jd}</li>)*/}
                                    {/*}*/}
                                    <li>{data.description}</li>
                                </ul>

                                {/*<h3>Job Information</h3>*/}

                                {/*<ul>*/}
                                {/*    /!*{*!/*/}
                                {/*    /!*    data.description.map((jd, index) => <li key={index}>{jd}</li>)*!/*/}
                                {/*    /!*}*!/*/}
                                {/*    <li>{data.jobInformation}</li>*/}
                                {/*</ul>*/}

                                <h3>About Company</h3>

                                <ul>
                                    {/*{*/}
                                    {/*    data.description.map((jd, index) => <li key={index}>{jd}</li>)*/}
                                    {/*}*/}
                                    <li>{companyData !== null && companyData.about}</li>
                                </ul>

                                <h3>Address</h3>

                                <ul>
                                    {/*{*/}
                                    {/*    data.description.map((jd, index) => <li key={index}>{jd}</li>)*/}
                                    {/*}*/}
                                    <li>{companyData !== null && companyData.address}</li>
                                </ul>

                                <h3>Job Industry</h3>
                                <ul>
                                    {/*{*/}
                                    {/*    data.description.map((jd, index) => <li key={index}>{jd}</li>)*/}
                                    {/*}*/}
                                    <li>{data.category}</li>
                                </ul>

                                {
                                    data.skills !== null && data.skills.length > 0 && (
                                        <h3>Your Skills and Experience</h3>
                                    )
                                }

                                {/*<p><strong>Your Experience and Qualifications</strong></p>*/}

                                <ul>
                                    {
                                        data.skills !== null && data.skills.length > 0 ? (
                                            data.skills.map((sk, index) => <li key={index}>{sk}</li>)
                                        ) : ""
                                    }
                                </ul>

                                {/*<p><strong>Nice-to-haves</strong></p>*/}

                                {/*<ul>*/}
                                {/*    /!*{*!/*/}
                                {/*    /!*    data.requiredSkillsExperience.map((nth, index) => <li key={index}>{nth}</li>)*!/*/}
                                {/*    /!*}*!/*/}
                                {/*    <li >{data.requiredSkillsExperience}</li>*/}
                                {/*</ul>*/}

                                {/*<p><strong>How to apply?</strong></p>*/}

                                {/*<p>PLease send us a Resume and PortfoLios. Pixel-perfect mockups, UX*/}
                                {/*    )AraLkthroughs, UI designs, Live product Links and code are aft*/}
                                {/*    accepted. Send us via clinavine@career.com</p>*/}

                                {/*<h3>Why You’ll Love Working Here</h3>*/}

                                {/*<ul>*/}
                                {/*    <li>Opportunities to work abroad (US, AUS)</li>*/}
                                {/*    <li>Compliance tufty to Vietnam Labor code</li>*/}
                                {/*    <li>Company trip, team-building events</li>*/}
                                {/*    <li>13th salary and project bonus</li>*/}
                                {/*    <li>Work-from-home poLicy</li>*/}
                                {/*    <li>Support Laptop</li>*/}
                                {/*    <li>Extra healthcare package</li>*/}
                                {/*</ul>*/}

                                <div className="job-pnd-hld">
                                    <div className="pnd-row">
                                        {
                                            !data.pickAndDrop ?
                                                <FontAwesomeIcon icon={faWindowClose} size={"lg"}
                                                    color={STRINGS.TYPES.COLORS.DEFAULT}
                                                    className="ic" /> :
                                                <FontAwesomeIcon icon={faCheckSquare} size={"lg"}
                                                    color={STRINGS.TYPES.COLORS.DEFAULT}
                                                    className="ic" />
                                        }

                                        <h3>Pick & Drop</h3>
                                    </div>
                                    <div className="pnd-row">
                                        {
                                            !data.accommodation ?
                                                <FontAwesomeIcon icon={faWindowClose} size={"lg"}
                                                    color={STRINGS.TYPES.COLORS.DEFAULT}
                                                    className="ic" /> :
                                                <FontAwesomeIcon icon={faCheckSquare} size={"lg"}
                                                    color={STRINGS.TYPES.COLORS.DEFAULT}
                                                    className="ic" />
                                        }
                                        <h3>Accommodation</h3>
                                    </div>
                                </div>

                                <div className="flex">
                                    <DetailsTable data={data} companyData={companyData} />
                                </div>

                                {/*<div className="job-pnd-hld">*/}
                                {/*    <div className="pnd-row">*/}
                                {/*        <div className="title">&#8226; Total Number of Employees:</div>*/}
                                {/*        <div className="noe">({data.numberofEmployees})</div>*/}
                                {/*    </div>*/}
                                {/*    <div className="pnd-row">*/}
                                {/*        <div className="title">&#8226; Number of (Female) Employees:</div>*/}
                                {/*        <div className="noe">({data.numberofEmployeesFemale})</div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="job-pnd-hld">*/}
                                {/*    <div className="pnd-row">*/}
                                {/*        <div className="title">&#8226; Number of Vacancies:</div>*/}
                                {/*        <div className="noe">({data.numberOfVacancy})</div>*/}
                                {/*    </div>*/}
                                {/*    <div className="pnd-row">*/}
                                {/*        <div className="title">&#8226; Qualification:</div>*/}
                                {/*        <div className="noe">({data.qualification})</div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="job-pnd-hld">*/}
                                {/*    <div className="pnd-row">*/}
                                {/*        <div className="title">&#8226; Preferred Age Group:</div>*/}
                                {/*        <div className="noe">{data.preferredAgeGroup}</div>*/}
                                {/*    </div>*/}
                                {/*    <div className="pnd-row">*/}
                                {/*        <div className="title">&#8226; Job Timings:</div>*/}
                                {/*        <div className="noe">({data.jobTimings})</div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="job-pnd-hld">*/}
                                {/*    <div className="pnd-row">*/}
                                {/*        <div className="title">&#8226; Working Days:</div>*/}
                                {/*        <div className="noe">({data.workingDays})</div>*/}
                                {/*    </div>*/}
                                {/*    <div className="pnd-row">*/}
                                {/*        <div className="title">&#8226; Last Date of Posting:</div>*/}
                                {/*        <div*/}
                                {/*            className="noe">({parseDateWithoutTime(parseDate(new Date(data.lastDatePosting)))})*/}
                                {/*        </div>*/}
                                {/*    </div>*/}

                                {/*</div>*/}
                                {/*<div className="job-pnd-hld">*/}
                                {/*    <div className="pnd-row">*/}
                                {/*        <div className="title">&#8226; Experience:</div>*/}
                                {/*        <div className="noe">({data.experienceInYears})</div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                <h3>Job Place / Environment</h3>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="job-place" onClick={() => setZoomImage1(true)}>
                                            <img alt="#"
                                                src={data.companyPicture1 !== "" && data.companyPicture1 ? `${CONTENT_URL}/webapi${data.companyPicture1}` : defaultImage} />
                                            {
                                                zoomImage1 &&
                                                (<ZoomImageLightBox
                                                    isOpen={zoomImage1}
                                                    images={[`${CONTENT_URL}/webapi${data.companyPicture1}`]}
                                                    closeZoom={() => setZoomImage1(false)}
                                                />)
                                            }
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="job-place">
                                            <img alt="#"
                                                src={data.companyPicture2 !== "" && data.companyPicture2 ? `${CONTENT_URL}/webapi${data.companyPicture2}` : defaultImage}
                                                onClick={() => setZoomImage2(true)} />
                                            {
                                                zoomImage2 &&
                                                (<ZoomImageLightBox
                                                    isOpen={zoomImage2}
                                                    images={[`${CONTENT_URL}/webapi${data.companyPicture2}`]}
                                                    closeZoom={() => setZoomImage2(false)}
                                                />)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>
                            : <div className="spinner-holder" style={{ height: "100vh" }}>
                                <Spinner width={100} height={100} type={"Puff"} />
                            </div>
                    }

                </div>
                {/*<div className="review-area pb-60 pb-sm-30 pb-xs-30 hidden">*/}
                {/*    <div className="review-container">*/}
                {/*        <h3 className="title">1 Review</h3>*/}
                {/*        <div className="review-content">*/}
                {/*            <div className="review-avatar">*/}
                {/*                <img src={{authorIcon}} alt=""/>*/}
                {/*            </div>*/}
                {/*            <div className="review-details">*/}
                {/*                <div className="review-title">*/}
                {/*                    <h3 className="title">Suspendisse in tortor ex</h3>*/}
                {/*                    <div className="rate-content">*/}
                {/*                        <div className="star">*/}
                {/*                            <i className="fas fa-star"/>*/}
                {/*                            <i className="fas fa-star"/>*/}
                {/*                            <i className="fas fa-star"/>*/}
                {/*                            <i className="fas fa-star"/>*/}
                {/*                            <i className="fas fa-star"/>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div className="meta">*/}
                {/*                    <ul>*/}
                {/*                        <li>*/}
                {/*                            <span className="review-by">By: </span>*/}
                {/*                            <span className="review-name theme-color">Employer Emplyer </span>*/}
                {/*                        </li>*/}
                {/*                        <li>*/}
                {/*                            <i className="lnr lnr-clock"/>*/}
                {/*                            <span>6 months ago</span>*/}
                {/*                        </li>*/}
                {/*                    </ul>*/}
                {/*                </div>*/}
                {/*                <div className="review-des">*/}
                {/*                    <p>Etiam ut ligula velit. Donec at blandit metus, sit*/}
                {/*                        amet elementum sapien. Nullam fermentum lorem quis*/}
                {/*                        mollis sodales. Nullam sodales volutpat tortor,*/}
                {/*                        vitae bibendum ex viverra faucibus.</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>

        </div>
    );
};

export default JobItem;