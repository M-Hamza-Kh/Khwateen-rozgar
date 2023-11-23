import React, {Component} from "react";
import {getUserData, isLogin, STRINGS} from "../../utils/base";
import {API} from "../../utils/services";
import Spinner from "../spinner";
import AddLargeBannersModal from "../dashboard/modals/addLargeBannersModal";
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {STRINGS} from "../../utils/base";
// import {faEye} from "@fortawesome/free-solid-svg-icons";
import history from "../../@history";

export class BannerSectionStart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            bannerUpdate: {},
            isResponse: false,
            openAddComposer: false,
            openComposer: false

        }
    }

    componentDidMount() {
        this.getAllBanners();
    }

    getAllBanners = () => {
        API.CONTENT.getAllHomeContent().then((res) => {
            console.log("CONTENT", res)
            if (res.status) {
                this.setState({
                    banners: res.data.imageBannerLarge,
                    isResponse: true
                })
            } else {
                alert(res.status);
            }
        })
    }

    handleLink = (b) => {
        console.log("isUpdate", b.link.indexOf("khawateenrozgar.com"))
        console.log("isUpdate", b.link)
        if (b.link.indexOf("khawateen") !== -1) {
            //console.log("isUpdate",b.link.split("/"))
            //${STRINGS.ROUTES.COMPANY_DETAIL}/
            history.push(`${b.link}`)
        } else {
            window.open(`${b.link}`, "_blank")
        }
    }

    render() {
        const {banners, isResponse, openAddComposer, openComposer, bannerUpdate} = this.state;
        return (
            <div>
                {/*<!-- Banner Section Start -->*/}
                <div className="banner-section section pt-40 pb-10">
                    <div className="container">
                        <div className="row">
                            {
                                isResponse ?
                                    banners.length > 0 ?
                                        banners.map((b, index) =>
                                            <div key={index} className="col-lg-3 col-md-6 col-sm-6">
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
                                                {/*<!-- Single Banner Start -->*/}
                                                <div className="single-banner mb-30">
                                                    <div
                                                        onClick={() => this.handleLink(b)}
                                                        // to={`${STRINGS.ROUTES.COMPANY_DETAIL}/${b.link}`}
                                                    >
                                                        <img height="260" src={b.imageURL} alt=""/>
                                                    </div>
                                                </div>
                                                {/*<!-- Single Banner End -->*/}
                                            </div>
                                        )
                                        : "No data found"
                                    :
                                    <div className="spinner-holder">
                                        <Spinner type={"Puff"}/>
                                    </div>
                            }

                            {/*<div className="col-lg-3 col-md-6 col-sm-6">*/}
                            {/*    /!*<!-- Single Banner Start -->*!/*/}
                            {/*    <div className="single-banner mb-30">*/}
                            {/*        <NavLink to="#">*/}
                            {/*            <img height="260" src={banner2} alt=""/>*/}
                            {/*        </NavLink>*/}
                            {/*    </div>*/}
                            {/*    /!*<!-- Single Banner End -->*!/*/}
                            {/*</div>*/}

                            {/*<div className="col-lg-3 col-md-6 col-sm-6">*/}
                            {/*    /!*<!-- Single Banner Start -->*!/*/}
                            {/*    <div className="single-banner mb-30">*/}
                            {/*        <NavLink to={`${STRINGS.ROUTES.COMPANY_DETAIL}/602bdfc9816928a81ef0040b`}>*/}
                            {/*            <img height="260" src={banner3} alt=""/>*/}
                            {/*        </NavLink>*/}
                            {/*    </div>*/}
                            {/*    /!*<!-- Single Banner End -->*!/*/}
                            {/*</div>*/}

                            {/*<div className="col-lg-3 col-md-6 col-sm-6">*/}
                            {/*    /!*<!-- Single Banner Start -->*!/*/}
                            {/*    <div className="single-banner mb-30">*/}
                            {/*        <NavLink to="#">*/}
                            {/*            <img height="260" src={banner4} alt=""/>*/}
                            {/*        </NavLink>*/}
                            {/*    </div>*/}
                            {/*    /!*<!-- Single Banner End -->*!/*/}
                            {/*</div>*/}

                        </div>
                        {/*<div className="viewAll-holder">*/}
                        {/*    <div className="view-all">*/}
                        {/*        <FontAwesomeIcon icon={faEye} color={`${STRINGS.TYPES.COLORS.DEFAULT}`}/>*/}
                        {/*        <div className="label">*/}
                        {/*            View All*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="d-flex w-100 justify-content-center">
                            {
                                isLogin() && getUserData().rightsBanners && banners.length !== 4 && (
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
                                    addType={"ImageBannerLarge"}
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
                {/*<!-- Banner Section End -->*/}
            </div>
        );
    }
}