const Message = require("../models/messageModel.js");
const User = require("../models/userModel.js");
const {cloudinary}  = require("../db/couldinary.js")
const getUsers = async(req,res)=>{
    try{
        const loggedInUser = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
        res.status(200).json(users);
    }catch(err){
        console.log(err);  
    }
}

const getMessages = async(req,res)=>{
    // console.log(req.params); 
    try{
        const myId = req.user._id;
        const userToChatId= req.params.id;
        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId },
            ],
        });
        console.log(messages);
        res.status(200).json(messages);
    }catch(err){
        console.log(err);
    }
}

// const sendMessage = async(req,res)=>{
//     try {
//         const {text,image} = req.body;
//         const {id: receiverId} = req.params;
//         const senderId = req.user._id;

//         let imgUrl="";
//         if(image){
//             const uploadResponse = await cloudinary.uploader.upload(image);
//             imgUrl = uploadResponse.secure_url;
//         }

//         const newMessgae = new Message({
//             senderId,
//             receiverId,
//             text,
//             image:imgUrl
//         });
//         await newMessgae.save();
const sendMessage = async (req, res) => {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
      let imageUrl;
      if (image) {
        // Upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
  
      await newMessage.save();
        

        //todo: realtime function to send message (ssocket.io)



        res.status(200).json({message:"Message sent"});
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {getUsers, getMessages,sendMessage};