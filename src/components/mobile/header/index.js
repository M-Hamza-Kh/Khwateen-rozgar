import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {STRINGS} from "../../../utils/base";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from "@fortawesome/free-solid-svg-icons";
import logo_mobile from "../../../content/images/logo-mobile.png"

export class MobileHeader extends Component {
    render() {
        return (
            <header className="header-mobile bg_color--2 d-block d-lg-none">
                <div className="header-bottom menu-right">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="header-mobile-navigation d-block d-lg-none">
                                    <div className="row align-items-center">
                                        <div className="col-3 col-md-3" onClick={() => this.props.openShowMenu()}>
                                            <div className="mobile-navigation text-right">
                                                <div className="header-icon-wrapper">
                                                    <ul className="icon-list justify-content-start">
                                                        <li className="popup-mobile-click" >
                                                            <NavLink to={"#"}>
                                                                <FontAwesomeIcon icon={faBars} style={{
                                                                    backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`
                                                                }} className="lnr lnr-menu" />
                                                            </NavLink>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-6 col-md-6">
                                            <div className="header-logo text-center">
                                                <NavLink to={STRINGS.ROUTES.ROOT}>
                                                    <img src={logo_mobile} className="img-fluid" alt=""/>
                                                </NavLink>
                                            </div>
                                        </div>
                                        <div className="col-3 col-md-3">
                                            <div className="mobile-navigation text-right">
                                                <div className="header-icon-wrapper">
                                                    <ul className="icon-list justify-content-end">
                                                        <li>
                                                            <div className="header-cart-icon">
                                                                <NavLink to="#" className="header-search-toggle"><i
                                                                    className="lnr lnr-magnifier"/></NavLink>
                                                            </div>
                                                            <div className="header-search-form">
                                                                <form action="#">
                                                                    <input type="text"
                                                                           placeholder="Type and hit enter"/>
                                                                    <button><i className="lnr lnr-magnifier"/>
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </header>
        );
    }
}