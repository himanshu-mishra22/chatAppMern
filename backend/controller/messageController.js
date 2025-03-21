const Message = require("../models/messageModel.js");
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
    try{
        const myId = req.user._id;
        const {id: userToChatId} = req.params.id;
        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: userToChatId },
                { sender: userToChatId, receiver: myId },
            ],
        });
        res.status(200).json(messages);
    }catch(err){
        console.log(err);
    }
}

const sendMessage = async(req,res)=>{
    try {
        const {text,image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let img;
        if(img){
            const uploadResponse = await cloudinary_js_config.uploader.upload(image);
            img = uploadResponse.secure_url;
        }

        const newMessgae = new Message({
            senderId,
            receiverId,
            text,
            image:img
        });
        await newMessgae.save();
        

        //todo: realtime function to send message (ssocket.io)



        res.status(200).json({message:"Message sent"});
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {getUsers, getMessages,sendMessage};