import React from 'react';
import Loader from "react-loader-spinner";
import {STRINGS} from "../../utils/base";
const Spinner = (props) => {
    const {height,width,timeout,type} = props;

    return (
        <React.Fragment>
            <Loader
                type={type}
                color={`${STRINGS.TYPES.COLORS.DEFAULT}`}
                height={height}
                width={width}
                timeout={timeout}
            />
        </React.Fragment>
    );
};

export default Spinner;