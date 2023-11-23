import React, {useEffect, useState} from 'react';
import {CONTENT_URL, currentDateFormat, dropDownSelection, getUserData, STRINGS} from "../../../utils/base";
import {FormControl} from "@material-ui/core";
import $ from "jquery";
import {InputTags} from 'react-bootstrap-tagsinput';
import 'react-bootstrap-tagsinput/dist/index.css';
import HtmlInput from "../../QuilInput";
import {API} from "../../../utils/services";
import defaultUserImg from "../../../content/images/portfolio/user_default.jpg";

const defaultState = {
    "title": "",
    "Category": "",
    "tags": [],
    "details": "",
    "author": `${getUserData().firstName} ${getUserData().lastName}`,
    "aboutAuthor": "",
    "publishOn": (new Date()).toISOString(),
    "imageURL": ""
}


const AddBlogModal = (props) => {
    let {openBlogComposer, onClose,data,onSave} = props;
    const [tags, setTags] = useState([]);
    const [form, setForm] = useState(defaultState);
    const [upProfilePic, setUpProfilePic] = useState("");

    const handleCoverChange = () => {
        $(".inp-file-profile").trigger('click');
    };

    const handleProfileChange = (e) => {
        let formData = $("#formData")[0];
        console.log("imageRes", formData)
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
                    } else {
                        alert(error)
                    }
                })
                reader.readAsDataURL(file);
            } else {
                console.log(validFile.message);
                alert(validFile.message)
            }
        }
    };

    useEffect(() => {
        $(function () {
            let dtToday = new Date();

            let month = dtToday.getMonth() + 1;
            let day = dtToday.getDate();
            let year = dtToday.getFullYear();
            if (month < 10)
                month = '0' + month.toString();
            if (day < 10)
                day = '0' + day.toString();

            let maxDate = year + '-' + month + '-' + day;
            // alert(maxDate);
            $('#date').attr('min', maxDate);
        });

        if(data !== undefined){
            setForm({
                ...data,
            });
            $("#category").val(data.category);
            $("#aboutAuthor").val(data.aboutAuthor);
            setTags(data.tags);
            setUpProfilePic(`${CONTENT_URL}${data.imageURL}`)
        }

        console.log("data",data)
        // $(document).ready(() => {
        //     $("#category").on("change", function (e) {
        //         console.log("approved", e.target.value);
        //         setForm({
        //             ...form,
        //             Category: e.target.value
        //         })
        //     })
        // })

    }, [])

    const validation = (form) => {
        let valid = {error: true, message: ""}
        if (form.Category === "") {
            valid.error = false;
            valid.message += valid.message ? "\nCategory Required" : "\nCategory Required";
        }
        if (form.Title === 0) {
            valid.error = false;
            valid.message += valid.message ? "\nTitle Required" : "\nTitle Required";
        }
        if (form.Tags.length === 0) {
            valid.error = false;
            valid.message += valid.message ? "\nTags Required" : "\nTags Required";
        }
        if (form.Details === "") {
            valid.error = false;
            valid.message += valid.message ? "\nDetails Required" : "\nDetails Required";
        }
        if (form.AboutAuthor === "") {
            valid.error = false;
            valid.message += valid.message ? "\nAbout Author Required" : "\nAbout Author Required";
        }
        if (form.Author === "") {
            valid.error = false;
            valid.message += valid.message ? "\nAuthor Required" : "\nAuthor Required";
        }
        return valid
    }

    const handleUpdate = () => {
        form.Tags = tags;
        form.Category = $("#category").val();
        console.log("addBlog", form);

        let valid = validation(form)
        if (valid.error) {
            if(data !== undefined){
                API.BLOGS.updateBlog(form.id,form).then((res) => {
                    if (res.status) {
                        alert("Blog Updated Successfully");
                        onClose();
                        onSave();
                    } else {
                        alert(res.error)
                    }
                })
            }else{
                API.BLOGS.addBlog(form).then((res) => {
                    if (res.status) {
                        alert("Blog Added Successfully");
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
                                        <div className="d-flex w-100 justify-content-center">
                                            <div
                                                className="card-header-icon bottom-left-icon"
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
                                                         className="" style={{
                                                        width: "200px",
                                                        cursor: "pointer",
                                                        marginBottom: "1rem"
                                                    }}/>
                                                }
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex w-100 align-items-center">
                                                <div className="d-flex ml-4 mr-4" style={{width: "10rem"}}>
                                                    <label>Title</label>
                                                </div>
                                                <div className="single-input d-flex ml-4 mr-4">
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        defaultValue={form.title}
                                                        onChange={handleChangeInput}
                                                        placeholder={"Title"}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex w-100 align-items-center">
                                                <div className="d-flex ml-4 mr-4" style={{width: "10rem"}}>
                                                    <label>Category</label>
                                                </div>
                                                <div className="single-input d-flex ml-4 mr-4">
                                                    <FormControl style={{
                                                        // display: "flex",
                                                        width: "100%",
                                                        margin: "5px 0",
                                                        color: `${STRINGS.TYPES.COLORS.DEFAULT}`
                                                    }}>
                                                        {/*<InputLabel id="demo-simple-select-label"*/}
                                                        {/*            style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}>Types</InputLabel>*/}

                                                        <select id="category" className="nice-select wide"
                                                                name="category">
                                                            {dropDownSelection()}
                                                            <option value="Career Advice">Career Advice</option>
                                                            {/*<option value="Job Skills">Job Skills</option>*/}
                                                            <option value="News & Update">News & Update</option>
                                                            {/*<option value="Advice">Advice</option>*/}
                                                            <option value="Blog">Blog</option>
                                                            {/*<option value="Branding">Branding</option>*/}
                                                        </select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <div className="d-flex w-100 align-items-center">
                                                <div className="d-flex ml-4 mr-4" style={{width: "10rem"}}>
                                                    <label>Author</label>
                                                </div>
                                                <div className="single-input d-flex ml-4 mr-4">
                                                    <input
                                                        type="text"
                                                        name="Author"
                                                        onChange={handleChangeInput}
                                                        placeholder={"Author"}
                                                        value={`${getUserData().firstName} ${getUserData().lastName}`}
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex w-100 align-items-center">
                                                <div className="d-flex ml-4 mr-4" style={{width: "10rem"}}>
                                                    <label>Publish on</label>
                                                </div>
                                                <div className="single-input d-flex ml-4 mr-4">
                                                    <input type="date" id="date"
                                                           name="publishOn"
                                                           onChange={handleChangeInput}
                                                           defaultValue={currentDateFormat(((new Date().getDate())))}
                                                           placeholder="Publish On"/>
                                                </div>
                                            </div>
                                            <div className="d-flex w-100 align-items-center">
                                                <div className="d-flex ml-4 mr-4" style={{width: "10rem"}}>
                                                    <label>Tags</label>
                                                </div>
                                                <div className="d-flex ml-4 mr-4 w-100">
                                                    <div className="input-group overflow-auto">
                                                        <InputTags className="flex-nowrap" values={tags}
                                                                   onTags={(value) => setTags(value.values)}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            {
                                                data !== undefined ?
                                                    <HtmlInput defaultDetails={data.details} onChange={(value) => {
                                                        setForm({
                                                            ...form,
                                                            Details: value
                                                        })
                                                    }}/> :
                                                    <HtmlInput defaultDetails={form.details} onChange={(value) => {
                                                        setForm({
                                                            ...form,
                                                            Details: value
                                                        })
                                                    }}/>
                                            }
                                        </div>
                                        <div className="d-flex">
                                            <div className="d-flex w-100 align-items-center">
                                                <div className="d-flex ml-4 mr-4" style={{width: "10rem"}}>
                                                    <label>About Author</label>
                                                </div>
                                                <div className="single-input d-flex ml-4 mr-4">
                                                    <textarea name="aboutAuthor"
                                                              id="aboutAuthor"
                                                              onChange={handleChangeInput}
                                                              placeholder="About Author"
                                                              rows="2"/>
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

export default AddBlogModal;