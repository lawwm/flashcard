const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth.js");
const jwt = require("jsonwebtoken");
const config = require("config");
const {
    check,
    validationResult
} = require("express-validator");

const User = require("../../models/User.js");


// @route POST api/users
// @desc Register User
// @access Public
router.post('/', [
    check('name', "Name is required").not().isEmpty(),
    check('email', "Please include a valid email").isEmail(),
    check('password', "Please enter a password with ").isLength({min: 6})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { name, email, password } = req.body;

        try {
            //check if email belongs to existing user
            let user = await User.findOne({ email });
            if (user) {
                res.status(400).json({
                    errors: [{msg: "User already exists"}]
                });
            }
            
            user = new User({name, email, password, deckCount: 0 });

            // encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            await user.save();

            // user.password = await new Promise((resolve, reject) => {
            //     bcrypt.hash(password, 10, function(err, hash) {
            //       if (err) reject(err)
            //       resolve(hash)
            //     });
            // })
            // await user.save();

            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtToken'), {expiresIn: 360000}, (err, token) => {
                if (err) throw err;
                res.json({ token });
            })
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })

//@route Delete api/users
//@desc Remove User profile
//@access Private
router.delete("/", auth, async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user.id});
        if (!user) {
            return res.status(400).json({
                msg: "User does not exist"
            })
        }
        await User.findOneAndRemove({
            _id: req.user.id
        })
        res.json({
            msg: "User deleted"
        })
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//@route Get api/users
//@desc Get all the user profiles sorted from most deck to least decks
//@access Private
router.get("/", auth, async(req, res) => {
    try {
        const users = await User.find().sort({ "deckCount" : -1 });
        res.json(users);
    } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

module.exports = router;