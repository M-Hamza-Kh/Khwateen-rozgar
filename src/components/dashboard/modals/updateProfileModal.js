import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { dropDownSelection, getUserData, STRINGS } from "../../../utils/base";
import $ from "jquery";
import GMap from "../../GoogleMap/GMap";
import { API } from "../../../utils/services";
import { pkCities } from "../../../utils/pk";
import SelectCities from "../../AutoComplete/SelectCities";

//let userData = isLogin() ? JSON.parse(localStorage.getItem(STRINGS.STORAGE.user)) : {}
// var userObject = {
//     "email": userData.email,
//     "type": userData.type,
//     "firstName": userData.firstName,
//     "lastName": userData.lastName,
//     "isEmailVerified": userData.isEmailVerified,
//     "about": userData.about,
//     "dob": userData.dob,
//     "gender": userData.gender,
//     "cnic": userData.cnic,
//     "address": userData.address,
//     "maritalStatus": userData.maritalStatus,
//     "phone": userData.phone,
//     "city": userData.city,
//     "country": userData.country,
//     "lastSalary": userData.lastSalary,
//     "cvurl": userData.cvurl,
//     "videoCVURL": userData.videoCVURL,
//     "skills": userData.skills,
//     "viewed": userData.viewed,
//     "showEmail": userData.showEmail,
//     "public": userData.public,
//     "experience": userData.experience,
//     "education": userData.education,
//     "accomplishment": userData.accomplishment,
//     "isActive": userData.isActive,
//     "createdOn": userData.createdOn,
//     "modifiedOn": userData.modifiedOn,
//     "id": userData.id,
//     "company": userData.company,
//     "headline": userData.headline,
//     "audioCVURL": userData.audioCVURL,
//     "openforOpportunity": userData.openforOpportunity,
//     "flag": userData.flag,
//     "numberofEmployees": userData.numberofEmployees,
//     "numberofEmployeesFemale": userData.numberofEmployeesFemale,
//     "companyPicture1": userData.companyPicture1,
//     "companyPicture2": userData.companyPicture2,
// }

const defaultLocation = {
    lat: 0,
    lng: 0
}

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

