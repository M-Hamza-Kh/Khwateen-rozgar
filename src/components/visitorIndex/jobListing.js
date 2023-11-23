import React, {Component} from "react";
import {dropDownSelection, STRINGS} from "../../utils/base";
import {NavLink} from "react-router-dom";
//import authorIcon from "../../content/images/author/author2.jpg";
import {Header} from "../header";
import {Footer} from "../footer";
import JobSearchedList from "./jobsItems/jobSearchedList";
import {MobileHeader} from "../mobile/header";
import {StartPopUpMenu} from "../startPopUpMenu";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faCheck,faTimes} from "@fortawesome/free-solid-svg-icons";
// import uploadedPlace from "../../content/images/employer/cover-image-employer-1.jpg";
// import $ from "jquery";
// import JobItem from "./jobsItems/jobItem";

export class Index extends Component {
    childDiv = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            lightHeader: `black-logo-version header-sticky sticky-black d-none d-lg-block`,
            showMenu: false,
            callBack: false,
            callBackData: "",
            filterJob: {
                title: "",
                city: "",
                type: "",
                Sortby: "",
                skills: "",
                industry: "",
                salaryRange: "",
                page: 1
            }
        }
        //console.log("jobs", this.props)
    }


    componentDidMount() {
        dropDownSelection();
        this.handleScroll();
        window.onresize = () => {
            if (window.innerWidth >= 1000) {
                this.setState({
                    showMenu: false
                })
            }
        }
    }

    handleOpenShowMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
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

    handleCallback = (callback) => {
        console.log("callback", callback);
        this.setState({
            callBack: true,
            callBackData: callback
        })
    }

    handleClear = () => {
        this.setState({
            callBack: false,
            callBackData: ""
        })
    }

    render() {
        let {
            lightHeader,
            filterJob,
            showMenu,
            callBack,
            callBackData,
        } = this.state;
        return (
            <div className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
                <Header onCallback={this.handleCallback} headerClass={lightHeader}
                        logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
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
                                        <li>Jobs Listing</li>
                                    </ul>
                                    <h4>Jobs Listing</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*// <!-- Breadcrumb Section Start -->*/}

                {/*// <!-- Job Listing Section Start Without Container [TWO_COLUMNS] -->*/}
                <div className="job-listing-section section bg_color--1 pb-30 pb-lg-30 pb-md-30 pb-sm-30 pb-xs-30">


                    <JobSearchedList clearCallBack={this.handleClear} callBack={callBack} callBackData={callBackData} filterJob={filterJob}/>

                </div>
                {/*// <!-- Job Listing Section Start -->*/}
                <Footer/>
            </div>
        );
    }
}