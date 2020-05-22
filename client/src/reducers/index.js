import { combineReducers } from 'redux';
import auth from "./auth";
import alert from "./alert";
import display from "./display";

export default combineReducers({
    alert,
    auth,
    display
});