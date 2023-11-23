import React from 'react';
import {ProfileUpdated} from "../profileUpdated";
import {STRINGS} from "../../../utils/base";


const ProfileViewPopUp = (props) => {
    const {onClose} = props;
//console.log("profile",props.data)
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
                                        <div className="col-12">
                                            <ProfileUpdated userData={props.data} isCompany={props.data.type === STRINGS.USER_TYPE.COMPANY_TYPE} />
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

export default ProfileViewPopUp;