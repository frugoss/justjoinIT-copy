import React, {useEffect} from "react";
import styles from "./offers.module.scss";
import OfferListItem from './OfferListItem'
// @ts-ignore
import Loading from 'react-loading-animation'
import {applicationInterface, offerInterface} from "../../utils/const";
import {Link, withRouter, RouteComponentProps} from "react-router-dom";



export interface OffersListProps extends RouteComponentProps {
    offersList: offerInterface[],
    applications?: applicationInterface[] | undefined,
    fetching?: boolean,
    setHideFilter?:  React.Dispatch<React.SetStateAction<boolean>>
    hideFilter?: boolean,


}

const OffersList: React.FC<OffersListProps> = ({offersList, applications, fetching, setHideFilter, location}) => {
    useEffect(() => {
        if (setHideFilter !== undefined) {
            setHideFilter(false)
        }
    }, [setHideFilter])

    const offerListRender = () => {
        if (location.pathname === "/dashboard") {
            if (offersList.length > 0) {
                return offersList.map((offer, index) => <OfferListItem key={index} offer={offer} applications={applications}/>)
            } else {
                return <div className={styles.dashboardText}><span className={styles.noOffersDash}>Please <Link
                    to={"/add"}>add</Link> an offer to see it on your dashboard</span></div>
            }
        } else {
            if (offersList.length > 0) {
                return offersList.map((offer, index) => <OfferListItem key={index} offer={offer} applications={applications}/>)
            } else {
                return <div className={styles.dashboardText}><span className={styles.noOffersDash}>No offers with chosen criterias :(</span></div>
            }
        }
    }

    return (
        <div className={styles.offersList}
             >
            {fetching ?
                <div className={styles.loadingContainer}><Loading
                    className={styles.loadingDimensions}/></div> : ""}
            {offerListRender()}
        </div>
    );
}

export default withRouter(OffersList)
