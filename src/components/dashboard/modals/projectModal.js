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

const ProjectModal = (props) => {
    let {openAddProjectModal, onClose, data, onSave, index, type} = props;
    let startDate = useRef(null);
    let endDate = useRef(null);
    const [project, setProject] = useState(data);

    useEffect(() => {
        if ($.isEmptyObject(data)) {
            setProject({
                ...initialState,
                type: type
            })
        }
        if (!$.isEmptyObject(data)) {
            if (data.startDate === null) {
                startDate.current.value = parseDateFormat(new Date())
                setProject(prevState => ({
                    ...prevState,
                    startDate: new Date().toISOString()
                }))
            }
            if (data.endDate === null) {
                endDate.current.value = parseDateFormat(new Date())
                setProject(prevState => ({
                    ...prevState,
                    endDate: new Date().toISOString()
                }))
            }

        }
    }, [data.startDate, data.endDate, setProject]);

    const handleUpdate = () => {
        console.log("update", project);
        const validate = validation(project);
        if (validate.error) {
            onSave({type: STRINGS.TYPES.PROFILE_UPD.PROJECT, data: project, index: index});
            onClose();
        } else {
            alert(validate.message)
        }
    }

    const handleAdd = () => {
        console.log("add", project);
        const validate = validation(project);
        if (validate.error) {
            onSave({type: STRINGS.TYPES.PROFILE_UPD.PROJECT, data: project});
            onClose();
        } else {
            alert(validate.message)
        }
    }


    const handleChange = useCallback((ev) => {
        ev.persist();
        console.log("abc", [ev.target.name])
        setProject(project => ({
            ...project,
            [ev.target.name]: ev.target.type === "checkbox" ? ev.target.checked : ev.target.type === "date" ? new Date(ev.target.value).toISOString() : ev.target.value
        }));
        console.log("abc", project)
    }, []);

    const validation = ({company, description, endDate, name, projectURL, startDate}) => {
        let valid = {error: true, message: ""}
        if (name === "") {
            valid.error = false
            valid.message += valid.message ? "\nProject name is required" : "Project name is required"
        }
        if (company === "") {
            valid.error = false
            valid.message += valid.message ? "\nCompany name is required" : "Company name is required"
        }
        // if (description === null) {
        //     valid.error = false
        //     valid.message += valid.message ? "\nDescription is required" : "Description is required"
        // }
        // if (projectURL === null) {
        //     valid.error = false
        //     valid.message += valid.message ? "\nLink is required" : "Link is required"
        // }
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
                className={`modal fade profile-modal-container ${openAddProjectModal ? `show` : ``}`}
                id="add-project-modal"
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
                                                    htmlFor="ee-school">Project
                                                    Name <span>*</span></label>
                                                <input type="text"
                                                       id="project_name"
                                                       name="name"
                                                       placeholder="Project Name"
                                                       onChange={handleChange}
                                                       defaultValue={project.name}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ee-school">Company
                                                    Name <span>*</span></label>
                                                <input type="text"
                                                       id="company"
                                                       name="company"
                                                       placeholder="Company Name"
                                                       onChange={handleChange}
                                                       defaultValue={project.company}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div>
                                                <input
                                                    id="current-employee"
                                                    name="isCurrentlyWorking"
                                                    type="checkbox"
                                                    className="checkbox"
                                                    required=""
                                                    checked={project.isCurrentlyWorking}
                                                    // onChange={() => setExp(prevState => ({
                                                    //     ...prevState,
                                                    //     isCurrentlyWorking: !experience.isCurrentlyWorking
                                                    // }))}
                                                    onChange={handleChange}
                                                />
                                                <label
                                                    htmlFor="currently-working-project">I
                                                    am currently
                                                    working on
                                                    this
                                                    project</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div
                                            className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ap_smonth">Start
                                                    Date</label>
                                                <input
                                                    name="startDate"
                                                    id="startDate"
                                                    type="date"
                                                    ref={startDate}
                                                    defaultValue={parseDateFormat(project.startDate)}
                                                    onChange={handleChange}
                                                    className="w-100"/>
                                                {/*<select*/}
                                                {/*    name="ap_smonth"*/}
                                                {/*    id="ap_smonth"*/}
                                                {/*    className="w-100 mb-1">*/}
                                                {/*    <option*/}
                                                {/*        value="">Month*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">Jan*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">Feb*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">Mar*/}
                                                {/*    </option>*/}
                                                {/*</select>*/}
                                                {/*<select*/}
                                                {/*    name="ap_syear"*/}
                                                {/*    id="ap_syear"*/}
                                                {/*    className="w-100">*/}
                                                {/*    <option*/}
                                                {/*        value="">Year*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">2020*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">2019*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">2018*/}
                                                {/*    </option>*/}
                                                {/*</select>*/}
                                            </div>
                                        </div>
                                        <div
                                            className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ap_emonth">End
                                                    Date</label>
                                                <input
                                                    name="endDate"
                                                    id="ed_month"
                                                    type="date"
                                                    ref={endDate}
                                                    defaultValue={parseDateFormat(project.endDate)}
                                                    onChange={handleChange}
                                                    className="w-100"/>
                                                {/*<select*/}
                                                {/*    name="ap_emonth"*/}
                                                {/*    id="ap_emonth"*/}
                                                {/*    className="w-100 mb-1">*/}
                                                {/*    <option*/}
                                                {/*        value="">Month*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">Jan*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">Feb*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">Mar*/}
                                                {/*    </option>*/}
                                                {/*</select>*/}
                                                {/*<select*/}
                                                {/*    name="ap_eyear"*/}
                                                {/*    id="ap_eyear"*/}
                                                {/*    className="w-100">*/}
                                                {/*    <option*/}
                                                {/*        value="">Year*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">2020*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">2019*/}
                                                {/*    </option>*/}
                                                {/*    <option*/}
                                                {/*        value="">2018*/}
                                                {/*    </option>*/}
                                                {/*</select>*/}
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="row">*/}
                                    {/*    <div className="col-12">*/}
                                    {/*        <div className="creator">*/}
                                    {/*            <h3>Creator</h3>*/}
                                    {/*            <div className="creator-list">*/}
                                    {/*                <ul>*/}
                                    {/*                    <li>*/}
                                    {/*                        <div*/}
                                    {/*                            className="selected-person">*/}
                                    {/*                            <NavLink to="#"*/}
                                    {/*                                     className="rounded-circle profile-picture">*/}
                                    {/*                                <FontAwesomeIcon*/}
                                    {/*                                    icon={faUser}/>*/}
                                    {/*                            </NavLink>*/}
                                    {/*                            <p>Person Name</p>*/}
                                    {/*                        </div>*/}

                                    {/*                    </li>*/}
                                    {/*                </ul>*/}
                                    {/*                <NavLink to="#"*/}
                                    {/*                         className="float-right">Add*/}
                                    {/*                    Creator</NavLink>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}

                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<div className="row">*/}
                                    {/*    <div*/}
                                    {/*        className="col-lg-12 col-md-12 col-sm-12">*/}
                                    {/*        <div*/}
                                    {/*            className="single-input mb-25">*/}
                                    {/*            <label*/}
                                    {/*                htmlFor="industry">Associated*/}
                                    {/*                With </label>*/}
                                    {/*            <select*/}
                                    {/*                name="associated_with"*/}
                                    {/*                id="associated_with"*/}
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
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ansociety">Project
                                                    URL </label>
                                                <input
                                                    style={{width: "100%"}}
                                                    type="text"
                                                    id="projectURL"
                                                    name="projectURL"
                                                    onChange={handleChange}
                                                    placeholder="projectURL"
                                                    defaultValue={project.projectURL}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ee-description">Description </label>
                                                <textarea rows="5"
                                                          id="ee-description"
                                                          name="description"
                                                          onChange={handleChange}
                                                          defaultValue={project.description}
                                                          placeholder="Description"/>

                                            </div>
                                        </div>
                                    </div>

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

export default ProjectModal;