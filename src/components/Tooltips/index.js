import React from 'react';
import Tooltip from "react-bootstrap/cjs/Tooltip";
import OverlayTrigger from "react-bootstrap/cjs/OverlayTrigger";

const DefaultTooltip = ({text, placement, delay,ref}) => {
    const renderToolTip = (props) => (
        <Tooltip {...props}>
            {text}
        </Tooltip>
    );
    console.log(ref)
    return (
        <React.Fragment>
            <OverlayTrigger
                placement={placement}
                delay={delay}
                overlay={renderToolTip}
            >
                {ref}
            </OverlayTrigger>
        </React.Fragment>
    );
};

export default DefaultTooltip;