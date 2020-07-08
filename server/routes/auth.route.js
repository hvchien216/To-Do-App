const router = require('express').Router();
const User = require('../models/user.model');
const { registerValidation, loginValidation } = require('../utils/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    //lets validate the data before we a user
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            messages: error.details[0].message
        });;
    }

    //checking if the user is already in the database
    const emailExist = await User.findOne({ email: email })
    if (emailExist) {
        return res.status(400).send('Email already exists');
    }

    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
        name: name,
        email: email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        res.send({
            success: true,
            data: savedUser
        });
    } catch (err) {
        res.status(400).send({ messages: err });
    }
});

router.post('/login', async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            messages: error.details[0].message
        });
    }

    //checking if the user is already in the database
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(400).send('Email or password wrong!');
    }

    const validPwd = await bcrypt.compare(password, user.password);
    if (!validPwd) {
        return res.status(400).send('Invalid Password');
    }

    const token = jwt.sign({ _id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET);

    res.header('authorization').send({
        success: true,
        user: {
            name: user.name,
            email: user.email
        },
        token
    });
})

module.exports = router;