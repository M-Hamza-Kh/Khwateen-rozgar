import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faFileAlt, faQuoteLeft, faUser} from "@fortawesome/free-solid-svg-icons";
import {
    CONTENT_URL,
    getUserData,
    isLogin,
    parseDate,
    parseDateAndTime,
    setIframeHeight,
    STRINGS
} from "../../utils/base";
import {Header} from "../header";
import {Footer} from "../footer";
import aboutUsCover from "../../content/images/about/bg-top-about-us.jpg"
import defaultBlogImage from "../../content/images/logo-purple.png";
import Spinner from "../spinner";
import {MobileHeader} from "../mobile/header";
import {StartPopUpMenu} from "../startPopUpMenu";
import {API} from "../../utils/services";
import AddBlogModal from "../dashboard/modals/addBlogModal";
import Comments from "../visitorIndex/comments";
import $ from "jquery";

export class Index extends Component {
    childDiv = React.createRef();
    commentsPageNo = 1;

    constructor(props) {
        super(props);
        const id = this.props.match.params.id
        this.state = {
            lightHeader: `black-logo-version header-sticky sticky-black d-none d-lg-block`,
            blog: {},
            isResponse: false,
            showMenu: false,
            openComposer: false,
            isComments: false,
            comments: [],
        }
        this.comment = {
            blogId: id,
            message: "",
            name: "",
            email: "",
        }
    }


    componentDidMount = () => {

        this.handleScroll();
        window.onresize = () => {
            if (window.innerWidth >= 1000) {
                this.setState({
                    showMenu: false
                })
            }
        }
        let id = this.props.match.params.id
        this.getBlogById(id);
        this.getCommentsById({id: id, pageNo: this.commentsPageNo});
    }

    getCommentsById = (obj) => {
        API.BLOGS.getBlogCommentsById(obj).then((res) => {
            if (res.status) {
                this.setState({
                    comments: res.data,
                    isComments: true
                })
            } else {
                alert(res.error)
            }
        })
    }

    // loadMoreComments = (id, page) => {
    //     this.getCommentsById({id: id, pageNo: page});
    // }

    getBlogById = (id) => {
        API.BLOGS.getBlogById(id).then((res) => {
            ////console.log("blog", res);
            if (res.status) {
                this.setState({
                    blog: res.data,
                    isResponse: true
                })
            } else {
                alert(res.error)
            }
        });
    }

    handleDeleteBlog = (id) => {
        const conf = window.confirm("Are you sure you want to delete this blog?");
        if (conf) {
            API.BLOGS.deleteBlog(id).then(() => {
                window.location.href = STRINGS.ROUTES.BLOGS
            })
        }

    }


    handleOpenShowMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    handleScroll = () => {
        const {index, selected} = this.props
        if (index === selected) {
            setTimeout(() => {
                this.childDiv.current.scrollIntoView({behavior: 'smooth'})
            }, 500)
        }
    }

