import React, {useEffect, useState} from 'react';
import {dropDownSelection} from "../../../utils/base";
import {API} from "../../../utils/services";
import $ from "jquery";

const AddSettingsModal = (props) => {
    const {openComposer, defaultVal, onSave, onClose, defaultType} = props;
    const [dVal, setDVal] = useState("");
    const [uniqueTypes, setUniqueTypes] = useState([]);

    useEffect(() => {
        API.SETTINGS.getUniqueSetting().then(({status, data}) => {
            if (status) {
                //console.log("jbl", data);
                setUniqueTypes(data.uniqueTypes)
            }
        }).catch((err) => {
            alert(err)
        })
        if (defaultVal !== null) {
            setDVal(defaultVal.name);
            $("#Type").val(defaultVal.type);
        }
        //component Will UnMount / clean up
        // return ()=>{
        //
        // }
    }, [setUniqueTypes, setDVal])

    const handleUpdate = () => {
        let settingObj = {
            Type: defaultType !== null && defaultType,
            Name: dVal
        }
        if (defaultVal !== null) {
            onSave(settingObj, 2, defaultVal);
        } else {
            onSave(settingObj, 1);
        }
        handleClose()
    }

    const handleInpChange = (ev) => {
        setDVal(ev.target.value)
    }

    const handleClose = () => {
        setDVal("")
        onClose()
    }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openComposer ? `show` : ``}`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                     role="document">
                    <div className="modal-content">
                        <button type="button" className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                                                    <span aria-hidden="true"
                                                                          onClick={handleClose}>&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header">
                                    <h2 className="card-title mb-0 pt-10 pb-10"
                                        style={{fontSize: "21px"}}>{defaultVal !== null ? "Edit Settings" : "Add Settings"}</h2>
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <div className="single-input">
                                                            <label htmlFor="first-name">Name </label>
                                                            <input type="text"
                                                                   id="name"
                                                                   name="Name"
                                                                   placeholder="Name"
                                                                   onChange={handleInpChange}
                                                                   defaultValue={dVal}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <div className="single-input">
                                                            <label htmlFor="last-name"> Type </label>
                                                            {
                                                                defaultType === null ?
                                                                    uniqueTypes.length > 0 && (
                                                                        <select className="nice-select wide"
                                                                                name="Type" id="Type">
                                                                            {
                                                                                dropDownSelection()
                                                                            }
                                                                            {
                                                                                uniqueTypes.map((ut, index) => {
                                                                                        return (<option key={index}
                                                                                                        value={ut}>{ut}</option>)
                                                                                    }
                                                                                )
                                                                            }
                                                                        </select>)
                                                                    :
                                                                    <div className="d-flex w-100">
                                                                        {defaultType}
                                                                    </div>
                                                            }
                                                        </div>
                                                    </div>
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
                                                    onClick={handleUpdate}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">
                                                    {defaultVal !== null ? "Update" : "Add"}
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

export default AddSettingsModal;