import React, { useState } from 'react';
import { dropDownSelection, STRINGS } from "../../../utils/base";

const PaymentSelectionModal = (props) => {
    const { openPaymentSelectionModal, defaultVal, onSave, onClose } = props;
    const [dVal, setDVal] = useState(defaultVal);

    const handleUpdate = () => {
        let aboutObj = {
            type: '',
            data: dVal
        }
        onSave(aboutObj);
        onClose()
    }

    return (
        <React.Fragment>
            <div
                className={`modal fade profile-modal-container show`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                    role="document" style={{ justifyContent: "center" }}>
                    <div className="modal-content" style={{ width: "inherit" }}>
                        <button type="button" onClick={() => {
                            onClose()
                        }} className="close"
                            data-dismiss="modal"
                            aria-label="Close">
                            <span aria-hidden="true"
                            >&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header" style={{height:'48px'}}>
                                    <div className="card-title mb-5 mt-5" style={{ fontSize: "12px" }}>
                                        &nbsp;
                                        {/*Application*/}
                                        {/*for {props.title}*/}
                                    </div>
                                </header>
                                <div className="card-body">
                                    <div className="row mt-20">
                                        <div className="col-12">
                                            <div className="d-flex width-100">
                                                <div class="jumbotron" style={{backgroundColor : 'rgba(194,85,160,0.2)'}}>
                                                    <h3 class="display-4">Bank Transfer</h3>
                                                    <p class="lead">
                                                        Transfer in our Bank Account online and send receipt to <strong> payments@khawateenrozgar.com </strong>
                                                    </p>
                                                    <div class="row">
                                                        <div class = "col-md-2">
                                                        <strong>Account title:</strong>
                                                        </div>
                                                        <div class = "col-md-3">
                                                        Khawateen rozgar services
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class = "col-md-2">
                                                       <strong>Bank:</strong> 
                                                        </div>
                                                        <div class = "col-md-3">
                                                        Habib Bank Limited
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class = "col-md-2">
                                                        <strong>Account #:</strong>
                                                        </div>
                                                        <div class = "col-md-3">
                                                        11137902739603
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class = "col-md-2">
                                                        <strong>IBAN:</strong>
                                                        </div>
                                                        <div class = "col-md-6">
                                                        PK74 HABB 0011137902739603
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

export default PaymentSelectionModal;