import React from 'react';
import slugify from "slugify";
import {Map, Marker, Pane, TileLayer} from "react-leaflet";
import L from "leaflet";
import styles from "./map.module.scss"
import {withRouter, RouteComponentProps} from 'react-router-dom'
import OfferPopup from "App/views/Home/OfferPopup";
import {offerInterface, mobileViewModeInterface} from "../../utils/const";
import * as Leaflet from "leaflet";

interface MatchParams {
    offerTitle: string;
}

interface MapDetailProps extends RouteComponentProps<MatchParams> {
    offersList: offerInterface[],
    setMobileViewMode?: React.Dispatch<React.SetStateAction<mobileViewModeInterface>>,
    mobileViewMode?: mobileViewModeInterface
}
const MapDetail: React.FC<MapDetailProps> = ({offersList, match, history, setMobileViewMode, mobileViewMode}) => {
    let bounceIcon;
    let offerBounce:offerInterface | null =  null;
    let offers;
    if (offersList) {
        offers = [...offersList]
        offerBounce = offers.filter(e => (match.params.offerTitle === slugify(`${e.company}-${e.title}`, {
            lower: true
        })))[0];
        if (offerBounce && offerBounce.technology[0])
            bounceIcon = new L.Icon({
                iconUrl: offerBounce.technology[0].img,
                iconRetinaUrl: offerBounce.technology[0].img,
                iconAnchor: [5, 55],
                popupAnchor: [10, -44],
                iconSize: [40, 40],

            });
    }
    return (
        <>
            {offerBounce && offerBounce.coordinates[0] ?
                <Map center={offerBounce.coordinates[0]} zoom={12}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Pane className={styles.bounce}>
                        <Marker position={offerBounce.coordinates[0]} icon={bounceIcon}
                            onMouseOver={(e:Leaflet.LeafletMouseEvent) => {
                            e.target.openPopup();
                        }}
                            onMouseOut={(e:Leaflet.LeafletMouseEvent) => {
                            e.target.closePopup();
                        }}>
                            <OfferPopup offer={offerBounce}/>
                        </Marker>
                    </Pane>
                    <>
                        {offers && offers.map((offer, index) => {
                            let pointerIcon = new L.Icon({
                                iconUrl: offer.technology[0].img,
                                iconRetinaUrl: offer.technology[0].img,
                                iconAnchor: [5, 55],
                                popupAnchor: [10, -44],
                                iconSize: [40, 40],
                            })
                            return (
                                <div key={index}>
                                    {slugify(`${offerBounce && offerBounce.company}-${offerBounce && offerBounce.title}`) === slugify(`${offer.company}-${offer.title}`) ? "" :
                                        <>
                                        (<Marker key={index} position={offer.coordinates[0]} icon={pointerIcon}
                                                 onMouseOver={(e:Leaflet.LeafletMouseEvent) => {
                                                     e.target.openPopup();
                                                 }}
                                                 onMouseOut={(e:Leaflet.LeafletMouseEvent) => {
                                                     e.target.closePopup();
                                                 }}
                                                 onClick={() => {
                                                     history.push(`/offers/${slugify(`${offer.company}-${offer.title}`, {
                                                         lower: true
                                                     })}`)
                                                     if (setMobileViewMode && mobileViewMode) {
                                                         setMobileViewMode({...mobileViewMode, view: "list"})
                                                     }
                                                   }
                                                 }>
                                            <OfferPopup offer={offer}/>
                                        </Marker>

                                        )
                                            </>
                                    }
                                </div>
                            )
                        })
                        }
                    </>
                </Map>

                : ""}
        </>
    );
}

export default withRouter(MapDetail);
