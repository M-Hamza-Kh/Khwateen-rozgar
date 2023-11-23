import React from 'react';
import {Button} from "@material-ui/core";

const ConfirmModal = (props) => {
    const {onSave, onClose,id} = props;
    const handleUpdate = (confirm) => {
        if (confirm === 1) {
                onSave(id);
                onClose()
        } else {
            onClose();
        }
    }


    return (
        <React.Fragment>
            <div
                className={`modal fade profile-modal-container show`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                     role="document" style={{justifyContent: "center"}}>
                    <div className="modal-content" style={{width: "inherit"}}>
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
                                <header className="card-header">
                                    <div className="card-title mb-5 mt-5" style={{fontSize: "12px"}}>
                                        &nbsp;
                                        {/*Application*/}
                                        {/*for {props.title}*/}
                                    </div>
                                </header>
                                <div className="card-body">
                                    <div className="row mt-20">
                                        <div className="col-12">
                                            <div className="d-flex width-100">
                                                <div className="d-flex">
                                                    Are you sure you want to delete this?
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
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={() => handleUpdate(1)}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">
                                                    Confirm
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    onClick={() => handleUpdate(2)}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">
                                                    Cancel
                                                </Button>
                                                {/*<button*/}
                                                {/*    onClick={() => handleUpdate(false)}*/}
                                                {/*    className="ht-btn theme-btn theme-btn-two mb-xs-20">No*/}
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

export default ConfirmModal;