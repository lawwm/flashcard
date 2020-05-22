import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import ReactDOM from 'react-dom';
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Login from "./components/auth/Login";
import Routes from "./components/routing/Routes";
import {loadUser} from "./actions/auth";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";

// import './App.css';

const App = () => {
    useEffect(() => {
        setAuthToken(localStorage.token);
        store.dispatch(loadUser());
    }, []);

    return(
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Alert />
                    <Switch>
                        <Route exact path ="/" component={Login} />
                        <Route component={Routes} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
    )
}

export default App;