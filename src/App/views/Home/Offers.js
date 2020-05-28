import React, {useState} from 'react';
import OffersList from "./OffersList";
import OffersMap from "./OffersMap";
import OfferDetail from "./OfferDetail";
import {Route, Switch, withRouter} from 'react-router-dom';
import MapDetail from "./MapDetail"
import Hidden from '@material-ui/core/Hidden'
import {ButtonBase} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import MapIcon from '@material-ui/icons/Map';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styles from './offers.module.scss';


const useStyles = makeStyles({
    root: {
        zIndex: 500,
        boxShadow: "rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px",
        background: "rgb(255, 103, 156)",
        borderRadius: "50%",
        width: 56,
        height: 56,
    },

});

const Offers = ({offersList, match, filters, history, fetching, setHideFilter, hideFilter}) => {
    const classes = useStyles();
    const [mobileViewMode, setMobileViewMode] = useState({
        view: "list",
        header: true
    })

    return (
        <>

            <Hidden smDown>
                <div className={styles.offersContainerDesktop}>


                    <Switch>

                        <Route path="/offers/:offerTitle"
                               component={() => <OfferDetail filters={filters} fetching={fetching}
                                                             offersList={offersList} match={match}/>}/>

                        <Route path="/" component={() => <OffersList fetching={fetching} offersList={offersList}/>}/>
                    </Switch>


                    <div style={{
                        width: "90%"
                    }}>
                        <Switch>

                            <Route path="/offers/:offerTitle"
                                   component={() => <MapDetail history={history} offersList={offersList}
                                                               match={match}/>}/>/
                            <Route path="/" component={() => <OffersMap history={history} offers={offersList}/>}/>

                        </Switch>
                    </div>
                </div>
            </Hidden>
            <Hidden mdUp>
                <div style={{display: "flex", height: hideFilter ? "calc(100vh - 65px)" :"calc(100vh - 120px)"}}>
                    <div className={styles.viewMobile} style={{
                        display: mobileViewMode.view === "map" ? "none" : "block"
                    }}>

                        <Switch>
                            <Route path="/offers/:offerTitle"
                                   component={() => <OfferDetail hideFilter={hideFilter} setHideFilter={setHideFilter} filters={filters}
                                                                 fetching={fetching} mobileViewMode={mobileViewMode}
                                                                 offersList={offersList} match={match}/>}/>
                            <Route path="/"
                                   component={() => <OffersList hideFilter={hideFilter} setHideFilter={setHideFilter} fetching={fetching}
                                                                offersList={offersList}/>}/>
                        </Switch>
                    </div>
                    <div style={{
                        display: mobileViewMode.view === "map" ? "block" : "none",
                        width: "100%"
                    }}>
                        <Switch>

                            <Route path="/offers/:offerTitle"
                                   component={() => <MapDetail  mobileViewMode={mobileViewMode}
                                                               setMobileViewMode={setMobileViewMode} history={history}
                                                               offersList={offersList} match={match}/>}/>/
                            <Route path="/" component={() => <OffersMap mobileViewMode={mobileViewMode}
                                                                        setMobileViewMode={setMobileViewMode}
                                                                        history={history} offers={offersList}/>}/>

                        </Switch>
                    </div>
                    <div className={styles.mapButton}>

                        <ButtonBase classes={{root: classes.root}} onClick={() => {
                            setMobileViewMode({
                                ...mobileViewMode,
                                view: mobileViewMode.view === "list" ? "map" : "list"
                            })
                        }}> {mobileViewMode.view === "list" ? <MapIcon style={{color: "white"}}/> :
                            <ArrowBackIcon style={{color: "white"}}/>} </ButtonBase>
                    </div>

                </div>
            </Hidden>
        </>


    )
};


export default withRouter(Offers);
