import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { Route, Router, Switch, Redirect } from 'react-router-dom'

import SiteLayout from "./components/SiteLayout/SiteLayout";
import CardDataForm from "./components/CardDataForm/CardDataFormAsync";
import UserDataForm from "./components/UserDataForm/UserDataFormAsync";
import FinishForm from "./components/FinishForm/FinishFormAsync";
import NotFound from "./components/NotFound/NotFound";

import UserStore from './store/userStore';
import CardStore from './store/cardStore';
import ProjectStore from './store/projectStore';

import createBrowserHistory from 'history/createBrowserHistory'


(function () {
    const container =
        document.getElementById('App');

    ReactDOM.render(
        <Provider userStore={ UserStore } cardStore={ CardStore } projectStore={ ProjectStore }>
            <Router history={ createBrowserHistory() }>
                <SiteLayout>
                    <Switch>
                        <Route path="/user" component={ UserDataForm } />
                        <Route path="/card" component={ CardDataForm } />
                        <Route path="/finish" component={ FinishForm } />
                        <Redirect from="/" to="/user"/>
                        <Route path="*" component={ NotFound } />
                    </Switch>
                </SiteLayout>
            </Router>
        </Provider>,
        container,
    );
}());