const UpdateProfileModal = (props) => {
    let { data, onSave, onClose } = props;
    let { education, country, experienceInYears } = useRef();
    let [userObj, setUserObj] = useState(data);
    let [location, setLocation] = useState(defaultLocation);
    let [getJobQualification, setJobQualification] = useState([]);
    let [getJobIndustries, setGetJobIndustries] = useState([]);
    const [form, setForm] = useState(defaultForm);
    // const [getCities, setCities] = useState([]);
    const [city, setCity] = useState("");
    const [rate, setRating] = useState(init);

    // useEffect(() => {
    //     dropDownSelection();
    //     if (userObj.companyLocation !== "") {
    //         let coords = userObj.companyLocation.split(",")
    //         setLocation({
    //             ...location,
    //             lat: parseFloat(coords[0]),
    //             lng: parseFloat(coords[1]),
    //         })
    //     }
    //     const getAll = async () => {
    //         let data_1 = await API.SETTINGS.getJobQualification().then((response) => {
    //             // console.log("types", response)
    //             let { status, error, data } = response;
    //             if (status) {
    //                 return data
    //             } else {
    //                 alert(error)
    //             }
    //         }).catch((err) => {
    //             alert(err)
    //         })
    //         let data_2 = await API.SETTINGS.getJobIndustry().then((response) => {
    //             // console.log("types", response)
    //             let { status, error, data } = response;
    //             if (status) {
    //                 return data
    //             } else {
    //                 alert(error)
    //             }
    //         }).catch((err) => {
    //             alert(err)
    //         })
    //         if (data_1.length > 0) {
    //             setJobQualification(data_1)
    //         }
    //         if (data_2.length > 0) {
    //             setGetJobIndustries(data_2)
    //         }
    //     };
    //     getAll();
    // }, [userObj])

    const handleCoverChange = () => {
        $(".inp-file-profile").trigger('click');
    };

    const handleProfileChange = (e) => {
        let formData = $("#formData")[0];
        //console.log("imageRes", formData)
        if (e.target.files && e.target.files[0]) {
            const validFile = { status: true, message: 'select file' };
            if (validFile.status) {
                let reader = new FileReader();
                const file = e.target.files[0];
                reader.onloadend = () => {
                    this.setState({
                        upProfilePic: reader.result,
                    });
                };
                API.UPLOAD.upload(formData).then((response) => {
                    let { status, error, data } = response;
                    if (status) {
                        this.handleUpdateProfile({ type: STRINGS.TYPES.PROFILE_UPD.PROFILE_PIC, data: data[0].path })
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


    const handleUpdateProfile = () => {
        //console.log("userUpdate", userObj);
        const validation = Validations(userObj)
        if (validation.error) {
            onSave({
                type: STRINGS.TYPES.PROFILE_UPD.GENERAL_INFO, data: {
                    ...userObj,
                    //  experienceInYears: parseInt($("#experienceInYears").val()),
                    companyLocation: `${location.lat},${location.lng}`,
                    lastEducation: $("#lastEducation").val(),
                    industry: $("#industry").val(),
                }
            })
            onClose()
        } else {
            alert(validation.message)
        }

        // API.USER.updateUser(userObj).then((response) => {
        //     console.log("userUpdate",response)
        //     if (response.status) {
        //         alert("Update Successfully");
        //         ///$(window).reload();
        //         props.onClose()
        //     } else {
        //         alert(response.message)
        //     }
        // })
    }

    const Validations = ({ company }) => {
        let valid = { error: true, message: "" }
        if (getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE) {
            if (company === "" || company === null) {
                valid.error = false;
                valid.message += valid.message ? "\nCompany name is required" : "Company name is required"
            }
        }
        return valid
    }

    const handleInpChange = (e) => {
        const { name, value } = e.target;
        setUserObj(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSelectCity = (selectedOption) => {
        setUserObj(selectedOption);
        setUserObj({
            ...userObj,
            city: selectedOption
        })
    }

    const handleSelectLocation = (obj) => {
        setLocation({
            ...location,
            lat: obj.lat,
            lng: obj.lng,
        })
    }

    return (
        <React.Fragment>
            <div
                className={`modal fade profile-modal-container ${props.openUpdateProfile ? `show` : ``}`}
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
                            <section className="card">

                                <div className="card-body pt-70">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="single-input">
                                                <label htmlFor="company">Company Name<span>*</span></label>
                                                <input type="text"
                                                    id="company"
                                                    name="company"
                                                    placeholder="Company Name"
                                                    onChange={handleInpChange}
                                                    defaultValue={userObj.company}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="single-input">
                                                <label htmlFor="first-name">First
                                                    Name <span>*</span></label>
                                                <input type="text"
                                                    id="first-name"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                    onChange={handleInpChange}
                                                    defaultValue={userObj.firstName}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="single-input">
                                                <label htmlFor="last-name">Last
                                                    Name <span>*</span></label>
                                                <input type="text" id="last-name"
                                                    name="lastName"
                                                    onChange={handleInpChange}
                                                    defaultValue={userObj.lastName}
                                                    placeholder="Last Name"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="single-input">
                                                <label htmlFor="email">Email <span>*</span></label>
                                                <input type="text"
                                                    readOnly={true}
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    // onChange={handleInpChange}
                                                    defaultValue={userObj.email}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="single-input">
                                                <label htmlFor="last-name">Phone Number<span>*</span></label>
                                                <input type="number" id="phone"
                                                    name="phone"
                                                    onChange={handleInpChange}
                                                    defaultValue={userObj.phone}
                                                    placeholder="Phone Number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE && (
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className="single-input">
                                                        <label htmlFor="first-name"> Total Number of
                                                            Employees <span>*</span></label>
                                                        <input type="number"
                                                            id="maleEmployees"
                                                            name="numberofEmployees"
                                                            onChange={handleInpChange}
                                                            defaultValue={userObj.numberofEmployees}
                                                            placeholder="Number of employees"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className="single-input">
                                                        <label htmlFor="last-name"> Number of Employees
                                                            (Female) <span>*</span></label>
                                                        <input type="number"
                                                            id="femaleEmployees"
                                                            onChange={handleInpChange}
                                                            name="numberofEmployeesFemale"
                                                            placeholder="Number of employees"
                                                            defaultValue={userObj.numberofEmployeesFemale}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {/* <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label
                                                    htmlFor="headline">linkedIn URL<span>*</span></label>
                                                <input type="url" name="linkedInURL" id="linkedInURL"
                                                       onChange={handleInpChange}
                                                       placeholder="https://example.com"
                                                       pattern="https://.*" size="30"
                                                       defaultValue={userObj.linkedInURL !== undefined ? userObj.linkedInURL : ""}
                                                />
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="row">
                                        <div className="col-12">
                                            <div className="single-input mb-25">
                                                <label htmlFor="job_information">Experience In Years</label>
                                                <select className="nice-select wide"
                                                        ref={experienceInYears}
                                                        name="experienceInYears"
                                                        defaultValue={userObj.experienceInYears}
                                                        id="experienceInYears"
                                                >
                                                    {dropDownSelection()}
                                                    <option value="">Select</option>
                                                    <option value="-1">Fresh</option>
                                                    <option value="0">Less than 1 Year</option>
                                                    <option value="1">1 Year</option>
                                                    <option value="2">2 Years</option>
                                                    <option value="3">3 Years</option>
                                                    <option value="4">4 Years</option>
                                                    <option value="5">5 Years</option>
                                                    <option value="6">6 Years</option>
                                                    <option value="7">7 Years</option>
                                                    <option value="8">8 Years</option>
                                                    <option value="9">9 Years</option>
                                                    <option value="10">10 Years</option>
                                                    <option value="11">11 Years</option>
                                                    <option value="12">12 Years</option>
                                                    <option value="13">13 Years</option>
                                                    <option value="14">14 Years</option>
                                                    <option value="15">15 Years</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label
                                                    htmlFor="headline">Headline <span>*</span></label>
                                                <textarea rows="5" id="headline"
                                                          name="headline"
                                                          onChange={handleInpChange}
                                                          defaultValue={userObj.headline !== null ? userObj.headline : ""}
                                                          placeholder="Headline"/>
                                            </div>
                                        </div>
                                    </div> */}

                                    {
                                        getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE &&
                                        (
                                            <React.Fragment>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="single-input">
                                                            <label htmlFor="current_position">Current
                                                                Position <span>*</span></label>
                                                            {/*<select*/}
                                                            {/*    ref={current_position}*/}
                                                            {/*    name="current_position"*/}
                                                            {/*    // defaultValue={userData.current}*/}
                                                            {/*    id="current_position"*/}
                                                            {/*    className="nice-select wide w-100">*/}
                                                            {/*    <option value="">Current*/}
                                                            {/*        Position*/}
                                                            {/*    </option>*/}
                                                            {/*</select>*/}
                                                            <input type="text" id="currentPosition"
                                                                name="currentPosition"
                                                                onChange={handleInpChange}
                                                                defaultValue={userObj.currentPosition}
                                                                placeholder="Current Position"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*<div className="row">*/}
                                                {/*    <div className="col-12">*/}
                                                {/*        <input id="education-intro"*/}
                                                {/*               type="checkbox"*/}
                                                {/*               className="checkbox"*/}
                                                {/*               checked*/}
                                                {/*               required=""/>*/}
                                                {/*        <label htmlFor="education-intro" style={{margin: "0 9px"}}>*/}
                                                {/*            Show education in my intro*/}
                                                {/*        </label>*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                                <div className="row">
                                                    <div
                                                        className="col-lg-12 col-md-12 col-sm-12">
                                                        <div className="single-input">
                                                            <label
                                                                htmlFor="lastEducation">Education <span>*</span></label>
                                                            {/*<select*/}
                                                            {/*    ref={education}*/}
                                                            {/*    name="lastEducation"*/}
                                                            {/*    id="lastEducation"*/}
                                                            {/*    defaultValue={userObj.lastEducation}*/}
                                                            {/*    className="nice-select wide w-100">*/}
                                                            {/*    <option value="Metric">Metric</option>*/}
                                                            {/*    <option value="Inter">Inter</option>*/}
                                                            {/*    <option value="Graduate">Graduate*/}
                                                            {/*    </option>*/}
                                                            {/*</select>*/}
                                                            {
                                                                getJobQualification.length > 0 && (
                                                                    <select
                                                                        className="nice-select wide"
                                                                        name="lastEducation"
                                                                        defaultValue={userObj.lastEducation}
                                                                        id="lastEducation">
                                                                        {dropDownSelection()}
                                                                        <option value="">Select</option>
                                                                        {getJobQualification.map((type) => {
                                                                            return (<option
                                                                                value={type}>{type}</option>)
                                                                        }
                                                                        )}
                                                                    </select>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        )
                                    }

                                    <div className="row">
                                        <div
                                            className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="single-input mb-25">
                                                <label htmlFor="city"> City
                                                    <span>*</span>
                                                </label>

                                                <SelectCities
                                                    id="city"
                                                    title="City"
                                                    name="city"
                                                    value={userObj.city}
                                                    onChange={handleSelectCity}
                                                    options={pkCities}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label
                                                    htmlFor="location-in-country">Locations
                                                    in this Country/Region </label>
                                                <input type="text"
                                                    id="location-in-country"
                                                    name="city"
                                                    onChange={handleInpChange}
                                                    defaultValue={userObj.city}
                                                    placeholder="Locations in this Country/Region"
                                                />
                                            </div>
                                        </div>
                                    </div> */}

                                    {
                                        getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE &&
                                        (<div className="row">
                                            <div
                                                className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="single-input">
                                                    <label
                                                        htmlFor="industry">Industry <span>*</span></label>
                                                    {/*<select name="industry"*/}
                                                    {/*        id="industry"*/}
                                                    {/*        className="nice-select wide w-100">*/}
                                                    {/*    <option value="">Computer*/}
                                                    {/*        Software*/}
                                                    {/*    </option>*/}
                                                    {/*</select>*/}
                                                    {
                                                        getJobIndustries.length > 0 && (
                                                            <select id="industry"
                                                                className="nice-select wide"
                                                                defaultValue={userObj.industry}
                                                                name="industry">
                                                                {dropDownSelection()}
                                                                <option value="">Select
                                                                </option>
                                                                {
                                                                    getJobIndustries.map((type) => {
                                                                        return (
                                                                            <option
                                                                                value={type}>{type}</option>)
                                                                    }
                                                                    )}
                                                            </select>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>)
                                    }

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="contact-info"> Address <span>*</span></label>
                                                <textarea rows="5" id="contact-info"
                                                    name="address"
                                                    onChange={handleInpChange}
                                                    defaultValue={userObj.address}
                                                    placeholder="Contact Info" />
                                            </div>
                                        </div>
                                    </div>
                                    {
                                        getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE && (
                                            <React.Fragment>

                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <div className="single-input">
                                                            <label
                                                                htmlFor="location-in-country">Longitude </label>
                                                            <input type="text"
                                                                id="lng"
                                                                name="lng"
                                                                readOnly={true}
                                                                value={location.lng}
                                                                placeholder="Not selected"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6 col-sm-6">
                                                        <div className="single-input">
                                                            <label
                                                                htmlFor="location-in-country">Latitude</label>
                                                            <input type="text"
                                                                id="lat"
                                                                name="lat"
                                                                readOnly={true}
                                                                value={location.lat}
                                                                placeholder="lat"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="single-input">
                                                            <label htmlFor="contact-info"> Google Map
                                                                Location <span>*</span></label>
                                                            <div className="modal-map-holder">
                                                                <GMap
                                                                    defaultCoordinates={userObj.companyLocation}
                                                                    onSelect={handleSelectLocation} />
                                                                {/*<StaticGMap/>*/}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </React.Fragment>
                                        )
                                    }
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">
                                                <button
                                                    onClick={handleUpdateProfile}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Update
                                                    Profile
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
            <div className="modal-backdrop fade show" />
        </React.Fragment>
    );
};

export default UpdateProfileModal;