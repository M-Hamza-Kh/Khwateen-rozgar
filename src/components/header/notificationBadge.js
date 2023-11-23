import React, { useEffect, useState } from 'react';
import { Badge, IconButton, withStyles } from "@material-ui/core";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { parseDate, parseDateAndTime, STRINGS } from "../../utils/base";
import DrawerPopUp from "../Drawer";
import { API } from "../../utils/services";
import { CToast, CToastBody, CButton, CToastClose } from '@coreui/react'
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';

const StyleNotificationBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: `0 4px`,
    },
}))(Badge);

const defaultState = {
    openDrawer: false,
    isResponse: false,
    pageNo: 1,
    counter: 0,
    myNotifications: []
}

const NotificationBadge = (props) => {
    let { logoType } = props;
    const [init, setInit] = useState(defaultState);
    let { openDrawer, pageNo, myNotifications, isResponse, counter } = init;
    const [count, setCount] = useState(0);


    useEffect(() => {
        if (count >= 0) {
            getMyNotification(pageNo);
        }
    }, [count])

    const getMyNotification = (page) => {
        API.JOBS.getMyNotification(page).then((response) => {
            console.log(response);
            let { status, error, data } = response;
            if (status) {
                // console.log("myJob", data);
                setInit({
                    ...init,
                    myNotifications: data,
                    counter: data.length,
                    isResponse: true
                })
            } else {
                alert(error)
            }
        }).catch((error) => {
            swal("", "No New Notifications", "error")
        });
    }

    const handleOpenDrawer = () => {
        setInit({
            ...init,
            openDrawer: true
        })
    }
    const handleCloseDrawer = () => {
        setInit({
            init,
            openDrawer: false
        })
    }

    const NotificationContent = () => {
        // console.log("NotificationContent", myNotifications)
        return (
            <div className="w-100 p-1">
                <div className="col-xl-12 col-12">
                    <div className="notifications-applications mb-20 mb-sm-80 mb-xs-80">
                        <div className="notifications-heading">
                        <Button style={{backgroundColor:`#b557ac`}} onClick={() => setCount(count + 1)} variant="contained" color="primary">
                        Click for New Notifications
                        </Button>
                            <button type="button" className="close" onClick={handleCloseDrawer}
                            aria-label="Close">
                            <span aria-hidden="true"
                            >&times;</span>
                        </button>
                        </div>
                        <div className="notifications-main-block">
                            <div className="notification-listing ov-des" style={{
                                padding: "15px",
                                overflow: "auto"
                            }}>

                                {
                                    isResponse && (
                                        myNotifications.length > 0 ?

                                            myNotifications.map((notIf, index) =>
                                                <CToast key={index} autohide={false} visible={true}>
                                                    <CToastBody className="gradiant-css text-white">
                                                        <img src="#" className="rounded mr-2" alt="" />
                                                        <strong className="mr-auto"></strong>  
                                                        <small style={{ fontWeight: `bold`, marginRight:`5px` }}> {parseDateAndTime(parseDate(new Date(notIf.createdOn)))}</small>
                                                        <CToastClose aria-label="Close" component={CButton} style={{ backgroundColor: `rgb(110, 60, 121)`, border: `black`,float:`right`, position:`relative` ,height: `30px`, padding: `.1rem .75rem`, fontSize:`0.75rem` }}>
                                                            x
                                                        </CToastClose>
                                                        <div className="mt-2 pt-2 border-top">
                                                            <CButton type="button" color="primary" size="sm" style={{ backgroundColor: `transparent`, border: `transparent`, textAlign: `left`, fontWeight: `bold` }}>
                                                                {notIf.message}
                                                            </CButton>
                                                        </div>
                                                    </CToastBody>
                                                </CToast>
                                                
                                            )
                                            :
                                            <div className="empty">
                                                <h3>There are no notifications</h3>
                                                <p>Your latest notifications will be displayed here</p>
                                            </div>
                                    )
                                }


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="d-flex justify-content-center">
            <IconButton onClick={handleOpenDrawer}>
                <StyleNotificationBadge badgeContent={counter} color={"error"}>
                    <NotificationsIcon className={`${logoType === STRINGS.TYPES.LOGO_TYPE.MAIN && "text-white"
                        }`} />
                </StyleNotificationBadge>
            </IconButton>
            <DrawerPopUp
                content={<NotificationContent />}
                open={openDrawer}
                onClose={handleCloseDrawer} />
        </div>
    );
};

export default NotificationBadge;