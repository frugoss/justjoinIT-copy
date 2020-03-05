import React from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
} from 'react-router-dom';
import './style/style.scss';
import style from './app.module.scss';
import Header from './components/Header/Header';
import SkiCams from './views/SkiCams/SkiCams';
import Sign from './views/SignIn/Sign';
import Home from './views/Home/Home';
import ChoosePlan from "./views/Plan/ChoosePlan";

const App = () => (
    <div className={style.root}>
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route
                    path='/add-offer'
                    component={ChoosePlan}
                    exact
                    />
                <Route
                    path='/devs'
                    component={Sign}
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
                    path="/ski-cams"
                    component={SkiCams}
                    exact
                />
                <Route
                    path="/devs"
                    component={Sign}
                    exact
                />
                <Route
                    path="/"
                    component={Home}
                    exact
                />

                <Route
                    path="/:city?/:language?/:experience?/:salarymin?/:salarymax?"
                    component={Home}
                    exact
                />
            </Switch>
        </BrowserRouter>
    </div>
);

export default App;
