import React, {useEffect, useMemo, useState} from 'react';
import {GoogleApiWrapper, Map, Marker} from "google-maps-react";
import {STRINGS} from "../../utils/base";
import marker_icon from "../../content/images/location-pin.png";

const mapStyle = {
    width: "100%",
    height: "100%"
}


const defaultCenter = STRINGS.DEFAULTS.MapCenter
const defaultMarker = [{lat: 0, lng: 0}];

const GMap = (props) => {
    let {defaultCoordinates, google, zoom = 6, center = defaultCenter, size = 64, onSelect} = props;
    let [markers, setMarkers] = useState(defaultMarker);
    let [currentCenter, setCenter] = useState(center);

    useEffect(() => {
        if (defaultCoordinates !== "" && defaultCoordinates !== undefined) {
            let coords = defaultCoordinates.split(",")
            let selected_obj = {
                lat: parseFloat(coords[0]),
                lng: parseFloat(coords[1]),
            }
            setMarkers([selected_obj])
            setCenter(selected_obj)
        }
    }, [defaultCoordinates])

    // const onMarkerDragEnd = (coord, index) => {
    //     const {latLng} = coord;
    //     const lat = latLng.lat();
    //     const lng = latLng.lng();
    //     console.log("coordinates", lat)
    //     console.log("coordinates", lng)
    //     if (onSelect !== undefined) {
    //         let selected_obj = {
    //             lat: lat,
    //             lng: lng,
    //         }
    //         setMarkers([selected_obj]);
    //         onSelect(selected_obj);
    //     }
    // }

    const MarkerPoints = useMemo(() => {
        let m = markers.map((c, index) => {
                // console.log("coordinates", c)
                return (
                    <Marker
                        key={index}
                        id={index}
                        // draggable={true}
                        // onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
                        position={c}
                        icon={{
                            url: `${marker_icon}`,
                            anchor: new google.maps.Point(32, 50),
                            scaledSize: new google.maps.Size(size, size)
                        }}
                    />
                )
            }
        );
        return m

    }, [markers, defaultCoordinates])
    const handleLocationClick = (mapProps, map, event) => {
        // console.log("handleLocationClick", mapProps)
        // console.log("handleLocationClick", map)
        // console.log("handleLocationClick", event.latLng.lat())
        if (onSelect !== undefined) {
            let selected_obj = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
            }
            setMarkers([selected_obj]);
            onSelect(selected_obj);
        }

    }
    console.log("coordinates", currentCenter)
    return (
        <Map
            google={google}
            zoom={zoom}
            style={mapStyle}
            initialCenter={currentCenter}
            center={currentCenter}
            onClick={handleLocationClick}
        >
            {MarkerPoints}
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: STRINGS.DEFAULTS.GoogleMapApiKey
})(GMap);