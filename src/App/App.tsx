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
import {userInterface} from "./utils/const";
import {TransitionProps} from "@material-ui/core/transitions";
import {API_HOST} from "./utils/api";

const SlideTransition = (props:TransitionProps) => {
    return <Slide {...props} direction="down"/>;
}

const App: React.FC = () => {
    const [user, setUser] = useState<userInterface>({
        auth: false,
        name: "",
        userID: "",
        loggedPopup: false,
        offPopup: false,
        createPopup: false,
        addPopup: false,
    });
    const [fetching, setFetching] = useState(true)
    const [offers, setOffers] = useState([])
    const fetchOffers = () => {
        fetch(API_HOST).then(function (response) {
            response.json().then(json => {
                    setOffers(json)
                    setFetching(false)
                }
            )
        })
    }



    useEffect(() => {
        fetch(`${API_HOST}/me`, {
            method: "GET",
            credentials: "include"
        }).then(function (response) {
            if (response.status === 200) {
                response.text().then(text => {
                    const newText: {email: string, name:string, id:string} = JSON.parse(text)
                    setUser({name: newText.email, userID: JSON.stringify(newText.id), auth: true})
                })
            }
        })
    }, [])

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
                        render={(props) => ( user && !user.auth ? <SignIn {...props} user={user} setUser={setUser}/>
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
                        render={(props) => (user.auth ? <Dashboard {...props} offers={offers} user={user}/> :
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
                </Switch>
            </BrowserRouter>
        </div>
    );
}
export default App;
