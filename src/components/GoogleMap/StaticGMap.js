import React from 'react';
import {staticMapUrl} from "static-google-map";
import {STRINGS} from "../../utils/base";

const StaticGMap = () => {
    const url = staticMapUrl({
        key: `${STRINGS.DEFAULTS.GoogleStaticMapApiKey}`,
        scale: 1,
        size: '600x600',
        format: 'png',
        maptype: 'roadmap',
        markers: [
            {
                location: {lat: '28.3125', lng: '-97.6257'},
                color: 'purple',
                size: 'tiny'
            },
            {
                location: 'Memphis,TN',
                color: 'red'
            }
        ],
        markerGroups: [
            {
                color: 'blue',
                label: 'B',
                markers: [
                    {location: {lat: '37.2125', lng: '-85.7257'}},
                    {location: 'Nashville,TN'}
                ]
            },
            {
                color: 'yellow',
                label: 'Y',
                markers: [
                    {location: 'Dallas,TX'},
                    {location: 'Los Angeles,CA'}
                ]
            }
        ],
        paths: [
            {
                color: 'green',
                points: ['Denver,CO', 'Kalispell,MT', 'Chicago,IL']
            },
            {
                color: 'red',
                points: ['27.749825, -73.987963', '40.849825, -74.987963']
            }
        ],
        pathGroups: [{
            color: 'brown',
            paths: [
                {points: ['Memphis,Tn', 'Atlanta,Ga']},
                {points: ['43.749825,-73.987963', '38.849825,-74.987963']}
            ]
        }]
    });
    return (
        <div>
            {console.log("abc",url)}
            <img alt={"#"} src={url}/>
        </div>
    );
};

export default StaticGMap;