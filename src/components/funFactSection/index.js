import React, {Component} from 'react';
//import {NavLink} from 'react-router-dom';
import womenIcon1 from "../../content/images/icons/001-women.png";
import recruitment from "../../content/images/icons/003-recruitment.png";
import candidate from "../../content/images/icons/002-candidate.png";
import jobApplication from '../../content/images/icons/004-file.png';
import CountUp from 'react-countup';
import {API} from "../../utils/services";

export class FunFactSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalCandidates: 6,
            totalCompanies: 4,
            totalJobProvided: 0,
            totalJobs: 3,
        }
    }

    componentDidMount() {
        this.getStats();
    }

    getStats = () => {
        API.HOME.getStats().then((response) => {
            //console.log("stats", response)
            let {status, error, data} = response;
            if (status) {
                this.setState({
                    totalCandidates: data.totalCandidates,
                    totalCompanies: data.totalCompanies,
                    totalJobProvided: data.totalJobProvided,
                    totalJobs: data.totalJobs
                })

            } else {
                alert(error);
            }
        })
    }

    render() {
        let {totalCandidates,totalCompanies,totalJobProvided,totalJobs} = this.state;
        return (
            <div className="funfact-section section bg-image-proparty bg_image--2 mt--46 pb-0 pb-sm-0 pb-xs-0">
                <div className="container">
                    <div className="row no-gutters border-top-left">

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            {/*<!-- Single Funfact Start -->*/}
                            <div className="single-funfact">
                                <div className="icon-img">
                                    <img src={womenIcon1} alt=""/>
                                </div>
                                <div className="funfact-content">
                                    <span className="counter"><CountUp end={totalCandidates} duration={3}/></span>
                                    <span className="text theme-color">Candidates</span>
                                </div>
                            </div>
                            {/*<!-- Single Funfact End -->*/}
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            {/*<!-- Single Funfact Start -->*/}
                            <div className="single-funfact">
                                <div className="icon-img">
                                    <img src={recruitment} alt=""/>
                                </div>
                                <div className="funfact-content">
                                    <span className="counter"><CountUp end={totalJobs} duration={3}/></span>
                                    <span className="text theme-color">Total Jobs</span>
                                </div>
                            </div>
                            {/*<!-- Single Funfact End -->*/}
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            {/*<!-- Single Funfact Start -->*/}
                            <div className="single-funfact">
                                <div className="icon-img">
                                    <img src={candidate} alt=""/>
                                </div>
                                <div className="funfact-content">
                                    <span className="counter"><CountUp end={totalCompanies} duration={3}/></span>
                                    <span className="text theme-color">Employers</span>
                                </div>
                            </div>
                            {/*<!-- Single Funfact End -->*/}
                        </div>

                        <div className="col-lg-3 col-md-6 col-sm-6">
                            {/*<!-- Single Funfact Start -->*/}
                            <div className="single-funfact">
                                <div className="icon-img">
                                    <img src={jobApplication} alt=""/>
                                </div>
                                <div className="funfact-content">
                                    <span className="counter"><CountUp end={totalJobProvided} duration={3}/></span>
                                    <span className="text theme-color">job provided</span>
                                </div>
                            </div>
                            {/*<!-- Single Funfact End -->*/}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}