import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import logo_mobile from "../../content/images/logo-mobile.png"
import {
    faBars, faBriefcase,
    faChartBar,
    faChevronDown, faDollarSign,
    faEnvelope, faLock, faMoneyBill, faSignOutAlt,
    faStar,
    faTimesCircle, faTools,
    faUser, faUserAltSlash
} from "@fortawesome/free-solid-svg-icons";
import {getUserData, handleHideShow, isLogin, logout, STRINGS} from "../../utils/base";
import OverlayTrigger from "react-bootstrap/cjs/OverlayTrigger";
import Tooltip from "react-bootstrap/cjs/Tooltip";
import {faSearch} from "@fortawesome/free-solid-svg-icons/faSearch";
import {faBuilding} from "@fortawesome/free-regular-svg-icons/faBuilding";

export class StartPopUpMenuDashboard extends Component {
    toogleNavBar = false;

    constructor(props) {
        super(props);
        // console.log("currentRights",props.rights)
        this.state = {
            currentRights: props.rights,
            navBarUI: false,
            userType: isLogin() ? getUserData().type : 0
        };
        handleHideShow(localStorage.getItem("navBarUI", this.toogleNavBar))
    }

    // handleNavHideAndShow = () => {
    //     this.handleHideShow(navBarUI);
    // };


    handleLocal = () => {
        this.toogleNavBar = !this.toogleNavBar;
        localStorage.setItem("navBarUI", this.toogleNavBar)
        handleHideShow(localStorage.getItem("navBarUI", this.toogleNavBar))
    };

