import React from 'react'
import styles from "./map.module.scss";
import NumberFormat from "react-number-format";
// @ts-ignore
import {Popup} from "react-leaflet";
import clsx from "clsx";
import {offerInterface} from 'App/utils/const';

type OfferPopupProps = {
    offer: offerInterface
}

const OfferPopup: React.FC<OfferPopupProps> = ({offer}) => {

    return (
        <Popup>
            <div className={styles.flexRow}>
                <div className={clsx(styles.flexColumn, styles.popupContainer)}>
                    <img alt="logo" className={styles.iconSize} src={offer.logo}/>
                </div>
                <div className={styles.flexColumn}>
                    <div className={styles.flexRow}>
                        {offer.title}
                    </div>
                    <div className={styles.flexRow}>
                    <span className={styles.spanStyle}>
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
