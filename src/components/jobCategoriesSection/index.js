import React, {Component} from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';
import Slider from 'react-slick';
import {
    CONTENT_URL,
    dropDownSelection,
    getSalaryRange,
    getUserData,
    isLogin,
    parseDate,
    parseDateWithoutTime,
    slickAutoSpeed,
    STRINGS
} from "../../utils/base";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from "@fortawesome/free-regular-svg-icons/faHeart";
import {faMapMarked} from "@fortawesome/free-solid-svg-icons";
import {faBriefcase} from "@fortawesome/free-solid-svg-icons/faBriefcase";
import {faClock} from "@fortawesome/free-regular-svg-icons/faClock";
import defaultCompanyImage from "../../content/images/portfolio/user_default.jpg";
import {API} from "../../utils/services";
import {Divider} from "@material-ui/core";


export class JobCategoriesSection extends Component {
    filter = {
        Sponsor: "Sponsor",
        Location: "City",
        Skills: "Skills"
    }

    constructor(props) {
        super(props);
        this.state = {
            jobSponsored: [],
            jobSkills: [],
            jobLocation: [],


        }
        this.getJobsByCriteria(this.filter.Sponsor);
        this.getJobsUniques()
    }

    nextArrow = () => {
        return (<button className="slick-next"><i className="lnr lnr-chevron-right"/></button>)
    }

    prevArrow = () => {
        return (<button className="slick-prev"><i className="lnr lnr-chevron-left"/></button>)
    }

    getJobsByCriteria = (type) => {
        if (type === this.filter.Sponsor) {
            API.JOBS.getJobByCriteria(type).then((response) => {
                //console.log("job", response)
                let {status, error, data} = response;
                if (status) {
                    this.setState({
                        jobSponsored: data,
                    })
                } else {
                    alert(error)
                }
            }).catch((err) => alert(err))
        }
    }

    getJobsUniques = () => {
        API.JOBS.getJobUniques().then((response) => {
            //console.log("jobUni", response)
            let {status, data: {uniqueSkills, uniqueCities}} = response;
            if (status) {
                this.setState({
                    jobSkills: uniqueSkills,
                    jobLocation: uniqueCities,
                })
            }
        }).catch((err) => {
            alert(err)
        })
    }


