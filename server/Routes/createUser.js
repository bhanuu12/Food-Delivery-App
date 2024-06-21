const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming your User model is properly imported
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretString = "qwertyuioplmkjhgfdaszxcvbnmjhgfd";

// Route to create a new user
router.post('/createuser', [
    check('email').isEmail().withMessage('Invalid email format'),
    check('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, location, email, password, date } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            location,
            email,
            password: securePassword,
            date
        });

        const authToken = jwt.sign({ user: { id: newUser.id } }, secretString, { expiresIn: '1h' }); // Example: Expires in 1 hour
        res.json({ success: true, authToken: authToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Route to login a user
router.post('/loginuser', [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email });
       
        if (!userData) {
            return res.status(400).json({ errors: [{ msg: "Incorrect username or password" }] });
        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ errors: [{ msg: "Incorrect password" }] });
        }

        const authToken = jwt.sign({ user: { id: userData.id } }, secretString, { expiresIn: '1h' }); // Example: Expires in 1 hour
        res.json({ success: true, authToken: authToken });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

module.exports = router;
