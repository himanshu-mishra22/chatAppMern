const express = require('express');
const { signup, login, logout, updateProfile, checkAuth } = require('../controller/authController.js');
const protectRoute = require('../middlewares/authMiddleware.js');
const multer = require('multer');

const router = express.Router();
const uploads=multer({dest:"uploads/"});

router.post("/signup",signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile",protectRoute,uploads.single('profilePic'), updateProfile);
router.get("/check",protectRoute,checkAuth);

module.exports = router;