    render() {
        let settingsTabTwoItem = {
            infinite: true,
            arrows: true,
            dots: false,
            adaptiveHeight: true,
            slidesToShow: window.location.pathname === "/skills" ? 3 : 2,
            rows: window.location.pathname === "/skills" ? 3 : 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: slickAutoSpeed,
            // prevArrow: this.prevArrow,
            // nextArrow: this.nextArrow,
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
            ]
        }
        const {jobSponsored, jobSkills, jobLocation} = this.state;
         console.log("jobSkills", jobSponsored)
        // console.log("jobSkills", jobSkills)
        // console.log("jobSkills", jobSkills)
        return (
            <div className="job-categories-two section pb-10 pb-lg-70 pb-md-50 pb-sm-30 pb-xs-20">
                <div className="container st-border pt-40 pt-lg-90 pt-md-70 pt-sm-50 pt-xs-40">
                    <div className="row">
                        <div className="col-12">
                            <div className="categories-tab-menu mb-45 mb-sm-45 mb-xs-30">
                                <ul className="nav justify-content-center">
                                    <li className="mr-0"><NavLink activeClassName="active" className={`show `}
                                                                  data-toggle="tab"
                                                                  to={`${STRINGS.ROUTES.ROOT}`}
                                                                  onClick={() => this.getJobsByCriteria(this.filter.Sponsor)}
                                    >Latest
                                        Jobs</NavLink>
                                    </li>
                                    <Divider orientation="vertical" flexItem className="mr-4 ml-4 text-bold"
                                             style={{width: "2px", backgroundColor: "#c355a0"}}/>
                                    <li className="mr-0"><NavLink activeClassName="active" data-toggle="tab"
                                                                  onClick={() => this.getJobsByCriteria(this.filter.Skills)}
                                                                  to={`${STRINGS.ROUTES.JOBS.SKILLS}`}>Jobs by
                                        skills</NavLink></li>
                                    <Divider orientation="vertical" flexItem className="mr-4 ml-4 text-bold"
                                             style={{width: "2px", backgroundColor: "#c355a0"}}/>

                                    {/*<li><NavLink activeClassName="active" data-toggle="tab"*/}
                                    {/*             to={`${STRINGS.ROUTES.JOBS.ROLES}`}>Jobs by roles</NavLink></li>*/}
                                    <li className="mr-0"><NavLink
                                        onClick={() => this.getJobsByCriteria(this.filter.Location)}
                                        activeClassName="active" data-toggle="tab"
                                        to={`${STRINGS.ROUTES.JOBS.LOCATION}`}>Jobs by location</NavLink></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-4" hidden style={{borderLeft: '1px solid #e2e2e2'}}>
                            <div className="brand-title mb-45">
                                <p><span><strong>200+ companies</strong></span> are looking for employes on Khawateen
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="tab-content" style={{height: "inherit", overflow: "hidden"}}>

                                <Switch>
                                    <Route exact path={`${STRINGS.ROUTES.ROOT}`} render={() =>
                                        <div id="sponsors" className="tab-pane fade show active">
                                            <Slider {...settingsTabTwoItem} className="row tab-two-item-slider"
                                                    data-item-show="2" data-item-scroll="1">
                                                {
                                                    jobSponsored.length > 0 && (
                                                        jobSponsored.map((jp,index) =>
                                                            <div className="col-lg-12" key={index}>
                                                                <NavLink
                                                                    id={"LinkAnchor"}
                                                                    // to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${jp.title}&city=${jp.city}&type=${jp.type}&page=1`}
                                                                    to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${jp.title}&city=${jp.city}&type=${jp.type}&Sortby=&SalaryRange=&Skill=&industry=&page=1`}
                                                                    className="single-job mb-30">
                                                                    <div className="info-top">
                                                                        <div className="job-image">
                                                                            <div >
                                                                                <img
                                                                                    src={jp.pictureURL !== "" && jp.pictureURL !== null && jp.pictureURL !== undefined ? `${CONTENT_URL}/webapi${jp.pictureURL}` : defaultCompanyImage}
                                                                                    alt="logo"/>
                                                                            </div>
                                                                        </div>
                                                                        <div className="job-info">
                                                                            <div className="job-info-inner">
                                                                                <div className="job-info-top">
                                                                                    <div className="saveJob for-listing">
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
                                                                                            <div
                                                                                               // to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${jp.title}&city=${jp.city}&type=${jp.type}&Sortby=&SalaryRange=&Skill=&industry=&page=1`}
                                                                                            >{jp.title}</div>
                                                                                        </h3>
                                                                                        <div className="employer-name">
                                                                                            {/*<div*/}
                                                                                            {/*    //to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${jp.title}&city=${jp.city}&type=${jp.type}&Sortby=&SalaryRange=&Skill=&industry=&page=1`}*/}
                                                                                            {/*>{jp.company}</div>*/}
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
                                                                                        <div
                                                                                            id={"LinkAnchor"}
                                                                                            //to={`${STRINGS.ROUTES.JOBS.LISTING}?title=${jp.title}&city=${jp.city}&type=${jp.type}&Sortby=&SalaryRange=&Skill=&industry=&page=1`}
                                                                                        >{jp.city}</div>
                                                                                    </div>
                                                                                    <div className="job-type">
                                                                                        <FontAwesomeIcon
                                                                                            icon={faBriefcase}
                                                                                            className="lnr lnr-briefcase"/>
                                                                                            <div
                                                                                        className="def-color"
                                                                                        //to="#"
                                                                                    >{jp.type}</div>
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
                                    <Route exact path={`${STRINGS.ROUTES.JOBS.SKILLS}`} render={() =>
                                        <div id="skills" className="tab-pane fade active">
                                            {
                                                jobSkills.length > 0 &&
                                                <Slider {...settingsTabTwoItem} className="row tab-three-item-slider">
                                                    {
                                                        jobSkills.map((js) =>
                                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                                <NavLink
                                                                    to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=&type=&Sortby=&SalaryRange=&Skill=${js}&industry=&page=1`}
                                                                    className="single-job-categories-two mb-30">
                                                                    <div className="item-info">
                                                                        <div className="img-icon">
                                                                            {/*<img*/}
                                                                            {/*    src={angularPng}*/}
                                                                            {/*    alt=""/>*/}
                                                                        </div>
                                                                        <h4 className="title"><NavLink
                                                                            to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=&type=&Sortby=&SalaryRange=&Skill=${js}&industry=&page=1`}
                                                                        >
                                                                            {js}</NavLink></h4>
                                                                    </div>
                                                                    {/*<span className="count-job">3 Jobs</span>*/}
                                                                </NavLink>
                                                            </div>
                                                        )
                                                    }
                                                </Slider>
                                            }
                                        </div>
                                    }/>
                                    {/*<Route exact path={`${STRINGS.ROUTES.JOBS.ROLES}`} render={() =>*/}
                                    {/*    <div id="roles" className="tab-pane fade active">*/}
                                    {/*        <Slider {...settingsTabTwoItem} className="row tab-three-item-slider">*/}
                                    {/*            {*/}
                                    {/*                jobLocation.map((jl)=>*/}
                                    {/*                    <div className="col-lg-12 col-md-12 col-sm-12">*/}
                                    {/*                        /!*<!-- Single Job Categories Two Start -->*!/*/}
                                    {/*                        <div className="single-job-categories-two mb-30">*/}
                                    {/*                            <div className="item-info">*/}
                                    {/*                                <h4 className="title"><NavLink to="#">Professional</NavLink>*/}
                                    {/*                                </h4>*/}
                                    {/*                            </div>*/}
                                    {/*                        </div>*/}
                                    {/*                        /!*<!-- Single Job Categories Two End -->*!/*/}
                                    {/*                        /!*<!-- Single Job Categories Two Start -->*!/*/}
                                    {/*                        <div className="single-job-categories-two mb-30">*/}
                                    {/*                            <div className="item-info">*/}
                                    {/*                                <h4 className="title"><NavLink to="#">Senior</NavLink></h4>*/}
                                    {/*                            </div>*/}
                                    {/*                        </div>*/}
                                    {/*                        /!*<!-- Single Job Categories Two End -->*!/*/}
                                    {/*                    </div>*/}
                                    {/*                )*/}
                                    {/*            }*/}
                                    {/*        </Slider>*/}
                                    {/*    </div>*/}
                                    {/*}/>*/}
                                    <Route exact path={`${STRINGS.ROUTES.JOBS.LOCATION}`} render={() =>
                                        <div id="loca" className="tab-pane fade active">
                                            <Slider {...settingsTabTwoItem} className="row tab-three-item-slider">
                                                {
                                                    isLogin() && getUserData().type === STRINGS.USER_TYPE.APPLICANT_TYPE || getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE ?
                                                        getUserData().allowedCities.length > 0 && (
                                                            getUserData().allowedCities.map((jl) =>
                                                                <div className="col-lg-12 col-md-12 col-sm-12">
                                                                    <NavLink
                                                                        to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=${jl}&type=&Sortby=&SalaryRange=&Skill=&industry=&page=1`}
                                                                        className="single-job-categories-two mb-30">
                                                                        <div className="item-info">
                                                                            <h4 className="title"><NavLink
                                                                                to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=${jl}&type=&Sortby=&SalaryRange=&Skill=&industry=&page=1`}
                                                                            >{jl}</NavLink></h4>
                                                                        </div>
                                                                    </NavLink>

                                                                </div>
                                                            )
                                                        )
                                                        :
                                                    jobLocation.length && (
                                                        jobLocation.map((jl) =>
                                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                                {/*<!-- Single Job Categories Two Start -->*/}
                                                                <NavLink
                                                                    // to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=${jl}&type=&page=1`}
                                                                    to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=${jl}&type=&Sortby=&SalaryRange=&Skill=&industry=&page=1`}
                                                                    className="single-job-categories-two mb-30">
                                                                    <div className="item-info">
                                                                        <h4 className="title"><NavLink
                                                                            to={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=${jl}&type=&Sortby=&SalaryRange=&Skill=&industry=&page=1`}
                                                                        >{jl}</NavLink></h4>
                                                                    </div>
                                                                </NavLink>
                                                                {/*<!-- Single Job Categories Two End -->*/}
                                                                {/*<!-- Single Job Categories Two Start -->*/}
                                                                {/*<div className="single-job-categories-two mb-30">*/}
                                                                {/*    <div className="item-info">*/}
                                                                {/*        <h4 className="title"><NavLink*/}
                                                                {/*            to="#">Lahore</NavLink></h4>*/}
                                                                {/*    </div>*/}
                                                                {/*</div>*/}
                                                                {/*<!-- Single Job Categories Two End -->*/}
                                                                {/*<!-- Single Job Categories Two Start -->*/}
                                                                {/*<div className="single-job-categories-two mb-30">*/}
                                                                {/*    <div className="item-info">*/}
                                                                {/*        <h4 className="title"><NavLink*/}
                                                                {/*            to="#">Bahawalpur</NavLink>*/}
                                                                {/*        </h4>*/}
                                                                {/*    </div>*/}
                                                                {/*</div>*/}
                                                                {/*<!-- Single Job Categories Two End -->*/}
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


                </div>
            </div>
        );
    }
}