import { combineReducers } from 'redux';
import auth from "./auth";
import alert from "./alert";
import display from "./display";
import deck from "./deck";

export default combineReducers({
    alert,
    auth,
    display,
    deck
});