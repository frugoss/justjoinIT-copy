import slugify from "slugify";
import styles from "./offers.module.scss";
import NumberFormat from "react-number-format";
import BusinessIcon from "@material-ui/icons/Business";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import Hidden from "@material-ui/core/Hidden";
import DescriptionIcon from "@material-ui/icons/Description";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import OfferListItemCV from './OfferListItemCV'

const OfferListItem = ({offer, applications}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    let cvCount = {};
    const cvCountFunc = (key) => {
        let count = cvCount[key];
        cvCount[key] = count === undefined ? 1 : count+1}


    if (applications !== undefined){
        applications.forEach(e => {
            if(e.offerID){
            cvCountFunc(e.offerID)
        }
    })
}
    const [showCvs, setShowCvs] = useState()
    const [title, setTitle] = useState()
    const matchingApplications = (offerID) => {
        const matchingApplications = applications.filter(application => offerID === application.offerID)
        setShowCvs(matchingApplications)
        handleClickOpen();
    }
    return (
        <Link key={offer.company + offer.title} to={`/offers/${slugify(`${offer.company}-${offer.title}`, {
            lower: true
        })}`} className={styles.offerLink}>
            <div className={`${styles.main} animated fadeIn fast`}>
                <div className={styles.color} style={{background: `${offer.technology[0].color}`}}/>
                <div className={styles.img}>
                    <img src={offer.logo} className={styles.logoList} alt="logo"/>
                </div>
                <div className={styles.card}>
                    <div className={`${styles.flex} ${styles.fontSize}`}>
                        <div style={{flexGrow: 1}}><h3>{offer.title}</h3></div>
                        <div className={styles.flexEnd} style={{color: "rgb(30, 198, 108)"}}><NumberFormat
                            value={offer.minSalary} thousandSeparator={" "}
                            displayType={'text'}/> - <NumberFormat value={offer.maxSalary}
                                                                   thousandSeparator={" "}
                                                                   displayType={'text'}/> {offer.currency}</div>

                    </div>
                    <div className={`${styles.flex} ${styles.fontIconText}`}>
                        <div className={styles.businessContainer}><BusinessIcon
                            fontSize={"inherit"}/> {offer.company} </div>
                        <div className={styles.locationContainer}><LocationOnRoundedIcon
                            style={{marginRight: 4}} fontSize={"inherit"}/>{offer.city}</div>
                        <Hidden smDown>
                            <div className={styles.flexEnd}>
                                {offer.techStack.map((element, index) => {
                                    if (index < 3) {
                                        return <div key={index}  className={styles.tag}>{element.language}</div>
                                    } else {
                                        return ""
                                    }
                                })}
                            </div>
                        </Hidden>
                    </div>
                </div>

                {applications !== undefined ? <div className={styles.iconCv} onClick={(e) => {
                    e.preventDefault();
                    matchingApplications(offer._id);
                    setTitle(offer.title)
                }}>
                    <DescriptionIcon className={styles.iconCvSize}/>
                    <div className={styles.dashboardCVContainer}>
                        <span>
                    {cvCount[offer._id] !== undefined ? cvCount[offer._id] : "0"}</span>
                        <span>CV</span>
                    </div>
                </div> : ""}
                <OfferListItemCV setOpen={setOpen} showCvs={showCvs} open={open} title={title}/>
            </div>

        </Link>)
}

export default OfferListItem;