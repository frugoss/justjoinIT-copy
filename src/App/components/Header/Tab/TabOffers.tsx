import React from 'react';
import {Link} from 'react-router-dom';
import styles from './tab.module.scss';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import History from 'history';

const useStyles = makeStyles(createStyles({
    root: {
        textTransform:"none",
        marginBottom:4,
        width: 140
    }}));

type TabOffersProps = {
    location: History.Location
    text: string,
    to: string,
    img: React.ReactNode
}
const TabOffers: React.FC<TabOffersProps> = ({location, text, to, img}) => {
    const buttonClass = useStyles();
    let isActive;
    if (location.pathname.startsWith("/offers") || location.pathname.startsWith("/warszawa") || location.pathname.startsWith("/szczecin") || location.pathname.startsWith("/gdansk") || location.pathname.startsWith("/sopot") || location.pathname.startsWith("/krakow") || location.pathname.startsWith("/poznan") || location.pathname.startsWith("/gdynia") || location.pathname.startsWith("/wroclaw") || location.pathname.startsWith("/sopot") || location.pathname.startsWith("/all") || location.pathname === "/") {
        isActive = true;
    } else {
        isActive = false;
    }
    return (

        <Link to={to} style={{textDecoration: "none"}}>
            <Button
                    className={`${styles.tab} ${buttonClass.root} ${isActive ? styles.activeTab : ''}`} startIcon={img}>{text}</Button>
        </Link>
    );
}


export default TabOffers;
