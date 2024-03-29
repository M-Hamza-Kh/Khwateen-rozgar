import React, { useState, useEffect } from 'react';
import ProgressComponent from '@material-ui/core/CircularProgress';
import {getUserData, isLogin} from "../../../utils/base";

function JitSiMeet(props) {
    const {data} = props;
    const [loading, setLoading] = useState(false);
    const containerStyle = {
        // width: '800px',
        height: '700px',
    };

    const jitsiContainerStyle = {
        display: (loading ? 'none' : 'block'),
        width: '100%',
        height: '100%',
    }

    function startConference() {
        try {
            const domain = 'meet.jit.si';
            // const options = {
            //     roomName: 'roomName',
            //     height: 400,
            //     parentNode: document.getElementById('jitsi-container'),
            //     interfaceConfigOverwrite: {
            //         filmStripOnly: false,
            //         SHOW_JITSI_WATERMARK: false,
            //     },
            //     configOverwrite: {
            //         disableSimulcast: false,
            //     },
            // };
            const options = {
                roomName: `Khawateen-${data.id}`,
                userInfo: {
                    email: isLogin() && getUserData().email,
                    displayName: isLogin() && `${getUserData().firstName} ${getUserData().lastName}`
                },
                parentNode: document.querySelector('#meet') // Parent Tag
            };

            const api = new window.JitsiMeetExternalAPI(domain, options);
            api.addEventListener('videoConferenceJoined', () => {
                console.log('Local User Joined');
                setLoading(false);
                api.executeCommand('displayName', 'MyName');
            });
        } catch (error) {
            console.error('Failed to load Jitsi API', error);
        }
    }

    useEffect(() => {
        // verify the JitsiMeetExternalAPI constructor is added to the global..
        if (window.JitsiMeetExternalAPI) startConference();
        else alert('Jitsi Meet API script not loaded');
    }, []);

    return (
        <div
            style={containerStyle}
        >
            {loading && <ProgressComponent />}
            <div
                id="meet"
                style={jitsiContainerStyle}
            />
        </div>
    );
}

export default JitSiMeet;