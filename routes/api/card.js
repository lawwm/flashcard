const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const {
    check,
    validationResult
  } = require("express-validator");

  const Deck = require("../../models/Deck.js");
  const User = require("../../models/User.js");

//@route Get api/card/:deck_id
//@desc Get all the cards in a deck
//@access Private
router.get("/:deck_id", auth, async (req, res) => {
    try {
        let deck = await Deck.findById(req.params.deck_id);
        if (!deck) {
            return res.status(404).json({
                msg: "Deck not found"
            })
        }
        res.json(deck.cards);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//@route Get api/card/:deck_id/view/:card_id
//@desc Get one of the card in a deck
//@access Private
router.get("/:deck_id/view/:card_id", auth, async (req, res) => {
    try {
        let deck = await Deck.findById(req.params.deck_id);
        if (!deck) {
            return res.status(404).json({
                msg: "Deck not found"
            })
        }
        let card = deck.cards.filter(card => card._id == req.params.card_id);
        if (!card) {
            return res.status(404).json({
                msg: "Card not found"
            })
        }
        res.json(card);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})
//@route POST api/card/:deck_id
//@desc Create a new card in deck, only deck creator can add card
//@access Private
router.post(
      "/:deck_id",
      [
          auth,
          [
              check("title", "Title is required").not().isEmpty(),
              check("question", "Question is required").not().isEmpty(),
              check("answer", "Answer is required").not().isEmpty()
          ]
      ],
      async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({
                  errors: errors.array()
              })
          }

          const {title, question, answer} = req.body;

          try {
              //check if title of deck already exists
              const newCard = { title, question, answer };
              let deck = await Deck.findById(req.params.deck_id);
              let num = deck.cards.filter(card => card.title === title);//num is the number of cards that have same title
              if (!deck) {
                  res.status(400).json({
                      errors: [{ msg: "Deck does not exists" }]
                  })
              } else if (deck.creator != req.user.id) {  
                res.status(401).json({
                    errors: [{ msg: "User is not authorized" }]
                })
              } else if (num.length !== 0) {
                  return res.status(400).json({
                      msg: "Card already exists"
                  })
              } else {
                //add new card to array and increment card count
                deck.cards.unshift(newCard);
                deck.cardCount++;
                await deck.save();
                res.json(deck);
              }
          } catch(err) {
            console.error(err.message);
            res.status(500).send("Server Error");
          }
      }
  )
//@route Delete api/card/:deck_id/view/:card_id
//@desc Delete one card in a deck
//@access Private
//TODODODODODODTODODODO
router.delete("/:deck_id/view/:card_id", auth, async(req, res) => {
    try {
        //check if user exists or deck is already empty
        const deck = await Deck.findById(req.params.deck_id);
        let check = deck.cards.length;//find length of card array
        let newDeck = deck.cards.filter(card => {return card._id != req.params.card_id});//remove card
        if (!deck) {
            return res.status(404).json({
                msg: "Deck not found"
            })
        } else if (deck.creator.toString() !== req.user.id.toString()) {//check if user deleting deck is the deck's creator
            return res.status(401).json({
                msg: "User is not authorized to delete card"
            })
        } else if (newDeck.length == check) {
            return res.status(400).json({
                msg: "Card does not exists in the deck"
            })
        } else {
            const result = await Deck.findByIdAndUpdate(
                req.params.deck_id,
                { $pull : { cards: { _id: req.params.card_id }}, $inc : { cardCount: -1} },
                {new: true , multi: true}
            )
            await result.save();
            res.json(result);
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})
//@route Delete api/deck/:deck_id
//@desc Delete all the cards in a deck
//@access Private
router.delete("/:deck_id", auth, async (req, res) => {
    try {
        let deck = await Deck.findById(req.params.deck_id);
        if (!deck) {
            return res.status(404).json({
                msg: "Deck not found"
            })
        } else if (req.user.id != deck.creator) {
            return res.status(401).json({
                msg: "User is not authorized to delete card"
            })
        } else if (deck.cards.length == 0) {
            return res.status(400).json({
                msg: "There are no cards left to delete"
            })
        }
        deck.cards = [];
        deck.cardCount = 0;
        await deck.save();
        res.json(deck);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;