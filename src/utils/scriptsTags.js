import React, {Component} from 'react';
import ScriptTag from "react-script-tag";

class ScriptsTags extends Component {
    render() {
        return (
            <div>
                <ScriptTag isHydrating={true} type="text/javascript" src="https://sandbox.jazzcash.com.pk/Sandbox/Scripts/hmac-sha256.js" />
            </div>
        );
    }
}

export default ScriptsTags;