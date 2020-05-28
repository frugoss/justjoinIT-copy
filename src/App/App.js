import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './style/style.scss';
import style from './app.module.scss';
import Header from './components/Header/Header';
import SignIn from './views/Auth/SignIn';
import Home from './views/Home/Home';
import ChoosePlan from "./views/PostJob/ChoosePlan";
import SignUp from "./views/Auth/SignUp";
import Dashboard from "./views/Auth/Dashboard"
import JustStepper from "./views/PostJob/JustStepper";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Slide from '@material-ui/core/Slide';


function SlideTransition(props) {
    return <Slide {...props} direction="down"/>;
}

const App = () => {

    const [user, setUser] = useState({
        auth: false,
        name: "",
        userID: "",
        loggedPopup: false,
        offPopup: false,
        createPopup: false,
        addPopup: false,
    });
    const [fetching, setFetching] = useState (true)
    const [offers, setOffers] = useState([])
    const fetchOffers = () => {
        fetch("http://192.168.10.25:7000/").then(function (response) {
            response.json().then(json => {
                    setOffers(json)
                    setFetching(false)
                }
            )
        })
    }
    useEffect(() => {
       fetchOffers();
    }, []);


    const handleClose = () => {
        setUser({...user, loggedPopup: false, offPopup: false, addPopup: false})
    }
    return (
        <div className={style.root}>
            <Snackbar open={user.loggedPopup} TransitionComponent={SlideTransition}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={3000}
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    You are logged in.
                </Alert>
            </Snackbar>
            <Snackbar open={user.offPopup} TransitionComponent={SlideTransition}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={3000}
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Logged out.
                </Alert>
            </Snackbar>
            <Snackbar open={user.addPopup} TransitionComponent={SlideTransition}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={3000}
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Offer successfully added!
                </Alert>
            </Snackbar>
            <BrowserRouter>
                <Header setUser={setUser} user={user}/>
                <Switch>


                    <Route
                        path='/add/basic'
                        render={(props) => (user.auth ? <JustStepper {...props} user={user}
                                                                         setUser={setUser} fetchOffers={fetchOffers}/> : <Redirect to="/devs"/>)}
                        exact
                    />
                    <Route
                        path='/add'
                        render={() => (user.auth ? <ChoosePlan/>
                            : <Redirect to="/devs"/>)}
                        exact
                    />
                    <Route
                        path='/devs'
                        render={(props) => (!user.auth ? <SignIn {...props} user={user} setUser={setUser}/>
                            : <Redirect to="/dashboard"/>)}
                        exact
                    />
                    <Route
                        path='/devs/signup'
                        render={(props) => <SignUp {...props} user={user} setUser={setUser}/>}
                        exact
                    />
                    <Route
                        path='/facebook'
                        component={() => {
                            window.location.href = 'https://www.facebook.com/JustJoinIT/';
                            return null;
                        }}
                        exact
                    />
                    <Route
                        path='/dashboard'
                        render={(props) => (user.auth ? <Dashboard {...props} offers={offers} fetching={fetching} user={user}/> :
                            <Redirect to="/devs"/>)}
                        exact
                    />
                    <Route
                        path='/event'
                        component={() => {
                            window.location.href = 'https://event.justjoin.it/';
                            return null;
                        }}
                        exact
                    />

                    <Route
                        path="/justgeekit"
                        component={() => {
                            window.location.href = 'https://geek.justjoin.it/';
                            return null;
                        }}
                        exact
                    />

                    <Route
                        path="/devs"
                        component={SignIn}
                        exact
                    />

                    <Route path="/offers/:offerTitle"
                           render={(props) => <Home {...props}  fetching={fetching} offers={offers}/>}
                           exact
                    />

                    <Route
                        path="/:city?/:language?/:experience?/:salarymin?/:salarymax?"
                        render={(props) => <Home {...props}  fetching={fetching} offers={offers}/>}
                        exact
                    />
                    {useEffect(() => {
                        fetch("http://192.168.10.25:7000/me", {
                            method: "GET",
                            credentials: "include"
                        }).then(function (response) {
                            if (response.status === 200) {
                                response.text().then(text => {
                                    const newText = JSON.parse(text)
                                    setUser({...user, name: newText.email, userID: JSON.stringify(newText.id), auth: true})
                                })
                            }
                        })
                    }, [])}
                </Switch>
            </BrowserRouter>
        </div>
    );
}
export default App;
