import React, {useEffect, useState} from 'react'
import OffersList from "../Home/OffersList";
import styles from './auth.module.scss'
import {userInterface} from "../../utils/const";
import {offerInterface} from "../../utils/const";
import {API_HOST} from "../../utils/api";
type DashboardProps = {
    user: userInterface,
    offers: offerInterface[]
}
const Dashboard: React.FC<DashboardProps> = ({user,offers}) => {
    const [applications, setApplications] = useState([])
    const offersList = offers.filter(offer => offer.userID === user.userID)
    useEffect( () => {
            fetch(`${API_HOST}/cv/get`,{method: 'GET'}).then(function (response) {
                response.json().then(json => {setApplications(json)
                })

            })
        },[])

    return(
    <div className={styles.dashboard}>
        <OffersList applications={applications} offersList={offersList} />
    </div>
    )
}

export default Dashboard
