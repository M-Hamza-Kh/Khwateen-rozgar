import React, {Component} from "react";
import {NavLink, Route, Switch} from "react-router-dom";
import Slider from "react-slick";
import {CONTENT_URL, getSalaryRange, parseDate, parseDateWithoutTime, slickAutoSpeed, STRINGS} from "../../utils/base";
// import logo1 from '../../content/images/companies_logo/logo-big/logo1.jpg';
// import logo2 from '../../content/images/companies_logo/logo-big/logo2.jpg';
// import logo3 from '../../content/images/companies_logo/logo-big/logo3.jpg';
// import logo4 from '../../content/images/companies_logo/logo-big/logo4.jpg';
// import logo5 from '../../content/images/companies_logo/logo-big/logo5.jpg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faMapMarked} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import defaultCompanyImage from "../../content/images/portfolio/user_default.jpg";
import {faBriefcase} from "@fortawesome/free-solid-svg-icons/faBriefcase";
import {API} from "../../utils/services";

export class JobSectionStart extends Component {
    filter = {
        Sponsor: "Sponsor",
        Location: "City",
        Skills: "Skills"
    }

    constructor(props) {
        super(props);
        this.state = {
            jobTypes: [],
            jobValues: [],
            route: "Full Time",
            titleTextClass: {
                whiteSpace: "nowrap",
                width: "15rem",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }

        }
        this.getJobsByCriteria(this.filter.Sponsor, "Full Time");
        this.getJobsUniques()
    }

    getJobsByCriteria = (type, value) => {
        API.JOBS.getJobByCriteria(type, value).then((response) => {
            let {status, error, data} = response;
            if (status) {
                this.setState({
                    jobTypes: data,
                    route: value
                })
            } else {
                alert(error)
            }
        }).catch((err) => alert(err))
    }

    getJobsUniques = () => {
        API.JOBS.getJobUniques().then((response) => {
            let {status, data: {uniqueTypes}} = response;
            if (status) {
                this.setState({
                    jobValues: uniqueTypes
                })
            }
        }).catch((err) => {
            alert(err)
        })
    }

