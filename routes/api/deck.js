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

  //@route GET api/deck
  //@desc get all decks
  //@access Private
  router.get("/", auth, async (req, res) => {
    try {
        const decks = await Deck.find();
        res.json(decks);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
  })

  //@route POST api/deck
  //@desc Create new deck and add to creator's deck
  //@access Private
  router.post(
      "/",
      [
          auth,
          [
              check("title", "Title is required").not().isEmpty(),
              check("description", "Description is required").not().isEmpty()
          ]
      ],
      async (req, res) => {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).json({
                  errors: errors.array()
              })
          }

          const creator = req.user.id;

          const {
              title,
              description
          } = req.body;

          try {
              //check if title of deck already exists
              let deck = await Deck.findOne({ title });
              if (deck) {
                  res.status(400).json({
                      errors: [{ msg: "Deck already exists" }]
                  })
              } else {
                  //add deck to deck collection
                  deck = new Deck({ title, description, creator });
                  await deck.save();

                  //add deck id to user's deck 
                  User.findByIdAndUpdate(creator, { $push: { decks: deck.id } }, (err) => {
                      if (err) {
                          throw err;
                      }
                  });
                  res.json(deck);
              }

          } catch(err) {
            console.error(err.message);
            res.status(500).send("Server Error");
          }
      }
  )


  //@route GET api/deck/user/:user_id
  //@desc get user's decks
  //@access Private
  router.get("/user/:user_id", auth, async(req, res) => {
      try {
        const decks = await User.findById(req.params.user_id).populate("decks");
        if (!decks) {
            return res.status(400).json({ msg: "User not found" });
        }
        res.json(decks);
      } catch(err) {
          console.error(err.message);
          res.status(500).send("Server Error");
      }
  })


  //@route PATCH api/deck/user/:deck_id
  //@desc Add deck to user collection
  //@access Private

router.patch("/user/:deck_id", auth, async(req, res) => {
    try {
        //check if deck is already exists in user
        const user = await User.findById(req.user.id);
        const check = user.decks.filter(deck => deck._id == req.params.deck_id);
        if (check.length !== 0) {
            return res.status(400).json({ msg: "Deck has already been added"})
        } else {
            const user = await User.findByIdAndUpdate(
                req.user.id,
                { $push: { decks: req.params.deck_id } },
                { new: true }
            );
            if (!user) {
                return res.status(400).json({ msg: "Deck not found" });
            }
            res.json(user);
        }

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

//@route Delete api/deck/user/:deck_id
//@desc Remove deck from user collection
//@access Private

//@route Delete api/deck
//@desc Remove deck from global collection
//@access Private

module.exports = router;