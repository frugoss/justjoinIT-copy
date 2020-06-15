import React from 'react';
import {Map, Marker, TileLayer} from "react-leaflet";
import L from 'leaflet'
import QuestionMark from '../../assets/images/QuestionMark.png';



const MapPreview = ({coordinates={lat: 52.2154531, lng: 21.0207946}, img=QuestionMark}) => {
    let pointerIcon = new L.Icon({
        iconUrl: img,
        iconRetinaUrl: img,
        iconAnchor: [5, 55],
        popupAnchor: [10, -44],
        iconSize: [40, 40],
    });
    return (
        <>
            {
                coordinates !== undefined ? <Map center={coordinates} zoom={12}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={coordinates} icon={pointerIcon}>
                        </Marker>
                    </Map>
                    : ""
            }
        </>
    )
}
export default MapPreview;
