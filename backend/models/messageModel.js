const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        recieveId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
        text:{
            type:String,
        },
        image:{
            type:String,
        },
    },
    {timestamps:true}
);


const messageModel = mongoose.model('Message',messageSchema);

module.exports = messageModel;

