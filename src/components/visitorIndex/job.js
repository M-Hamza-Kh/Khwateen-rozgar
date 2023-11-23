import React, {Component} from "react";
import {dropDownSelection, STRINGS} from "../../utils/base";
import {NavLink} from "react-router-dom";
//import authorIcon from "../../content/images/author/author2.jpg";
import {Header} from "../header";
import {Footer} from "../footer";
import JobItem from "./jobsItems/jobItem";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faCheck,faTimes} from "@fortawesome/free-solid-svg-icons";
// import uploadedPlace from "../../content/images/employer/cover-image-employer-1.jpg";
// import $ from "jquery";
// import JobItem from "./jobsItems/jobItem";

export class Job extends Component {
    childDiv = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            lightHeader: `black-logo-version header-sticky sticky-black d-none d-lg-block`,
            filterJob: {
                title: "",
                city: "",
                type: "",
                page: 0
            },
            getJobId: "",
        }
        //console.log("jobs", this.props)
    }


    componentDidMount() {
        dropDownSelection();
        this.getCurrentJobId();
        this.handleScroll();
    }
    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.childDiv.current.scrollIntoView({ behavior: 'smooth' })
            }, 500)
        }
    }


    getCurrentJobId = () => {
        //let job = new URL(window.location.href).searchParams.get("~");
        let job = window.location.href.split("~");
        //console.log("jobId", job[1]);
        this.setState({
            getJobId: job[1]
        })
    }


    render() {
        let {
            lightHeader,
            getJobId
        } = this.state;
        return (
            <div>
                <Header headerClass={lightHeader} logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
                {/*// <!-- Breadcrumb Section Start -->*/}
                <div className="breadcrumb-section section bg_color--5 pt-30 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-breadcrumb-content">
                                    <ul hidden className="page-breadcrumb">
                                        <li><NavLink to={`${STRINGS.ROUTES.ROOT}`}>Home</NavLink></li>
                                        <li>Job</li>
                                    </ul>
                                    <h4>Job</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*// <!-- Breadcrumb Section Start -->*/}

                {/*// <!-- Job Listing Section Start Without Container [TWO_COLUMNS] -->*/}
                <div className="job-listing-section section bg_color--1 pb-30 pb-lg-30 pb-md-30 pb-sm-30 pb-xs-30"
                     style={{padding: "15px"}}>
                    <div className="col-lg-12 order-lg-3">
                        <div className="col-lg-12">
                            <div className="tab-content ov-des">
                                {getJobId !== "" &&
                                <JobItem
                                    db
                                    share
                                    id={getJobId}
                                    //handleShowJobDetails={(item) => this.setState({openJobDetails: false})}
                                />}
                            </div>
                        </div>
                    </div>
                </div>
                {/*// <!-- Job Listing Section Start -->*/}
                <Footer/>
            </div>
        );
    }
}