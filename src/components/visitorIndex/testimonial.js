import React, {useEffect, useRef, useState} from 'react';
// import testimonial_1 from "../../content/images/testimonial/testimonial-1.png";
import {NavLink} from "react-router-dom";
import {getUserData, isLogin, STRINGS} from "../../utils/base";
import {Header} from "../header";
import {Footer} from "../footer";
import {API} from "../../utils/services";
import TestimonialItem from "./testimonialItems/testimonialItem";
import Spinner from "../spinner";
import {Button} from "@material-ui/core";
import AddTestimonialMessage from "../dashboard/modals/AddTestimonialMessage";
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import FilterFramesIcon from '@material-ui/icons/FilterFrames';
import {MobileHeader} from "../mobile/header";
import {StartPopUpMenu} from "../startPopUpMenu";

const defaultState = {
    getAllData: [],
    isResponse: false,
    openAddMessage: false,
    showMenu: false
}
let currentPage = 1
const Testimonial = (props) => {
    const childDiv = useRef(null);
    const [form, setForm] = useState(defaultState);
    useEffect(() => {
        handleScroll();
        getAllTestimonials(currentPage);
        window.onresize = () => {
            if (window.innerWidth >= 1000) {
                setForm({
                    ...form,
                    showMenu: false,
                })
            }
        }
    }, []);


    const getAllTestimonials = (page) => {
        API.TESTIMONIALS.getAllTestimonials(page).then((response) => {
            console.log("test", response)
            if (response.status) {
                setForm({
                    ...form,
                    getAllData: response.data,
                    isResponse: true
                })
            } else {
                alert(response.error)
            }
        })
    }


    const handleScroll = () => {
        const {index, selected} = props
        if (index === selected) {
            setTimeout(() => {
                childDiv.current.scrollIntoView({behavior: 'smooth'})
            }, 500)
        }
    }

    const handleMessage = (message) => {
        console.log(message)
        const messageObj = {
            message: message
        }
        API.TESTIMONIALS.addMessage(messageObj).then((response) => {
            console.log("test", response)
            if (response.status) {
                alert("Message Sends for approval");
            } else {
                alert(response.error)
            }
        })
    }

    const handleDelete = () => {
        getAllTestimonials(currentPage);
    }


    const handleOpenShowMenu = () => {
        setForm({
            ...form,
            showMenu: !form.showMenu,
        })
    }

    return (
        <div className={`template-color-1 ${form.showMenu ? `popup-mobile-menu-wrapper` : ""}`}>
            <Header headerClass={`black-logo-version header-sticky sticky-black d-none d-lg-block`}
                    logoType={STRINGS.TYPES.LOGO_TYPE.LOGIN}/>
            <MobileHeader openShowMenu={handleOpenShowMenu}/>

            <StartPopUpMenu closeShowMenu={handleOpenShowMenu}/>
            {/*<!-- Breadcrumb Section Start -->*/}
            <div className="breadcrumb-section section bg_color--5 pt-30 pt-sm-50 pt-xs-40 pb-30 pb-sm-50 pb-xs-40"
                 ref={childDiv}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content d-flex align-items-center">
                                <ul hidden className="page-breadcrumb">
                                    <li><NavLink to={STRINGS.ROUTES.ROOT}>Home</NavLink></li>
                                    <li>Testimonials</li>
                                </ul>
                                <h1>Testimonials</h1>
                                {
                                    isLogin() && (
                                        getUserData().type === STRINGS.USER_TYPE.APPLICANT_TYPE && (
                                            <div className="d-flex align-items-center ml-4 mr-4">
                                                <Button
                                                    onClick={() => setForm({
                                                        ...form,
                                                        openAddMessage: true
                                                    })}
                                                    style={{
                                                        backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`,
                                                        color: "white"
                                                    }}
                                                >
                                                    <FilterFramesIcon style={{color: "white", marginRight: "4px"}}/>
                                                    Add Message
                                                </Button>
                                            </div>
                                        )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<!-- Breadcrumb Section Start -->*/}

            {/*<!-- Breadcrumb Section Start -->*/}
            <div className="blog-section section bg_color--5 pb-30 pb-lg-30 pb-md-30 pb-sm-30 pb-xs-30">
                <div className="container">
                    <div className="row no-gutters">
                        {
                            form.isResponse ?
                                form.getAllData.length > 0 ?
                                    form.getAllData.map((jl) =>
                                        <div className="col-lg-6 pr-2 pb-30">
                                            <TestimonialItem onSuccessDelete={handleDelete} data={jl}/>
                                        </div>
                                    ) : "No Data Found" :
                                <div className="spinner-holder"
                                     style={{position: "absolute"}}>
                                    <Spinner width={100} height={100} type={"Puff"}/>
                                </div>
                        }
                    </div>
                </div>
                {
                    form.openAddMessage && (
                        <AddTestimonialMessage openAddMessage={form.openAddMessage} onSave={handleMessage}
                                               onClose={() => setForm({
                                                   ...form,
                                                   openAddMessage: false
                                               })}/>
                    )
                }
            </div>
            <Footer/>
        </div>
    );
};

export default Testimonial;