    render() {
        let {userType, currentRights} = this.state;
// console.log("currentRights",currentRights)
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
                            <div className="dashboard-sidebar">
                                <div className="dashboard-menu">
                                    <ul className="nav">
                                        <div className="navSideBtn">
                                            <FontAwesomeIcon icon={faBars} onClick={this.handleLocal}/>
                                        </div>
                                        <li>
                                            <h3>Main</h3>
                                            <ul>
                                                {
                                                    currentRights.includes(STRINGS.RIGHTS.DB) && (
                                                        <li>
                                                            <NavLink activeClassName="active" to={`${STRINGS.ROUTES.DASHBOARD.HOME}`}>
                                                                <OverlayTrigger
                                                                    placement="right"
                                                                    delay={{show: 250, hide: 400}}
                                                                    overlay={<Tooltip>Dashboard</Tooltip>}
                                                                >
                                                                    <FontAwesomeIcon
                                                                        onMouseOver={() => this.setState({dashBoard: true})}
                                                                        onMouseOut={() => this.setState({dashBoard: false})}
                                                                        icon={faChartBar} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                        className="lnr lnr-chart-bars"/>
                                                                </OverlayTrigger>
                                                                <span> Dashboard </span> </NavLink>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    currentRights.includes(STRINGS.RIGHTS.UP) && (<li>
                                                        <NavLink activeClassName="active" to={`${STRINGS.ROUTES.DASHBOARD.PROFILE}`}>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                delay={{show: 250, hide: 400}}
                                                                overlay={<Tooltip>Profile</Tooltip>}
                                                            >
                                                                <FontAwesomeIcon icon={faUser} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                 className="lnr lnr-user"/>
                                                            </OverlayTrigger>
                                                            <span> Profile </span> </NavLink></li>)
                                                }
                                                {/*{*/}
                                                {/*    currentRights.includes(STRINGS.RIGHTS.MSG) && (*/}
                                                {/*        <li>*/}
                                                {/*            <NavLink activeClassName="active"*/}
                                                {/*                     to={`${STRINGS.ROUTES.DASHBOARD.MESSENGER}`}>*/}
                                                {/*                <OverlayTrigger*/}
                                                {/*                    placement="right"*/}
                                                {/*                    delay={{show: 250, hide: 400}}*/}
                                                {/*                    overlay={<Tooltip>Messages</Tooltip>}*/}
                                                {/*                >*/}
                                                {/*                    <FontAwesomeIcon icon={faComment}*/}
                                                {/*                                     color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                {/*                                     className="lnr lnr-bubble"/>*/}
                                                {/*                </OverlayTrigger>*/}
                                                {/*                <span> Messages </span></NavLink>*/}
                                                {/*        </li>*/}
                                                {/*    )*/}
                                                {/*}*/}
                                                {/*{*/}
                                                {/*    currentRights.includes(STRINGS.RIGHTS.JA) && (*/}
                                                {/*        <li><NavLink activeClassName="active"*/}
                                                {/*                     to={`${STRINGS.ROUTES.DASHBOARD.JOBS_ALERTS}`}>*/}
                                                {/*            <OverlayTrigger*/}
                                                {/*                placement="right"*/}
                                                {/*                delay={{show: 250, hide: 400}}*/}
                                                {/*                overlay={<Tooltip>Job Alerts</Tooltip>}*/}
                                                {/*            >*/}
                                                {/*                <FontAwesomeIcon icon={faEnvelope} color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                {/*                                 className="lnr lnr-envelope"/>*/}
                                                {/*            </OverlayTrigger>*/}
                                                {/*            <span> Job Alerts </span></NavLink></li>*/}
                                                {/*    )*/}
                                                {/*}*/}
                                                {
                                                    currentRights.includes(STRINGS.RIGHTS.JS) && (
                                                        <li><NavLink activeClassName="active"
                                                                     to={`${STRINGS.ROUTES.DASHBOARD.JOB_SEARCH}?title=&city=&type=&page=1`}>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                delay={{show: 250, hide: 400}}
                                                                overlay={<Tooltip>Job Search</Tooltip>}
                                                            >
                                                                <FontAwesomeIcon icon={faSearch} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                 className="lnr lnr-envelope"/>
                                                            </OverlayTrigger>
                                                            <span> Job Search </span> </NavLink></li>
                                                    )
                                                }
                                                {
                                                    currentRights.includes(STRINGS.RIGHTS.JP) && (
                                                        <li><NavLink activeClassName="active"
                                                                     to={`${STRINGS.ROUTES.DASHBOARD.JOB_POST}`}>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                delay={{show: 250, hide: 400}}
                                                                overlay={<Tooltip>Job Post</Tooltip>}
                                                            >
                                                                <FontAwesomeIcon icon={faEnvelope} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                 className="lnr lnr-envelope"/>
                                                            </OverlayTrigger>
                                                            <span> Job Post </span></NavLink></li>
                                                    )
                                                }
                                                {
                                                    currentRights.includes(STRINGS.RIGHTS.JL) && (<li><NavLink activeClassName="active"
                                                                                                               to={`${STRINGS.ROUTES.DASHBOARD.JOB_LIST}`}>
                                                        <OverlayTrigger
                                                            placement="right"
                                                            delay={{show: 250, hide: 400}}
                                                            overlay={<Tooltip>Job List</Tooltip>}
                                                        >
                                                            <FontAwesomeIcon icon={faEnvelope} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                             className="lnr lnr-envelope"/></OverlayTrigger> <span> Job List </span></NavLink>
                                                    </li>)
                                                }
                                                {
                                                    currentRights.includes(STRINGS.RIGHTS.RV) && (
                                                        <li><NavLink activeClassName="active"
                                                                     to={`${STRINGS.ROUTES.DASHBOARD.REVIEWS}`}>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                delay={{show: 250, hide: 400}}
                                                                overlay={<Tooltip>Reviews</Tooltip>}
                                                            >
                                                                <FontAwesomeIcon icon={faStar} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                 className="lnr lnr-star"/>
                                                            </OverlayTrigger>
                                                            <span> Reviews </span>
                                                        </NavLink>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    currentRights.includes(STRINGS.RIGHTS.SI) && (
                                                        <li><NavLink activeClassName="active"
                                                                     to={`${STRINGS.ROUTES.DASHBOARD.SCHEDULES_INTERVIEWS}`}>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                delay={{show: 250, hide: 400}}
                                                                overlay={<Tooltip>Sch. Interviews</Tooltip>}
                                                            >
                                                                <FontAwesomeIcon icon={faBriefcase} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                 className="lnr lnr-briefcase"/>
                                                            </OverlayTrigger>
                                                            <span> Sch. Interviews </span></NavLink>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    currentRights.includes(STRINGS.RIGHTS.APR) && (
                                                        <li><NavLink activeClassName="active"
                                                                     to={`${STRINGS.ROUTES.DASHBOARD.APPROVALS_LIST}`}>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                delay={{show: 250, hide: 400}}
                                                                overlay={<Tooltip>Testimonials</Tooltip>}
                                                            >
                                                                <FontAwesomeIcon icon={faBuilding} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                 className="lnr lnr-briefcase"/>
                                                            </OverlayTrigger> <span> Testimonials </span></NavLink>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    currentRights.includes(STRINGS.RIGHTS.CA_PAY) && (
                                                        <li><NavLink activeClassName="active"
                                                                     to={`${STRINGS.ROUTES.DASHBOARD.COMPANY_ADMIN_PAYMENT}`}>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                delay={{show: 250, hide: 400}}
                                                                overlay={<Tooltip>Payments</Tooltip>}
                                                            >
                                                                <FontAwesomeIcon icon={faBuilding} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                 className="lnr lnr-briefcase"/>
                                                            </OverlayTrigger> <span> Payments </span></NavLink>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    currentRights.includes(STRINGS.RIGHTS.CL) && (
                                                        <li><NavLink activeClassName="active"
                                                                     to={`${STRINGS.ROUTES.DASHBOARD.COMPANY_LIST}`}>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                delay={{show: 250, hide: 400}}
                                                                overlay={<Tooltip>Company List</Tooltip>}
                                                            >
                                                                <FontAwesomeIcon icon={faBuilding} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                 className="lnr lnr-briefcase"/>
                                                            </OverlayTrigger> <span> Company List </span></NavLink>
                                                        </li>
                                                    )
                                                }
                                                {
                                                    currentRights.includes(STRINGS.RIGHTS.AL) && (
                                                        <li><NavLink activeClassName="active"
                                                                     to={`${STRINGS.ROUTES.DASHBOARD.APPLICANT_LIST}`}>
                                                            <OverlayTrigger
                                                                placement="right"
                                                                delay={{show: 250, hide: 400}}
                                                                overlay={<Tooltip>Applicant List</Tooltip>}
                                                            >
                                                                <FontAwesomeIcon icon={faUserAltSlash}
                                                                                 color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                 className="lnr lnr-briefcase"/></OverlayTrigger> <span> Applicant List </span></NavLink>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                        </li>
                                        {
                                            userType === STRINGS.USER_TYPE.COMPANY_TYPE && (
                                                <li>
                                                    <h3>SET UP</h3>
                                                    <ul>
                                                        {
                                                            currentRights.includes(STRINGS.RIGHTS.C_PKG) && (
                                                                <li><NavLink activeClassName="active"
                                                                             to={`${STRINGS.ROUTES.DASHBOARD.COMPANY_PACKAGES}`}>
                                                                    <OverlayTrigger
                                                                        placement="right"
                                                                        delay={{show: 250, hide: 400}}
                                                                        overlay={<Tooltip>Packages</Tooltip>}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faMoneyBill} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                            className="lnr lnr-lock"/></OverlayTrigger>
                                                                    <span> Packages </span>
                                                                </NavLink></li>
                                                            )
                                                        }
                                                        {
                                                            currentRights.includes(STRINGS.RIGHTS.C_PAY) && (
                                                                <li><NavLink activeClassName="active"
                                                                             to={`${STRINGS.ROUTES.DASHBOARD.COMPANY_PAYMENT}`}>
                                                                    <OverlayTrigger
                                                                        placement="right"
                                                                        delay={{show: 250, hide: 400}}
                                                                        overlay={<Tooltip>Payments</Tooltip>}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faDollarSign} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                            className="lnr lnr-lock"/></OverlayTrigger>
                                                                    <span> Payments </span>
                                                                </NavLink></li>
                                                            )
                                                        }
                                                    </ul>
                                                </li>
                                            )
                                        }
                                        {
                                            userType === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                <li>
                                                    <h3>SET UP</h3>
                                                    <ul>
                                                        {
                                                            currentRights.includes(STRINGS.RIGHTS.PKG) && (
                                                                <li><NavLink activeClassName="active"
                                                                             to={`${STRINGS.ROUTES.DASHBOARD.PACKAGES}`}>
                                                                    <OverlayTrigger
                                                                        placement="right"
                                                                        delay={{show: 250, hide: 400}}
                                                                        overlay={<Tooltip>Packages</Tooltip>}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faMoneyBill} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                            className="lnr lnr-lock"/></OverlayTrigger>
                                                                    <span> Packages </span>
                                                                </NavLink></li>
                                                            )
                                                        }
                                                        {
                                                            currentRights.includes(STRINGS.RIGHTS.SET) && (
                                                                <li><NavLink
                                                                    to={`${STRINGS.ROUTES.DASHBOARD.SETTINGS}`}>
                                                                    <OverlayTrigger
                                                                        placement="right"
                                                                        delay={{show: 250, hide: 400}}
                                                                        overlay={<Tooltip>Settings</Tooltip>}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={faTools} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                            className="lnr lnr-exit-up"/>
                                                                    </OverlayTrigger>
                                                                    <span>
                                                    Settings
                                                    </span>
                                                                </NavLink>
                                                                </li>
                                                            )
                                                        }
                                                    </ul>
                                                </li>
                                            )
                                        }
                                        <li>
                                            <h3>Account</h3>
                                            <ul>
                                                <li>
                                                    <NavLink activeClassName="active"
                                                             to={`${STRINGS.ROUTES.DASHBOARD.CHANGE_PASSWORD}`}>
                                                        <OverlayTrigger
                                                            placement="right"
                                                            delay={{show: 250, hide: 400}}
                                                            overlay={<Tooltip>Change Password</Tooltip>}>
                                                            <FontAwesomeIcon
                                                                icon={faLock} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                className="lnr lnr-lock"/>
                                                        </OverlayTrigger>
                                                        <span> Change Password </span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={`${STRINGS.ROUTES.DASHBOARD.LOG_OUT}`}
                                                             onClick={() => logout()}>
                                                        <OverlayTrigger
                                                            placement="right"
                                                            delay={{show: 250, hide: 400}}
                                                            overlay={<Tooltip>Logout</Tooltip>}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faSignOutAlt} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                className="lnr lnr-exit-up"/></OverlayTrigger>
                                                        <span> Logout </span> </NavLink>
                                                </li>
                                            </ul>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- End Popup Menu -->*/}
            </div>
        );
    }
}