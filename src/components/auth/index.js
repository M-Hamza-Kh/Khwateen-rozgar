import React, { Component } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { dropDownSelection, STRINGS } from "../../utils/base";
import { Header } from "../header";
import { Footer } from "../footer";
import $ from "jquery";
import '../sweetAlert.css';
//import {faFacebook, faGooglePlus, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";
import { connect } from "react-redux";
import * as authAction from "./store/actions";
import { API } from "../../utils/services";
import Spinner from "../spinner";
import { pkCities } from "../../utils/pk";
//import AutoComplete from "../AutoComplete";
import SelectCities from "../AutoComplete/SelectCities";
import PasswordStrengthBar from "react-password-strength-bar";
import { MobileHeader } from "../mobile/header";
import { StartPopUpMenu } from "../startPopUpMenu";
import ForgetPasswordModal from "./forgetPasswordModal";

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button'
import swal from 'sweetalert';
//import Swal from 'sweetalert2';

class Auth extends Component {
    childDiv = React.createRef();
    maritalStatus = React.createRef();
    graduationLevel = React.createRef();
    gender_female = React.createRef();
    gender_male = React.createRef();
    gender_tutor = React.createRef();
    URL = new URL(window.location.href)

    constructor(props) {
        super(props);
        this.state = {
            lightHeader: `black-logo-version header-sticky sticky-black d-none d-lg-block`,
            tab: 1,
            mainTab: this.URL.pathname === "/register" ? 2 : 1,
            tAndC: false,
            companyName: "",
            numberofEmployeesFemale: "",
            numberofEmployees: "",
            cityName: "",
            responsePending: false,
            changePassInpType: false,
            isRemember: false,
            isStrongPass: false,
            openForgetPassword: false,
            getCities: [],
            isUpdate: true,
            showMenu: false,
            open: false,
            Message: '',
        }
        this.signIn = {
            email: '',
            password: ''
        }

        this.signUp = {
            email: "",
            firstName: "",
            lastName: "",
            dob: (new Date()).toISOString(),
            gender: "",
            address: "",
            maritalStatus: "",
            graduationLevel: "",
            phone: "",
            city: "",
            password: "",
            country: "Pakistan"
        }
        this.getAllComboBoxData();
    }

    componentDidMount() {
        this.handleScroll();
        window.onresize = () => {
            if (window.innerWidth >= 1000) {
                this.setState({
                    showMenu: false
                })
            }
        }
        let cookiesArr = document.cookie.split(";");
        for (let i = 0; i < cookiesArr.length; i++) {
            let cookiePair = cookiesArr[i].split("=");
            if (cookiePair[0].trim() === "remember") {
                // console.log("cookie",cookiePair[1])
                if (cookiePair[1] === "true") {
                    this.handleRemember()
                }
            }
        }
    }

    handleRemember = () => {
        let cookiesArr = document.cookie.split(";");
        for (let i = 0; i < cookiesArr.length; i++) {
            let cookiePair = cookiesArr[i].split("=");
            if (cookiePair[0].trim() === "email") {
                $("#email").val(cookiePair[1]);
                this.signIn.email = cookiePair[1];
            }
            if (cookiePair[0].trim() === "pass") {
                $("#password").val(cookiePair[1]);
                this.signIn.password = cookiePair[1]
            }
            if (cookiePair[0].trim() === "pass") {
                $("#login-form-remember").prop("checked", true);
                this.setState({
                    isRemember: true
                })
            }
        }
    }

    handleOpenShowMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.childDiv.current.scrollIntoView({ behavior: 'smooth' })
            }, 500)
        }
    }

    handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return
        }
        this.setState({ open: false })
    }

    getAllComboBoxData = () => {
        API.SETTINGS.getCities().then((response) => {
            console.log("cities", response)
            let { status, error } = response;
            if (status) {
                this.setState({
                    //getCities: data,
                    getCities: pkCities,
                })
            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        });
    }

    handleRegister = () => {
        let { tab, companyName, tAndC, cityName, numberofEmployees, numberofEmployeesFemale } = this.state;
        if (tab !== 2 && tab !== 3) this.signUp.maritalStatus = this.maritalStatus.current.value;
        if (tab !== 2 && tab !== 3) this.signUp.graduationLevel = this.graduationLevel.current.value;
        if (tab !== 2 && tab !== 3) this.signUp.gender = this.gender_female.current.checked ? "female" : this.gender_male.current.checked ? "male" : "male";
        if (tab === 3) this.signUp.gender = this.gender_tutor.current.checked ? "tutor" : this.gender_female.current.checked ? "female" : "female";
        if (tab === 2) this.signUp.company = companyName
        if (tab === 2) this.signUp.numberofEmployees = numberofEmployees
        if (tab === 2) this.signUp.numberofEmployeesFemale = numberofEmployeesFemale
        this.signUp.city = cityName

        if (this.signUp.gender === 'male') {
            //alert('The portal is only for female job seekers');
            swal("", "The portal is only for female job seekers", "error")
            // this.setState({ open: true, Message: 'The portal is only for female job seekers' })
        }
        // this.signUp.city = $("#city").val();
        //this.signUp.gender = this.state.mStatus
        // if (isLogin()) {
        //     window.location.href = STRINGS.ROUTES.DASHBOARD.HOME
        // } else {
        //     window.location.href = STRINGS.ROUTES.ROOT
        // }
        else {
            const validate = this.isValidate(this.signUp)
            if (!validate.error) {
                if (tAndC) {
                    this.setState({
                        responsePending: true
                    })
                    API.AUTH.SignUp(this.signUp).then((response) => {
                        if (response.status) {
                            this.setState({ responsePending: false })
                            if (this.signUp.gender !== "male") {
                                //this.setState({ open: true, Message: 'Your Account is successfully created, Kindly login with your email and password' })
                                // alert("Your Account is successfully created, Kindly login with your email and password");
                                swal("", "Your Account is successfully created, Kindly login with your email and password", "success")

                                //  Swal.fire(
                                //     'Good job!',
                                //     'Your Account is successfully created, Kindly login with your email and password',
                                //     'success'
                                //   )
                                // window.location.href = STRINGS.ROUTES.AUTH.SIGN_IN
                                this.props.history.push('https://khawateenrozgar.com')
                            } else {
                                alert("Kindly Check Your Email.");
                                this.setState({ open: true, Message: response.message })
                                window.location.href = STRINGS.ROUTES.AUTH.SIGN_IN
                            }
                        } else {
                            alert(response.message)
                            this.setState({ open: true, Message: response.message })
                            this.setState({ responsePending: false })
                        }
                    }).catch((error) => {
                        console.log("signup", error)
                        this.setState({ responsePending: false })
                        //alert(error)
                    })
                } else {
                    alert("You have to agree the term and conditions")
                }
            } else {
                alert(validate.message)
            }
            console.log("adas", this.signUp)
        }

    };

    //numberofEmployeesFemale,numberofEmployees,

    isValidate = ({ email, password, phone, maritalStatus, graduationLevel, address, firstName, lastName, city, company, numberofEmployeesFemale, numberofEmployees }) => {
        let valid = { error: false, message: '' };
        const email_regex = /\S+@\S+\.\S+/;
        // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if ($.isEmptyObject(email)) valid = {
            error: true,
            message: "Email Required!"
        };
        else if (!email_regex.test(email)) valid = {
            error: true,
            message: $.isEmptyObject(valid.message) ? "Invalid Email. example@exa.com" : `${valid.message}\nInvalid Email. example@exa.com`
        };
        if (typeof password !== 'undefined') {

            if (this.state.mainTab === 1) {
                if ($.isEmptyObject(password)) valid = {
                    error: true,
                    message: $.isEmptyObject(valid.message) ? "Password Required!" : `${valid.message}\nPassword Required!`
                };
            } else {
                if ($.isEmptyObject(password)) valid = {
                    error: true,
                    message: $.isEmptyObject(valid.message) ? "Password Required!" : `${valid.message}\nPassword Required!`
                };
                // else if (!this.state.isStrongPass) valid = {
                //     error: true,
                //     message: $.isEmptyObject(valid.message) ? "Password is not Strong!" : `${valid.message}\nPassword is not Strong!`
                // };
                // else if (!strongRegex.test(password)) valid = {
                //     error: true,
                //     message: $.isEmptyObject(valid.message) ?
                //         "Password is not Strong!\nThe string must contain at least 1 lowercase alphabetical character\nThe string must contain at least 1 uppercase alphabetical character\nThe string must contain at least 1 numeric character\nThe string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict"
                //         : `${valid.message}\nPassword is not Strong!\nThe string must contain at least 1 lowercase alphabetical character\nThe string must contain at least 1 uppercase alphabetical character\nThe string must contain at least 1 numeric character\nThe string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict`
                // };
            }

        }
        if (phone === "") valid = {
            error: true,
            message: $.isEmptyObject(valid.message) ? "Phone Number Required!" : `${valid.message}\nPhone Number Required!`
        };

        if (this.state.tab === 1) {
            if (maritalStatus === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "Marital Status Required!" : `${valid.message}\nMarital Status Required!`
            };
            if (graduationLevel === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "Graduation Level Required!" : `${valid.message}\nGraduation Level Required!`
            };
            if (address === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "Address Required!" : `${valid.message}\nAddress Required!`
            };
        } 
        else if (this.state.tab === 3) {

            if (address === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "Address Required!" : `${valid.message}\nAddress Required!`
            };
            if (firstName === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "First Name Required!" : `${valid.message}\nFirst Name Required!`
            };
            if (city === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "City Required!" : `${valid.message}\nCity Required!`
            };
        }
        else {
            if (address === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "Address Required!" : `${valid.message}\nAddress Required!`
            };
            if (firstName === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "First Name Required!" : `${valid.message}\nFirst Name Required!`
            };
            if (lastName === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "Last Name Required!" : `${valid.message}\nLast Name Required!`
            };
            if (city === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "City Required!" : `${valid.message}\nCity Required!`
            };
            if (company === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "Company Name Required!" : `${valid.message}\nCompany Name Required!`
            };

            if (numberofEmployees === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "Total Male Employees Required!" : `${valid.message}\nTotal Male Employees Required!`
            };

            if (numberofEmployeesFemale === "") valid = {
                error: true,
                message: $.isEmptyObject(valid.message) ? "Total Female Employees Required!" : `${valid.message}\nTotal Female Employees Required!`
            };
            // if (phone === "") valid = {
            //     error: true,
            //     message: $.isEmptyObject(valid.message) ? "Phone Number Required!" : `${valid.message}\nPhone Number Required!`
            // };
        }

        return valid
    };


    handleLoginCredentials = (email, pass) => {
        let user = { email: email, pass: pass, type: 0 };
        if (email === STRINGS.LOGIN_USERS.APPLICANT.email && pass === STRINGS.LOGIN_USERS.APPLICANT.pass) {
            user.type = STRINGS.LOGIN_USERS.APPLICANT.type
        }
        if (email === STRINGS.LOGIN_USERS.COMPANY.email && pass === STRINGS.LOGIN_USERS.COMPANY.pass) {
            user.type = STRINGS.LOGIN_USERS.COMPANY.type
        }
        if (email === STRINGS.LOGIN_USERS.ADMIN.email && pass === STRINGS.LOGIN_USERS.ADMIN.pass) {
            user.type = STRINGS.LOGIN_USERS.ADMIN.type
        }
        return user
    };

    handleLogin = () => {
        if (this.signIn.email !== '' && this.signIn.password !== "") {
            const isValid = this.isValidate(this.signIn);
            if (!isValid.error) {
                this.props.authLogin({ email: this.signIn.email, password: this.signIn.password }, this.state.isRemember)
                //swal("", "You have Successfully Login", "success")
                // alert("Error")
                //authAction.submitLogin({email: this.signIn.email, password: this.signIn.password})
                // const isCredential = this.handleLoginCredentials(this.signIn.email, this.signIn.password);
                // let userRights = isCredential.type === 1 ? STRINGS.USER_RIGHTS.ADMIN : isCredential.type === 2 ? STRINGS.USER_RIGHTS.COMPANY : isCredential.type === 3 ? STRINGS.USER_RIGHTS.APPLICANT : []
                // console.log("rights", userRights)
                // console.log("rights", isCredential)
                // if (isCredential.type !== 0) {
                //     console.log("rights", userRights)
                //     console.log("rights", isCredential)
                //     isCredential.rights = userRights
                //     localStorage.setItem(STRINGS.STORAGE.user, JSON.stringify(isCredential));
                //     // localStorage.setItem(STRINGS.STORAGE.rights, userRights);
                //     window.location.href = STRINGS.ROUTES.DASHBOARD.HOME
                // } else {
                //     alert("Email or Password is incorrect")
                // }

            } else {
                // alert(isValid.message);
                swal("", isValid.message, "warning")
            }
        } else {
            //  alert('Please fill up the form correctly');
            swal("", "Please fill up the form correctly", "warning")
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.isUpdate !== this.state.isUpdate) {
            this.setState({
                isUpdate: true
            })
        }
    }

    handleChangeSignUp = (ev) => {
        this.signUp[ev.target.name] = ev.target.value
        if (ev.target.name === "password") {
            this.setState({
                isUpdate: false
            })
        }
    }

    handleChangeTab = (tab) => {
        this.signUp = {
            email: "",
            firstName: "",
            lastName: "",
            dob: (new Date()).toISOString(),
            gender: "",
            address: "",
            maritalStatus: "",
            graduationLevel: "",
            phone: "",
            city: "",
            password: "",
            country: ""
        }
        this.setState({
            tab: tab,
            isUpdate: false
        });
    }

    handleSelectCity = (selectedOption) => {
        this.signUp.city = selectedOption
        this.setState({
            cityName: selectedOption
        })
    }

    handleRememberMe = (ev) => {
        console.log("remember", ev.target.checked)
        if (ev.target.checked) {
            //sessionStorage.setItem("rememberMe", ev.target.checked);
            this.setState({
                isRemember: ev.target.checked
            })
        } else {
            document.cookie = "remember =" + false;
            this.setState({
                isRemember: false
            })
            // sessionStorage.setItem("rememberMe", ev.target.checked);
        }
    }

    handleForgetPassword = () => {
        this.setState({
            openForgetPassword: true
        })
    }

    render() {
        let { lightHeader, tab, responsePending, getCities, changePassInpType, isUpdate, showMenu, openForgetPassword } = this.state;
        const { success } = this.props;
        return (
            <div className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
                <Header headerClass={lightHeader} logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN} />
                <MobileHeader openShowMenu={this.handleOpenShowMenu} />

                <StartPopUpMenu closeShowMenu={this.handleOpenShowMenu} />
                {/*<!-- Breadcrumb Section Start -->*/}
                <div className="breadcrumb-section section bg_color--5 pt-30 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40"
                    ref={this.childDiv}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-breadcrumb-content">
                                    <ul hidden className="page-breadcrumb">
                                        <li><NavLink to="index.html">Home</NavLink></li>
                                        <li>Login & Register</li>
                                    </ul>
                                    <h4>Login / Register</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- Breadcrumb Section Start -->*/}

                {/*<!-- Login Register Section Start -->*/}
                <div className="login-register-section section bg_color--5 pb-30 pb-lg-30 pb-md-30 pb-sm-30 pb-xs-30">
                    <div className="container">
                        <div className="row no-gutterss">

                            <div className="col-lg-8 offset-lg-2">
                                <div className="login-register-form-area pb-50" style={{ paddingBottom: "0" }}>
                                    <div className="login-tab-menu">
                                        <ul className="nav">
                                            <li><NavLink activeClassName="active show" data-toggle="tab"
                                                to={`${STRINGS.ROUTES.AUTH.SIGN_IN}`}
                                                onClick={() => this.setState({
                                                    mainTab: 1
                                                })}>Login</NavLink></li>
                                            <li><NavLink data-toggle="tab"
                                                to={`${STRINGS.ROUTES.AUTH.SIGN_UP}`}
                                                onClick={() => this.setState({
                                                    mainTab: 2
                                                })}
                                            >Register</NavLink></li>
                                        </ul>
                                    </div>
                                    <div className="tab-content ov-des" style={{ overflow: "hidden" }}>
                                        <Switch>
                                            <Route exact path={`${STRINGS.ROUTES.AUTH.SIGN_IN}`} render={() =>
                                                <div id="login" className="tab-pane fade show active">
                                                    <div className="login-register-form">
                                                        <form>
                                                            <p style={{ textAlign: "center" }}>Login to Khawateen with
                                                                your
                                                                registered account</p>
                                                            <div className="offset-xl-3 col-xl-6">
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <div className="single-input">
                                                                            <input type="text"
                                                                                id={"email"}
                                                                                placeholder="Username or Email"
                                                                                onChange={(e) => this.signIn.email = e.target.value}
                                                                                name="name" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="single-input">
                                                                            <input
                                                                                type={changePassInpType ? "text" : "password"}
                                                                                placeholder="Password"
                                                                                id={"password"}
                                                                                style={{ position: "relative" }}
                                                                                onChange={(e) => this.signIn.password = e.target.value}
                                                                                name="password" />
                                                                            {/*<div style={{display:"flex",justifyContent:"flex-end",width:"100%",position:"absolute",cursor:"pointer"}}>*/}
                                                                            {/*    <IconButton*/}
                                                                            {/*        onClick={() => this.setState({*/}
                                                                            {/*            changePassInpType:!changePassInpType*/}
                                                                            {/*        })}*/}
                                                                            {/*    >*/}
                                                                            {/*        {*/}
                                                                            {/*            changePassInpType ?*/}
                                                                            {/*                <VisibilityIcon/> :*/}
                                                                            {/*                <VisibilityOffIcon/>*/}
                                                                            {/*        }*/}
                                                                            {/*        /!*<FontAwesomeIcon icon={!changePassInpType ? faEyeSlash : faEye} size={32} color={STRINGS.TYPES.COLORS.DEFAULT}/>*!/*/}
                                                                            {/*    </IconButton>*/}
                                                                            {/*</div>*/}
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="d-flex justify-content-between">
                                                                            <div className="checkbox-input">
                                                                                <input type="checkbox"
                                                                                    onClick={this.handleRememberMe}
                                                                                    name="login-form-remember"
                                                                                    id="login-form-remember" />
                                                                                <label htmlFor="login-form-remember">Remember
                                                                                    me</label>
                                                                            </div>
                                                                            <div className="checkbox-input">
                                                                                <label
                                                                                    style={{ cursor: "pointer" }}
                                                                                    onClick={this.handleForgetPassword}>Forgot
                                                                                    Password</label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        openForgetPassword && (
                                                                            <ForgetPasswordModal
                                                                                openForgetPassword={openForgetPassword}
                                                                                onClose={() => this.setState({
                                                                                    openForgetPassword: false
                                                                                })} />
                                                                        )
                                                                    }
                                                                    <div className="col-12 mb-25">
                                                                        {
                                                                            !success ?
                                                                                <button className="ht-btn"
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault()
                                                                                        this.handleLogin()
                                                                                    }}
                                                                                >Login
                                                                                </button> :
                                                                                <div className="spinner-holder">
                                                                                    <Spinner type={"Puff"} height={100}
                                                                                        width={40} />
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </form>
                                                        {/*<div className="divider">*/}
                                                        {/*    <span className="line"></span>*/}
                                                        {/*    <span className="circle">or login with</span>*/}
                                                        {/*</div>*/}
                                                        {/*<div className="social-login" style={{textAlign: "center"}}>*/}
                                                        {/*    /!*<ul className="social-icon">*!/*/}
                                                        {/*    /!*    <li><NavLink className="facebook" to="#"><i*!/*/}
                                                        {/*    /!*        className="fab fa-facebook"/></NavLink></li>*!/*/}

                                                        {/*    /!*    <li><NavLink className="linkedin" to="#"><i*!/*/}
                                                        {/*    /!*        className="fab fa-linkedin"/></NavLink></li>*!/*/}
                                                        {/*    /!*    <li><NavLink className="youtube" to="#"><i*!/*/}
                                                        {/*    /!*        className="fab fa-youtube"/></NavLink></li>*!/*/}
                                                        {/*    /!*</ul>*!/*/}
                                                        {/*    <ul className="social-icon">*/}
                                                        {/*        <li><NavLink className="facebook" to="#">*/}
                                                        {/*            <FontAwesomeIcon icon={faFacebook}*/}
                                                        {/*                             className="fab fa-facebook"/></NavLink>*/}
                                                        {/*        </li>*/}
                                                        {/*        <li><NavLink className="twitter" to="#">*/}
                                                        {/*            <FontAwesomeIcon icon={faTwitter}*/}
                                                        {/*                             className="fab fa-twitter"/></NavLink>*/}
                                                        {/*        </li>*/}
                                                        {/*        <li><NavLink className="linkedin"*/}
                                                        {/*                     to="#"><FontAwesomeIcon icon={faLinkedin}*/}
                                                        {/*                                             className="fab fa-linkedin"/></NavLink>*/}
                                                        {/*        </li>*/}
                                                        {/*        <li><NavLink className="google" to="#"><FontAwesomeIcon*/}
                                                        {/*            icon={faGooglePlus}*/}
                                                        {/*            className="fab fa-google-plus"/></NavLink></li>*/}
                                                        {/*    </ul>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>
                                            } />
                                            <Route exact path={`${STRINGS.ROUTES.AUTH.SIGN_UP}`} render={
                                                () =>
                                                    <div id="register" className="tab-pane fade show active">
                                                        <div className="login-register-form">
                                                            <form autoComplete="off">
                                                                <p>Create Your account</p>


                                                                <div className="row row-6">
                                                                    <div className="col-2">
                                                                        <div className="custom-radio">
                                                                            <input type="radio"
                                                                                onClick={() => this.handleChangeTab(1)}
                                                                                name="login-form-type"
                                                                                data-target="#candidate"
                                                                                checked={tab === 1}
                                                                                id="login-form-candidate" />
                                                                            <label style={{ marginLeft: '5px' }}
                                                                                htmlFor="login-form-candidate">Candidate</label>
                                                                        </div>

                                                                    </div>
                                                                    <div className="col-2">
                                                                        <div className="custom-radio">
                                                                            <input type="radio"
                                                                                onClick={() => this.handleChangeTab(2)}
                                                                                name="login-form-type"
                                                                                id="login-form-employer"
                                                                                checked={tab === 2}
                                                                                data-target="#employer" />
                                                                            <label style={{ marginLeft: '5px' }}
                                                                                htmlFor="login-form-employer">Employer</label>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-4">
                                                                        <div className="custom-radio">
                                                                            <input type="radio"
                                                                                onClick={() => this.handleChangeTab(3)}
                                                                                name="login-form-type"
                                                                                id="login-form-employer"
                                                                                checked={tab === 3}
                                                                                data-target="#employer" />
                                                                            <label style={{ marginLeft: '5px' }}
                                                                                htmlFor="login-form-employer">Find a Tutor</label>
                                                                        </div>
                                                                    </div>
                                                                </div>


                                                                {
                                                                    tab === 1 && (
                                                                        <div id="candidate"
                                                                            className="tab-pane fade show active">
                                                                            {
                                                                                dropDownSelection()
                                                                            }
                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="text"
                                                                                            placeholder="First Name"
                                                                                            name="firstName"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="text"
                                                                                            placeholder="Last Name"
                                                                                            name="lastName"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="email"
                                                                                            autoComplete="off"
                                                                                            placeholder="Email Address"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="email" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="password"
                                                                                            placeholder="Password"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="password" />
                                                                                        {isUpdate &&
                                                                                            <PasswordStrengthBar
                                                                                                password={this.signUp.password}
                                                                                            // onChangeScore={(ev) => {
                                                                                            //     if (ev === 4) {
                                                                                            //         this.setState({
                                                                                            //             isStrongPass: true
                                                                                            //         })
                                                                                            //     }
                                                                                            // }
                                                                                            // }
                                                                                            />}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <label id='lblDOB'>Date of birth</label>
                                                                                        <input type="date"
                                                                                            id="dob"
                                                                                            placeholder="Date of birth"
                                                                                            onChange={(e) => this.signUp.dob = (new Date(e.target.value)).toISOString()}
                                                                                            name="dob" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        {/*<input type="text"*/}
                                                                                        {/*       placeholder="City of residence"*/}
                                                                                        {/*       onChange={this.handleChangeSignUp}*/}
                                                                                        {/*       name="city"/>*/}

                                                                                        {/*<AutoComplete*/}
                                                                                        {/*    _id="city"*/}
                                                                                        {/*    data={getCities}*/}
                                                                                        {/*    label={"Select City"}/>*/}

                                                                                        <SelectCities
                                                                                            id="city"
                                                                                            title="City"
                                                                                            value={this.signUp.city}
                                                                                            onChange={this.handleSelectCity}
                                                                                            options={getCities}
                                                                                        />

                                                                                        {/*{*/}
                                                                                        {/*    getCities.length > 0 && (*/}
                                                                                        {/*        <select id="city" className="nice-select wide citySelection" name="city" onChange={this.handleChangeSignUp}>*/}
                                                                                        {/*            {dropDownSelection()}*/}
                                                                                        {/*            <option value="">Select City</option>*/}
                                                                                        {/*            {*/}
                                                                                        {/*                getCities.map(({city}) => {*/}
                                                                                        {/*                        return (*/}
                                                                                        {/*                            <option value={city}>{city}</option>)*/}
                                                                                        {/*                    }*/}
                                                                                        {/*                )}*/}
                                                                                        {/*        </select>*/}
                                                                                        {/*    )*/}
                                                                                        {/*}*/}
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="number"
                                                                                            placeholder="Phone Number"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="phone" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="text"
                                                                                            placeholder="Address"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="address" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <select ref={this.maritalStatus}
                                                                                            name="maritalStatus"
                                                                                            className="w-100 maritalStatus">
                                                                                            <option value="">Select
                                                                                                Marital
                                                                                                Status
                                                                                            </option>
                                                                                            <option
                                                                                                value="Single">Single
                                                                                            </option>
                                                                                            <option
                                                                                                value="Married">Married
                                                                                            </option>
                                                                                            <option
                                                                                                value="Widowed">Widowed
                                                                                            </option>
                                                                                            <option
                                                                                                value="Divorced">Divorced
                                                                                            </option>
                                                                                            <option
                                                                                                value="null">Prefer not
                                                                                                to answer
                                                                                            </option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <select ref={this.graduationLevel}
                                                                                            name="graduationLevel"
                                                                                            className="w-100 graduationLevel">
                                                                                            <option value="">Select
                                                                                                Qualification Level
                                                                                            </option>
                                                                                            <option
                                                                                                value="PhD">PhD
                                                                                            </option>
                                                                                            <option
                                                                                                value="Masters">Masters
                                                                                            </option>
                                                                                            <option
                                                                                                value="Bachelors">Bachelors
                                                                                            </option>
                                                                                            <option
                                                                                                value="Intermediate">Intermediate
                                                                                            </option>
                                                                                            <option
                                                                                                value="Matric">Matric
                                                                                            </option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="row pt-15">
                                                                                        <div className="col-3">
                                                                                            <label
                                                                                                htmlFor="rdo_female">Gender</label>
                                                                                        </div>

                                                                                        <div className="col-4">
                                                                                            <div
                                                                                                className="custom-radio">
                                                                                                <input
                                                                                                    ref={this.gender_female}
                                                                                                    type="radio"
                                                                                                    name="rdo_gender"
                                                                                                    defaultChecked
                                                                                                    //onChange={(e) => this.signUp.gender = e.target.checked}
                                                                                                    id="rdo_male" />
                                                                                                <label
                                                                                                    style={{ marginLeft: '5px' }}
                                                                                                    htmlFor="rdo_male">Female</label>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-3">
                                                                                            <div
                                                                                                className="custom-radio">
                                                                                                <input
                                                                                                    ref={this.gender_male}
                                                                                                    type="radio"
                                                                                                    name="rdo_gender"
                                                                                                    //onChange={(e) => this.signUp.gender = e.target.checked}
                                                                                                    id="rdo_female" />
                                                                                                <label
                                                                                                    style={{ marginLeft: '5px' }}
                                                                                                    htmlFor="rdo_female">Male</label>
                                                                                            </div>
                                                                                        </div>

                                                                                    </div>


                                                                                </div>
                                                                            </div>


                                                                        </div>

                                                                    )

                                                                }
                                                                {
                                                                    tab === 2 && (
                                                                        <div id="employer"
                                                                            className="tab-pane show active">
                                                                            {
                                                                                dropDownSelection()
                                                                            }
                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="text"
                                                                                            placeholder="First Name"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="firstName" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="text"
                                                                                            placeholder="Last Name"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="lastName" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="text"
                                                                                            placeholder="Name of company"
                                                                                            onChange={(e) => this.setState({ companyName: e.target.value })}
                                                                                            name="email" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        {/*<input type="text"*/}
                                                                                        {/*       placeholder="City"*/}
                                                                                        {/*       onChange={this.handleChangeSignUp}*/}
                                                                                        {/*       name="city"/>*/}
                                                                                        <SelectCities
                                                                                            id="city"
                                                                                            title={"City"}
                                                                                            value={this.signUp.city}
                                                                                            onChange={this.handleSelectCity}
                                                                                            options={getCities}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="text"
                                                                                            placeholder="Address"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="address" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="number"
                                                                                            placeholder="Phone Number"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="phone" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="number"
                                                                                            placeholder="Number of Male Employees"
                                                                                            id="maleEmployees"
                                                                                            name="numberofEmployees"
                                                                                            onChange={(e) => this.setState({ numberofEmployees: e.target.value })}
                                                                                        //onChange={this.handleChangeSignUp}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="number"
                                                                                            placeholder="Number of Female Employees"
                                                                                            id="femaleEmployees"
                                                                                            onChange={(e) => this.setState({ numberofEmployeesFemale: e.target.value })}
                                                                                            //onChange={this.handleChangeSignUp}
                                                                                            name="numberofEmployeesFemale"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="text"
                                                                                            placeholder="Email Address"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="email" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="password"
                                                                                            placeholder="Password"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="password" />
                                                                                        {isUpdate &&
                                                                                            <PasswordStrengthBar
                                                                                                password={this.signUp.password}
                                                                                            // onChangeScore={(ev) =>
                                                                                            //     console.log("score", ev)}
                                                                                            />}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                                {
                                                                    tab === 3 && (
                                                                        <div id="employer"
                                                                            className="tab-pane show active">
                                                                            {
                                                                                dropDownSelection()
                                                                            }
                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="text"
                                                                                            placeholder="Full Name"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="firstName" />
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="number"
                                                                                            placeholder="Phone Number"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="phone" />
                                                                                    </div>
                                                                                </div>
                                                                              
                                                                            </div>
                                                                            <div className="row row-5" style={{ marginTop: `10px` }}>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <SelectCities
                                                                                            id="city"
                                                                                            title={"City"}
                                                                                            value={this.signUp.city}
                                                                                            onChange={this.handleSelectCity}
                                                                                            options={getCities}
                                                                                        />
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="text"
                                                                                            placeholder="Address"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="address" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="text"
                                                                                            placeholder="Email Address"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="email" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                    <div className="single-input">
                                                                                        <input type="password"
                                                                                            placeholder="Password"
                                                                                            onChange={this.handleChangeSignUp}
                                                                                            name="password" />
                                                                                        {isUpdate &&
                                                                                            <PasswordStrengthBar
                                                                                                password={this.signUp.password}
                                                                                            // onChangeScore={(ev) =>
                                                                                            //     console.log("score", ev)}
                                                                                            />}
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row row-5">
                                                                                <div className="col-6">
                                                                                    <div className="row pt-15">
                                                                                        <div className="col-4">
                                                                                            <div
                                                                                                className="custom-radio">
                                                                                                <input
                                                                                                    ref={this.gender_tutor}
                                                                                                    type="radio"
                                                                                                    name="rdo_gender"
                                                                                                    defaultChecked
                                                                                                    //onChange={(e) => this.signUp.gender = e.target.checked}
                                                                                                    id="rdo_tutor" />
                                                                                                <label
                                                                                                    style={{ marginLeft: '5px' }}
                                                                                                    htmlFor="rdo_tutor">Tutor</label>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>


                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                                {/*<!-------->*/}


                                                                <div className="row row-5">

                                                                    <div className="col-12">
                                                                        <div className="register-account"
                                                                            style={{ borderColor: " transparent" }}>
                                                                            <input id="register-terms-conditions"
                                                                                type="checkbox"
                                                                                onChange={(e) => this.setState({
                                                                                    tAndC: e.target.checked
                                                                                })}
                                                                                className="checkbox"
                                                                                required="" />
                                                                            <label htmlFor="register-terms-conditions">I
                                                                                read and agree
                                                                                to the <Link target="_blank"
                                                                                    to={`${STRINGS.ROUTES.T_AND_C}`}>Terms &amp; Conditions</Link> and <Link
                                                                                        target="_blank"
                                                                                        to={`${STRINGS.ROUTES.PRIVACY_POLICY}`}>Privacy
                                                                                    Policy</Link></label>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12 mb-25">
                                                                        {
                                                                            !responsePending ?
                                                                                <button className="ht-btn"
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault()
                                                                                        this.handleRegister()
                                                                                    }}>Register
                                                                                </button> :
                                                                                <div className="spinner-holder">
                                                                                    <Spinner type={"Puff"} height={100}
                                                                                        width={40} />
                                                                                </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {/*<!------->*/}


                                                            </form>
                                                            {/*<div className="divider">*/}
                                                            {/*    <span className="line"></span>*/}
                                                            {/*    <span className="circle">or login with</span>*/}
                                                            {/*</div>*/}
                                                            {/*<div className="social-login" style={{textAlign: "center"}}>*/}
                                                            {/*    <ul className="social-icon">*/}
                                                            {/*        <li><NavLink className="facebook" to="#">*/}
                                                            {/*            <FontAwesomeIcon icon={faFacebook}*/}
                                                            {/*                             className="fab fa-facebook"/></NavLink>*/}
                                                            {/*        </li>*/}
                                                            {/*        <li><NavLink className="twitter" to="#">*/}
                                                            {/*            <FontAwesomeIcon icon={faTwitter}*/}
                                                            {/*                             className="fab fa-twitter"/></NavLink>*/}
                                                            {/*        </li>*/}
                                                            {/*        <li><NavLink className="linkedin"*/}
                                                            {/*                     to="#"><FontAwesomeIcon*/}
                                                            {/*            icon={faLinkedin}*/}
                                                            {/*            className="fab fa-linkedin"/></NavLink></li>*/}
                                                            {/*        <li><NavLink className="google"*/}
                                                            {/*                     to="#"><FontAwesomeIcon*/}
                                                            {/*            icon={faGooglePlus}*/}
                                                            {/*            className="fab fa-google-plus"/></NavLink></li>*/}
                                                            {/*    </ul>*/}
                                                            {/*</div>*/}
                                                        </div>
                                                    </div>
                                            } />
                                        </Switch>


                                    </div>
                                </div>
                            </div>
                            <div hidden className="col-lg-8">
                                <div className="login-instruction">
                                    <div className="login-instruction-content">
                                        <h3 className="title">Why Login To Us</h3>
                                        <p>It’s important for you to have an account and login in order to have full
                                            access at Jotopa. We need to know your account details in order to allow
                                            work together</p>
                                        <ul className="list-reasons">
                                            <li className="reason">Be alerted to the latest jobs</li>
                                            <li className="reason">Apply for jobs with a single click</li>
                                            <li className="reason">Showcase your CV to thousands of employers</li>
                                            <li className="reason">Keep a record of all your applications</li>
                                        </ul>
                                        <span className="sale-text theme-color border-color">Login today &amp; Get 15% Off Coupon for the first planning purchase</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        message={this.state.Message}
                        action={
                            <React.Fragment>
                                <Button color="secondary" size="small" onClick={this.handleClose}>
                                    UNDO
                                </Button>
                                <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            </React.Fragment>
                        }
                    />

                </div>
                {/*<!-- Login Register Section End -->*/}

                <Footer />
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    authLogin: (obj, isRemember) => dispatch(authAction.submitLogin(obj, isRemember)),
    authRegister: obj => dispatch(authAction.submitRegister(obj)),
});

const mapStateToProps = ({ authReducers }) => ({
    success: authReducers.login.success
})


export default connect(mapStateToProps, mapDispatchToProps)(Auth)