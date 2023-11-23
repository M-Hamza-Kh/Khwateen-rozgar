import React, {useCallback, useEffect, useRef, useState} from 'react';
import {dropDownSelection, parseDateFormat, STRINGS} from "../../../utils/base";
import $ from "jquery";

let initialState = {
    "title": "",
    "company": "",
    "city": "",
    "isCurrentlyWorking": false,
    "startDate": "",
    "endDate": "",
    "description": "",
    "webLink": ""
}
const ExperienceModal = (props) => {
    let {openExperienceModal, onClose, data, onSave, index} = props;
    let startDate = useRef(null);
    let endDate = useRef(null);
    const [experience, setExp] = useState(data);
    // console.log("add", experience)
    useEffect(() => {
        if ($.isEmptyObject(data)) {
            setExp({
                ...initialState,
            })
        }
        if (!$.isEmptyObject(data)) {
            if (data.startDate === null) {
                startDate.current.value = parseDateFormat(new Date())
                setExp(prevState => ({
                    ...prevState,
                    startDate: new Date().toISOString()
                }))
            }
            if (data.endDate === null) {
                endDate.current.value = parseDateFormat(new Date())
                setExp(prevState => ({
                    ...prevState,
                    endDate: new Date().toISOString()
                }))
            }

        }
    }, [data.startDate, data.endDate, setExp])

    const handleUpdate = () => {
        //console.log("update", experience);
        const validate = validation(experience);
        if (validate.error) {
            onSave({type: STRINGS.TYPES.PROFILE_UPD.EXP_INFO, data: experience, index: index});
            onClose();
        } else {
            alert(validate.message)
        }

    }

    const handleAdd = () => {
        //console.log("add", experience);
        const validate = validation(experience);
        if (validate.error) {
            onSave({type: STRINGS.TYPES.PROFILE_UPD.EXP_INFO, data: experience});
            onClose();
        } else {
            alert(validate.message)
        }

    }


    const handleChange = useCallback((ev) => {
        ev.persist();
        //console.log("abc", [ev.target.name])
        setExp(experience => ({
            ...experience,
            [ev.target.name]: ev.target.type === "checkbox" ? ev.target.checked : ev.target.type === "date" ? new Date(ev.target.value).toISOString() : ev.target.value
        }));
        //console.log("abc", experience)
    }, [])

    const validation = ({title, company, city, startDate, endDate, description, webLink}) => {
        let valid = {error: true, message: ""}
        if (title === "") {
            valid.error = false
            valid.message += valid.message ? "\nTitle is required" : "Title is required"
        }
        if (company === "") {
            valid.error = false
            valid.message += valid.message ? "\nCompany name is required" : "Company name is required"
        }
        if (city === "") {
            valid.error = false
            valid.message += valid.message ? "\nLocation is required" : "Location is required"
        }
        // if (description === null) {
        //     valid.error = false
        //     valid.message += valid.message ? "\nDescription is required" : "Description is required"
        // }
        // if (webLink === null) {
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

        if(!experience.isCurrentlyWorking){
            if (startDate > endDate) {
                valid.error = false
                valid.message += valid.message ? "\nStart date should be less then end date" : "Start date should be less then end date"
            }
        }


        // if(isCurrentlyWorking === null){
        //     valid.error = false
        //     valid.message += valid.message ? "\nLocation is required" : "Location is required"
        // }
        return valid
    }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openExperienceModal ? `show` : ``}`}
                id="experience-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div
                    className="modal-dialog modal-dialog-centered"
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
                                    <h2 className="card-title mb-0">{!$.isEmptyObject(data) ? `Edit
                                        Experience` : `Add
                                        Experience`}</h2>
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ee-title">Title <span>*</span></label>
                                                <input
                                                    type="text"
                                                    id="ee-title"
                                                    name="title"
                                                    placeholder="Title"
                                                    // onChange={(e) => setExp(prevState => ({
                                                    //     ...prevState,
                                                    //     title: $(e.target).val()
                                                    // }))}
                                                    onChange={handleChange}
                                                    defaultValue={experience.title}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/*<div className="row">*/}
                                    {/*    <div*/}
                                    {/*        className="col-lg-12 col-md-12 col-sm-12">*/}
                                    {/*        <div className="single-input mb-25">*/}
                                    {/*            <label htmlFor="employment-type">Employment*/}
                                    {/*                Type </label>*/}
                                    {/*            <select name="employment-type"*/}
                                    {/*                    id="employment-type"*/}
                                    {/*                    className="w-100">*/}
                                    {/*                <option value="">-</option>*/}

                                    {/*            </select>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ee-company">Company <span>*</span></label>
                                                <input
                                                    type="text"
                                                    id="ee-company"
                                                    name="company"
                                                    placeholder="Company "
                                                    // onChange={(e) => setExp(prevState => ({
                                                    //     ...prevState,
                                                    //     company: $(e.target).val()
                                                    // }))}
                                                    onChange={handleChange}
                                                    defaultValue={experience.company}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="ee-location">Location <span>*</span></label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="ee-location"
                                                    placeholder="Location "
                                                    // onChange={(e) => setExp(prevState => ({
                                                    //     ...prevState,
                                                    //     city: $(e.target).val()
                                                    // }))}
                                                    onChange={handleChange}
                                                    defaultValue={experience.city}
                                                />
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
                                                    checked={experience.isCurrentlyWorking}
                                                    // onChange={() => setExp(prevState => ({
                                                    //     ...prevState,
                                                    //     isCurrentlyWorking: !experience.isCurrentlyWorking
                                                    // }))}
                                                    onChange={handleChange}
                                                />
                                                <label
                                                    htmlFor="current-employee">I
                                                    am
                                                    currently
                                                    working in
                                                    this
                                                    role</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div
                                            className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                            <div
                                                className="row">
                                                <div
                                                    className="col-6">
                                                    <div
                                                        className="single-input mb-25">
                                                        <label
                                                            htmlFor="sd_month">Start
                                                            Date <span>*</span></label>
                                                        <input
                                                            name="startDate"
                                                            id="sd_month"
                                                            ref={startDate}
                                                            onChange={handleChange}
                                                            type="date"
                                                            defaultValue={parseDateFormat(experience.startDate)}
                                                            className="w-100"/>
                                                    </div>
                                                </div>
                                                {/*<div*/}
                                                {/*    className="col-6">*/}
                                                {/*    <div*/}
                                                {/*        className="single-input mb-25">*/}
                                                {/*        <label*/}
                                                {/*            className="invisible"*/}
                                                {/*            htmlFor="sd_year">Start*/}
                                                {/*            Date <span>*</span></label>*/}
                                                {/*        <select*/}
                                                {/*            name="sd_year"*/}
                                                {/*            id="sd_year"*/}
                                                {/*            className="w-100">*/}
                                                {/*            <option*/}
                                                {/*                value="">2020*/}
                                                {/*            </option>*/}
                                                {/*        </select>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                        {
                                            !experience.isCurrentlyWorking && (
                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                    <div className="row">
                                                        <div
                                                            className="col-6">
                                                            <div
                                                                className="single-input mb-25">
                                                                <label
                                                                    htmlFor="ed_month">End
                                                                    Date <span>*</span></label>
                                                                <input
                                                                    name="endDate"
                                                                    id="ed_month"
                                                                    type="date"
                                                                    ref={endDate}
                                                                    defaultValue={parseDateFormat(experience.endDate)}
                                                                    onChange={handleChange}
                                                                    // onChange={(e) => setExp(prevState => ({
                                                                    //     ...prevState,
                                                                    //     endDate: $(e.target).val()
                                                                    // }))}
                                                                    className="w-100"/>
                                                            </div>
                                                        </div>
                                                        {/*<div*/}
                                                        {/*    className="col-6">*/}
                                                        {/*    <div*/}
                                                        {/*        className="single-input mb-25">*/}
                                                        {/*        <label*/}
                                                        {/*            className="invisible"*/}
                                                        {/*            htmlFor="ed_year">End*/}
                                                        {/*            Date <span>*</span></label>*/}
                                                        {/*        <select*/}
                                                        {/*            name="ed_year"*/}
                                                        {/*            id="ed_year"*/}
                                                        {/*            className="w-100">*/}
                                                        {/*            <option*/}
                                                        {/*                value="">2020*/}
                                                        {/*            </option>*/}
                                                        {/*        </select>*/}
                                                        {/*    </div>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>
                                            )
                                        }

                                    </div>

                                    {/*<div className="row">*/}
                                    {/*    <div className="col-12">*/}
                                    {/*        <div>*/}
                                    {/*            <input id="update-industry"*/}
                                    {/*                   type="checkbox"*/}
                                    {/*                   className="checkbox"/>*/}
                                    {/*            <label htmlFor="update-industry">Update*/}
                                    {/*                my*/}
                                    {/*                industry</label>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    {/*<div className="row">*/}
                                    {/*    <div className="col-12">*/}
                                    {/*        <div>*/}
                                    {/*            <input*/}
                                    {/*                id="update-history"*/}
                                    {/*                type="checkbox"*/}
                                    {/*                onChange={(e)=> setExp(prevState => ({*/}
                                    {/*                    ...prevState,*/}
                                    {/*                    startDate:e.target.value*/}
                                    {/*                }))}*/}
                                    {/*                defaultValue={experience.}*/}
                                    {/*                className="checkbox"/>*/}
                                    {/*            <label*/}
                                    {/*                htmlFor="update-history">Update*/}
                                    {/*                my*/}
                                    {/*                headline</label>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="single-input mb-25">
                                                <label
                                                    htmlFor="wk_descp">Description </label>
                                                <textarea
                                                    rows="5"
                                                    name="description"
                                                    id="wk_descp"
                                                    // onChange={(e) => setExp(prevState => ({
                                                    //     ...prevState,
                                                    //     description:$(e.target).val()
                                                    // }))}
                                                    onChange={handleChange}
                                                    defaultValue={experience.description}
                                                    placeholder="Description"
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
                                                <div className="col-12">
                                                    <input
                                                        style={{width:"100%"}}
                                                        type="text"
                                                        id="webLink"
                                                        name="webLink"
                                                        onChange={handleChange}
                                                        placeholder="webLink"
                                                        defaultValue={experience.webLink}
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

export default ExperienceModal;