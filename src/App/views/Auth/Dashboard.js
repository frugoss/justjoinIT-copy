import React, {useEffect, useState} from 'react'
import OffersList from "../Home/OffersList";
import styles from './auth.module.scss'

const Dashboard = ({user,offers}) => {
    const [applications, setApplications] = useState()
    const offersList = offers.filter(offer => offer.userID === user.userID)
    useEffect( () => {
            fetch('http://192.168.10.25:7000/cv/get',{method: 'GET'}).then(function (response) {
                response.json().then(json => {setApplications(json)
                })

            })
        },[])
    return(
    <div className={styles.dashboard}>
    <OffersList applications={applications} offersList={offersList}/>
    </div>
    )
}

export default Dashboard
