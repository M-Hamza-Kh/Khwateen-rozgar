import React, { useEffect, useState } from 'react';
import { dropDownSelection } from "../../../utils/base";
import $ from "jquery";

const ScheduleInterviewModal = (props) => {
    const { openScheduleInterviewOn, onSave, onClose } = props;
    // const [dVal, setDVal] = useState(new Date().toISOString());
    const adddate = new Date();
    const [dVal, setDVal] = useState(adddate.setDate(adddate.getDate() + 5));

    useEffect(() => {
        $("#Type").val("Video Conference");
    }, [])

    const handleUpdate = () => {
        onSave(dVal, $("#Type").val());
        onClose()
    }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openScheduleInterviewOn ? `show` : ``}`}
                id="about-modal"
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
                                <header className="card-header" style={{ textAlign: "start" }}>
                                    <h2 className="card-title mb-0">Schedule For Interview Date</h2>
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">

                                            <div className="single-input">
                                                <label htmlFor="last-name">Type :</label>
                                                <select className="nice-select wide"
                                                    name="Type" id="Type">
                                                    {
                                                        dropDownSelection()
                                                    }
                                                    <option key={"Video Conference"} value={"Video Conference"}>Video Conference</option>
                                                    <option key={"Walk in interview"} value={"Walk in interview"}>Walk in interview</option>
                                                </select>
                                            </div>

                                            <div className="single-input" style={{ textAlign: "start" }}>
                                                <label
                                                    htmlFor="about-summary">Schedule For Interview Date :</label>
                                                <input type="datetime-local" id="scheduleForInterviewOn"
                                                    name="scheduleForInterviewOn"
                                                    //    onChange={(ev) =>
                                                    //        setDVal(new Date(ev.target.value).toISOString())
                                                    //    }
                                                    onChange={(ev) =>
                                                        setDVal(ev.target.value)
                                                    }
                                                    defaultValue={dVal}
                                                    //defaultValue={dVal.split(".")[0]}
                                                    placeholder="Schedule For Interview On" />
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
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Schedule Interview
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

export default ScheduleInterviewModal;