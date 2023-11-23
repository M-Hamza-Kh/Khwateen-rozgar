import React, {useState} from 'react';
import testimonial1 from "../../../content/images/portfolio/user_default.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQuoteRight} from "@fortawesome/free-solid-svg-icons";
import {CONTENT_URL, getUserData, isLogin, STRINGS} from "../../../utils/base";
import {Button} from "@material-ui/core";
import ConfirmModal from "../../dashboard/modals/confirmModal";
import {API} from "../../../utils/services";

const defaultState = {
    selected_id: STRINGS.DEFAULTS.guid,
    openConfirmDialog: false
}
const TestimonialItem = (props) => {
    const {data, onApprove,onSuccessDelete} = props;
    const [init,setInit] = useState(defaultState);
    console.log("testimonial_data", data)
    const handleApproved = (data) => {
        data.isApproved = true
        onApprove(data)
    }

    const onConfirm = (id) => {
        API.TESTIMONIALS.deleteSettings(id).then(({status, error, data}) => {
            if (status) {
                onSuccessDelete()
            } else {
                alert(error)
            }
        }).catch((err) => alert(err))
    }

    const handleDelete = (data) => {
        setInit({
            ...init,
            selected_id: data.id,
            openConfirmDialog: true
        })
    }

    return (
        <div className="single-testimonial">
            { init.openConfirmDialog &&
                (<ConfirmModal id={init.selected_id} onSave={onConfirm} onClose={() => setInit({
                    ...init,
                    selected_id: STRINGS.DEFAULTS.guid,
                    openConfirmDialog: false
                })}/>)
            }
            <div className="testimonial-author">
                <div className="testimonial-avatar">
                    <img style={{width: "80px", height: "80px"}}
                         src={`${data.pictureURL !== "" && data.pictureURL !== undefined && data.pictureURL !== null ? `${CONTENT_URL}${data.pictureURL}` : testimonial1}`}
                         alt=""/>
                </div>
                <div className="testimonial-meta">
                    <h5 className="name">{data.name}</h5>
                    <p className="text">
                        <span className="position">{data.title} at </span>
                        <span className="company theme-color">{data.company}</span>
                    </p>
                </div>
                <span className="icon-quote theme-color">
                                <FontAwesomeIcon icon={faQuoteRight} color={STRINGS.TYPES.COLORS.DEFAULT}
                                                 className="fas fa-quote-right"/>
                            </span>
            </div>
            <div className="testimonial-comment">
                <p
                    className="ov-des"
                    style={{height: "150px", overflow: "auto"}}
                >{data.message}</p>
            </div>
            {
                data.isApproved !== undefined && !data.isApproved ?
                    getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                        (
                            <div className="d-flex width-100 justify-content-end" style={{padding: "10px"}}>
                                <Button
                                    onClick={() => handleApproved(data)}
                                    className="flex text-white"
                                    style={{fontSize: "12px", backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`}}>
                                    Marked Approved
                                </Button>
                            </div>
                        )
                    ) : ""
            }
            {
                isLogin() && getUserData().type === STRINGS.USER_TYPE.ADMIN_TYPE && (
                    <div className="d-flex width-100 justify-content-end" style={{padding: "10px"}}>
                        <Button
                            onClick={() => handleDelete(data)}
                            className="flex text-white"
                            style={{fontSize: "12px", backgroundColor: `${STRINGS.TYPES.COLORS.DEFAULT}`}}>
                            Delete
                        </Button>
                    </div>
                )
            }
        </div>
    );
};

export default TestimonialItem;