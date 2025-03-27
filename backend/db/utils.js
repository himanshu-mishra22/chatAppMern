const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const generateToken = (userId, res) => {
    const token = jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
    )
    res.cookie("token", token, {
        maxAge: 1*24*60*60*1000,
        httpOnly: false,
        sameSit:"strict",
        secure:true 
    })

    return token;
};

module.exports = generateToken;
