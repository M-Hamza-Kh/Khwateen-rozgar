import React, {useEffect, useRef, useState} from 'react';
import bg_img from "../../content/images/bg/review_bg.jpg";
import {dropDownSelection, getUserData, isLogin, STRINGS} from "../../utils/base";
import {NavLink} from "react-router-dom";
import {Header} from "../header";
import {Footer} from "../footer";
import {MobileHeader} from "../mobile/header";
import {StartPopUpMenu} from "../startPopUpMenu";
import {Button, makeStyles} from "@material-ui/core";
import {API} from "../../utils/services";
import Spinner from "../spinner";
import {Rating} from "@material-ui/lab";
import defaultCompanyLogo from "../../content/images/portfolio/user_default.jpg";
import {useDispatch} from "react-redux";
import SelectCities from "../AutoComplete/SelectCities";
import AddReviews from "../dashboard/modals/AddReviews";
import ConfirmModal from "../dashboard/modals/confirmModal";


const useStyles = makeStyles(() => ({
    "reviews-nice-select": {
        width: "95%"
    },
    ".reviews-input": {
        width: "95%",
        height: "50px",
        border: "1px solid #999999",
        lineHeight: "24px",
        padding: "9px 20px",
        color: "#444444",
        backgroundColor: "#fff",
    }
}))

const initialState = {
    openAddComposer: false,
    isResponse: false,
    showMenu: false,
    selected_id: STRINGS.DEFAULTS.guid,
    openConfirmDialog: false
}

const filterReview = {
    City: "",
    Company: "",
    SortBy: "",
    pageNo: 1
}

