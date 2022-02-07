const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonWebToken')
const{registerValidation, loginValidation} = require('../Validation');
const { JsonWebTokenError } = require('jsonwebtoken');

// Register new user
router.post('/register',async(req, res) =>{
    //Validate data before making any request

    const {error} =registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Email check
    const existing_email = await User.findOne({email : req.body.email});
    if(existing_email) return res.status(400).send('Email already exists')

    // Hashing password
    const salt = await bcrypt.genSalt(10)
    const Hashed_password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : Hashed_password,
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err)
    }
});


// Login user
router.post('/login', async(req, res) => {

    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

// Check if user email is correct or not 
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Email not exists');

// Check if user password is correct or not
    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if(!validpassword) return res.status(400).send('password is not correct');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});
module.exports = router