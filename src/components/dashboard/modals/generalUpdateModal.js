import React, {Component} from 'react';

class GeneralUpdateModal extends Component {
    render() {
        let {isOpen} = this.props
        //console.log(isOpen)
        return (
            <div className={`modal fade profile-modal-container ${isOpen ? `show` :``} `} style={{display:`${isOpen ? `block`: `none`}`}} id="profile-modal" tabIndex="-1" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="modal-body">
                            <section className="card">
                                <header className="card-header cover-photo">
                                    <div className="card-header-icon top-right-icon rounded-circle">
                                        <i className="fas fa-camera"/>
                                    </div>
                                    <div className="card-header-icon bottom-left-icon rounded-circle">
                                        <i className="fas fa-camera"/>
                                    </div>
                                </header>
                                <div className="card-body pt-100">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="single-input mb-25">
                                                <label htmlFor="first-name">First Name <span>*</span></label>
                                                <input type="text" id="first-name" name="first-name"
                                                       placeholder="First Name"
                                                       value="First Name"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="single-input mb-25">
                                                <label htmlFor="last-name">Last Name <span>*</span></label>
                                                <input type="text" id="last-name" name="first-name"
                                                       placeholder="Last Name"
                                                       value="Last Name"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input mb-25">
                                                <label htmlFor="headline">Headline <span>*</span></label>
                                                <textarea rows="5" id="headline" placeholder="Headline"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input mb-25">
                                                <label htmlFor="current_position">Current
                                                    Position <span>*</span></label>
                                                <select name="current_position" id="current_position" className="w-100">
                                                    <option value="">Current Position</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <div>
                                                <input id="education-intro" type="checkbox" className="checkbox"
                                                       checked=""
                                                       required=""/>
                                                <label htmlFor="education-intro">Show education in my intro</label>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="single-input mb-25">
                                                <label htmlFor="education">Education <span>*</span></label>
                                                <select name="education" id="education" className="w-100">
                                                    <option value="">Metric</option>
                                                    <option value="">Inter</option>
                                                    <option value="">Graduate</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="single-input mb-25">
                                                <label htmlFor="country">Country / Region <span>*</span></label>
                                                <select name="country" id="country" className="w-100">
                                                    <option value="">Pakistan</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input mb-25">
                                                <label htmlFor="location-in-country">Locations in this
                                                    Country/Region </label>
                                                <input type="text" id="location-in-country" name="first-name"
                                                       placeholder="Locations in this Country/Region" value=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div className="single-input mb-25">
                                                <label htmlFor="industry">Industry <span>*</span></label>
                                                <select name="industry" id="industry" className="w-100">
                                                    <option value="">Computer Software</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="single-input mb-25">
                                                <label htmlFor="contact-info">Contact Info <span>*</span></label>
                                                <textarea rows="5" id="contact-info"
                                                          placeholder="Contact Info"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="row">
                                        <div className="col-12">
                                            <div
                                                className="profile-action-btn d-flex flex-wrap align-content-center justify-content-between">
                                                <button className="ht-btn theme-btn theme-btn-two mb-xs-20">Update
                                                    Profile
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GeneralUpdateModal;