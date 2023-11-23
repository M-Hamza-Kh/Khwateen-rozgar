import React, {Component} from "react";
import {getUserData, isLogin, STRINGS} from "../../utils/base";
import {NavLink} from "react-router-dom";
import {Header} from "../header";
import {Footer} from "../footer";
import $ from "jquery";
import {API} from "../../utils/services";
import {MobileHeader} from "../mobile/header";
import {StartPopUpMenu} from "../startPopUpMenu";
import UpdateAboutModal from "../dashboard/modals/updateAboutModal";
import Spinner from "../spinner";

export class Index extends Component {
    childDiv = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            lightHeader: `black-logo-version header-sticky sticky-black d-none d-lg-block`,
            email: "",
            name: "",
            showMenu:false,
            isResponse:false,
            openComposer:false,
            message: "",
            contactContent:{}
        }
    }

    componentDidMount = () => {
        this.handleScroll();
        window.onresize = () => {
            if (window.innerWidth >= 1000) {
                this.setState({
                    showMenu: false
                })
            }
        }
        this.getContactContent()
    }

    getContactContent = () => {
        API.CONTENT.getPageContent().then((res) => {
            console.log("aboutContent", res)
            if (res.status) {
                this.setState({
                    contactContent: res.data.filter((pc)=> pc.title === "ContactUS")[0],
                    isResponse: true
                })
            } else {
                alert(res.status);
            }
        })
    }


    handleScroll = () => {
        const {index, selected} = this.props
        if (index === selected) {
            setTimeout(() => {
                this.childDiv.current.scrollIntoView({behavior: 'smooth'})
            }, 500)
        }
    }

    isValidate = ({email, name, message}) => {
        let valid = {error: false, message: ''};
        const email_regex = /\S+@\S+\.\S+/;
        // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (email === "") valid = {
            error: true,
            message: "Email Required!"
        };
        else if (!email_regex.test(email)) valid = {
            error: true,
            message: $.isEmptyObject(valid.message) ? "Invalid Email. example@exa.com" : `${valid.message}\nInvalid Email. example@exa.com`
        };

        if (name === "") valid = {
            error: true,
            message: $.isEmptyObject(valid.message) ? "Name Required!" : `${valid.message}\nName Required!`
        };

        if (message === "") valid = {
            error: true,
            message: $.isEmptyObject(valid.message) ? "Message Required!" : `${valid.message}\nMessage Required!`
        };
        return valid
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmitContact = (ev) => {
        ev.preventDefault();
        let {email, name, message} = this.state
        const valid = this.isValidate({email, name, message})
        if (!valid.error) {
            const contactObj = {
                "email": email,
                "name": name,
                "message": message
            }

            API.USER.userContact(contactObj).then((response) => {
                    if (response.status) {
                        alert("Send Successfully");
                        this.setState({
                            "email": "",
                            "name": "",
                            "message": ""
                        })
                    }
                }
            )

        } else {
            alert(valid.message)
        }

    }

    handleOpenShowMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    render() {
        let {lightHeader, name, email, message,showMenu,openComposer,contactContent,isResponse} = this.state;
        return (
            <div className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
                <Header headerClass={lightHeader} logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
                <MobileHeader openShowMenu={this.handleOpenShowMenu}/>
                <StartPopUpMenu closeShowMenu={this.handleOpenShowMenu}/>
                {/*// <!-- Breadcrumb Section Start -->*/}
                <div className="breadcrumb-section section bg_color--5 pt-30 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40"
                     ref={this.childDiv}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-breadcrumb-content">
                                    <ul hidden className="page-breadcrumb">
                                        <li><NavLink to={`${STRINGS.ROUTES.ROOT}`}>Home</NavLink></li>
                                        <li>Contact Us</li>
                                    </ul>
                                    <h4>Contact Us</h4>
                                    {
                                        isLogin() && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                            <div className="d-flex mb-20">
                                                <button onClick={() => this.setState({
                                                    openComposer: true
                                                })}
                                                        className="ht-btn black-btn">Update
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        openComposer && (
                                            <UpdateAboutModal data={contactContent} onSave={() => window.location.reload()}
                                                              openBlogComposer={openComposer}
                                                              onClose={() => {
                                                                  this.setState({
                                                                      openComposer: false
                                                                  });
                                                              }}/>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*// <!-- Breadcrumb Section Start -->*/}

                {/*// <!-- Contact Section Start -->*/}
                <div className="contact-section section bg_color--5 pb-30 pb-lg-30 pb-md-30 pb-sm-30 pb-xs-30">
                    <div className="container contact-wrapper">
                        <div className="row row-30">

                            <div className="col-lg-4">
                                {/*// <!-- Map Area Start -->*/}
                                <div className="contact-info mb-30">
                                    <h2 className="title">Location</h2>
                                    <div className="contact-map-area">
                                        <iframe title="contactMap" className="contact-map"
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.7781553042064!2d71.46668261521367!3d33.99823158062063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d910d1aba208d3%3A0xb1fb19c297ecff4a!2sNational%20Incubation%20Center%2C%20Peshawar!5e0!3m2!1sen!2s!4v1591361374750!5m2!1sen!2s"
                                                width="600" height="450" frameborder="0"
                                                style={{border: 0}} allowfullscreen="" aria-hidden="false"
                                                tabindex="0"/>
                                    </div>
                                </div>
                                {/*// <!-- Map Area End -->*/}
                            </div>

                            <div className="col-lg-4">
                                <div className="contact-info mb-30">
                                    <h2 className="title">Contact info</h2>
                            {isResponse ?
                                <iframe title='aboutContent' className="iframeBody ov-des"
                                        src={"data:text/html," + encodeURIComponent(contactContent.pageContent)}
                                        style={{border: "none", outline: "none"}}/>
                                :
                                <div className="spinner-holder">
                                    <Spinner type={"Puff"}/>
                                </div>
                            }
                                </div>
                            </div>


                            {/*        <div className="contact-information">*/}
                            {/*            <div className="info">*/}
                            {/*                <span className="title">Email:</span>*/}
                            {/*                <span className="text">info@khawateenrozgar.com</span>*/}
                            {/*            </div>*/}
                            {/*            <div className="info">*/}
                            {/*                <span className="title">Phone:</span>*/}
                            {/*                <span className="text phone">+92 332 9365589</span>*/}
                            {/*            </div>*/}
                            {/*            <div className="info">*/}
                            {/*                <span className="title">Address:</span>*/}
                            {/*                <span className="text">National Incubation Centre, Inside PTCL training centre, Near Nasir Bagh Road, Board, Peshawar</span>*/}
                            {/*            </div>*/}
                            {/*            <div className="info">*/}
                            {/*                <span className="title">Follow us:</span>*/}
                            {/*                <ul className="social-icon">*/}
                            {/*                    <li><NavLink className="facebook" to="#"><i*/}
                            {/*                        className="fab fa-facebook"/></NavLink></li>*/}

                            {/*                    <li><NavLink className="linkedin" to="#"><i*/}
                            {/*                        className="fab fa-linkedin"/></NavLink></li>*/}
                            {/*                    <li><NavLink className="youtube" to="#"><i className="fab fa-youtube"/></NavLink>*/}
                            {/*                    </li>*/}
                            {/*                </ul>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className="col-lg-4">
                                {/*// <!-- Contact info Start -->*/}
                                <div className="contact-info mb-30">
                                    <h2 className="title">Contact form</h2>
                                    <div className="contact-form">
                                        <form action={STRINGS.ROUTES.CONTACT}
                                              onSubmit={this.handleSubmitContact}>
                                            <p>Please send us a message by filling out the form below and we will get
                                                back with you</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="single-input">
                                                        <input type="text" value={name} placeholder="Your Name *"
                                                               name="name" onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="single-input">
                                                        <input type="email" value={email} placeholder="Email *"
                                                               name="email" onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="single-input">
                                                        <textarea name="message" value={message} placeholder="Message"
                                                                  onChange={this.handleChange}/>
                                                    </div>
                                                </div>
                                                <div className="col-12 mb-40">
                                                    <button type="submit" className="ht-btn">Send</button>
                                                    <p className="form-messege"/>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                {/*// <!-- Contact info End -->*/}
                            </div>

                        </div>
                    </div>
                </div>
                {/*// <!-- Contact Section End -->*/}
                <Footer/>
            </div>
        );
    }
}