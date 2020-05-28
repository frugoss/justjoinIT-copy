import React, {useEffect} from "react";
import styles from "./offers.module.scss";
import Loading from 'react-loading-animation'
import OfferListItem from './OfferListItem'


const OffersList = ({offersList, applications, fetching, setHideFilter, hideFilter}) => {
    useEffect(() => {
        if (setHideFilter !== undefined) {
            setHideFilter(false)
        }
    }, [hideFilter])


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
