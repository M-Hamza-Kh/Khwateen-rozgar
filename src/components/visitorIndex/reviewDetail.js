import React, {useEffect, useRef, useState} from 'react';
import bg_top_about_us from "../../content/images/about/bg-top-about-us.jpg";
import {NavLink} from "react-router-dom";
import {getUserData, isLogin, STRINGS} from "../../utils/base";
import {Footer} from "../footer";
import {Header} from "../header";
import defaultCompanyLogo from "../../content/images/portfolio/user_default.jpg";
import {Rating} from "@material-ui/lab";
import Spinner from "../spinner";
import {API} from "../../utils/services";
import AddReviews from "../dashboard/modals/AddReviews";
import {Button} from "@material-ui/core";
import ConfirmModal from "../dashboard/modals/confirmModal";

const filterReviews = {
    pageNo: 1
}

const initialState = {
    selected_id: STRINGS.DEFAULTS.guid,
    openConfirmDialog: false,
    isResponse:false
}

const ReviewDetail = (props) => {
    const [reviewDetail, setReviewDetail] = useState({});
    const [reviews, setReviews] = useState([]);
    const [init, setInit] = useState(initialState);
    const [responseOver, setResponseOver] = useState(false);
    const [openAddReviews, setOpenAddReviews] = useState(false);
    const childDiv = useRef(null);
    const company_id = props.match.params.id !== undefined ? props.match.params.id : ""
    console.log("reviewDetail", props)
    useEffect(() => {
        const handleScroll = () => {
            const {index, selected} = props
            if (index === selected) {
                setTimeout(() => {
                    childDiv.current.scrollIntoView({behavior: 'smooth'})
                }, 500)
            }
        }
        handleScroll();
        console.log("props", props)
    });

    const getCompanyReview = ({id, page}) => {
        API.REVIEWS.getCompanyReviews({id, page}).then((response) => {
            if (response.status) {
                setReviews([...reviews,...response.data]);
                setInit({
                    ...init,
                    isResponse:true
                })
            } else {
                alert(response.error)
            }
        })
    }

    useEffect(() => {
        console.log("company_id", company_id)
        if (company_id !== "") {
            API.REVIEWS.getReviewByCompanyId(company_id).then((res) => {
                if (res.status) {
                    setReviewDetail(res.data);
                    setResponseOver(res.data);
                    getCompanyReview({id: res.data.id, page: filterReviews.pageNo});
                } else {
                    alert(res.error)
                }
            })
        }
    }, [company_id]);

    const onCloseAddReview = () => {
        setOpenAddReviews(false)
    }

    const handleLoadMore = (page) => {
        filterReviews.pageNo = page;
        console.log("loadmore",filterReviews.pageNo)
        getCompanyReview({id: reviewDetail.id, page: filterReviews.pageNo});
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
                console.log("reviews",data);
                window.location.reload()
            } else {
                alert(error)
            }
        }).catch((err) => alert(err))
    }
    // const onSuccess = (data) => {
    //     //setReviews([...reviews,...data.reviews])
    // }

    console.log("reviewDetail", reviewDetail)

    return (
        <React.Fragment>
            <Header headerClass={`black-logo-version header-sticky sticky-black d-none d-lg-block`}
                    logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
            <div className="page-banner-section section" ref={childDiv}>
                <div className="banner-image">
                    <img src={bg_top_about_us} alt=""/>
                </div>
            </div>

            <div className="breadcrumb-section section pt-40 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40">
                <div className="container">
                    <div className="row">
                        { init.openConfirmDialog &&
                        (<ConfirmModal id={init.selected_id} onSave={onConfirm} onClose={() => setInit({
                            ...init,
                            selected_id: STRINGS.DEFAULTS.guid,
                            openConfirmDialog: false
                        })}/>)
                        }
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <ul hidden className="page-breadcrumb">
                                    <li><NavLink to={STRINGS.ROUTES.ROOT}>Home</NavLink></li>
                                    <li>Reviews</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="review-section section pb-60">

                {
                    responseOver ? (
                        <div className="container">
                            {
                                openAddReviews && (
                                    <AddReviews updateData={reviewDetail} openAddReviews={openAddReviews}
                                                // onSave={onSuccess}
                                                onClose={onCloseAddReview}/>
                                )
                            }

                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="employer-head-info">
                                        <div className="employer-logo">
                                            <NavLink to="#"><img
                                                src={reviewDetail.companyLogoURL !== "" ? reviewDetail.companyLogoURL : defaultCompanyLogo}
                                                alt="#"/></NavLink>
                                        </div>
                                        <div className="employer-content">
                                            <h1 className="employer-name">{reviewDetail.company}</h1>
                                            <div className="employer-rate">
                                                <div className="star">
                                                    <Rating
                                                        className="rating-review"
                                                        style={{
                                                            color: "#c355a0"
                                                        }}
                                                        name="disabled"
                                                        precision={0.5}
                                                        value={reviewDetail.rating}
                                                        disabled
                                                    />
                                                </div>
                                                <span
                                                    className="total theme-color">{parseFloat(reviewDetail.rating).toFixed(1)} Ratings </span>
                                            </div>
                                            <div className="d-flex">
                                                Based on {reviewDetail.noOfReviewed} no of rating
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="col-lg-6">
                                    <div className="rating-breakdown">
                                        <ul>
                                            <li>
                                                <div className="rating-average">
                                                    <h3>Culture & Environment</h3>
                                                    <div className="star">
                                                        <Rating
                                                            className="rating-review"
                                                            style={{
                                                                color: "#c355a0"
                                                            }}
                                                            name="disabled"
                                                            precision={0.5}
                                                            value={reviewDetail.cultureEnvironment}
                                                            disabled
                                                        />
                                                    </div>
                                                    <span>{parseFloat(reviewDetail.cultureEnvironment).toFixed(1)}</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="rating-average">
                                                    <h3>Safety</h3>
                                                    <div className="star">
                                                        <Rating
                                                            className="rating-review"
                                                            style={{
                                                                color: "#c355a0"
                                                            }}
                                                            name="disabled"
                                                            precision={0.5}
                                                            value={reviewDetail.safety}
                                                            disabled
                                                        />
                                                    </div>
                                                    <span>{parseFloat(reviewDetail.safety).toFixed(1)}</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="rating-average">
                                                    <h3>Growth Potential</h3>
                                                    <div className="star">
                                                        <Rating
                                                            className="rating-review"
                                                            style={{
                                                                color: "#c355a0"
                                                            }}
                                                            name="disabled"
                                                            precision={0.5}
                                                            value={reviewDetail.growthPotential}
                                                            disabled
                                                        />
                                                    </div>
                                                    <span>{parseFloat(reviewDetail.growthPotential).toFixed(1)}</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {
                                    init.isResponse ?
                                        reviews.length > 0 ?
                                            <div className="review-area mt-30 d-flex flex-column w-100">
                                                <div className="review-container w-100">
                                                    <div className="d-flex justify-content-between">
                                                        <h3 className="title">{reviews.length} Reviews</h3>

                                                        {
                                                            isLogin() && (
                                                                <div className="row flex-nowrap float-right">
                                                                    <button onClick={() => setOpenAddReviews(true)}
                                                                            className="ht-btn black-btn mr-2 ml-2">Add Review
                                                                    </button>
                                                                    {/*<button onClick={(e) => {*/}
                                                                    {/*    handleDelete(reviewDetail);*/}
                                                                    {/*    e.preventDefault()*/}
                                                                    {/*}}*/}
                                                                    {/*        className="ht-btn black-btn ml-2 mb-r">Delete*/}
                                                                    {/*</button>*/}
                                                                </div>

                                                            )
                                                        }
                                                    </div>

                                                    {
                                                        reviews.map((r) =>
                                                            <div className="review-content mb-30">
                                                                <div className="review-avatar">
                                                                    <h1>{parseFloat(r.rating).toFixed(1)}</h1>
                                                                </div>

                                                                <div className="review-details">
                                                                    <div className="review-title">
                                                                        <h3 className="title">{r.userName}</h3>
                                                                        <div className="rate-content">
                                                                            <div className="star">
                                                                                <Rating
                                                                                    className="rating-review"
                                                                                    style={{
                                                                                        color: "#c355a0"
                                                                                    }}
                                                                                    name="disabled"
                                                                                    precision={0.5}
                                                                                    value={r.rating}
                                                                                    disabled
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="review-des">
                                                                        <p>{r.message}</p>
                                                                    </div>
                                                                    <div className="review-des">
                                                                        {
                                                                            isLogin() && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                                                                                <div className="d-flex width-100 justify-content-end" style={{padding: "10px"}}>
                                                                                    <Button
                                                                                        onClick={() => handleDelete(r)}
                                                                                        className="flex text-white"
                                                                                        style={{fontSize: "12px", backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`}}>
                                                                                        Delete
                                                                                    </Button>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            : "No Data Found" :
                                        <div className="spinner-holder">
                                            <Spinner type={"Puff"}/>
                                        </div>
                                }
                                {
                                    reviews.length === 10 && (
                                        <div className="d-flex justify-content-center mt-4 mb-4 w-100">
                                            <div className="col-5 col-lg-2 col-md-6 text-center">
                                                <button className="ht-btn black-btn" style={{width:"100px"}}
                                                        onClick={() => handleLoadMore(filterReviews.pageNo + 1)}>Load more
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ) :
                        <div className="spinner-holder">
                            <Spinner type={"Puff"}/>
                        </div>
                }

            </div>
            <Footer/>
        </React.Fragment>
    );
};

export default ReviewDetail;