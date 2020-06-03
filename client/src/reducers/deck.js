import {
    VIEW_DECK
} from "../actions/types";

const initialState = {
    currentCards: [], //decks
    currentCard: 0, //page user is on
    deckId: "",
    title: "",
    description: "",
    cardCount: 0,
    loading: true,
    error: {}
}

export default function(state=initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case VIEW_DECK:
            return {
                ...state,
                currentCards: payload.cards,
                currentCard: 1,
                deckId: payload._id,
                title: payload.title,
                description: payload.description,
                cardCount: payload.cardCount,
                loading: false
            }
        default:
            return state;
    }
}