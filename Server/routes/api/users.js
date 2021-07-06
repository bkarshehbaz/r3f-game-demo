const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateDiamondAndHeartInput = require('../../validation/diamondAndHeart');

// Load User model
const User = require('../../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {
    // Form validation

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                diamonds: 0,
                hearts: 0,
                score: 0,
            });

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
    console.log('Login from server');
    // Form validation

    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: 'Email not found' });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    diamonds: user.diamonds,
                    hearts: user.hearts,
                    email: user.email,
                    score: user.score,
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926, // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token,
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordincorrect: 'Password incorrect' });
            }
        });
    });
});

// @route POST api/users/updateDiamond
// @desc return updateDiamond
// @access Public
router.post(
    '/diamondAndHeartUpdate',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // Form validation
        console.log(req.body.diamonds);
        console.log(req.body.hearts);
        console.log(req.body.email);

        // const { errors, isValid } = validateDiamondAndHeartInput(req.body);
        // let newdata = JSON.parse(req.body);

        // Check validation
        // if (!isValid) {
        //   return res.status(400).json(errors);
        // }

        let diamonds = req.body.diamonds;
        let hearts = req.body.hearts;
        let email = req.body.email;
        let score = req.body.score;
        // Find user by email
        User.findOneAndUpdate(
            email,
            { diamonds: diamonds, hearts: hearts, score: score },
            {
                new: true,
            },
            (err, doc) => {
                if (err) {
                    return res.status(404).json({ emailnotfound: 'Email not found' });
                }
                return res.status(200).json(doc);
            }
        );
    }
);

// @route POST api/users/updateDiamond
// @desc return updateDiamond
// @access Public
router.post(
    '/diamondAndHeartGet',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // Form validation

        // Check validation
        if (!req.body.email) {
            return res.status(400).json({ error: 'Please give some email' });
        }

        let email = req.body.email;

        // Find user by email
        User.findOne({ email }, (err, user) => {
            if (err) {
                return res.status(404).json({ emailnotfound: 'Email not found' });
            }
            return res.status(200).json(user);
        });
    }
);

// @route POST api/users/updateDiamond
// @desc return updateDiamond
// @access Public
router.post(
    '/getallscores',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // Find user by email
        User.find({}, (err, users) => {
            if (err) {
                return res.status(404).json({ emailnotfound: 'Email not found' });
            }
            var userMap = [];

            users.forEach(function(user) {
                let newdata = {
                    email: user.email,
                    score: user.score,
                };
                userMap.push(newdata);
            });
            return res.status(200).json(userMap);
        });
    }
);

module.exports = router;
