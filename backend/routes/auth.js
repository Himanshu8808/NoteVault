const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const fetchuser =require('../middleware/fetchuser');

//secret code for jason web token
const JWT_SECRET = process.env.JWT_SECRET;

//ROUTE 1 creating a new user: No login required

router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
], async (req, res) => {
    let Success = false;
    
    // cheking validation result
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({Success, errors: errors.array() });
    }

    // Check if a user is already exist or not

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({Success, error: 'Sorry a user with this email already exist' });
        }

        // creating a hashed password

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Creating a genuine new user  

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        //signing json web token for sending to the user

        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        Success = true;
        res.json({Success, token});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//ROUTE 2 creating endpoint for login validation: No login required

router.post('/login', [
    body('email').isEmail(),
    body('password').exists(),
], async (req, res) => {
    let Success = false;
    const errors = validationResult(req);

    // cheking validation result

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {

        //search wether the user exist or not

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ Success, error: 'Please enter correct credentials' });
        }

        // comparing entered and stored hashed password

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            Success = false;
            return res.status(400).json({ Success, error: 'Please enter correct credentials' });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        Success = true;
        res.json({Success, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//ROUTE 3 get loggedin user details using post: "/api/auth/getuser" .Login required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;