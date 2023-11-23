import React, {useEffect, useState} from 'react';
import {dropDownSelection} from "../../../utils/base";
import 'react-bootstrap-tagsinput/dist/index.css';
import HtmlInput from "../../QuilInput";
import {API} from "../../../utils/services";
import $ from "jquery"

const defaultVideoState = {
    "title": "",
    "type": "",
    "pageContent": "",
    "imageURL": "",
    "link": "#",
    "position": 1
}


const UpdateAboutModal = (props) => {
    let {openBlogComposer, onClose, data, onSave, isContent, isUpdateVideo} = props;
    const [form, setForm] = useState({});
    const [content, setContent] = useState(defaultVideoState);

    useEffect(() => {

        if (data !== undefined && isContent === undefined) {
            setForm({
                ...data,
            });
        }

        if (isContent !== undefined) {
            setContent({
                ...content,
                type: "YoutubeVideos"
            })
        }

    }, [])

    // const validation = (form) => {
    //     let valid = {error: true, message: ""}
    //     if (form.Category === "") {
    //         valid.error = false;
    //         valid.message += valid.message ? "\nCategory Required" : "\nCategory Required";
    //     }
    //     if (form.Title === 0) {
    //         valid.error = false;
    //         valid.message += valid.message ? "\nTitle Required" : "\nTitle Required";
    //     }
    //     if (form.Tags.length === 0) {
    //         valid.error = false;
    //         valid.message += valid.message ? "\nTags Required" : "\nTags Required";
    //     }
    //     if (form.Details === "") {
    //         valid.error = false;
    //         valid.message += valid.message ? "\nDetails Required" : "\nDetails Required";
    //     }
    //     if (form.AboutAuthor === "") {
    //         valid.error = false;
    //         valid.message += valid.message ? "\nAbout Author Required" : "\nAbout Author Required";
    //     }
    //     if (form.Author === "") {
    //         valid.error = false;
    //         valid.message += valid.message ? "\nAuthor Required" : "\nAuthor Required";
    //     }
    //     return valid
    // }

    const handleUpdateVideo = (video) => {
        API.CONTENT.updateContent(video.id, {
            ...video,
            title: $(`#${video.id}-title`).val(),
            pageContent: $(`#${video.id}-pageContent`).val(),
        }).then((res) => {
            if (res.status) {
                alert("Updated Successfully");
            } else {
                alert(res.error)
            }
        })
    }

    const handleUpdate = () => {

        let valid = {error: true, message: ""}
        if (valid.error) {
            if (data !== undefined) {
                API.CONTENT.updateContent(form.id, form).then((res) => {
                    if (res.status) {
                        alert("Updated Successfully");
                        onClose();
                        onSave();
                    } else {
                        alert(res.error)
                    }
                })
            }
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
                className={`modal fade profile-modal-container ${openBlogComposer ? `show` : ``}`}
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
                                            {
                                                isContent === undefined ?
                                                    data !== undefined ?
                                                        <HtmlInput defaultDetails={data.pageContent}
                                                                   onChange={(value) => {
                                                                       setForm({
                                                                           ...form,
                                                                           pageContent: value
                                                                       })
                                                                   }}/> :
                                                        <HtmlInput defaultDetails={form.pageContent}
                                                                   onChange={(value) => {
                                                                       setForm({
                                                                           ...form,
                                                                           pageContent: value
                                                                       })
                                                                   }}/> :

                                                    <div className="d-flex w-100 flex-column">
                                                        <div className="d-flex flex-column">
                                                            {
                                                                data.length > 0 && (
                                                                    data.map((v) =>
                                                                        <div className="d-flex mb-4 mr-4 ml-4 justify-content-center align-items-center">
                                                                            <div className="">
                                                                                <label>{v.title}</label>
                                                                            </div>
                                                                            <div className="d-flex ml-1 mr-1">
                                                                                <input
                                                                                    id={`${v.id}-title`}
                                                                                    placeholder="Video Title"
                                                                                    defaultValue={v.title}
                                                                                />
                                                                            </div>
                                                                            <div className="d-flex ml-1 mr-1" style={{flex:"1"}}>
                                                                                <input
                                                                                    className="w-100"
                                                                                    id={`${v.id}-pageContent`}
                                                                                    placeholder="paste youtube embed code here..."
                                                                                    defaultValue={v.pageContent}
                                                                                />
                                                                            </div>
                                                                            <div className="d-flex ml-1 mr-1">
                                                                                <button
                                                                                    onClick={() => handleUpdateVideo(v)}
                                                                                    className="ht-btn black-btn">Update
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>

                                </div>
                                <div className="card-footer">
                                    {
                                        isUpdateVideo === undefined && (
                                            <div className="row">
                                                <div className="col-12">
                                                    <div
                                                        className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">
                                                        <button
                                                            onClick={handleUpdate}
                                                            className="ht-btn theme-btn theme-btn-two mb-xs-20">
                                                            {
                                                                data === undefined ? "Add" : "Update"
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
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

export default UpdateAboutModal;