    validation = ({email, message, name}) => {
        let valid = {error: false, message: ''};
        const email_regex = /\S+@\S+\.\S+/;
        // const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if ($.isEmptyObject(email)) valid = {
            error: true,
            message: "Email Required!"
        };
        else if (!email_regex.test(email)) valid = {
            error: true,
            message: $.isEmptyObject(valid.message) ? "Invalid Email. example@exa.com" : `${valid.message}\nInvalid Email. example@exa.com`
        };
        if (message === "") valid = {
            error: true,
            message: $.isEmptyObject(valid.message) ? "Message required!" : `${valid.message}\nMessage required!`
        };
        if (name === "") valid = {
            error: true,
            message: $.isEmptyObject(valid.message) ? "Name required!" : `${valid.message}\nName required!`
        };
        return valid;
    }

    handleAddComments = (e) => {
        e.preventDefault();
        const valid = this.validation(this.comment)
        if (!valid.error) {
            this.setState({
                isComments: false
            })
            let addObj = {
                blogId: this.comment.blogId,
                email: this.comment.email,
                comment: this.comment.message,
                name: this.comment.name
            }
            API.BLOGS.addBlogComment(addObj).then((res) => {
                ////console.log("comment", res)
                if (res.status) {
                    // alert("Commen")
                    this.setState({
                        comments: [...this.state.comments, res.data],
                        isComments: true
                    })
                    this.comment = {
                        blogId: this.props.match.params.id,
                        message: "",
                        name: "",
                        email: "",
                    };
                    $("#message").val("");
                    $("#name").val("");
                    $("#email").val("");
                } else {
                    alert(res.error);
                    this.setState({
                        isComments: true
                    })
                }
            })
        } else {
            alert(valid.message)
        }
    }

    render() {
        let {lightHeader, blog, isResponse, showMenu, openComposer, comments, isComments} = this.state;
        const blogId = this.props.match.params.id;
if(document.getElementById("iframeBody") !== null){
    console.log("iframeBody",document.getElementsByTagName("iframe"))
}
        return (
            <div className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
                <Header headerClass={lightHeader} logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
                <MobileHeader openShowMenu={this.handleOpenShowMenu}/>

                <StartPopUpMenu closeShowMenu={this.handleOpenShowMenu}/>
                {/*<!-- Breadcrumb Section Start -->*/}
                <div className="breadcrumb-section section page-heading" style={{
                    background: `url(${aboutUsCover}) no-repeat`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }} ref={this.childDiv}>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-10 ml-auto mr-auto">
                                {
                                    isResponse && (
                                        <div className="page-breadcrumb-content color-white">
                                            <ul className="page-breadcrumb color-white">
                                                <li>{blog.author}</li>
                                            </ul>
                                            <h4>{blog.title}</h4>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    className="blog-section section pt-50 pt-lg-50 pt-md-50 pt-sm-50 pt-xs-50 pb-30 pb-lg-30 pb-md-30 pb-sm-30 pb-xs-30">
                    <div className="container">
                        <div className="row">

                            <div className="col-xl-8 col-lg-10 ml-auto mr-auto">
                                {
                                    isLogin() && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                        <div className="d-flex mb-20">
                                            <button onClick={() => this.setState({
                                                openComposer: true
                                            })}
                                                    className="ht-btn black-btn">Update Blog
                                            </button>
                                        </div>
                                    )
                                }
                                {
                                    isLogin() && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                        <div className="d-flex mb-20">
                                            <button onClick={() => this.handleDeleteBlog(blogId)}
                                                    className="ht-btn black-btn">Delete Blog
                                            </button>
                                        </div>
                                    )
                                }
                                {
                                    openComposer && (
                                        <AddBlogModal data={blog} onSave={() => window.location.reload()}
                                                      openBlogComposer={openComposer}
                                                      onClose={() => {
                                                          this.setState({
                                                              openComposer: false
                                                          });
                                                      }}/>
                                    )
                                }
                                <div className="row">

                                    {
                                        isResponse ?
                                            <div className="col-12">
                                                <div className="single-blog-post mb-90 mb-xs-50">
                                                    <div className="blog-image">
                                                        <div
                                                            className="img-holder justify-content-center align-items-center"
                                                            style={{
                                                                backgroundImage: `linear-gradient(
                                                                    45deg
                                                                    , #c355a0cc, #3fa3aee6)`
                                                            }}>
                                                            <img
                                                                style={{height: "20rem", objectFit: "scale-down"}}
                                                                src={blog.imageURL !== null && blog.imageURL !== "" ? `${CONTENT_URL}${blog.imageURL}` : defaultBlogImage}
                                                                alt=""/>
                                                        </div>
                                                    </div>
                                                    <div className="blog-content">
                                                        <ul className="post-meta">
                                                            <li><FontAwesomeIcon icon={faUser}
                                                                                 className="lnr lnr-user mr-4 ml-4"/><NavLink
                                                                to="#">{blog.author}</NavLink></li>
                                                            <li><FontAwesomeIcon icon={faFileAlt}
                                                                                 className="lnr lnr-file-add mr-4 ml-4"/><NavLink
                                                                to="#">{blog.category}</NavLink></li>
                                                            <li><FontAwesomeIcon icon={faClock}
                                                                                 className="lnr lnr-clock mr-4 ml-4"/><NavLink
                                                                to="#">{blog.publishOn !== null && parseDateAndTime(parseDate(new Date(blog.publishOn)))}</NavLink>
                                                            </li>
                                                        </ul>
                                                        <p className="overflow-hidden blog-desc">
                                                            <iframe scrolling="no" title='myFrame' id="iframeBody"
                                                                    // className=""
                                                                    src={"data:text/html," + encodeURIComponent(blog.details)}
                                                                    onload={setIframeHeight(this.id)}
                                                                    style={{
                                                                        border: "none",
                                                                        outline: "none",
                                                                        height: "200vh",
                                                                        display: "flex",
                                                                        width: "100%"
                                                                    }}
                                                            />
                                                        </p>
                                                        <blockquote>
                                                            <p>{blog.aboutAuthor}</p>
                                                            <p>
                                                                <FontAwesomeIcon icon={faQuoteLeft}
                                                                                 className="fa fa-quote-left"/>
                                                                <span><strong>{blog.author}</strong></span>
                                                            </p>
                                                        </blockquote>
                                                    </div>
                                                </div>
                                            </div>
                                            : <div className="spinner-holder">
                                                <Spinner type={"Puff"}/>
                                            </div>
                                    }


                                    <div className="col-12">
                                        <div className="post-tags">
                                            <ul className="tags">
                                                <li>Tags:</li>
                                                {
                                                    isResponse && (
                                                        blog.tags.length > 0 ?
                                                            blog.tags.map((t) =>
                                                                <li><NavLink to="#">{t}</NavLink></li>
                                                            )
                                                            : <li><NavLink to="#"> No Tags </NavLink></li>
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>

                                    {/*<div className="col-12">*/}
                                    {/*    <div className="post-navigation mt-90">*/}
                                    {/*        <div className="row">*/}
                                    {/*            <div className="col-md-6">*/}
                                    {/*                <div className="prev-post">*/}
                                    {/*                    <NavLink className="prev-post-title" to="#">*/}
                                    {/*                        <span className="text"><FontAwesomeIcon icon={faArrowLeft}*/}
                                    {/*                                                                className="lnr lnr-arrow-left"/>Previous Post</span>*/}
                                    {/*                        <span className="title">Miley Cyrus and Job: 10 Surprising Things They Have in Common</span>*/}
                                    {/*                    </NavLink>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*            <div className="col-md-6">*/}
                                    {/*                <div className="next-post">*/}
                                    {/*                    <NavLink className="next-post-title" to="#">*/}
                                    {/*                        <span className="text">Next Post<FontAwesomeIcon*/}
                                    {/*                            icon={faArrowRight}*/}
                                    {/*                            className="lnr lnr-arrow-right"/></span>*/}
                                    {/*                        <span className="title">7 Answers to the Most Frequently Asked Questions About Job</span>*/}
                                    {/*                    </NavLink>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}

                                    <div className="col-12 mt-4 mb-4">
                                        {
                                            isComments ?
                                                <Comments data={comments}
                                                          onDelete={() => this.setState({
                                                              isComments: false
                                                          })}
                                                          onDeleted={() => {
                                                              this.getCommentsById({
                                                                  id: blogId,
                                                                  pageNo: this.commentsPageNo
                                                              });
                                                          }}
                                                />
                                                :
                                                <div className="spinner-holder">
                                                    <Spinner type={"Puff"}/>
                                                </div>
                                        }

                                    </div>

                                    <div className="col-12">
                                        <div className="comment-wrapper mt-90">
                                            <h3 className="title">Add Comment</h3>
                                            <div className="comment-form">
                                                <form onSubmit={this.handleAddComments}>
                                                    <div className="row row-7 col-12">
                                                        <div className="col-12 mb-15">
                                                            <textarea
                                                                id="message"
                                                                onChange={(ev) =>
                                                                    this.comment.message = ev.target.value
                                                                } placeholder="Your Message"/>
                                                        </div>
                                                        <div className="col-md-6 mb-15">
                                                            <input
                                                                id="name"
                                                                defaultValue={this.comment.name}
                                                                onChange={(ev) =>
                                                                    this.comment.name = ev.target.value
                                                                }
                                                                type="text" placeholder="Name"/>
                                                        </div>
                                                        <div className="col-md-6 mb-15">
                                                            <input
                                                                id="email"
                                                                defaultValue={this.comment.email}
                                                                onChange={(ev) =>
                                                                    this.comment.email = ev.target.value
                                                                }
                                                                type="text" placeholder="Email"/>
                                                        </div>
                                                        {/*<div className="col-md-4 mb-15">*/}
                                                        {/*    <input type="text" placeholder="Website"/>*/}
                                                        {/*</div>*/}
                                                        <div className="col-12 text-center mt-20">
                                                            <button className="ht-btn theme-btn theme-btn-two">
                                                                Post Comment
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <Footer/>
            </div>
        );
    }
}
