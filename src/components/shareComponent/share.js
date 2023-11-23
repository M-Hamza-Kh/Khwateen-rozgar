import React from 'react';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    InstapaperShareButton,
    InstapaperIcon,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon, TwitterShareButton,
    EmailShareButton, EmailIcon
} from "react-share";

const Share = (props) => {
    const { url } = props;
    return (
        <ul className="social-share candidate-share">
            <li>
                <FacebookShareButton url={`${url}`}
                    //quote={"フェイスブックはタイトルが付けれるようです"}
                    //hashtag={"#hashtag"}
                    //description={"aiueo"}
                    className="social-share-btn">
                    <FacebookIcon className="share-icons" />
                </FacebookShareButton>
                <LinkedinShareButton url={url} className="social-share-btn">
                    <LinkedinIcon className="share-icons" />
                </LinkedinShareButton>
                <WhatsappShareButton url={url} className="social-share-btn">
                    <WhatsappIcon className="share-icons" />
                </WhatsappShareButton>
                <InstapaperShareButton url={url} className="social-share-btn">
                    <InstapaperIcon className="share-icons" />
                </InstapaperShareButton>
                <TelegramShareButton url={url} className="social-share-btn">
                    <TelegramIcon className="share-icons" />
                </TelegramShareButton>
                <TwitterShareButton url={url} className="social-share-btn">
                    <TwitterIcon className="share-icons" />
                </TwitterShareButton>
                <EmailShareButton url={url} className="social-share-btn">
                    <EmailIcon className="share-icons" />
                </EmailShareButton>
            </li>
        </ul>
    );
};

export default Share;