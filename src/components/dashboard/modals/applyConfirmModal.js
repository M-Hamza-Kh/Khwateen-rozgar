import React, { useState, useEffect } from 'react';
import { Button, Divider, FormControlLabel, Radio } from "@material-ui/core";
import { STRINGS } from "../../../utils/base";
import $ from "jquery";
import { API } from "../../../utils/services";
import Spinner from "../../spinner";
import swal from 'sweetalert';
import { IconButton } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { CONTENT_URL, WEB_HOST_URL, getUserData } from "../../../utils/base";

const defaultState = {
    uploadFileName: "",
    uploadFile: "",
    applyType: STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.KRS,
    showVideo: STRINGS.TYPES.APPLY_JOB.SHOW_CV.NO
}

const ApplyConfirmModal = (props) => {
    const { data, onSave, onClose } = props;
    const [userData, setUserData] = useState({});
    const [form, setForm] = useState(defaultState);
    const [isResponse, setResponse] = useState(true);
    const handleUpdate = (confirm) => {
        if (form.applyType === STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.KRS) {
            if (form.showVideo !== false) {
                onSave(confirm);
                onClose()
            } else {
                // alert("Kindly confirm do you want to show your video intro?");
                swal("", "Kindly confirm do you want to show your video intro?", "danger")
            }
        }
        else if (form.applyType === STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.LASTCV) {
            if (form.applyType === "LastCv") {
                onSave(confirm);
                onClose()
                data()
            } else {
                // alert("Kindly confirm do you want to show your video intro?");
                swal("", "Kindly confirm do you want to show your video intro?", "danger")
            }
        }
        else {
            if (form.uploadFile !== "") {
                onSave(confirm);
                onClose()
            } else {
                //alert("Kindly upload your resume");
                swal("", "Kindly upload your resume", "danger")
            }
        }
    }

    useEffect(() => {
        const getUserDetail = () => {
                const user_id = getUserData().id
                API.USER.getUser(user_id).then((response) => {
                      let { status, error, data } = response;
                console.log("ApplicantData", response.data)
                    if (response.status) {
                        setUserData(response.data)
                    } else {
                        alert(response.error)
                    }
                })
        }
        getUserDetail();
    }, [])

    const handleUploadResume = () => {
        let resumeData = $("#resumeData")[0];
        setResponse(false)
        API.UPLOAD.upload(resumeData).then((response) => {
            let { status, error, data } = response;
            if (status) {
                //console.log("file", response)
                setForm({
                    ...form,
                    uploadFileName: data[0].name,
                    uploadFile: data[0].path,
                    //showVideo: false,
                    applyType: STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.UPLOAD
                })
                setResponse(true)
                //this.handleUpdateProfile({type: STRINGS.TYPES.PROFILE_UPD.RESUME_URL, data: data[0].path})
            } else {
                alert(error)
            }
        })
    }

    const canSubmit = () => {
        return form.applyType.length > 0
    }

    return (
        <React.Fragment>
            <div
                className={`modal fade profile-modal-container show`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                    role="document" style={{ justifyContent: "center" }}>
                    <div className="modal-content" style={{ width: "inherit" }}>
                        <button type="button" onClick={() => {
                            onClose()
                        }} className="close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true"
                            >&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header">
                                    <div className="card-title mb-5 mt-5" style={{ fontSize: "12px" }}>
                                        &nbsp;
                                        {/*Application*/}
                                        {/*for {props.title}*/}
                                    </div>
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <div className="d-flex">
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex">
                                                            <Radio
                                                                color="primary"
                                                                checked={form.applyType === STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.KRS}
                                                                onChange={(ev) => {
                                                                    setForm({
                                                                        ...form,
                                                                        applyType: STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.KRS,
                                                                        showVideo: STRINGS.TYPES.APPLY_JOB.SHOW_CV.NO,
                                                                    })
                                                                }}
                                                                style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT} !important` }}
                                                                // value={true}
                                                                name="upload"
                                                                inputProps={{ 'aria-label': 'YES' }}
                                                            />
                                                        </div>
                                                        <div>Use KRS Cv</div>
                                                    </div>
                                                </div>
                                                <p style={{ marginLeft: "2rem" }}>
                                                    Do you want to show your intro video for this job?
                                                </p>
                                                <div className="d-flex width-100 ml-45">
                                                    <FormControlLabel
                                                        style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }}
                                                        control={
                                                            <Radio
                                                                color="primary"
                                                                checked={form.showVideo === STRINGS.TYPES.APPLY_JOB.SHOW_CV.YES}
                                                                onChange={(ev) => {
                                                                    setForm({
                                                                        ...form,
                                                                        uploadFileName: "",
                                                                        uploadFile: "",
                                                                        showVideo: STRINGS.TYPES.APPLY_JOB.SHOW_CV.YES,
                                                                        applyType: STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.KRS
                                                                    })
                                                                }}
                                                                style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT} !important` }}
                                                                // value={true}
                                                                name="showVideo"
                                                                inputProps={{ 'aria-label': 'YES' }}
                                                            />
                                                        }
                                                        label="Yes"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Radio
                                                                checked={form.showVideo === STRINGS.TYPES.APPLY_JOB.SHOW_CV.NO}
                                                                style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }}
                                                                onChange={(ev) => {
                                                                    setForm({
                                                                        ...form,
                                                                        uploadFileName: "",
                                                                        uploadFile: "",
                                                                        showVideo: STRINGS.TYPES.APPLY_JOB.SHOW_CV.NO,
                                                                        applyType: STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.KRS
                                                                    })
                                                                }
                                                                }
                                                                // value={false}
                                                                name="showVideo"
                                                                inputProps={{ 'aria-label': 'NO' }}
                                                            />
                                                        }
                                                        label="No"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider style={{ width: "100%", height: "2px" }} variant="horizontal" />
                                    <div className="row mt-20">
                                        <div className="col-12">
                                            <div className="d-flex width-100">
                                                <div className="d-flex">
                                                    <div className="d-flex align-items-center">
                                                        <Radio
                                                            color="primary"
                                                            checked={form.applyType === STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.UPLOAD}
                                                            onChange={(ev) => {
                                                                setForm({
                                                                    ...form,
                                                                    showVideo: STRINGS.TYPES.APPLY_JOB.SHOW_CV.NO,
                                                                    applyType: STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.UPLOAD
                                                                })
                                                            }}
                                                            style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT} !important` }}
                                                            // value={true}
                                                            name="upload"
                                                            inputProps={{ 'aria-label': 'YES' }}
                                                        />
                                                        <div className="mr-4">Upload Resume</div>
                                                    </div>
                                                    <form id="resumeData">
                                                        <input type="file"
                                                            accept=".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                                            name="files"
                                                            multiple id="upload-resume" hidden
                                                            onChange={handleUploadResume} />
                                                    </form>
                                                    <label htmlFor="upload-resume">
                                                        {
                                                            isResponse ? <Button
                                                                component="span"
                                                                style={{
                                                                    backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                    color: "white"
                                                                }}
                                                            >
                                                                Upload
                                                            </Button> :
                                                                <div className="spinner-holder">
                                                                    <Spinner width={23} height={23} type="Puff" />
                                                                </div>
                                                        }
                                                    </label>
                                                    <label className="ml-4 mr-4">
                                                        {form.uploadFileName}
                                                    </label>
                                                </div>
                                            </div>
                                            <p style={{ marginLeft: "2rem" }}>
                                                Do you want to show your intro video for this job?
                                            </p>
                                            <div className="d-flex width-100 ml-45">
                                                <FormControlLabel
                                                    style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }}
                                                    control={
                                                        <Radio
                                                            color="primary"
                                                            checked={form.showVideo === STRINGS.TYPES.APPLY_JOB.SHOW_CV.YES}
                                                            onChange={(ev) => {
                                                                setForm({
                                                                    ...form,
                                                                    uploadFileName: "",
                                                                    uploadFile: "",
                                                                    showVideo: STRINGS.TYPES.APPLY_JOB.SHOW_CV.YES,
                                                                    applyType: STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.UPLOAD
                                                                })
                                                            }}
                                                            style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT} !important` }}
                                                            // value={true}
                                                            name="showVideo"
                                                            inputProps={{ 'aria-label': 'YES' }}
                                                        />
                                                    }
                                                    label="Yes"
                                                />
                                                <FormControlLabel
                                                    control={
                                                        <Radio
                                                            checked={form.showVideo === STRINGS.TYPES.APPLY_JOB.SHOW_CV.NO}
                                                            style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }}
                                                            onChange={(ev) => {
                                                                setForm({
                                                                    ...form,
                                                                    showVideo: STRINGS.TYPES.APPLY_JOB.SHOW_CV.NO,
                                                                    applyType: STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.UPLOAD
                                                                })
                                                            }
                                                            }
                                                            // value={false}
                                                            name="showVideo"
                                                            inputProps={{ 'aria-label': 'NO' }}
                                                        />
                                                    }
                                                    label="No"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <Divider style={{ width: "100%", height: "2px" }} variant="horizontal" />
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <div className="d-flex">
                                                    <div className="d-flex align-items-center">
                                                        <div className="d-flex">
                                                            <Radio
                                                                color="primary"
                                                                checked={form.applyType === STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.LASTCV}
                                                                onChange={(ev) => {
                                                                    setForm({
                                                                        ...form,
                                                                        applyType: STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.LASTCV,
                                                                        showVideo: STRINGS.TYPES.APPLY_JOB.SHOW_CV.NO,
                                                                    })
                                                                }}
                                                                style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT} !important` }}
                                                                // value={true}
                                                                name="LastCV"
                                                                inputProps={{ 'aria-label': 'YES' }}
                                                            />
                                                        </div>
                                                        <div>Select Last Applied Resume</div>
                                                        <a
                                                            //userData={applicantDetail}
                                                            href={`${CONTENT_URL}/webapi/${userData.lastCvURL}`}
                                                            //href={`https://khawateenrozgar.com/webapi//files/2023/1/da354174-b682-4503-8080-a9b554b9b86d.pdf`}
                                                            target={"_blank"}

                                                            download style={{
                                                                display: "flex",
                                                                flex: "1"
                                                            }}>

                                                            <IconButton
                                                                component="span"
                                                                style={{ flex: "1" }}>
                                                                <CloudDownloadIcon
                                                                    style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }} />
                                                            </IconButton>
                                                   
                                                        </a>
                                                    </div>
                                                </div>
                                                <p style={{ marginLeft: "2rem" }}>
                                                    Do you want to show your intro video for this job?
                                                </p>
                                                <div className="d-flex width-100 ml-45">
                                                    <FormControlLabel
                                                        style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }}
                                                        control={
                                                            <Radio
                                                                color="primary"
                                                                checked={form.showVideo === STRINGS.TYPES.APPLY_JOB.SHOW_CV.YES}
                                                                onChange={(ev) => {
                                                                    setForm({
                                                                        ...form,
                                                                        uploadFileName: "",
                                                                        uploadFile: "",
                                                                        showVideo: STRINGS.TYPES.APPLY_JOB.SHOW_CV.YES,
                                                                        applyType: STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.LASTCV
                                                                    })
                                                                }}
                                                                style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT} !important` }}
                                                                // value={true}
                                                                name="showVideo"
                                                                inputProps={{ 'aria-label': 'YES' }}
                                                            />
                                                        }
                                                        label="Yes"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Radio
                                                                checked={form.showVideo === STRINGS.TYPES.APPLY_JOB.SHOW_CV.NO}
                                                                style={{ color: `${STRINGS.TYPES.COLORS.DEFAULT}` }}
                                                                onChange={(ev) => {
                                                                    setForm({
                                                                        ...form,
                                                                        uploadFileName: "",
                                                                        uploadFile: "",
                                                                        showVideo: STRINGS.TYPES.APPLY_JOB.SHOW_CV.NO,
                                                                        applyType: STRINGS.TYPES.APPLY_JOB.APPLY_TYPE.LASTCV
                                                                    })
                                                                }
                                                                }
                                                                // value={false}
                                                                name="showVideo"
                                                                inputProps={{ 'aria-label': 'NO' }}
                                                            />
                                                        }
                                                        label="No"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={() => handleUpdate(form)}
                                                    disabled={!canSubmit()}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">
                                                    Apply
                                                </Button>
                                                {/*<button*/}
                                                {/*    onClick={() => handleUpdate(false)}*/}
                                                {/*    className="ht-btn theme-btn theme-btn-two mb-xs-20">No*/}
                                                {/*</button>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show" />
        </React.Fragment>
    );
};

export default ApplyConfirmModal;