const  {Server} = require('socket.io');
const http = require('http');
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server,
    {
        cors:{
            origin: ["http://localhost:5173"],
        },
    }
);

function getRecieverSocketId(userId){
    return socketUserMap[userId];
}

 //to store online users
const socketUserMap = {}; //== > {userId: socketId}


io.on("connection", (socket)=>{
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        socketUserMap[userId] = socket.id;
    }
    //to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(socketUserMap));


    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        delete socketUserMap[userId];
        io.emit("getOnlineUsers", Object.keys(socketUserMap));
    });
})

module.exports = {io,app,server,getRecieverSocketId};

