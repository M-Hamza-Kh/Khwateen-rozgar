import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import logo_mobile from "../../content/images/logo-mobile.png"
import {faChevronDown, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {getUserData, isLogin, STRINGS} from "../../utils/base";
import $ from "jquery";
import {API} from "../../utils/services";

export class StartPopUpMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerClass: props.headerClass !== undefined ? props.headerClass : `header-absolute sb-border header-sticky d-none d-lg-block`,
            logoType: props.logoType !== undefined ? props.logoType : STRINGS.TYPES.LOGO_TYPE.MAIN,
            userType: isLogin() ? getUserData().type : 0,
            getCities: [],
            onJob: false,
            onCompany: false

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
            //console.log("jobUni", response)
            let {status, data: {uniqueCities}} = response;
            if (status) {
                this.setState({
                    getCities: uniqueCities,
                })
            }
        }).catch((err) => {
            alert(err)
        })
    }

    handleToggleDropDown = (type) => {
        if (type === 1) {
            this.setState({
                onCompany: !this.state.onCompany
            });
        } else {
            this.setState({
                onJob: !this.state.onJob
            });
        }
    }

    render() {
        let {getCities, onJob, onCompany} = this.state;

        return (
            <div>
                {/*<!-- Start Popup Menu -->*/}
                <div className="popup-mobile-manu popup-mobile-visiable">
                    <div className="inner">
                        <div className="mobileheader">
                            <div className="logo">
                                <NavLink to={STRINGS.ROUTES.ROOT}>
                                    <img src={logo_mobile} alt="Multipurpose"/>
                                </NavLink>
                            </div>
                            <FontAwesomeIcon icon={faTimesCircle} color="white"
                                             className="mobile-close text-white" to="#"
                                             onClick={() => this.props.closeShowMenu()}
                            />
                        </div>
                        <div className="menu-content">
                            <ul className="menulist object-custom-menu">
                                <li className=""><NavLink to={STRINGS.ROUTES.ROOT}>
                                    <span>Home</span>
                                </NavLink></li>
                                <li className="has-mega-menu" onClick={() => this.handleToggleDropDown(1)}>
                                    <NavLink to="#" className="d-flex w-100 justify-content-between align-items-center">
                                        Company<span className="d-flex w-100 justify-content-end">
                                      <FontAwesomeIcon style={{padding: "0 0 0 2px"}}
                                                       icon={faChevronDown}
                                                       size={"sm"}/>
                                  </span>
                                    </NavLink>
                                    {/*<!-- Start Dropdown Menu -->*/}
                                    <ul className={`object-submenu ${onCompany ? `on` : ""}`}>
                                        <li><NavLink to={STRINGS.ROUTES.ABOUT}><span>About Us</span></NavLink></li>
                                        {/*<li><NavLink to={STRINGS.ROUTES.ABOUT}><span>FAQ's</span></NavLink></li>*/}
                                        {/*<li><NavLink to="about.html"><span>Inquiry</span></NavLink></li>*/}
                                        <li><NavLink to={STRINGS.ROUTES.CONTACT}><span>Contact</span></NavLink></li>
                                    </ul>
                                    {/*<!-- End Dropdown Menu -->*/}
                                </li>
                                <li className="has-mega-menu" onClick={() => this.handleToggleDropDown(2)}>
                                    <NavLink to="#"
                                             className="d-flex w-100 justify-content-between align-items-center"
                                    >Jobs<span className="d-flex w-100 justify-content-end">
                                      <FontAwesomeIcon style={{padding: "0 0 0 2px"}}
                                                       icon={faChevronDown}
                                                       size={"sm"}/>
                                  </span>
                                    </NavLink>
                                    {/*<!-- Start Dropdown Menu -->*/}
                                    <ul className={`object-submenu ${onJob ? `on` : ""}`}>
                                        {
                                            getCities.length > 0 && (
                                                getCities.map((ct) =>
                                                    <li>
                                                        <NavLink
                                                            to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=${ct}&type=&page=1`}>{ct}</NavLink>
                                                    </li>
                                                )
                                            )
                                        }
                                        <li><NavLink
                                            to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=&type=&page=1`}>Other</NavLink>
                                        </li>
                                    </ul>
                                    {/*<!-- End Dropdown Menu -->*/}
                                </li>
                                <li><NavLink to={STRINGS.ROUTES.TESTIMONIAL}>Testimonials</NavLink></li>
                                <li><NavLink to={`${STRINGS.ROUTES.BLOGS}`}>Events & Blog</NavLink></li>
                                <li><NavLink to={STRINGS.ROUTES.REVIEWS}>Reviews</NavLink></li>
                                {
                                    isLogin() ?
                                        (
                                            <li><NavLink to={STRINGS.ROUTES.DASHBOARD.HOME}><span>{getUserData().firstName + " " + getUserData().lastName}</span></NavLink></li>
                                        ) :
                                        (
                                            <li><NavLink to={STRINGS.ROUTES.AUTH.SIGN_IN}><span>Login / Register</span></NavLink></li>
                                        )
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <!-- End Popup Menu -->*/}
            </div>
        );
    }
}