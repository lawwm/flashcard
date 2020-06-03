import axios from 'axios';
import { setAlert } from "./alert";
import {
    VIEW_DECK,
    PAGINATE_ERROR
} from "./types";

export const viewDeck = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/card/${id}`);
        const payload = res.data;
        dispatch({
            type: VIEW_DECK,
            payload: payload
        })
    } catch (err) {
        dispatch({
            type: PAGINATE_ERROR,
            payload: err
        });
    }
  }
  