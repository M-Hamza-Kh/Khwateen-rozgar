import React from 'react';
import AudioPlayer from "material-ui-audio-player";
import {makeStyles} from "@material-ui/core";
import {STRINGS} from "../../utils/base";

const useStyles = makeStyles((theme) => {
    return {
        root: {
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            },
            '&.MuiGrid-spacing-xs-3':{
                margin:"0"
            }
        },
        loopIcon: {
            color: `${STRINGS.TYPES.COLORS.DEFAULT}`,
            '&.selected': {
                color: `${STRINGS.TYPES.COLORS.DEFAULT}`
            },
            '&:hover': {
                color: `${STRINGS.TYPES.COLORS.DEFAULT}`
            },
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            }
        },
        playIcon: {
            color: `${STRINGS.TYPES.COLORS.DEFAULT}`,
            '&:hover': {
                color: `${STRINGS.TYPES.COLORS.DEFAULT}`
            }
        },
        volumeIcon: {
            color: 'rgba(0, 0, 0, 0.54)'
        },
        volumeSlider: {
            color: 'black'
        },
        progressTime: {
            color: 'rgba(0, 0, 0, 0.54)'
        },
        mainSlider: {
            color: `${STRINGS.TYPES.COLORS.DEFAULT}`,
            '& .MuiSlider-rail': {
                color: `${STRINGS.TYPES.COLORS.DEFAULT}`
            },
            '& .MuiSlider-track': {
                color: `${STRINGS.TYPES.COLORS.DEFAULT}`
            },
            '& .MuiSlider-thumb': {
                color: `${STRINGS.TYPES.COLORS.DEFAULT}`
            }
        }
    }
});

const AudioPlayerDefault = (props) => {
    let {src} = props;
    return (
        <div>
            <AudioPlayer
                src={src}
                elevation={1}
                width="100%"
                variation="default"
                spacing={3}
                useStyles={useStyles}
                // download={false}
                autoplay={false}
                order="standart"
                preload="auto"
                loop={false}
            />
        </div>
    );
};

export default AudioPlayerDefault;