import React, {Component} from "react";
//import {NavLink} from "react-router-dom";
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import {IconButton} from "@material-ui/core";
// import {STRINGS} from "../../utils/base";
import {API} from "../../utils/services";
import Spinner from "../spinner";

export class ChangePassword extends Component{
    state = {
        oldPassword:"",
        password:"",
        newPassword:"",
        type:"password",
        isUpdate:true
    }

    handleChangePass = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {password,newPassword,oldPassword} = this.state;
        if(password !== "" && newPassword !== "" && oldPassword !== ""){
            if(password === newPassword){
                this.setState({
                    isUpdate:false
                })
                API.USER.changePassword({password: oldPassword,newPassword: newPassword}).then(({status,data,error})=>{
                    if(status){
                        console.log("data",data);
                        alert("Your password is successfully changed");
                        this.setState({
                            oldPassword:"",
                            password:"",
                            newPassword:"",
                            type:"password",
                            isUpdate:true
                        })
                    }else {
                        alert(error)
                    }
                }).catch(()=>{
                    this.setState({
                        isUpdate:true
                    })
                })
            }else{
                alert("Password do not matched");
            }
        }else{
            alert("All fields are required");
        }
    }

    handleChange = (ev) => {
        ev.persist();
        this.setState(prevState => ({
          ...prevState,
          [ev.target.name]:ev.target.value
        }))
    }

    render() {
        let {type,password,newPassword,oldPassword,isUpdate} = this.state;
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h4>Change Password</h4>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-overview">
                        <div className="row">
                            <div className="col-xl-12 col-12">
                                <div className="profile-applications mb-50">
                                    <div className="profile-applications-heading">
                                        {/*<ul className="nav">*/}
                                        {/*    <li><NavLink className="active" to="#">Old Password</NavLink></li>*/}
                                        {/*    <li><NavLink className="active" to="#">Change Password</NavLink></li>*/}
                                        {/*    <li className="d-none"><NavLink to="#">Resume profile</NavLink></li>*/}
                                        {/*</ul>*/}
                                    </div>
                                    <div className="profile-applications-main-block">
                                        <div className="profile-applications-form">
                                            {
                                                isUpdate ?
                                                    <form autoComplete="off" onSubmit={this.handleChangePass}>
                                                        <div className="row mb-30">

                                                            <div className="col-lg-10">
                                                                <div className="row">
                                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="old-password">Old Password</label>
                                                                            <input type={type} id="old-password"
                                                                                   defaultValue={oldPassword}
                                                                                   onChange={this.handleChange}
                                                                                   name="oldPassword" placeholder="" />
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="password">New Password</label>
                                                                            <input type={type} id="password"
                                                                                   defaultValue={password}
                                                                                   onChange={this.handleChange}
                                                                                   name="password" placeholder="" />
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                                                        {/*<!-- Single Input Start -->*/}
                                                                        <div className="single-input mb-25">
                                                                            <label htmlFor="confirm-password">Confirm
                                                                                Password</label>
                                                                            <input type={type} id="confirm-password"
                                                                                   defaultValue={newPassword}
                                                                                   onChange={this.handleChange}
                                                                                   name="newPassword" placeholder=""
                                                                            />
                                                                            {/*<IconButton onClick={()=> this.setState({type:"text"})}>*/}
                                                                            {/*    <VisibilityIcon style={{color:`${STRINGS.TYPES.COLORS.DEFAULT}`}}/>*/}
                                                                            {/*</IconButton>*/}
                                                                        </div>
                                                                        {/*<!-- Single Input End -->*/}
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div
                                                                    className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">
                                                                    <button
                                                                        // onClick={this.handleChangePass}
                                                                        className="ht-btn theme-btn theme-btn-two mb-xs-20">Change
                                                                        Password
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form> :
                                                    <div className="spinner-holder">
                                                    <Spinner width={100} height={100} type={"Puff"}/>
                                                    </div>
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