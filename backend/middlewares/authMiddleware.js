const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectRoute = async (req, res, next) => {
    
    try {
        const token = req.cookies.token; 
        console.log(req.cookies);
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        console.log(token);
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        if(!decoded){
            return res.status(401).json({message:"Unauthorized"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found!!"});
        }
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
        
    }
}

module.exports = protectRoute;