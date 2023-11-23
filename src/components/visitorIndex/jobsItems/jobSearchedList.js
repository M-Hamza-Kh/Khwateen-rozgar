import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {
    dropDownSelection,
    getSalaryRange, getUserData,
    isLogin,
    parseDate,
    parseDateWithoutTime,
    STRINGS
} from "../../../utils/base";
import JobItem from "./jobItem";
import {API} from "../../../utils/services";
import Spinner from "../../spinner";
import $ from "jquery";
import {IconButton} from "@material-ui/core";
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import history from "../../../@history";

class JobSearchedList extends Component {

    title = React.createRef();
    scrollTop = React.createRef();
    filterJob = {
        title: "",
        city: "",
        type: "",
        Sortby: "",
        skills: "",
        industry: "",
        salaryRange: 1,
        page: 1
    }
    JOB_SEARCH = new URL(window.location.href).pathname;

    constructor(props) {
        super(props);
        this.state = {
            openJobDetails: false,
            jobAlert: true,
            isResponse: false,
            showFilter: true,
            filteredJobs: [],
            getCities: [],
            getJobTypes: [],
            getJobSkills: [],
            getJobIndustries: [],
            db: props.db !== undefined && props.db,
            filterJob: {
                title: "",
                city: "",
                type: "",
                Sortby: "",
                skills: "",
                industry: "",
                salaryRange: 0,
                page: 1
            }
        }
        //{`${this.JOB_SEARCH}?title=&city=&type=&Sortby=Title&page`}
        $(document).ready(() => {
            $("#sortBy").on("change", (e) => {
                //window.location.href = `${this.JOB_SEARCH}?title=&city=&type=&Sortby=${$("#sortBy").val()}&page=1`;
                history.push(`${this.JOB_SEARCH}?title=&city=&type=&Sortby=${$("#sortBy").val()}&page=1`);
                this.filterJob.Sortby = $("#sortBy").val();
                this.getAllJobs(this.filterJob);
                e.preventDefault();
                e.stopPropagation();
            })
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.callBack !== prevProps.callBack){
            if(this.props.callBack){
                this.getJobSearchByHeader(this.props.callBackData);
            }
        }
    }

    componentDidMount() {
        this.scrollTop.current.scrollTo(0, 0)
        const jobTitle = new URL(window.location.href).searchParams.get("title");
        //console.log("jobId", jobTitle)
        if (jobTitle !== null) {
            this.getJobSearchParams();
        } else {
            this.getCurrentJobId();
        }
        $(document).ready(()=>{
            if(window.innerWidth <= 1000){
                $(".job-map-wrapper").css({overflow: "auto"})
                $("#dashboard-sidebar").css({display: "none"})
            }else {
                $(".job-map-wrapper").css({overflow: "visible"})
                $("#dashboard-sidebar").css({display: "block"})
            }
        })

        window.onresize = () => {
            if (window.innerWidth <= 1000) {
                $("#dashboard-sidebar").css({display: "none"})
                $(".job-map-wrapper").css({overflow: "auto"})
            } else {
                $("#dashboard-sidebar").css({display: "block"})
                $(".job-map-wrapper").css({overflow: "visible"})

            }
        }

        this.getAllComboBoxData();
        this.handleScroll();
    }


    handleScroll = () => {
        const {index, selected} = this.props
        if (index === selected) {
            setTimeout(() => {
                this.scrollTop.current.scrollIntoView({behavior: 'smooth'})
            }, 500)
        }
    }

    getAllComboBoxData = () => {
        // API.SETTINGS.getCities().then((response) => {
        //     //console.log("cities", response)
        //     let {status, error, data} = response;
        //     if (status) {
        //         this.setState({
        //             getCities: data,
        //         })
        //     } else {
        //         alert(error)
        //     }
        // }).catch((err) => {
        //     alert(err)
        // });
        API.JOBS.getJobUniques().then((response) => {
            //console.log("cities", response)
            let {status, error, data:{uniqueCities}} = response;
            if (status) {
                this.setState({
                    getCities: uniqueCities,
                })
            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        });
        API.SETTINGS.getJobType().then((response) => {
            //console.log("types", response)
            let {status, error, data} = response;
            if (status) {
                this.setState({
                    getJobTypes: data,
                })
            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        })
        API.SETTINGS.getJobIndustry().then((response) => {
            //console.log("types", response)
            let {status, error, data} = response;
            if (status) {
                this.setState({
                    getJobIndustries: data,
                })
            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        })
        API.SETTINGS.getJobSkills().then((response) => {
            //console.log("types", response)
            let {status, error, data} = response;
            if (status) {
                this.setState({
                    getJobSkills: data,
                })
            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        })

    }


    handleShowJobDetails = (id) => {
        this.setState({
            getJobId: id,
            openJobDetails: true,
            jobAlert: false
        })
    }

    fixUrlHash = (url) => {
        let fixedUrl = new URL(url);
        let search = url.search;
        let hash = url.hash;
        const position = url.hash.indexOf('?');
        if (search.length <= 1 && position >= 0) {
            search = hash.substr(position);
            hash = hash.substr(0, position);
            fixedUrl.hash = hash;
            fixedUrl.search = search;
            fixedUrl.href = fixedUrl.toString();
        }
        return fixedUrl;
    }

    getJobSearchByHeader = (data) => {
        //console.log("jobs", this.props)
        console.log("callback",data.split("?")[1].split("&"));
        let fill = data.split("?")[1].split("&")
        let city = fill[1].split("=")[1];

        console.log("callback",city);
        // this.filterJob.title = title;
        this.filterJob.city = city;
        // this.filterJob.type = type;
        // this.filterJob.page = page;
        // this.filterJob.salaryRange = isNaN(salaryRange) ? 1 : salaryRange;
        // this.filterJob.skills = skill;
        // this.filterJob.industry = industry;
        // this.filterJob.Sortby = Sortby;
        // //console.log("Sortby", this.filterJob)
        this.getAllJobs(this.filterJob);
        this.props.clearCallBack()
    }

    getJobSearchParams = () => {
        //console.log("jobs", this.props)
        let title = new URL(window.location.href).searchParams.get("title");
        let city = new URL(window.location.href).searchParams.get("city");
        let type = new URL(window.location.href).searchParams.get("type");
        let Sortby = new URL(window.location.href).searchParams.get("Sortby");
        let industry = new URL(window.location.href).searchParams.get("industry");
        let skill = new URL(window.location.href).searchParams.get("Skill");
        let salaryRange = parseInt(new URL(window.location.href).searchParams.get("SalaryRange"));
        let page = parseInt(new URL(window.location.href).searchParams.get("page"));
        this.filterJob.title = title;
        this.filterJob.city = city;
        this.filterJob.type = type;
        this.filterJob.page = page;
        this.filterJob.salaryRange = isNaN(salaryRange) ? 1 : salaryRange;
        this.filterJob.skills = skill;
        this.filterJob.industry = industry;
        this.filterJob.Sortby = Sortby;
        //console.log("Sortby", this.filterJob)
        this.getAllJobs(this.filterJob);
    }

    getCurrentJobId = () => {
        //let job = new URL(window.location.href).searchParams.get("~");
        let job = window.location.href.split("~");
        let jobId = job[1];
        let jobTitle = job[0].split("/")[job[0].split("/").length - 1].split("-").join(" ");
        //console.log("jobId", job[0].split("/")[job[0].split("/").length - 1].split("-").join(" "));
        this.setState({
            openJobDetails: true,
            getJobId: jobId,
            jobAlert: false
        });
        this.filterJob.title = jobTitle;
        this.filterJob.Sortby = jobId;
        //console.log("jobId", this.filterJob)
        this.getAllJobs(this.filterJob)
    }

    getAllJobs = (jobFilter) => {
        this.setState({
            isResponse: true
        });
        const {title, city, type, page, Sortby, skills, industry, salaryRange} = jobFilter;
        API.JOBS.getAllJob({title, city, type, page, Sortby, skills, industry, salaryRange}).then((response) => {
            let {status, error, data} = response;
            //console.log("jobs",response)
            if (status) {
                //console.log("jobs", data)
                this.setState({
                    filteredJobs: data,
                    isResponse: false,
                    filterJob: jobFilter,
                })
            } else {
                alert(error)
                this.setState({
                    isResponse: false
                });
            }
        }).catch((err) => {
            alert(err);
            //console.log("err", err)
            this.setState({
                isResponse: false
            });
        })
    }

    handleShowSearchFilter = (showFilter) => {
        this.setState({
            showFilter: !showFilter
        })
    }

    handleSearchFilter = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        let title = $("#title").val();
        let city = $("#city").val();
        let industry = $("#industry").val();
        let skill = $("#skill").val();
        let type = $("#type").val();
        let salaryRange = $("#salaryRange").val();
        let sortBy = $("#sortBy").val();
        //console.log("handleSearchFilter", ev);
        this.setState({
            showFilter: false
        })
        history.push(`${this.JOB_SEARCH}?title=${title}&city=${city}&type=${type}&Sortby=${sortBy}&SalaryRange=${salaryRange}&Skill=${skill}&industry=${industry}&page=1`)
        this.filterJob.title = title;
        this.filterJob.city = city;
        this.filterJob.type = type;
        this.filterJob.salaryRange = salaryRange === "" ? 1 : salaryRange;
        this.filterJob.skills = skill;
        this.filterJob.industry = industry;
        this.filterJob.Sortby = sortBy;
        this.filterJob.page = 1;
        this.getAllJobs(this.filterJob);
    }

    render() {
        let {
            jobAlert,
            db,
            getJobId,
            filteredJobs,
            isResponse,
            getCities,
            showFilter,
            getJobTypes,
            getJobIndustries,
            getJobSkills,
            openJobDetails,
        } = this.state;
        return (
            <React.Fragment>


                <div className="container-fluid p-0" ref={this.scrollTop}>
                    <div className="row no-gutters">
                        <div className="col-xl-12 col-lp-12 col-lg-12">
                            <div className="job-map-wrapper pt-20 pb-0 mb-20 job-search-bg">
                                {/*bg_color--lg*/}
                                <div className="job-filter">

                                    <div className="content-search">
                                        <div
                                            className={`section-filter filter-advance mt-0 ${showFilter ? `show` : `hide`}`}>
                                            <form action={`${this.JOB_SEARCH}?title=&city=&type=&page=`}
                                                  onSubmit={this.handleSearchFilter}
                                                  className={`section-filter-form ${showFilter ? `show` : `hide`}`}>
                                                <div className="range-slider-wrap">
                                                    <div className="range-slider" data-min="15" data-max="100"
                                                         data-value="15" data-step="1"/>
                                                </div>
                                                <div className="row mt-0">

                                                    <div
                                                        className="col-xl-2 col-lp-2 col-md-2 offset-xl-3 offset-md-3 filter-item">
                                                        <input type="text" name="title" id="title"
                                                               placeholder="Enter keyword..."/>
                                                    </div>

                                                    <div className="col-xl-2 col-lp-2 col-md-2 filter-item">
                                                        {
                                                            isLogin() && getUserData().type === STRINGS.USER_TYPE.APPLICANT_TYPE || getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE ?
                                                                getUserData().allowedCities.length > 0 && (
                                                                    <select className="nice-select wide" name="city">
                                                                        {dropDownSelection()}
                                                                        <option value="">Select City</option>
                                                                        {
                                                                            getUserData().allowedCities.map((city) => {
                                                                                    return (
                                                                                        <option key={city} value={city}>{city}</option>)
                                                                                }
                                                                            )}
                                                                    </select>
                                                                )
                                                                :
                                                            getCities.length > 0 && (
                                                                <select className="nice-select wide" name="city"
                                                                        id="city">
                                                                    {dropDownSelection()}
                                                                    <option value="">Select City</option>
                                                                    {
                                                                        getCities.map((city) => {
                                                                                return (
                                                                                    <option value={city}>{city}</option>)
                                                                            }
                                                                        )}
                                                                </select>
                                                            )
                                                        }
                                                    </div>

                                                    <div className="col-xl-2 col-lp-2 col-md-2 filter-item">
                                                        <button className="ht-btn theme-btn theme-btn-two">Search
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="row mt-0">
                                                    <div
                                                        className="col-xl-2 col-lp-2 col-md-2 offset-xl-1 offset-md-1 filter-item">
                                                        {
                                                            getJobTypes.length > 0 && (
                                                                <select className="nice-select wide" name="type"
                                                                        id="type">
                                                                    {dropDownSelection()}
                                                                    <option value="">Choose Type</option>
                                                                    {
                                                                        getJobTypes.map((type) => {
                                                                                return (
                                                                                    <option value={type}>{type}</option>)
                                                                            }
                                                                        )}
                                                                </select>
                                                            )
                                                        }
                                                    </div>

                                                    <div className="col-xl-2 col-lp-2 col-md-2 filter-item">
                                                        <select className="nice-select wide" id="salaryRange">
                                                            <option value="">Choose Salary range</option>
                                                            <option value="1">0 - 15,000</option>
                                                            <option value="2">16000 - 30,000</option>
                                                            <option value="3">31,000 - 50,000</option>
                                                            <option value="4">51,000 - 70,000</option>
                                                            <option value="5">71,000 - 90,000</option>
                                                            <option value="6">91,000 - 130,000</option>
                                                            <option value="7">161,000 and above</option>
                                                        </select>
                                                    </div>

                                                    {/* <div className="col-xl-2 col-lp-2 col-md-2 filter-item">
                                                        {
                                                            getJobIndustries.length > 0 && (
                                                                <select className="nice-select wide" id="industry">
                                                                    {dropDownSelection()}
                                                                    <option value="">Job By Industry</option>
                                                                    {
                                                                        getJobIndustries.map((type) => {
                                                                                return (
                                                                                    <option value={type}>{type}</option>)
                                                                            }
                                                                        )}
                                                                </select>
                                                            )
                                                        }
                                                    </div> */}

                                                    {/*<div className="col-xl-2 col-lp-2 col-md-2 filter-item">*/}
                                                    {/*    <select className="nice-select wide">*/}
                                                    {/*        <option value="1">Choose Level</option>*/}
                                                    {/*        <option value="2">Junior</option>*/}
                                                    {/*        <option value="3">Manager</option>*/}
                                                    {/*        <option value="4">Professional</option>*/}
                                                    {/*        <option value="5">Senior</option>*/}
                                                    {/*    </select>*/}
                                                    {/*</div>*/}

                                                    <div className="col-xl-2 col-lp-2 col-md-2 filter-item">
                                                        {
                                                            getJobSkills.length > 0 && (
                                                                <select className="nice-select wide" id="skill">
                                                                    {dropDownSelection()}
                                                                    <option value="">Choose Skills</option>
                                                                    {
                                                                        getJobSkills.map((type) => {
                                                                                return (
                                                                                    <option value={type}>{type}</option>)
                                                                            }
                                                                        )}
                                                                </select>
                                                            )
                                                        }
                                                    </div>

                                                </div>
                                                <input type="number" value={1} name="page" style={{display: "none"}}/>
                                            </form>
                                        </div>
                                        <div className="get-section-filter-arrow-down">
                                            <IconButton onClick={() => this.handleShowSearchFilter(showFilter)}>
                                                <FindReplaceIcon style={{color: "#cd74b1"}}/>
                                            </IconButton>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row no-gutters" style={{padding: "8px", backgroundColor: "#fff"}}>
                    <div className="col-lg-5 order-lg-2 mb-20 pl-15">
                        <div className="filter-form">
                            <div className="result-sorting">
                                <div className="total-result">
                                    <span className="total">({filteredJobs.length}) </span>
                                    Jobs &amp; Vacancies
                                </div>

                                <div className="form-left">
                                    <div className="sort-by">
                                        <form action="#">
                                            <label className="text-sortby">Sort by:</label>
                                            <select style={{width: "initial"}} className="nice-select" id="sortBy">
                                                <option value="Title">Title</option>
                                                <option selected value="Date">Date (newest to oldest)</option>
                                                <option value="Salary">Salary (highest to lowest)
                                                </option>
                                            </select>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center align-items-center">
                            <ul className="nav jl">

                                {
                                    !isResponse ?
                                        filteredJobs.length > 0 ?
                                            filteredJobs.map((jp) =>
                                                    <li>
                                    <span className="" data-target="#job-item1" data-toggle="tab">
                                    {/*<!-- Single Job Start  -->*/}
                                        <div className="single-job style-two"
                                             onClick={() => {
                                                 this.handleShowJobDetails(jp.id)
                                             }}>
                                    <div className="info-top">
                                    <div className="job-info">
                                    <div className="job-info-inner">
                                    <div className="job-info-top">
                                    <div className="saveJob for-listing">
                                    {jp.isSponsored ? <span className="featured-label">Sponsor</span> : ""}
                                        <div className="job-type-label ml-20 mr-20">{jp.type}</div>
                                    <NavLink className="save-job" to="/">
                                    {/*<i className="far fa-heart"/>*/}
                                    </NavLink>
                                    </div>
                                    <div className="title-name">
                                    <h3 className="job-title">
                                    <div style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}
                                        // to={`${this.JOB_SEARCH}?title=${jp.title}&city=${jp.city}&type=${jp.type}&page=1`}
                                        // onClick={this.getJobSearchParams}
                                    >{jp.title}</div>
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
                                    <div className="job-meta-two">
                                    <div className="field-salary_from">
                                    {/*PKR{jp.salaryRangeFrom} - PKR{jp.salaryRangeTo} / month*/}
                                        PKR {getSalaryRange(jp.salaryRange)} / month
                                    </div>
                                    <div className="field-datetime"><i
                                        className="lnr lnr-clock"/>{parseDateWithoutTime(parseDate(new Date(jp.jobPostDate)))}</div>
                                    <div className="field-map"><i
                                        className="lnr lnr-map-marker"/>{jp.city}</div>
                                    </div>
                                    <div className="job-skill-tag">
                                    {
                                        jp.skills !== null && jp.skills.length > 0 && (
                                            jp.skills.map((sk) => <NavLink to="/">{sk}</NavLink>)
                                        )
                                    }
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                        {/*<!-- Single Job End -->*/}
                                    </span>
                                                    </li>
                                            ) : "No jobs Found" :
                                        <div className="spinner-holder">
                                            <Spinner height={100} width={100} type={"Puff"}/>
                                        </div>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-7 order-lg-3">
                        <div className="col-lg-12">
                            <div className="tab-content ov-des">
                                <div className="col-md-6">
                                    <div id="job-alert" className={`${jobAlert ? `show` : ``}`}>
                                        <h4>Get new jobs for this search by email</h4>
                                        <div className="comment-form">
                                            <form action="#">
                                                <div className="row row-7">


                                                    <div className="col-md-10 offset-1 mt-3 mb-15">
                                                        <input type="text" placeholder="Email"/>
                                                    </div>
                                                    <div className="col-6 offset-3 text-center mt-20">
                                                        <button className="ht-btn theme-btn theme-btn-two">Send me
                                                            new jobs
                                                        </button>
                                                    </div>
                                                    <p>By creating a job alert or receiving recommended jobs, you
                                                        agree to our <NavLink to="https://pk.indeed.com/legal?hl=en"
                                                                              target="_blank">Terms</NavLink>. You
                                                        can change your consent settings at any time by
                                                        unsubscribing or as detailed in our terms.</p>


                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>


                                {openJobDetails &&
                                <JobItem
                                    db={db}
                                    id={getJobId}
                                    handleShowJobDetails={(item) => this.setState({openJobDetails: false})}
                                />

                                }

                            </div>


                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default JobSearchedList;