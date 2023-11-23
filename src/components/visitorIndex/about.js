import React, {Component} from "react";
//import bannerAboutUs from '../../content/images/about/bg-top-about-us.jpg';
// import brand2 from '../../content/images/about/image2.png';
import {NavLink} from "react-router-dom";
// import CountUp from "react-countup";
import {getUserData, isLogin, STRINGS} from "../../utils/base";
import {Header} from "../header";
import {Footer} from "../footer";
// import aboutUsVid from "../../content/files/Khawateen Rozgar Services  Empowering Women_1080p.mp4";
// import {AboutUsFeatured} from "./aboutUsFeatured";
import {MobileHeader} from "../mobile/header";
import {StartPopUpMenu} from "../startPopUpMenu";
import {API} from "../../utils/services";
import Spinner from "../spinner";
import UpdateAboutModal from "../dashboard/modals/updateAboutModal";

export class Index extends Component {
    childDiv = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            lightHeader: `black-logo-version header-sticky sticky-black d-none d-lg-block`,
            aboutContent: {},
            isResponse: false,
            openComposer: false
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
        this.getAboutContent()
    }

    handleScroll = () => {
        const {index, selected} = this.props
        if (index === selected) {
            setTimeout(() => {
                this.childDiv.current.scrollIntoView({behavior: 'smooth'})
            }, 500)
        }
    }


    getAboutContent = () => {
        API.CONTENT.getPageContent().then((res) => {
            console.log("aboutContent", res)
            if (res.status) {
                this.setState({
                    aboutContent: res.data.filter((pc) => pc.title === "About US")[0],
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

    render() {
        let {lightHeader, showMenu, aboutContent, isResponse, openComposer} = this.state;
        return (
            <div className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
                <Header headerClass={lightHeader} logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
                <MobileHeader openShowMenu={this.handleOpenShowMenu}/>

                <StartPopUpMenu closeShowMenu={this.handleOpenShowMenu}/>
                {/*// <!-- Page Banner Section Start -->*/}
                <div className="page-banner-section section" ref={this.childDiv}>
                    <div className="banner-image">
                        {/*https://youtu.be/2wkfWALnqzc*/}
                        {/*<img src={bannerAboutUs} alt=""/>*/}
                        <video autoPlay={true} loop={true} className="about-us-vid" style={{height:`100px`}}>
                            {/* <source src={aboutUsVid}/> */}
                        </video>
                    </div>
                </div>
                {/*// <!-- Page Banner Section End -->*/}


                <div className="breadcrumb-section section pt-40 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-breadcrumb-content">
                                    <ul hidden className="page-breadcrumb">
                                        <li><NavLink to="index.html">Home</NavLink></li>
                                        <li>About us</li>
                                    </ul>
                                    <h4>ABOUT KHAWATEEN ROZGAR SERVICES (KRS)</h4>
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
                                            <UpdateAboutModal data={aboutContent}
                                                              onSave={() => window.location.reload()}
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

                {isResponse ?
                    <iframe title='aboutContent' scrolling="no" className=""
                            src={"data:text/html," + encodeURIComponent(aboutContent.pageContent)}
                            style={{
                                border: "none",
                                outline: "none",
                                height: "100vh",
                                display: "flex",
                                width: "100%"
                            }}
                    />
                    :
                    <div className="spinner-holder">
                        <Spinner type={"Puff"}/>
                    </div>
                }

                {/*<div className="about-content-section section">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-lg-12">*/}
                {/*                <div className="about-content">*/}
                {/*                    /!*<p className="text-bold">KRS provides job opportunities to females. We are connection between the best matched female human resource and employers.</p>*!/*/}
                {/*                    <p className="text-bold">KRS is a platform that connects the best matched female*/}
                {/*                        human resource and employers across Pakistan.</p>*/}
                {/*                    /!*<p className="normal-text pb-0" style={{border:'none'}}>Khawateen Rozgar Services was formed in August 2018 in the city of Peshawar, Pakistan for the purpose of empowering women in Pakistan. Khawateen Rozgar Services is a Private Limited Company which works for the uplifting of stature of women and creates job opportunities by linking Khawateen with organizations and industries. An engaging platform is provided by the company for the empowerment of women and works to establish a strong connection between Women and the job market. The organizations/industries place their demand of female human resource to Khawateen Rozgar Services and the entity shortlists the best matched female human resource through a rigorous process of selection.</p>*!/*/}
                {/*                    <p className="normal-text pb-0" style={{border: 'none'}}>Khawateen Rozgar Services*/}
                {/*                        was formed in November 2018 for the purpose of empowering women across Pakistan.*/}
                {/*                        KRS works for the uplifting of stature of women and creates job opportunities by*/}
                {/*                        linking Khawateen with suitable employers. An engaging platform is provided by*/}
                {/*                        the company for the empowerment of women and works to establish a strong*/}
                {/*                        connection between Women and the job market.</p>*/}
                {/*                    /!*<p className="normal-text">KRS ensures safety by making personal visits to the employers who decide to avail our services. The environment is evaluated on some key points set by KRS. Based on the evaluation, KRS decides if they should provide their services to the employer or not.</p>*!/*/}
                {/*                    <p className="normal-text">The concept of KRS is in line with the SDG #5 which*/}
                {/*                        focuses on gender equality and empowering all women and girls, SDG#1: No*/}
                {/*                        poverty, SDG#8: Decent work and economic growth and SDG#10: Reduced*/}
                {/*                        Inequalities.</p>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-lg-12 mt-10">*/}
                {/*                <h4>Main Activities of KRS Include</h4>*/}
                {/*                <div className="about-content">*/}
                {/*                    <ul style={{listStyleType: "disc"}}>*/}
                {/*                        <li>Placement of females in organizations, industries, companies and*/}
                {/*                            enterprises*/}
                {/*                        </li>*/}
                {/*                        <li>Training and development of females</li>*/}
                {/*                        <li>Enhancing the financial independence of the females</li>*/}
                {/*                        <li>Women related research</li>*/}
                {/*                    </ul>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-12 mt-5">*/}
                {/*                <h4>Candidate Details</h4>*/}
                {/*                <div className="about-content">*/}
                {/*                    <ul>*/}
                {/*                        <li>The candidates we have are:</li>*/}
                {/*                    </ul>*/}
                {/*                    <ul style={{listStyleType: "disc"}}>*/}
                {/*                        <li>Matric up to PhD qualified</li>*/}
                {/*                        <li>Fresh candidates up to 20 years of experience</li>*/}
                {/*                        <li>Registrations from all over Pakistan</li>*/}
                {/*                    </ul>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-12 mt-5">*/}
                {/*                <h3>KRS has been Featured in:</h3>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-12 mt-5">*/}
                {/*                <AboutUsFeatured/>*/}
                {/*            </div>*/}
                {/*            <div className="col-lg-12"*/}
                {/*                 style={{display: "flex", justifyContent: "center", marginTop: "36px"}}>*/}
                {/*                <img alt="#" src={brand2}/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}


                {/*<div className="funfact-section section pt-110 pt-lg-90 pt-md-70 pt-sm-50 pt-xs-40 pb-85 pb-lg-65 pb-md-45 pb-sm-25 pb-xs-15">*/}
                {/*    <div className="container">*/}
                {/*        <div className="row row-five-column justify-content-lg-between">*/}

                {/*            <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">*/}
                {/*                /!*<!-- Single Funfact Start -->*!/*/}
                {/*                <div*/}
                {/*                    className="single-funfact funfact-style-two text-center justify-content-center width-100 mb-30">*/}
                {/*                    <div className="funfact-content">*/}
                {/*                        <span className="counter theme-color"><CountUp end={20003} duration={3}/></span>*/}
                {/*                        <span className="text">Total register users</span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                /!*<!-- Single Funfact End -->*!/*/}
                {/*            </div>*/}

                {/*            /!*<div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">*!/*/}
                {/*            /!*    /!*<!-- Single Funfact Start -->*!/*!/*/}
                {/*            /!*    <div*!/*/}
                {/*            /!*        className="single-funfact funfact-style-two text-center justify-content-center width-100 mb-30">*!/*/}
                {/*            /!*        <div className="funfact-content">*!/*/}
                {/*            /!*            <span className="counter theme-color"><CountUp end={11112} duration={3}/></span>*!/*/}
                {/*            /!*            <span className="text">Total Jobs</span>*!/*/}
                {/*            /!*        </div>*!/*/}
                {/*            /!*    </div>*!/*/}
                {/*            /!*    /!*<!-- Single Funfact End -->*!/*!/*/}
                {/*            /!*</div>*!/*/}

                {/*            <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">*/}
                {/*                /!*<!-- Single Funfact Start -->*!/*/}
                {/*                <div*/}
                {/*                    className="single-funfact funfact-style-two text-center justify-content-center width-100 mb-30">*/}
                {/*                    <div className="funfact-content">*/}
                {/*                        <span className="counter theme-color"><CountUp end={85} duration={3}/></span>*/}
                {/*                        <span className="text">Employers</span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                /!*<!-- Single Funfact End -->*!/*/}
                {/*            </div>*/}

                {/*            <div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">*/}
                {/*                /!*<!-- Single Funfact Start -->*!/*/}
                {/*                <div*/}
                {/*                    className="single-funfact funfact-style-two text-center justify-content-center width-100 mb-30">*/}
                {/*                    <div className="funfact-content">*/}
                {/*                        <span className="counter theme-color"><CountUp end={10562} duration={3}/></span>*/}
                {/*                        <span className="text">Job applications</span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                /!*<!-- Single Funfact End -->*!/*/}
                {/*            </div>*/}

                {/*            /!*<div className="col-xl-2 col-lg-2 col-md-4 col-sm-4">*!/*/}
                {/*            /!*    /!*<!-- Single Funfact Start -->*!/*!/*/}
                {/*            /!*    <div*!/*/}
                {/*            /!*        className="single-funfact funfact-style-two text-center justify-content-center width-100 mb-30">*!/*/}
                {/*            /!*        <div className="funfact-content">*!/*/}
                {/*            /!*            <span className="counter theme-color"><CountUp end={35} duration={3}/></span>*!/*/}
                {/*            /!*            <span className="text">Global Branchs</span>*!/*/}
                {/*            /!*        </div>*!/*/}
                {/*            /!*    </div>*!/*/}
                {/*            /!*    /!*<!-- Single Funfact End -->*!/*!/*/}
                {/*            /!*</div>*!/*/}

                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}


                <Footer/>
            </div>
        );
    }
}