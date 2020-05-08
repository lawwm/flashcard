const mongoose = require("mongoose");

const DeckSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    cards: [{
        title: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }]
})

module.exports = Deck = mongoose.model('deck', DeckSchema);