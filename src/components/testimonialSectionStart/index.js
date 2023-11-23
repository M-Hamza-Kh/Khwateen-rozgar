import React, {Component} from "react";
import Slider from "react-slick";
// import testimonial6 from "../../content/images/testimonial/testimonials-6.jpeg";
// import testimonial5 from "../../content/images/testimonial/testimonials-5.jpeg";
// import testimonial4 from "../../content/images/testimonial/testimonials-4.jpeg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
//import testimonial4 from "../../content/images/testimonial/testimonial-4.jpg";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {STRINGS} from "../../utils/base";
import {NavLink} from "react-router-dom";
import {API} from "../../utils/services";
import TestimonialItem from "../visitorIndex/testimonialItems/testimonialItem";

export class TestimonialSectionStart extends Component {

    currentPage = 1

    constructor(props) {
        super(props);
        this.state = {
            getAllData: [],
            isResponse: false
        }
    }

    componentDidMount() {
        this.getAllTestimonials(this.currentPage)
    }

    getAllTestimonials = (page) => {
        API.TESTIMONIALS.getAllTestimonials(page).then((response) => {
            console.log("test", response)
            if (response.status) {
                this.setState({
                    getAllData: response.data,
                    isResponse: true
                })
            } else {
                alert(response.error)
            }
        })
    }

    nextArrow = () => {
        return (
            <button className="slick-prev"><i className="lnr lnr-chevron-left"/></button>
        )
    }

    prevArrow = () => {
        return (
            <button className="slick-next"><i className="lnr lnr-chevron-right"/></button>
        )
    }

    handleDelete = () => {
        //getAllTestimonials(currentPage);
    }

    render() {
        let settings = {
            infinite: true,
            arrows: true,
            dots: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            prevArrow: this.prevArrow(),
            nextArrow: this.nextArrow(),
            responsive: [
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        };

        let {isResponse, getAllData} = this.state;
        return (
            <div>
                {/*<!-- Testimonial Section Start -->*/}
                <div
                    className="testimonial-section section bg-image-proparty bg_image--2 pt-40 pt-lg-40 pt-md-75 pt-sm-55 pt-xs-45 pb-40 pb-lg-40 pb-md-140 pb-sm-60 pb-xs-30">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title-center mb-45">
                                    <div className="section-title">
                                        <h3 className="title"> From Testimonials</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Slider {...settings} className="testimonial-slider row">


                            {
                                isResponse ?
                                    getAllData.length > 0 ?
                                        getAllData.map((jl) =>
                                            <div className="col-lg-12">
                                                <TestimonialItem onSuccessDelete={this.handleDelete} data={jl}/>
                                            </div>
                                        )
                                        : "" : ""
                            }

                        </Slider>
                    </div>
                    <div className="viewAll-holder">
                        <NavLink to={STRINGS.ROUTES.TESTIMONIAL} className="view-all">
                            <FontAwesomeIcon icon={faEye} color={`${STRINGS.TYPES.COLORS.DEFAULT}`}/>
                            <div className="label">
                                View All
                            </div>
                        </NavLink>
                    </div>
                </div>
                {/*<!-- Testimonial Section End -->*/}
            </div>
        );
    }
}
