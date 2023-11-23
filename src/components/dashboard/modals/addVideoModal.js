import React, {useState} from 'react';
import {dropDownSelection} from "../../../utils/base";
import 'react-bootstrap-tagsinput/dist/index.css';
import {API} from "../../../utils/services";
import $ from "jquery";

const defaultVideoState = {
    "title": "",
    "type": "",
    "pageContent": "",
    "imageURL": "",
    "link": "#",
    "position": 1
}


const AddVideoModal = (props) => {
    let {openVideoComposer, onClose, onSave} = props;
    const [form, setForm] = useState({});
    const [content, setContent] = useState(defaultVideoState);


    const validation = () => {
        let valid = {error: true, message: ""}
        if ($("#uploadVideo").val() === "") {
            valid.error = false;
            valid.message += valid.message ? "\nCategory Required" : "\nCategory Required";
        }
        if ($("#title").val() === "") {
            valid.error = false;
            valid.message += valid.message ? "\nTitle Required" : "\nTitle Required";
        }

        return valid
    }


    const handleUpdate = () => {

        let valid = validation()
        if (valid.error) {
            API.CONTENT.addContent({
                ...form,
                title: $("#title").val(),
                pageContent: $("#uploadVideo").val(),
                type: "YoutubeVideos"
            }).then((res) => {
                if (res.status) {
                    alert("Add Successfully");
                    onClose();
                    onSave();
                } else {
                    alert(res.error)
                }
            })
        } else {
            alert(valid.message)
        }
    }

    const handleChangeInput = (ev) => {
        if (ev.target.type === "date") {
            setForm({
                ...form,
                [ev.target.name]: new Date(ev.target.value).toISOString()
            })
        } else if (ev.target.type === "checkbox" || ev.target.type === "radio") {
            setForm({
                ...form,
                [ev.target.name]: ev.target.checked
            })
        } else {
            setForm({
                ...form,
                [ev.target.name]: ev.target.value
            })
        }
    }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openVideoComposer ? `show` : ``}`}
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
                                    {/*<h2 className="card-title mb-0" style={{fontSize: "20px"}}>Add Blog</h2>*/}
                                </header>
                                <div className="card-body">

                                    <div className="d-flex flex-column w-100" style={{marginBottom: "1rem"}}>
                                        <div className="d-flex">
                                            <div className="d-flex w-100 flex-column">
                                                <div className="d-flex">
                                                    <div className="d-flex ml-1 mr-1">
                                                        <div className="">
                                                            <label>Title</label>
                                                        </div>
                                                        <div className="d-flex ml-1 mr-1">
                                                            <input
                                                                id="title"
                                                                placeholder="Video Title"
                                                                onChange={(e) => {
                                                                    setForm({
                                                                        ...form,
                                                                        title: e.target.value
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>


                                                    <div className="d-flex ml-1 mr-1">
                                                        <div className="mr-4 ml-4">
                                                            <label>Paste Embed Url</label>
                                                        </div>
                                                        <div className="d-flex">
                                                            <input
                                                                id="uploadVideo"
                                                                defaultValue={content.pageContent}
                                                                placeholder="paste youtube embed code here..."
                                                                onChange={(e) => {
                                                                    setContent({
                                                                        ...content,
                                                                        pageContent: e.target.value
                                                                    })
                                                                }}
                                                            />
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
                                                <button
                                                    onClick={handleUpdate}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">
                                                    Add
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

export default AddVideoModal;