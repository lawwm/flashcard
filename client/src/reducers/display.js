import {
    GET_PAGE,
    PAGINATE_ERROR,
    UPDATE_LIMIT,
    UPDATE_NEIGHBOUR,
    CREATE_DECK,
    CREATE_DECK_FAIL,
    GET_USER_PAGE,
    CREATE_CARD,
    DECK_ERROR,
    DELETE_CREATOR_DECK,
    ADD_DECK,
    DELETE_USER_DECK,
    DELETE_ALL_USER_DECK,
    DELETE_ALL_CREATOR_DECK,
    UPDATE_DECK
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
        case UPDATE_DECK:
            let newCurrentDecks = state.currentDecks;
            newCurrentDecks[payload.index].title = payload.title;
            newCurrentDecks[payload.index].description = payload.description;
            return {
                ...state,
                currentDecks: [
                    ...newCurrentDecks
                ]
            }
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
        case DELETE_CREATOR_DECK:
        case DELETE_USER_DECK:
            return {
                ...state,
                currentDecks: state.currentDecks.filter(card => card._id !== payload),
                totalRecords: state.totalRecords - 1
            }
        case DELETE_ALL_USER_DECK:
            return {
                ...state,
                currentDecks: []
            }
        case DELETE_ALL_CREATOR_DECK:
            return {
                ...state,
                currentDecks: state.currentDecks.filter(card => card.creator !== payload)
            }
        case CREATE_DECK_FAIL:
        case CREATE_CARD:
        case ADD_DECK:
        default:
            return state;
    }
}