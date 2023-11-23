import React from 'react';
import {dropDownSelection} from "../../../utils/base";
import khawateenIcon from "../../../content/images/logo-purple.png"
import JitSiMeet from "./jitsiMeet";

const InterviewModal = (props) => {
    const {openModal, onClose,data} = props;

    // const handleUpdate = () => {
    //     //onSave(aboutObj);
    //     onClose()
    // }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openModal ? `show` : ``}`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                     role="document" style={{maxWidth: "90%"}}>
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
                                    <h2 className="card-title mb-0 pb-3 pt-3" style={{fontSize: "16px"}}>Conference Start</h2>
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex width-100" style={{
                                                justifyContent: "center",
                                                padding: "13px 0",
                                                border: "2px solid #cc72b0",
                                                borderRadius: "8px",
                                                margin: "5px 0",
                                                boxShadow: "inset -1px 0px 10px 2px #1f95a2"
                                            }}>
                                                <img src={khawateenIcon} alt={"#"}/>
                                            </div>
                                            <div className="single-input">
                                                {/*<label htmlFor="about-summary">Summary <span>*</span></label>*/}
                                                {/*<iframe*/}
                                                {/*    title="interview"*/}
                                                {/*    allow="camera; microphone"*/}
                                                {/*    src={"https://meet.jit.si/Khawateen20210201"}*/}
                                                {/*    className="d-flex"*/}
                                                {/*    style={{width: "100%", height: "80vh",borderRadius:"4px",border:"none"}}*/}
                                                {/*/>*/}
                                                <JitSiMeet data={data}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">
                                                {/*<button*/}
                                                {/*    onClick={handleUpdate}*/}
                                                {/*    className="ht-btn theme-btn theme-btn-two mb-xs-20">Update Profile*/}
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
            <div className="modal-backdrop fade show"/>
        </React.Fragment>
    );
};

export default InterviewModal;