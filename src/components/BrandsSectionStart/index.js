import React, {Component} from "react";
// import {Link, NavLink} from "react-router-dom";
// import brand2 from '../../content/images/brand/brands-2.jpeg';
// import brand1 from '../../content/images/brand/brands-1.jpeg';
// import brand3 from '../../content/images/brand/brands-3.jpeg';
// import brand4 from '../../content/images/brand/brands-4.jpeg';
// import brand5 from '../../content/images/brand/brands-5.jpeg';
// import brand6 from '../../content/images/brand/brands-6.jpeg';
import {getUserData, isLogin, slickAutoSpeed, STRINGS} from '../../utils/base';
import Slider from 'react-slick';
import {API} from "../../utils/services";
import AddLargeBannersModal from "../dashboard/modals/addLargeBannersModal";

// import banner_1 from "../../content/images/banner/banner-1.jpg"

export class BrandsSectionStart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bannersLarge: [],
            bannerUpdate: {},
            isResponse: false,
            openAddComposer: false,
            openComposer: false
        }
    }

    componentDidMount() {
        this.getAllBannersLarge();
    }

    getAllBannersLarge = () => {
        API.CONTENT.getAllHomeContent().then((res) => {
            //console.log("brandsSection", res)
            if (res.status) {
                this.setState({
                    bannersLarge: res.data.imageBannerSmall,
                    isResponse: true
                })
            } else {
                alert(res.status);
            }
        })
    }

    render() {
        let settingsClient = {
            infinite: true,
            arrows: true,
            dots: false,
            adaptiveHeight: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: slickAutoSpeed,
            // prevArrow: '<button class="slick-prev"><i class="lnr lnr-chevron-left"></i></button>',
            // nextArrow: '<button class="slick-next"><i class="lnr lnr-chevron-right"></i></button>',
            responsive: [
                // {
                //     breakpoint: 1501,
                //     settings: {
                //         slidesToShow: 1,
                //         slidesToScroll: 3,
                //         infinite: true,
                //         dots: true,
                //     }
                // },
                // {
                //     breakpoint: 1199,
                //     settings: {
                //         slidesToShow: 1,
                //     }
                // },
                // {
                //     breakpoint: 992,
                //     settings: {
                //         slidesToShow: 1,
                //     }
                // },
                // {
                //     breakpoint: 768,
                //     settings: {
                //         slidesToShow: 1,
                //     }
                // },
                // {
                //     breakpoint: 575,
                //     settings: {
                //         slidesToShow: 1,
                //     }
                // },
            ]
        }
        const {bannersLarge, isResponse, openAddComposer, openComposer, bannerUpdate} = this.state;
//console.log("bannersLarge",bannersLarge)
// console.log("bannersLarge",isResponse)
        return (
            <React.Fragment>
                {/*<!-- Brand Section Start  -->*/}
                <div className="brand-section section bg_color--3 pt-40 pb-40">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section-title-center mb-45">
                                    <div className="section-title">
                                        <h3 className="title"> We are trusted by</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Slider {...settingsClient} style={{textAlign: 'center', width: "100%"}}
                                className="row row-five-column align-items-center client-slider">

                            {isResponse &&
                            bannersLarge.length > 0 ? (
                                bannersLarge.map((b) =>
                                    <div key={b.id} className="d-flex align-items-center flex-column">
                                        {
                                            isLogin() && getUserData().rightsBanners && (
                                                <div className="d-flex mb-20 ml-1 mr-1">
                                                    <button onClick={() => this.setState({
                                                        openComposer: true,
                                                        bannerUpdate: b
                                                    })}
                                                            className="ht-btn black-btn">Update
                                                    </button>
                                                </div>
                                            )
                                        }
                                        <a target={"_blank"} href={b.link}
                                                 className="d-inline-block pr-4 pl-4" height="200">
                                            <img src={`${b.imageURL}`} alt=""/>
                                        </a>
                                    </div>
                                )
                            ) : ""
                            }


                            {/*<NavLink to="#" className="d-inline-block pr-4 pl-4" height="200"><img src={brand2} alt=""/></NavLink>*/}


                            {/*<NavLink to="#" className="d-inline-block pr-4 pl-4" height="200"><img src={brand1} alt=""/></NavLink>*/}


                            {/*<NavLink to="#" className="d-inline-block pr-4 pl-4" height="200"><img src={brand2} alt=""/></NavLink>*/}


                            {/*<NavLink to="#" className="d-inline-block pr-4 pl-4" height="200"><img src={brand3} alt=""/></NavLink>*/}


                            {/*<NavLink to="#" className="d-inline-block pr-4 pl-4" height="200"><img  src={brand4} alt=""/></NavLink>*/}


                            {/*<NavLink to="#" className="d-inline-block pr-4 pl-4" height="200"><img  src={brand5} alt=""/></NavLink>*/}


                            {/*<NavLink to="#" className="d-inline-block pr-4 pl-4" height="200"><img  src={brand6} alt=""/></NavLink>*/}

                        </Slider>
                        <div className="d-flex w-100 justify-content-center">
                            {
                                isLogin() && getUserData().rightsBanners && bannersLarge.length !== 4 && (
                                    <div className="d-flex mb-20 ml-1 mr-1">
                                        <button onClick={() => this.setState({
                                            openAddComposer: true
                                        })}
                                                className="ht-btn black-btn">Add
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        {
                            openAddComposer && (
                                <AddLargeBannersModal
                                    addType={"imageBannerSmall"}
                                    onSave={() => window.location.reload()}
                                    openLargeBannerComposer={openAddComposer}
                                    onClose={() => {
                                        this.setState({
                                            openAddComposer: false
                                        });
                                    }}
                                />
                            )
                        }
                        {
                            openComposer && (
                                <AddLargeBannersModal
                                    isUpdate={bannerUpdate}
                                    onSave={() => window.location.reload()}
                                    openLargeBannerComposer={openComposer}
                                    onClose={() => {
                                        this.setState({
                                            openComposer: false
                                        });
                                    }}
                                />
                            )
                        }
                    </div>
                </div>
                {/*<!-- Brand Section End  -->*/}
            </React.Fragment>
        );
    }
}