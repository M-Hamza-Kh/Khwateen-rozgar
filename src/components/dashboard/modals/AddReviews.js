import React, {useEffect, useState} from 'react';
import {dropDownSelection} from "../../../utils/base";
import {Rating} from "@material-ui/lab";
import SelectCities from "../../AutoComplete/SelectCities";
import $ from "jquery";
import {API} from "../../../utils/services";
import {pkCities} from "../../../utils/pk";
import defaultUserImg from "../../../content/images/portfolio/user_default.jpg";
import { withRouter } from "react-router-dom";
import swal from 'sweetalert';

const init = {
    CultureEnvironment: 0,
    Safety: 0,
    GrowthPotential: 0,
    anonymously: false,
    message: "",
}

const defaultForm = {
    "company": "",
    "companyLogoURL": "",
    "city": "",
    "address": "",
    "Reviews": [{
        CultureEnvironment: 0,
        Safety: 0,
        GrowthPotential: 0,
        anonymously: false,
        message: "",
    }]
}


const AddReviews = (props) => {
    const {
        openAddReviews, onClose, updateData,
        //onSave
    } = props;
    const [form, setForm] = useState(defaultForm);
    // const [getCities, setCities] = useState([]);
    const [city, setCity] = useState("");
    const [rate, setRating] = useState(init);
    const [upProfilePic, setUpProfilePic] = useState("");

    useEffect(() => {
        if (updateData !== undefined) {
            console.log("updateData", updateData)
            setForm({
                ...form,
                "id": updateData.id,
                "company": updateData.company,
                "companyLogoURL": updateData.companyLogoURL,
                "city": updateData.city,
                "address": updateData.address,
            })
            if (updateData.companyLogoURL !== "") {
                setUpProfilePic(updateData.companyLogoURL)
            }

            if (updateData.city !== "") {
                console.log("updateData", updateData.city)
                setCity(updateData.city)
            }

        }

        // const getUnique = () => {
        //     API.REVIEWS.getUniqueReviewsCities().then((res) => {
        //         if (res.status) {
        //             setCities(res.data.uniqueCities)
        //         } else {
        //             alert(res.error)
        //         }
        //     })
        // }
        // getUnique();
    }, [])

    const handleSelectCity = (selectedOption) => {
        setCity(selectedOption);
        setForm({
            ...form,
            city: selectedOption
        })
    }
    const validation = () => {
        let valid = {error: true, message: ""}

        if (form.company === "") {
            valid.error = false;
            valid.message += valid.message ? "\nCompany Name Required" : "Company Name Required"
        }
        if (form.address === "") {
            valid.error = false;
            valid.message += valid.message ? "\nAddress Required" : "Address Required"
        }
        if (form.city === "") {
            valid.error = false;
            valid.message += valid.message ? "\nCity Required" : "City Required"
        }
        if (form.message === "") {
            valid.error = false;
            valid.message += valid.message ? "\nReview Required" : "Review Required"
        }

        return valid
    }

    const handleUpdate = () => {
        const valid = validation();
        if (form.Reviews.length > 0) {
            if (valid.error) {
                console.log("form", form);
                API.REVIEWS.addReview(form).then((response) => {
                    console.log("validation", form);
                    if (response.status) {
                        swal("", "Review successfully add", "success")
                        //alert("Review successfully add")
                        onClose();
                        props.history.push('/reviews')  
                        //onSave(response.data);
                    } else {
                        alert(response.error)
                    }
                })
            } else {
                alert(valid.message)
            }
        } else {
            alert("Reviews Required")
        }

    }

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
                            companyLogoURL: data[0].path
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

    console.log("isDone", form)

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openAddReviews ? `show` : ``}`}
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
                                    <h2 className="card-title mb-0">Add Review</h2>
                                </header>
                                <div className="card-body">

                                    <div className="review-section section pb-120 pb-lg-100 pb-md-80 pb-sm-60 pb-xs-50">
                                        <div className="container faq-wrapper">
                                            <div className="row">
                                                <div
                                                    className="d-flex justify-content-center rounded-circle w-100 mb-10"
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
                                                            width: "100px",
                                                            height: "100px",
                                                            cursor: "pointer",
                                                            borderRadius: "50%"
                                                        }}/>
                                                    }
                                                </div>
                                                <div className="col-12">

                                                    <form action="#" className="rating-form">
                                                        <div className="row row-40">

                                                            <div className="col-lg-12 ">
                                                                <div className="row">

                                                                    <div className="col-md-6 col-12 mb-20">
                                                                        <label> Company City </label>
                                                                        {/*<select className="nice-select">*/}
                                                                        {/*    <option>Karachi</option>*/}
                                                                        {/*    <option>Islamabad</option>*/}
                                                                        {/*    <option>Lahore</option>*/}
                                                                        {/*</select>*/}
                                                                        <SelectCities
                                                                            id="city"
                                                                            title="City"
                                                                            value={city}
                                                                            onChange={handleSelectCity}
                                                                            options={pkCities}
                                                                        />

                                                                    </div>

                                                                    <div className="col-md-6 col-12 mb-20">
                                                                        <label>Company Name</label>
                                                                        <input type="text"
                                                                               value={form.company}
                                                                               onChange={(ev) => setForm({
                                                                                   ...form,
                                                                                   company: ev.target.value
                                                                               })}
                                                                               placeholder="Company Name"/>
                                                                    </div>

                                                                    <div className="col-12 mb-20">
                                                                        <label>Company Address</label>
                                                                        <input type="text"
                                                                               value={form.address}
                                                                               onChange={(ev) => setForm({
                                                                                   ...form,
                                                                                   address: ev.target.value
                                                                               })}
                                                                               placeholder="Address line 1"/>
                                                                    </div>

                                                                    <div className="col-md-12 col-12 mb-20">
                                                                        <label>Review*</label>
                                                                        <textarea name="message"
                                                                                  value={rate.message}
                                                                                  onChange={(ev) => {
                                                                                      setRating({
                                                                                          ...rate,
                                                                                          message: ev.target.value
                                                                                      });
                                                                                      form.Reviews[0].message = ev.target.value
                                                                                  }}
                                                                                  rows="5"/>
                                                                    </div>

                                                                    <div className="col-md-12 col-12 mb-20">
                                                                        <div
                                                                            className="rating-breakdown d-flex justify-content-center">
                                                                            <ul>
                                                                                <li className="text-left">
                                                                                    <div className="rating-average">
                                                                                        <h3>Post Anonymously</h3>
                                                                                        <div
                                                                                            className="star">
                                                                                            <input
                                                                                                type="checkbox"
                                                                                                defaultChecked={rate.anonymously}
                                                                                                name="anonymously"
                                                                                                onChange={(e) => {
                                                                                                    console.log("anonymously", e.target.checked)
                                                                                                    setRating({
                                                                                                        ...rate,
                                                                                                        anonymously: e.target.checked
                                                                                                    });
                                                                                                    form.Reviews[0].anonymously = e.target.checked
                                                                                                }}
                                                                                                id="anonymously"
                                                                                            />
                                                                                            <label
                                                                                                style={{display: "none"}}
                                                                                                htmlFor="anonymously">Post
                                                                                                Anonymously</label>
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                                <li className="text-left">
                                                                                    <div className="rating-average">
                                                                                        <h3>Culture & Environment</h3>
                                                                                        <div className="star">
                                                                                            <Rating
                                                                                                className="rating-review"
                                                                                                style={{
                                                                                                    color: "#c355a0"
                                                                                                }}
                                                                                                precision={0.5}
                                                                                                value={rate.CultureEnvironment}
                                                                                                onChange={(event, newValue) => {
                                                                                                    setRating({
                                                                                                        ...rate,
                                                                                                        CultureEnvironment: newValue
                                                                                                    });
                                                                                                    form.Reviews[0].CultureEnvironment = newValue
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                                <li className="text-left">
                                                                                    <div className="rating-average">
                                                                                        <h3>Safety</h3>
                                                                                        <div className="star">
                                                                                            <Rating
                                                                                                className="rating-review"
                                                                                                style={{
                                                                                                    color: "#c355a0"
                                                                                                }}
                                                                                                precision={0.5}
                                                                                                value={rate.Safety}
                                                                                                onChange={(event, newValue) => {
                                                                                                    setRating({
                                                                                                        ...rate,
                                                                                                        Safety: newValue
                                                                                                    });
                                                                                                    form.Reviews[0].Safety = newValue
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                                <li className="text-left">
                                                                                    <div className="rating-average">
                                                                                        <h3>Growth Potential</h3>
                                                                                        <div className="star">
                                                                                            <Rating
                                                                                                className="rating-review"
                                                                                                style={{
                                                                                                    color: "#c355a0"
                                                                                                }}
                                                                                                precision={0.5}
                                                                                                value={rate.GrowthPotential}
                                                                                                onChange={(event, newValue) => {
                                                                                                    setRating({
                                                                                                        ...rate,
                                                                                                        GrowthPotential: newValue
                                                                                                    })
                                                                                                    form.Reviews[0].GrowthPotential = newValue
                                                                                                }}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>

                                                                    {/*<div className="col-md-3">*/}
                                                                    {/*    <button className="ht-btn black-btn">Submit*/}
                                                                    {/*    </button>*/}
                                                                    {/*</div>*/}


                                                                </div>

                                                            </div>

                                                        </div>
                                                    </form>

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
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Add
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

export default withRouter(AddReviews);