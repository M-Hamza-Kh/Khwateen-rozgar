import React, {useEffect, useRef} from 'react';
import {NavLink} from "react-router-dom";
import {STRINGS} from "../../utils/base";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Header} from "../header";
import {Footer} from "../footer";

const ReviewAdd = (props) => {
    const childDiv = useRef(null);

    useEffect(()=>{
        const handleScroll = () => {
            const { index, selected } = props
            if (index === selected) {
                setTimeout(() => {
                    childDiv.current.scrollIntoView({ behavior: 'smooth' })
                }, 500)
            }
        }
        handleScroll();
    })

    return (
        <React.Fragment>
            <Header headerClass={`black-logo-version header-sticky sticky-black d-none d-lg-block`}
                    logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
            <div className="breadcrumb-section section pt-40 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40" ref={childDiv}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <ul hidden className="page-breadcrumb">
                                    <li><NavLink to={STRINGS.ROUTES.ROOT}>Home</NavLink></li>
                                    <li>Reviews</li>
                                </ul>
                                <h1 className="text-center">ADD REVIEWS</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="review-section section pb-120 pb-lg-100 pb-md-80 pb-sm-60 pb-xs-50">
                <div className="container faq-wrapper">
                    <div className="row">
                        <div className="col-12">

                            <form action="#" className="rating-form">
                                <div className="row row-40">

                                    <div className="col-lg-6 offset-lg-3 ">
                                        <div className="row">

                                            <div className="col-md-6 col-12 mb-20">
                                                <label> Company City </label>
                                                <select className="nice-select">
                                                    <option>Karachi</option>
                                                    <option>Islamabad</option>
                                                    <option>Lahore</option>
                                                </select>
                                            </div>

                                            <div className="col-md-6 col-12 mb-20">
                                                <label>Company Name</label>
                                                <input type="text" placeholder="Company Name"/>
                                            </div>

                                            <div className="col-12 mb-20">
                                                <label>Company Address</label>
                                                <input type="text" placeholder="Address line 1"/>
                                                <input type="text" placeholder="Address line 2"/>
                                            </div>

                                            <div className="col-md-12 col-12 mb-20">
                                                <label>Review*</label>
                                                <textarea name="" rows="5"/>
                                            </div>

                                            <div className="col-md-12 col-12 mb-20">
                                                <div className="rating-breakdown">
                                                    <ul>
                                                        <li className="text-left">
                                                            <div className="rating-average">
                                                                <h3>Culture & Environment</h3>
                                                                <div className="star">
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="text-left">
                                                            <div className="rating-average">
                                                                <h3>People</h3>
                                                                <div className="star">
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="text-left">
                                                            <div className="rating-average">
                                                                <h3>Growth Potential</h3>
                                                                <div className="star">
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                    <NavLink to="#"><FontAwesomeIcon icon={faStar}
                                                                                                     color={STRINGS.TYPES.COLORS.DEFAULT}
                                                                                                     className="fas fa-star"/></NavLink>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="col-md-3">
                                                <button className="ht-btn black-btn">Submit</button>
                                            </div>


                                        </div>

                                    </div>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>

        </React.Fragment>
    );
};

export default ReviewAdd;