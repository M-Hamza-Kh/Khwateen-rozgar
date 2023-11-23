import React, {Component} from "react";
import bannerAboutUs from '../../content/images/about/bg-top-about-us.jpg';
import {NavLink} from "react-router-dom";
import {STRINGS} from "../../utils/base";
import {Header} from "../header";
import {Footer} from "../footer";
// import aboutUsVid from "../../content/files/Khawateen Rozgar Services  Empowering Women_1080p.mp4";
import {MobileHeader} from "../mobile/header";
import {StartPopUpMenu} from "../startPopUpMenu";
import {API} from "../../utils/services";
import Spinner from "../spinner";
import {ProfileUpdated} from "../dashboard/profileUpdated";

export class Index extends Component {
    childDiv = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            isResponse: false,
            com: {},
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
        };
        const id = this.props.match.params.id
        this.getCompanyDetails(id)
    }

    getCompanyDetails = (id) => {
        API.USER.getCompany(id).then((res) => {
            if (res.status) {
                this.setState({
                    isResponse: true,
                    com: res.data
                })
            } else {
                alert(res.error)
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

    handleOpenShowMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    render() {
        let {lightHeader, showMenu, com, isResponse} = this.state;
        return (
            <div className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
                <Header headerClass={lightHeader} logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
                <MobileHeader openShowMenu={this.handleOpenShowMenu}/>

                <StartPopUpMenu closeShowMenu={this.handleOpenShowMenu}/>
                {/*// <!-- Page Banner Section Start -->*/}
                <div className="page-banner-section section" ref={this.childDiv}>
                    <div className="banner-image">
                        {/*https://youtu.be/2wkfWALnqzc*/}
                        <img src={bannerAboutUs} alt=""/>
                        {/*<video autoPlay={true} loop={true} className="about-us-vid">*/}
                        {/*    <source src={aboutUsVid}/>*/}
                        {/*</video>*/}
                    </div>
                </div>
                {/*// <!-- Page Banner Section End -->*/}

                {/*// <!-- Breadcrumb Section Start -->*/}
                <div className="breadcrumb-section section pt-40 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-breadcrumb-content">
                                    <ul hidden className="page-breadcrumb">
                                        <li><NavLink to="index.html">Home</NavLink></li>
                                        <li>Company</li>
                                    </ul>
                                    <h4>Details About : {com.company}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Breadcrumb Section Start -->*/}
                {/*<!-- About Content Section Start -->*/}
                <div className="about-content-section section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="d-flex w-100 justify-content-center">
                                    {
                                        isResponse ?
                                            <ProfileUpdated userData={com} isCompany={com.type === STRINGS.USER_TYPE.COMPANY_TYPE} />
                                            :
                                            <div className="spinner-holder">
                                                <Spinner height={100} width={100} type={"Puff"}/>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}