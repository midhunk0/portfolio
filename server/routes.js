// @ts-nocheck
const express=require("express");
const { sendMessage, fetchMessages, register, login, addProject, fetchImage, fetchProjects, fetchUser }=require("./controller");
const upload= require("./config");
const router=express.Router();

router.post("/sendMessage", sendMessage);
router.get("/fetchMessages", fetchMessages);
router.post("/register", register);
router.post("/login", login);
router.get("/fetchUser", fetchUser);
router.post("/addProject", upload.single("image"), addProject);
router.get("/fetchImage/:projectId", fetchImage);
router.get("/fetchProjects", fetchProjects);

module.exports=router;