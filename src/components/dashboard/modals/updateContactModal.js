import React, {useEffect, useState} from 'react';
import {dropDownSelection} from "../../../utils/base";
import 'react-bootstrap-tagsinput/dist/index.css';
import HtmlInput from "../../QuilInput";
import {API} from "../../../utils/services";



const UpdateContentModal = (props) => {
    let {openBlogComposer, onClose,data,onSave} = props;
    const [form, setForm] = useState({});

    useEffect(() => {

        if(data !== undefined){
            setForm({
                ...data,
            });
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

    const handleUpdate = () => {

        let valid = {error:true,message:""}
        if (valid.error) {
            if(data !== undefined){
                API.CONTENT.updateContent(form.id,form).then((res) => {
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
                                    <h2 className="card-title mb-0" style={{fontSize: "20px"}}>Add Blog</h2>
                                </header>
                                <div className="card-body">

                                    <div className="d-flex flex-column w-100" style={{marginBottom: "1rem"}}>
                                        <div className="d-flex">
                                            {
                                                data !== undefined ?
                                                    <HtmlInput defaultDetails={data.pageContent} onChange={(value) => {
                                                        setForm({
                                                            ...form,
                                                            pageContent: value
                                                        })
                                                    }}/> :
                                                    <HtmlInput defaultDetails={form.pageContent} onChange={(value) => {
                                                        setForm({
                                                            ...form,
                                                            pageContent: value
                                                        })
                                                    }}/>
                                            }
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
                                                    {
                                                        data === undefined ? "Add" : "Update"
                                                    }
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

export default UpdateContentModal;