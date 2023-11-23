import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
//import defaultUserImg from "../../content/images/location/upload-icon-30.png";
//import Select from "react-select";
import Creatable from 'react-select/creatable';
import { API } from "../../utils/services";
import {
    currentDateFormat,
    dropDownSelection,
    getSalaryRange,
    getUserData,
    onTimeChange,
    parseDate,
    parseDateWithoutTime,
    setCurrentDateFormat,
    STRINGS
} from "../../utils/base";
import $ from "jquery";
import { pkCities } from "../../utils/pk";
import '../sweetAlert.css';
// import AutoComplete from "../AutoComplete";
import SelectCities from "../AutoComplete/SelectCities";
import { withRouter } from "react-router-dom";
import Spinner from "../spinner";
import swal from 'sweetalert';
import Swal from 'sweetalert2';

class JobPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upPic: '',
            selFileName: '',
            selectedOption: [],
            getJobSkills: [],
            getCities: [],
            getJobTypes: [],
            getJobIndustries: [],
            getJobQualification: [],
            selectedCity: "",
            jobTimings1: "",
            jobTimings2: "",
            preferredAgeGroup1: "",
            preferredAgeGroup2: "",
            isDataLoad: false,
            isJobApprove: props.data !== undefined,
            isJobApproveData: props.data !== undefined ? props.data : {},
        };
        // this.jobPost = {
        //     accommodation: false,
        //     approvedBy: null,
        //     approvedOn: "",
        //     category: null,
        //     city: "",
        //     company: null,
        //     companyID: null,
        //     companyPicture1: "",
        //     companyPicture2: "",
        //     createdBy: "",
        //     createdOn: "",
        //     description: null,
        //     id: "",
        //     isActive: false,
        //     isApproved: false,
        //     isSponsored: false,
        //     jobInformation: null,
        //     jobPostDate: null,
        //     jobTimings: null,
        //     lastDatePosting: null,
        //     modifiedOn: "",
        //     notificationEmail: null,
        //     numberOfVacancy: 0,
        //     numberofEmployees: 0,
        //     numberofEmployeesFemale: 0,
        //     pickAndDrop: false,
        //     preferredAgeGroup: null,
        //     public: false,
        //     qualification: null,
        //     requiredSkillsExperience: null,
        //     salaryRangeFrom: 0,
        //     salaryRangeTo: 0,
        //     showCompanyInfo: false,
        //     skills: [],
        //     status: null,
        //     title: "",
        //     type: null,
        //     viewed: 0,
        //     workingDays: ""
        // }

        this.jobPost = {
            "accommodation": false,
            "city": "",
            "company": getUserData().company,
            "companyID": getUserData().id,
            "companyPicture1": "",
            "companyPicture2": "",
            "description": "",
            "id": "",
            "isActive": false,
            "isApproved": false,
            "isSponsored": false,
            "jobInformation": "",
            "jobPostDate": (new Date()).toISOString(),
            "jobTimings": "",
            "lastDatePosting": new Date(currentDateFormat(new Date().getDate() + 15)).toISOString(),
            "notificationEmail": null,
            "numberOfVacancy": "1",
            "numberofEmployees": 0,
            "numberofEmployeesFemale": 0,
            "pickAndDrop": false,
            "preferredAgeGroup": null,
            "public": false,
            "qualification": "",
            "requiredSkillsExperience": null,
            "salaryRange": 0,
            "experienceInYears": -1,
            "salaryRangeFrom": "",
            "salaryRangeTo": "",
            "showCompanyInfo": true,
            "skills": [],
            "status": null,
            "title": "",
            "type": "",
            "viewed": 0,
            "workingDays": ""
        }
        $("#workingDays").val("5");

    }

    componentDidMount() {
        this.getAllComboBoxData();
    }

    skillsFiltered = (skills) => {
        let value = [];
        this.state.getJobSkills.map((d) => {
            skills.map((s, index) => {
                if (d.label === s) {
                    value.push({
                        value: index, label: s
                    })
                }
                return s
            })
            return d
        })
        return value;

    }

    setJobApproveData = (data) => {
        if (!$.isEmptyObject(data)) {
            console.log("setJobApproveData", data);
            console.log("setJobApproveData", this.jobPost);
            this.jobPost = data;
            $("#ExperienceInYears").val(data.experienceInYears.toString());
            $("#type").val(data.type);
            $("#category").val(data.category);
            $("#qualification").val(data.qualification);
            $("#workingDays").val(data.workingDays);
            //data.showCompanyInfo = $("input[id='rdo_company_info_1']:checked").val() !== undefined;
            $("#salaryRange").val(data.salaryRange);
            if (data.accommodation) {
                $("#job_features1").prop("checked", true)
            }
            if (data.pickAndDrop) {
                $("#job_features2").prop("checked", true)
            }
            this.setState({
                selectedCity: data.city,
                selectedOption: this.skillsFiltered(data.skills),
                isDataLoad: true
            })
        } else {
            this.setState({
                isDataLoad: true
            })
        }
    }

    getAllComboBoxData = async () => {
        let data_1 = await API.SETTINGS.getCities().then((response) => {
            console.log("cities", response)
            let { status, error } = response;
            if (status) {
                this.setState({
                    //getCities: data,
                    getCities: pkCities,
                })
                return true

            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        });
        let data_2 = await API.SETTINGS.getJobType().then((response) => {
            console.log("types", response)
            let { status, error, data } = response;
            if (status) {
                this.setState({
                    getJobTypes: data,
                })
                return true

            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        })
        let data_3 = await API.SETTINGS.getJobIndustry().then((response) => {
            console.log("types", response)
            let { status, error, data } = response;
            if (status) {
                this.setState({
                    getJobIndustries: data,
                })
                return true

            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        })
        let data_4 = await API.SETTINGS.getJobSkills().then((response) => {
            console.log("types", response)
            let { status, error, data } = response;
            if (status) {
                this.setState({
                    getJobSkills: data.map((sk, index) => {
                        return { value: index, label: sk }
                    }),
                })
                return true

            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        })
        let data_5 = await API.SETTINGS.getJobQualification().then((response) => {
            console.log("types", response)
            let { status, error, data } = response;
            if (status) {
                this.setState({
                    getJobQualification: data,
                });
                return true
            } else {
                alert(error)
            }
        }).catch((err) => {
            alert(err)
        })
        if (data_1 && data_2 && data_3 && data_4 && data_5) {
            this.setJobApproveData(this.state.isJobApproveData)
        }
    }

    handleChangeSkills = (selectedOption) => {
        this.setState({
            selectedOption
        })
    }

    swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    handleChangeInput = (ev) => {
        console.log("jobPost", ev.target)
        if (ev.target.type === "date") {
            this.jobPost[ev.target.name] = new Date(ev.target.value).toISOString();
        } else if (ev.target.type === "checkbox" || ev.target.type === "radio") {
            this.jobPost[ev.target.name] = ev.target.checked;
        } else {
            this.jobPost[ev.target.name] = ev.target.value;
        }
    }

    handleSubmitJobPost = (ev, isUpdate) => {
        debugger
        console.log("jobPost", this.jobPost)
        console.log("jobPost", ev)
        ev.preventDefault();
        ev.stopPropagation();
        let { selectedOption, selectedCity } = this.state;
        this.jobPost.city = selectedCity;
        this.jobPost.type = $("#type").val();
        this.jobPost.category = $("#category").val();
        this.jobPost.qualification = $("#qualification").val();
        this.jobPost.workingDays = $("#workingDays").val();
        this.jobPost.showCompanyInfo = $("input[id='rdo_company_info_1']:checked").val() !== undefined;
        this.jobPost.salaryRange = parseInt($("#salaryRange").val());
        this.jobPost.experienceInYears = parseInt($("#ExperienceInYears").val() === null ? this.jobPost.experienceInYears : $("#ExperienceInYears").val());
        this.jobPost.jobTimings = `${this.state.jobTimings1} - ${this.state.jobTimings2}`
        this.jobPost.preferredAgeGroup = `${this.state.preferredAgeGroup1} - ${this.state.preferredAgeGroup2}`
        this.jobPost.skills = selectedOption.length > 0 ? selectedOption.map((sk) => {
            return sk.label
        }) : [];
        let validate = this.validationForm(this.jobPost);
        if (validate.error) {
            console.log("jobPost_1", this.jobPost)
            if (isUpdate) {
                this.setState({
                    isDataLoad: false
                })
                API.COMPANY.updateJob(this.jobPost.id, this.jobPost).then((response) => {
                    //let {status, data, error} = response;
                    console.log("jobPost_1", response);
                    if (getUserData().type !== STRINGS.USER_TYPE.ADMIN_TYPE) {

                        swal("", "Successfully updated job and send to Admin for review", "success", {
                            button: "Done",
                        });
                       // alert("Successfully updated job and send to Admin for review");
                        this.props.onClose();
                    } else {
                        swal("", "Successfully updated job", "success", {
                            button: "Done",
                        });
                       // alert("Successfully updated job");
                    }

                    this.setState({
                        isDataLoad: true
                    });
                    this.setJobApproveData(response.data[0])
                    // if (response.message.indexOf("package") !== -1) {
                    //
                    // } else {
                    //     alert("Successfully updated job");
                    //     this.setState({
                    //         isDataLoad:true
                    //     })
                    // }
                }).catch((err) => {
                    alert(err)
                    this.setState({
                        isDataLoad: true
                    })
                })
            } else {
                API.COMPANY.addJob(this.jobPost).then((response) => {
                    debugger
                    //let {status, data, error} = response;
                    console.log("jobPost", response);
                    if (response.message.indexOf("package") !== -1) {
                        // alert("Successfully created job");

                        swal("", "Successfully created job", "success", {
                            button: "Done",
                        });

                        this.swalWithBootstrapButtons.fire({
                            title: 'Please Update Profile',
                            icon: 'warning',
                            input: 'select',
                            inputOptions: {
                                '1': 'About',
                                '2':'Company Info',
                                '3':'Company Location'
                            },
                            inputPlaceholder: 'required',
                            showCancelButton: true,
                            confirmButtonText: 'Update',
                            cancelButtonText: 'Cancel',
                            reverseButtons: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.props.history.push('/profile')

                            } else if (
                                /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                                this.swalWithBootstrapButtons.fire(
                                    'Cancelled',
                                    'Your Profile Update is Pending!',
                                    'error'
                                )
                            }
                        })

                        // swal("", "Successfully created job", "success",
                        //     {
                        //     title: 'Please Update Profile',
                        //     icon: "warning",
                        //     buttons: true,
                        //     dangerMode: true,
                        //   })
                        //   .then((willDelete) => {
                        //     if (willDelete) {
                        //         this.props.history.push('/profile')
                        //     } else {
                        //         swal("Your Profile Update is Pending!", {
                        //             icon: "warning",
                        //         });
                        //     }
                        // });

                        this.props.history.push('/c_packages')

                        // window.location.href = STRINGS.ROUTES.DASHBOARD.COMPANY_PACKAGES;
                    } else {
                        alert("Successfully created job");

                        window.location.href = STRINGS.ROUTES.DASHBOARD.JOB_LIST;
                    }
                }).catch((err) => {
                    alert(err)
                })
            }
        } else {
            alert(validate.message);
        }
    }

    validationForm = ({ city, company, title, type, salaryRange, description }) => {
        let valid = { error: true, message: "" }
        if (city === "" || city === null) {
            valid.error = false;
            valid.message += valid.message ? "\nCity is required" : "City is required"
        }
        console.log("validationForm", this.props.data);
        console.log("validationForm", company);
        if (company === "" || company === null) {
            valid.error = false;
            valid.message += valid.message ? "\nCompany name is required" : "Company name is required"
        }
        if (title === "" || title === null) {
            valid.error = false;
            valid.message += valid.message ? "\nTitle is required" : "Title is required"
        }
        if (description === "" || description === null) {
            valid.error = false;
            valid.message += valid.message ? "\nDescription is required" : "Description is required"
        }
        if (type === "" || type === null) {
            valid.error = false;
            valid.message += valid.message ? "\nJob type is required" : "Job type is required"
        }
        if (isNaN(salaryRange)) {
            valid.error = false;
            valid.message += valid.message ? "\nSalary Range Required" : "Salary Range Required"
        }
        if (this.state.selectedOption.length === 0) {
            valid.error = false;
            valid.message += valid.message ? "\nSkills Required" : "Skills Required"
        }
        // if (getUserData().companyPicture1 === "" && getUserData().companyPicture2 === "") {
        //     valid.error = false;
        //     valid.message += valid.message ? "\nWork places picture required for job posting" : "Work places picture required for job posting"
        // }
        return valid;
    }

    handleSelectCity = (selectedOption) => {
        this.setState({
            selectedCity: selectedOption
        })
    }

    componentDidUpdate() {
       
    }


    render() {
        let { upPic, isJobApproveData, selectedOption, getJobSkills, getCities, getJobTypes, getJobIndustries, getJobQualification, isJobApprove, isDataLoad } = this.state;
        console.log("getCities", upPic)
        console.log("selectedCity", this.state.selectedCity)
        console.log("data", this.props.data)
        return (
            <div className={`${isJobApprove ? "col-xl-12 col-lg-12" : "col-xl-10 col-lg-9"}`}>
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h4>Job Post</h4>
                            </div>
                        </div>
                    </div>


                    <div className="dashboard-overview">
                        {
                            isDataLoad ? (
                                <div className="row">
                                    <div className="col-xl-12 col-12">
                                        <div className="profile-applications">
                                            <div className="profile-applications-heading">
                                                <ul className="nav">
                                                    <li><NavLink className="active" to="#">Jobs</NavLink></li>
                                                </ul>
                                            </div>
                                            <div className="profile-applications-main-block pt-0">
                                                <div className="profile-applications-form">
                                                    <form action="#">
                                                        <div className="row mb-30 pt-10">

                                                            <div className="col-lg-12">
                                                                <div className="row">
                                                                    <div
                                                                        className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="title">Job
                                                                                Title <span>*</span></label>
                                                                            {
                                                                                isJobApprove ?
                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                        <input type="text" id="title"
                                                                                            name="title"
                                                                                            onChange={this.handleChangeInput}
                                                                                            defaultValue={this.jobPost.title}
                                                                                            placeholder="Enter Title" /> :
                                                                                        <div
                                                                                            className="view-data-box">{this.jobPost.title}</div>
                                                                                    : <input type="text" id="title"
                                                                                        name="title"
                                                                                        onChange={this.handleChangeInput}
                                                                                        defaultValue={this.jobPost.title}
                                                                                        placeholder="Enter Title" />
                                                                            }
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    <div
                                                                        className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label
                                                                                htmlFor="position">Company <span>*</span></label>
                                                                            {
                                                                                isJobApprove ?
                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                        <input type="text" id="position"
                                                                                            name="company"
                                                                                            placeholder="Enter Company Name"
                                                                                            onChange={this.handleChangeInput}
                                                                                            defaultValue={isJobApprove ? this.jobPost.company : getUserData().company}
                                                                                        /> :
                                                                                        <div
                                                                                            className="view-data-box">{isJobApprove ? this.jobPost.company : getUserData().company}</div>
                                                                                    : <input type="text" id="position"
                                                                                        name="company"
                                                                                        placeholder="Enter Company Name"
                                                                                        onChange={this.handleChangeInput}
                                                                                        value={isJobApprove ? this.jobPost.company : getUserData().company}
                                                                                    />
                                                                            }

                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    <div
                                                                        className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-inputa mb-25">
                                                                            <label htmlFor="rdo_company_info">Company
                                                                                Information</label>
                                                                            <div className="skill-check-box ">
                                                                                <ul className="skill-cbx-list">
                                                                                    {
                                                                                        isJobApprove ?
                                                                                            // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                            getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                                <React.Fragment>
                                                                                                    <li>
                                                                                                        <div
                                                                                                            className="filter-name-item">
                                                                                                            <input
                                                                                                                type="radio"
                                                                                                                defaultChecked={this.jobPost.showCompanyInfo}
                                                                                                                name="showCompanyInfo"
                                                                                                                onChange={this.handleChangeInput}
                                                                                                                id="rdo_company_info_1"
                                                                                                            />
                                                                                                            <label
                                                                                                                htmlFor="rdo_company_info_1">Visible</label>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                    <li>
                                                                                                        <div
                                                                                                            className="filter-name-item">
                                                                                                            <input
                                                                                                                type="radio"
                                                                                                                onChange={this.handleChangeInput}
                                                                                                                name="showCompanyInfo"
                                                                                                                id="rdo_company_info_2" />
                                                                                                            <label
                                                                                                                htmlFor="rdo_company_info_2">Hidden</label>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </React.Fragment> :
                                                                                                <React.Fragment>
                                                                                                    <li>
                                                                                                        <div
                                                                                                            className="filter-name-item">
                                                                                                            <label
                                                                                                                htmlFor="rdo_company_info_1">{
                                                                                                                    this.jobPost.showCompanyInfo ? "Visible" : "Hidden"
                                                                                                                }</label>
                                                                                                        </div>
                                                                                                    </li>
                                                                                                </React.Fragment>

                                                                                            : <React.Fragment>
                                                                                                <li>
                                                                                                    <div
                                                                                                        className="filter-name-item">
                                                                                                        <input type="radio"
                                                                                                            defaultChecked={this.jobPost.showCompanyInfo}
                                                                                                            name="showCompanyInfo"
                                                                                                            onChange={this.handleChangeInput}
                                                                                                            id="rdo_company_info_1"
                                                                                                        />
                                                                                                        <label
                                                                                                            htmlFor="rdo_company_info_1">Visible</label>
                                                                                                    </div>
                                                                                                </li>
                                                                                                <li>
                                                                                                    <div
                                                                                                        className="filter-name-item">
                                                                                                        <input type="radio"
                                                                                                            onChange={this.handleChangeInput}
                                                                                                            name="showCompanyInfo"
                                                                                                            id="rdo_company_info_2" />
                                                                                                        <label
                                                                                                            htmlFor="rdo_company_info_2">Hidden</label>
                                                                                                    </div>
                                                                                                </li>
                                                                                            </React.Fragment>
                                                                                    }
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    {/*<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">*/}
                                                                    {/*    <div className="col-md-6">*/}
                                                                    {/*        <input id="is-sponsored"*/}
                                                                    {/*               type="checkbox"*/}
                                                                    {/*               name="isSponsored"*/}
                                                                    {/*               onChange={this.handleChangeInput}*/}
                                                                    {/*               defaultValue={this.jobPost.isSponsored}*/}
                                                                    {/*               className="checkbox"*/}
                                                                    {/*               required=""/>*/}
                                                                    {/*        <label htmlFor="is-sponsored" style={{margin: "0 9px"}}>*/}
                                                                    {/*            show sponsored*/}
                                                                    {/*        </label>*/}
                                                                    {/*    </div>*/}
                                                                    {/*</div>*/}

                                                                    <div
                                                                        className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="location">Job
                                                                                Location</label>
                                                                            {/*<select className="nice-select wide"*/}
                                                                            {/*        name="location" id="location">*/}
                                                                            {/*    <option value="Karachi">Karachi*/}
                                                                            {/*    </option>*/}
                                                                            {/*    <option*/}
                                                                            {/*        value="Islamabad">Islamabad*/}
                                                                            {/*    </option>*/}
                                                                            {/*    <option value="Lahore">Lahore*/}
                                                                            {/*    </option>*/}
                                                                            {/*</select>*/}

                                                                            {
                                                                                isJobApprove ?
                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                        <SelectCities
                                                                                            id="city"
                                                                                            value={this.state.selectedCity}
                                                                                            // value={this.jobPost.city}
                                                                                            onChange={this.handleSelectCity}
                                                                                            options={getCities}
                                                                                        /> :
                                                                                        <div
                                                                                            className="view-data-box">{this.state.selectedCity}</div>
                                                                                    : <SelectCities
                                                                                        id="city"
                                                                                        value={this.state.selectedCity}
                                                                                        // value={this.jobPost.city}
                                                                                        onChange={this.handleSelectCity}
                                                                                        options={getCities}
                                                                                    />
                                                                            }

                                                                            {/*{*/}
                                                                            {/*    getCities.length > 0 && (*/}
                                                                            {/*        <select id="city" className="nice-select wide"*/}
                                                                            {/*                name="city">*/}
                                                                            {/*            {dropDownSelection()}*/}
                                                                            {/*            <option value="">Select City</option>*/}
                                                                            {/*            {*/}
                                                                            {/*                getCities.map(({city}) => {*/}
                                                                            {/*                        return (*/}
                                                                            {/*                            <option*/}
                                                                            {/*                                value={city}>{city}</option>)*/}
                                                                            {/*                    }*/}
                                                                            {/*                )}*/}
                                                                            {/*        </select>*/}
                                                                            {/*    )*/}
                                                                            {/*}*/}
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    <div
                                                                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="location">Job
                                                                                Type</label>
                                                                            {/*<select className="nice-select wide"*/}
                                                                            {/*        name="employer_type"*/}
                                                                            {/*        id="employer_type">*/}
                                                                            {/*    <option value="Karachi">Full Time*/}
                                                                            {/*    </option>*/}
                                                                            {/*    <option value="Islamabad">Part*/}
                                                                            {/*        Time*/}
                                                                            {/*    </option>*/}
                                                                            {/*</select>*/}
                                                                            {
                                                                                isJobApprove ?
                                                                                    <span
                                                                                        className="mr-2 ml-2" style={{
                                                                                            background: "#b35bb3",
                                                                                            padding: "3px",
                                                                                            color: "white",
                                                                                            borderRadius: "4px",
                                                                                        }}>{isJobApproveData.type}</span> :
                                                                                    getJobTypes.length > 0 && (
                                                                                        <select id="type"
                                                                                            className="nice-select wide"
                                                                                            name="type"
                                                                                            onChange={this.handleChangeInput}>
                                                                                            {dropDownSelection()}
                                                                                            <option value="">Choose Type
                                                                                            </option>
                                                                                            {
                                                                                                getJobTypes.map((type) => {
                                                                                                    return (
                                                                                                        <option
                                                                                                            value={type}>{type}</option>)
                                                                                                }
                                                                                                )}
                                                                                        </select>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>


                                                                </div>
                                                            </div>
                                                            <div className="col-12">
                                                                <div className="custom-width-group">
                                                                    <h3>Job Detail</h3>
                                                                </div>
                                                                <div className="row">

                                                                    {/*<div className="col-lg-12">*/}
                                                                    {/*    /!*<!-- Single Input Start -->*!/*/}
                                                                    {/*    <div className="single-input mb-25">*/}
                                                                    {/*        <label htmlFor="job_information">Job Information</label>*/}
                                                                    {/*        <textarea name="jobInformation"*/}
                                                                    {/*                  onChange={this.handleChangeInput}*/}
                                                                    {/*                  defaultValue={this.jobPost.jobInformation}*/}
                                                                    {/*                  id="job_information"*/}
                                                                    {/*                  rows="2"/>*/}
                                                                    {/*    </div>*/}
                                                                    {/*    /!*<!-- Single Input End -->*!/*/}
                                                                    {/*</div>*/}

                                                                    <div className="col-lg-12">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="job_detail">Job Detail
                                                                                Description</label>
                                                                            {
                                                                                isJobApprove ?
                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                        <textarea name="description"
                                                                                            onChange={this.handleChangeInput}
                                                                                            defaultValue={this.jobPost.description}
                                                                                            id="job_detail"
                                                                                            rows="2" /> :
                                                                                        <div
                                                                                            className="view-data-box">{this.jobPost.description}</div>
                                                                                    : <textarea name="description"
                                                                                        onChange={this.handleChangeInput}
                                                                                        defaultValue={this.jobPost.description}
                                                                                        id="job_detail"
                                                                                        rows="2" />
                                                                            }

                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    {/*<div className="col-lg-12">*/}
                                                                    {/*    /!*<!-- Single Input Start -->*!/*/}
                                                                    {/*    <div className="single-input mb-25">*/}
                                                                    {/*        <label htmlFor="job_detail">Job*/}
                                                                    {/*            Place</label>*/}
                                                                    {/*        <div className="uploadImage">*/}
                                                                    {/*            <div className="change-image">Upload Picture*/}
                                                                    {/*            </div>*/}
                                                                    {/*            <input*/}
                                                                    {/*                accept=".jpg, .jpeg, .gif, .bmp, .png"*/}
                                                                    {/*                type="file"*/}
                                                                    {/*                title="Upload Picture"*/}
                                                                    {/*                onChange={this.handleCoverChange}/>*/}
                                                                    {/*            <img alt='#'*/}
                                                                    {/*                 src={upPic ? upPic : defaultUserImg}*/}
                                                                    {/*                 id="userImg"/>*/}
                                                                    {/*        </div>*/}
                                                                    {/*    </div>*/}
                                                                    {/*    /!*<!-- Single Input End -->*!/*/}
                                                                    {/*</div>*/}

                                                                    <div className="col-lg-12">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            {/* <label
                                                                                htmlFor="job_category">Category</label>
                                                                            {
                                                                                isJobApprove ?
                                                                                    <span
                                                                                        className="mr-2 ml-2" style={{
                                                                                            background: "#b35bb3",
                                                                                            padding: "3px",
                                                                                            color: "white",
                                                                                            borderRadius: "4px",
                                                                                        }}>{isJobApproveData.category}</span> :
                                                                                    getJobIndustries.length > 0 && (
                                                                                        <select id="category"
                                                                                            className="nice-select wide"
                                                                                            name="category">
                                                                                            {dropDownSelection()}
                                                                                            <option value="">Job By Category
                                                                                            </option>
                                                                                            {
                                                                                                getJobIndustries.map((type) => {
                                                                                                    return (
                                                                                                        <option
                                                                                                            value={type}>{type}</option>)
                                                                                                }
                                                                                                )}
                                                                                        </select>
                                                                                    )
                                                                            } */}
                                                                            {/*<select id="category" className="nice-select wide"*/}
                                                                            {/*        name="category"*/}
                                                                            {/*        onChange={this.handleChangeInput}*/}
                                                                            {/*        defaultValue={this.jobPost.category}*/}
                                                                            {/*        id="job_category">*/}
                                                                            {/*    <option*/}
                                                                            {/*        value="Accounting">Accounting*/}
                                                                            {/*    </option>*/}
                                                                            {/*    <option value="Banker">Banker*/}
                                                                            {/*    </option>*/}
                                                                            {/*    <option*/}
                                                                            {/*        value="Programmer">Programmer*/}
                                                                            {/*    </option>*/}
                                                                            {/*</select>*/}
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>
                                                                    <div className="col-6"></div>

                                                                    <div className="col-lg-12">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="title">Required
                                                                                Skills</label>
                                                                            {/*<input type="text" id="title"*/}
                                                                            {/*       name="title"/>*/}

                                                                            {
                                                                                isJobApprove ?
                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                        <Creatable
                                                                                            name="skills"
                                                                                            value={selectedOption}
                                                                                            isMulti
                                                                                            onChange={this.handleChangeSkills}
                                                                                            options={getJobSkills}
                                                                                        /> :
                                                                                        <div
                                                                                            className="view-data-box">{selectedOption.length > 0 && (selectedOption.map((s) => {
                                                                                                return s.label
                                                                                            }).join(" , "))}</div>
                                                                                    : <Creatable
                                                                                        name="skills"
                                                                                        value={selectedOption}
                                                                                        isMulti
                                                                                        onChange={this.handleChangeSkills}
                                                                                        options={getJobSkills}
                                                                                    />
                                                                            }

                                                                            <NavLink to="#" className="more-textbox"
                                                                                data-target="single-input"
                                                                                style={{
                                                                                    position: 'absolute',
                                                                                    right: ' -5px',
                                                                                    top: '35px'
                                                                                }}><i
                                                                                    className="fa fa-plus-circle" /></NavLink>
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}

                                                                    </div>

                                                                    <div className="col-lg-12">
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="job_information">Experience
                                                                                In
                                                                                Years</label>
                                                                            {
                                                                                isJobApprove ?
                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                        <select
                                                                                            className="nice-select wide ExperienceInYears"
                                                                                            name="ExperienceInYears"
                                                                                            defaultValue={this.jobPost.experienceInYears}
                                                                                            id="ExperienceInYears"
                                                                                            onChange={this.handleChangeInput}>
                                                                                            {dropDownSelection()}
                                                                                            <option value="">Select
                                                                                            </option>
                                                                                            <option value="-1">Fresh
                                                                                            </option>
                                                                                            <option value="0">Less than
                                                                                                1 Year
                                                                                            </option>
                                                                                            <option value="1">1 Year
                                                                                            </option>
                                                                                            <option value="2">2 Years
                                                                                            </option>
                                                                                            <option value="3">3 Years
                                                                                            </option>
                                                                                            <option value="4">4 Years
                                                                                            </option>
                                                                                            <option value="5">5 Years
                                                                                            </option>
                                                                                            <option value="6">6 Years
                                                                                            </option>
                                                                                            <option value="7">7 Years
                                                                                            </option>
                                                                                            <option value="8">8 Years
                                                                                            </option>
                                                                                            <option value="9">9 Years
                                                                                            </option>
                                                                                            <option value="10">10
                                                                                                Years
                                                                                            </option>
                                                                                            <option value="11">11
                                                                                                Years
                                                                                            </option>
                                                                                            <option value="12">12
                                                                                                Years
                                                                                            </option>
                                                                                            <option value="13">13
                                                                                                Years
                                                                                            </option>
                                                                                            <option value="14">14
                                                                                                Years
                                                                                            </option>
                                                                                            <option value="15">15
                                                                                                Years
                                                                                            </option>
                                                                                        </select> :
                                                                                        <div
                                                                                            className="view-data-box">{
                                                                                                this.jobPost.experienceInYears === 0 ?
                                                                                                    `Less then 1 year` :
                                                                                                    this.jobPost.experienceInYears === -1 ?
                                                                                                        `Fresher` : `${this.jobPost.experienceInYears} Years`
                                                                                            }</div>
                                                                                    :
                                                                                    <select className="nice-select wide"
                                                                                        name="ExperienceInYears"
                                                                                        defaultValue={this.jobPost.experienceInYears}
                                                                                        id="ExperienceInYears"
                                                                                        onChange={this.handleChangeInput}>
                                                                                        {dropDownSelection()}
                                                                                        <option value="">Select</option>
                                                                                        <option value="-1">Fresh
                                                                                        </option>
                                                                                        <option value="0">Less than 1
                                                                                            Year
                                                                                        </option>
                                                                                        <option value="1">1 Year
                                                                                        </option>
                                                                                        <option value="2">2 Years
                                                                                        </option>
                                                                                        <option value="3">3 Years
                                                                                        </option>
                                                                                        <option value="4">4 Years
                                                                                        </option>
                                                                                        <option value="5">5 Years
                                                                                        </option>
                                                                                        <option value="6">6 Years
                                                                                        </option>
                                                                                        <option value="7">7 Years
                                                                                        </option>
                                                                                        <option value="8">8 Years
                                                                                        </option>
                                                                                        <option value="9">9 Years
                                                                                        </option>
                                                                                        <option value="10">10 Years
                                                                                        </option>
                                                                                        <option value="11">11 Years
                                                                                        </option>
                                                                                        <option value="12">12 Years
                                                                                        </option>
                                                                                        <option value="13">13 Years
                                                                                        </option>
                                                                                        <option value="14">14 Years
                                                                                        </option>
                                                                                        <option value="15">15 Years
                                                                                        </option>
                                                                                    </select>
                                                                            }

                                                                        </div>
                                                                    </div>

                                                                    {/*<div className="col-lg-12">*/}
                                                                    {/*    /!*<!-- Single Input Start -->*!/*/}
                                                                    {/*    <div className="single-input mb-25">*/}
                                                                    {/*        <label htmlFor="job_detail">Add*/}
                                                                    {/*            Skills</label>*/}
                                                                    {/*        <input type="text"*/}
                                                                    {/*               className="js-example-basic-single w-100"*/}
                                                                    {/*               id="ee-school"*/}
                                                                    {/*               placeholder="School"*/}
                                                                    {/*               value="School"/>*/}
                                                                    {/*    </div>*/}
                                                                    {/*    /!*<!-- Single Input End -->*!/*/}
                                                                    {/*</div>*/}


                                                                    <div className="col-lg-12">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="job_information">Salary
                                                                                Range</label>
                                                                            {/*<div className="row">*/}
                                                                            {/*    <div className="col-3">*/}
                                                                            {/*        <div className="input-group">*/}
                                                                            {/*            <span className="pr-1 pt-1"*/}
                                                                            {/*                  htmlFor="from_amount">From</span>*/}
                                                                            {/*            <input type="number"*/}
                                                                            {/*                   className="form-control"*/}
                                                                            {/*                   id="from_amount"*/}
                                                                            {/*                   onChange={this.handleChangeInput}*/}
                                                                            {/*                   defaultValue={this.jobPost.salaryRangeFrom}*/}
                                                                            {/*                   name="salaryRangeFrom"*/}
                                                                            {/*            />*/}
                                                                            {/*            <div*/}
                                                                            {/*                className="input-group-append">*/}
                                                                            {/*                                    <span*/}
                                                                            {/*                                        className="input-group-text"*/}
                                                                            {/*                                        id="basic-addon2">PKR</span>*/}
                                                                            {/*            </div>*/}
                                                                            {/*        </div>*/}
                                                                            {/*    </div>*/}
                                                                            {/*    <div className="col-3 pl-0">*/}
                                                                            {/*        <div className="input-group">*/}
                                                                            {/*                            <span*/}
                                                                            {/*                                className="text-center pt-1 pr-1"*/}
                                                                            {/*                                htmlFor="from_amount">To</span>*/}
                                                                            {/*            <input type="number"*/}
                                                                            {/*                   className="form-control"*/}
                                                                            {/*                   id="from_amount"*/}
                                                                            {/*                   onChange={this.handleChangeInput}*/}
                                                                            {/*                   defaultValue={this.jobPost.salaryRangeTo}*/}
                                                                            {/*                   name="salaryRangeTo"*/}
                                                                            {/*            />*/}
                                                                            {/*            <div*/}
                                                                            {/*                className="input-group-append">*/}
                                                                            {/*                                    <span*/}
                                                                            {/*                                        className="input-group-text"*/}
                                                                            {/*                                        id="basic-addon2">PKR</span>*/}
                                                                            {/*            </div>*/}
                                                                            {/*        </div>*/}
                                                                            {/*    </div>*/}
                                                                            {/*</div>*/}

                                                                            {
                                                                                isJobApprove ?
                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                        <select
                                                                                            className="nice-select wide"
                                                                                            name="salaryRange"
                                                                                            defaultValue={this.jobPost.salaryRange}
                                                                                            id="salaryRange"
                                                                                            onChange={this.handleChangeInput}>
                                                                                            {dropDownSelection()}
                                                                                            <option value="">Select
                                                                                            </option>
                                                                                            <option value="1">0 -
                                                                                                15,000
                                                                                            </option>
                                                                                            <option value="2">16000 -
                                                                                                30,000
                                                                                            </option>
                                                                                            <option value="3">31,000 -
                                                                                                50,000
                                                                                            </option>
                                                                                            <option value="4">51,000 -
                                                                                                70,000
                                                                                            </option>
                                                                                            <option value="5">71,000 -
                                                                                                90,000
                                                                                            </option>
                                                                                            <option value="6">91,000 -
                                                                                                130,000
                                                                                            </option>
                                                                                            <option value="7">161,000
                                                                                                and above
                                                                                            </option>
                                                                                        </select>
                                                                                        :
                                                                                        <div
                                                                                            className="view-data-box">{
                                                                                                getSalaryRange(this.jobPost.salaryRange)
                                                                                            }</div>
                                                                                    :
                                                                                    <select className="nice-select wide"
                                                                                        name="salaryRange"
                                                                                        defaultValue={this.jobPost.salaryRange}
                                                                                        id="salaryRange"
                                                                                        onChange={this.handleChangeInput}>
                                                                                        {dropDownSelection()}
                                                                                        <option value="">Select</option>
                                                                                        <option value="1">0 - 15,000
                                                                                        </option>
                                                                                        <option value="2">16000 - 30,000
                                                                                        </option>
                                                                                        <option value="3">31,000 -
                                                                                            50,000
                                                                                        </option>
                                                                                        <option value="4">51,000 -
                                                                                            70,000
                                                                                        </option>
                                                                                        <option value="5">71,000 -
                                                                                            90,000
                                                                                        </option>
                                                                                        <option value="6">91,000 -
                                                                                            130,000
                                                                                        </option>
                                                                                        <option value="7">161,000 and
                                                                                            above
                                                                                        </option>
                                                                                    </select>
                                                                            }
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    <div className="col-lg-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="no_of_vacancy">Number of
                                                                                vacancies</label>
                                                                            {
                                                                                isJobApprove ?
                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                        <input type="number"
                                                                                            id="no_of_vacancy"
                                                                                            onChange={this.handleChangeInput}
                                                                                            defaultValue={this.jobPost.numberOfVacancy}
                                                                                            name="numberOfVacancy"
                                                                                        />
                                                                                        :
                                                                                        <div
                                                                                            className="view-data-box">{this.jobPost.numberOfVacancy}</div>
                                                                                    :
                                                                                    <input type="number"
                                                                                        id="no_of_vacancy"
                                                                                        onChange={this.handleChangeInput}
                                                                                        defaultValue={this.jobPost.numberOfVacancy}
                                                                                        name="numberOfVacancy"
                                                                                    />

                                                                            }

                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    <div className="col-lg-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label
                                                                                htmlFor="qualification">Desired
                                                                                Qualification</label>
                                                                            {/*<select className="nice-select wide"*/}
                                                                            {/*        name="qualification"*/}
                                                                            {/*        onChange={this.handleChangeInput}*/}
                                                                            {/*        defaultValue={this.jobPost.qualification}*/}
                                                                            {/*        id="qualification">*/}
                                                                            {/*    <option value="Matric">Matric*/}
                                                                            {/*    </option>*/}
                                                                            {/*    <option value="Inter">Inter</option>*/}
                                                                            {/*    <option value="B.A">B.A</option>*/}
                                                                            {/*</select>*/}

                                                                            {
                                                                                isJobApprove ?
                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                        getJobQualification.length > 0 && (
                                                                                            <select
                                                                                                className="nice-select wide"
                                                                                                name="qualification"
                                                                                                defaultValue={this.jobPost.qualification}
                                                                                                id="qualification"
                                                                                                onChange={this.handleChangeInput}>
                                                                                                {dropDownSelection()}
                                                                                                <option value="">Choose
                                                                                                    Qualification
                                                                                                </option>
                                                                                                {
                                                                                                    getJobQualification.map((type) => {
                                                                                                        return (
                                                                                                            <option
                                                                                                                value={type}>{type}</option>)
                                                                                                    }
                                                                                                    )}
                                                                                            </select>
                                                                                        ) :
                                                                                        <div
                                                                                            className="view-data-box">{this.jobPost.qualification}</div>
                                                                                    : getJobQualification.length > 0 && (
                                                                                        <select className="nice-select wide"
                                                                                            name="qualification"
                                                                                            defaultValue={this.jobPost.qualification}
                                                                                            id="qualification"
                                                                                            onChange={this.handleChangeInput}>
                                                                                            {dropDownSelection()}
                                                                                            <option value="">Choose
                                                                                                Qualification
                                                                                            </option>
                                                                                            <option
                                                                                                value="PhD">PhD
                                                                                            </option>
                                                                                            <option
                                                                                                value="Masters">Masters
                                                                                            </option>
                                                                                            <option
                                                                                                value="Bachelors">Bachelors
                                                                                            </option>
                                                                                            <option
                                                                                                value="Intermediate">Intermediate
                                                                                            </option>
                                                                                            <option
                                                                                                value="Matric">Matric
                                                                                            </option>
                                                                                        </select>
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    <div
                                                                        className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-inputa mb-25">
                                                                            <label
                                                                                htmlFor="job_features">Facilities
                                                                                Provided</label>
                                                                            <div className="skill-check-box ">
                                                                                <ul className="skill-cbx-list">
                                                                                    <li>
                                                                                        <div
                                                                                            className="filter-name-item">
                                                                                            {
                                                                                                isJobApprove ?
                                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                                        <input
                                                                                                            type="checkbox"
                                                                                                            defaultChecked={this.jobPost.accommodation}
                                                                                                            onChange={this.handleChangeInput}
                                                                                                            name="accommodation"
                                                                                                            id="job_features1" />
                                                                                                        :
                                                                                                        <div
                                                                                                            className="view-data-box">{this.jobPost.accommodation ? "Yes" : "No"}</div>
                                                                                                    :
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        defaultChecked={this.jobPost.accommodation}
                                                                                                        onChange={this.handleChangeInput}
                                                                                                        name="accommodation"
                                                                                                        id="job_features1" />

                                                                                            }

                                                                                            <label
                                                                                                htmlFor="job_features1">Accommodation</label>
                                                                                        </div>
                                                                                    </li>
                                                                                    <li>
                                                                                        <div
                                                                                            className="filter-name-item">
                                                                                            {
                                                                                                isJobApprove ?
                                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                                        <input
                                                                                                            type="checkbox"
                                                                                                            defaultChecked={this.jobPost.pickAndDrop}
                                                                                                            name="pickAndDrop"
                                                                                                            onChange={this.handleChangeInput}
                                                                                                            id="job_features2" />
                                                                                                        :
                                                                                                        <div
                                                                                                            className="view-data-box">{this.jobPost.pickAndDrop ? "Yes" : "No"}</div>
                                                                                                    :
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        defaultChecked={this.jobPost.pickAndDrop}
                                                                                                        name="pickAndDrop"
                                                                                                        onChange={this.handleChangeInput}
                                                                                                        id="job_features2" />

                                                                                            }

                                                                                            <label
                                                                                                htmlFor="job_features2">Pick
                                                                                                & Drop</label>
                                                                                        </div>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>
                                                                    <div className="col-6"></div>
                                                                    <div className="col-lg-5">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="job_information">Job
                                                                                Timings</label>
                                                                            <div className="row">
                                                                                {
                                                                                    isJobApprove ?
                                                                                        <span
                                                                                            className="ml-2 mr-2">{isJobApproveData.jobTimings}</span>
                                                                                        : <React.Fragment>
                                                                                            <div className="col-4 pr-0">
                                                                                                <input type="time"
                                                                                                    id="title"
                                                                                                    // onChange={this.handleChangeInput}
                                                                                                    onChange={(ev) => this.setState({
                                                                                                        jobTimings1: onTimeChange(ev.target.value)
                                                                                                    })}
                                                                                                    defaultValue={this.state.jobTimings1}
                                                                                                    name="jobTimings1" />
                                                                                            </div>
                                                                                            <div
                                                                                                className="col-2 text-center">
                                                                                                <label
                                                                                                    className="pt-10">To</label>
                                                                                            </div>
                                                                                            <div className="col-4 pl-0">
                                                                                                <input type="time"
                                                                                                    id="title"
                                                                                                    onChange={(ev) => this.setState({
                                                                                                        jobTimings2: onTimeChange(ev.target.value)
                                                                                                    })}
                                                                                                    defaultValue={this.state.jobTimings2}
                                                                                                    name="jobTimings2" />
                                                                                            </div>
                                                                                        </React.Fragment>
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>
                                                                    <div className="col-lg-4">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="job_information">Preferred
                                                                                age group</label>
                                                                            <div className="row">
                                                                                {
                                                                                    isJobApprove ?
                                                                                        <span
                                                                                            className="mr-2 ml-2">{isJobApproveData.preferredAgeGroup}</span>
                                                                                        :
                                                                                        <React.Fragment>
                                                                                            <div className="col-4 pr-0">
                                                                                                <input type="number"
                                                                                                    id="title"
                                                                                                    name="preferredAgeGroup"
                                                                                                    onChange={(ev) => this.setState({
                                                                                                        preferredAgeGroup1: ev.target.value
                                                                                                    })}
                                                                                                    defaultValue={this.state.preferredAgeGroup1}
                                                                                                />
                                                                                            </div>
                                                                                            <div
                                                                                                className="col-2 text-center">
                                                                                                <label
                                                                                                    className="pt-10">To</label>
                                                                                            </div>
                                                                                            <div className="col-4 pl-0">
                                                                                                <input type="number"
                                                                                                    id="title"
                                                                                                    name="preferredAgeGroup"
                                                                                                    onChange={(ev) => this.setState({
                                                                                                        preferredAgeGroup2: ev.target.value
                                                                                                    })}
                                                                                                    defaultValue={this.state.preferredAgeGroup2}
                                                                                                />
                                                                                            </div>
                                                                                        </React.Fragment>
                                                                                }

                                                                            </div>
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>
                                                                    <div className="col-lg-3">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="qualification">Working
                                                                                days in a week</label>
                                                                            {
                                                                                isJobApprove ?
                                                                                    // getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                        <select id="workingDays"
                                                                                            className="nice-select wide"
                                                                                            name="workingDays"
                                                                                            onChange={this.handleChangeInput}
                                                                                        >
                                                                                            <option value="1">1</option>
                                                                                            <option value="2">2</option>
                                                                                            <option value="3">3</option>
                                                                                            <option value="4">4</option>
                                                                                            <option selected
                                                                                                value="5">5
                                                                                            </option>
                                                                                            <option value="6">6</option>
                                                                                            <option value="7">7</option>
                                                                                        </select>
                                                                                        :
                                                                                        <div
                                                                                            className="view-data-box">{this.jobPost.workingDays}</div>
                                                                                    :
                                                                                    <select id="workingDays"
                                                                                        className="nice-select wide"
                                                                                        name="workingDays"
                                                                                        onChange={this.handleChangeInput}
                                                                                    >
                                                                                        <option value="1">1</option>
                                                                                        <option value="2">2</option>
                                                                                        <option value="3">3</option>
                                                                                        <option value="4">4</option>
                                                                                        <option selected value="5">5
                                                                                        </option>
                                                                                        <option value="6">6</option>
                                                                                        <option value="7">7</option>
                                                                                    </select>

                                                                            }

                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    <div
                                                                        className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div
                                                                            className="d-flex flex-column single-input mb-25">
                                                                            <label htmlFor="date">Select Job Post
                                                                                Date</label>
                                                                            {
                                                                                isJobApprove ?
                                                                                    //getUserData().type !== STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?
                                                                                        <input type="date"
                                                                                            onChange={this.handleChangeInput}
                                                                                            id="date"
                                                                                            name="jobPostDate"
                                                                                            // defaultValue={this.jobPost.jobPostDate}
                                                                                            defaultValue={setCurrentDateFormat(isJobApproveData.jobPostDate)}
                                                                                            placeholder="Post Date" /> :
                                                                                        <span className="mr-2 ml-2">{parseDateWithoutTime(parseDate(new Date(isJobApproveData.jobPostDate)))}</span>

                                                                                    //: <span className="mr-2 ml-2">{parseDateWithoutTime(parseDate(new Date(isJobApproveData.jobPostDate)))}</span>
                                                                                    :
                                                                                    <input type="date"
                                                                                        onChange={this.handleChangeInput}
                                                                                        id="date" name="jobPostDate"
                                                                                        // defaultValue={this.jobPost.jobPostDate}
                                                                                        defaultValue={currentDateFormat()}
                                                                                        placeholder="Post Date" />
                                                                            }

                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    <div
                                                                        className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div
                                                                            className={`${isJobApprove && `d-flex flex-column`} single-input mb-25`}>
                                                                            <label htmlFor="date">Select Last Date
                                                                                Of Submission</label>
                                                                            {
                                                                                isJobApprove ?
                                                                                    // getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE
                                                                                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE ?

                                                                                        <input type="date"
                                                                                            onChange={this.handleChangeInput}
                                                                                            id="date"
                                                                                            name="lastDatePosting"
                                                                                            // defaultValue={this.jobPost.jobPostDate}
                                                                                            defaultValue={setCurrentDateFormat(isJobApproveData.lastDatePosting)}
                                                                                            placeholder="Post Date" /> : <span
                                                                                                className="mr-2 ml-2">{parseDateWithoutTime(parseDate(new Date(isJobApproveData.lastDatePosting)))}</span>
                                                                                    // <span className="mr-2 ml-2">{parseDateWithoutTime(parseDate(new Date(isJobApproveData.lastDatePosting)))}</span>
                                                                                    :
                                                                                    <input type="date" id="date"
                                                                                        name="lastDatePosting"
                                                                                        onChange={this.handleChangeInput}
                                                                                        // defaultValue={this.jobPost.lastDatePosting}
                                                                                        defaultValue={currentDateFormat(((new Date().getDate() + 15)))}
                                                                                        placeholder="Last Date" />
                                                                            }
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>




                                                                </div>
                                                            </div>

                                                            {/*<div className="col-12">*/}
                                                            {/*    <div className="custom-width-group">*/}
                                                            {/*        <h3>Application Options</h3>*/}
                                                            {/*    </div>*/}
                                                            {/*    <div className="row">*/}
                                                            {/*        <div className="col-12">*/}
                                                            {/*            <p>How would you like to received your*/}
                                                            {/*                application</p>*/}
                                                            {/*        </div>*/}

                                                            {/*        <div className="col-lg-6">*/}
                                                            {/*            /!*<!-- Single Input Start -->*!/*/}
                                                            {/*            <div className="single-input mb-25">*/}
                                                            {/*                <label htmlFor="job_information">Received*/}
                                                            {/*                    Application By</label>*/}
                                                            {/*                <select className="nice-select wide"*/}
                                                            {/*                        name="job_category"*/}
                                                            {/*                        id="job_category">*/}
                                                            {/*                    <option value="Email">Email</option>*/}
                                                            {/*                    <option value="Insite">Insite*/}
                                                            {/*                    </option>*/}
                                                            {/*                    <option value="Both">Both</option>*/}
                                                            {/*                </select>*/}
                                                            {/*            </div>*/}
                                                            {/*            /!*<!-- Single Input End -->*!/*/}
                                                            {/*        </div>*/}

                                                            {/*        <div className="col-lg-6">*/}
                                                            {/*            /!*<!-- Single Input Start -->*!/*/}
                                                            {/*            <div className="single-input mb-25">*/}
                                                            {/*                <label htmlFor="job_detail">Email*/}
                                                            {/*                    Address</label>*/}
                                                            {/*                <input type="text" id="title"*/}
                                                            {/*                       name="title"/>*/}
                                                            {/*            </div>*/}
                                                            {/*            /!*<!-- Single Input End -->*!/*/}
                                                            {/*        </div>*/}
                                                            {/*    </div>*/}

                                                            {/*</div>*/}

                                                        </div>
                                                        {
                                                            this.props.data !== undefined ?
                                                                // this.props.data.status === "Waiting for Approval" &&
                                                                //getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE || getUserData().type === STRINGS.USER_TYPE.COMPANY_TYPE &&
                                                                (
                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="profile-action-btn">
                                                                                <button
                                                                                    onClick={(e) => this.handleSubmitJobPost(e, true)}
                                                                                    className="ht-btn theme-btn theme-btn-two"> Save & Update
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="profile-action-btn">
                                                                                <button
                                                                                    onClick={this.handleSubmitJobPost}
                                                                                    className="ht-btn theme-btn theme-btn-two"> Save
                                                                                    & Update
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )

                                                        }
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) :
                                <div className="spinner-holder">
                                    <Spinner type={"Puff"} />
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(JobPost);