import React from 'react';
import {WEB_HOST_URL} from "../../../utils/base";


const ReferenceDocModal = (props) => {
    const {onClose,data} = props;
console.log("data",`${WEB_HOST_URL}${data}`)
    return (
        <React.Fragment>
            <div
                className={`modal fade profile-modal-container show`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                     role="document">
                    <div className="modal-content">
                        <button type="button" onClick={()=> {
                            onClose()
                        }} className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                                                    <span aria-hidden="true"
                                                                    >&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header">

                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <img alt="#" src={`${WEB_HOST_URL}${data}`}/>
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

export default ReferenceDocModal;