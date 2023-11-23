import React, {useEffect, useState} from 'react';
import {dropDownSelection} from "../../../utils/base";
import 'react-bootstrap-tagsinput/dist/index.css';
import {API} from "../../../utils/services";
import $ from "jquery";
import defaultUserImg from "../../../content/images/portfolio/user_default.jpg";

const defaultState = {
    "title": "",
    "type": "",
    "pageContent": "",
    "imageURL": "",
    "link": "#",
    "position": 1
}


const AddLargeBannersModal = (props) => {
    let {openLargeBannerComposer, onClose, onSave, isUpdate,addType} = props;
    const [form, setForm] = useState(defaultState);
    const [imageURL, setImageURL] = useState("");
    const [upProfilePic, setUpProfilePic] = useState("");

    useEffect(() => {
        if (isUpdate !== undefined) {
            console.log("isUpdate", isUpdate)
            setForm({
                ...isUpdate
            })
            setUpProfilePic(isUpdate.imageURL)
            setImageURL(isUpdate.imageURL);
            $("#position").val(isUpdate.position);
            $("#uploadLink").val(isUpdate.link)
        }
    }, [])


    const validation = ({title, link}) => {
        let valid = {error: true, message: ""}
        const regex_url = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/; ///(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
        if (link === "") {
            valid.error = false;
            valid.message += valid.message ? "\nLink Required" : "\nLink Required";
        } else if (!regex_url.test(link)) {
            valid.error = false;
            valid.message += valid.message ? "\nLink is not valid" : "\nLink is not valid";
        }
        if (title === "") {
            valid.error = false;
            valid.message += valid.message ? "\nTitle Required" : "\nTitle Required";
        }

        return valid
    }


    const handleUpdate = () => {

        let valid = validation(form)
        if (valid.error) {
            console.log("isUpdate", form)
            if (isUpdate === undefined) {
                API.CONTENT.addContent({
                    ...form,
                    title: $("#title").val(),
                    link: $("#uploadLink").val(),
                    imageURL: imageURL,
                    position: $("#position").val(),
                    type: addType
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
                API.CONTENT.updateContent(form.id, {
                    ...form,
                    title: $("#title").val(),
                    link: $("#uploadLink").val(),
                    imageURL: imageURL,
                    position: $("#position").val(),
                }).then((res) => {
                    if (res.status) {
                        alert("Update Successfully");
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


    const handleCoverChange = () => {
        $(".inp-file-profile").trigger('click');
    };

    const handleProfileChange = (e) => {
        let formData = $("#formData")[0];
        //console.log("imageRes", formData)
        if (e.target.files && e.target.files[0]) {
            const validFile = {status: true, message: 'select file'};
            if (validFile.status) {
                let reader = new FileReader();
                const file = e.target.files[0];
                reader.onloadend = () => {
                    setUpProfilePic(reader.result)
                };
                API.UPLOAD.upload(formData).then((response) => {
                    let {status, error, data} = response;
                    if (status) {
                        setForm({
                            ...form,
                            imageURL: data[0].path
                        })
                        setImageURL(data[0].path)
                    } else {
                        alert(error)
                    }
                })
                reader.readAsDataURL(file);
            } else {
                //console.log(validFile.message);
                alert(validFile.message)
            }
        }
    };

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openLargeBannerComposer ? `show` : ``}`}
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
                                        <div className="d-flex" style={{minHeight: "19rem"}}>
                                            <div className="d-flex w-100">
                                                <div style={{flex: "2"}} className="d-flex flex-column">
                                                    <div
                                                        className="d-flex m-2 w-100 justify-content-center align-items-center">
                                                        <div className="mr-4 ml-4">
                                                            <label>Title</label>
                                                        </div>
                                                        <div className="d-flex ml-1 mr-1 w-100">
                                                            <input
                                                                id="title"
                                                                className="w-100"
                                                                defaultValue={form.title}
                                                                placeholder="Banner Title"
                                                                onChange={(e) => {
                                                                    setForm({
                                                                        ...form,
                                                                        title: e.target.value
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div
                                                        className="d-flex m-2 w-100 justify-content-center align-items-center">
                                                        <div className="mr-4 ml-4">
                                                            <label>Paste Url</label>
                                                        </div>
                                                        <div className="d-flex w-100">
                                                            <input
                                                                id="uploadLink"
                                                                className="w-100"
                                                                defaultValue={form.link}
                                                                placeholder="Paste url here..."
                                                                onChange={(e) => {
                                                                    setForm({
                                                                        ...form,
                                                                        link: e.target.value
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="d-flex m-2 w-100 justify-content-center align-items-center">
                                                        <div className="mr-4 ml-4">
                                                            <label>Position</label>
                                                        </div>
                                                        <select className="nice-select wide" name="city"
                                                                id="position">
                                                            {dropDownSelection()}
                                                            <option value="">Select Position</option>
                                                            <option value={1}>1</option>
                                                            <option value={2}>2</option>
                                                            <option value={3}>3</option>
                                                            <option value={4}>4</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div style={{margin: "0 5rem"}}
                                                     className="d-flex justify-content-center">
                                                    <div className="card-header-icon bottom-left-icon rounded-circle"
                                                         style={{
                                                             fontSize: `inherit`,
                                                             left: `inherit`,
                                                             padding: `0`
                                                         }}
                                                         onClick={handleCoverChange}>
                                                        <form id="formData" method="POST">
                                                            <input type="file" className="inp-file-profile"
                                                                   accept="image/*"
                                                                   name="files"
                                                                   multiple
                                                                   onChange={handleProfileChange}
                                                            />
                                                        </form>
                                                        {
                                                            <img alt="#"
                                                                 src={upProfilePic !== "" ? upProfilePic : defaultUserImg}
                                                                 className=""
                                                                 style={{width: "15rem", cursor: "pointer"}}
                                                            />
                                                        }
                                                    </div>
                                                    <div className="upload-pic-typo"
                                                         onClick={handleCoverChange}>
                                                        Upload Profile
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
                                                    {
                                                        isUpdate !== undefined ? "Update" : "Add"
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

export default AddLargeBannersModal;