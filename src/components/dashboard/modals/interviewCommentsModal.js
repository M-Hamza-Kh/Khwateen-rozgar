import React, {useState} from 'react';
import {dropDownSelection} from "../../../utils/base";

const InterviewCommentsModal = (props) => {
    const {openInterviewComments,onSave,onClose} = props;
    const [dVal, setDVal] = useState("");

    const handleUpdate = () => {
        if(dVal !== ""){
            onSave(dVal);
            onClose()
        }else{
            alert("Comments are required.")
        }
    }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openInterviewComments ? `show` : ``}`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                     role="document">
                    <div className="modal-content">
                        <button type="button" className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                                                    <span aria-hidden="true"
                                                                          onClick={()=> onClose()}>&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header" style={{textAlign:"start"}}>
                                    <h2 className="card-title mb-0">Add comments</h2>
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input" style={{textAlign:"start"}}>
                                                <label
                                                    htmlFor="about-summary">Notes :</label>
                                                <textarea rows="5"
                                                          onChange={(e) => setDVal(e.target.value)}
                                                          id="interviewComments"
                                                          defaultValue={dVal}
                                                          placeholder="Write here..."/>
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
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Interviewed
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

export default InterviewCommentsModal;