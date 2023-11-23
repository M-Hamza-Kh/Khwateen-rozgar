import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Button, Chip, IconButton, Menu, MenuItem } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import BlockIcon from "@material-ui/icons/Block";
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faBook,
    faBuilding,
    faCheck,
    faCity,
    faEllipsisV,
    faEnvelope,
    faPencilAlt,
    faPhone,
    faPlus,
    faTimes,
    faUniversity,
} from "@fortawesome/free-solid-svg-icons";
import {
    CONTENT_URL,
    WEB_HOST_URL,
    downloadResume,
    dropDownSelection,
    getUserData,
    parseDate,
    parseDateWithMontAndYear,
    STRINGS
} from "../../utils/base";
import $ from "jquery";
import UpdateProfileModal from "./modals/updateProfileModal";
import defaultUserImg from "../../content/images/portfolio/user_default.jpg";
import defaultUploadImg from "../../content/images/location/upload-icon-30.png";
import VideoPopUp from "./modals/videoPopUp";
import AboutModal from "./modals/aboutModal";
import { API } from "../../utils/services";
import SkillsModal from "./modals/skillsModal";
import Spinner from "../spinner";
import ExperienceModal from "./modals/experienceModal";
import EducationModal from "./modals/educationModal";
import AudioPlayerDefault from "../media/audioPlayer";
import CoursesModal from "./modals/coursesModal";
import ProjectModal from "./modals/projectModal";
import AccomplishmentModal from "./modals/accomplishmentModal";
import ScheduleInterviewModal from "./modals/scheduleInterviewModal";
import InterviewCommentsModal from "./modals/interviewCommentsModal";
import GMap from "../GoogleMap/GMap";

export class ProfileUpdated extends Component {
    job_action = React.createRef();
    scheduleForInterviewOn = (new Date()).toISOString()
    interviewComments = "";
    scheduleIntType = ""

    constructor(props) {
        super(props);
        //console.log("props", props)
        this.state = {
            openUpdateProfile: false,
            openInterviewComments: false,
            openScheduleInterviewOn: false,
            openAboutModal: false,
            openExperienceModal: false,
            openAccomplishment: false,
            openEduModal: false,
            openSkillsModal: false,
            openAddProjectModal: false,
            openAddCourseModal: false,
            isResponsePending: false,
            ddMenu: false,
            selectedOption: null,
            upPic: '',
            upPic2: '',
            selImgName: '',
            upProfilePic: '',
            selFileName: '',
            openVideoIntro: false,
            isJobFindOpen: false,
            isUpdate: true,
            moreMenuEl: false,
            selectedExp: {},
            selectedEdu: {},
            expIndex: null,
            eduIndex: null,
            projectData: {},
            projectIndex: null,
            courseData: {},
            courseIndex: null,
            // userData: isLogin() && props.userData === undefined ? JSON.parse(localStorage.getItem(STRINGS.STORAGE.user)) : props.userData !== undefined ? props.userData : {},
            userData: {},
            currentProfile: props.userData === undefined,
        };
        this.handleGetUserDetail();
        // const {userData} = this.state;
        // this.userUpdateObj = {
        //     "email": userData.email,
        //     "type": userData.type,
        //     "firstName": userData.firstName,
        //     "lastName": userData.lastName,
        //     "isEmailVerified": userData.isEmailVerified,
        //     "about": userData.about,
        //     "dob": userData.dob,
        //     "gender": userData.gender,
        //     "cnic": userData.cnic,
        //     "address": userData.address,
        //     "maritalStatus": userData.maritalStatus,
        //     "phone": userData.phone,
        //     "city": userData.city,
        //     "country": userData.country,
        //     "lastSalary": userData.lastSalary,
        //     "cvurl": userData.cvurl,
        //     "videoCVURL": userData.videoCVURL,
        //     "skills": userData.skills,
        //     "viewed": userData.viewed,
        //     "showEmail": userData.showEmail,
        //     "public": userData.public,
        //     "experience": userData.experience,
        //     "education": userData.education,
        //     "accomplishment": userData.accomplishment,
        //     "isActive": userData.isActive,
        //     "createdOn": userData.createdOn,
        //     "modifiedOn": userData.modifiedOn,
        //     "id": userData.id,
        //     "company": userData.company,
        //     "headline": userData.headline,
        //     "audioCVURL": userData.audioCVURL,
        //     "openforOpportunity": userData.openforOpportunity,
        //     "flag": userData.flag,
        //     "numberofEmployees": userData.numberofEmployees,
        //     "numberofEmployeesFemale": userData.numberofEmployeesFemale,
        //     "companyPicture1": userData.companyPicture1,
        //     "companyPicture2": userData.companyPicture2,
        // };


    }

    componentDidMount() {
        dropDownSelection();
        $(document).ready(() => {
            $(document).click((e) => {
                if ($("#profile-modal").is(e.target)) {
                    this.onClose();
                }
                $(".downloadWithName").on("click", () => {
                    //alert("download");
                    //var d = "ha";
                    //console.log("download", $(".downloadWithName"))
                    //$(this).attr("href", "www.google.com").attr("download", "file-" + d + ".png");
                })
            })

        })
        console.log("props", this.props.applicantDetail)
    }

    handleGetUserDetail = () => {
        //console.log("userId", getUserData().id)
        let user_id = this.props.userData !== undefined ? this.props.userData.id : getUserData().id
        API.USER.getUser(user_id).then((response) => {
            let { status, data, error } = response;
            //console.log("userData",data)
            if (status) {
                //console.log("userData", data)
                if (data.type === STRINGS.USER_TYPE.COMPANY_TYPE) {
                    this.setState({
                        userData: data,
                        isResponsePending: true,
                        upPic: data.companyPicture1 !== "" ? `${CONTENT_URL}/webapi/${data.companyPicture1}` : "",
                        upPic2: data.companyPicture2 !== "" ? `${CONTENT_URL}/webapi/${data.companyPicture2}` : "",
                        upProfilePic: data.pictureURL !== null ? `${CONTENT_URL}/webapi/${data.pictureURL}` : "",
                    })
                } else {
                    this.setState({
                        userData: data,
                        isResponsePending: true,
                        isJobFindOpen: data.openforOpportunity,
                        upProfilePic: data.pictureURL !== null ? `${CONTENT_URL}/webapi/${data.pictureURL}` : "",
                    })
                }
            } else {
                alert(error)
            }
        })
    }

    handleBodyScrollingHide = () => {
        $("body").css({ overflow: 'hidden' });
    };

    handleBodyScrollingShow = () => {
        $("body").css({ overflow: 'auto' });
    };

    handleUpdate = (updateType) => {
        this.handleBodyScrollingHide();
        if (updateType === 1) {
            this.setState({
                openUpdateProfile: true,
            })
        }
        if (updateType === 2) {
            this.setState({
                openAboutModal: true,
            })
        }
        if (updateType === 3) {
            this.setState({
                openExperienceModal: true,
            })
        }
        if (updateType === 4) {
            this.setState({
                openEduModal: true,
            })
        }
        if (updateType === 5) {
            this.setState({
                openSkillsModal: true,
            })
        }
        if (updateType === 6) {
            this.setState({
                openAddProjectModal: true,
                ddMenu: false,
            })
        }
        if (updateType === 7) {
            this.setState({
                openAddCourseModal: true,
                ddMenu: false,
            })
        }
    }

    onClose = () => {
        this.handleBodyScrollingShow();
        this.setState({
            openUpdateProfile: false,
            openAboutModal: false,
            openExperienceModal: false,
            openEduModal: false,
            openSkillsModal: false,
            openAddProjectModal: false,
            openAddCourseModal: false,
            openAccomplishment: false,
            selectedExp: {},
            selectedEdu: {},
            expIndex: null,
            eduIndex: null,
            projectData: {},
            courseData: {},
            courseIndex: null,
            projectIndex: null,
        })
    }


    handleCoverChange = () => {
        $(".inp-file-profile").trigger('click');
    };

    handleJobPlaceChange = (e, img_num, form_id) => {
        let formData = $(`#${form_id}`)[0]
        if (e.target.files && e.target.files[0]) {
            const validFile = { status: true, message: 'select file' };
            if (validFile.status) {
                let reader = new FileReader();
                const file = e.target.files[0];
                reader.onloadend = () => {
                    if (img_num === 1) {
                        this.setState({
                            upPic: reader.result,
                        });
                    } else {
                        this.setState({
                            upPic2: reader.result,
                        });
                    }
                };

                API.UPLOAD.upload(formData).then((response) => {
                    let { status, data, error } = response;
                    if (status) {
                        this.handleUpdateProfile({
                            type: STRINGS.TYPES.PROFILE_UPD.COMPANY_PIC,
                            data: { img_num: img_num, path: data[0].path }
                        })
                    } else {
                        alert(error)
                    }
                })
                this.setState({
                    selFileName: file.name,
                    selFile: file,
                });
                reader.readAsDataURL(file);
            } else {
                //console.log(validFile.message)
            }
        }
    };

    handleProfileChange = (e) => {
        let formData = $("#formData")[0];
        //console.log("imageRes", formData)
        if (e.target.files && e.target.files[0]) {
            const validFile = { status: true, message: 'select file' };
            if (validFile.status) {
                let reader = new FileReader();
                const file = e.target.files[0];
                reader.onloadend = () => {
                    this.setState({
                        upProfilePic: reader.result,
                    });
                };
                API.UPLOAD.upload(formData).then((response) => {
                    let { status, error, data } = response;
                    if (status) {
                        this.handleUpdateProfile({ type: STRINGS.TYPES.PROFILE_UPD.PROFILE_PIC, data: data[0].path })
                    } else {
                        alert(error)
                    }
                })
                reader.readAsDataURL(file);
            } else {
                //console.log(validFile.message);
                alert(validFile.message)
            }
        }
    };

    handleUploadResume = (e) => {
        let resumeData = $("#resumeData")[0];
        //console.log("file", resumeData)
        this.setState({
            isUpdate: true
        })
        API.UPLOAD.upload(resumeData).then((response) => {
            let { status, error, data } = response;
            if (status) {
                this.handleUpdateProfile({ type: STRINGS.TYPES.PROFILE_UPD.RESUME_URL, data: data[0].path })
            } else {
                alert(error)
            }
        })
    };

    handleRemoveResume = (e) => {
        this.setState({
            isUpdate: true
        })
        this.handleUpdateProfile({ type: STRINGS.TYPES.PROFILE_UPD.RESUME_URL, data: "" })
    };

    handleUploadAudio = (e) => {
        let audioData = $("#audioData")[0];
        this.setState({
            isUpdate: true
        })
        API.UPLOAD.upload(audioData).then((response) => {
            let { status, error, data } = response;
            if (status) {
                this.handleUpdateProfile({ type: STRINGS.TYPES.PROFILE_UPD.AUDIO_URL, data: data[0].path })
            } else {
                alert(error)
            }
        })
    };

    handleRemoveAudio = (e) => {
        this.setState({
            isUpdate: true
        })
        this.handleUpdateProfile({ type: STRINGS.TYPES.PROFILE_UPD.AUDIO_URL, data: "" })
    };
    handleUploadVideo = (e) => {
        let videoData = $("#videoData")[0];
        this.setState({
            isUpdate: false
        })
        API.UPLOAD.upload(videoData).then((response) => {
            let { status, error, data } = response;
            if (status) {
                this.handleUpdateProfile({ type: STRINGS.TYPES.PROFILE_UPD.VIDEO_URL, data: data[0].path })
            } else {
                alert(error)
            }
        })
    };
    handleRemoveVideo = (e) => {
        //let videoData = $("#videoData")[0];
        this.setState({
            isUpdate: false
        })
        this.handleUpdateProfile({ type: STRINGS.TYPES.PROFILE_UPD.VIDEO_URL, data: "" })
    };
    handleDownloadResume = (id) => {
        return `https://www.khawateenrozgar.com/webapi/api/download/profile/${id}`
    }

    handleChangeJobOpen = (isJobFindOpen) => {
        this.setState({ isJobFindOpen: !isJobFindOpen })
        this.handleUpdateProfile({ type: STRINGS.TYPES.PROFILE_UPD.JOB_OPEN, data: !isJobFindOpen })

    }

