import React, {Component} from "react";
//import bannerAboutUs from '../../content/images/about/bg-top-about-us.jpg';
//import {NavLink} from "react-router-dom";
//import CountUp from "react-countup";
import {getUserData, isLogin, STRINGS} from "../../utils/base";
import {Header} from "../header";
import {Footer} from "../footer";
import {MobileHeader} from "../mobile/header";
import {StartPopUpMenu} from "../startPopUpMenu";
import Spinner from "../spinner";
import {API} from "../../utils/services";
import UpdateAboutModal from "../dashboard/modals/updateAboutModal";

export class Index extends Component {
    childDiv = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            isResponse: false,
            openComposer: false,
            privacyPolicy: {},
            lightHeader: `black-logo-version header-sticky sticky-black d-none d-lg-block`
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
        this.getPrivacyContent()
    }

    getPrivacyContent = () => {
        API.CONTENT.getPageContent().then((res) => {
            console.log("aboutContent", res)
            if (res.status) {
                this.setState({
                    privacyPolicy: res.data.filter((pc)=> pc.title === "Privacy Policy")[0],
                    isResponse: true
                })
            } else {
                alert(res.status);
            }
        })
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

    render() {
        let {lightHeader,showMenu,privacyPolicy,isResponse,openComposer} = this.state;
        return (
            <div className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
                <Header headerClass={lightHeader} logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
                <MobileHeader openShowMenu={this.handleOpenShowMenu}/>
                <StartPopUpMenu closeShowMenu={this.handleOpenShowMenu}/>
                {/*// <!-- Page Banner Section Start -->*/}
                {/*<div className="page-banner-section section">*/}
                {/*    <div className="banner-image">*/}
                {/*        <img src={bannerAboutUs} alt=""/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*// <!-- Page Banner Section End -->*/}

                {/*// <!-- Breadcrumb Section Start -->*/}
                <div className="breadcrumb-section section pt-40 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40" ref={this.childDiv}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-breadcrumb-content justify-content-center width-100 d-flex flex-column align-items-center">
                                    {/*<ul hidden className="page-breadcrumb">*/}
                                    {/*    <li><NavLink to="index.html">Home</NavLink></li>*/}
                                    {/*    <li>About us</li>*/}
                                    {/*</ul>*/}
                                    <h4>PRIVACY POLICY</h4>
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
                                            <UpdateAboutModal data={privacyPolicy} onSave={() => window.location.reload()}
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
                {/* <!-- Breadcrumb Section Start -->*/}
                {/*<!-- About Content Section Start -->*/}
                <div className="about-content-section section">
                    {isResponse ?
                        <iframe title='aboutContent' className="iframeBody ov-des"
                                src={"data:text/html," + encodeURIComponent(privacyPolicy.pageContent)}
                                style={{border: "none", outline: "none",padding:"0 9%"}}/>
                        :
                        <div className="spinner-holder">
                            <Spinner type={"Puff"}/>
                        </div>
                    }
                    {/*<div className="container">*/}
                    {/*    <div className="row">*/}
                    {/*        <div className="col-lg-12 mt-10 mb-10">*/}
                    {/*            <div className="about-content">*/}
                    {/*                <ul style={{listStyleType: "disc"}}>*/}
                    {/*                    <li>KRS does not share the data with any third party for any kind of promotional purposes.</li>*/}
                    {/*                    <li>We use third party for sending you emails and for processing of payment when you purchase our services. These third parties cannot use your information for any promotional purposes.</li>*/}
                    {/*                    <li>A third party may be involved for portal maintenance purposes, however, this party cannot use your information for any promotional purposes.</li>*/}
                    {/*                    <li>The CV/resume is only shared with those employers whom you approach yourselves through our portal.</li>*/}
                    {/*                    <li>Your audio/video CV is only visible to those employers who you give permission to view your audio/video CV.</li>*/}
                    {/*                    <li>KRS will try its best to make the process safe and secure, however, in case of any unfavorable circumstances, KRS shall not be responsible.</li>*/}
                    {/*                    <li>When you submit your resume/CV, your info may be used by employers we do not have control on, in this case KRS shall not be responsible for the use made by third parties.</li>*/}
                    {/*                </ul>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                {/*/!*<!-- About Content Section End -->*!/*/}
                {/*<div className="breadcrumb-section section pt-40 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-12">*/}
                {/*                <div className="page-breadcrumb-content">*/}
                {/*                    /!*<ul hidden className="page-breadcrumb">*!/*/}
                {/*                    /!*    <li><NavLink to="index.html">Home</NavLink></li>*!/*/}
                {/*                    /!*    <li>About us</li>*!/*/}
                {/*                    /!*</ul>*!/*/}
                {/*                    <h4>REFUND POLICY</h4>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="about-content-section section">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-lg-12 mt-10 mb-10">*/}
                {/*                <div className="about-content">*/}
                {/*                    <ul style={{listStyleType: "disc"}}>*/}
                {/*                        <li>The refunds shall solely be on the discretion of KRS.</li>*/}
                {/*                        <li>If by any error, an excess of payment is given to KRS, then KRS would adjust the amount against future payments made by the client to KRS.</li>*/}
                {/*                       </ul>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <Footer/>
            </div>
        );
    }
}