import React from 'react'
import styles from "./map.module.scss";
import NumberFormat from "react-number-format";
import {Popup} from "react-leaflet";
import clsx from "clsx";

const OfferPopup = ({offer}) => {

    return (
        <Popup>
            <div style={{display: "flex"}}>
                <div className={clsx(styles.flexColumn, styles.popupContainer)}>
                    <img alt="logo" className={styles.iconSize} src={offer.logo}/>
                </div>
                <div className={styles.flexColumn}>
                    <div className={styles.flexRow}>
                        {offer.title}
                    </div>
                    <div className={styles.flexRow}>
                    <span style={{color: "rgb(30, 198, 108)"}}>
                        <NumberFormat value={offer.minSalary} thousandSeparator={" "} displayType={'text'}/> - <NumberFormat value={offer.maxSalary} thousandSeparator={" "} displayType={'text'}/>  {offer.currency}</span>
                    </div>
                    <div className={styles.flexRow}>
                        {offer.company}
                    </div>
                </div>
            </div>
        </Popup>);
}
export default OfferPopup;