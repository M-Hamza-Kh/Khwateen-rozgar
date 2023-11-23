import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import MainLogo from '../../content/images/logo-white.png';
import PurpleLogo from '../../content/images/logo-purple.png';
import $ from 'jquery';
import {getUserData, isLogin, STRINGS} from "../../utils/base";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faUser} from "@fortawesome/free-solid-svg-icons";
import {faFacebookSquare, faLinkedin, faYoutube} from "@fortawesome/free-brands-svg-icons";
import {API} from "../../utils/services";
import NotificationBadge from "./notificationBadge";
import '../sweetAlert.css';

export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headerClass: props.headerClass !== undefined ? props.headerClass : `header-absolute sb-border header-sticky d-none d-lg-block`,
            logoType: props.logoType !== undefined ? props.logoType : STRINGS.TYPES.LOGO_TYPE.MAIN,
            userType: isLogin() ? getUserData().type : 0,
            getCities: [],
            isResponsePending: true

        }

        $(document).ready(() => {
            let sticky = $('.header-sticky');
            $(window).on('scroll', function () {
                let scroll = $(window).scrollTop();
                if (scroll < 300) {
                    sticky.removeClass('is-sticky');
                } else {
                    sticky.addClass('is-sticky');
                }
            });
        })

    }

    componentDidMount() {
        this.getUniqueCities();
    }

    getUniqueCities = () => {
        API.JOBS.getJobUniques().then((response) => {
            // console.log("jobUni", response)
            let {status, data: {uniqueCities}} = response;
            if (status) {
                this.setState({
                    getCities: uniqueCities,
                    isResponsePending: true
                })
            }
        }).catch((err) => {
            alert(err)
        })
    }

    handleCallBack = (cb) => {
        if (this.props.onCallback !== undefined) {
            this.props.onCallback(cb)
        }
    }

    render() {
        let {headerClass, logoType, getCities, isResponsePending} = this.state;
        // console.log("getCities", getCities)
        return (
            <header className={headerClass}>
                <div className="main-header">
                    <div className="container-fluid">{/*pl-50 pl-lg-15 pl-md-15 pr-0*/}
                        <div className="row align-items-center no-gutters">
                            {/*<!--Logo start-->*/}
                            <div className="col-xl-2 col-lg-2 col-12">
                                <div className="logo">
                                    <NavLink to={`${STRINGS.ROUTES.ROOT}`}>
                                        <img className="logo_main" src={
                                            logoType === STRINGS.TYPES.LOGO_TYPE.MAIN ? MainLogo
                                                : logoType === STRINGS.TYPES.LOGO_TYPE.LOGIN ? PurpleLogo : MainLogo
                                        } alt=""/></NavLink>
                                </div>
                            </div>
                            {/*<!--Logo end-->*/}

                            {/*<!--Menu start-->*/}
                            <div className="col-xl-7 col-lg-7 col-12">
                                <nav className="main-menu">
                                    <ul>
                                        <li><NavLink to={`${STRINGS.ROUTES.ROOT}`}>Home </NavLink></li>
                                        <li><NavLink to="#"> Company <small><FontAwesomeIcon
                                            style={{padding: "0 0 0 2px"}} icon={faChevronDown}
                                            size={"sm"}/></small>
                                        </NavLink>
                                            <ul className="sub-menu">
                                                <li><NavLink to={`${STRINGS.ROUTES.ABOUT}`}>About Us</NavLink></li>
                                                {/*<li><NavLink to={`${STRINGS.ROUTES.ABOUT}`}>FAQ's</NavLink></li>*/}
                                                {/*<li><NavLink to={`${STRINGS.ROUTES.ABOUT}`}>Inquiry</NavLink></li>*/}
                                                <li><NavLink to={`${STRINGS.ROUTES.CONTACT}`}>Contact</NavLink></li>
                                            </ul>
                                        </li>
                                        <li><NavLink to="#">Jobs <small><FontAwesomeIcon style={{padding: "0 0 0 2px"}}
                                                                                         icon={faChevronDown}
                                                                                         size={"sm"}/></small></NavLink>
                                            <ul className="sub-menu">
                                                {/*{*/}
                                                {/*    isLogin() && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE &&*/}
                                                {/*    getUserData().allowedCities.length > 0 && (*/}
                                                {/*        getUserData().allowedCities.map((ct) =>*/}
                                                {/*            <li key={ct}>*/}
                                                {/*                <NavLink*/}
                                                {/*                    onClick={() => this.handleCallBack(`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=${ct}&type=&page=1`)}*/}
                                                {/*                    to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=${ct}&type=&page=1`}>{ct}</NavLink>*/}
                                                {/*            </li>*/}
                                                {/*        )*/}
                                                {/*    )*/}

                                                {/*}*/}

                                                {/*<li><NavLink to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=Karachi&type=&page=1`}>Karachi</NavLink>*/}
                                                {/*</li>*/}
                                                {/*<li><NavLink to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=Islamabad&type=&page=1`}>Islamabad</NavLink>*/}
                                                {/*</li>*/}
                                                {/*<li><NavLink to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=Peshawar&type=&page=1`}>Peshawar</NavLink>*/}
                                                {/*</li>*/}
                                                {/*<li><NavLink to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=Hyderabad&type=&page=1`}>Hyderabad</NavLink>*/}
                                                {/*</li>*/}
                                                {isResponsePending ?
                                                    getCities.length !== 0 &&
                                                    getCities.map((ct) =>
                                                        <li key={ct}>
                                                            <NavLink
                                                                onClick={() => this.handleCallBack(`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=${ct}&type=&page=1`)}
                                                                to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=${ct}&type=&page=1`}>{ct}</NavLink>
                                                        </li>
                                                    ) :""

                                                }
                                                <li><NavLink
                                                    onClick={() => this.handleCallBack(`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=&type=&page=1`)}
                                                    to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=&type=&page=1`}>Other</NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                        <li><NavLink to={STRINGS.ROUTES.TESTIMONIAL}>Testimonials</NavLink></li>
                                        <li><NavLink to={`${STRINGS.ROUTES.BLOGS}`}>Events & Blog</NavLink></li>
                                        <li><NavLink to={STRINGS.ROUTES.REVIEWS}>Reviews</NavLink></li>
                                    </ul>
                                </nav>

                            </div>
                            {/*<!--Menu end-->*/}

                            {/*<!-- Cart & Search Area Start -->*/}
                            <div className="col-xl-3 col-lg-3 col-12">
                                <div className="header-btn-action d-flex justify-content-end">
                                    <div className="btn-action-wrap d-flex">
                                        <div className="jp-author item">
                                            {
                                                // userType === 3 ?
                                                //     <NavLink to={`${STRINGS.ROUTES.DASHBOARD.HOME}`}>Applicant User</NavLink>
                                                //     : userType === 1 ? <NavLink to={`${STRINGS.ROUTES.DASHBOARD.HOME}`}>Admin User</NavLink> : userType === 2 ? <NavLink to={`${STRINGS.ROUTES.DASHBOARD.HOME}`}>Company User</NavLink>
                                                isLogin() ?
                                                    <div className="d-flex align-items-center">
                                                        <NavLink to={`${STRINGS.ROUTES.DASHBOARD.HOME}`} className={"text-nowrap"}>
                                                            {getUserData().firstName + " " + getUserData().lastName}
                                                        </NavLink>
                                                        <div className="d-flex justify-content-center blink">
                                                            <NotificationBadge className="logo" logoType={logoType}/>
                                                        </div>
                                                    </div>
                                                    :
                                                    <NavLink to={`${STRINGS.ROUTES.AUTH.SIGN_IN}`}>
                                                        <FontAwesomeIcon icon={faUser} style={{margin: '0 4px'}}/>
                                                        <span>Login</span>
                                                    </NavLink>
                                            }
                                        </div>
                                        <div className="jp-author-action item">
                                            <ul className="social-icons">
                                                <li><a rel="noopener noreferrer" target="_blank"
                                                       href="https://www.facebook.com/khawateenRozgar"><FontAwesomeIcon
                                                    icon={faFacebookSquare}/>
                                                </a></li>
                                                <li><a rel="noopener noreferrer"
                                                       href="https://www.linkedin.com/company/khawateen-rozgar-services"
                                                       target="_blank"><FontAwesomeIcon icon={faLinkedin}/> </a></li>
                                                <li><a rel="noopener noreferrer"
                                                       href="https://www.youtube.com/channel/UC5c-yAlzY9DbCMhT3XwVcRA"
                                                       target="_blank"><FontAwesomeIcon icon={faYoutube}/> </a></li>
                                            </ul>
                                            {/*<!--<NavLink to="dashboard.html"> <span>Employer</span> <span class="fw-400">Post a job</span></NavLink>-->*/}

                                            {/*<!--<NavLink to="#quick-view-modal-container" data-toggle="modal"> <span>Employer</span> <span class="fw-400">Post a job</span></NavLink>-->*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<!-- Cart & Search Area End -->*/}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}