const express = require('express');
const protectRoute = require('../middlewares/authMiddleware');
const {getUsers, getMessages, sendMessage} = require('../controller/messageController');
const router = express.Router();

router.get("/user",protectRoute, getUsers);
router.get("/:id",protectRoute, getMessages);
router.post("/send/:id",protectRoute,sendMessage);


module.exports=router;