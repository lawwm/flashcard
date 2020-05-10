const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    decks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "deck"
    }],
    deckCount: {
        type: Number,
        required: true
    }
})

module.exports = User = mongoose.model('user', UserSchema);