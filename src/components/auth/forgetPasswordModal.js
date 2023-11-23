import React, {useState} from 'react';
import {dropDownSelection} from "../../utils/base";
import $ from "jquery";
import {API} from "../../utils/services";
import Spinner from "../spinner";
import swal from 'sweetalert';

const ForgetPasswordModal = (props) => {
    const {openForgetPassword, onClose} = props;
    const [email, setEmail] = useState("");
    const [response, setResponse] = useState(false);

    const isValidate = (email) => {
        let valid = {error: false, message: ''};
        const email_regex = /\S+@\S+\.\S+/;
        // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if (email === "") valid = {
            error: true,
            message: "Email Required!"
        };
        else if (!email_regex.test(email)) valid = {
            error: true,
            message: $.isEmptyObject(valid.message) ? "Invalid Email. example@exa.com" : `${valid.message}\nInvalid Email. example@exa.com`
        };

        return valid
    };
    const handleUpdate = (ev) => {
        ev.preventDefault();
        const validation = isValidate(email);
        if (!validation.error) {
            setResponse(true)
            let emailObj = {"email": email}
            API.USER.resetPassword(emailObj).then((response) => {
                console.log("response",response)
                    if (response.status) {
                        //alert("Please check your email");
                        swal("", "Please check your email", "success")
                        setEmail("");
                        setResponse(false)
                        onClose();
                    }else{
                        alert(response.message)
                        setEmail("");
                        setResponse(false)
                    }
                }
            )

        } else {
            alert(validation.message)
        }

    }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openForgetPassword ? `show` : ``}`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                     role="document">
                    <div className="modal-content" style={{marginLeft:`25%`, marginRight:`25%`}}>
                        <button type="button" className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                                                    <span aria-hidden="true"
                                                                          onClick={() => onClose()}>&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header" style={{height:`50px`}}>
                                    <h2 className="card-title mb-0" style={{fontFamily:`Calisto MT`, textAlign:`center`}}>Forgot Password</h2>
                                </header>
                                <div className="card-body" style={{padding:`1.3rem`}}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input">
                                                <label htmlFor="about-summary" style={{fontFamily:`Calisto MT`, fontSize:`20px`}}>Email</label>
                                                <form id="mc-form" onSubmit={handleUpdate}
                                                      className="mc-form">
                                                    <input type="email"
                                                           onChange={(e) => setEmail(e.target.value)}
                                                           placeholder="Enter Your email..."
                                                           required=""
                                                           value={email}
                                                           name="email"/>
                                                    {
                                                        !response ?
                                                            <button className="ht-btn small-btn" type="submit"
                                                                    value="submit">Send
                                                            </button> :
                                                            <div className="spinner-holder">
                                                                <Spinner type={"Puff"} height={100}
                                                                         width={40}/>
                                                            </div>
                                                    }

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className="card-footer">*/}
                                {/*    <div className="row">*/}
                                {/*        <div className="col-12">*/}
                                {/*            <div*/}
                                {/*                className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">*/}
                                {/*                /!*<button*!/*/}
                                {/*                /!*    onClick={handleUpdate}*!/*/}
                                {/*                /!*    className="ht-btn theme-btn theme-btn-two mb-xs-20">Send*!/*/}
                                {/*                /!*</button>*!/*/}
                                {/*                <button*/}
                                {/*                    onClick={onClose}*/}
                                {/*                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Cancel*/}
                                {/*                </button>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"/>
        </React.Fragment>
    );
};

export default ForgetPasswordModal;