import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {CONTENT_URL, getUserData, isLogin, parseDate, parseDateAndTime, STRINGS} from "../../utils/base";
import {Header} from "../header";
import {Footer} from "../footer";
import defaultBlogImage from "../../content/images/logo-purple.png";
// import adsIcon from "../../content/images/banner/ads.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronRight, faClock, faFileAlt, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";
import {MobileHeader} from "../mobile/header";
import {StartPopUpMenu} from "../startPopUpMenu";
import AddBlogModal from "../dashboard/modals/addBlogModal";
import {API} from "../../utils/services";
import Spinner from "../spinner";


export class Index extends Component {
    childDiv = React.createRef();
    filter = {
        category: "",
        pageNo: 1,
        details: "",
    }


    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            openComposer: false,
            isResponse: false,
            page: this.filter.pageNo,
            blogs: [],
            categoriesCount: [],
            tagsCount: [],
            search: "",
            lightHeader: `black-logo-version header-sticky sticky-black d-none d-lg-block`
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
        this.getAllBlogs(this.filter);
        this.getCategories();
        this.getTags();
    }

    getCategories = () => {
        API.BLOGS.getCategoriesCount().then((res) => {
            //console.log('categories', res)
            if (res.status) {
                this.setState({
                    categoriesCount: res.data
                })
            } else {
                alert(res.error)
            }
        })
    }
    getTags = () => {
        API.BLOGS.getTagsCount().then((res) => {
            //console.log('tags', res)
            if (res.status) {
                this.setState({
                    tagsCount: res.data
                })
            } else {
                alert(res.error)
            }
        })
    }

    getAllBlogs = (filter) => {
        //console.log("filter", filter)
        API.BLOGS.getAllBlogs(filter).then((res) => {
            //console.log("blogs", res)
            if (res.status) {
                this.setState({
                    blogs: res.data,
                    isResponse: true,
                    search: "",
                });
                this.filter.details = "";
                this.filter.category = "";
            } else {
                alert(res.error)
            }
        })
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

    handleSaveBlog = () => {

    }

    handleSearch = (e) => {
        e.preventDefault();
        let {search} = this.state;
        if (search !== "") {
            this.filter.details = search
            this.getAllBlogs(this.filter);
        }
    }
    handleCategorySearch = (name) => {
        if (name !== "") {
            this.filter.category = name
            this.getAllBlogs(this.filter);
        }
    }

    handleLoadMore = (page) => {
        this.filter.pageNo = page;
        //console.log("loadmore", this.filter.pageNo)
        this.getAllBlogs(this.filter);
    }

    render() {
        let {lightHeader, showMenu, openComposer, isResponse, blogs, search, categoriesCount, tagsCount} = this.state;
        return (
            <div className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
                <Header headerClass={lightHeader} logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
                <MobileHeader openShowMenu={this.handleOpenShowMenu}/>

                <StartPopUpMenu closeShowMenu={this.handleOpenShowMenu}/>
                {/*<!-- Breadcrumb Section Start -->*/}
                <div className="breadcrumb-section section bg_color--5 pt-30 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40"
                     ref={this.childDiv}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-breadcrumb-content">
                                    <ul hidden className="page-breadcrumb">
                                        <li><NavLink to="index.html">Home</NavLink></li>
                                        <li>Blog</li>
                                    </ul>
                                    <h4>Blog</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<!-- Breadcrumb Section Start -->*/}

                {/*<!-- Blog Section Start -->*/}
                <div className="blog-section section bg_color--5 pb-30 pb-lg-30 pb-md-30 pb-sm-30 pb-xs-30">
                    <div className="container">
                        <div className="row no-gutters">

                            <div className="col-lg-8">
                                <div className="blog-wrapper">
                                    <div className="row">

                                        {
                                            isResponse ?
                                                blogs.length > 0 ?
                                                    blogs.map((b) =>
                                                        <div className="col-12">
                                                            <div className="single-blog-post mb-90 mb-xs-50">
                                                                <div className="blog-image d-flex justify-content-center align-items-center" style={{backgroundImage: `linear-gradient(
                                                                    45deg
                                                                    , #c355a0cc, #3fa3aee6)`}}>
                                                                    <NavLink
                                                                        to={`${STRINGS.ROUTES.BLOG_DETAILS}/${b.id}`}>
                                                                        <img
                                                                            style={{height:"20rem",objectFit:"scale-down"}}
                                                                            src={b.imageURL !== null && b.imageURL !== "" ? `${CONTENT_URL}${b.imageURL}` : defaultBlogImage}
                                                                            alt=""/>
                                                                    </NavLink>
                                                                </div>
                                                                <div className="blog-content">
                                                                    <ul className="post-meta">
                                                                        <li><FontAwesomeIcon icon={faUser}
                                                                                             className="lnr lnr-user ml-4 mr-4"/><NavLink
                                                                            to="#"> {b.author}</NavLink></li>
                                                                        <li><FontAwesomeIcon icon={faFileAlt}
                                                                                             className="lnr lnr-file-add mr-4 ml-4"/><NavLink
                                                                            to="#">{b.category}</NavLink></li>
                                                                        <li><FontAwesomeIcon icon={faClock}
                                                                                             className="lnr lnr-clock ml-4 mr-4"/><NavLink
                                                                            to="#"> {b.publishOn !== null && parseDateAndTime(parseDate(new Date(b.publishOn)))}</NavLink>
                                                                        </li>
                                                                    </ul>
                                                                    <h4 className="title">
                                                                        <NavLink
                                                                            to={`${STRINGS.ROUTES.BLOG_DETAILS}/${b.id}`}>{b.title}</NavLink>
                                                                    </h4>
                                                                    <p className="blog-desc overflow-hidden">
                                                                        <iframe title='myFrame'
                                                                                src={"data:text/html," + encodeURIComponent(b.details.substr(0, 350) + "...")}
                                                                                style={{
                                                                                    border: "none",
                                                                                    outline: "none",
                                                                                    height: "6rem",
                                                                                    display: "flex",
                                                                                    width: "100%"
                                                                                }}
                                                                        />
                                                                    </p>
                                                                    <NavLink
                                                                        to={`${STRINGS.ROUTES.BLOG_DETAILS}/${b.id}`}
                                                                        className="ht-btn theme-btn theme-btn-two">View
                                                                        more <FontAwesomeIcon icon={faChevronRight}
                                                                                              className="lnr lnr-chevron-right"/></NavLink>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                    : "No Data Found"
                                                : <div className="spinner-holder">
                                                    <Spinner type={"Puff"}/>
                                                </div>
                                        }

                                        {
                                            blogs.length === 10 && (
                                                <div className="d-flex justify-content-center mt-4 mb-4 w-100">
                                                    <div className="col-5 col-lg-2 col-md-6 text-center">
                                                        <button className="ht-btn black-btn" style={{width: "100px"}}
                                                                onClick={() => this.handleLoadMore(this.filter.pageNo + 1)}>Load
                                                            more
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4" id="sticky-sidebar">
                                <div className="sidebar-wrapper" style={{borderLeft:"2px dashed #c355a0"}}>
                                    <div className="common-sidebar-widget">
                                        <div className="d-flex w-100 justify-content-center mb-4">
                                            {
                                                isLogin() && getUserData().rightsBlog && (
                                                    <div className="d-flex">
                                                        <button onClick={() => this.setState({
                                                            openComposer: true
                                                        })}
                                                                className="ht-btn black-btn">Add Blog
                                                        </button>
                                                    </div>
                                                )
                                            }
                                            {
                                                openComposer && (
                                                    <AddBlogModal openBlogComposer={openComposer}
                                                                  onSave={this.handleSaveBlog} onClose={() => {
                                                        this.setState({
                                                            openComposer: false
                                                        })
                                                    }}/>
                                                )
                                            }
                                        </div>
                                        <div className="sidebar-search-form">
                                            <form className="" onSubmit={this.handleSearch}>
                                                <input type="text" name="search" value={search}
                                                       onChange={(ev) => this.setState({
                                                           search: ev.target.value
                                                       })} placeholder="Search..."/>
                                                <button type="submit" className="ht-btn search-btn"><FontAwesomeIcon
                                                    icon={faSearch} className="fa fa-search"/></button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="common-sidebar-widget">
                                        <h2 className="sidebar-title">Categories</h2>
                                        <ul className="sidebar-list">
                                            {
                                                isResponse &&
                                                categoriesCount.length > 0 &&
                                                (
                                                    categoriesCount.map((c) =>
                                                        <li><NavLink to="#"
                                                                     onClick={() => this.handleCategorySearch(c.name)}>{c.name} ({c.count})</NavLink>
                                                        </li>
                                                    )
                                                )

                                            }
                                        </ul>
                                    </div>
                                    {/*<div className="common-sidebar-widget">*/}
                                    {/*    <h2 className="sidebar-title">Recent Post</h2>*/}
                                    {/*    <div className="sidebar-blog pt-0">*/}
                                    {/*        <NavLink to={STRINGS.ROUTES.BLOG_DETAILS} className="image"><img*/}
                                    {/*            src="assets/images/rc-post/rc1.jpg" alt=""/></NavLink>*/}
                                    {/*        <div className="content">*/}
                                    {/*            <span>Oct 24, 2019</span>*/}
                                    {/*            <h5><NavLink to={STRINGS.ROUTES.BLOG_DETAILS}>The Reason Why Software*/}
                                    {/*                Developer Repeats As ‘Best Job’</NavLink></h5>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="sidebar-blog">*/}
                                    {/*        <NavLink to={STRINGS.ROUTES.BLOG_DETAILS} className="image"><img*/}
                                    {/*            src="assets/images/rc-post/rc2.jpg" alt=""/></NavLink>*/}
                                    {/*        <div className="content">*/}
                                    {/*            <span>Oct 24, 2019</span>*/}
                                    {/*            <h5><NavLink to={STRINGS.ROUTES.BLOG_DETAILS}>7 Answers to the Most*/}
                                    {/*                Frequently Asked Questions About Job</NavLink></h5>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="sidebar-blog">*/}
                                    {/*        <NavLink to={STRINGS.ROUTES.BLOG_DETAILS} className="image"><img*/}
                                    {/*            src="assets/images/rc-post/rc1.jpg" alt=""/></NavLink>*/}
                                    {/*        <div className="content">*/}
                                    {/*            <span>Oct 24, 2019</span>*/}
                                    {/*            <h5><NavLink to={STRINGS.ROUTES.BLOG_DETAILS}>The Question Everyone*/}
                                    {/*                Working in Job Should Know to Answer</NavLink></h5>*/}
                                    {/*        </div>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="common-sidebar-widget">
                                        <h2 className="sidebar-title">Tags</h2>
                                        <ul className="sidebar-tag">
                                            {
                                                isResponse &&
                                                tagsCount.length > 0 &&
                                                (
                                                    tagsCount.map((t) =>
                                                        <li><NavLink to="#">{t.name}</NavLink></li>
                                                    )
                                                )

                                            }
                                        </ul>
                                    </div>
                                    {/*<div className="common-sidebar-widget">*/}
                                    {/*    <h2 className="sidebar-title">Archives</h2>*/}
                                    {/*    <ul className="sidebar-list">*/}
                                    {/*        <li><NavLink to="#">October 2019</NavLink></li>*/}
                                    {/*        <li><NavLink to="#">September 2019</NavLink></li>*/}
                                    {/*        <li><NavLink to="#">August 2019</NavLink></li>*/}
                                    {/*    </ul>*/}
                                    {/*</div>*/}
                                    {/*<div className="common-sidebar-widget">*/}
                                    {/*    <h2 className="sidebar-title">Meta</h2>*/}
                                    {/*    <ul className="sidebar-list">*/}
                                    {/*        <li><NavLink to="#">Log in</NavLink></li>*/}
                                    {/*        <li><NavLink to="#">Entries feed</NavLink></li>*/}
                                    {/*        <li><NavLink to="#">Comments feed</NavLink></li>*/}
                                    {/*        <li><NavLink to="#">WordPress.org</NavLink></li>*/}
                                    {/*    </ul>*/}
                                    {/*</div>*/}
                                    {/*<div className="common-sidebar-widget">*/}
                                    {/*    <div className="sidbar-image">*/}
                                    {/*        <NavLink to="#">*/}
                                    {/*            <img src={adsIcon} alt=""/>*/}
                                    {/*        </NavLink>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {/*<!-- Blog Section End -->*/}
                <Footer/>
            </div>
        );
    }
}