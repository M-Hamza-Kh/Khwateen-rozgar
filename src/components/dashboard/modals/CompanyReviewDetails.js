import React, {useEffect, useState} from 'react';
import {dropDownSelection, getUserData, STRINGS} from "../../../utils/base";
import {NavLink} from "react-router-dom";
import defaultCompanyLogo from "../../../content/images/portfolio/user_default.jpg";
import {Rating} from "@material-ui/lab";
import Spinner from "../../spinner";
import {API} from "../../../utils/services";
import {Button, FormControl} from "@material-ui/core";
import $ from "jquery"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import swal from 'sweetalert';
import { withRouter } from "react-router-dom";
// import AddReviews from "./AddReviews";

const filterReviews = {
    isApproved: false,
    pageNo: 1
}

const CompanyReviewDetails = (props) => {
    const {openDetailModal, onClose, reviewDetail} = props;
    const [reviews, setReviews] = useState([])
    const [isPending, setPending] = useState(false)
    // const [isApproved, setIsApproved] = useState(2)

    useEffect(() => {
        console.log("reviewDetail", reviewDetail)
        if (reviewDetail) {
            getAdminCompanyReviews({
                id: reviewDetail.id,
                isApproved: filterReviews.isApproved,
                page: filterReviews.pageNo
            })
            // getCompanyReview({id: reviewDetail.id, page: filterReviews.pageNo})
        }
        $(document).ready(() => {
            $("#approved").on("change", function (e) {
                console.log("approved", e.target.value);
                setPending(false);
                handleOnChangeDropDown(e.target.value)
            })
        })
    }, []);

    // const getCompanyReview = (filter) => {
    //     API.REVIEWS.getCompanyReviews(filter).then((response) => {
    //         if (response.status) {
    //             setReviews(response.data);
    //             setPending(true);
    //         } else {
    //             alert(response.error)
    //         }
    //     })
    // }

    const getAdminCompanyReviews = (filter) => {
        API.REVIEWS.getAdminCompanyReviews(filter).then((response) => {
            if (response.status) {
                setReviews(response.data);
                setPending(true);
            } else {
                alert(response.error)
            }
        })
    }

    const handleLoadMore = (page) => {
        filterReviews.pageNo = page;
        console.log("loadmore", filterReviews.pageNo)
        getAdminCompanyReviews({id: reviewDetail.id, isApproved: filterReviews.isApproved, page: filterReviews.pageNo})
        //getCompanyReview({id: reviewDetail.id, page: filterReviews.pageNo});
    }

    const handleOnChangeDropDown = (e) => {
        let ev = parseInt(e)
        if (ev === 1) {
            filterReviews.isApproved = true
            getAdminCompanyReviews({
                id: reviewDetail.id,
                isApproved: filterReviews.isApproved,
                page: filterReviews.pageNo
            })
            // setIsApproved(ev)
        }
        if (ev === 2) {
            filterReviews.isApproved = false
            getAdminCompanyReviews({
                id: reviewDetail.id,
                isApproved: filterReviews.isApproved,
                page: filterReviews.pageNo
            })
            // setIsApproved(ev)
        }
    }

    const handleApproved = (rowObj) => {
        rowObj.isApproved = true
        API.REVIEWS.reviewApproved(rowObj.id, rowObj).then((response) => {
            if (response.status) {
                onClose();
                swal("", "Review Approved Successfully", "success")
                props.history.push('/reviews_list')  

                //alert("Review Approved Successfully");
               // window.location.href = STRINGS.ROUTES.DASHBOARD.REVIEWS_LIST
            }
        })
    }

    return (
        <React.Fragment>
            {
                dropDownSelection()
            }
            <div
                className={`modal fade profile-modal-container ${openDetailModal ? `show` : ``}`}
                id="about-modal"
                tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered"
                     role="document">
                    <div className="modal-content">
                        <button type="button" className="close"
                                data-dismiss="modal"
                                aria-label="Close">
                                                                    <span aria-hidden="true"
                                                                          onClick={() => onClose()}>&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header">
                                    <h2 className="card-title mb-0" style={{fontSize: "12px"}}>Review Details</h2>
                                </header>
                                <div className="card-body">

                                    <div className="review-section section pb-60">
                                        <div className="container">
                                            {/*{*/}
                                            {/*    openAddReviews && (*/}
                                            {/*        <AddReviews updateData={reviewDetail} openAddReviews={openAddReviews}*/}
                                            {/*                    onSave={() => window.location.href === STRINGS.ROUTES.REVIEW_DETAIL}*/}
                                            {/*                    onClose={onCloseAddReview}/>*/}
                                            {/*    )*/}
                                            {/*}*/}
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
                                                <div className="d-flex w-100">
                                                    <FormControl style={{
                                                        display: "flex",
                                                        width: "10rem",
                                                        margin: "5px",
                                                        color: `${STRINGS.TYPES.COLORS.DEFAULT}`
                                                    }}>
                                                        {/*<InputLabel id="demo-simple-select-label"*/}
                                                        {/*            style={{color: `${STRINGS.TYPES.COLORS.DEFAULT}`}}>Types</InputLabel>*/}

                                                        <select id="approved" className="nice-select wide"
                                                                name="approved" onChange={handleOnChangeDropDown}>
                                                            {dropDownSelection()}
                                                            <option value={1}>Approved</option>
                                                            <option selected value={2}>Not Approved</option>
                                                        </select>
                                                    </FormControl>
                                                </div>
                                                {
                                                    isPending ?
                                                    reviews.length > 0 ?
                                                        <div className="review-area mt-30 d-flex flex-column w-100">
                                                            <div className="review-container w-100">
                                                                <h3 className="title">{reviews.length} Reviews</h3>

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

                                                                                {
                                                                                    !r.isApproved && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE ? (
                                                                                        <div className="review-des">
                                                                                            <Button
                                                                                                style={{marginRight: "4px",backgroundColor:`${STRINGS.TYPES.COLORS.DEFAULT}`,color:"white"}}
                                                                                                onClick={() => handleApproved(r)}
                                                                                            ><FontAwesomeIcon
                                                                                                icon={faCircle}
                                                                                                className="lnr lnr-eye mr-2"/><span>Approve</span></Button>
                                                                                        </div>
                                                                                    ) : <div className="review-des">
                                                                                        <span
                                                                                            style={{
                                                                                                background: "#60d616",
                                                                                                padding: "5px",
                                                                                                borderRadius: "4px",
                                                                                                color: "white",
                                                                                            }}>Approved</span>
                                                                                    </div>
                                                                                }


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
                                                                <button className="ht-btn black-btn"
                                                                        style={{width: "100px"}}
                                                                        onClick={() => handleLoadMore(filterReviews.pageNo + 1)}>Load
                                                                    more
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/*<div className="card-footer">*/}
                                {/*    <div className="row">*/}
                                {/*        <div className="col-12">*/}
                                {/*            <div*/}
                                {/*                className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">*/}
                                {/*                <button*/}
                                {/*                    onClick={handleUpdate}*/}
                                {/*                    className="ht-btn theme-btn theme-btn-two mb-xs-20">Update Profile*/}
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

export default withRouter(CompanyReviewDetails);