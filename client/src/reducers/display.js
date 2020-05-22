import {
    GET_PAGE,
    PAGINATE_ERROR,
    UPDATE_LIMIT,
    UPDATE_NEIGHBOUR,
    CREATE_DECK,
    CREATE_DECK_FAIL,
    GET_USER_PAGE
} from "../actions/types";

const initialState = {
    currentDecks: [], //decks
    currentPage: 0, //page user is on
    totalPages: 0, //total number of pages in the pagination
    totalRecords: 0, //total number of decks
    pageArray: [], //pagination model
    loading: true,
    limit: 5,
    neighbour: 1,
    createdDeck: false,
    error: {}
}

export default function(state=initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case GET_PAGE:
        case GET_USER_PAGE:
            return {
                ...state,
                currentDecks: payload.currentDecks,
                currentPage: payload.currentPage,
                totalPages: payload.totalPages,
                totalRecords: payload.totalRecords,
                pageArray: payload.pageArray,
                loading: false
            }
        case PAGINATE_ERROR:
            return {
                ...state,
                loading: false,
                error: {
                    payload
                }
            }
        case UPDATE_LIMIT:
            return {
                ...state,
                limit: payload
            }
        case UPDATE_NEIGHBOUR:
            return {
                ...state,
                neighbour: payload
            }
        case CREATE_DECK:
            return {
                ...state,
                createdDeck: true
            }
        case CREATE_DECK_FAIL:
        default:
            return state;
    }
}