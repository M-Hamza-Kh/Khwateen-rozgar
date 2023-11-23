import React, { Component } from 'react';
import { Header } from "../header";
import { getUserData, isLogin, STRINGS } from "../../utils/base";
import { NavLink } from "react-router-dom";
import { Footer } from "../footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import JazzCash from "../../utils/jazzCash";
import { MobileHeader } from "../mobile/header";
import { StartPopUpMenu } from "../startPopUpMenu";
import PaymentSelectionModal from "../dashboard/modals/paymentSelectionModal";
import jazzCashLogo from "../../content/images/JazzLogo.png";
import { API } from "../../utils/services";
import Spinner from "../spinner";

export default class Packages extends Component {
    export
    default
    Packages;

    constructor(props) {
        super(props);
        this.childDiv = React.createRef()
        this.state = {
            lightHeader: `black-logo-version header-sticky sticky-black d-none d-lg-block`,
            isPackagePage: window.location.pathname === STRINGS.ROUTES.DASHBOARD.COMPANY_PACKAGES,
            packageData: {
                package: 1,
                description: "",
                amount: 0,
                customerID: 0,
                customerEmail: 0,
                sponsor: false,
            },
            packages: [],
            responsePending: true,
            payClick: false,
            showMenu: false,
            openBankTransferModal: false,
            selectedPackage: STRINGS.DEFAULTS.guid,
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

        this.getAllPackages()
    }

    getAllPackages = () => {
        API.PACKAGES.getAllPackages().then((response) => {
            let { status, error, data } = response;
            console.log("getAllPackages", response);
            if (status) {
                this.setState({
                    packages: data,
                    responsePending: false
                })
            } else {
                alert(error)
            }

        })
    }

    handleOpenShowMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    // componentDidUpdate = () => this.handleScroll()

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.childDiv.current.scrollIntoView({ behavior: 'smooth' })
            }, 500)
        }
    }

    handlePayPackage = (data, index) => {
        console.log("package", data)
        console.log("package", index)
        let Amount = data.amount
        let sponsorJobsAmount = data.sponsorJobsAmount
        this.setState(prevState => {
            let packageData = prevState.packageData;
            packageData.id = `${data.id}`
            packageData.amount = parseInt(Amount += "00");
            packageData.customerEmail = getUserData().email;
            packageData.description = `${data.title} Purchase`;
            packageData.customerID = getUserData().id;
            if (packageData.sponsor) {
                packageData.amount += parseInt(sponsorJobsAmount += "00");
            } else {
                // packageData.amount -= parseInt(data.sponsorJobsAmount += "00");
                // packageData.package -= "_s"
            }
            //packageData.sponsor = 100000;
            console.log("package", packageData)
            return { packageData: packageData, payClick: true }
        })


        // if (packageType === 1) {
        //     this.setState(prevState => {
        //         let packageData = prevState.packageData;
        //         packageData.package = 1
        //         packageData.amount = 200000;
        //         packageData.customerEmail = getUserData().email;
        //         packageData.description = `${this.props.data.title} Purchase`;
        //         packageData.customerID = getUserData().id;
        //         if (packageData.sponsor1) {
        //             packageData.amount += 100000
        //         }
        //         //packageData.sponsor = 100000;
        //         return {packageData: packageData, payClick: true}
        //     })
        // } else if (packageType === 2) {
        //     this.setState(prevState => {
        //         let packageData = prevState.packageData;
        //         packageData.package = 2
        //         packageData.amount = 1500000;
        //         packageData.customerEmail = getUserData().email;
        //         packageData.customerID = getUserData().id;
        //         if (packageData.sponsor2) {
        //             packageData.amount += 1500000
        //         }
        //         //packageData.sponsor = 15000000;
        //         return {packageData: packageData, payClick: true}
        //     })
        // }
    }

    onClosePayClick = () => {
        this.setState(prevState => {
            let packageData = prevState.packageData;
            packageData.amount = 0;
            packageData.sponsor = false;

            return { packageData: packageData, payClick: false }
        })
    }

    render() {
        let { lightHeader, isPackagePage, packageData, payClick, showMenu, responsePending, packages, selectedPackage,openBankTransferModal } = this.state;
        let { hideHF } = this.props;
        return (

            <div ref={this.childDiv}

                className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""} ${hideHF && "col-md-10 col-lg-10"}`}>
              {/* //  className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}> */}
                {/* {hideHF === showMenu &&
                    <Header headerClass={lightHeader} logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN} />}
                <MobileHeader openShowMenu={this.handleOpenShowMenu} />

                <StartPopUpMenu closeShowMenu={this.handleOpenShowMenu} /> */}
                {/*// <!-- Breadcrumb Section Start -->*/}
                <div
                    className="breadcrumb-section section bg_color--5 pt-30 pt-sm-30 pt-xs-30 pb-30 pb-sm-30 pb-xs-30"
                >
                    <div className="container">
                        <div>
                            {
                          openBankTransferModal &&  <PaymentSelectionModal
                                onSave={() => window.location.reload()}
                                onClose={() => {
                                    this.setState({
                                        openBankTransferModal : false
                                    });
                                }} />
                            }
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="page-breadcrumb-content">
                                    <ul hidden className="page-breadcrumb">
                                        <li><NavLink to="index.html">Home</NavLink></li>
                                        <li>Packages</li>
                                    </ul>
                                    <h4>Packages</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*// <!-- Breadcrumb Section Start -->*/}

                {/*// <!-- Packages Section Start -->*/}


                {
                    !responsePending ? (
                        <div
                            className="pricing-plan-section section bg_color--5 pb-30 pb-lg-30 pb-md-30 pb-sm-30 pb-xs-30">
                            <div className="container pricing-wrapper">
                                <div
                                    className="row no-gutters align-items-end align-content-end justify-content-center">

                                    {
                                        packages.length > 0 &&
                                        packages.map((p, index) =>
                                            <div className="col-lg-3 col-md-6 col-sm-6">

                                                {/*// <!-- Single Pricing Start -->*/}
                                                <div className="pricing-wrap mb-30">
                                                    {
                                                        p.recommended && (
                                                            <span className="title-featured"> Recommended </span>)
                                                    }
                                                    <div
                                                        className={`single-pricing ${p.recommended && "recommended-pricing"}`}>
                                                        <div className="item-header">
                                                            <h2 className="title">{p.title}</h2>
                                                            {/*<span className="sub-title">For companies under 200</span>*/}
                                                        </div>
                                                        <div className="price-table-tag">
                                                            <div className="price-tag currency-placement-left">
                                                                <div className="pricing-price-amount">
                                                                    <span
                                                                        className="price-currency currency">PKR </span>
                                                                    <span className="price-amount">{p.amount} </span>
                                                                </div>
                                                            </div>
                                                            <span className="price-period">{p.duration} </span>
                                                        </div>
                                                        <div className="price-table-feature d-flex flex-column">
                                                            <ul className="list-box-feature">
                                                                {/*<li className="item-list-feature"><FontAwesomeIcon icon={faCheck} style={{color:`${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                                {/*    className="fa fa-check"/><span><b>200</b> Job Posting</span></li>*/}
                                                                {/*<li className="item-list-feature"><FontAwesomeIcon icon={faCheck} style={{color:`${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                                {/*    className="fa fa-check"/><span><b>50</b> Job Categories</span>*/}
                                                                {/*</li>*/}
                                                                <li className="item-list-feature"><FontAwesomeIcon
                                                                    icon={faCheck}
                                                                    style={{
                                                                        color: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                        margin: "0 5px"
                                                                    }}
                                                                    className="fa fa-check" /><span>{p.jobsAlloweded === -1 ? "Unlimited Job Posting" : `${p.jobsAlloweded} Job Posting`}</span>
                                                                </li>
                                                                <li className="item-list-feature"><FontAwesomeIcon
                                                                    icon={faCheck}
                                                                    style={{
                                                                        color: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                        margin: "0 5px"
                                                                    }}
                                                                    className="fa fa-check" /><span>View all CVs received</span>
                                                                </li>
                                                                {/* <li className="item-list-feature">
                                                                                                                   <input id="sponsor"
                                                                        type="checkbox"
                                                                        style={{ margin: "0 5px" }}
                                                                        className="checkbox"
                                                                        onChange={(ev) => this.setState(prevState => {
                                                                            const pack = prevState.packageData;
                                                                            pack.sponsor = !pack.sponsor;
                                                                            return {
                                                                                packageData: pack,
                                                                                selectedPackage: pack.sponsor ? p.id : STRINGS.DEFAULTS.guid,
                                                                                payClick: false
                                                                            }
                                                                        })
                                                                        }
                                                                        checked={selectedPackage === p.id}
                                                                    />
                                                                    <span>Sponsor all jobs for PKR {p.sponsorJobsAmount}</span>
                                                                </li> */}
                                                            </ul>
                                                        </div>
                                                        <div className="item_button">
                                                            {
                                                                !isPackagePage ?
                                                                    (<NavLink className="ht-btn transparent-btn-two"
                                                                        to={`${isLogin() && getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ? STRINGS.ROUTES.DASHBOARD.COMPANY_PACKAGES : STRINGS.ROUTES.AUTH.SIGN_UP}`}> Start
                                                                        Now </NavLink>) :
                                                                    <NavLink
                                                                        onClick={() => this.handlePayPackage(p, index)}
                                                                        className="ht-btn transparent-btn-two text-decoration-none"
                                                                        to="#"> Pay with JazzCash </NavLink>
                                                            }
                                                            {
                                                                <NavLink
                                                                style={{
                                                                    marginTop:'1px'
                                                                }}
                                                                    onClick={
                                                                        (e) => {
                                                                            // this.handleScheduleForInterview(STRINGS.TYPES.JOB_LIST_TYPE.SCHEDULE);
                                                                            this.setState({
                                                                                openBankTransferModal: true
                                                                            })
                                                                    }}
                                                                    className="ht-btn transparent-btn-two text-decoration-none btnBankTransfer"
                                                                    to="#"> Bank Transfer </NavLink>
                                                            }
                                                            {/*<NavLink className="ht-btn transparent-btn-two" to="#">Start Now </NavLink>*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*// <!-- Single Pricing End -->*/}
                                            </div>
                                        )

                                    }

                                    {/*<div className="col-lg-3 col-md-6 col-sm-6">*/}

                                    {/*    <div className="pricing-wrap mb-30">*/}
                                    {/*        <div className="single-pricing">*/}
                                    {/*            <div className="item-header">*/}
                                    {/*                <h2 className="title">Package 1</h2>*/}
                                    {/*                /!*<span className="sub-title">For companies under 100 </span>*!/*/}
                                    {/*            </div>*/}
                                    {/*            <div className="price-table-tag">*/}
                                    {/*                <div className="price-tag currency-placement-left">*/}
                                    {/*                    <div className="pricing-price-amount">*/}
                                    {/*                        <span className="price-currency currency">PKR </span>*/}
                                    {/*                        <span className="price-amount">2000 </span>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*                /!*<span className="price-period">monthly </span>*!/*/}
                                    {/*            </div>*/}
                                    {/*            <div className="price-table-feature d-flex flex-column">*/}
                                    {/*                <ul className="list-box-feature">*/}
                                    {/*                    <li className="item-list-feature">*/}
                                    {/*                        <FontAwesomeIcon icon={faCheck} style={{*/}
                                    {/*                            color: `${STRINGS.TYPES.COLORS.DEFAULT}`,*/}
                                    {/*                            margin: "0 5px"*/}
                                    {/*                        }} className="fa fa-check"/><span><b> 01</b> Job Posting</span>*/}
                                    {/*                    </li>*/}
                                    {/*                    /!*<li className="item-list-feature">*!/*/}
                                    {/*                    /!*    <FontAwesomeIcon icon={faCheck} style={{color:`${STRINGS.TYPES.COLORS.DEFAULT}`}}*!/*/}
                                    {/*                    /!*    className="fa fa-check"/><span><b> 20</b> Job Categories</span>*!/*/}
                                    {/*                    /!*</li>*!/*/}
                                    {/*                    <li className="item-list-feature">*/}
                                    {/*                        <FontAwesomeIcon icon={faCheck} style={{*/}
                                    {/*                            color: `${STRINGS.TYPES.COLORS.DEFAULT}`,*/}
                                    {/*                            margin: "0 5px"*/}
                                    {/*                        }} className="fa fa-check"/><span> View all CVs received</span>*/}
                                    {/*                    </li>*/}
                                    {/*                    <li className="item-list-feature">*/}
                                    {/*                        /!*<FontAwesomeIcon icon={faCheck} style={{*!/*/}
                                    {/*                        /!*    color: `${STRINGS.TYPES.COLORS.DEFAULT}`,*!/*/}
                                    {/*                        /!*    margin: "0 5px"*!/*/}
                                    {/*                        /!*}} className="fa fa-check"/>*!/*/}
                                    {/*                        <input id="sponsor1"*/}
                                    {/*                               type="checkbox"*/}
                                    {/*                               style={{margin: "0 5px"}}*/}
                                    {/*                               className="checkbox"*/}
                                    {/*                               onChange={() => this.setState(prevState => {*/}
                                    {/*                                   const pack = prevState.packageData;*/}
                                    {/*                                   pack.sponsor1 = !pack.sponsor1;*/}
                                    {/*                                   return {packageData: pack, payClick: false}*/}
                                    {/*                               })}*/}
                                    {/*                               checked={packageData.sponsor1}*/}
                                    {/*                        />*/}
                                    {/*                        <span>Sponsor Job for PKR 1000</span>*/}
                                    {/*                    </li>*/}
                                    {/*                </ul>*/}
                                    {/*            </div>*/}
                                    {/*            <div className="item_button">*/}
                                    {/*                {*/}
                                    {/*                    !isPackagePage ?*/}
                                    {/*                        (<NavLink className="ht-btn transparent-btn-two"*/}
                                    {/*                                  to={`${isLogin() && getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ? STRINGS.ROUTES.DASHBOARD.COMPANY_PACKAGES : STRINGS.ROUTES.AUTH.SIGN_UP}`}> Start*/}
                                    {/*                            Now </NavLink>) :*/}
                                    {/*                        <NavLink onClick={() => this.handlePayPackage(1)}*/}
                                    {/*                                 className="ht-btn transparent-btn-two text-decoration-none"*/}
                                    {/*                                 to="#"> Pay </NavLink>*/}
                                    {/*                }*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}

                                    {/*</div>*/}

                                    {/*<div className="col-lg-3 col-md-6 col-sm-6">*/}

                                    {/*    <div className="pricing-wrap mb-30">*/}
                                    {/*        <span className="title-featured"> Recommended </span>*/}
                                    {/*        <div className="single-pricing recommended-pricing">*/}
                                    {/*            <div className="item-header">*/}
                                    {/*                <h2 className="title">Package 2</h2>*/}
                                    {/*                /!*<span className="sub-title">For companies under 200</span>*!/*/}
                                    {/*            </div>*/}
                                    {/*            <div className="price-table-tag">*/}
                                    {/*                <div className="price-tag currency-placement-left">*/}
                                    {/*                    <div className="pricing-price-amount">*/}
                                    {/*                        <span className="price-currency currency">PKR </span>*/}
                                    {/*                        <span className="price-amount">15000 </span>*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*                <span className="price-period">Yearly </span>*/}
                                    {/*            </div>*/}
                                    {/*            <div className="price-table-feature d-flex flex-column">*/}
                                    {/*                <ul className="list-box-feature">*/}
                                    {/*                    /!*<li className="item-list-feature"><FontAwesomeIcon icon={faCheck} style={{color:`${STRINGS.TYPES.COLORS.DEFAULT}`}}*!/*/}
                                    {/*                    /!*    className="fa fa-check"/><span><b>200</b> Job Posting</span></li>*!/*/}
                                    {/*                    /!*<li className="item-list-feature"><FontAwesomeIcon icon={faCheck} style={{color:`${STRINGS.TYPES.COLORS.DEFAULT}`}}*!/*/}
                                    {/*                    /!*    className="fa fa-check"/><span><b>50</b> Job Categories</span>*!/*/}
                                    {/*                    /!*</li>*!/*/}
                                    {/*                    <li className="item-list-feature"><FontAwesomeIcon icon={faCheck}*/}
                                    {/*                                                                       style={{*/}
                                    {/*                                                                           color: `${STRINGS.TYPES.COLORS.DEFAULT}`,*/}
                                    {/*                                                                           margin: "0 5px"*/}
                                    {/*                                                                       }}*/}
                                    {/*                                                                       className="fa fa-check"/><span>Unlimited Job Posting</span>*/}
                                    {/*                    </li>*/}
                                    {/*                    <li className="item-list-feature"><FontAwesomeIcon icon={faCheck}*/}
                                    {/*                                                                       style={{*/}
                                    {/*                                                                           color: `${STRINGS.TYPES.COLORS.DEFAULT}`,*/}
                                    {/*                                                                           margin: "0 5px"*/}
                                    {/*                                                                       }}*/}
                                    {/*                                                                       className="fa fa-check"/><span>View all CVs received</span>*/}
                                    {/*                    </li>*/}
                                    {/*                    <li className="item-list-feature">*/}
                                    {/*                        /!*<FontAwesomeIcon icon={faCheck}*!/*/}
                                    {/*                        /!*                                               style={{*!/*/}
                                    {/*                        /!*                                                   color: `${STRINGS.TYPES.COLORS.DEFAULT}`,*!/*/}
                                    {/*                        /!*                                                   margin: "0 5px"*!/*/}
                                    {/*                        /!*                                               }}*!/*/}
                                    {/*                        /!*                                               className="fa fa-check"/>*!/*/}
                                    {/*                        <input id="sponsor2"*/}
                                    {/*                               type="checkbox"*/}
                                    {/*                               style={{margin: "0 5px"}}*/}
                                    {/*                               className="checkbox"*/}
                                    {/*                               onChange={(ev) => this.setState(prevState => {*/}
                                    {/*                                   const pack = prevState.packageData;*/}
                                    {/*                                   pack.sponsor2 = !pack.sponsor2;*/}
                                    {/*                                   return {packageData: pack, payClick: false}*/}
                                    {/*                               })*/}
                                    {/*                               }*/}
                                    {/*                               checked={packageData.sponsor2}*/}
                                    {/*                        />*/}
                                    {/*                        <span>Sponsor all jobs for PKR 15,000</span>*/}
                                    {/*                    </li>*/}
                                    {/*                </ul>*/}
                                    {/*            </div>*/}
                                    {/*            <div className="item_button">*/}
                                    {/*                {*/}
                                    {/*                    !isPackagePage ?*/}
                                    {/*                        (<NavLink className="ht-btn transparent-btn-two"*/}
                                    {/*                                  to={`${isLogin() && getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ? STRINGS.ROUTES.DASHBOARD.COMPANY_PACKAGES : STRINGS.ROUTES.AUTH.SIGN_UP}`}> Start*/}
                                    {/*                            Now </NavLink>) :*/}
                                    {/*                        <NavLink*/}
                                    {/*                            onClick={() => this.handlePayPackage(2)}*/}
                                    {/*                            className="ht-btn transparent-btn-two text-decoration-none"*/}
                                    {/*                            to="#"> Pay </NavLink>*/}
                                    {/*                }*/}
                                    {/*                /!*<NavLink className="ht-btn transparent-btn-two" to="#">Start Now </NavLink>*!/*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}

                                    {/*</div>*/}

                                    <div className="col-lg-3 col-md-6 col-sm-6">
                                        {/*// <!-- Single Pricing Start -->*/}
                                        <div className="pricing-wrap mb-30" >
                                            <div className="single-pricing">
                                                <div className="item-header">
                                                    <h2 className="title">Headhunting Services</h2>
                                                    {/*<span className="sub-title">For large companies & associations </span>*/}
                                                </div>
                                                {/*<div className="price-table-tag">*/}
                                                {/*    <div className="price-tag currency-placement-left">*/}
                                                {/*        <div className="pricing-price-amount">*/}
                                                {/*            <span className="price-currency currency">PKR </span>*/}
                                                {/*            <span className="price-amount">599 </span>*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*    <span className="price-period">monthly </span>*/}
                                                {/*</div>*/}
                                                <div className="price-table-feature d-flex flex-column" style={{marginLeft:`-15px`}}>
                                                    <ul className="list-box-feature">
                                                        {/*<li className="item-list-feature"><FontAwesomeIcon icon={faCheck} style={{color:`${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                        {/*    className="fa fa-check"/><span><b>Unlimited</b> Job Posting</span>*/}
                                                        {/*</li>*/}
                                                        {/*<li className="item-list-feature"><FontAwesomeIcon icon={faCheck} style={{color:`${STRINGS.TYPES.COLORS.DEFAULT}`}}*/}
                                                        {/*    className="fa fa-check"/><span><b>Unlimited</b> Job Categories</span>*/}
                                                        {/*</li>*/}
                                                        {/*<li className="item-list-feature"><FontAwesomeIcon icon={faCheck} style={{color:`${STRINGS.TYPES.COLORS.DEFAULT}`}} className="fa fa-check"/><span>View all CVs received</span>*/}
                                                        {/*</li>*/}
                                                        {/*<li className="item-list-feature"><FontAwesomeIcon icon={faCheck} style={{color:`${STRINGS.TYPES.COLORS.DEFAULT}`}} className="fa fa-check"/><span>Resume database access</span>*/}
                                                        {/*</li>*/}
                                                        <li className="item-list-feature"><FontAwesomeIcon
                                                            icon={faCheck}
                                                            style={{
                                                                color: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                                margin: "0 5px",
                                                                
                                                            }}
                                                            className="fa fa-check"/><span style={{fontSize:`12px`}}>Please contact info@khawateenrozgar.com</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="item_button">
                                                    {/*{*/}
                                                    {/*    !isPackagePage ?*/}
                                                    {/*        (<NavLink className="ht-btn transparent-btn-two"*/}
                                                    {/*                  to={`${isLogin() && getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ? STRINGS.ROUTES.DASHBOARD.COMPANY_PACKAGES : STRINGS.ROUTES.AUTH.SIGN_UP}`}> Start*/}
                                                    {/*            Now </NavLink>) :*/}
                                                    {/*        <NavLink*/}
                                                    {/*            className="ht-btn transparent-btn-two text-decoration-none"*/}
                                                    {/*            to="#"> Pay </NavLink>*/}
                                                    {/*}*/}
                                                    {/*<NavLink className="ht-btn transparent-btn-two" to="#">Start Now </NavLink>*/}
                                                </div>
                                            </div>
                                        </div>
                                        {/*// <!-- Single Pricing End -->*/}
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="d-flex w-100 justify-content-center flex-column align-items-center">
                                        <p>Payment Partner</p>
                                        <div className="d-flex mb-2">
                                            <img alt="#" style={{
                                                width: "200px",
                                                border: "2px solid #ffba01",
                                                borderRadius: "4px"
                                            }} src={jazzCashLogo} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                payClick &&
                                <JazzCash payClick data={packageData} onClose={() => this.onClosePayClick} />
                            }
                        </div>
                    ) : <div className="spinner-holder">
                        <Spinner type={"Puff"} />
                    </div>
                }
                {/*// <!-- Packages Section End -->*/}
                {hideHF === undefined && <Footer />}

            </div>
        );
    }
}