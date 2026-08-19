// @ts-nocheck
const express=require("express");
const { sendMessage, fetchMessages, register, login, fetchUser, addProject, fetchProjects, reorderProjects }=require("./controller");
const router=express.Router();
const upload=require("./upload");

router.post("/sendMessage", sendMessage);
router.get("/fetchMessages", fetchMessages);
router.post("/register", register);
router.post("/login", login);
router.get("/fetchUser", fetchUser);
router.post("/addProject", upload.single("image"), addProject);
router.get("/fetchProjects", fetchProjects);
router.patch("/reorderProjects", reorderProjects);

module.exports=router;