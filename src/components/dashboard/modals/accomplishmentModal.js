import React, {useState} from 'react';
import {dropDownSelection, STRINGS} from "../../../utils/base";

const AccomplishmentModal = (props) => {
    const {openAccomplishment, defaultVal,onSave,onClose} = props;
    const [dVal, setDVal] = useState(defaultVal);

    const handleUpdate = () => {
        let aboutObj = {
            type:STRINGS.TYPES.PROFILE_UPD.ACCOMPLISHMENT,
            data:dVal
        }
        onSave(aboutObj);
        onClose()
    }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openAccomplishment ? `show` : ``}`}
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
                                <header className="card-header">
                                    <h2 className="card-title mb-0">Accomplishment</h2>
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label
                                                    htmlFor="about-summary">Summary <span>*</span></label>
                                                <textarea rows="8"
                                                          onChange={(e) => setDVal(e.target.value)}
                                                          id="about-summary"
                                                          defaultValue={dVal}
                                                          placeholder="Summary"/>
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
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Update Profile
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

export default AccomplishmentModal;