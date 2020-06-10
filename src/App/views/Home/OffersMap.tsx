import React from 'react';
import {Map, Marker,TileLayer} from "react-leaflet";
import L from "leaflet";
import styles from './map.module.scss'
import slugify from "slugify";
import {Link} from "react-router-dom";
import OfferPopup from "App/views/Home/OfferPopup";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {cities} from './constData'
import {offerInterface, mobileViewModeInterface} from "../../utils/const";
import * as Leaflet from "leaflet";


interface OffersMapProps extends RouteComponentProps {
    offers: offerInterface[],
    setMobileViewMode?: React.Dispatch<React.SetStateAction<mobileViewModeInterface>>,
    mobileViewMode?: mobileViewModeInterface
}

const OffersMap: React.FC<OffersMapProps> = ({offers, history, setMobileViewMode, mobileViewMode}) => {
    let poorParam = window.location.pathname
        if (poorParam === "/"){
            poorParam = "all"
        }
        else {
            poorParam = poorParam.substr(1);
            poorParam = poorParam.slice(0, poorParam.indexOf("/"));
        }
  const coordinatesFocus = cities.filter(coordinate => coordinate.to === poorParam)
    return (
        <Map classNames={styles.leafletContainer} center={coordinatesFocus[0] ? coordinatesFocus[0].coordinates : {lat: 52.2154531, lng: 21.0207946}} zoom={coordinatesFocus[0] && coordinatesFocus[0].to === "all" ? 6 : 12}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {offers ?
                offers.map((offer, index) => {
                    const pointerIcon = new L.Icon({
                        iconUrl: offer.technology[0].img,
                        iconRetinaUrl: offer.technology[0].img,
                        iconAnchor: [5, 55],
                        popupAnchor: [10, -44],
                        iconSize: [40, 40]
                    })

                    return (

                        <Link key={index} to={`/offers/${slugify(`${offer.company}-${offer.title}`, {
                            lower: true
                        })}`} style={{textDecoration: "none", color: "rgb(55, 71, 79)"}}>
                            <div>
                                <Marker onMouseOver={(e:Leaflet.LeafletMouseEvent) => {
                                    e.target.openPopup();
                                }}
                                        onMouseOut={(e:Leaflet.LeafletMouseEvent) => {
                                            e.target.closePopup();
                                        }}
                                        key={index} position={offer.coordinates[0]} icon={pointerIcon}
                                    onClick={() => {
                                        history.push(`/offers/${slugify(`${offer.company}-${offer.title}`, {
                                        lower: true
                                    })}`)
                                        if (setMobileViewMode && mobileViewMode) {
                                            setMobileViewMode({...mobileViewMode, view: "list"})
                                        }}}>
                                    <OfferPopup offer={offer}/>
                                </Marker>
                            </div>
                        </Link>

                    )
                }) : ""
            }
        </Map>
    )
};

export default withRouter(OffersMap);
