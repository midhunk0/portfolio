// @ts-nocheck
const express=require("express");
const { sendMessage, fetchMessages, register, login, fetchUser }=require("./controller");
const router=express.Router();

router.post("/sendMessage", sendMessage);
router.get("/fetchMessages", fetchMessages);
router.post("/register", register);
router.post("/login", login);
router.get("/fetchUser", fetchUser);

module.exports=router;