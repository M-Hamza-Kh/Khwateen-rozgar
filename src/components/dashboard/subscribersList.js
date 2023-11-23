import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";
import {parseDate, parseDateWithoutTime} from "../../utils/base";
// import {faEye} from "@fortawesome/free-regular-svg-icons/faEye";
import {API} from "../../utils/services";
import Spinner from "../spinner";
import {text} from "@fortawesome/fontawesome-svg-core";
// import ProfileViewPopUp from "./modals/profileViewModal";
// import Filters from "./Filters";
// import ExportToXl from "./ExportToXl";

class SubscribersList extends Component {
    filter = {
        page: 1,
        City: "",
        Name: "",
        Email: "",
    }

    constructor(props) {
        super(props);
        this.state = {
            subscribersList: [],
            getJobSkills: [],
            getJobQualification: [],
            isResponse: false,
            openComposer: false,
            listCounter: 0,
            companyDetails: {},
            pageNo: this.filter.page
        }

    }

    componentDidMount() {
        this.getAllSubscribersList(this.filter);
    }

    // defaultComboBox = () => {
    //     API.SETTINGS.getJobSkills().then((response) => {
    //         //console.log("types", response)
    //         let {status, error, data} = response;
    //         if (status) {
    //             this.setState({
    //                 getJobSkills: data
    //             })
    //         } else {
    //             alert(error)
    //         }
    //     }).catch((err) => {
    //         alert(err)
    //     })
    //
    //     API.SETTINGS.getJobQualification().then((response) => {
    //         //console.log("types", response)
    //         let {status, error, data} = response;
    //         if (status) {
    //             this.setState({
    //                 getJobQualification: data
    //             })
    //         } else {
    //             alert(error)
    //         }
    //     }).catch((err) => {
    //         alert(err)
    //     })
    // }

    getAllSubscribersList = (filter) => {
        // console.log("allFilter",filter)
        this.setState({
            isResponse: true
        })
        API.ADMIN.getAllSubscribers(filter).then((response) => {
            let {status, data, error} = response;
            console.log("SubscribersList", response)
            if (status) {
                this.setState({
                    subscribersList: data.records,
                    listCounter: data.recordCount,
                    isResponse: true
                })
            } else {
                alert(error);
                this.setState({
                    isResponse: false
                })
            }
        })
    }

    handlePaging = (page) => {
        if (page > 0) {
            this.setState({
                pageNo: this.filter.page
            })
            this.getAllSubscribersList(this.filter)
        }
    }

    // handleFilter = (filter) => {
    //     filter.page = this.filter.page
    //     this.filter = filter
    //     this.getAllSubscribersList(this.filter)
    // }

    render() {
        let {subscribersList, isResponse, pageNo, listCounter} = this.state;
        //console.log("subscribersList", subscribersList)
        // getJobQualification, getJobSkills
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h1>Subscribers List</h1>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-overview">
                        <div className="row">
                            <div className="col-xl-9 col-12">
                                <div className="submited-applications mb-50">
                                    <div className="applications-heading">
                                        {
                                            isResponse && (
                                                <h3>Results ( {listCounter} )
                                                    {/*{*/}
                                                    {/*    isResponse &&*/}
                                                    {/*    subscribersList.length > 0 &&*/}
                                                    {/*    (<div className="d-flex w-100">*/}
                                                    {/*        <ExportToXl data={subscribersList}/>*/}
                                                    {/*    </div>)*/}

                                                    {/*}*/}
                                                </h3>
                                            )
                                        }
                                    </div>
                                    <div className="applications-main-block">
                                        <div className="applications-table ov-des" style={{
                                            position: `${isResponse ? "relative" : "initial"}`,
                                            height: `${isResponse ? "100%" : "initial"}`
                                        }}>

                                            {
                                                isResponse ?
                                                    subscribersList.length > 0 && (
                                                        <textarea
                                                        name="all"
                                                        className="w-100 ov-des"
                                                        style={{
                                                            height:"100vh"
                                                        }}
                                                        defaultValue={subscribersList.join(",\n")}
                                                        />
                                                    )
                                                    : "loading..."
                                            }

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubscribersList;