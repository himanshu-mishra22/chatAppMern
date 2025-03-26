const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateToken = require("../db/utils");
const { cloudinary } = require("../db/couldinary");
const {mkdirSync, renameSync} = require('fs');
const signup=  async (req, res) => {
    const {email, fullName,  password} = req.body;
    try {
         if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
            profilePic:"",
        });
        if(newUser){
           generateToken(newUser._id, res);
           await newUser.save();
           res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profile 
          });
        }else{
            res.status(400).json({message:"Invalid user data"});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }
};

 const login=async (req, res) => {
    const {email,password}= req.body
   try {
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const isPassCorrect = await bcrypt.compare(password,user.password)
    if(!isPassCorrect){
        return res.status(400).json({message:"Invalid credentials"});
    }
    // console.log(user.getTimestamp());
    console.log(user.createdAt);
    generateToken(user._id, res);
    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        createdAt: user.createdAt
      });


   } catch (error) {
       console.log(error);
       res.status(500).json({message:"Internal server error"});
    
   }
}

const logout= (req, res) => {
    try {
        res.cookie("token","",{
            maxAge:0
        })
        res.status(200).json({message:"Logged out"});
    } catch (error) {
        console.log(error); 
        res.status(500).json({message:"Internal server error"});
    }
}

const updateProfile= async (req, res) => {
    try {
        if(!req.file){
            return res.status(400).json({message:"Please upload a profile picture"});
        }
       const userId =  req.user._id;
       let filedir=`uploads`
       let filename=`${filedir}/${req.file.originalname}`
       renameSync(req.file.path,filename)
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:filename},{new:true});
        res.status(200).json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                profilePic: updatedUser.profilePic
              });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
        
    }
}

const checkAuth= (req, res) => {
    try {
        res.status(200).json({message:"User is authenticated"});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
        
    }
}


module.exports = {
    signup,
    login,
    logout,
    updateProfile,
    checkAuth
};
