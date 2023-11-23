import React, {Component} from "react";
import {Header} from "../header";
import {MobileHeader} from "../mobile/header";
import {SliderSection} from "../sliderSection";
import {FeatureSection} from "../featureSection";
import {JobCategoriesSection} from "../jobCategoriesSection";
import {Footer} from "../footer";
import {StartPopUpMenu} from "../startPopUpMenu";
import {BottomNavbarMobilePopUpStart} from "../BottomNavbarMobilePopUpStart";
import {JobSectionStart} from "../jobSectionStart";
import {BannerSectionStart} from "../bannerSectionStart";
import {BlogSectionStart} from "../BlogSectionStart";
import {TestimonialSectionStart} from "../testimonialSectionStart";
import {BrandsSectionStart} from "../BrandsSectionStart";
//import {ModalAreaStart} from "../modalAreaStart";

export class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        }
    }

    componentDidMount() {
        window.onresize = () => {
            if (window.innerWidth >= 1000) {
                this.setState({
                    showMenu: false
                })
            }
        }
    }

    handleOpenShowMenu = () => {
        this.setState({
            showMenu: !this.state.showMenu
        })
    }


    render() {
        const {showMenu} = this.state;
        return (
            <div className={`template-color-1 ${showMenu ? `popup-mobile-menu-wrapper` : ""}`}>

                <div id="main-wrapper">
                    {/*<!--Header section start-->*/}
                    <Header/>
                    {/*<!--Header section end-->*/}

                    {/*<!--Header Mobile section start-->*/}
                    <MobileHeader openShowMenu={this.handleOpenShowMenu}/>

                    <StartPopUpMenu closeShowMenu={this.handleOpenShowMenu}/>
                    {/*<BottomNavbarMobileStart />*/}

                    <BottomNavbarMobilePopUpStart/>

                    {/*<!--slider section start-->*/}
                    <SliderSection/>
                    {/*<!--slider section end-->*/}

                    {/* <!-- Funfact Section Start  -->*/}
                    {/*<FunFactSection/>*/}
                    {/*<!-- Funfact Section Start  -->*/}

                    {/*<!-- Feature Section Start -->*/}
                    <FeatureSection/>
                    {/*<!-- Feature Section End -->*/}


                    {/*<!-- Job Categories Two Section Start -->*/}
                    <JobCategoriesSection/>
                    {/*<!-- Job Categories Two Section End -->*/}

                    <JobSectionStart/>

                    <BannerSectionStart/>

                    <BlogSectionStart/>

                    <TestimonialSectionStart/>

                    <BrandsSectionStart/>

                    {/*<!--Footer section start-->*/}
                    <Footer/>
                    {/*<!--Footer section end-->*/}

                    {/*<ModalAreaStart/>*/}


                    {/*<!-- Placed js at the end of the document so the pages load faster -->*/}


                </div>
            </div>

        );
    }
}