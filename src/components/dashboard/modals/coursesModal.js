import React, {useCallback, useEffect, useRef, useState} from 'react';
import {dropDownSelection, parseDateFormat, STRINGS} from "../../../utils/base";
import {NavLink} from "react-router-dom";
import $ from "jquery";

let initialState = {
    company: "",
    description: "",
    endDate: new Date(),
    isCurrentlyWorking: false,
    name: "",
    projectURL: "",
    startDate: new Date(),
    type: ""
}

const CoursesModal = (props) => {
    let {openAddCourseModal, onClose, data, onSave, index, type} = props;
    let startDate = useRef(null);
    let endDate = useRef(null);
    const [course, setCourse] = useState(data);
console.log("updateUser",data)
    useEffect(() => {
        if ($.isEmptyObject(data)) {
            setCourse({
                ...initialState,
                type: type
            })
        }
        if (!$.isEmptyObject(data)) {
            if (data.startDate === null) {
                startDate.current.value = parseDateFormat(new Date())
                setCourse(prevState => ({
                    ...prevState,
                    startDate: new Date().toISOString()
                }))
            }
            if (data.endDate === null) {
                endDate.current.value = parseDateFormat(new Date())
                setCourse(prevState => ({
                    ...prevState,
                    endDate: new Date().toISOString()
                }))
            }

        }
    }, [data.startDate, data.endDate, setCourse]);

    const handleUpdate = () => {
        console.log("update", course);
        const validate = validation(course);
        if (validate.error) {
            onSave({type: STRINGS.TYPES.PROFILE_UPD.COURSE, data: course, index: index});
            onClose();
        } else {
            alert(validate.message)
        }
    }

    const handleAdd = () => {
        console.log("add", course);
        const validate = validation(course);
        if (validate.error) {
            onSave({type: STRINGS.TYPES.PROFILE_UPD.COURSE, data: course});
            onClose();
        } else {
            alert(validate.message)
        }
    }


    const handleChange = useCallback((ev) => {
        ev.persist();
        console.log("abc", [ev.target.name])
        setCourse(project => ({
            ...project,
            [ev.target.name]: ev.target.type === "checkbox" ? ev.target.checked : ev.target.type === "date" ? new Date(ev.target.value).toISOString() : ev.target.value
        }));
        console.log("abc", course)
    }, []);

    const validation = ({name}) => {
        let valid = {error: true, message: ""}
        if (name === "") {
            valid.error = false
            valid.message += valid.message ? "\nCourse name is required" : "Course name is required"
        }
        if (startDate === null) {
            valid.error = false
            valid.message += valid.message ? "\nStart date is required" : "Start date is required"
        }
        // if (endDate === null) {
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
                className={`modal fade profile-modal-container ${openAddCourseModal ? `show` : ``}`}
                id="add-course-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                     role="document">
                    <div className="modal-content">
                        <button type="button" className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                                                <span aria-hidden="true"
                                                                      onClick={() => onClose()}>&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header">
                                    {
                                        type === STRINGS.TYPES.ACCOMPLISHMENT.PROJECT ?
                                            <h2 className="card-title mb-0">{!$.isEmptyObject(data) ? "Edit Project" : "Add Project"}</h2>
                                            :
                                            <h2 className="card-title mb-0">{!$.isEmptyObject(data) ? "Edit Course" : "Add Course"}</h2>
                                    }
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ee-school">Course Name <span>*</span></label>
                                                <input type="text"
                                                       id="course_name"
                                                       placeholder="name"
                                                       name="name"
                                                       onChange={handleChange}
                                                       defaultValue={course.name}/>
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="row">*/}
                                    {/*    <div className="col-12">*/}
                                    {/*        <div*/}
                                    {/*            className="single-input mb-25">*/}
                                    {/*            <label*/}
                                    {/*                htmlFor="course_number">Number</label>*/}
                                    {/*            <input type="text"*/}
                                    {/*                   id="course_number"*/}
                                    {/*                   placeholder="Number"*/}
                                    {/*                   value=""/>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {/*<div className="row">*/}
                                    {/*    <div*/}
                                    {/*        className="col-lg-12 col-md-12 col-sm-12">*/}
                                    {/*        <div*/}
                                    {/*            className="single-input mb-25">*/}
                                    {/*            <label*/}
                                    {/*                htmlFor="associated_witha">Associated*/}
                                    {/*                With </label>*/}
                                    {/*            <select*/}
                                    {/*                name="associated_witha"*/}
                                    {/*                id="associated_witha"*/}
                                    {/*                className="w-100">*/}
                                    {/*                <option*/}
                                    {/*                    value="">-*/}
                                    {/*                </option>*/}
                                    {/*            </select>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="row">
                                        <div className="col-12">
                                            <p>We no longer share
                                                changes to
                                                projects
                                                with your
                                                network. <NavLink
                                                    to="#"
                                                    className="text-primary">Learn
                                                    how these are
                                                    shared and
                                                    when</NavLink>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">
                                                <button
                                                    onClick={$.isEmptyObject(data) ? handleAdd : handleUpdate}
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

export default CoursesModal;