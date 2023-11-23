import React from "react";
import image from "../../Assets/KhwateenRozgar.jpeg";
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
// import loader from "../Assets/loader.gif";

const Card = (props) => {
  const { url } = props;
  return (
    <div className="myCard">
    <ul className="social-share candidate-share">
            <li>
                <FacebookShareButton url={`${url}`}
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
      {/* <img src={image} className="w-100" alt="" />

      <span className="card-companyName">{props.comanyName} </span>

      <span className="designation">{props.designation}</span>
      <span className="location">{props.cityName}</span>
      <button className="card-button">
        <a href={`http://khawateenrozgar.social-preview.top/tpuzmcbz`}>
          {" "}
          Apply now
        </a>
      </button> */}
    </div>
  );
};

export default Card;
