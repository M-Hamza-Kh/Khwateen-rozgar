import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import Slider from 'react-slick';
import {
    CONTENT_URL,
    getUserData,
    isLogin,
    parseDate,
    parseDateWithoutTime,
    slickAutoSpeed,
    STRINGS
} from '../../utils/base';
// import blog1 from "../../content/images/blog/blog3.jpg";
// import blog3 from "../../content/images/blog/blog3.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {API} from "../../utils/services";
// import UpdateVideoModal from "../dashboard/modals/updateVideoModal";
import UpdateAboutModal from "../dashboard/modals/updateAboutModal";
import defaultBlogImage from "../../content/images/logo-purple.png";
import AddVideoModal from "../dashboard/modals/addVideoModal";

export class BlogSectionStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            blogs: [],
            isResponse: false,
            openAddComposer: false,
            openComposer: false,
        }
    }

    componentDidMount() {
        this.getAllContent();
    }

    getAllContent = () => {
        API.CONTENT.getAllHomeContent().then((res) => {
            console.log("videos", res)
            if (res.status) {
                this.setState({
                    videos: res.data.youtubeVideos,
                    blogs: res.data.blogs,
                    isResponse: true
                })
            } else {
                alert(res.status);
            }
        })
    }

    render() {
        let settings = {
            infinite: true,
            arrows: false,
            dots: true,
            adaptiveHeight: true,
            slidesToShow: 2,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: slickAutoSpeed,
            prevArrow: '<button class="slick-prev"><i class="lnr lnr-chevron-left"></i></button>',
            nextArrow: '<button class="slick-next"><i class="lnr lnr-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1501,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        }
        let settingsVideoSlider = {
            infinite: true,
            arrows: false,
            dots: true,
            adaptiveHeight: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: slickAutoSpeed,
            prevArrow: '<button class="slick-prev"><i class="lnr lnr-chevron-left"></i></button>',
            nextArrow: '<button class="slick-next"><i class="lnr lnr-chevron-right"></i></button>',
            responsive: [
                {
                    breakpoint: 1501,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                },
                {
                    breakpoint: 575,
                    settings: {
                        slidesToShow: 1,
                    }
                },
            ]
        }
        const {videos, isResponse, openComposer, blogs, openAddComposer} = this.state;
        return (
            <div>
                {/*<!-- Blog Section Start  -->*/}
                <div
                    className="blog-section section bg_color--5 pt-40 pt-lg-40 pt-md-75 pt-sm-55 pt-xs-45 pb-10 pb-lg-10 pb-md-50 pb-sm-30 pb-xs-20">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="section-title-center mb-45">
                                    <div className="section-title">
                                        <h3 className="title"> Latest News & Post</h3>
                                    </div>

                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="section-title-center mb-45">
                                    <div className="section-title">
                                        <h3 className="title"> Videos</h3>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row mb-30">
                            <div className="col-lg-8">
                                <Slider {...settings} className="row news-post-slider">
                                    {
                                        isResponse && (
                                            blogs.length > 0 ?
                                                blogs.map((b) =>
                                                    <div className="col-lg-9 col-md-9">
                                                        <div className="single-blog bg_color--1">
                                                            <div className="blog-image">
                                                                <NavLink to={`${STRINGS.ROUTES.BLOG_DETAILS}/${b.id}`}>
                                                                    <img height="200"
                                                                         src={b.imageURL !== "" ? `${CONTENT_URL}/${b.imageURL}` : defaultBlogImage}
                                                                         alt=""/>
                                                                </NavLink>
                                                                <div className="blog-cat">
                                                                    <NavLink
                                                                        to={`${STRINGS.ROUTES.BLOG_DETAILS}/${b.id}`}
                                                                        rel="category tag">News & Updates</NavLink>
                                                                </div>
                                                            </div>
                                                            <div className="blog-content">
                                                                <h4 className="title">
                                                                    <NavLink
                                                                        to={`${STRINGS.ROUTES.BLOG_DETAILS}/${b.id}`}>{b.title}</NavLink>
                                                                </h4>
                                                                <div className="blog-meta">
                                                                    <p className="blog-author">
                                                                        <i className="lnr lnr-user"/>
                                                                        <span className="text">Posted:</span>
                                                                        <span className="author">{b.author}</span>
                                                                    </p>
                                                                    <p className="blog-date-post">
                                                                        <i className="lnr lnr-clock"/>
                                                                        {parseDateWithoutTime(parseDate(new Date(b.publishOn)))}
                                                                    </p>
                                                                </div>
                                                                <p hidden className="blog-desc">
                                                                    {
                                                                        b.details
                                                                    }
                                                                </p>
                                                                <NavLink to={`${STRINGS.ROUTES.BLOG_DETAILS}/${b.id}`}
                                                                         className="read-more">Read More <i
                                                                    className="lnr lnr-chevron-right"/></NavLink>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                                : "No Data Found"
                                        )
                                    }
                                </Slider>
                                <div className="viewAll-holder" style={{marginTop: "25px"}}>
                                    <Link to={`${STRINGS.ROUTES.BLOGS}`} className="view-all">
                                        <FontAwesomeIcon icon={faEye} color={`${STRINGS.TYPES.COLORS.DEFAULT}`}/>
                                        <div className="label">
                                            View All
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <Slider {...settingsVideoSlider} className="single-video overflow-hidden video-slider">
                                    {
                                        isResponse ?
                                            videos.length > 0 ?
                                                videos.map((v)=>
                                                    <iframe key={v.id} title="LF8mu-xDDdI" width="560" height="315" src={v.pageContent}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen/>
                                                )
                                                : ""
                                            : ""
                                    }
                                    {/*<iframe title="aQGft4GD0uU" width="560" height="315"*/}
                                    {/*        src="https://www.youtube.com/embed/aQGft4GD0uU"*/}
                                    {/*        frameBorder="0"*/}
                                    {/*        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
                                    {/*        allowFullScreen/>*/}
                                    {/*<iframe title="rDhVk9snCfQ" width="560" height="315"*/}
                                    {/*        src="https://www.youtube.com/embed/rDhVk9snCfQ"*/}
                                    {/*        frameBorder="0"*/}
                                    {/*        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"*/}
                                    {/*        allowFullScreen/>*/}
                                </Slider>
                                <div className="viewAll-holder">
                                    <a target="_blank" rel="noopener noreferrer"
                                       href="https://www.youtube.com/c/KhawateenRozgar/videos" className="view-all">
                                        <FontAwesomeIcon icon={faEye} color={`${STRINGS.TYPES.COLORS.DEFAULT}`}/>
                                        <div className="label">
                                            View All
                                        </div>
                                    </a>
                                    {
                                        isLogin() && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                            <div className="d-flex mb-20 ml-1 mr-1">
                                                <button onClick={() => this.setState({
                                                    openComposer: true
                                                })}
                                                        className="ht-btn black-btn">Update
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        isLogin() && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && videos.length !== 4 && (
                                            <div className="d-flex mb-20 ml-1 mr-1">
                                                <button onClick={() => this.setState({
                                                    openAddComposer: true
                                                })}
                                                        className="ht-btn black-btn">Add
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        openComposer && (
                                            <UpdateAboutModal isUpdateVideo data={videos} isContent={"YoutubeVideos"}
                                                              onSave={() => window.location.reload()}
                                                              openBlogComposer={openComposer}
                                                              onClose={() => {
                                                                  this.setState({
                                                                      openComposer: false
                                                                  });
                                                              }}/>
                                        )
                                    }

                                    {
                                        openAddComposer && (
                                            <AddVideoModal isUpdateVideo onSave={() => window.location.reload()}
                                                           openVideoComposer={openAddComposer}
                                                           onClose={() => {
                                                               this.setState({
                                                                   openAddComposer: false
                                                               });
                                                           }}/>
                                        )
                                    }
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
                {/*<!-- Blog Section End -->*/}
            </div>
        );
    }
}