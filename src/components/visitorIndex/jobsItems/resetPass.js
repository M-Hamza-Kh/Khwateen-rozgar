import React, {useEffect, useRef, useState} from 'react';
import {Header} from "../../header";
import {dropDownSelection, STRINGS} from "../../../utils/base";
import {MobileHeader} from "../../mobile/header";
import {StartPopUpMenu} from "../../startPopUpMenu";
import bg_img from "../../../content/images/about/bg-top-about-us.jpg";
import {Footer} from "../../footer";
//import {makeStyles} from "@material-ui/core";
import Spinner from "../../spinner";
import {API} from "../../../utils/services";

// const useStyles = makeStyles(() => ({
//     "reviews-nice-select": {
//         width: "95%"
//     },
//     ".reviews-input": {
//         width: "95%",
//         height: "50px",
//         border: "1px solid #999999",
//         lineHeight: "24px",
//         padding: "9px 20px",
//         color: "#444444",
//         backgroundColor: "#fff",
//     }
// }))

const initialState = {
    openAddComposer: false,
    showMenu: false,
    pass: "",
    newPassword: ""
}
const resetCode = new URL(window.location.href)
const code = resetCode.searchParams.get("resetCode");

const ResetPassword = (props) => {
    const [init, setInit] = useState(initialState);
    const [isUpdate, setIsUpdate] = useState(true);
    const [type, setType] = useState("password");
    const [isVerified, setVerified] = useState(false);
    const childDiv = useRef(null);


    useEffect(() => {
        dropDownSelection();
        const handleScroll = () => {
            const {index, selected} = props
            if (index === selected) {
                setTimeout(() => {
                    childDiv.current.scrollIntoView({behavior: 'smooth'})
                }, 500)
            }
        }
        handleScroll();
        window.onresize = () => {
            if (window.innerWidth >= 1000) {
                setInit({
                    ...init,
                    showMenu: false,
                })
            }
        }
    }, []);

    useEffect(() => {
        console.log("resetCode", resetCode.searchParams.get("resetCode"))

        if (code !== undefined) {
            let resetCodeObj = {
                resetCode: code
            }
            API.USER.verifyResetCode(resetCodeObj).then((response) => {
                console.log("resetCode", response)
                if (response.status) {
                    setVerified(true);
                } else {
                    alert(response.message)
                }
            }).catch((err) => {
                console.log("resetCode", err.responseJSON.message)
                alert(err.responseJSON.message);
                window.location.href = STRINGS.ROUTES.ROOT
            })
        }
    }, [resetCode])

    const handleOpenShowMenu = () => {
        setInit({
            ...init,
            showMenu: !init.showMenu,
        })
    }

    const handleChange = (ev) => {
        console.log("resetCode",[ev.target.name])
        setInit({
            ...init,
            [ev.target.name]: ev.target.value
        })
    }

    const isValidation = ({pass, newPassword}) => {
        let valid = {error: true, message: ""}
        if (pass !== newPassword) {
            valid.error = false;
            valid.message += valid.message ? "\nPassword not matched" : "Password not matched"
        }
        if (pass === "") {
            valid.error = false;
            valid.message += valid.message ? "\nPassword Required" : "Password Required"
        }
        if (newPassword === "") {
            valid.error = false;
            valid.message += valid.message ? "\nPassword Required" : "Password Required"
        }
        return valid;
    }

    const handleResetPass = (e) => {
        e.preventDefault();
        if (isVerified) {
            const valid = isValidation(init)
            if (valid.error) {
                let resetPassObj = {
                    resetCode: code,
                    NewPassword: init.newPassword
                }
                setIsUpdate(false);
                API.USER.submitResetPass(resetPassObj).then((response) => {
                    console.log("resetCode", response)
                    if (response.status) {
                        setIsUpdate(true);
                        alert("Your Password has been reset");
                        window.location.href = STRINGS.ROUTES.AUTH.SIGN_IN
                    } else {
                        alert(response.message)
                    }
                }).catch((err) => {
                    console.log("resetCode", err.responseJSON.message)
                    alert(err.responseJSON.message);
                })
            } else {
                alert(valid.message)
            }
        }
    }

    return (
        <div className={`template-color-1 ${init.showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
            <Header headerClass={`black-logo-version header-sticky sticky-black d-none d-lg-block`}
                    logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
            <MobileHeader openShowMenu={handleOpenShowMenu}/>

            <StartPopUpMenu closeShowMenu={handleOpenShowMenu}/>

            <div className="breadcrumb-section section page-heading pt-100 pb-150 pt-xs-50 pb-xs-50"
                 style={{background: `url(${bg_img})`, backgroundSize: "cover"}} ref={childDiv}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-10 ml-auto mr-auto pt-100 pt-xs-30">
                            <div className="page-breadcrumb-content color-white">
                                <h1>Reset Password</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="reviews over-ban section pb-60 pb-lg-60 pb-md-60 pb-sm-60 pb-xs-50">
                <div className="container">
                    <div className="row no-gutters justify-content-center">
                        {
                            isUpdate ?
                                <form autoComplete="off" onSubmit={handleResetPass}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                {/*<!-- Single Input Start -->*/}
                                                <div className="single-input mb-25">
                                                    <label htmlFor="password" style={{color:"#c1bdc0"}}>New
                                                        Password</label>
                                                    <input type={type} id="password" onChange={handleChange}
                                                           name="pass" placeholder=""/>
                                                </div>
                                                {/*<!-- Single Input End -->*/}
                                            </div>

                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                {/*<!-- Single Input Start -->*/}
                                                <div className="single-input mb-25">
                                                    <label htmlFor="confirm-password" style={{color:"#c1bdc0"}}>Confirm
                                                        Password</label>
                                                    <input type={type} id="confirm-password"
                                                           onChange={handleChange} name="newPassword"
                                                           placeholder=""
                                                    />
                                                </div>
                                                {/*<!-- Single Input End -->*/}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div
                                                className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">
                                                <button
                                                    // onClick={this.handleChangePass}
                                                    type="submit"
                                                    className="ht-btn theme-btn theme-btn-two mb-xs-20 w-100">Reset
                                                    Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form> :
                                <div className="spinner-holder">
                                    <Spinner width={100} height={100} type={"Puff"}/>
                                </div>
                        }
                    </div>
                </div>
            </div>

            {/*<div*/}
            {/*    className="job-details-section section pt-30 pt-lg-30 pt-md-30 pt-sm-30 pt-xs-30 pb-60 pb-lg-60 pb-md-60 pb-sm-60 pb-xs-60">*/}
            {/*    <div className="container">*/}
            {/*        <div className="row">*/}
            {/*            <div className="col-lg-6 order-2 mt-sm-60 mt-xs-50">*/}
            {/*                <h3 className="text-center">Latest Reviews</h3>*/}
            {/*                <div className="common-sidebar-widget sidebar-three pt-20 pl-55">*/}
            {/*                    <div className="sidebar-job-employer mb-15">*/}
            {/*                        <div className="job-employer-widget">*/}
            {/*                            <div className="image">*/}
            {/*                                <img src={logo_3} alt="#"/>*/}
            {/*                            </div>*/}
            {/*                            <div className="content-box">*/}

            {/*                                <h4 className="title">*/}
            {/*                                    <NavLink to={STRINGS.ROUTES.REVIEWS}>GEO NEWS </NavLink>*/}
            {/*                                </h4>*/}
            {/*                                <div className="employer-rate">*/}
            {/*                                    <div className="star">*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                    </div>*/}
            {/*                                    <span className="text">5 Ratings </span>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="sidebar-job-employer mb-15">*/}
            {/*                        <div className="job-employer-widget">*/}
            {/*                            <div className="image">*/}
            {/*                                <img src={logo_4} alt=""/>*/}
            {/*                            </div>*/}
            {/*                            <div className="content-box">*/}

            {/*                                <h4 className="title">*/}
            {/*                                    <NavLink to={STRINGS.ROUTES.REVIEW_DETAIL}>The*/}
            {/*                                        Educators </NavLink>*/}
            {/*                                </h4>*/}
            {/*                                <div className="employer-rate">*/}
            {/*                                    <div className="star">*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                    </div>*/}
            {/*                                    <span className="text">5 Ratings </span>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="sidebar-job-employer mb-15">*/}
            {/*                        <div className="job-employer-widget">*/}
            {/*                            <div className="image">*/}
            {/*                                <img src={logo_2} alt="#"/>*/}
            {/*                            </div>*/}
            {/*                            <div className="content-box">*/}

            {/*                                <h4 className="title">*/}
            {/*                                    <NavLink to={STRINGS.ROUTES.REVIEW_DETAIL}>Samaa TV</NavLink>*/}
            {/*                                </h4>*/}
            {/*                                <div className="employer-rate">*/}
            {/*                                    <div className="star">*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                    </div>*/}
            {/*                                    <span className="text">5 Ratings </span>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="col-lg-6 order-1 pr-55 pr-md-15 pr-sm-15 pr-xs-15">*/}
            {/*                <h3 className="text-center">Top Reviews</h3>*/}
            {/*                <div className="common-sidebar-widget sidebar-three pt-20">*/}
            {/*                    <div className="sidebar-job-employer mb-15">*/}
            {/*                        <div className="job-employer-widget">*/}
            {/*                            <div className="image">*/}
            {/*                                <img src={logo_1} alt=""/>*/}
            {/*                            </div>*/}
            {/*                            <div className="content-box">*/}

            {/*                                <h4 className="title">*/}
            {/*                                    <NavLink to={STRINGS.ROUTES.REVIEW_DETAIL}>Juiblee Insurance </NavLink>*/}
            {/*                                </h4>*/}
            {/*                                <div className="employer-rate">*/}
            {/*                                    <div className="star">*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                    </div>*/}
            {/*                                    <span className="text">5 Ratings </span>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="sidebar-job-employer mb-15">*/}
            {/*                        <div className="job-employer-widget">*/}
            {/*                            <div className="image">*/}
            {/*                                <img src={logo_5} alt=""/>*/}
            {/*                            </div>*/}
            {/*                            <div className="content-box">*/}
            {/*                                <h4 className="title">*/}
            {/*                                    <NavLink to={STRINGS.ROUTES.REVIEW_DETAIL}>USAID </NavLink>*/}
            {/*                                </h4>*/}
            {/*                                <div className="employer-rate">*/}
            {/*                                    <div className="star">*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                    </div>*/}
            {/*                                    <span className="text">5 Ratings </span>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                    <div className="sidebar-job-employer mb-15">*/}
            {/*                        <div className="job-employer-widget">*/}
            {/*                            <div className="image">*/}
            {/*                                <img src={logo_3} alt="#"/>*/}
            {/*                            </div>*/}
            {/*                            <div className="content-box">*/}

            {/*                                <h4 className="title">*/}
            {/*                                    <NavLink to={STRINGS.ROUTES.REVIEW_DETAIL}>GEO NEWS </NavLink>*/}
            {/*                                </h4>*/}
            {/*                                <div className="employer-rate">*/}
            {/*                                    <div className="star">*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                        <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
            {/*                                                         className="fas fa-star"/>*/}
            {/*                                    </div>*/}
            {/*                                    <span className="text">5 Ratings </span>*/}
            {/*                                </div>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}

            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <Footer/>

        </div>
    );
};

export default ResetPassword;