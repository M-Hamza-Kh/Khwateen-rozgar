import React from 'react';
//import videoIntro from "../../../content/files2022/10/b87147e2-fd67-4259-9a64-b24ea1925ded.mp4";
const VideoPopUp = (props) => {
    
    let {src} = props;
    return (
        <React.Fragment>
            <div
                className={`modal fade profile-modal-container ${props.openVideoIntro ? `show` : ``}`}
                id="profile-modal" tabIndex="-1"
                role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal"
                                aria-label="Close">
                                                                <span aria-hidden="true"
                                                                      onClick={props.onClose}>&times;</span>
                        </button>
                        <div className="modal-body">
                            <section >
                                <video src={src} autoPlay/>
                            </section>
                        </div>
                    </div>

                </div>
            </div>
            <div className="modal-backdrop fade show"/>
        </React.Fragment>
    );
};

export default VideoPopUp;