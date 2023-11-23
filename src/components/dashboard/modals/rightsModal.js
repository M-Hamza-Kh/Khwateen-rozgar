import React, {useEffect, useState} from 'react';
import {dropDownSelection, STRINGS} from "../../../utils/base";
import $ from "jquery";
import {API} from "../../../utils/services";
import TransferList from "../../TransferList";
import Spinner from "../../spinner";
// import {pkCities} from "../../../utils/pk";

const RightsModal = (props) => {
    const {data, onSuccess, onClose} = props;
    // const [Type, setType] = useState(STRINGS.USER_TYPE.APPLICANT_TYPE);
    const [userData, setUserData] = useState(data);
    const [response, setResponse] = useState(true);
    const [getCities, setCities] = useState([]);
    const [allowedCities, setAllowedCities] = useState([]);
    const [isCitiesLoaded, setCitiesLoaded] = useState(false);
    const [showRightsView, setShowRightsView] = useState(false);
    const [showUpdateRightsLi, setShowUpdateRightsLi] = useState(false);

    useEffect(() => {
        //console.log("userData", userData);
        const init = async () => {
            // const data_1 = await API.USER.getUser(userData.id).then((res) => {
            //     console.log("userData", res);
            //     if (res.status) {
            //         return res.data
            //     } else {
            //         alert(res.error);
            //     }
            // })

            const data_2 = await API.JOBS.getJobUniques().then((response) => {
                // console.log("cities", response)
                let {status, error, data: {uniqueCities}} = response;
                if (status) {
                    let array1 = uniqueCities.filter(function (val) {
                        return userData.allowedCities.indexOf(val) == -1;
                    });
                    return array1
                } else {
                    alert(error)
                }
            }).catch((err) => {
                alert(err)
            });

            // setUserData(data_1);
            setCities(data_2);
            setCitiesLoaded(true)
        }

        init();

        $(document).ready(() => {
            $("#Type").on("change", (e) => {
                //console.log("change", e.target.value)
                if (e.target.value === "110") {
                    setShowRightsView(true)
                } else {
                    setShowRightsView(false)
                }

            })
        })

        setUpDefaultRights(userData)
    }, [])

    const setUpDefaultRights = ({rights, rightsBlog, rightsReview, rightsBanners, allowedCities, updateRights, type}) => {
         //console.log("userData", rights);

        if (type === STRINGS.USER_TYPE.ADMIN_TYPE) {
            setShowRightsView(true);
            $("#Type").val(STRINGS.USER_TYPE.ADMIN_TYPE)
        }

        if (allowedCities !== undefined && allowedCities.length > 0) {
            setAllowedCities(allowedCities);
        } else {
            setAllowedCities([])
        }
        if (rightsBlog) {
            $("#rightsBlog").prop("checked", true)
        } else {
            $("#rightsBlog").prop("checked", false)
        }
        if (rightsReview) {
            $("#rightsReview").prop("checked", true)
        } else {
            $("#rightsReview").prop("checked", false)
        }
        if (rightsBanners) {
            $("#rightsBanners").prop("checked", true)
        } else {
            $("#rightsBanners").prop("checked", false)
        }
        if (updateRights) {
            $("#updateRights").prop("checked", true);
        } else {
            $("#updateRights").prop("checked", false);
        }
        if (rights.length > 0) {
            rights.map((r) => {
                switch (r) {
                    case STRINGS.RIGHTS.JP:
                        $("#job_post").prop("checked", true)
                        break;
                    case STRINGS.RIGHTS.JL:
                        $("#job_list").prop("checked", true)
                        break;
                    case STRINGS.RIGHTS.RV:
                        $("#reviews").prop("checked", true);
                        break;
                    case STRINGS.RIGHTS.APR:
                        $("#testimonial").prop("checked", true)
                        break;
                    case STRINGS.RIGHTS.CA_PAY:
                        $("#payments").prop("checked", true)
                        break;
                    case STRINGS.RIGHTS.SL:
                        $("#subsList").prop("checked", true)
                        break;
                    case STRINGS.RIGHTS.CL:
                        $("#company_list").prop("checked", true)
                        break;
                    case STRINGS.RIGHTS.AL:
                        $("#applicant_list").prop("checked", true);
                        setShowUpdateRightsLi(true);
                        break;
                    case STRINGS.RIGHTS.C_PKG:
                        $("#packages").prop("checked", true)
                        break;
                    case STRINGS.RIGHTS.SET:
                        $("#settings").prop("checked", true)
                        break;
                    default:
                        return []
                }
            })
        }
    }

    const handleSubmit = () => {
        let type = $("#Type").val();
        setResponse(false)
        API.USER.updateUserRights(userData.id, {
            ...userData,
            type: parseInt(type)
        }).then((response) => {
            // console.log("userUpdate", response)
            let {status, error} = response;
            if (status) {
                alert("Rights update successfully");
                setResponse(true)
                onSuccess()
                onClose()
            } else {
                setResponse(true)
                alert(error)
            }
        })
    }
    const handleChangeInput = (ev) => {
        switch (ev.target.name) {
            case "job_post":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rights: [...userData.rights, STRINGS.RIGHTS.JP]
                    })
                } else {
                    let rightsArray = userData.rights.filter((d) => d !== STRINGS.RIGHTS.JP);
                    setUserData({
                        ...userData,
                        rights: rightsArray
                    })
                }
                break;
            case "job_list":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rights: [...userData.rights, STRINGS.RIGHTS.JL]
                    })
                } else {
                    let rightsArray = userData.rights.filter((d) => d !== STRINGS.RIGHTS.JL);
                    setUserData({
                        ...userData,
                        rights: rightsArray
                    })
                }
                break;
            case "reviews":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rights: [...userData.rights, STRINGS.RIGHTS.RV]
                    })
                } else {
                    let rightsArray = userData.rights.filter((d) => d !== STRINGS.RIGHTS.RV);
                    setUserData({
                        ...userData,
                        rights: rightsArray
                    })
                }
                break;
            case "testimonial":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rights: [...userData.rights, STRINGS.RIGHTS.APR]
                    })
                } else {
                    let rightsArray = userData.rights.filter((d) => d !== STRINGS.RIGHTS.APR);
                    setUserData({
                        ...userData,
                        rights: rightsArray
                    })
                }
                break;
            case "payments":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rights: [...userData.rights, STRINGS.RIGHTS.CA_PAY]
                    })
                } else {
                    let rightsArray = userData.rights.filter((d) => d !== STRINGS.RIGHTS.CA_PAY);
                    setUserData({
                        ...userData,
                        rights: rightsArray
                    })
                }
                break;
            case "subsList":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rights: [...userData.rights, STRINGS.RIGHTS.SL]
                    })
                } else {
                    let rightsArray = userData.rights.filter((d) => d !== STRINGS.RIGHTS.SL);
                    setUserData({
                        ...userData,
                        rights: rightsArray
                    })
                }
                break;
            case "company_list":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rights: [...userData.rights, STRINGS.RIGHTS.CL]
                    })
                } else {
                    let rightsArray = userData.rights.filter((d) => d !== STRINGS.RIGHTS.CL);
                    setUserData({
                        ...userData,
                        rights: rightsArray
                    })
                }
                break;
            case "applicant_list":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rights: [...userData.rights, STRINGS.RIGHTS.AL]
                    });
                    setShowUpdateRightsLi(true)
                } else {
                    let rightsArray = userData.rights.filter((d) => d !== STRINGS.RIGHTS.AL);
                    setUserData({
                        ...userData,
                        rights: rightsArray
                    })
                    setShowUpdateRightsLi(false)

                }
                break;
            case "packages":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rights: [...userData.rights, STRINGS.RIGHTS.C_PKG]
                    })
                } else {
                    let rightsArray = userData.rights.filter((d) => d !== STRINGS.RIGHTS.C_PKG);
                    setUserData({
                        ...userData,
                        rights: rightsArray
                    })
                }
                break;
            case "settings":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rights: [...userData.rights, STRINGS.RIGHTS.SET]
                    })
                } else {
                    let rightsArray = userData.rights.filter((d) => d !== STRINGS.RIGHTS.SET);
                    setUserData({
                        ...userData,
                        rights: rightsArray
                    })
                }
                break;
            case "rightsBlog":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rightsBlog: true
                    })
                } else {
                    setUserData({
                        ...userData,
                        rightsBlog: false
                    })
                }
                break;
            case "updateRights":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        updateRights: true
                    })
                } else {
                    setUserData({
                        ...userData,
                        updateRights: false
                    })
                }
                break;
            case "rightsReview":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rightsReview: true
                    })
                } else {
                    setUserData({
                        ...userData,
                        rightsReview: false
                    })
                }
                break;
            case "rightsBanners":
                if (ev.target.checked) {
                    setUserData({
                        ...userData,
                        rightsBanners: true
                    })
                } else {
                    setUserData({
                        ...userData,
                        rightsBanners: false
                    })
                }
                break;
            default:
                return []
        }
    }

    const handleChangeSelectCities = (cities, newCities, type) => {
        // console.log("cities", type)
        // console.log("cities", newCities)
        // console.log("cities", cities)
        if (type === 1) {
            setUserData({
                ...userData,
                allowedCities: newCities
            })
        } else {
            // let new_cities = userData.allowedCities.filter((c) => c !== cities)
            let array1 = cities.filter(val => !newCities.includes(val));

            // console.log("cities",array1)
            setUserData({
                ...userData,
                allowedCities: array1
            })
        }
    }


    return (
        <React.Fragment>
            <div
                className={`modal fade profile-modal-container show`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                     role="document">
                    <div className="modal-content">
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
                                    User Rights
                                </header>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex w-100">
                                                <div className="d-flex mr-4 ml-4">
                                                    Type
                                                </div>
                                                <div className="d-flex ml-4 mr-4">
                                                    <select className="nice-select wide"
                                                            name="Type" id="Type">
                                                        {
                                                            dropDownSelection()
                                                        }
                                                        <option value={STRINGS.USER_TYPE.APPLICANT_TYPE}>Applicant
                                                        </option>
                                                        <option value={STRINGS.USER_TYPE.ADMIN_TYPE}>Admin</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="d-flex w-100 flex-column "
                                                 style={{visibility: `${showRightsView ? "visible" : "hidden"}`}}>
                                                <div className="d-flex">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                        <div className="single-inputa mb-25">
                                                            <label htmlFor="job_features">Rights</label>
                                                            <div className="d-flex w-100 flex-wrap">
                                                                <div className="skill-check-box m-2">
                                                                    <ul className="skill-cbx-list">
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       onChange={handleChangeInput}
                                                                                       name="job_post"
                                                                                       id="job_post"/>
                                                                                <label htmlFor="job_post">Job
                                                                                    Post</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       name="job_list"
                                                                                       onChange={handleChangeInput}
                                                                                       id="job_list"/>
                                                                                <label htmlFor="job_list">Job
                                                                                    List</label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="skill-check-box m-2">
                                                                    <ul className="skill-cbx-list">
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       onChange={handleChangeInput}
                                                                                       name="reviews"
                                                                                       id="reviews"/>
                                                                                <label
                                                                                    htmlFor="reviews">Reviews</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       name="testimonial"
                                                                                       onChange={handleChangeInput}
                                                                                       id="testimonial"/>
                                                                                <label
                                                                                    htmlFor="testimonial">Testimonials</label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="skill-check-box m-2">
                                                                    <ul className="skill-cbx-list">
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       onChange={handleChangeInput}
                                                                                       name="payments"
                                                                                       id="payments"/>
                                                                                <label
                                                                                    htmlFor="payments">Payments</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       name="company_list"
                                                                                       onChange={handleChangeInput}
                                                                                       id="company_list"/>
                                                                                <label htmlFor="company_list">Company
                                                                                    List</label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="skill-check-box m-2">
                                                                    <ul className="skill-cbx-list">
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       onChange={handleChangeInput}
                                                                                       name="applicant_list"
                                                                                       id="applicant_list"/>
                                                                                <label htmlFor="applicant_list">Applicant
                                                                                    list</label>
                                                                            </div>
                                                                        </li>
                                                                        {
                                                                            showUpdateRightsLi && (
                                                                                <li>
                                                                                    <div
                                                                                        className="filter-name-item">
                                                                                        <input type="checkbox"
                                                                                               onChange={handleChangeInput}
                                                                                               name="updateRights"
                                                                                               id="updateRights"/>
                                                                                        <label
                                                                                            htmlFor="updateRights">Update
                                                                                            Rights</label>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        }
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       name="packages"
                                                                                       onChange={handleChangeInput}
                                                                                       id="packages"/>
                                                                                <label
                                                                                    htmlFor="packages">Packages</label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="skill-check-box m-2">
                                                                    <ul className="skill-cbx-list">
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       onChange={handleChangeInput}
                                                                                       name="settings"
                                                                                       id="settings"/>
                                                                                <label
                                                                                    htmlFor="settings">Settings</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       onChange={handleChangeInput}
                                                                                       name="rightsBlog"
                                                                                       id="rightsBlog"/>
                                                                                <label htmlFor="rightsBlog">Blogs
                                                                                    Rights</label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="skill-check-box m-2">
                                                                    <ul className="skill-cbx-list">
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       onChange={handleChangeInput}
                                                                                       name="rightsReview"
                                                                                       id="rightsReview"/>
                                                                                <label htmlFor="rightsReview">Review
                                                                                    Rights</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       onChange={handleChangeInput}
                                                                                       name="rightsBanners"
                                                                                       id="rightsBanners"/>
                                                                                <label htmlFor="rightsBanners">Banners
                                                                                    Rights</label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="skill-check-box m-2">
                                                                    <ul className="skill-cbx-list">
                                                                        <li>
                                                                            <div
                                                                                className="filter-name-item">
                                                                                <input type="checkbox"
                                                                                       onChange={handleChangeInput}
                                                                                       name="subsList"
                                                                                       id="subsList"/>
                                                                                <label htmlFor="rightsReview">Subscribers
                                                                                    List</label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="d-flex w-100 flex-column">
                                                <div className="d-flex">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                        <div className="single-inputa mb-25">
                                                            <label htmlFor="job_features">Allowed City</label>
                                                            <div className="d-flex w-100 flex-wrap">
                                                                {
                                                                    isCitiesLoaded && (
                                                                        <TransferList
                                                                            AllowedCities={allowedCities}
                                                                            uniqueCities={getCities}
                                                                            onSelect={handleChangeSelectCities}
                                                                            onDeSelect={handleChangeSelectCities}
                                                                        />
                                                                    )
                                                                }
                                                            </div>
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
                                                {
                                                    response ?
                                                        <button
                                                            onClick={handleSubmit}
                                                            className="ht-btn theme-btn theme-btn-two mb-xs-20">
                                                            Submit
                                                        </button> :
                                                        <div className="spinner-holder">
                                                            <Spinner type={"Puff"}/>
                                                        </div>
                                                }

                                                <button
                                                    onClick={onClose}
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20">
                                                    Cancel
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

export default RightsModal;