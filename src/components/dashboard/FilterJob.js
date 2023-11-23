import React, {useEffect, useState} from 'react';
import SelectCities from "../AutoComplete/SelectCities";
// import {API} from "../../utils/services";
import {pkCities} from "../../utils/pk";
import {dropDownSelection} from "../../utils/base";
import {API} from "../../utils/services";
import $ from "jquery";

const defaultState = {
    Company:"",
    City: "",
    Title: "",
    type:"",
    Email: "",
    Phone: "",
    Education: "",
    Skill: "",
    ExperienceinYears: "",
}
const defaultStateSetting = {
    getJobQualification: [],
    getCities: [],
    getJobSkills: [],
}

const Filters = (props) => {
    const {onFilter,isCompany} = props;
    const [form, setForm] = useState(defaultState);
    const [defaultSetting, setDefaultSetting] = useState(defaultStateSetting);

    useEffect(() => {

        const getAllDefaultData = async () => {
            const data_1 = await API.SETTINGS.getJobSkills().then((response) => {
                //console.log("types", response)
                let {status, error, data} = response;
                if (status) {
                    return data
                    // setDefaultSetting({
                    //     ...defaultSetting,
                    //     getJobSkills: data
                    // })
                } else {
                    alert(error)
                }
            }).catch((err) => {
                alert(err)
            })

            const data_2 = await API.SETTINGS.getJobQualification().then((response) => {
                //console.log("types", response)
                let {status, error, data} = response;
                if (status) {
                    return data
                    // setDefaultSetting({
                    //     ...defaultSetting,
                    //     getJobQualification: data
                    // })
                } else {
                    alert(error)
                }
            }).catch((err) => {
                alert(err)
            })

            setDefaultSetting({
                ...defaultSetting,
                getJobSkills: data_1,
                getJobQualification: data_2,
                getCities: pkCities
            })

        }
        getAllDefaultData();

    }, [])


    const handleSelectCity = (selectedOption) => {
        setForm({
            ...form,
            City: selectedOption
        })
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleFilter = () => {
        // console.log("filterHandle", {
        //         ...form,
        //         Education: $("#Education").val(),
        //         Skill: $("#skill").val(),
        //         ExperienceinYears: parseInt($("#ExperienceInYears").val())
        //     }
        // )
        onFilter({
            ...form,
            Education: $("#Education").val(),
            Skill: $("#skill").val(),
            ExperienceinYears: parseInt($("#ExperienceInYears").val())
        })
    }

    // const handleReset = () => {
    //     onFilter(form)
    // }


    return (
        <div className="d-flex w-100 justify-content-center align-items-center">
            <div className="d-flex w-100 flex-column">
                <div className="row" style={{margin: "0"}}>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="single-input">
                            <label htmlFor="title">Job Title</label>
                            <input type="text" id="title"
                                   name="Title"
                                   onChange={handleChange}
                                   defaultValue={form.Title}
                                   placeholder="Job Title"/>
                        </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="single-input">
                            <label htmlFor="company">Employer</label>
                            <input type="text" id="company"
                                   name="Company"
                                   onChange={handleChange}
                                   defaultValue={form.Company}
                                   placeholder="Employer"/>
                        </div>
                    </div>
                    
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="single-input">
                            <label htmlFor="city">City</label>
                            <SelectCities
                                id="city"
                                value={form.City}
                                onChange={handleSelectCity}
                                options={defaultSetting.getCities}
                            />
                        </div>
                    </div>

                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="single-input">
                            <label htmlFor="type">Job Type</label>
                            <input type="text" id="type"
                                   name="type"
                                   onChange={handleChange}
                                   defaultValue={form.type}
                                   placeholder="Job Type"/>
                        </div>
                    </div>

                    {
                        isCompany === undefined && (
                            <React.Fragment>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div className="single-input">
                                        <label htmlFor="email">Phone Number</label>
                                        <input type="number"
                                               placeholder="Phone Number"
                                               defaultValue={form.Phone}
                                               onChange={handleChange}
                                               name="Phone"/>
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div className="single-input">
                                        <label htmlFor="email">Education</label>
                                        {
                                            defaultSetting.getJobQualification.length > 0 && (
                                                <select className="nice-select wide"
                                                        name="Education"
                                                        defaultValue={form.Education}
                                                        id="Education"
                                                        onChange={(e) => {
                                                            setForm({
                                                                ...form,
                                                                Education: e.target.value
                                                            })
                                                        }}
                                                >
                                                    {dropDownSelection()}
                                                    <option value="">Choose Education
                                                    </option>
                                                    {
                                                        defaultSetting.getJobQualification.map((type) => {
                                                                return (
                                                                    <option
                                                                        value={type}>{type}</option>)
                                                            }
                                                        )}
                                                </select>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div className="single-input">
                                        <label htmlFor="email">Skills</label>
                                        {
                                            defaultSetting.getJobSkills.length > 0 && (
                                                <select className="nice-select wide" id="skill">
                                                    {dropDownSelection()}
                                                    <option value="">Choose Skills</option>
                                                    {
                                                        defaultSetting.getJobSkills.map((type) => {
                                                                return (
                                                                    <option value={type}>{type}</option>)
                                                            }
                                                        )}
                                                </select>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                    <div className="single-input">
                                        <label htmlFor="email">Experience in years</label>
                                        <select className="nice-select wide"
                                                name="ExperienceInYears"
                                                defaultValue={form.ExperienceinYears}
                                                id="ExperienceInYears"
                                                onChange={(e) => {
                                                    setForm({
                                                        ...form,
                                                        ExperienceinYears: e.target.value
                                                    })
                                                }}>
                                            {dropDownSelection()}
                                            <option value="">Select</option>
                                            <option value="-1">Fresh</option>
                                            <option value="0">Less than 1 Year</option>
                                            <option value="1">1 Year</option>
                                            <option value="2">2 Years</option>
                                            <option value="3">3 Years</option>
                                            <option value="4">4 Years</option>
                                            <option value="5">5 Years</option>
                                            <option value="6">6 Years</option>
                                            <option value="7">7 Years</option>
                                            <option value="8">8 Years</option>
                                            <option value="9">9 Years</option>
                                            <option value="10">10 Years</option>
                                            <option value="11">11 Years</option>
                                            <option value="12">12 Years</option>
                                            <option value="13">13 Years</option>
                                            <option value="14">14 Years</option>
                                            <option value="15">15 Years</option>
                                        </select>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }

                </div>
                <div className="row" style={{margin: "0"}}>
                    <div className="col-12" style={{marginTop: "1rem"}}>
                        <div className="profile-action-btn">
                            <button
                                onClick={handleFilter}
                                className="ht-btn theme-btn theme-btn-two w-100"> Filter
                            </button>
                            {/*<button*/}
                            {/*    onClick={handleReset}*/}
                            {/*    className="ht-btn theme-btn theme-btn-two ml-2"> Reset*/}
                            {/*</button>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filters;