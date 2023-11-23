import React, {Component} from "react";
//import bannerAboutUs from '../../content/images/about/bg-top-about-us.jpg';
//import {NavLink} from "react-router-dom";
//import CountUp from "react-countup";
import {getUserData, isLogin, STRINGS} from "../../utils/base";
import {Header} from "../header";
import {Footer} from "../footer";
import {MobileHeader} from "../mobile/header";
import {StartPopUpMenu} from "../startPopUpMenu";
import UpdateAboutModal from "../dashboard/modals/updateAboutModal";
import {API} from "../../utils/services";
import Spinner from "../spinner";

export class Index extends Component {
    constructor(props) {
        super(props);
        this.childDiv = React.createRef();
        this.state = {
            showMenu: false,
            isResponse: false,
            openComposer: false,
            tAndCContent:{},
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
        this.getConditionContent()
    }

    getConditionContent = () => {
        API.CONTENT.getPageContent().then((res) => {
            console.log("aboutContent", res)
            if (res.status) {
                this.setState({
                    tAndCContent: res.data.filter((pc)=> pc.title === "Terms And Conditions")[0],
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

    //componentDidUpdate = () => this.handleScroll()

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.childDiv.current.scrollIntoView({ behavior: 'smooth' })
            }, 500)
        }
    }

    render() {
        let {lightHeader,showMenu,openComposer,tAndCContent,isResponse} = this.state;
        return (
            <div className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
                <Header headerClass={lightHeader} logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN} />
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
                                    <h4>TERMS AND CONDITIONS</h4>
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
                                            <UpdateAboutModal data={tAndCContent} onSave={() => window.location.reload()}
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

                <div className="about-content-section section">

                    {isResponse ?
                        <iframe title='aboutContent' className="iframeBody ov-des"
                                src={"data:text/html," + encodeURIComponent(tAndCContent.pageContent)}
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
                    {/*                    <li>Candidates may at any time consult KRS for career counselling & job related issues on official email ID of KRS.</li>*/}
                    {/*                    <li>Final interview/selection is always at the employers’ end.</li>*/}
                    {/*                    <li>The candidate, if not interested to join the organization after selection must immediately report to organization.</li>*/}
                    {/*                    <li>The candidate, in case of any issues must report to Khawateen rozgar services whether in service or before or after selection.</li>*/}
                    {/*                    <li>The candidate can give feedback to KRS regarding organization at any time for the betterment. The feedback can be positive or negative, even regarding interview process.</li>*/}
                    {/*                    <li>The candidate, if wants to reschedule the interview shall immediately contact the employer.</li>*/}
                    {/*                    <li>Please make sure you are confident, have all relevant information regarding organisation (please search for it) and are well presentable at the interview.</li>*/}
                    {/*                    <li>If the candidate faces any harassment issues or any other unacceptable behavior from the employer’s side should immediately report to Khawateen Rozgar Services.</li>*/}
                    {/*                    <li>Please be on time for the interview i.e. if your is scheduled at 10:00AM it means 10:00AM Sharp, not 10:30AM.</li>*/}
                    {/*                    <li>Please take your updated CV along at the interview.</li>*/}
                    {/*                    <li>KRS is not liable for any damage, failure, loss, and delays of the platform usage that is beyond the control of KRS.</li>*/}
                    {/*                    <li>Candidates should go through YouTube channel of KRS for further guidance regarding interviews.</li>*/}
                    {/*                </ul>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>


                {/*<div className="breadcrumb-section section pt-40 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-12">*/}
                {/*                <div className="page-breadcrumb-content justify-content-center width-100" style={{display:"flex"}}>*/}
                {/*                    /!*<ul hidden className="page-breadcrumb">*!/*/}
                {/*                    /!*    <li><NavLink to="index.html">Home</NavLink></li>*!/*/}
                {/*                    /!*    <li>About us</li>*!/*/}
                {/*                    /!*</ul>*!/*/}
                {/*                    <h4>TERMS AND CONDITIONS - EMPLOYERS</h4>*/}
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
                {/*                        <li>In case any negotiation with the candidate is required, then the organization/employer can at anytime consult KRS.</li>*/}
                {/*                        <li>Employer can at any time consult KRS on its official email ID or phone number for guidance regarding job salary or other related matters.</li>*/}
                {/*                        <li>Employer shall ensure that information given to KRS is legit and there is no fake or false information given to KRS.</li>*/}
                {/*                        <li>KRS may take feedback from the Khawateen working in the organization for evaluation purposes.</li>*/}
                {/*                        <li>Organization shall ensure the safety of female candidate in the workplace in the best possible manner.</li>*/}
                {/*                        <li>Employer’s should avoid keeping original documents of candidates for security purposes.</li>*/}
                {/*                        <li>Any harassment case from employer’s side reported to KRS by any female candidate shall be taken seriously.</li>*/}
                {/*                        <li>Employers are encouraged to give employment contract to the employee along with the HR Policy on the first day of employment.</li>*/}
                {/*                        <li>KRS takes its service charges, not the job placement charges.</li>*/}
                {/*                        <li>KRS reserves the right to accept/reject a job posting.</li>*/}
                {/*                        <li>Any claims regarding viruses, worms, OS glitches, lags in software or other forces of internet shall not be entertained by KRS.</li>*/}
                {/*                        <li>KRS is not liable for any damage, failure, loss, and delays of the platform usage that is beyond the control of KRS.</li>*/}
                {/*                    </ul>*/}
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