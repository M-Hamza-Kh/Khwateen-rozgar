import React from 'react';
import {Drawer} from "@material-ui/core";

const DrawerPopUp = (props) => {
    let {content,open,onClose} = props;
    const closeDrawer = () => {
        onClose()
    }
    return (
        <Drawer open={open} onClose={closeDrawer}>
            <div style={{width:"400px"}}>
            {content}
            </div>
        </Drawer>
    );
};

export default DrawerPopUp;