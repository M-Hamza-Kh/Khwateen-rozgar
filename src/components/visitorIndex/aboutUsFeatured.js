import React, {Component} from "react";
import {NavLink} from "react-router-dom";
// import brand2 from '../../content/images/about/image2.png';
import brand1 from '../../content/images/about/image1.png';
import brand3 from '../../content/images/about/image3.jpg';
import brand4 from '../../content/images/about/image4.png';
import brand5 from '../../content/images/about/image5.jpg';
import brand6 from '../../content/images/about/image6.jpg';
import {slickAutoSpeed} from '../../utils/base';
import Slider from 'react-slick';


export class AboutUsFeatured extends Component {
    childDiv = React.createRef();
    componentDidMount = () => this.handleScroll()

    handleScroll = () => {
        const { index, selected } = this.props
        if (index === selected) {
            setTimeout(() => {
                this.childDiv.current.scrollIntoView({ behavior: 'smooth' })
            }, 500)
        }
    }

    render() {

        let settingsClient = {
            infinite: true,
            arrows: true,
            dots: false,
            // adaptiveHeight: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: slickAutoSpeed,
            // prevArrow: '<button class="slick-prev"><i class="lnr lnr-chevron-left"></i></button>',
            // nextArrow: '<button class="slick-next"><i class="lnr lnr-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 100,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true,
                    }
                },
                {
                    breakpoint: 100,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 100,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 100,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 100,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        }

        return (
            <React.Fragment>
                {/*<!-- Brand Section Start  -->*/}
                <div className="brand-section section bg_color--1 pt-40 pb-40" ref={this.childDiv}>
                    <div className="container">
                        {/*<div className="row">*/}
                        {/*    <div className="col-lg-12">*/}
                        {/*        <div className="section-title-center mb-45">*/}
                        {/*            <div className="section-title">*/}
                        {/*                <h3 className="title"> We are trusted by</h3>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        <Slider {...settingsClient} style={{textAlign: 'center'}}
                                className="row row-five-column align-items-center client-slider">

                                    <NavLink to="#" className="d-inline-block pr-4 pl-4" height="100"><img src={brand1}
                                                                                    alt=""/></NavLink>


                                    <NavLink to="#" className="d-inline-block pr-4 pl-4" height="100"><img  src={brand3}
                                                                                    alt=""/></NavLink>

                                    <NavLink to="#" className="d-inline-block pr-4 pl-4" height="100"><img  src={brand4}
                                                                                    alt=""/></NavLink>

                                    <NavLink to="#" className="d-inline-block pr-4 pl-4" height="100"><img  src={brand5}
                                                                                    alt=""/></NavLink>


                                    <NavLink to="#" className="d-inline-block pr-4 pl-4" height="100"><img src={brand6}
                                                                                    alt=""/></NavLink>

                        </Slider>
                    </div>
                </div>
                {/*<!-- Brand Section End  -->*/}
            </React.Fragment>
        );
    }
}