const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            minLength:6 
        },
        fullName:{
            type:String,
            required:true
        },
        profilePic:{
            type:String,
            default:"",
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;