import React from 'react';
import { dropDownSelection, getUserData, STRINGS } from "../../../utils/base";
import JobPost from "../jobPost";
import { API } from "../../../utils/services";
import $ from "jquery";
import swal from 'sweetalert';
//import Swal from 'sweetalert2';
import { withRouter } from "react-router-dom";

const JobPostDetailModal = (props) => {
    let { openJobPostDetails, onClose, data } = props;

    const handleUpdate = () => {
        API.JOBS.jobApproved(data.id, data).then((response) => {
            if (response.status) {

               // alert("Job Approved Successfully");
               swal("", "Job Approved Successfully", "success")
               props.history.push('/job_list')
             //   window.location.href = STRINGS.ROUTES.DASHBOARD.JOB_LIST
            }
        });
    }

    const handleUpdateChanges = () => {
        API.JOBS.jobUpdatesApproved(data.id, data).then((response) => {
            if (response.message === "") {
                swal("", "Job Updated Successfully", "success")
                props.history.push('/job_list')   
                //window.location.href = STRINGS.ROUTES.DASHBOARD.JOB_LIST
            }
            else
            {
                //alert(response.message);
                swal("",response.message, "error")
                props.history.push('/job_list')  
                //window.location.href = STRINGS.ROUTES.DASHBOARD.JOB_LIST
            }
        });
    }

    const isUpdatesAvailable = () => {
        API.JOBS.jobUpdatesAvailable(data.id).then((response) => {
            response.data == true ? $(".updates").css({ visibility: 'hidden' }) : $(".updates").css({ visibility: 'visible' })
        });
    }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openJobPostDetails ? `show` : ``}`}
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
                                <header className="card-header">
                                    {/*<h2 className="card-title mb-0">Edit About</h2>*/}
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <JobPost data={data} onClose={() => onClose()} />
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className='row no-gutter'>
                                        <div className='col-md-2 px-0 mx-0'>
                                            {
                                                //data.status === "Waiting for Approval" &&
                                                getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                    <div className="">
                                                        <div className="">
                                                            <div
                                                                className="profile-action-btn">
                                                                <button
                                                                    //onClick={handleUpdate}
                                                                    onClick={() => { handleUpdate(); onClose();}}
                                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Approved
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )

                                            }
                                        </div>
                                        <div className='col-md-2 px-0'>
                                            {
                                                getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                    <div className="updates">
                                                        <div className="">
                                                            <div
                                                                className="profile-action-btn">
                                                                <button
                                                                   // onClick={handleUpdateChanges}
                                                                    onClick={() => { handleUpdateChanges(); onClose();}}
                                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Approve Updates
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
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

export default withRouter(JobPostDetailModal);