const ReviewsList = (props) => {
    const classes = useStyles()
    const [init, setInit] = useState(initialState);
    const [latest, setLatest] = useState([]);
    const [top, setTop] = useState([]);
    // const [reviews, setReviews] = useState([]);
    const [getCities, setCities] = useState([]);
    const [city, setCity] = useState("");
    const [company, setCompany] = useState("");
    const [openAddReviews, setOpenAddReviews] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const childDiv = useRef(null);
    // const dispatch = useDispatch();
    // const reviewDetail = useSelector(({ReviewReducer}) => ReviewReducer.reviewDetail);
    // const isPending = useSelector(({ReviewReducer}) => ReviewReducer.isPending);


    useEffect(() => {
        dropDownSelection();
        const handleScroll = () => {
            const {index, selected} = props
            if (index === selected) {
                setTimeout(() => {
                    childDiv.current.scrollIntoView({behavior: 'smooth'})
                }, 500)
            }
        }
        handleScroll();

        const getUnique = () => {
            API.REVIEWS.getUniqueReviewsCities().then((res) => {
                if (res.status) {
                    setCities(res.data.uniqueCities)
                } else {
                    alert(res.error)
                }
            })
        }
        getUnique();

        filterReview.SortBy = "Latest"
        searchReviewLatest(filterReview);
        filterReview.SortBy = "Top"
        searchReviewTop(filterReview);
        window.onresize = () => {
            if (window.innerWidth >= 1000) {
                setInit({
                    ...init,
                    showMenu: false,
                })
            }
        }
    }, []);


    const searchReviewLatest = (filter) => {
        API.REVIEWS.getSearchReviews(filter).then((response) => {
            if (response.status) {
                setInit({
                    ...init,
                    isResponse: true
                });
                setLatest(response.data)
            } else {
                alert(response.error)
            }
        })
    }

    const searchReviewTop = (filter) => {
        API.REVIEWS.getSearchReviews(filter).then((response) => {
            if (response.status) {
                setInit({
                    ...init,
                    isResponse: true
                });
                setTop(response.data)
            } else {
                alert(response.error)
            }
        })
    }


    const handleOpenShowMenu = () => {
        setInit({
            ...init,
            showMenu: !init.showMenu,
        })
    }

    const handleShowDetails = (details) => {
        //dispatch(Action.getReviewDetail(details));
        //history.push(`${STRINGS.ROUTES.REVIEW_DETAIL}/${details.id}`)
    }

    const handleSelectCity = (selectedOption) => {
        setCity(selectedOption)
    }
    const handleSubmit = () => {
        if (city !== "" || company !== "") {
            filterReview.Company = company;
            filterReview.City = city;
            filterReview.SortBy = "";
            setInit({
                ...init,
                isResponse: false,
            });
            setIsSearch(true)
            searchReviewLatest(filterReview)
        }
    }
    const handleSeeAll = () => {
        filterReview.Company = "";
        filterReview.City = "";
        filterReview.SortBy = "";
        setInit({
            ...init,
            isResponse: false,
        });
        setIsSearch(true)
        searchReviewLatest(filterReview)
    }
    const handleLoadMore = (page) => {
        filterReview.pageNo = page;
        setInit({
            ...init,
            isResponse: false,
        });
        setIsSearch(true)
        searchReviewLatest(filterReview)
    }

    const onCloseAddReview = () => {
        setOpenAddReviews(false)
    }

    const handleDelete = (data) => {
        setInit({
            ...init,
            selected_id: data.id,
            openConfirmDialog: true
        })
    }

    const onConfirm = (id) => {
        API.REVIEWS.deleteSettings(id).then(({status, error, data}) => {
            if (status) {
                filterReview.SortBy = "Latest"
                searchReviewLatest(filterReview);
                filterReview.SortBy = "Top"
                searchReviewTop(filterReview);
            } else {
                alert(error)
            }
        }).catch((err) => alert(err))
    }



    return (
        <div className={`template-color-1 ${init.showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
            <Header headerClass={`black-logo-version header-sticky sticky-black d-none d-lg-block`}
                    logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
            <MobileHeader openShowMenu={handleOpenShowMenu}/>

            <StartPopUpMenu closeShowMenu={handleOpenShowMenu}/>
            {
                openAddReviews && (
                    <AddReviews openAddReviews={openAddReviews} onClose={onCloseAddReview}/>
                )
            }

            <React.Fragment>
                <div className="breadcrumb-section section page-heading pt-100 pb-150 pt-xs-50 pb-xs-50"
                     style={{background: `url(${bg_img})`, backgroundSize: "cover",backgroundPosition:"center"}} ref={childDiv}>
                    <div className="container">
                        <div className="row">
                            { init.openConfirmDialog &&
                            (<ConfirmModal id={init.selected_id} onSave={onConfirm} onClose={() => setInit({
                                ...init,
                                selected_id: STRINGS.DEFAULTS.guid,
                                openConfirmDialog: false
                            })}/>)
                            }
                            <div className="col-xl-8 col-lg-10 ml-auto mr-auto pt-100 pt-xs-30">
                                <div className="page-breadcrumb-content color-white">
                                    <ul className="page-breadcrumb color-white">
                                        <li><NavLink to={STRINGS.ROUTES.ROOT}>Home</NavLink></li>
                                        <li>Reviews</li>
                                    </ul>
                                    <h1>Reviews</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reviews over-ban section pb-60 pb-lg-60 pb-md-60 pb-sm-60 pb-xs-50">
                    <div className="container">
                        <div className="row no-gutters">
                            <div
                                className="col-lg-3 col-md-6 pb-xs-10 d-flex justify-content-center align-items-center">
                                {/*<select className={`nice-select ${classes["reviews-nice-select"]}`}*/}
                                {/*        style={{width: "95%"}}>*/}
                                {/*    <option>Select City</option>*/}
                                {/*    <option>Karachi</option>*/}
                                {/*    <option>Islamabad</option>*/}
                                {/*    <option>Lahore</option>*/}
                                {/*</select>*/}
                                <div className={classes["reviews-nice-select"]}>
                                    <SelectCities
                                        id="city"
                                        title="City"
                                        value={city}
                                        onChange={handleSelectCity}
                                        options={getCities}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 pb-xs-10">
                                <input type="text" name="company"
                                       value={company}
                                       onChange={(ev) => setCompany(ev.target.value)}
                                       className={`nice-select ${classes[".reviews-input"]}`}
                                       placeholder="Company Search"/>
                            </div>
                            <div className="col-5 col-lg-2 col-md-6">
                                <button className="ht-btn black-btn" onClick={handleSubmit}>Search</button>
                            </div>
                            <div className="col-2 col-lg-1 col-md-6">
                            </div>
                            {/*{*/}
                            {/*    isLogin() && getUserData().rightsReview && (*/}
                            {/*        */}
                            {/*    )*/}
                            {/*}*/}
                            <div className="col-5 col-lg-2 col-md-6 pr-xs-20">
                                <button onClick={() => setOpenAddReviews(true)}
                                        className="ht-btn black-btn">Add Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="job-details-section section pt-30 pt-lg-30 pt-md-30 pt-sm-30 pt-xs-30 pb-60 pb-lg-60 pb-md-60 pb-sm-60 pb-xs-60">
                    <div className="container">
                        <div className="row">
                            <div className={`order-2 mt-sm-60 mt-xs-50 ${!isSearch ? "col-lg-6" : "col-lg-12"}`}>
                                {
                                    !isSearch && (
                                        <h3 className="text-center">Latest Reviews</h3>
                                    )
                                }
                                <div className="common-sidebar-widget sidebar-three pt-20 pl-55">
                                    {
                                        init.isResponse ?
                                            latest.length > 0 ?
                                                latest.map((lt) =>
                                                    <NavLink to={`${STRINGS.ROUTES.REVIEW_DETAIL}/${lt.id}`}
                                                             className="sidebar-job-employer mb-15"
                                                             style={{margin: "0 1rem"}}>
                                                        <div className="job-employer-widget">
                                                            <div className="image">
                                                                <img
                                                                    src={lt.companyLogoURL !== undefined && lt.companyLogoURL !== "" ? lt.companyLogoURL : defaultCompanyLogo}
                                                                    alt="#"/>
                                                            </div>
                                                            <div className="content-box">

                                                                <h4 className="title">
                                                                    <NavLink to={`${STRINGS.ROUTES.REVIEW_DETAIL}/${lt.id}`}>{lt.company}</NavLink>
                                                                </h4>
                                                                <div className="d-flex">
                                                                    <span style={{fontSize:"13px"}}>{lt.city}</span>
                                                                </div>
                                                                <div className="employer-rate">
                                                                    <div className="star">
                                                                        {/*    <FontAwesomeIcon icon={faStar}*/}
                                                                        {/*                     color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                                        {/*                     className="fas fa-star"/>*/}
                                                                        {/*    <FontAwesomeIcon icon={faStar}*/}
                                                                        {/*                     color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                                        {/*                     className="fas fa-star"/>*/}
                                                                        {/*    <FontAwesomeIcon icon={faStar}*/}
                                                                        {/*                     color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                                        {/*                     className="fas fa-star"/>*/}
                                                                        {/*    <FontAwesomeIcon icon={faStar}*/}
                                                                        {/*                     color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                                        {/*                     className="fas fa-star"/>*/}
                                                                        {/*    <FontAwesomeIcon icon={faStar}*/}
                                                                        {/*                     color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                                        {/*                     className="fas fa-star"/>*/}
                                                                        {/*</div>*/}
                                                                        <Rating
                                                                            className="rating-review"
                                                                            style={{
                                                                                color: "#c355a0"
                                                                            }}
                                                                            name="disabled"
                                                                            precision={0.5}
                                                                            value={lt.rating}
                                                                            disabled
                                                                        />
                                                                        <div
                                                                            className="text">{parseFloat(lt.rating).toFixed(1)} Ratings
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="employer-rate">
                                                                <span
                                                                    className="text">Based on {lt.noOfReviewed} no of rating</span>
                                                                </div>
                                                                {/*<div className="employer-rate">*/}
                                                                {/*    {*/}
                                                                {/*        isLogin() && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (*/}
                                                                {/*            <div className="d-flex width-100 justify-content-end" style={{padding: "10px"}}>*/}
                                                                {/*                <Button*/}
                                                                {/*                    onClick={(e) => {*/}
                                                                {/*                        handleDelete(lt);*/}
                                                                {/*                        e.preventDefault()*/}
                                                                {/*                    }}*/}
                                                                {/*                    className="flex text-white"*/}
                                                                {/*                    style={{fontSize: "12px", backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`}}>*/}
                                                                {/*                    Delete*/}
                                                                {/*                </Button>*/}
                                                                {/*            </div>*/}
                                                                {/*        )*/}
                                                                {/*    }*/}
                                                                {/*</div>*/}
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                )
                                                : "No Data Found"
                                            : <div className="spinner-holder">
                                                <Spinner type="Puff"/>
                                            </div>
                                    }
                                </div>
                            </div>
                            {
                                !isSearch && (
                                    <div className="col-lg-6 order-1 pr-55 pr-md-15 pr-sm-15 pr-xs-15">
                                        <h3 className="text-center">Top Reviews</h3>
                                        <div className="common-sidebar-widget sidebar-three pt-20">
                                            {
                                                init.isResponse ?
                                                    top.length > 0 ?
                                                        top.map((lt) =>
                                                            <NavLink to={`${STRINGS.ROUTES.REVIEW_DETAIL}/${lt.id}`}
                                                                     className="sidebar-job-employer mb-15">
                                                                <div className="job-employer-widget">
                                                                    <div className="image">
                                                                        <img
                                                                            src={lt.companyLogoURL !== undefined && lt.companyLogoURL !== "" ? lt.companyLogoURL : defaultCompanyLogo}
                                                                            alt="#"/>
                                                                    </div>
                                                                    <div className="content-box">

                                                                        <h4 className="title">
                                                                            <NavLink
                                                                                to={`${STRINGS.ROUTES.REVIEW_DETAIL}/${lt.id}`}
                                                                                onClick={() => handleShowDetails(lt)}>{lt.company}</NavLink>
                                                                        </h4>
                                                                        <div className="d-flex">
                                                                            <span style={{fontSize:"13px"}}>{lt.city}</span>
                                                                        </div>
                                                                        <div className="employer-rate">
                                                                            <div className="star">
                                                                                {/*    <FontAwesomeIcon icon={faStar}*/}
                                                                                {/*                     color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                                                {/*                     className="fas fa-star"/>*/}
                                                                                {/*    <FontAwesomeIcon icon={faStar}*/}
                                                                                {/*                     color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                                                {/*                     className="fas fa-star"/>*/}
                                                                                {/*    <FontAwesomeIcon icon={faStar}*/}
                                                                                {/*                     color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                                                {/*                     className="fas fa-star"/>*/}
                                                                                {/*    <FontAwesomeIcon icon={faStar}*/}
                                                                                {/*                     color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                                                {/*                     className="fas fa-star"/>*/}
                                                                                {/*    <FontAwesomeIcon icon={faStar}*/}
                                                                                {/*                     color={STRINGS.TYPES.COLORS.DEFAULT}*/}
                                                                                {/*                     className="fas fa-star"/>*/}
                                                                                {/*</div>*/}
                                                                                <Rating
                                                                                    className="rating-review"
                                                                                    style={{
                                                                                        color: "#c355a0"
                                                                                    }}
                                                                                    name="disabled"
                                                                                    precision={0.5}
                                                                                    value={lt.rating}
                                                                                    disabled
                                                                                />
                                                                                <div
                                                                                    className="text">{parseFloat(lt.rating).toFixed(1)} Ratings
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="employer-rate">
                                                                <span
                                                                    className="text">Based on {lt.noOfReviewed} no of rating</span>
                                                                        </div>
                                                                        {/*<div className="employer-rate">*/}
                                                                        {/*    {*/}
                                                                        {/*        isLogin() && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (*/}
                                                                        {/*            <div className="d-flex width-100 justify-content-end" style={{padding: "10px"}}>*/}
                                                                        {/*                <Button*/}
                                                                        {/*                    onClick={(e) => {*/}
                                                                        {/*                        handleDelete(lt);*/}
                                                                        {/*                        e.preventDefault()*/}
                                                                        {/*                    }}*/}
                                                                        {/*                    className="flex text-white"*/}
                                                                        {/*                    style={{fontSize: "12px", backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`}}>*/}
                                                                        {/*                    Delete*/}
                                                                        {/*                </Button>*/}
                                                                        {/*            </div>*/}
                                                                        {/*        )*/}
                                                                        {/*    }*/}
                                                                        {/*</div>*/}
                                                                    </div>
                                                                </div>
                                                            </NavLink>
                                                        )
                                                        : "No Data Found"
                                                    : <div className="spinner-holder">
                                                        <Spinner type="Puff"/>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mt-4 mb-4">
                        <div className="col-5 col-lg-2 col-md-6 text-center">
                            <div className="text-bold "
                                 style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`, cursor: "pointer"}}
                                 onClick={handleSeeAll}>See All
                            </div>
                        </div>
                    </div>
                    {
                        isSearch && (
                            latest.length === 10 && (
                                <div className="d-flex justify-content-center mt-4 mb-4">
                                    <div className="col-5 col-lg-2 col-md-6">
                                        <button className="ht-btn black-btn"
                                                onClick={() => handleLoadMore(filterReview.pageNo + 1)}>Load more
                                        </button>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </React.Fragment>

            <Footer/>

        </div>
    );
};

export default ReviewsList;