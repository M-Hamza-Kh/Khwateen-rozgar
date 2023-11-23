import React, {Component} from "react";

export class Messenger extends Component{
    render() {
        return (
            <div className="col-xl-10 col-lg-9">
                <div className="dashboard-main-inner">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-breadcrumb-content">
                                <h4>Messages</h4>
                            </div>
                        </div>
                    </div>
                    <div className="messages-overview">
                        <div className="row no-gutters">
                            <div className="col-xl-3 col-lg-4">
                                <div className="messages-heading">
                                    <div className="message-fields-form">
                                        <form action="#">
                                            <div className="message-select">
                                                <select className="nice-select wide">
                                                    <option value="unread">Unread</option>
                                                    <option value="recent-chat">Recent Chat</option>
                                                </select>
                                            </div>
                                            <div className="message-form">
                                                <button className="search-btn"><i className="lnr lnr-magnifier"/>
                                                </button>
                                                <input type="text" placeholder="Search in messages"/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-8">
                                <div className="message-box-wrap mb-sm-80 mb-xs-80">
                                    <div className="message-box-content"></div>
                                    <div className="message-reply">
                                        <textarea cols="40" rows="4" placeholder="Type your message..."></textarea>
                                        <div className="btn-actions">
                                            <button className="ht-btn theme-btn theme-btn-two">Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}