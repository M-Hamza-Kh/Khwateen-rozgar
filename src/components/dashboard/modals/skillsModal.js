import React, { useEffect, useState } from 'react';
import { dropDownSelection, STRINGS } from "../../../utils/base";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const data = [
    {
        value: 0,
        label: 'JQuery'
    },
    {
        value: 1,
        label: 'CSS'
    },
    {
        value: 2,
        label: 'Javascript'
    },
    {
        value: 3,
        label: 'Angular'
    },
    {
        value: 4,
        label: 'Flutter'
    },
    {
        value: 5,
        label: 'Androvalue'
    },
    {
        value: 6,
        label: 'C Sharp'
    },
    {
        value: 7,
        label: 'VB Script'
    },
    {
        value: 8,
        label: 'Google API'
    },
    {
        value: 9,
        label: 'JSON'
    },
    {
        value: 10,
        label: 'Ajax'
    },
    {
        value: 11,
        label: 'English'
    },
    {
        value: 12,
        label: 'Arabic'
    }


];
const SkillsModal = (props) => {

    let { openSkillsModal, onClose, selectedOption, onSave } = props;
    //console.log("skills",selectedOption)
    const [selectedOpt, setSelectedOpt] = useState([]);

    useEffect(() => {
        const selArray = selectedOption.map((d, index) => {
            return { value: index, label: d }
        })
        setSelectedOpt(selArray)
    }, [selectedOption])

    const handleChangeSkills = (selectedOption) => {
        //console.log("skills",selectedOption)
        if (selectedOption.length > 1) {
            setSelectedOpt(selectedOption);
        }
    }

    const handleDeleteSkill = (skl) => {
        //console.log("skills",skl)
        //selectedOpt.splice(selectedOpt.indexOf(skl),1);
        setSelectedOpt(selectedOpt.filter((d) => d.label !== skl.label));
    }

    const handleUpdate = () => {
        //console.log("skills",selectedOpt);
        if (selectedOpt.length !== 0) {
            onSave({
                type: STRINGS.TYPES.PROFILE_UPD.SKILLS, data: selectedOpt.map((s) => {
                    return s.label
                })
            });
            onClose()
        } else {

        }
    }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openSkillsModal ? `show` : ``}`}
                id="skills-modal" tabIndex="-1"
                role="dialog" aria-hidden="true">
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
                                    <h2 className="card-title mb-0">Skills</h2>
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <input style={{ width: `300px`, height: `50px`, padding: `12px 15px`, fontFamily: `sans-serif, work Sans`, color: `gray`, border: `1px solid #d1d3da` }}
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    placeholder='Add New Skill'
                                                />
                                            </div>

                                            <br />
                                            <br />
                                            <div
                                                className="single-input mb-25">
                                                {/* <input type="text" */}
                                                {/*       className="js-example-basic-single w-100"*/}
                                                {/*       id="ee-school"*/}
                                                {/*       placeholder="School"*/}
                                                {/*       value="School"/>*/}
                                                <Select
                                                    defaultValue={selectedOpt}
                                                    isMulti
                                                    onChange={handleChangeSkills}
                                                    options={data}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <ul className="selected-skills">
                                                {
                                                    selectedOpt.length > 0 ?
                                                        selectedOpt.map((skl) =>
                                                            <li>
                                                                <div className="row">
                                                                    <div
                                                                        className="col-1">
                                                                        <NavLink
                                                                            to="#"><FontAwesomeIcon
                                                                                icon={faThumbtack} />
                                                                        </NavLink>
                                                                    </div>
                                                                    <div
                                                                        className="col-10"
                                                                        style={{ padding: "0" }}>
                                                                        {skl.label}
                                                                    </div>
                                                                    <div
                                                                        className="col-1">
                                                                        <NavLink
                                                                            onClick={() => handleDeleteSkill(skl)}
                                                                            to="#"><FontAwesomeIcon
                                                                                icon={faTrashAlt} /></NavLink>
                                                                    </div>
                                                                </div>
                                                            </li>

                                                        ) : ""
                                                }
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">
                                                {/*<button*/}
                                                {/*    className="ht-btn theme-btn theme-btn-two mb-xs-20">Delete*/}
                                                {/*</button>*/}
                                                <button
                                                    onClick={handleUpdate}
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
            <div className="modal-backdrop fade show" />
        </React.Fragment>
    );
};

export default SkillsModal;