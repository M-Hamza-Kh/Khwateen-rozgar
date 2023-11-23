import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons/faAngleLeft";
import {faAngleRight, faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {STRINGS} from "../../utils/base";
import {API} from "../../utils/services";
import Spinner from "../spinner";
import {FormControl, IconButton, InputLabel, MenuItem, Select} from "@material-ui/core";
import AddSettingsModal from "./modals/AddSettingsModal";
import AddBoxIcon from '@material-ui/icons/AddBox';
import ConfirmModal from "./modals/confirmModal";

class Settings extends Component {
    location = React.createRef();
    filter = {
        type: "",
        page: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            settingsList: [],
            uniqueTypes: {},
            setting: "",
            isResponse: false,
            openComposer: false,
            settingDefaultValue: null,
            settingDefaultType: null,
            pageNo: this.filter.page,
            selected_id: STRINGS.DEFAULTS.guid,
            openConfirmDialog: false
        }
    }

    componentDidMount() {
        this.getAllSettingsUniques();

    }

    handleOnChangeSetting = (ev) => {
        this.setState({
            setting: ev.target.value
        });
        this.filter.type = ev.target.value
        this.getAllSettings(this.filter);
    }


    getAllSettingsUniques = () => {
        API.SETTINGS.getUniqueSetting().then(({status, data, error}) => {
            if (status) {
                //console.log("jbl", data);
                this.setState({
                    uniqueTypes: data.uniqueTypes,
                    setting: data.uniqueTypes[0],
                    settingDefaultType: data.uniqueTypes[0]
                });
                this.filter.type = data.uniqueTypes[0];
                this.filter.page = 1;
                this.setState({
                    pageNo: this.filter.page
                })
                this.getAllSettings(this.filter);
            }
        }).catch((err) => {
            alert(err)
        })
    }

    getAllSettings = (filter) => {
        this.setState({
            isResponse: true
        })
        //console.log("page", filter)
        API.ADMIN.getAllSettingsData(filter).then((response) => {
            let {status, data, error} = response;
            console.log("jbl", response)
            if (status) {
                this.setState({
                    settingsList: data,
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

    onConfirm = (id) => {
        API.SETTINGS.deleteSettings(id).then(({status, error, data}) => {
            if (status) {
                this.getAllSettings(this.filter)
            } else {
                alert(error)
            }
        }).catch((err) => alert(err))
    }

    handleDeleteSetting = (id) => {
        this.setState({
            selected_id: id,
            openConfirmDialog: true
        })

    }

    handleAddSetting = (obj, type, prevValue) => {
        if (type === 1) {
            API.SETTINGS.addSettings(obj).then(({status, error, data}) => {
                if (status) {
                    // if (type === 1) {
                    //     this.setState({
                    //         settingsList: [data.name, ...this.state.settingsList]
                    //     });
                    // }
                    this.getAllSettings(this.filter)
                } else {
                    alert(error)
                }
            }).catch((err) => alert(err))
        } else {
            console.log("update", prevValue)
            API.SETTINGS.updateSettings(prevValue.id, {
                ...prevValue,
                name: obj.Name,
                type: obj.Type
            }).then(({status, error, data}) => {
                if (status) {
                    this.getAllSettings(this.filter)
                    // let newSettingList = this.state.settingsList.filter((d)=> d !== prevValue)
                    // this.setState({
                    //     settingsList: [data.name,...newSettingList]
                    // });
                } else {
                    alert(error)
                }
            }).catch((err) => alert(err))

        }
    }

    handlePaging = (page) => {
        if (page > 0) {
            // console.log("iter-page", page);
            // console.log("filter-page", this.filter.page);
            // console.log("state-page", this.state.pageNo);
            this.setState({
                pageNo: this.filter.page
            })
            this.getAllSettings(this.filter)
        }
    }

    render() {
        let {settingsList, isResponse, uniqueTypes, setting, openComposer, settingDefaultValue, settingDefaultType, pageNo, selected_id, openConfirmDialog} = this.state;
        //console.log("settings", settingsList)
        return (
            <div className="col-xl-10 col-lg-9">
                {openConfirmDialog &&
                (<ConfirmModal id={selected_id} onSave={this.onConfirm} onClose={() => this.setState({
                    selected_id: STRINGS.DEFAULTS.guid,
                    openConfirmDialog: false
                })}/>)
                }
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h1>Settings</h1>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-overview">
                        <div className="row">
                            <div className="col-xl-12 col-12">
                                <div className="submited-applications mb-50">
                                    <div className="applications-heading">
                                        <div className="set-drop">
                                            {/*{*/}
                                            {/*    isResponse &&*/}
                                            {/*    uniqueTypes.length > 0 && (*/}
                                            {/*        <select className="nice-select wide"*/}
                                            {/*                name="location" id="location" onChange={this.handleOnChangeSetting}>*/}
                                            {/*            {*/}
                                            {/*                dropDownSelection()*/}
                                            {/*            }*/}
                                            {/*            {*/}
                                            {/*                uniqueTypes.map((ut,index) => {*/}
                                            {/*                        return (<option key={index} value={ut}>{ut}</option>)*/}
                                            {/*                    }*/}
                                            {/*                )*/}
                                            {/*            }*/}
                                            {/*        </select>*/}
                                            {/*    )*/}
                                            {/*}*/}
                                            <FormControl style={{
                                                display: "flex",
                                                width: "100%",
                                                color: `${STRINGS.TYPES.COLORS.DEFAULT}`
                                            }}>
                                                <InputLabel id="demo-simple-select-label"
                                                            style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}>Types</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={setting}
                                                    style={{borderBottomColor: `${STRINGS.TYPES.COLORS.DEFAULT}`}}
                                                    onChange={this.handleOnChangeSetting}
                                                >{
                                                    uniqueTypes.length > 0 && (
                                                        uniqueTypes.map((ut, index) => {
                                                                return (<MenuItem key={index} value={ut}>{ut}</MenuItem>)
                                                            }
                                                        )
                                                    )
                                                }
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="flex">
                                            <IconButton className="pl-10" onClick={() => this.setState({
                                                openComposer: true,
                                                settingDefaultType: setting
                                            })}>
                                                <AddBoxIcon style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}/>
                                            </IconButton>
                                        </div>
                                    </div>
                                    <div className="applications-main-block">
                                        <div className="applications-table ov-des" style={{
                                            position: `${isResponse ? "relative" : "initial"}`,
                                            height: `${isResponse ? "100%" : "initial"}`
                                        }}>
                                            <table className="table"
                                                   style={{
                                                       width: '100%',
                                                       height: `${isResponse ? "initial" : "100vh"}`
                                                   }}>
                                                <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th className="text-center">Update</th>
                                                    <th className="text-center">Delete</th>
                                                </tr>
                                                </thead>
                                                <tbody style={{height: "100vh", textAlign: "center"}}>
                                                {
                                                    isResponse ?
                                                        settingsList.length > 0 ?
                                                            settingsList.map((jl) =>
                                                                <tr className="application-item" key={jl.id}>
                                                                    <td className="application-employer"
                                                                        style={{textAlign: "start"}}>
                                                                        {jl.name}
                                                                    </td>
                                                                    <td className="view-application-pop text-center">
                                                                        <NavLink
                                                                            to="#"
                                                                            onClick={() => this.setState({
                                                                                settingDefaultValue: jl,
                                                                                openComposer: true,
                                                                                settingDefaultType: setting
                                                                            })}
                                                                            className="text-decoration-none"><FontAwesomeIcon
                                                                            icon={faPencilAlt}
                                                                            className="lnr lnr-eye"/><span> Edit</span></NavLink>
                                                                    </td>
                                                                    <td className="view-application-pop text-center">
                                                                        <NavLink
                                                                            to="#"
                                                                            onClick={() => this.handleDeleteSetting(jl.id)}
                                                                            className="text-decoration-none"><FontAwesomeIcon
                                                                            icon={faPencilAlt}
                                                                            className="lnr lnr-eye"/><span> Delete</span></NavLink>
                                                                    </td>
                                                                </tr>
                                                            ) : <tr>
                                                                <td>No Data Found</td>
                                                                <td>No Data Found</td>
                                                                <td>No Data Found</td>
                                                            </tr>
                                                        :
                                                        <tr>
                                                            <td>
                                                                <div className="spinner-holder"
                                                                     style={{position: "absolute"}}>
                                                                    <Spinner width={100} height={100} type={"Puff"}/>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="application-pagination mb-30">
                                            <div className="row">
                                                <div className="col-12">
                                                    <ul className="page-pagination justify-content-center">
                                                        <li
                                                            onClick={() => this.handlePaging(this.filter.page--)}
                                                        ><NavLink to="#"
                                                        ><FontAwesomeIcon
                                                            icon={faAngleLeft}
                                                            className="fa fa-angle-left"/></NavLink></li>
                                                        <li className={`${this.filter.page === pageNo && "active"}`}
                                                            // onClick={() => this.handlePaging(pageNo)}
                                                        ><NavLink to="#">{pageNo}</NavLink>
                                                        </li>
                                                        <li className={`${this.filter.page === pageNo + 1 && "active"}`}
                                                            // onClick={() => this.handlePaging(pageNo+1)}
                                                        ><NavLink to="#">{pageNo + 1}</NavLink></li>
                                                        <li
                                                            onClick={() => this.handlePaging(this.filter.page++)}
                                                        ><NavLink to="#"><FontAwesomeIcon
                                                            icon={faAngleRight}
                                                            className="fa fa-angle-right"
                                                        /></NavLink></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {openComposer && (<AddSettingsModal
                                openComposer={openComposer}
                                onSave={this.handleAddSetting}
                                defaultType={settingDefaultType}
                                defaultVal={settingDefaultValue}
                                onClose={() => this.setState({
                                    openComposer: false,
                                    settingDefaultValue: null,
                                    settingDefaultType: null
                                })}
                            />)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;