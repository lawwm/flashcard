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
const paginatedResults = require("../../middleware/pagination.js");

  //@route GET api/deck?page=1&limit=10
  //@desc get all decks paginated
  //@access Private
  router.get("/", [ auth, paginatedResults(Deck)], async (req, res) => {
    try {
        res.json(res.paginatedResults);
        // const decks = await Deck.find();
        // res.json(decks);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
  })


  //@route POST api/deck
  //@desc Create new deck and add to creator's collection
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
                  deck = new Deck({ title, description, creator, cardCount : 0 });
                  await deck.save();

                  //add deck id to user's deck 
                  User.findByIdAndUpdate(creator, { $push: { decks: deck.id }, $inc : { deckCount: 1} }, (err) => {
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
  router.get("/user/:user_id", [auth], async(req, res) => {
      try {
        // const decks = await User.findById(req.params.user_id).populate("decks");
        // if (!decks) {
        //     return res.status(400).json({ msg: "User not found" });
        // }
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const results = {};
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const decks = await User.findById(req.params.user_id).populate("decks");
        results.decks = decks.decks.slice(startIndex, endIndex);
        results.totalRecords = decks.decks.length;
        res.json(results);

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
            // find user then push deck into array and return new data
            const user = await User.findByIdAndUpdate(
                req.user.id,
                { $push: { decks: req.params.deck_id }, $inc : { deckCount: 1 } },
                { new: true }
            );
            // user.decks.unshift(req.params.deck_id);
            await user.save();

            if (!user) {
                return res.status(400).json({ msg: "User not found" });
            }
            res.json(user);
        }

    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

//@route Delete api/deck/user/:deck_id
//@desc Remove one deck from user collection
//@access Private
router.delete("/user/:deck_id", auth, async(req, res) => {
    try {
        //check if deck exists in user
        const user = await User.findById(req.user.id);
        const check = user.decks.filter(deck => deck._id == req.params.deck_id);
        if (check.length == 0 || !user) {
            return res.status(400).json({ msg: "Deck does not exists"})
        } else {
            //Get remove index
            // const removeIndex = user.decks.indexOf(req.params.deck_id);
            // user.decks.splice(removeIndex, 1);
            // user.updateOne({$inc: {deckCount: -1}});
            const result = await User.findByIdAndUpdate(
                req.user.id,
                {  $pull : { decks: req.params.deck_id}, $inc : { deckCount: -1} },
                {new: true}
            )
            await result.save();

            res.json(result);
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})


//@route Delete api/deck/user
//@desc Remove all deck from user collection
//@access Private
router.delete("/user", auth, async(req, res) => {
    try {
        //check if user exists or deck is already empty
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(400).json({ msg: "User does not exists"})
        } else if (user.decks.length == 0 ) {
            return res.status(400).json({ msg: "Deck is already empty"});
        }
            //Empty user decks array
        user.decks = [];
        user.deckCount = 0;
        await user.save();
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

//@route Delete api/deck
//@desc Remove all user's decks from global collection
//@access Private
router.delete("/", auth, async (req, res) => {
    try {
        await Deck.deleteMany({ creator: req.user.id });
        res.json({
            msg: "All creator's decks deleted"
        })
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//@route Delete api/deck/:deck_id
//@desc Remove one user's deck from global collection
//@access Private
router.delete("/:deck_id", auth, async(req, res) => {
    try {
        //check if user exists or deck is already empty
        const deck = await Deck.findById(req.params.deck_id);
        if (!deck) {
            return res.status(404).json({
                msg: "Deck not found"
            })
        }
        //check if user deleting deck is the deck's creator
        if (deck.creator.toString() !== req.user.id.toString()) {
            return res.status(401).json({
                msg: "User is not authorized to delete deck"
            })
        }
        await deck.remove();
        res.json({
            msg: "Creator's deck deleted"
        })
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

//@route PATCH api/deck/:deck_id
//@desc Edit the deck title or description
//@access Private

module.exports = router;