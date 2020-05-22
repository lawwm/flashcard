import React, {Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';

import Register from "../auth/Register";
import Dashboard from "../dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import CreateDeck from "../deck-forms/CreateDeck";
import UserDecks from "../deck/UserDecks";

const Routes = props => {
    return(
    <Fragment>
        <Switch>
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/userdecks" component={UserDecks} />
            <PrivateRoute exact path="/createdeck" component={CreateDeck} />
        </Switch>
    </Fragment>
    )
}

export default Routes;