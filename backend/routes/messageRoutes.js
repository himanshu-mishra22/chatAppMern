const express = require('express');
const protectRoute = require('../middlewares/authMiddleware');
const {getUsers, getMessages, sendMessage} = require('../controller/messageController');
const multer = require('multer');
const router = express.Router();

const uploads=multer({dest:"uploads/images"});

router.get("/user",protectRoute, getUsers);
router.get("/:id",protectRoute, getMessages);
router.post("/send/:id",protectRoute,uploads.single("image"),sendMessage);


module.exports=router;