    render() {
        let settingsThreeDotSlider = {
            infinite: true,
            arrows: false,
            dots: true,
            adaptiveHeight: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: slickAutoSpeed,
            // prevArrow: '<button class="slick-prev"><FontAwesomeIcon icon={lnrChevronLeft}/></button>',
            // nextArrow: '<button class="slick-next"><i class="lnr lnr-chevron-right"/></button>',
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ],

        }
        const {jobTypes, jobValues, titleTextClass} = this.state;
       // console.log("", jobValues)
        return (
            <div
                className="job-section section bg-image-proparty bg_image--2 pt-40 pt-lg-40 pt-md-75 pt-sm-55 pt-xs-45 pb-40 pb-lg-40 pb-md-80 pb-sm-60 pb-xs-50">
                <div className="nocontainer">
                    <div className="norow pt-5 pb-5">
                        <div className="col-lg-12">
                            <div className="section-title-center mb-15">
                                <div className="section-title text-center">
                                    <h3 className="title">Job You Will Love</h3>
                                </div>
                            </div>
                            <div className="section-title-center mb-15">
                                <div className="jetapo-tab-menu">
                                    <ul className="nav">
                                        {
                                            jobValues.length > 0 && (
                                                jobValues.map((jv) =>
                                                    <li><NavLink
                                                        activeClassName="active"
                                                        className="show"
                                                        data-toggle="tab"
                                                        to={`${STRINGS.ROUTES.ROOT}`}
                                                        onClick={() => this.getJobsByCriteria(this.filter.Sponsor, jv)}
                                                    > {jv}</NavLink>
                                                    </li>
                                                )
                                            )
                                        }
                                        {/*<li><NavLink activeClassName="active" data-toggle="tab"*/}
                                        {/*             to={STRINGS.ROUTES.JOBS.PART_TIME}> Part Time </NavLink></li>*/}
                                        {/*<li><NavLink activeClassName="active" data-toggle="tab"*/}
                                        {/*             to={STRINGS.ROUTES.JOBS.HOME_BASED}> Freelance / Home -*/}
                                        {/*    Based </NavLink></li>*/}
                                        {/*<li><NavLink activeClassName="active" data-toggle="tab"*/}
                                        {/*             to={STRINGS.ROUTES.JOBS.TUTOR}> Tutor </NavLink></li>*/}
                                        {/*<li><NavLink activeClassName="active" data-toggle="tab"*/}
                                        {/*             to={STRINGS.ROUTES.JOBS.INTERNSHIP}> Internship </NavLink></li>*/}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="norow pt-5 pb-5">
                        <div className="col-12">
                            <div className="tab-content" style={{height: "inherit", overflow: "hidden"}}>
                                <Switch>
                                    <Route exact path={`${STRINGS.ROUTES.ROOT}`} render={() =>
                                        <div id="fullTime" className="tab-pane fade show active">
                                            <Slider {...settingsThreeDotSlider}
                                                    className="row tab-three-item-dotslider">

                                                {
                                                    jobTypes.length > 0 && (
                                                        jobTypes.map((jp,index) =>
                                                            <div className="col-lg-12" key={index}>
                                                                <NavLink
                                                                    to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${jp.title}&city=${jp.city}&type=${jp.type}&page=1`}
                                                                    className="single-job mb-30">
                                                                    <div className="info-top">
                                                                        <div className="job-image">
                                                                            <NavLink to="#">
                                                                                <img
                                                                                    src={jp.pictureURL !== "" && jp.pictureURL !== null && jp.pictureURL !== undefined ? `${CONTENT_URL}/webapi${jp.pictureURL}` : defaultCompanyImage}
                                                                                    alt="logo"/>
                                                                            </NavLink>
                                                                        </div>
                                                                        <div className="job-info">
                                                                            <div className="job-info-inner">
                                                                                <div className="job-info-top">
                                                                                    <div
                                                                                        className="saveJob for-listing">
                                                                                        {
                                                                                            jp.isSponsored && (
                                                                                                <span
                                                                                                    className="featured-label">Sponsor</span>
                                                                                            )
                                                                                        }
                                                                                        <div className="save-job ml-20"
                                                                                             data-toggle="modal">
                                                                                            {/*<FontAwesomeIcon*/}
                                                                                            {/*    icon={faHeart}*/}
                                                                                            {/*    className="far fa-heart"/>*/}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="title-name">
                                                                                        <h3 className="job-title">
                                                                                            <NavLink
                                                                                                style={titleTextClass}
                                                                                                to="#">{jp.title}</NavLink>
                                                                                        </h3>
                                                                                        <div className="employer-name">
                                                                                            {
                                                                                                jp.showCompanyInfo && (
                                                                                                    <NavLink to={`${STRINGS.ROUTES.COMPANY_DETAIL}/${jp.companyID}`}>{jp.company}</NavLink>
                                                                                                )
                                                                                            }
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <span
                                                                                    className="job-salary">PKR {getSalaryRange(jp.salaryRange)}</span>
                                                                                {/*<span className="job-salary">PKR{jp.salaryRangeFrom} - PKR{jp.salaryRangeTo}</span>*/}
                                                                                <div className="job-meta">
                                                                                    <div className="job-location">
                                                                                        {/*<i className="lnr lnr-map-marker"></i>*/}
                                                                                        <FontAwesomeIcon
                                                                                            icon={faMapMarked}/>
                                                                                        <NavLink
                                                                                            to="#">{jp.city}</NavLink>
                                                                                    </div>
                                                                                    <div className="job-type">
                                                                                        <FontAwesomeIcon
                                                                                            icon={faBriefcase}
                                                                                            className="lnr lnr-briefcase"/><NavLink
                                                                                        className="def-color"
                                                                                        to="#">{jp.type}</NavLink>
                                                                                    </div>
                                                                                    <div className="job-date">
                                                                                        <FontAwesomeIcon icon={faClock}
                                                                                                         className="lnr lnr-clock"/>
                                                                                        {parseDateWithoutTime(parseDate(new Date(jp.jobPostDate)))}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </NavLink>
                                                            </div>
                                                        )
                                                    )
                                                }

                                            </Slider>
                                        </div>
                                    }/>
                                </Switch>


                            </div>
                        </div>
                    </div>
                    <div className="norow pt-15 pb-5">
                        <div className="col-12">
                            <div className="all-link-button text-center mt-15">
                                <NavLink className="ht-btn lg-btn"
                                         to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=&type=&page=1`}>Browse All
                                    Featured Jobs</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}