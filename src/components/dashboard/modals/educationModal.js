import React, {useCallback, useEffect, useRef, useState} from 'react';
import {dropDownSelection, parseDateFormat, STRINGS} from "../../../utils/base";
import $ from "jquery";

let initialState = {
    "qualification": null,
    "school": null,
    "degree": null,
    "fieldOfStudy": null,
    "grade": null,
    "activitiesAndSocieties": null,
    "description": null,
    "start": null,
    "end": null,
    "webLink": null
}

const EducationModal = (props) => {
    let {openEduModal, data, onClose, onSave, index} = props;
    let startDate = useRef(null);
    let endDate = useRef(null);
    const [education, setEdu] = useState(data);
    // console.log("add", experience)
    useEffect(() => {
        if ($.isEmptyObject(data)) {
            setEdu({
                ...initialState,
            })
        }
        if (!$.isEmptyObject(data)) {
            if (data.start === null) {
                startDate.current.value = parseDateFormat(new Date())
                setEdu(prevState => ({
                    ...prevState,
                    start: new Date().toISOString()
                }))
            }
            if (data.end === null) {
                endDate.current.value = parseDateFormat(new Date())
                setEdu(prevState => ({
                    ...prevState,
                    end: new Date().toISOString()
                }))
            }

        }
    }, [data.start, data.end, setEdu])

    const handleChange = useCallback((ev) => {
        ev.persist();
        console.log("abc", [ev.target.name])
        setEdu(education => ({
            ...education,
            [ev.target.name]: ev.target.type === "checkbox" ? ev.target.checked : ev.target.type === "date" ? new Date(ev.target.value).toISOString() : ev.target.value
        }));
        console.log("abc", education)
    }, [])

    const handleUpdate = () => {
        console.log("update", education);
        const validate = validation(education);
        if (validate.error) {
            onSave({type: STRINGS.TYPES.PROFILE_UPD.EDU_INFO, data: education, index: index});
            onClose();
        } else {
            alert(validate.message)
        }

    }

    const handleAdd = () => {
        console.log("add", education);
        const validate = validation(education);
        if (validate.error) {
            onSave({type: STRINGS.TYPES.PROFILE_UPD.EDU_INFO, data: education});
            onClose();
        } else {
            alert(validate.message)
        }

    }

    const validation = ({qualification, school, degree, fieldOfStudy, grade, activitiesAndSocieties, description, start, end, webLink}) => {
        let valid = {error: true, message: ""}
        if (qualification === "" || qualification === null) {
            valid.error = false
            valid.message += valid.message ? "\nQualification is required" : "Qualification is required"
        }
        if (school === "" || school === null) {
            valid.error = false
            valid.message += valid.message ? "\nSchool name is required" : "School name is required"
        }
        if (fieldOfStudy === "" || fieldOfStudy === null) {
            valid.error = false
            valid.message += valid.message ? "\nField of study is required" : "Field of study name is required"
        }
        if (grade === "" || grade === null) {
            valid.error = false
            valid.message += valid.message ? "\nGrade is required" : "Grade is required"
        }
        // if(activitiesAndSocieties === "" || activitiesAndSocieties === null) {
        //     valid.error = false
        //     valid.message += valid.message ? "\nActivities And Societies is required" : "Activities And Societies is required"
        // }

        if (degree === "" || degree === null) {
            valid.error = false
            valid.message += valid.message ? "\nDegree is required" : "Degree is required"
        }
        // if (description === null || description === "") {
        //     valid.error = false
        //     valid.message += valid.message ? "\nDescription is required" : "Description is required"
        // }
        // if (webLink === null || webLink === "") {
        //     valid.error = false
        //     valid.message += valid.message ? "\nLink is required" : "Link is required"
        // }
        if (start === null || start === "") {
            valid.error = false
            valid.message += valid.message ? "\nStart date is required" : "Start date is required"
        }
        // if (end === null || end === "") {
        //     valid.error = false
        //     valid.message += valid.message ? "\nEnd date is required" : "End date is required"
        // }
        return valid
    }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openEduModal ? `show` : ``}`}
                id="education-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document">
                    <div className="modal-content">
                        <button type="button" className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                                                <span aria-hidden="true"
                                                                      onClick={props.onClose}>&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header">
                                    <h2 className="card-title mb-0">{
                                        !$.isEmptyObject(data) ? `Edit Education` : `Add Education`
                                    }</h2>
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ee-school">School <span>*</span></label>
                                                <input
                                                    type="text"
                                                    id="ee-school"
                                                    placeholder="School"
                                                    name="school"
                                                    defaultValue={education.school}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ee-degree">Degree </label>
                                                <input
                                                    type="text"
                                                    id="ee-degree"
                                                    placeholder="Degree"
                                                    name="degree"
                                                    defaultValue={education.degree}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ee-fostudy">Field
                                                    of
                                                    study</label>
                                                <input
                                                    type="text"
                                                    id="ee-fostudy"
                                                    placeholder="Field of study "
                                                    name="fieldOfStudy"
                                                    defaultValue={education.fieldOfStudy}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div
                                            className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="sd_month">Start
                                                    Year</label>
                                                <input
                                                    type="date"
                                                    id="sy_year"
                                                    name="start"
                                                    ref={startDate}
                                                    defaultValue={education.start}
                                                    onChange={handleChange}
                                                    className="w-100"/>
                                            </div>
                                        </div>
                                        <div
                                            className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ey_year">End
                                                    Year
                                                    (or
                                                    expected)</label>
                                                <input
                                                    id="ey_year"
                                                    type="date"
                                                    className="w-100"
                                                    name="end"
                                                    ref={endDate}
                                                    defaultValue={education.end}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ee-grade">Grade</label>
                                                <input
                                                    type="text"
                                                    id="ee-grade"
                                                    placeholder="Grade"
                                                    name="grade"
                                                    defaultValue={education.grade}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="qualification">Qualification</label>
                                                <input
                                                    type="text"
                                                    id="qualification"
                                                    placeholder="Qualification"
                                                    name="qualification"
                                                    defaultValue={education.qualification}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ansociety">Activities
                                                    and
                                                    societies </label>
                                                <textarea
                                                    rows="5"
                                                    id="ansociety"
                                                    placeholder="Activities and societies"
                                                    className="mb-0"
                                                    name="activitiesAndSocieties"
                                                    defaultValue={education.activitiesAndSocieties}
                                                    onChange={handleChange}
                                                />
                                                {/*<small*/}
                                                {/*    className="d-lg-block d-md-block"*/}
                                                {/*    style={{marginTop: "-10px"}}>Ex:*/}
                                                {/*    Alpha*/}
                                                {/*    Phi*/}
                                                {/*    Omega,*/}
                                                {/*    Marching*/}
                                                {/*    Band,*/}
                                                {/*    Volleyball</small>*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ee-description">Description </label>
                                                <textarea
                                                    rows="5"
                                                    id="ee-description"
                                                    placeholder="Description"
                                                    name="description"
                                                    defaultValue={education.description}
                                                    onChange={handleChange}
                                                />

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <p>Media<br/>
                                                Add or link to
                                                external
                                                documents,
                                                photos,
                                                sites, videos,
                                                and
                                                presentations.
                                            </p>
                                            <div
                                                className="row">
                                                {/*<div className="col-6">*/}
                                                {/*    <NavLink to="#"*/}
                                                {/*             className="btn btn-block btn-primary">Upload</NavLink>*/}
                                                {/*</div>*/}
                                                <div
                                                    className="col-12">
                                                    <input
                                                        style={{width: "100%"}}
                                                        type="text"
                                                        id="webLink"
                                                        name="webLink"
                                                        onChange={handleChange}
                                                        placeholder="webLink"
                                                        defaultValue={education.webLink}
                                                    />
                                                    {/*<NavLink*/}
                                                    {/*    to="#"*/}
                                                    {/*    className="btn btn-block btn-default">Link</NavLink>*/}
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
                                                <button
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Delete
                                                </button>
                                                <button
                                                    onClick={!$.isEmptyObject(data) ? handleUpdate : handleAdd}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"/>
        </React.Fragment>
    );
};

export default EducationModal;