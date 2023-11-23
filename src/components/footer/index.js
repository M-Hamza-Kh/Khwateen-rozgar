import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {STRINGS} from "../../utils/base";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons/faEnvelope";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
// import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {faLinkedin, faYoutube} from "@fortawesome/free-brands-svg-icons"; //faGooglePlusG, faPinterestSquare,
import {faMapMarker} from "@fortawesome/free-solid-svg-icons/faMapMarker";
import $ from "jquery";
import {API} from "../../utils/services";


export class Footer extends Component {

    state = {
        email: ""
    }

    componentDidMount() {
    }

    isValidate = (email) => {
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

    handleUserSubscribe = (ev) => {
        ev.preventDefault();
        let {email} = this.state;
        const validation = this.isValidate(email);
        if (!validation.error) {
            let emailObj = {"email": email}
            API.USER.userSubscribe(emailObj).then((response) => {
                    if (response.status) {
                        alert("Subscribe Successfully");
                        this.setState({
                            email:""
                        })
                    }
                }
            )

        } else {
            alert(validation.message)
        }
    }

    handleChange = (ev) => {
        this.setState({
            email: ev.target.value
        })
    }

    render() {
        return (
            <footer className="footer-section section bg-image-proparty bg_image--2">

                {/*// <!-- Footer Top Section Start -->*/}
                <div className="footer-top-section section pb-5 pb-lg-5 pb-md-5 pb-sm-5 pb-xs-5">
                    <div className="container st-border pt-10 pt-lg-10 pt-md-10 pt-sm-10 pt-xs-10">
                        <div className="row">

                            <div className="col-xl-4 col-lg-3 col-md-6">
                                {/*// <!-- Footer Widget Start -->*/}
                                <div className="footer-widget mb-30">
                                    <h6 className="title">Contact Info</h6>
                                    <div className="address">
                                        <FontAwesomeIcon icon={faMapMarker} className="i lnr lnr-map-marker"/>
                                        <span>National Incubation Centre, Inside PTCL training centre, Near Nasir Bagh Road, Board, Peshawar</span>
                                    </div>
                                    <div className="email">
                                        <FontAwesomeIcon icon={faEnvelope} className="i"/>
                                        <span>info@khawateenrozgar.com</span>
                                    </div>
                                    <div className="phone theme-color fz-17">+92 332 9365589</div>
                                    <div className="footer-social justify-content-start mt-35">
                                        <a rel="noopener noreferrer" target="_blank"
                                           href="https://www.facebook.com/khawateenRozgar"><FontAwesomeIcon
                                            icon={faFacebookSquare}/></a>
                                        {/*<Link target="_blank" to=""><FontAwesomeIcon icon={faTwitter}/></Link>*/}
                                        <a rel="noopener noreferrer" target="_blank"
                                           href="https://www.linkedin.com/company/khawateen-rozgar-services"><FontAwesomeIcon
                                            icon={faLinkedin}/></a>
                                        {/*<Link target="_blank" to="https://www.facebook.com/khawateenRozgar"><FontAwesomeIcon icon={faGooglePlusG}/></Link>*/}
                                        {/*<Link target="_blank" to="https://www.facebook.com/khawateenRozgar"><FontAwesomeIcon icon={faPinterestSquare}/></Link>*/}
                                        <a rel="noopener noreferrer" target="_blank"
                                           href="https://www.youtube.com/channel/UC5c-yAlzY9DbCMhT3XwVcRA"><FontAwesomeIcon
                                            icon={faYoutube}/></a>
                                    </div>
                                </div>
                                {/*// <!-- Footer Widget End -->*/}
                            </div>

                            <div className="col-xl-4 col-lg-2 col-md-6">
                                {/*// <!-- Footer Widget Start -->*/}
                                <div className="footer-widget mb-30">
                                    <h6 className="title">Useful Links</h6>
                                    <div className="footer-widget-link" style={{lineHeight: "normal"}}>
                                        {/*<ul>*/}
                                        {/*    <li><NavLink to="#">Press Corner</NavLink></li>*/}
                                        {/*    <li><NavLink to="#">Policy Privacy</NavLink></li>*/}
                                        {/*    <li><NavLink to="#">Terms And Conditions</NavLink></li>*/}
                                        {/*    <li><NavLink to="#">Partner</NavLink></li>*/}
                                        {/*    <li><NavLink to="#">Help Center</NavLink></li>*/}
                                        {/*    <li><NavLink to="#">Contact Us</NavLink></li>*/}
                                        {/*</ul>*/}
                                        <ul>
                                            <li><NavLink to={`${STRINGS.ROUTES.PACKAGES}`}>Packages</NavLink></li>
                                            <li><NavLink to={`${STRINGS.ROUTES.PRIVACY_POLICY}`}>Privacy
                                                Policy</NavLink></li>
                                            <li><NavLink to={`${STRINGS.ROUTES.T_AND_C}`}>Terms And Conditions</NavLink>
                                            </li>
                                            <li><NavLink to={`${STRINGS.ROUTES.CONTACT}`}>Contact Us</NavLink></li>
                                        </ul>
                                    </div>
                                </div>
                                {/*// <!-- Footer Widget End -->*/}
                            </div>

                            {/*<div className="col-xl-2 col-lg-3 col-md-6">*/}
                            {/*// <!-- Footer Widget Start -->*/}
                            {/*<div className="footer-widget mb-30">*/}
                            {/*    <h6 className="title">Featured Jobs</h6>*/}
                            {/*    <div className="footer-widget-link">*/}
                            {/*        <ul>*/}
                            {/*            <li><NavLink to="#">Teachers</NavLink></li>*/}
                            {/*            <li><NavLink to="#">Accounting</NavLink></li>*/}
                            {/*            <li><NavLink to="#">Customer Service</NavLink></li>*/}
                            {/*            <li><NavLink to="#">Digital Marketing</NavLink></li>*/}
                            {/*            <li><NavLink to="#">Web & Software Dev</NavLink></li>*/}
                            {/*            <li><NavLink to="#">Science & Analitycs</NavLink></li>*/}
                            {/*        </ul>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*// <!-- Footer Widget End -->*/}
                            {/*</div>*/}

                            <div className="col-xl-4 col-lg-4 col-md-6">
                                {/*// <!-- Footer Widget Start -->*/}
                                <div className="footer-widget mb-30">
                                    <h6 className="title">Subscribe Now</h6>
                                    <div className="newsletter">
                                        <p style={{lineHeight: "normal"}}>Join our email subscription now to get updates
                                            on <strong>new
                                                jobs</strong> and <strong>notifications</strong>.</p>
                                        <div className="newsletter-form">
                                            <form id="mc-form" onSubmit={this.handleUserSubscribe}
                                                  className="mc-form">
                                                <input type="email"
                                                       onChange={this.handleChange}
                                                       placeholder="Enter Your email..."
                                                       required=""
                                                       value={this.state.email}
                                                       name="email"/>
                                                <button className="ht-btn small-btn" type="submit"
                                                        value="submit">Subscribe
                                                </button>
                                            </form>
                                        </div>
                                        {/*<!-- mailchimp-alerts Start -->*/}
                                        <div className="mailchimp-alerts">
                                            <div className="mailchimp-submitting"></div>
                                            {/*<!-- mailchimp-submitting end -->*/}
                                            <div className="mailchimp-success"></div>
                                            {/*// <!-- mailchimp-success end -->*/}
                                            <div className="mailchimp-error"></div>
                                            {/*// <!-- mailchimp-error end -->*/}
                                        </div>
                                        {/*// <!-- mailchimp-alerts end -->*/}
                                    </div>
                                </div>
                                {/*// <!-- Footer Widget End -->*/}
                            </div>
                        </div>
                    </div>
                </div>
                {/*// <!-- Footer Top Section End -->*/}

                {/*// <!--Footer bottom start-->*/}
                <div className="footer-bottom section fb-60">
                    <div className="container">
                        <div
                            className="row no-gutters st-border pt-35 pb-35 align-items-center justify-content-between">
                            <div className="col-lg-6 col-md-6">
                                <div className="copyright">
                                    <p>&copy;2020 <NavLink to={STRINGS.ROUTES.ROOT}>Khawateen</NavLink>. All rights
                                        reserved.</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="footer-nav">
                                    {/*<nav>*/}
                                    {/*    <ul>*/}
                                    {/*        <li><NavLink to="#">Find Work</NavLink></li>*/}
                                    {/*        <li><NavLink to="#">Candicates</NavLink></li>*/}
                                    {/*        <li><NavLink to="#">Employers</NavLink></li>*/}
                                    {/*    </ul>*/}
                                    {/*</nav>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*// <!--Footer bottom end-->*/}

            </footer>
        );
    }
}



