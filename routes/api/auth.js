const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const config = require("config");
const {
    check,
    validationResult
} = require('express-validator');

const User = require("../../models/User");

//@route GET api/auth
//@desc Get user by token
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route POST api/auth
// @desc Authenticate user and get token
// @access Public
router.post("/", [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        email,
        password
    } = req.body;

    try {
        //check if user exist
        let user = await User.findOne({
            email
        });

        if (!user) { //if no user return invalid credentials
            return res.status(400).json({
                errors: [{
                    msg: "Invalid Credentials",
                }, ],
            });
        }

        const isMatch = await bcrypt.compare(password, user.password); //compare password in req and hashed password in the database

        if (!isMatch) {
            return res.status(400).json({
                errors: [{
                    msg: "Invalid Credentials",
                }, ],
            });
        }

        //return jsonwebtoken
        const payload = {
            user: {
                id: user.id, //get mongoDB id
            },
        };

        jwt.sign(
            payload,
            config.get("jwtToken"), {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token,
                });
            }
        );
        } catch(err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;