import React, {useEffect} from "react";
import styles from "./offers.module.scss";
import OfferListItem from './OfferListItem'
// @ts-ignore
import Loading from 'react-loading-animation'
import {applicationInterface, offerInterface} from "../../utils/const";



type OffersListProps = {
    offersList: offerInterface[],
    applications?: applicationInterface[] | undefined,
    fetching?: boolean,
    setHideFilter?:  React.Dispatch<React.SetStateAction<boolean>>
    hideFilter?: boolean

}

const OffersList: React.FC<OffersListProps> = ({offersList, applications, fetching, setHideFilter}) => {
    useEffect(() => {
        if (setHideFilter !== undefined) {
            setHideFilter(false)
        }
    }, [setHideFilter])


    return (
        <div className={styles.offersList}
             >
            {fetching ?
                <div className={styles.loadingContainer}><Loading
                    className={styles.loadingDimensions}/></div> : ""}
            {offersList.map((offer,index) => <OfferListItem key={index} offer={offer} applications={applications}/>
            )}
        </div>
    );
}

export default OffersList
