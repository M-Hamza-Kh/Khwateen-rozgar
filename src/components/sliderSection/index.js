import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {dropDownSelection, getUserData, isLogin, STRINGS} from "../../utils/base";
import {API} from "../../utils/services";

export class SliderSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            getCities:[],
            getJobTypes:[],
        }

        this.getAllComboBoxData();
    }


    componentDidMount() {
        dropDownSelection();
    }

    getAllComboBoxData = () => {
        // API.SETTINGS.getCities().then((response) => {
        //     console.log("cities", response)
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
        // API.SETTINGS.getJobType().then((response) => {
        //     console.log("types", response)
        //     let {status, error, data} = response;
        //     if (status) {
        //         this.setState({
        //             getJobTypes: data,
        //         })
        //     } else {
        //         alert(error)
        //     }
        // }).catch((err) => {
        //     alert(err)
        // });
        API.JOBS.getJobUniques().then((response)=>{
            //console.log("jobUni",response)
            let {status, data:{uniqueTypes,uniqueCities}} = response;
            if(status){
                this.setState({
                    getJobTypes:uniqueTypes,
                    getCities:uniqueCities,
                })
            }
        }).catch((err)=>{
            alert(err)
        })

    }


    handleSubmitSearch = () => {

    }

    render() {
        let {getCities,getJobTypes} = this.state;
        return (
            <div className="hero-section section position-relative" style={{zIndex:"1"}}>
                {/*<!--Hero Item start-->*/}
                <div className="hero-item bg_image--1">
                    <div className="container" style={{margin:"auto"}}>
                        <div className="row">
                            <div className="col-lg-12">

                                {/*<!--Hero Content start-->*/}
                                <div className="hero-content-2 left">
                                    <h2 className="title">Dream, Search, Apply</h2>{/*mt-60*/}
                                    <h3 className="sub-title">Get Hired.</h3>
                                    <p>A portal that cares about you.</p>

                                    <div className="job-search-wrap mt-60 mt-md-70 mt-sm-50 mt-xs-30">
                                        <div className="job-search-form">
                                            <form action={`${STRINGS.ROUTES.JOBS.LISTING}?title=&city=&type=&page=`} onSubmit={this.handleSubmitSearch}>
                                                <div className="row row-5">
                                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                                                        {/*<!-- Single Field Item Start  -->*/}
                                                        <div className="single-field-item">
                                                            <i className="lnr lnr-magnifier"/>
                                                            <input placeholder="What jobs you want?" name="title"
                                                                   type="text"/>
                                                        </div>
                                                        {/*<!-- Single Field Item End  -->*/}
                                                    </div>
                                                    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                        {/*<!-- Single Field Item Start  -->*/}
                                                        <div className="single-field-item">
                                                            <i className="lnr lnr-list"/>
                                                            {
                                                                getJobTypes.length > 0 && (
                                                                    <select className="nice-select wide" name="type">
                                                                        {dropDownSelection()}
                                                                        <option value="">Choose Type</option>
                                                                        {
                                                                            getJobTypes.map((type) => {
                                                                                    return (
                                                                                        <option key={type} value={type}>{type}</option>)
                                                                                }
                                                                            )}
                                                                    </select>
                                                                )
                                                            }
                                                            {/*<select className="nice-select wide"*/}
                                                            {/*        name="jobType"*/}
                                                            {/*        ref={el => this.el = el}>*/}
                                                            {/*    <option value="0">Job Types</option>*/}
                                                            {/*    <option value="FullTime">Full Time</option>*/}
                                                            {/*    <option value="PartTime">Part Time</option>*/}
                                                            {/*    <option value="Freelancer/Home-Based">Freelancer / Home-Based</option>*/}
                                                            {/*    <option value="Tutor">Tutor</option>*/}
                                                            {/*    <option value="Internship">Internship</option>*/}
                                                            {/*</select>*/}
                                                        </div>
                                                        {/*<!-- Single Field Item End  -->*/}
                                                    </div>
                                                    <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                                                        {/*<!-- Single Field Item Start  -->*/}
                                                        <div className="single-field-item">
                                                            <i className="lnr lnr-map-marker"/>
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
                                                                    <select className="nice-select wide" name="city">
                                                                        {dropDownSelection()}
                                                                        <option value="">Select City</option>
                                                                        {
                                                                            getCities.map((city) => {
                                                                                    return (
                                                                                        <option key={city} value={city}>{city}</option>)
                                                                                }
                                                                            )}
                                                                    </select>
                                                                )
                                                            }
                                                            {/*<!--<input class="input-field input-field-location" placeholder="Location" name="location" type="text">
                                                            <span class="btn-action-location">
                                                            <i class="far fa-dot-circle"></i>
                                                            </span>-->*/}
                                                        </div>
                                                        {/*<!-- Single Field Item End  -->*/}
                                                    </div>
                                                    <div className="col-lg-2 col-md-6 col-sm-6 col-12">
                                                        <div className="submit-btn">
                                                            <button className="ht-btn" type="submit"> Search</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <input type="number" defaultValue={1} name="page" style={{display:"none"}}/>
                                            </form>
                                        </div>
                                        <div className="trending-keywords">
                                            <div className="keywords">
                                                <span className="title">Trending Keywords</span>
                                                <ul>
                                                    <li><NavLink to="#">Account Manager</NavLink></li>
                                                    <li><NavLink to="#">Administrative</NavLink></li>
                                                    <li><NavLink to="#">Android</NavLink></li>
                                                    <li><NavLink to="#">Angular</NavLink></li>
                                                    <li><NavLink to="#">app</NavLink></li>
                                                    <li><NavLink to="#">ASP.NET</NavLink></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/*<!--Hero Content end-->*/}

                            </div>
                        </div>
                    </div>
                </div>
                {/*<!--Hero Item end-->*/}
            </div>
        );
    }
}