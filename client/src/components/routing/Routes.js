import React, {Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from "../auth/Register";
import Dashboard from "../global/Dashboard";
import PrivateRoute from "./PrivateRoute";
import CreateDeck from "../deck/CreateDeck";
import UserDecks from "../private/UserDecks";
import ViewDeck from "../deck/ViewDeck";

const Routes = props => {
    return(
    <Fragment>
        <Switch>
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/userdecks" component={UserDecks} />
            <PrivateRoute exact path="/createdeck" component={CreateDeck} />
            <PrivateRoute exact path="/:id?" component={ViewDeck} />
        </Switch>
    </Fragment>
    )
}

export default Routes;