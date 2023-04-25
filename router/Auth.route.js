const express = require('express');
const User = require('../models/User.model');
const { generateToken, generateRefreshToken } = require('../middlewares/JwtUtils');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
    try {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
        });
        await user.save();
        const token = generateToken({ userId: user._id });
        const refreshToken = generateRefreshToken({ userId: user._id });
        res.status(201).json({ token, refreshToken });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ message: 'Auth failed' });
        const isValidPassword = await user.isValidPassword(req.body.password);
        if (!isValidPassword) return res.status(401).json({ message: 'Passwort not valid' });
        const token = generateToken({ userId: user._id });
        const refreshToken = generateRefreshToken({ userId: user._id });
        res.status(201).json({ token, refreshToken });
    }
    catch (e) {
        next(e);
    }
})


module.exports = router