    handleUpdateProfile = async ({ type, data, index }) => {
        if (type === STRINGS.TYPES.PROFILE_UPD.ABOUT) {
            //this.userUpdateObj.about = data
            this.setState(prevState => {
                let userData = prevState.userData;
                userData.about = data
                return { userData: userData }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.ACCOMPLISHMENT) {
            //this.userUpdateObj.about = data
            this.setState(prevState => {
                let userData = prevState.userData;
                userData.accomplishments = data
                return { userData: userData }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.JOB_OPEN) {
            this.setState(prevState => {
                let userData = prevState.userData;
                userData.openforOpportunity = data
                return { userData: userData }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.GENERAL_INFO) {
            this.setState(prevState => {
                let userData = prevState.userData;
                userData = data
                return { userData: userData }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.EXP_INFO) {
            this.setState(prevState => {
                let userData = prevState.userData;
                // let exist = userData.experience[index];
                if (index !== undefined) {
                    userData.experience.splice(index, 1);
                    userData.experience = [...userData.experience, data];
                    // console.log("userUpdate", userData)
                    return { userData: userData, isUpdate: false }
                } else {
                    userData.experience = userData.experience !== null ? [...userData.experience, data] : [data];
                    return { userData: userData, isUpdate: false }
                }

            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.EDU_INFO) {
            this.setState(prevState => {
                let userData = prevState.userData;
                if (index !== undefined) {
                    userData.education.splice(index, 1);
                    userData.education = [...userData.education, data];
                    // console.log("userUpdate", userData)
                    return { userData: userData, isUpdate: false }
                } else {
                    userData.education = userData.education !== null ? [...userData.education, data] : [data];
                    return { userData: userData, isUpdate: false }
                }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.SKILLS) {
            this.setState(prevState => {
                let userData = prevState.userData;
                userData.skills = data
                return { userData: userData, isUpdate: false }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.PROFILE_PIC) {
            this.setState(prevState => {
                let userData = prevState.userData;
                userData.pictureURL = data
                return { userData: userData, isUpdate: false }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.COMPANY_PIC) {
            this.setState(prevState => {
                let userData = prevState.userData;
                if (data.img_num === 1) {
                    userData.companyPicture1 = data.path
                    return { userData: userData, isUpdate: false }
                } else {
                    userData.companyPicture2 = data.path
                    return { userData: userData, isUpdate: false }
                }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.RESUME_URL) {
            this.setState(prevState => {
                let userData = prevState.userData;
                userData.cvurl = data
                return { userData: userData, isUpdate: false }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.AUDIO_URL) {
            this.setState(prevState => {
                let userData = prevState.userData;
                userData.audioCVURL = data
                return { userData: userData, isUpdate: true }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.VIDEO_URL) {
            this.setState(prevState => {
                let userData = prevState.userData;
                userData.videoCVURL = data
                return { userData: userData, isUpdate: false }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.PROJECT) {
            this.setState(prevState => {
                let userData = prevState.userData;
                if (index !== undefined) {
                    userData.accomplishment.splice(index, 1);
                    userData.accomplishment = userData.accomplishment !== null ? [...userData.accomplishment, data] : [data];
                    // console.log("userUpdate", userData)
                    return { userData: userData, isUpdate: false }
                } else {
                    userData.accomplishment = [...userData.accomplishment, data];
                    return { userData: userData, isUpdate: false }
                }
            })
        }
        if (type === STRINGS.TYPES.PROFILE_UPD.COURSE) {
            this.setState(prevState => {
                let userData = prevState.userData;
                if (index !== undefined) {
                    // console.log("userUpdate", data)
                    userData.accomplishment.splice(index, 1);
                    userData.accomplishment = userData.accomplishment !== null ? [...userData.accomplishment, data] : [data];
                    // console.log("userUpdate", userData)
                    return { userData: userData, isUpdate: false }
                } else {
                    userData.accomplishment = userData.accomplishment !== null ? [...userData.accomplishment, data] : [data];
                    return { userData: userData, isUpdate: false }
                }
            })
        }

        // console.log("userUpdate", this.state.userData)
        await this.state.userData
        API.USER.updateUser(this.state.userData).then((response) => {
            // console.log("userUpdate", response)
            let { status, error } = response;
            if (status) {
                this.setState({
                    isUpdate: true
                })
                //alert(!isJobFindOpen ? "You are now open for opportunity" : "You are now close for opportunity")
            } else {
                alert(error)
                this.setState({
                    isUpdate: true
                })
            }
        })
    }

    handleMoreMenuClick = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.setState({
            moreMenuEl: ev.currentTarget
        });
    }

    handleAcceptRejectResume = (type) => {
        if (type === STRINGS.TYPES.JOB_LIST_TYPE.REJECT) {
            API.JOBS.acceptOrReject("Reject", this.props.applicantDetail).then((response) => {
                // console.log("userUpdate", response)
                let { status, error } = response;
                if (status) {
                    window.location.href = `${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${this.props.applicantDetail.jobID}&f=job-applied`
                } else {
                    alert(error)
                }
            })
        } else {
            API.JOBS.acceptOrReject("Accept", this.props.applicantDetail).then((response) => {
                // console.log("userUpdate", response)
                let { status, error } = response;
                if (status) {
                    window.location.href = `${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${this.props.applicantDetail.jobID}&f=job-applied`
                } else {
                    alert(error)
                }
            })
        }
    }

    handleScheduleForInterview = (type) => {
        if (type === STRINGS.TYPES.JOB_LIST_TYPE.SCHEDULE) {
            this.props.applicantDetail.scheduleForInterviewOn = this.scheduleForInterviewOn;
            this.props.applicantDetail.interviewType = this.scheduleIntType;
            // console.log("handleScheduleForInterview", this.props.applicantDetail)
            API.JOBS.scheduleInterview(this.props.applicantDetail).then((response) => {
                // console.log("userUpdate", response)
                let { status, error } = response;
                if (status) {
                    window.location.href = `${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${this.props.applicantDetail.jobID}&f=job-schedule-interview`
                } else {
                    alert(error)
                }
            })
        } else if (type === STRINGS.TYPES.JOB_LIST_TYPE.INTERVIEW) {
            this.props.applicantDetail.InterviewComments = this.interviewComments
            // console.log("handleScheduleForInterview", this.props.applicantDetail)
            API.JOBS.interviewed(this.props.applicantDetail).then((response) => {
                // console.log("userUpdate", response)
                let { status, error } = response;
                if (status) {
                    window.location.href = `${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${this.props.applicantDetail.jobID}&f=job-interviewed`
                } else {
                    alert(error)
                }
            })
        } else if (type === STRINGS.TYPES.JOB_LIST_TYPE.SELECTED) {
            API.JOBS.selected(this.props.applicantDetail).then((response) => {
                // console.log("userUpdate", response)
                let { status, error } = response;
                if (status) {
                    window.location.href = `${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${this.props.applicantDetail.jobID}&f=job-selected`
                } else {
                    alert(error)
                }
            })
        } else if (type === STRINGS.TYPES.JOB_LIST_TYPE.REJECT) {
            // API.JOBS.rejected(this.props.applicantDetail).then((response) => {
            //     console.log("userUpdate", response)
            //     let {status, error} = response;
            //     if (status) {
            //         window.location.href = `${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${this.props.applicantDetail.jobID}&f=job-rejected`
            //     } else {
            //         alert(error)
            //     }
            // })
            API.JOBS.acceptOrReject("Reject", this.props.applicantDetail).then((response) => {
                // console.log("userUpdate", response)
                let { status, error } = response;
                if (status) {
                    window.location.href = `${STRINGS.ROUTES.DASHBOARD.JOB_DETAILS}?id=${this.props.applicantDetail.jobID}&f=job-applied`
                } else {
                    alert(error)
                }
            })
        }
    }


    render() {
        let {
            userData, ddMenu, moreMenuEl, isResponsePending, projectData, projectIndex, courseData, courseIndex, selFileName, upProfilePic, openUpdateProfile, currentProfile, upPic, upPic2, openVideoIntro, isJobFindOpen, selectedExp, selectedEdu, expIndex, eduIndex, isUpdate,
            openAboutModal, openExperienceModal, openEduModal, openSkillsModal, openAddProjectModal, openAddCourseModal, openAccomplishment, openScheduleInterviewOn, openInterviewComments,
        } = this.state;
        // console.log("props", userData)
        // console.log("props", upPic)
        //!$.isEmptyObject(userData)
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    {
                        currentProfile && (
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-breadcrumb-content">
                                        <h4>Profile</h4>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="dashboard-overview">
                        {
                            isResponsePending ?
                                <div className="row">
                                    <div className="col-xl-12 col-md-12 col-sm-12 mb-10">
                                        <div className="profile-box">
                                            <section className="card">
                                                {
                                                    currentProfile ?
                                                        (<div className="card-header cover-photo">
                                                            {/*<div className="card-header-icon top-right-icon rounded-circle">*/}
                                                            {/*    <FontAwesomeIcon icon={faCameraRetro}/>*/}
                                                            {/*</div>*/}
                                                            <div
                                                                className="card-header-icon bottom-left-icon rounded-circle"
                                                                // style={{
                                                                //     fontSize: `${upProfilePic === "" && 'inherit'}`,
                                                                //     left: `${upProfilePic === "" && 'inherit'}`,
                                                                //     padding: `${upProfilePic === "" && '0'}`
                                                                // }}
                                                                style={{
                                                                    fontSize: `inherit`,
                                                                    left: `inherit`,
                                                                    padding: `0`
                                                                }}
                                                                onClick={this.handleCoverChange}>
                                                                <form id="formData" method="POST">
                                                                    <input type="file" className="inp-file-profile"
                                                                        accept="image/*"
                                                                        name="files"
                                                                        multiple
                                                                        onChange={this.handleProfileChange}
                                                                    />
                                                                </form>
                                                                {
                                                                    <img alt="#"
                                                                        src={upProfilePic !== "" ? upProfilePic : defaultUserImg}
                                                                        className={`profile-picture-upload ${currentProfile ? `upload-pic-typo-holder` : ""}`} />
                                                                }
                                                            </div>
                                                            {
                                                                upProfilePic === "" && (
                                                                    <div className="upload-pic-typo"
                                                                        onClick={this.handleCoverChange}>
                                                                        {
                                                                            getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ? "Add Logo Here" : "Upload Profile"
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                        </div>) :
                                                        (<div className="card-header cover-photo">
                                                            <div
                                                                className={`card-header-icon bottom-left-icon rounded-circle ${userData.openforOpportunity ? `isJobOpen` : ''}`}
                                                                style={{
                                                                    fontSize: `${upProfilePic !== "" && 'inherit'}`,
                                                                    left: `${upProfilePic !== "" && 'inherit'}`,
                                                                    padding: `${userData.pictureURL !== undefined && '0'}`
                                                                }}
                                                            >
                                                                {
                                                                    <img alt="#"
                                                                        src={upProfilePic !== "" ? upProfilePic : defaultUserImg}
                                                                        className="profile-picture-upload" />
                                                                    // : <FontAwesomeIcon icon={faCameraRetro}/>
                                                                }
                                                            </div>
                                                        </div>)
                                                }
                                                <div className="card-body">
                                                    <div className="row p-u">
                                                        <div className="col-6 offset-6 text-right">
                                                            <div className="btn-group flex-wrap">
                                                                {!currentProfile &&
                                                                    (<div className="job-actions-btn">
                                                                        {
                                                                            this.props.applicantDetail !== undefined ?
                                                                                this.props.applicantDetail.state === STRINGS.TYPES.JOB_LIST_TYPE.APPLY ?
                                                                                    (
                                                                                        <div className="btn-holder">
                                                                                            <button
                                                                                                className="act-btn accept-btn"
                                                                                                onClick={(e) => {
                                                                                                    this.handleAcceptRejectResume(STRINGS.TYPES.JOB_LIST_TYPE.SELECTED);
                                                                                                    e.preventDefault();
                                                                                                    e.stopPropagation();
                                                                                                }}

                                                                                            >
                                                                                                <FontAwesomeIcon
                                                                                                    title={"Accept"}
                                                                                                    className="check-ic"
                                                                                                    icon={faCheck}
                                                                                                    size={"lg"}
                                                                                                    color={STRINGS.TYPES.COLORS.DEFAULT} />
                                                                                            </button>
                                                                                            <button
                                                                                                className="act-btn reject-btn"
                                                                                                onClick={(e) => {
                                                                                                    this.handleAcceptRejectResume(STRINGS.TYPES.JOB_LIST_TYPE.REJECT);
                                                                                                    e.preventDefault();
                                                                                                    e.stopPropagation();
                                                                                                }}
                                                                                            >
                                                                                                <FontAwesomeIcon
                                                                                                    title={"Reject"}
                                                                                                    className="check-ic"
                                                                                                    icon={faTimes}
                                                                                                    size={"lg"}
                                                                                                    color={STRINGS.TYPES.COLORS.DEFAULT} />
                                                                                            </button>
                                                                                        </div>
                                                                                    ) : this.props.applicantDetail.state === STRINGS.TYPES.JOB_LIST_TYPE.REJECT ?
                                                                                        <div className="flex flex-1 width-100">
                                                                                            <div className="" style={{
                                                                                                backgroundColor: "#db4272",
                                                                                                padding: "8px",
                                                                                                borderRadius: "6px",
                                                                                                color: "white"
                                                                                            }}>
                                                                                                Rejected
                                                                                            </div>
                                                                                        </div>
                                                                                        : this.props.applicantDetail.state === STRINGS.TYPES.JOB_LIST_TYPE.SHORT_LIST ?
                                                                                            (<div className="btn-holder">
                                                                                                <div
                                                                                                    className="flex flex-1 width-100">
                                                                                                    <div className=""
                                                                                                        onClick={(e) => {
                                                                                                            // this.handleScheduleForInterview(STRINGS.TYPES.JOB_LIST_TYPE.SCHEDULE);
                                                                                                            this.setState({
                                                                                                                openScheduleInterviewOn: true
                                                                                                            })
                                                                                                            e.preventDefault();
                                                                                                            e.stopPropagation();
                                                                                                        }}
                                                                                                        style={{
                                                                                                            cursor: "pointer",
                                                                                                            backgroundColor: "#49E56A",
                                                                                                            padding: "8px",
                                                                                                            borderRadius: "6px",
                                                                                                            color: "white"
                                                                                                        }}>
                                                                                                        Schedule for interview
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>)
                                                                                            : this.props.applicantDetail.state === STRINGS.TYPES.JOB_LIST_TYPE.SCHEDULE ?
                                                                                                (<div className="btn-holder">
                                                                                                    <div
                                                                                                        className="flex flex-1 width-100">
                                                                                                        <div className=""
                                                                                                            onClick={(e) => {
                                                                                                                //this.handleScheduleForInterview(STRINGS.TYPES.JOB_LIST_TYPE.INTERVIEW);
                                                                                                                this.setState({
                                                                                                                    openInterviewComments: true
                                                                                                                })
                                                                                                                e.preventDefault();
                                                                                                                e.stopPropagation();
                                                                                                            }}
                                                                                                            style={{
                                                                                                                cursor: "pointer",
                                                                                                                backgroundColor: "#49E56A",
                                                                                                                padding: "8px",
                                                                                                                borderRadius: "6px",
                                                                                                                color: "white"
                                                                                                            }}>
                                                                                                            Interviewed
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>)
                                                                                                : this.props.applicantDetail.state === STRINGS.TYPES.JOB_LIST_TYPE.SELECTED ?
                                                                                                    (<div
                                                                                                        className="btn-holder">
                                                                                                        <div
                                                                                                            className="flex flex-1 width-100">
                                                                                                            <div className=""
                                                                                                                onClick={(e) => {
                                                                                                                    //this.handleScheduleForInterview(STRINGS.TYPES.JOB_LIST_TYPE.SELECTED);
                                                                                                                    e.preventDefault();
                                                                                                                    e.stopPropagation();
                                                                                                                }}
                                                                                                                style={{
                                                                                                                    cursor: "pointer",
                                                                                                                    backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                                                    padding: "8px",
                                                                                                                    borderRadius: "6px",
                                                                                                                    color: "white"
                                                                                                                }}>
                                                                                                                Selected
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>) :
                                                                                                    this.props.applicantDetail.state === STRINGS.TYPES.JOB_LIST_TYPE.INTERVIEW &&
                                                                                                    (<div
                                                                                                        className="btn-holder">
                                                                                                        <div
                                                                                                            className="d-flex flex-1 width-100">
                                                                                                            <div
                                                                                                                className="mr-2"
                                                                                                                onClick={(e) => {
                                                                                                                    this.handleScheduleForInterview(STRINGS.TYPES.JOB_LIST_TYPE.SELECTED);
                                                                                                                    e.preventDefault();
                                                                                                                    e.stopPropagation();
                                                                                                                }}
                                                                                                                style={{
                                                                                                                    cursor: "pointer",
                                                                                                                    backgroundColor: "#49E56A",
                                                                                                                    padding: "8px",
                                                                                                                    borderRadius: "6px",
                                                                                                                    color: "white"
                                                                                                                }}>
                                                                                                                Select
                                                                                                            </div>
                                                                                                            <div
                                                                                                                className="ml-2"
                                                                                                                onClick={(e) => {
                                                                                                                    this.handleScheduleForInterview(STRINGS.TYPES.JOB_LIST_TYPE.REJECT);
                                                                                                                    e.preventDefault();
                                                                                                                    e.stopPropagation();
                                                                                                                }}
                                                                                                                style={{
                                                                                                                    cursor: "pointer",
                                                                                                                    backgroundColor: "#dd1856",
                                                                                                                    padding: "8px",
                                                                                                                    borderRadius: "6px",
                                                                                                                    color: "white"
                                                                                                                }}>
                                                                                                                Reject
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>)
                                                                                : ""
                                                                        }
                                                                        {
                                                                            openScheduleInterviewOn && (
                                                                                <ScheduleInterviewModal
                                                                                    onSave={(dateTime, type) => {
                                                                                        this.scheduleForInterviewOn = dateTime;
                                                                                        this.scheduleIntType = type
                                                                                        this.handleScheduleForInterview(STRINGS.TYPES.JOB_LIST_TYPE.SCHEDULE);
                                                                                    }}
                                                                                    openScheduleInterviewOn={openScheduleInterviewOn}
                                                                                    onClose={
                                                                                        () => this.setState({
                                                                                            openScheduleInterviewOn: false
                                                                                        })
                                                                                    }
                                                                                />
                                                                            )
                                                                        }
                                                                        {
                                                                            openInterviewComments && (
                                                                                <InterviewCommentsModal
                                                                                    onSave={(val) => {
                                                                                        this.interviewComments = val
                                                                                        this.handleScheduleForInterview(STRINGS.TYPES.JOB_LIST_TYPE.INTERVIEW);
                                                                                    }}
                                                                                    openInterviewComments={openInterviewComments}
                                                                                    onClose={
                                                                                        () => this.setState({
                                                                                            openInterviewComments: false
                                                                                        })
                                                                                    } />
                                                                            )
                                                                        }
                                                                    </div>)
                                                                }
                                                            </div>
                                                            {/*<button className="btn btn-default mr-2">More...</button>*/}
                                                            {
                                                                currentProfile && (
                                                                    <NavLink to="#profile-modal"
                                                                        onClick={() => this.handleUpdate(1)}
                                                                        data-toggle="modal">
                                                                        <FontAwesomeIcon title={"Edit"}
                                                                            icon={faPencilAlt} />
                                                                    </NavLink>
                                                                )
                                                            }

                                                        </div>


                                                    </div>
                                                    <div className="row p-u">
                                                        <div className="col-lg-8 col-md-8 col-sm-8">
                                                            {
                                                                currentProfile ?
                                                                    getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                        (
                                                                            <h3 className="fw-600 fs-24"> {userData.company} </h3>) :
                                                                        (
                                                                            <h3 className="fw-600 fs-24">{userData.firstName + " " + userData.lastName}</h3>) :
                                                                    userData.type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                        (
                                                                            <h3 className="fw-600 fs-24">{userData.company}</h3>) :
                                                                        (
                                                                            <h3 className="fw-600 fs-24">{userData.firstName + " " + userData.lastName}</h3>)
                                                            }
                                                            <h3 className="fs-24">{userData.headline}</h3>
                                                            {/*<div className="d-flex flex-row bd-highlight mb-3">*/}
                                                            {/*    <div className="p-2 pl-0">Pakistan</div>*/}
                                                            {/*    <div className="p-2"><NavLink to="#" className="text-primary">100*/}
                                                            {/*        Connections</NavLink></div>*/}
                                                            {/*    <div className="p-2"><NavLink to="#" className="text-primary">Contact*/}
                                                            {/*        Info</NavLink></div>*/}
                                                            {/*</div>*/}
                                                            {
                                                                currentProfile ?
                                                                    getUserData().type === STRINGS.USER_TYPE.APPLICANT_TYPE ?
                                                                        (
                                                                            <div
                                                                                className="d-flex flex-row bd-highlight mb-3 align-items-center">
                                                                                <div
                                                                                    className="d-flex width-100 flex-column">
                                                                                    <div className="p-2 p1-0 d-flex">
                                                                                        <IconButton
                                                                                            aria-owns={moreMenuEl ? 'chats-more-menu' : null}
                                                                                            aria-haspopup="true"
                                                                                            onClick={this.handleMoreMenuClick}
                                                                                        >
                                                                                            <FontAwesomeIcon
                                                                                                title={"Upload"}
                                                                                                icon={faEllipsisV}
                                                                                                color={STRINGS.TYPES.COLORS.DEFAULT} />
                                                                                            <div style={{fontSize:'20px'}} className="ml-2 mr-2">
                                                                                                Upload
                                                                                            </div>
                                                                                        </IconButton>
                                                                                        <Menu
                                                                                            id="chats-more-menu"
                                                                                            anchorEl={moreMenuEl}
                                                                                            open={Boolean(moreMenuEl)}
                                                                                            onClose={() => this.setState({ moreMenuEl: false })}
                                                                                        >
                                                                                            <MenuItem>
                                                                                                <form id="resumeData"
                                                                                                    method="POST">
                                                                                                    <input
                                                                                                        type="file"
                                                                                                        accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                                                                                        multiple
                                                                                                        name="files"
                                                                                                        id="resumeUpload"
                                                                                                        onChange={this.handleUploadResume}
                                                                                                        style={{ display: "none" }}
                                                                                                    />
                                                                                                </form>
                                                                                                <label
                                                                                                    htmlFor="resumeUpload"
                                                                                                    style={{
                                                                                                        width: "100%",
                                                                                                        justifyContent: "center"
                                                                                                    }}>
                                                                                                    {
                                                                                                        isUpdate ?
                                                                                                            <Button
                                                                                                                variant="contained"
                                                                                                                component="span"
                                                                                                                style={{
                                                                                                                    backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                                                    color: "white",
                                                                                                                    fontSize: `14px`
                                                                                                                }}
                                                                                                                sx={{ fontSize: `16px` }}
                                                                                                                startIcon={
                                                                                                                    <CloudUploadIcon />}
                                                                                                            >
                                                                                                                Upload
                                                                                                                Resume
                                                                                                            </Button> :
                                                                                                            <div
                                                                                                                className="spinner-holder">
                                                                                                                <Spinner
                                                                                                                    width={24}
                                                                                                                    height={24}
                                                                                                                    type={"Puff"} />
                                                                                                            </div>
                                                                                                    }
                                                                                                </label>
                                                                                                {
                                                                                                    userData.cvurl !== "" && userData.cvurl !== null ? (
                                                                                                        <a className="downloadWithName"
                                                                                                            target={"_blank"}
                                                                                                            //href={`https://jobwebsite.azurewebsites.net/api/Download/profile/${userData.id}`}
                                                                                                            // href={`https://khawateen.entertechsolutions.com/webapi/api/download/profile/${userData.id}`}
                                                                                                            href={`${CONTENT_URL}/webapi${userData.cvurl}`}
                                                                                                            download
                                                                                                            // onClick={() => $.ajax({
                                                                                                            //     url: `${CONTENT_URL}${userData.cvurl}`,
                                                                                                            //     success: download.bind(true, "application/octet-stream", "dlAjaxCallback.doc")
                                                                                                            // })}
                                                                                                            //  onClick={this.handleDownloadResume}
                                                                                                            style={{
                                                                                                                display: "flex",
                                                                                                                flex: "1"
                                                                                                            }}>

                                                                                                            <IconButton
                                                                                                                component="span"
                                                                                                                // onClick={()=>
                                                                                                                //     downloadResume(`${CONTENT_URL}${userData.cvurl}`,`${userData.firstName}-${userData.lastName}`,`application/vnd.openxmlformats-officedocument.wordprocessingml.document`)
                                                                                                                // }
                                                                                                                style={{ flex: "1" }}>
                                                                                                                <CloudDownloadIcon
                                                                                                                    style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                                <div
                                                                                                                    className="ml-5 " style={{ fontSize: `18px` }}>Download
                                                                                                                    Resume
                                                                                                                </div>
                                                                                                            </IconButton>
                                                                                                        </a>

                                                                                                    ) : <IconButton
                                                                                                        component="span"
                                                                                                        style={{ flex: "1" }}>
                                                                                                        <BlockIcon
                                                                                                            style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                        <div
                                                                                                            className="ml-5" style={{ fontSize: `18px` }}>No
                                                                                                            Resume found
                                                                                                        </div>
                                                                                                    </IconButton>
                                                                                                }

                                                                                                {
                                                                                                    userData.cvurl !== "" && userData.cvurl !== null &&
                                                                                                    <IconButton
                                                                                                        component="span"
                                                                                                        onClick={this.handleRemoveResume}
                                                                                                        style={{ flex: "1" }}>
                                                                                                        <DeleteIcon
                                                                                                            style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                        <div
                                                                                                            className="ml-5" style={{ fontSize: `18px` }}>Remove
                                                                                                            Resume
                                                                                                        </div>
                                                                                                    </IconButton>
                                                                                                }


                                                                                            </MenuItem>
                                                                                            <MenuItem>
                                                                                                <form id="audioData"
                                                                                                    method="POST">
                                                                                                    <input
                                                                                                        type="file"
                                                                                                        multiple
                                                                                                        name="files"
                                                                                                        id="audioUpload"
                                                                                                        onChange={this.handleUploadAudio}
                                                                                                        style={{ display: "none" }}
                                                                                                    />
                                                                                                </form>
                                                                                                <label
                                                                                                    htmlFor="audioUpload"
                                                                                                    style={{
                                                                                                        width: "100%",
                                                                                                        justifyContent: "center"
                                                                                                    }}>
                                                                                                    {
                                                                                                        isUpdate ?
                                                                                                            <Button
                                                                                                                variant="contained"
                                                                                                                component="span"
                                                                                                                onClick={this.handleUploadAudio}
                                                                                                                style={{
                                                                                                                    backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                                                    color: "white",
                                                                                                                    fontSize: `16px`
                                                                                                                }}
                                                                                                                sx={{ fontSize: `16px` }}
                                                                                                                startIcon={
                                                                                                                    <CloudUploadIcon />}
                                                                                                            >
                                                                                                                Upload
                                                                                                                Audio
                                                                                                            </Button>
                                                                                                            : <div
                                                                                                                className="spinner-holder">
                                                                                                                <Spinner
                                                                                                                    width={24}
                                                                                                                    height={24}
                                                                                                                    type={"Puff"} />
                                                                                                            </div>
                                                                                                    }
                                                                                                </label>

                                                                                                {
                                                                                                    userData.audioCVURL !== "" && userData.audioCVURL !== null ? (
                                                                                                        <div
                                                                                                            style={{ margin: "0 12px", width:`100%` }}>
                                                                                                            <AudioPlayerDefault sx={{width:`108%`}}
                                                                                                                src={`${WEB_HOST_URL}/webapi/${userData.audioCVURL}`}
                                                                                                               // href={`${WEB_HOST_URL}/webapi/api/Download/profile/${userData.audioCVURL}`}
                                                                                                            />
                                                                                                            {/* <div
                                                                                                                className="ml-5">
                                                                                                                <IconButton
                                                                                                                    onClick={() =>
                                                                                                                        downloadResume(`${CONTENT_URL}${userData.audioCVURL}`, `${userData.firstName}-${userData.lastName}`, `audio/mp3`)
                                                                                                                        //https://localhost:44338/files/2022/10/37312b70-c6ca-4fb2-a750-f875c2eeadac.mp3

                                                                                                                    }
                                                                                                                    style={{ flex: "1" }}
                                                                                                                >
                                                                                                                    <CloudDownloadIcon
                                                                                                                        style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                                    <div
                                                                                                                        className="ml-5" style={{ fontSize: `18px` }}>Download
                                                                                                                        Audio
                                                                                                                    </div>
                                                                                                                </IconButton>
                                                                                                            </div> */}
                                                                                                        </div>
                                                                                                    ) : <IconButton
                                                                                                        component="span"
                                                                                                        style={{ flex: "1" }}>
                                                                                                        <BlockIcon
                                                                                                            style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                        <div
                                                                                                            className="ml-5" style={{ fontSize: `18px` }}>No
                                                                                                            Audio found
                                                                                                        </div>
                                                                                                    </IconButton>
                                                                                                }

                                                                                                {
                                                                                                    userData.audioCVURL !== "" && userData.audioCVURL !== null &&
                                                                                                    <IconButton
                                                                                                        component="span"
                                                                                                        onClick={this.handleRemoveAudio}
                                                                                                        style={{ flex: "1" }}>
                                                                                                        <DeleteIcon
                                                                                                            style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                        <div
                                                                                                            className="ml-5" style={{ fontSize: `18px` }}>Remove
                                                                                                            Audio
                                                                                                        </div>
                                                                                                    </IconButton>
                                                                                                }

                                                                                            </MenuItem>
                                                                                            <MenuItem>
                                                                                                <form id="videoData"
                                                                                                    method="POST">
                                                                                                    <input
                                                                                                        type="file"
                                                                                                        multiple
                                                                                                        name="files"
                                                                                                        accept="video/mp4"
                                                                                                        id="videoUpload"
                                                                                                        onChange={this.handleUploadVideo}
                                                                                                        style={{ display: "none" }}
                                                                                                    />
                                                                                                </form>
                                                                                                <label
                                                                                                    htmlFor="videoUpload">
                                                                                                    {
                                                                                                        isUpdate ?
                                                                                                            <Button
                                                                                                                variant="contained"
                                                                                                                component="span"
                                                                                                                style={{
                                                                                                                    backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                                                    color: "white",
                                                                                                                    fontSize: `16px`
                                                                                                                }}
                                                                                                                sx={{ fontSize: `16px` }}
                                                                                                                startIcon={
                                                                                                                    <CloudUploadIcon />}
                                                                                                            >
                                                                                                                Upload
                                                                                                                Video
                                                                                                            </Button>
                                                                                                            : <div
                                                                                                                className="spinner-holder">
                                                                                                                <Spinner
                                                                                                                    width={24}
                                                                                                                    height={24}
                                                                                                                    type={"Puff"} />
                                                                                                            </div>
                                                                                                    }
                                                                                                </label>

                                                                                                {
                                                                                                    userData.videoCVURL !== "" && userData.videoCVURL !== null ? (
                                                                                                        <React.Fragment>
                                                                                                            {/*<AudioPlayerDefault*/}
                                                                                                            {/*    src={`${CONTENT_URL}${userData.videoCVURL}`}*/}
                                                                                                            {/*/>*/}
                                                                                                            <IconButton
                                                                                                                onClick={() => this.setState({ openVideoIntro: true })}
                                                                                                                component="span"
                                                                                                                style={{ flex: "1" }}>
                                                                                                                <VisibilityIcon
                                                                                                                    style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                                <div
                                                                                                                    className="ml-5" style={{ fontSize: `18px` }}>View
                                                                                                                    Video
                                                                                                                </div>
                                                                                                            </IconButton>
                                                                                                            {
                                                                                                                openVideoIntro && (
                                                                                                                    <VideoPopUp
                                                                                                                       //href={`${WEB_HOST_URL}/webapi/api/Download/profile/${userData.videoCVURL}`}
                                                                                                                        src={`${WEB_HOST_URL}/webapi/${userData.videoCVURL}`}
                                                                                                                        openVideoIntro={openVideoIntro}
                                                                                                                        onClose={() => this.setState({ openVideoIntro: false })} />
                                                                                                                )
                                                                                                            }
                                                                                                        </React.Fragment>
                                                                                                    ) : <IconButton
                                                                                                        component="span"
                                                                                                        style={{ flex: "1" }}>
                                                                                                        <BlockIcon
                                                                                                            style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                        <div
                                                                                                            className="ml-5" style={{ fontSize: `18px` }}>No
                                                                                                            Video found
                                                                                                        </div>
                                                                                                    </IconButton>
                                                                                                }
                                                                                                {
                                                                                                    userData.videoCVURL !== "" && userData.videoCVURL !== null &&
                                                                                                    <IconButton
                                                                                                        component="span"
                                                                                                        onClick={this.handleRemoveVideo}
                                                                                                        style={{ flex: "1" }}>
                                                                                                        <DeleteIcon
                                                                                                            style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                        <div
                                                                                                            className="ml-5" style={{ fontSize: `18px` }}>Remove
                                                                                                            Video
                                                                                                        </div>
                                                                                                    </IconButton>
                                                                                                }
                                                                                            </MenuItem>
                                                                                        </Menu>
                                                                                        {/*<button type="button"*/}
                                                                                        {/*        className="mb-1 mt-1 mr-1 btn btn-primary"*/}
                                                                                        {/*        onClick={this.handleUploadResumeClick}*/}
                                                                                        {/*>Upload Resume<span*/}
                                                                                        {/*    className="caret"/>*/}
                                                                                        {/*</button>*/}
                                                                                        {/*<a href={sidraResume} download>*/}
                                                                                        {/*    <button type="button"*/}
                                                                                        {/*            className="mb-1 mt-1 mr-1 btn btn-primary"*/}
                                                                                        {/*            onClick={this.handleDownloadResume}*/}
                                                                                        {/*    >Download Resume<span*/}
                                                                                        {/*        className="caret"/>*/}
                                                                                        {/*    </button>*/}
                                                                                        {/*</a>*/}
                                                                                        {/*<a href={sidraAudio} download>*/}
                                                                                        {/*    <button type="button"*/}
                                                                                        {/*            className="mb-1 mt-1 mr-1 btn btn-primary"*/}
                                                                                        {/*            onClick={this.handleDownloadResume}*/}
                                                                                        {/*    >Download Audio<span*/}
                                                                                        {/*        className="caret"/>*/}
                                                                                        {/*    </button>*/}
                                                                                        {/*</a>*/}
                                                                                        {/*<input type="file"*/}
                                                                                        {/*       className="upload-resume"/>*/}
                                                                                        {
                                                                                            this.props.applicantDetail === undefined && (
                                                                                                <div
                                                                                                    className="switch-btn-holder">
                                                                                                    <label
                                                                                                        className="switch">
                                                                                                        <input
                                                                                                            type="checkbox"
                                                                                                            checked={isJobFindOpen}
                                                                                                            onChange={() => this.handleChangeJobOpen(isJobFindOpen)}
                                                                                                        />
                                                                                                        <span
                                                                                                            className="slider round" />
                                                                                                    </label>
                                                                                                    <div
                                                                                                        className="label">Urgently
                                                                                                        searching for
                                                                                                        job
                                                                                                    </div>
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    </div>

                                                                                    <div className="d-flex width-100">
                                                                                        <div
                                                                                            className="d-flex ml-10 mr-10 width-100 flex-wrap flex-column align-items-center">
                                                                                            <div className="d-flex">
                                                                                                <strong>Current
                                                                                                    Position</strong>
                                                                                            </div>
                                                                                            <div className="d-flex">
                                                                                                {`${userData.currentPosition} @ ${userData.company}`}
                                                                                            </div>
                                                                                        </div>
                                                                                        <div
                                                                                            className="d-flex ml-10 mr-10 width-100 flex-wrap flex-column align-items-center">
                                                                                            <div className="d-flex">
                                                                                                <strong>Experience In
                                                                                                    Years</strong>
                                                                                            </div>
                                                                                            <div className="d-flex">
                                                                                                {
                                                                                                    userData.experienceInYears === 0 ?
                                                                                                        `Less then 1 year` :
                                                                                                        userData.experienceInYears === -1 ?
                                                                                                            `Fresher` : `${userData.experienceInYears} Years`
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="p-2">
                                                                                    <NavLink to="#"
                                                                                        className="text-primary">
                                                                                        {selFileName}</NavLink></div>
                                                                            </div>
                                                                        ) :
                                                                        getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE && (
                                                                            <React.Fragment>
                                                                                <div className="flex width-100">
                                                                                    <div
                                                                                        className="flex width-100 flex-1 mt-15 ml-5 mr-5">
                                                                                        <Chip
                                                                                            avatar={
                                                                                                <Avatar
                                                                                                    style={{
                                                                                                        backgroundColor: "white",
                                                                                                        color: "#444444"
                                                                                                    }}
                                                                                                >{userData.numberofEmployees}</Avatar>}
                                                                                            label={"Total No.of employees"}
                                                                                            variant="outlined"
                                                                                            style={{
                                                                                                backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                                color: "white"
                                                                                            }}
                                                                                            icon="none"
                                                                                            size="medium"
                                                                                        />
                                                                                    </div>
                                                                                    <div
                                                                                        className="flex width-100 flex-1 mt-15 mr-5">
                                                                                        <Chip
                                                                                            avatar={
                                                                                                <Avatar
                                                                                                    style={{
                                                                                                        backgroundColor: "white",
                                                                                                        color: "#444444"
                                                                                                    }}
                                                                                                >{userData.numberofEmployeesFemale}
                                                                                                </Avatar>}
                                                                                            label={"Total No. of female employees"}
                                                                                            variant="outlined"
                                                                                            style={{
                                                                                                backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                                color: "white"
                                                                                            }}
                                                                                            icon="none"
                                                                                            size="medium"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </React.Fragment>
                                                                        ) : this.props.applicantDetail !== undefined && (
                                                                            <div className="d-flex flex-row bd-highlight mb-3">
                                                                                <div className="p-2 p1-0 d-flex">
                                                                                    <IconButton
                                                                                        aria-owns={moreMenuEl ? 'chats-more-menu' : null}
                                                                                        aria-haspopup="true"
                                                                                        onClick={this.handleMoreMenuClick}
                                                                                    >
                                                                                        <FontAwesomeIcon title={"Upload"}
                                                                                            icon={faEllipsisV}
                                                                                            color={STRINGS.TYPES.COLORS.DEFAULT} />
                                                                                        <div className="ml-2 mr-2">
                                                                                            Downloads
                                                                                        </div>
                                                                                    </IconButton>
                                                                                    <Menu
                                                                                        id="chats-more-menu"
                                                                                        anchorEl={moreMenuEl}
                                                                                        open={Boolean(moreMenuEl)}
                                                                                        onClose={() => this.setState({ moreMenuEl: false })}
                                                                                    >
                                                                                        <MenuItem>
                                                                                            {
                                                                                                this.props.applicantDetail.cvurl !== "" && this.props.applicantDetail.cvurl !== null ? (
                                                                                                    <a
                                                                                                        //href={`https://jobwebsite.azurewebsites.net/api/Download/profile/${userData.id}`}
                                                                                                        href={`${CONTENT_URL}/webapi${this.props.applicantDetail.cvurl}`}
                                                                                                        //href={`${this.props.applicantDetail.cvurl}`}
                                                                                                        target={"_blank"}

                                                                                                        download style={{
                                                                                                            display: "flex",
                                                                                                            flex: "1"
                                                                                                        }}>

                                                                                                        <IconButton
                                                                                                            component="span"
                                                                                                            // onClick={()=>
                                                                                                            //     downloadResume(userData.cvurl,`${userData.firstName}-${userData.lastName}`,`${userData.cvurl.slice(userData.cvurl.indexOf("."))}`)
                                                                                                            // }
                                                                                                            style={{ flex: "1" }}>
                                                                                                            <CloudDownloadIcon
                                                                                                                style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                            <div
                                                                                                                className="ml-5" style={{ fontSize: `18px`, paddingRight: `20px`, paddingLeft: `20px` }}>Download
                                                                                                                Resume
                                                                                                            </div>
                                                                                                        </IconButton>
                                                                                                    </a>

                                                                                                ) :
                                                                                                    <IconButton component="span"
                                                                                                        title={"Not Available"}
                                                                                                        style={{ flex: "1" }}>
                                                                                                        <BlockIcon
                                                                                                            style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                        <div
                                                                                                            className="ml-5" style={{ fontSize: `18px`, paddingRight: `20px`, paddingLeft: `20px` }}>No
                                                                                                            Resume found
                                                                                                        </div>
                                                                                                    </IconButton>
                                                                                            }
                                                                                        </MenuItem>
                                                                                        <MenuItem>
                                                                                            {
                                                                                                userData.audioCVURL !== "" && userData.audioCVURL !== null ? (
                                                                                                    // <div
                                                                                                    //     style={{margin: "0 12px"}}>
                                                                                                    //     <AudioPlayerDefault
                                                                                                    //         src={`${CONTENT_URL}${userData.audioCVURL}`}
                                                                                                    //     />
                                                                                                    // </div>
                                                                                                    <div
                                                                                                        style={{ margin: "0 12px", width:`100%` }}>
                                                                                                            <AudioPlayerDefault sx={{width:`108%`}}
                                                                                                            //href={`${WEB_HOST_URL}/webapi/api/Download/profile/${userData.audioCVURL}`}
                                                                                                            src={`${WEB_HOST_URL}/webapi/${userData.audioCVURL}`}
                                                                                                        />
                                                                                                        {/* <div className="ml-5">
                                                                                                            <IconButton
                                                                                                                onClick={() =>
                                                                                                                    downloadResume(`${CONTENT_URL}${userData.audioCVURL}`, `${userData.firstName}-${userData.lastName}`, `audio/mp3`)
                                                                                                                }
                                                                                                                style={{ flex: "1" }}
                                                                                                            >
                                                                                                                <CloudDownloadIcon
                                                                                                                    style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                                <div
                                                                                                                    className="ml-5" style={{ fontSize: `18px`, paddingRight: `20px`, paddingLeft: `20px` }}>Download
                                                                                                                    Audio
                                                                                                                </div>
                                                                                                            </IconButton>
                                                                                                        </div> */}
                                                                                                    </div>
                                                                                                ) : <IconButton component="span"
                                                                                                    title={"Not Available"}
                                                                                                    style={{ flex: "1" }}>
                                                                                                    <BlockIcon
                                                                                                        style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                    <div
                                                                                                        className="ml-5" style={{ fontSize: `18px`, paddingRight: `20px`, paddingLeft: `20px` }}>No
                                                                                                        Audio found
                                                                                                    </div>
                                                                                                </IconButton>
                                                                                            }

                                                                                        </MenuItem>
                                                                                        <MenuItem>

                                                                                            {
                                                                                                userData.videoCVURL !== "" && userData.videoCVURL !== null && this.props.applicantDetail.showVideo !== false ? (
                                                                                                    <React.Fragment>
                                                                                                        {/*<AudioPlayerDefault*/}
                                                                                                        {/*    src={`${CONTENT_URL}${userData.videoCVURL}`}*/}
                                                                                                        {/*/>*/}
                                                                                                        <IconButton
                                                                                                            onClick={() => this.setState({ openVideoIntro: true })}
                                                                                                            component="span"
                                                                                                            style={{ flex: "1" }}>
                                                                                                            <VisibilityIcon
                                                                                                                style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                            <div
                                                                                                                className="ml-5" style={{ fontSize: `18px`, paddingRight: `20px`, paddingLeft: `20px` }}>View
                                                                                                                Video
                                                                                                            </div>
                                                                                                        </IconButton>
                                                                                                        {
                                                                                                            openVideoIntro && (
                                                                                                                <VideoPopUp
                                                                                                                    // href={`${WEB_HOST_URL}/webapi/api/Download/profile/${userData.videoCVURL}`}
                                                                                                                    src={`${WEB_HOST_URL}/webapi/${userData.videoCVURL}`}
                                                                                                                    openVideoIntro={openVideoIntro}
                                                                                                                    onClose={() => this.setState({ openVideoIntro: false })} />
                                                                                                            )
                                                                                                        }
                                                                                                    </React.Fragment>
                                                                                                ) : <IconButton component="span"
                                                                                                    title={"Not Available"}
                                                                                                    style={{ flex: "1" }}>
                                                                                                    <BlockIcon
                                                                                                        style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                                                                    <div
                                                                                                        className="ml-5" style={{ fontSize: `18px`, paddingRight: `20px`, paddingLeft: `20px` }}>No
                                                                                                        Video found
                                                                                                    </div>
                                                                                                </IconButton>
                                                                                            }

                                                                                        </MenuItem>
                                                                                    </Menu>
                                                                                    {/*<button type="button"*/}
                                                                                    {/*        className="mb-1 mt-1 mr-1 btn btn-primary"*/}
                                                                                    {/*        onClick={this.handleUploadResumeClick}*/}
                                                                                    {/*>Upload Resume<span*/}
                                                                                    {/*    className="caret"/>*/}
                                                                                    {/*</button>*/}
                                                                                    {/*<a href={sidraResume} download>*/}
                                                                                    {/*    <button type="button"*/}
                                                                                    {/*            className="mb-1 mt-1 mr-1 btn btn-primary"*/}
                                                                                    {/*            onClick={this.handleDownloadResume}*/}
                                                                                    {/*    >Download Resume<span*/}
                                                                                    {/*        className="caret"/>*/}
                                                                                    {/*    </button>*/}
                                                                                    {/*</a>*/}
                                                                                    {/*<a href={sidraAudio} download>*/}
                                                                                    {/*    <button type="button"*/}
                                                                                    {/*            className="mb-1 mt-1 mr-1 btn btn-primary"*/}
                                                                                    {/*            onClick={this.handleDownloadResume}*/}
                                                                                    {/*    >Download Audio<span*/}
                                                                                    {/*        className="caret"/>*/}
                                                                                    {/*    </button>*/}
                                                                                    {/*</a>*/}
                                                                                    {/*<input type="file"*/}
                                                                                    {/*       className="upload-resume"/>*/}
                                                                                    {
                                                                                        this.props.applicantDetail === undefined && (
                                                                                            <div className="switch-btn-holder">
                                                                                                <label className="switch">
                                                                                                    <input type="checkbox"
                                                                                                        checked={isJobFindOpen}
                                                                                                        onChange={() => this.handleChangeJobOpen(isJobFindOpen)}
                                                                                                    />
                                                                                                    <span
                                                                                                        className="slider round" />
                                                                                                </label>
                                                                                                <div className="label">Open To
                                                                                                    Finding a
                                                                                                    new job
                                                                                                </div>
                                                                                            </div>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                                <div className="p-2">
                                                                                    <NavLink to="#" className="text-primary">
                                                                                        {selFileName}</NavLink></div>
                                                                                <div
                                                                                    className="d-flex width-100 flex-wrap flex-column align-items-center">
                                                                                    <div className="d-flex">
                                                                                        <strong>Experience In Years</strong>
                                                                                    </div>
                                                                                    <div className="d-flex">
                                                                                        {
                                                                                            userData.experienceInYears === 0 ?
                                                                                                `Less then 1 year` :
                                                                                                userData.experienceInYears === -1 ?
                                                                                                    `Fresher` : `${userData.experienceInYears} Years`
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )

                                                            }
                                                            {
                                                                this.props.isCompany !== undefined && this.props.isCompany && (
                                                                    <React.Fragment>
                                                                        <div className="flex width-100">
                                                                            <div
                                                                                className="flex width-100 flex-1 mt-15 ml-5 mr-5">
                                                                                <Chip
                                                                                    avatar={
                                                                                        <Avatar
                                                                                            style={{
                                                                                                backgroundColor: "white",
                                                                                                color: "#444444"
                                                                                            }}
                                                                                        >{userData.numberofEmployees}</Avatar>}
                                                                                    label={"Total No.of employees"}
                                                                                    variant="outlined"
                                                                                    style={{
                                                                                        backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                        color: "white"
                                                                                    }}
                                                                                    icon="none"
                                                                                    size="medium"
                                                                                />
                                                                            </div>
                                                                            <div
                                                                                className="flex width-100 flex-1 mt-15 mr-5">
                                                                                <Chip
                                                                                    avatar={
                                                                                        <Avatar
                                                                                            style={{
                                                                                                backgroundColor: "white",
                                                                                                color: "#444444"
                                                                                            }}
                                                                                        >{userData.numberofEmployeesFemale}
                                                                                        </Avatar>}
                                                                                    label={"Total No. of female employees"}
                                                                                    variant="outlined"
                                                                                    style={{
                                                                                        backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                                        color: "white"
                                                                                    }}
                                                                                    icon="none"
                                                                                    size="medium"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </React.Fragment>
                                                                )
                                                            }

                                                        </div>
                                                        <div className="col-lg-4 col-md-4 col-sm-4" style={{maxWidth:`100%`}}>
                                                            <ul>
                                                                {/* <li className="uli"><NavLink to="#">
                                                                    <FontAwesomeIcon title={"Email"} icon={faEnvelope}
                                                                        className="fa fa-building top-" /> {userData.email}
                                                                </NavLink>
                                                                </li>
                                                                <li className="uli"><NavLink to="#">
                                                                    <FontAwesomeIcon title={"Phone Number"}
                                                                        icon={faPhone}
                                                                        className="fa fa-building top-" /> {userData.phone}
                                                                </NavLink>
                                                                </li> */}
                                             
                                                                {
                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                                        <li className="uli"><NavLink to="#">
                                                                            <FontAwesomeIcon title={"Company"}
                                                                                icon={faBuilding}
                                                                                className="fa fa-building top-" /> {userData.company}
                                                                        </NavLink>
                                                                        </li>
                                                                    )
                                                                }
                                                                <li className="uli"><NavLink to="#"><FontAwesomeIcon
                                                                    title={"City"}
                                                                    icon={faCity} /> {userData.city}
                                                                </NavLink>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>

                                            {/*<!-- Modal Area Start -->*/}
                                            {
                                                openUpdateProfile ?
                                                    <UpdateProfileModal data={userData}
                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                        openUpdateProfile={openUpdateProfile}
                                                        onClose={this.onClose} />
                                                    : ''
                                            }
                                            {/* <!-- Modal Area End -->*/}
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-md-12 col-sm-12 mb-10">
                                        <div className="profile-box">
                                            <div className="profile-box about-widget">

                                                <section className="card">
                                                    <header className="card-header">
                                                        <h2 className="card-title float-left">About</h2>
                                                        {/*<NavLink to="#about-modal" data-toggle="modal"*/}
                                                        {/*         className="float-right mt-5"*/}
                                                        {/*         onClick={() => this.handleUpdate(2)}>*/}
                                                        {/*    <FontAwesomeIcon icon={faPlus}/>*/}
                                                        {/*</NavLink>*/}
                                                    </header>
                                                    <div className="card-body">
                                                        <div className="first-widget">
                                                            <div className="icon mr-15 rounded-circle">
                                                                <FontAwesomeIcon title={"About"}
                                                                    style={{ fontSize: '32px' }}
                                                                    icon={faBook} />
                                                            </div>

                                                            {
                                                                userData.about !== undefined &&
                                                                <div className="content">
                                                                    {
                                                                        currentProfile && (
                                                                            <NavLink to="#about-modal"
                                                                                data-toggle="modal"
                                                                                className="action-edit"
                                                                                onClick={() => this.handleUpdate(2)}>
                                                                                <FontAwesomeIcon title={"Edit"}
                                                                                    icon={faPencilAlt} />
                                                                            </NavLink>
                                                                        )
                                                                    }
                                                                    <p>{userData.about}</p>
                                                                </div>

                                                            }
                                                        </div>
                                                    </div>
                                                </section>
                                                {/*<!-- Modal Area Start -->*/}
                                                {
                                                    openAboutModal &&
                                                    (<AboutModal defaultVal={userData.about}
                                                        openAboutModal={openAboutModal}
                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                        onClose={this.onClose} />
                                                    )
                                                }
                                                {/*<!-- Modal Area End -->*/}
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        currentProfile ?
                                            getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                (<React.Fragment>
                                                    <div className="col-xl-12 col-md-12 col-sm-12 mb-10">
                                                        <div className="profile-box experience-widget">

                                                            <section className="card">
                                                                <header className="card-header">
                                                                    <h2 className="card-title float-left">Experience</h2>
                                                                    {
                                                                        currentProfile && (
                                                                            <NavLink to="#experience-modal"
                                                                                data-toggle="modal"
                                                                                className="float-right mt-5"
                                                                                onClick={() => {
                                                                                    this.handleUpdate(3)
                                                                                }}>
                                                                                <FontAwesomeIcon title={"Add"}
                                                                                    icon={faPlus} />
                                                                            </NavLink>
                                                                        )
                                                                    }
                                                                </header>
                                                                <div className="card-body">
                                                                    {/*<div className="first-widget">*/}
                                                                    {/*    <div className="icon mr-15 rounded-circle">*/}
                                                                    {/*        <FontAwesomeIcon style={{fontSize: '32px'}} icon={faBuilding}/>*/}
                                                                    {/*    </div>*/}
                                                                    {/*    <div className="content">*/}
                                                                    {/*        <NavLink to="#experience-modal" data-toggle="modal"*/}
                                                                    {/*                 className="action-edit" onClick={() => this.handleUpdate(3)}>*/}
                                                                    {/*            <FontAwesomeIcon icon={faPencilAlt}/> </NavLink>*/}
                                                                    {/*        <h3>ABC & Co</h3>*/}
                                                                    {/*        <p>10 years 9 months</p>*/}
                                                                    {/*    </div>*/}
                                                                    {/*</div>*/}
                                                                    <div className="timeline">
                                                                        <div className="tm-body">
                                                                            <ol className="tm-items">
                                                                                {
                                                                                    isUpdate ?
                                                                                        userData.experience !== null && userData.experience.length > 0 ?
                                                                                            userData.experience.map((exp, index) =>
                                                                                                <li>
                                                                                                    <div
                                                                                                        className="tm-info">
                                                                                                        <div
                                                                                                            className="tm-icon">
                                                                                                            {/*<FontAwesomeIcon icon={faCircle}/>*/}
                                                                                                            <div
                                                                                                                className="icon rounded-circle">
                                                                                                                <FontAwesomeIcon
                                                                                                                    title={"Experience"}
                                                                                                                    style={{ fontSize: '32px' }}
                                                                                                                    icon={faBuilding} />
                                                                                                            </div>
                                                                                                        </div>

                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="tm-box position-relative">
                                                                                                        <p className="mb-0">{exp.title}<strong> ( {exp.company} )</strong>
                                                                                                        </p>
                                                                                                        {/*<p>Sep 2010 - Present 10 years 1 month</p>*/}
                                                                                                        <p>
                                                                                                            {parseDateWithMontAndYear(parseDate(new Date(exp.startDate)))} -
                                                                                                            {exp.isCurrentlyWorking ? " Present" : parseDateWithMontAndYear(parseDate(new Date(exp.endDate)))}
                                                                                                        </p>
                                                                                                        <div
                                                                                                            className="exp-edit">
                                                                                                            {
                                                                                                                currentProfile && (
                                                                                                                    <NavLink
                                                                                                                        to="#experience-modal"
                                                                                                                        data-toggle="modal"
                                                                                                                        className="action-edit"
                                                                                                                        onClick={() => {
                                                                                                                            this.handleUpdate(3)
                                                                                                                            this.setState({
                                                                                                                                selectedExp: exp,
                                                                                                                                expIndex: index
                                                                                                                            })
                                                                                                                        }}>
                                                                                                                        <FontAwesomeIcon
                                                                                                                            title={"Edit"}
                                                                                                                            icon={faPencilAlt} />
                                                                                                                    </NavLink>
                                                                                                                )
                                                                                                            }
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </li>
                                                                                            ) : "" :
                                                                                        <div className="spinner-holder">
                                                                                            <Spinner width={50}
                                                                                                height={100}
                                                                                                type={"Puff"} />
                                                                                        </div>
                                                                                }
                                                                            </ol>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            {/*<!-- Modal Area Start -->*/}
                                                            {
                                                                openExperienceModal ?
                                                                    <ExperienceModal
                                                                        openExperienceModal={openExperienceModal}
                                                                        data={selectedExp} index={expIndex}
                                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                        onClose={this.onClose}
                                                                    /> : ""
                                                            }
                                                            {/*<!-- Modal Area End -->*/}
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-12 col-md-12 col-sm-12 mb-10">
                                                        <div className="profile-box education-widget mb-30">

                                                            <section className="card">
                                                                <header className="card-header">
                                                                    <h2 className="card-title float-left">Education</h2>
                                                                    {
                                                                        currentProfile && (
                                                                            <NavLink to="#education-modal"
                                                                                onClick={() => this.handleUpdate(4)}
                                                                                data-toggle="modal"
                                                                                className="float-right mt-5">
                                                                                <FontAwesomeIcon title={"Add"}
                                                                                    icon={faPlus} />
                                                                            </NavLink>
                                                                        )
                                                                    }
                                                                </header>

                                                                {
                                                                    userData.education !== null && userData.education.length > 0 ?
                                                                        userData.education.map((us, index) =>
                                                                            <div className="card-body">
                                                                                <div className="first-widget">
                                                                                    <div
                                                                                        className="icon mr-15 rounded-circle">
                                                                                        <FontAwesomeIcon
                                                                                            title={"Education"}
                                                                                            style={{ fontSize: '32px' }}
                                                                                            icon={faUniversity} />
                                                                                    </div>
                                                                                    <div className="content">
                                                                                        {
                                                                                            currentProfile && (
                                                                                                <NavLink
                                                                                                    to="#education-modal"
                                                                                                    data-toggle="modal"
                                                                                                    className="action-edit"
                                                                                                    onClick={() => {
                                                                                                        this.handleUpdate(4)
                                                                                                        this.setState({
                                                                                                            selectedEdu: us,
                                                                                                            eduIndex: index
                                                                                                        })
                                                                                                    }}>
                                                                                                    <FontAwesomeIcon
                                                                                                        title={"Edit"}
                                                                                                        icon={faPencilAlt} />
                                                                                                </NavLink>
                                                                                            )
                                                                                        }
                                                                                        <h3>{us.qualification}
                                                                                            <strong> ( {us.school} ) </strong>
                                                                                        </h3>
                                                                                        <p>{us.description}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) :
                                                                        ""
                                                                }
                                                            </section>
                                                            {/*<!-- Modal Area Start -->*/}
                                                            {
                                                                openEduModal ?
                                                                    <EducationModal
                                                                        openEduModal={openEduModal}
                                                                        data={selectedEdu} index={eduIndex}
                                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                        onClose={this.onClose}
                                                                    /> : ''
                                                            }
                                                            {/*<!-- Modal Area End -->*/}
                                                        </div>
                                                        <div className="profile-box skills-widget mb-30">
                                                            <section className="card">
                                                                <header className="card-header">
                                                                    <h2 className="card-title float-left">Skills</h2>
                                                                    {
                                                                        currentProfile && (
                                                                            <NavLink to="#skills-modal"
                                                                                data-toggle="modal"
                                                                                className="float-right mt-5"
                                                                                onClick={() => this.handleUpdate(5)}>
                                                                                <FontAwesomeIcon title={"Add"}
                                                                                    icon={faPlus} />
                                                                            </NavLink>
                                                                        )
                                                                    }
                                                                </header>
                                                                <div className="card-body">
                                                                    <ul className="skill-list">
                                                                        <React.Fragment>
                                                                            {
                                                                                userData.skills !== null && userData.skills.length > 0 ?
                                                                                    userData.skills.map((skl) =>
                                                                                        <li>
                                                                                            <div>
                                                                                                <h3>{skl}</h3>
                                                                                            </div>
                                                                                        </li>
                                                                                    ) : ""
                                                                            }
                                                                        </React.Fragment>
                                                                    </ul>
                                                                </div>
                                                            </section>
                                                            {/*<!-- Modal Area Start -->*/}
                                                            {
                                                                openSkillsModal ?
                                                                    <SkillsModal
                                                                        selectedOption={userData.skills}
                                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                        onClose={this.onClose}
                                                                        openSkillsModal={openSkillsModal}
                                                                    />
                                                                    : ''
                                                            }
                                                            {/*<!-- Modal Area End -->*/}
                                                        </div>

                                                        <div className="profile-box accomplishment-widget mb-30">
                                                            <section className="card">
                                                                <header className="card-header">
                                                                    <h2 className="card-title float-left">Accomplishment</h2>
                                                                    {
                                                                        currentProfile && (
                                                                            <NavLink to="#"
                                                                                className="float-right mt-5 dropdown-toggle"
                                                                                // onClick={() => this.setState({ddMenu: !ddMenu})}
                                                                                onClick={() => this.setState({ openAccomplishment: true })}
                                                                                data-toggle="dropdown"><FontAwesomeIcon
                                                                                    title={"Add"}
                                                                                    icon={faPlus} />
                                                                            </NavLink>
                                                                        )
                                                                    }
                                                                    {/*<div className={`dropdown-menu ${ddMenu && `show`}`}*/}
                                                                    {/*     style={{transform: `${ddMenu && `translate3d(995px, -10px, 0px)`}`}}//714px*/}
                                                                    {/*     role="menu">*/}
                                                                    {/*    <div className="dropdown-item text-1"*/}
                                                                    {/*         data-toggle="modal"*/}
                                                                    {/*         onClick={() => this.handleUpdate(7)}>Course*/}
                                                                    {/*    </div>*/}
                                                                    {/*    <div className="dropdown-item text-1"*/}
                                                                    {/*         data-toggle="modal"*/}
                                                                    {/*         onClick={() => this.handleUpdate(6)}>Project*/}
                                                                    {/*    </div>*/}
                                                                    {/*</div>*/}
                                                                </header>
                                                                <div className="card-body">
                                                                    <div className="project-list">
                                                                        <h3 className="text-primary">Summary<span
                                                                            className="badge text-primary">{
                                                                                userData.accomplishment !== null && userData.accomplishment.length > 0 &&
                                                                                (userData.accomplishment.filter((acc) => acc.type === STRINGS.TYPES.ACCOMPLISHMENT.PROJECT).length)
                                                                            }</span>
                                                                        </h3>
                                                                        <ul>
                                                                            <li style={{ position: "relative" }}>
                                                                                <p>{userData.accomplishments}</p>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    {/*<div className="project-list">*/}
                                                                    {/*    <h3 className="text-primary">Projects<span*/}
                                                                    {/*        className="badge text-primary">{*/}
                                                                    {/*        userData.accomplishment !== null && userData.accomplishment.length > 0 &&*/}
                                                                    {/*        (userData.accomplishment.filter((acc) => acc.type === STRINGS.TYPES.ACCOMPLISHMENT.PROJECT).length)*/}
                                                                    {/*    }</span>*/}
                                                                    {/*    </h3>*/}
                                                                    {/*    <ul>*/}
                                                                    {/*        {*/}
                                                                    {/*            userData.accomplishment !== null && userData.accomplishment.length > 0 ?*/}
                                                                    {/*                userData.accomplishment.map((acc, index) =>*/}
                                                                    {/*                    acc.type === STRINGS.TYPES.ACCOMPLISHMENT.PROJECT && (*/}
                                                                    {/*                        <li style={{position: "relative"}}>*/}
                                                                    {/*                            <React.Fragment>*/}
                                                                    {/*                                {*/}
                                                                    {/*                                    currentProfile && (*/}
                                                                    {/*                                        <NavLink*/}
                                                                    {/*                                            to="#add-project-modal"*/}
                                                                    {/*                                            onClick={() => {*/}
                                                                    {/*                                                this.handleUpdate(6);*/}
                                                                    {/*                                                this.setState({*/}
                                                                    {/*                                                    projectData: acc,*/}
                                                                    {/*                                                    projectIndex: index*/}
                                                                    {/*                                                })*/}
                                                                    {/*                                            }}*/}
                                                                    {/*                                            data-toggle="modal"*/}
                                                                    {/*                                            className="action-edit"><FontAwesomeIcon*/}
                                                                    {/*                                            title={"Edit"}*/}
                                                                    {/*                                            icon={faPencilAlt}/>*/}
                                                                    {/*                                        </NavLink>*/}
                                                                    {/*                                    )*/}
                                                                    {/*                                }*/}
                                                                    {/*                                <h3><span>{acc.name}</span>*/}
                                                                    {/*                                </h3>*/}
                                                                    {/*                                <p> {parseDateWithMontAndYear(parseDate(new Date(acc.startDate)))}*/}
                                                                    {/*                                    <FontAwesomeIcon*/}
                                                                    {/*                                        title={"Description"}*/}
                                                                    {/*                                        icon={faMinus}/> {parseDateWithMontAndYear(parseDate(new Date(acc.startDate)))}*/}
                                                                    {/*                                </p>*/}
                                                                    {/*                                <p> {acc.description} </p>*/}
                                                                    {/*                                <Link*/}
                                                                    {/*                                    to={`${acc.projectURL}`}*/}
                                                                    {/*                                    target="_blank"*/}
                                                                    {/*                                    className="text-primary">See*/}
                                                                    {/*                                    Projects</Link>*/}
                                                                    {/*                            </React.Fragment>*/}
                                                                    {/*                        </li>*/}
                                                                    {/*                    )*/}
                                                                    {/*                ) : ""*/}
                                                                    {/*        }*/}
                                                                    {/*    </ul>*/}
                                                                    {/*</div>*/}
                                                                    {/*<div className="course-list">*/}
                                                                    {/*    <h3 className="text-primary">Course<span*/}
                                                                    {/*        className="badge text-primary">{*/}
                                                                    {/*        userData.accomplishment !== null && userData.accomplishment.length > 0 &&*/}
                                                                    {/*        (userData.accomplishment.filter((acc) => acc.type === STRINGS.TYPES.ACCOMPLISHMENT.COURSES).length)*/}
                                                                    {/*    }</span>*/}
                                                                    {/*    </h3>*/}
                                                                    {/*    <ul>*/}
                                                                    {/*        {*/}
                                                                    {/*            userData.accomplishment !== null && userData.accomplishment.length > 0 ?*/}
                                                                    {/*                userData.accomplishment.map((acc, index) =>*/}
                                                                    {/*                    acc.type === STRINGS.TYPES.ACCOMPLISHMENT.COURSES && (*/}
                                                                    {/*                        <li>*/}
                                                                    {/*                            <div>*/}
                                                                    {/*                                {*/}
                                                                    {/*                                    currentProfile && (*/}
                                                                    {/*                                        <NavLink*/}
                                                                    {/*                                            className="action-edit"*/}
                                                                    {/*                                            onClick={() => {*/}
                                                                    {/*                                                this.handleUpdate(7);*/}
                                                                    {/*                                                this.setState({*/}
                                                                    {/*                                                    courseData: acc,*/}
                                                                    {/*                                                    courseIndex: index*/}
                                                                    {/*                                                })*/}
                                                                    {/*                                            }}*/}
                                                                    {/*                                            data-toggle="modal"*/}
                                                                    {/*                                            to="#add-course-modal"><FontAwesomeIcon*/}
                                                                    {/*                                            title={"Edit"}*/}
                                                                    {/*                                            icon={faPencilAlt}/>*/}
                                                                    {/*                                        </NavLink>*/}
                                                                    {/*                                    )*/}
                                                                    {/*                                }*/}
                                                                    {/*                                <h3>{acc.name}</h3>*/}
                                                                    {/*                            </div>*/}
                                                                    {/*                        </li>*/}
                                                                    {/*                    )*/}
                                                                    {/*                ) : ""*/}
                                                                    {/*        }*/}

                                                                    {/*    </ul>*/}
                                                                    {/*</div>*/}
                                                                </div>
                                                            </section>
                                                            {/*<!-- Modal Area Start -->*/}
                                                            {
                                                                openAddProjectModal ?
                                                                    <ProjectModal
                                                                        type={STRINGS.TYPES.ACCOMPLISHMENT.PROJECT}
                                                                        data={projectData}
                                                                        index={projectIndex}
                                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                        openAddProjectModal={openAddProjectModal}
                                                                        onClose={this.onClose}
                                                                    /> : ''
                                                            }
                                                            {
                                                                openAddCourseModal ?
                                                                    <CoursesModal
                                                                        type={STRINGS.TYPES.ACCOMPLISHMENT.COURSES}
                                                                        data={courseData}
                                                                        index={courseIndex}
                                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                        openAddCourseModal={openAddCourseModal}
                                                                        onClose={this.onClose}
                                                                    />
                                                                    : ''
                                                            }
                                                            {
                                                                openAccomplishment &&
                                                                <AccomplishmentModal
                                                                    defaultVal={userData.accomplishments}
                                                                    openAccomplishment={openAccomplishment}
                                                                    onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                    onClose={this.onClose}
                                                                />

                                                            }
                                                            {/*<!-- Modal Area End -->*/}
                                                        </div>
                                                    </div>
                                                </React.Fragment>)
                                                :
                                                (<React.Fragment>
                                                    <div className="col-xl-12 col-md-12 col-sm-12 mb-10">
                                                        <div className="profile-box experience-widget">
                                                            <section className="card">
                                                                <header className="card-header">
                                                                    <h2 className="card-title float-left">Company
                                                                        Info</h2>
                                                                </header>
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-lg-6">
                                                                            {/*<!-- Single Input Start -->*/}
                                                                            <div className="single-input mb-25">
                                                                                <label htmlFor="job_detail">Office
                                                                                    Place
                                                                                    1</label>
                                                                                <div className="uploadImage"
                                                                                    onClick={() => {
                                                                                        $(".img_num1").trigger("click");
                                                                                    }}>
                                                                                    <div
                                                                                        className="change-image" style={{width:`30%`, height:`80px`, backgroundColor:`black`, padding:`25px 25px`, fontSize:`15px` }}>Upload
                                                                                        Picture
                                                                                    </div>
                                                                                    <form id="formData1"
                                                                                        mathod="POST">
                                                                                        <input
                                                                                            style={{ display: "none" }}
                                                                                            accept=".jpg, .jpeg, .gif, .bmp, .png"
                                                                                            type="file"
                                                                                            name="files"
                                                                                            className="img_num1"
                                                                                            title="Upload Picture"
                                                                                            multiple
                                                                                            onChange={(e) => this.handleJobPlaceChange(e, 1, "formData1")} />
                                                                                    </form>
                                                                                    <img alt='#'
                                                                                        src={upPic ? upPic : defaultUploadImg}
                                                                                        id="userImg" />
                                                                                </div>
                                                                            </div>
                                                                            {/*<!-- Single Input End -->*/}
                                                                        </div>
                                                                        <div className="col-lg-6">
                                                                            {/*<!-- Single Input Start -->*/}
                                                                            <div className="single-input mb-25">
                                                                                <label htmlFor="job_detail">Office
                                                                                    Place
                                                                                    2</label>
                                                                                <div className="uploadImage"
                                                                                    onClick={() => {
                                                                                        $(".img_num2").trigger("click");
                                                                                    }}>
                                                                                    <div
                                                                                        className="change-image" style={{width:`30%`, height:`80px`, backgroundColor:`black`, padding:`25px 25px`, fontSize:`15px` }}>Upload
                                                                                        Picture
                                                                                    </div>
                                                                                    <form id="formData2"
                                                                                        mathod="POST">
                                                                                        <input
                                                                                            accept=".jpg, .jpeg, .gif, .bmp, .png"
                                                                                            type="file"
                                                                                            name="files"
                                                                                            className="img_num2"
                                                                                            title="Upload Picture"
                                                                                            style={{ display: "none" }}
                                                                                            onChange={(e) => this.handleJobPlaceChange(e, 2, "formData2")} />
                                                                                    </form>
                                                                                    <img alt='#'
                                                                                        src={upPic2 ? upPic2 : defaultUploadImg}
                                                                                        id="userImg" />
                                                                                </div>
                                                                            </div>
                                                                            {/*<!-- Single Input End -->*/}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-12 col-md-12 col-sm-12 mb-10">
                                                        <div className="profile-box experience-widget">
                                                            <section className="card">
                                                                <header className="card-header">
                                                                    <h2 className="card-title float-left">Company
                                                                        Location</h2>
                                                                </header>
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-lg-12">
                                                                            <div className="modal-map-holder">
                                                                                <GMap
                                                                                    defaultCoordinates={userData.companyLocation}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                                ) :
                                            userData.type === STRINGS.USER_TYPE.APPLICANT_TYPE && (
                                                <React.Fragment>
                                                    <div className="col-xl-12 col-md-12 col-sm-12 mb-10">
                                                        <div className="profile-box experience-widget">

                                                            <section className="card">
                                                                <header className="card-header">
                                                                    <h2 className="card-title float-left">Experience</h2>
                                                                    {
                                                                        currentProfile && (
                                                                            <NavLink to="#experience-modal"
                                                                                data-toggle="modal"
                                                                                className="float-right mt-5"
                                                                                onClick={() => {
                                                                                    this.handleUpdate(3)
                                                                                }}>
                                                                                <FontAwesomeIcon title={"Add"}
                                                                                    icon={faPlus} />
                                                                            </NavLink>
                                                                        )
                                                                    }
                                                                </header>
                                                                <div className="card-body">

                                                                    <div className="timeline">
                                                                        <div className="tm-body">
                                                                            <ol className="tm-items">
                                                                                {
                                                                                    isUpdate ?
                                                                                        userData.experience !== null && userData.experience.length > 0 ?
                                                                                            userData.experience.map((exp, index) =>
                                                                                                <li>
                                                                                                    <div
                                                                                                        className="tm-info">
                                                                                                        <div
                                                                                                            className="tm-icon">
                                                                                                            {/*<FontAwesomeIcon icon={faCircle}/>*/}
                                                                                                            <div
                                                                                                                className="icon rounded-circle">
                                                                                                                <FontAwesomeIcon
                                                                                                                    title={"Experience"}
                                                                                                                    style={{ fontSize: '32px' }}
                                                                                                                    icon={faBuilding} />
                                                                                                            </div>
                                                                                                        </div>

                                                                                                    </div>
                                                                                                    <div
                                                                                                        className="tm-box position-relative">
                                                                                                        <p className="mb-0">{exp.title}<strong> ( {exp.company} )</strong>
                                                                                                        </p>
                                                                                                        {/*<p>Sep 2010 - Present 10 years 1 month</p>*/}
                                                                                                        <p>{parseDateWithMontAndYear(parseDate(new Date(exp.startDate)))} - {parseDateWithMontAndYear(parseDate(new Date(exp.endDate)))}</p>
                                                                                                        <div
                                                                                                            className="exp-edit">
                                                                                                            {
                                                                                                                currentProfile && (
                                                                                                                    <NavLink
                                                                                                                        to="#experience-modal"
                                                                                                                        data-toggle="modal"
                                                                                                                        className="action-edit"
                                                                                                                        onClick={() => {
                                                                                                                            this.handleUpdate(3)
                                                                                                                            this.setState({
                                                                                                                                selectedExp: exp,
                                                                                                                                expIndex: index
                                                                                                                            })
                                                                                                                        }}>
                                                                                                                        <FontAwesomeIcon
                                                                                                                            title={"Edit"}
                                                                                                                            icon={faPencilAlt} />
                                                                                                                    </NavLink>
                                                                                                                )
                                                                                                            }
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </li>
                                                                                            ) : "" :
                                                                                        <div className="spinner-holder">
                                                                                            <Spinner width={50} height={100}
                                                                                                type={"Puff"} />
                                                                                        </div>
                                                                                }
                                                                            </ol>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            {/*<!-- Modal Area Start -->*/}
                                                            {
                                                                openExperienceModal ?
                                                                    <ExperienceModal
                                                                        openExperienceModal={openExperienceModal}
                                                                        data={selectedExp} index={expIndex}
                                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                        onClose={this.onClose}
                                                                    /> : ""
                                                            }
                                                            {/*<!-- Modal Area End -->*/}
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-12 col-md-12 col-sm-12 mb-10">
                                                        <div className="profile-box education-widget mb-30">

                                                            <section className="card">
                                                                <header className="card-header">
                                                                    <h2 className="card-title float-left">Education</h2>
                                                                    {
                                                                        currentProfile && (
                                                                            <NavLink to="#education-modal"
                                                                                onClick={() => this.handleUpdate(4)}
                                                                                data-toggle="modal"
                                                                                className="float-right mt-5">
                                                                                <FontAwesomeIcon title={"Add"}
                                                                                    icon={faPlus} />
                                                                            </NavLink>
                                                                        )
                                                                    }
                                                                </header>

                                                                {
                                                                    userData.education !== null && userData.education.length > 0 ?
                                                                        userData.education.map((us, index) =>
                                                                            <div className="card-body">
                                                                                <div className="first-widget">
                                                                                    <div
                                                                                        className="icon mr-15 rounded-circle">
                                                                                        <FontAwesomeIcon
                                                                                            title={"Education"}
                                                                                            style={{ fontSize: '32px' }}
                                                                                            icon={faUniversity} />
                                                                                    </div>
                                                                                    <div className="content">
                                                                                        {
                                                                                            currentProfile && (
                                                                                                <NavLink
                                                                                                    to="#education-modal"
                                                                                                    data-toggle="modal"
                                                                                                    className="action-edit"
                                                                                                    onClick={() => {
                                                                                                        this.handleUpdate(4)
                                                                                                        this.setState({
                                                                                                            selectedEdu: us,
                                                                                                            eduIndex: index
                                                                                                        })
                                                                                                    }}>
                                                                                                    <FontAwesomeIcon
                                                                                                        title={"Edit"}
                                                                                                        icon={faPencilAlt} />
                                                                                                </NavLink>
                                                                                            )
                                                                                        }
                                                                                        <h3>{us.qualification}
                                                                                            <strong> ( {us.school} ) </strong>
                                                                                        </h3>
                                                                                        <p>{us.description}</p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) :
                                                                        ""
                                                                }
                                                            </section>
                                                            {/*<!-- Modal Area Start -->*/}
                                                            {
                                                                openEduModal ?
                                                                    <EducationModal
                                                                        openEduModal={openEduModal}
                                                                        data={selectedEdu} index={eduIndex}
                                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                        onClose={this.onClose}
                                                                    /> : ''
                                                            }
                                                            {/*<!-- Modal Area End -->*/}
                                                        </div>
                                                        <div className="profile-box skills-widget mb-30">
                                                            <section className="card">
                                                                <header className="card-header">
                                                                    <h2 className="card-title float-left">Skills</h2>
                                                                    {
                                                                        currentProfile && (
                                                                            <NavLink to="#skills-modal" data-toggle="modal"
                                                                                className="float-right mt-5"
                                                                                onClick={() => this.handleUpdate(5)}>
                                                                                <FontAwesomeIcon title={"Add"}
                                                                                    icon={faPlus} />
                                                                            </NavLink>
                                                                        )
                                                                    }
                                                                </header>
                                                                <div className="card-body">
                                                                    <ul className="skill-list">
                                                                        <React.Fragment>
                                                                            {
                                                                                userData.skills !== null && userData.skills.length > 0 ?
                                                                                    userData.skills.map((skl) =>
                                                                                        <li>
                                                                                            <div>
                                                                                                <h3>{skl}</h3>
                                                                                            </div>
                                                                                        </li>
                                                                                    ) : ""
                                                                            }
                                                                        </React.Fragment>
                                                                    </ul>
                                                                </div>
                                                            </section>
                                                            {/*<!-- Modal Area Start -->*/}
                                                            {
                                                                openSkillsModal ?
                                                                    <SkillsModal
                                                                        selectedOption={userData.skills}
                                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                        onClose={this.onClose}
                                                                        openSkillsModal={openSkillsModal}
                                                                    />
                                                                    : ''
                                                            }
                                                            {/*<!-- Modal Area End -->*/}
                                                        </div>

                                                        <div className="profile-box accomplishment-widget mb-30">
                                                            <section className="card">
                                                                <header className="card-header">
                                                                    <h2 className="card-title float-left">Accomplishment</h2>
                                                                    {
                                                                        currentProfile && (
                                                                            <NavLink to="#"
                                                                                className="float-right mt-5 dropdown-toggle"
                                                                                onClick={() => this.setState({ ddMenu: !ddMenu })}
                                                                                data-toggle="dropdown"><FontAwesomeIcon
                                                                                    title={"Add"}
                                                                                    icon={faPlus} />
                                                                            </NavLink>
                                                                        )
                                                                    }
                                                                    {/*<div className={`dropdown-menu ${ddMenu && `show`}`}*/}
                                                                    {/*     style={{transform: `${ddMenu && `translate3d(995px, -10px, 0px)`}`}}//714px*/}
                                                                    {/*     role="menu">*/}
                                                                    {/*    <div className="dropdown-item text-1"*/}
                                                                    {/*         data-toggle="modal"*/}
                                                                    {/*         onClick={() => this.handleUpdate(7)}>Course*/}
                                                                    {/*    </div>*/}
                                                                    {/*    <div className="dropdown-item text-1"*/}
                                                                    {/*         data-toggle="modal"*/}
                                                                    {/*         onClick={() => this.handleUpdate(6)}>Project*/}
                                                                    {/*    </div>*/}
                                                                    {/*</div>*/}
                                                                </header>
                                                                {/*<div className="card-body">*/}
                                                                {/*    <div className="project-list">*/}
                                                                {/*        <h3 className="text-primary">Projects<span*/}
                                                                {/*            className="badge text-primary">{*/}
                                                                {/*            userData.accomplishment !== null &&*/}
                                                                {/*            (userData.accomplishment.filter((acc) => acc.type === STRINGS.TYPES.ACCOMPLISHMENT.PROJECT).length)*/}
                                                                {/*        }</span>*/}
                                                                {/*        </h3>*/}
                                                                {/*        <ul>*/}
                                                                {/*            {*/}
                                                                {/*                userData.accomplishment !== null && userData.accomplishment.length > 0 ?*/}
                                                                {/*                    userData.accomplishment.map((acc, index) =>*/}
                                                                {/*                        acc.type === STRINGS.TYPES.ACCOMPLISHMENT.PROJECT && (*/}
                                                                {/*                            <li style={{position: "relative"}}>*/}
                                                                {/*                                <React.Fragment>*/}
                                                                {/*                                    {*/}
                                                                {/*                                        currentProfile && (*/}
                                                                {/*                                            <NavLink*/}
                                                                {/*                                                to="#add-project-modal"*/}
                                                                {/*                                                onClick={() => {*/}
                                                                {/*                                                    this.handleUpdate(6);*/}
                                                                {/*                                                    this.setState({*/}
                                                                {/*                                                        projectData: acc,*/}
                                                                {/*                                                        projectIndex: index*/}
                                                                {/*                                                    })*/}
                                                                {/*                                                }}*/}
                                                                {/*                                                data-toggle="modal"*/}
                                                                {/*                                                className="action-edit"><FontAwesomeIcon*/}
                                                                {/*                                                title={"Edit"}*/}
                                                                {/*                                                icon={faPencilAlt}/>*/}
                                                                {/*                                            </NavLink>*/}
                                                                {/*                                        )*/}
                                                                {/*                                    }*/}
                                                                {/*                                    <h3><span>{acc.name}</span></h3>*/}
                                                                {/*                                    <p> {parseDateWithMontAndYear(parseDate(new Date(acc.startDate)))}*/}
                                                                {/*                                        <FontAwesomeIcon*/}
                                                                {/*                                            title={"Description"}*/}
                                                                {/*                                            icon={faMinus}/> {parseDateWithMontAndYear(parseDate(new Date(acc.startDate)))}*/}
                                                                {/*                                    </p>*/}
                                                                {/*                                    <p> {acc.description} </p>*/}
                                                                {/*                                    <Link to={`${acc.projectURL}`}*/}
                                                                {/*                                          target="_blank"*/}
                                                                {/*                                          className="text-primary">See*/}
                                                                {/*                                        Projects</Link>*/}
                                                                {/*                                </React.Fragment>*/}
                                                                {/*                            </li>*/}
                                                                {/*                        )*/}
                                                                {/*                    ) : ""*/}
                                                                {/*            }*/}
                                                                {/*        </ul>*/}
                                                                {/*    </div>*/}
                                                                {/*    <div className="course-list">*/}
                                                                {/*        <h3 className="text-primary">Course<span*/}
                                                                {/*            className="badge text-primary">{*/}
                                                                {/*            userData.accomplishment !== null &&*/}
                                                                {/*            (userData.accomplishment.filter((acc) => acc.type === STRINGS.TYPES.ACCOMPLISHMENT.COURSES).length)*/}
                                                                {/*        }</span>*/}
                                                                {/*        </h3>*/}
                                                                {/*        <ul>*/}
                                                                {/*            {*/}
                                                                {/*                userData.accomplishment !== null && userData.accomplishment.length > 0 ?*/}
                                                                {/*                    userData.accomplishment.map((acc, index) =>*/}
                                                                {/*                        acc.type === STRINGS.TYPES.ACCOMPLISHMENT.COURSES && (*/}
                                                                {/*                            <li>*/}
                                                                {/*                                <div>*/}
                                                                {/*                                    {*/}
                                                                {/*                                        currentProfile && (*/}
                                                                {/*                                            <NavLink*/}
                                                                {/*                                                className="action-edit"*/}
                                                                {/*                                                onClick={() => {*/}
                                                                {/*                                                    this.handleUpdate(7);*/}
                                                                {/*                                                    this.setState({*/}
                                                                {/*                                                        courseData: acc,*/}
                                                                {/*                                                        courseIndex: index*/}
                                                                {/*                                                    })*/}
                                                                {/*                                                }}*/}
                                                                {/*                                                data-toggle="modal"*/}
                                                                {/*                                                to="#add-course-modal"><FontAwesomeIcon*/}
                                                                {/*                                                title={"Edit"}*/}
                                                                {/*                                                icon={faPencilAlt}/>*/}
                                                                {/*                                            </NavLink>*/}
                                                                {/*                                        )*/}
                                                                {/*                                    }*/}
                                                                {/*                                    <h3>{acc.name}</h3>*/}
                                                                {/*                                </div>*/}
                                                                {/*                            </li>*/}
                                                                {/*                        )*/}
                                                                {/*                    ) : ""*/}
                                                                {/*            }*/}

                                                                {/*        </ul>*/}
                                                                {/*    </div>*/}
                                                                {/*</div>*/}
                                                                <div className="card-body">
                                                                    <div className="project-list">
                                                                        <h3 className="text-primary">Summary<span
                                                                            className="badge text-primary">{
                                                                                userData.accomplishment !== null && userData.accomplishment.length > 0 &&
                                                                                (userData.accomplishment.filter((acc) => acc.type === STRINGS.TYPES.ACCOMPLISHMENT.PROJECT).length)
                                                                            }</span>
                                                                        </h3>
                                                                        <ul>
                                                                            <li style={{ position: "relative" }}>
                                                                                <p>{userData.accomplishments}</p>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                            {/*<!-- Modal Area Start -->*/}
                                                            {
                                                                openAddProjectModal ?
                                                                    <ProjectModal
                                                                        type={STRINGS.TYPES.ACCOMPLISHMENT.PROJECT}
                                                                        data={projectData}
                                                                        index={projectIndex}
                                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                        openAddProjectModal={openAddProjectModal}
                                                                        onClose={this.onClose}
                                                                    /> : ''
                                                            }
                                                            {
                                                                openAddCourseModal ?
                                                                    <CoursesModal
                                                                        type={STRINGS.TYPES.ACCOMPLISHMENT.COURSES}
                                                                        data={courseData}
                                                                        index={courseIndex}
                                                                        onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                        openAddCourseModal={openAddCourseModal}
                                                                        onClose={this.onClose}
                                                                    />
                                                                    : ''
                                                            }
                                                            {
                                                                openAccomplishment &&
                                                                <AccomplishmentModal
                                                                    defaultVal={userData.accomplishments}
                                                                    openAccomplishment={openAccomplishment}
                                                                    onSave={(obj) => this.handleUpdateProfile(obj)}
                                                                    onClose={this.onClose}
                                                                />

                                                            }
                                                            {/*<!-- Modal Area End -->*/}
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            )
                                    }

                                    {
                                        this.props.isCompany !== undefined && this.props.isCompany && (
                                            <React.Fragment>
                                                <div className="col-xl-12 col-md-12 col-sm-12 mb-10">
                                                    <div className="profile-box experience-widget">
                                                        <section className="card">
                                                            <header className="card-header">
                                                                <h2 className="card-title float-left">Company Info</h2>
                                                            </header>
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-lg-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="job_detail">Office Place
                                                                                1</label>
                                                                            <div className="uploadImage"
                                                                                onClick={() => {
                                                                                    $(".img_num1").trigger("click");
                                                                                }}>
                                                                                {/*<div className="change-image">Upload*/}
                                                                                {/*    Picture*/}
                                                                                {/*</div>*/}
                                                                                {/*<form id="formData1" mathod="POST">*/}
                                                                                {/*    <input*/}
                                                                                {/*        style={{display: "none"}}*/}
                                                                                {/*        accept=".jpg, .jpeg, .gif, .bmp, .png"*/}
                                                                                {/*        type="file"*/}
                                                                                {/*        name="files"*/}
                                                                                {/*        className="img_num1"*/}
                                                                                {/*        title="Upload Picture"*/}
                                                                                {/*        multiple*/}
                                                                                {/*        onChange={(e) => this.handleJobPlaceChange(e, 1, "formData1")}/>*/}
                                                                                {/*</form>*/}
                                                                                <img alt='#'
                                                                                    src={upPic ? upPic : defaultUploadImg}
                                                                                    id="userImg" />
                                                                            </div>
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="job_detail">Office Place
                                                                                2</label>
                                                                            <div className="uploadImage"
                                                                                onClick={() => {
                                                                                    $(".img_num2").trigger("click");
                                                                                }}>
                                                                                {/*<div className="change-image">Upload*/}
                                                                                {/*    Picture*/}
                                                                                {/*</div>*/}
                                                                                {/*<form id="formData2" mathod="POST">*/}
                                                                                {/*    <input*/}
                                                                                {/*        accept=".jpg, .jpeg, .gif, .bmp, .png"*/}
                                                                                {/*        type="file"*/}
                                                                                {/*        name="files"*/}
                                                                                {/*        className="img_num2"*/}
                                                                                {/*        title="Upload Picture"*/}
                                                                                {/*        style={{display: "none"}}*/}
                                                                                {/*        onChange={(e) => this.handleJobPlaceChange(e, 2, "formData2")}/>*/}
                                                                                {/*</form>*/}
                                                                                <img alt='#'
                                                                                    src={upPic2 ? upPic2 : defaultUploadImg}
                                                                                    id="userImg" />
                                                                            </div>
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                                <div className="col-xl-12 col-md-12 col-sm-12 mb-10">
                                                    <div className="profile-box experience-widget">
                                                        <section className="card">
                                                            <header className="card-header">
                                                                <h2 className="card-title float-left">Company
                                                                    Location</h2>
                                                            </header>
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-lg-12">
                                                                        <div className="modal-map-holder">
                                                                            <GMap
                                                                                defaultCoordinates={userData.companyLocation}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    </div>
                                                </div>
                                            </React.Fragment>


                                        )
                                    }

                                </div>
                                :
                                <div className="spinner-holder" style={{ height: "100vh" }}>
                                    <Spinner width={100} height={100} type={"Puff"} />
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}