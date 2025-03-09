// @ts-nocheck
const { User }=require("./model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { returnUserId } = require("./helper");
const jwt_secret=process.env.JWT_SECRET;
const jwt_expires_in="1d";

const sendMessage=async(req, res)=>{
    try{
        const { name, email, message }=req.body;
        if(!email){
            return res.status(400).json({ message: "Email is required, please enter it" });
        }
        if(!message){
            return res.status(400).json({ message: "Enter some message" });
        }
        const user=await User.findOne();
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        const newMessage={
            name: name,
            email: email,
            message: message
        }
        user.messages.push(newMessage);
        await user.save();
        return res.status(200).json({ message: "Message send successfully" });
    }
    catch(err){
        return res.status(500).json({ message: "Server error" });
    }
}

const fetchMessages=async(req, res)=>{
    try{
        const userId=returnUserId(req, res);
        const user=await User.findById(userId);
        if(!user){
            return res.status(400).json({ message: "User not logged in" });
        }
        const messages=user.messages;
        if(!messages.length){
            return res.status(400).json({ message: "There is no messages" })
        }
        return res.status(200).json({ message: "Messages fetched", messages: messages });
    }
    catch(err){
        return res.status(500).json({ message: "Server error" });
    }
}

const register=async(req, res)=>{
    try{
        const user=await User.find();
        if(user.length){
            return res.status(400).json({ message: "There should be only one user" });
        }
        const { username, email, password }=req.body;
        if(!username){
            return res.status(400).json({ message: "Username is required" });
        }
        if(!email){
            return res.status(400).json({ message: "Email is required" });
        }
        if(!password){
            return res.status(400).json({ message: "Password is required" });
        }
        const hashedPassword=await bcrypt.hash(password, bcrypt.genSaltSync(12));
        const newUser=new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        await newUser.save();
        const token=jwt.sign({ userId: newUser._id, username: newUser.username }, jwt_secret, { expiresIn: jwt_expires_in });
        res.cookie("auth", token, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24*60*1000 });
        return res.status(200).json({ message: "User registration successfull" });
    }
    catch(err){
        return res.status(500).json({ message: "Server error" });
    }
}

const login=async(req, res)=>{
    try{
        const { credential, password }=req.body;
        if(!credential){
            return res.status(400).json({ message: "Username or email is required" });
        }
        if(!password){
            return res.status(400).json({ message: "Password is required" });
        }
        const user=await User.findOne({ $or: [{ username: credential }, { email: credential }]});
        if(!user){
            return res.status(400).json({ message: "No user found" });
        }
        const passwordMatch=await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token=jwt.sign({ userId: user._id, username: user.username }, jwt_secret, { expiresIn: jwt_expires_in });
        res.cookie("auth", token, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24*60*10000 });
        return res.status(200).json({ message: "User login successful" });
    }
    catch(err){
        return res.status(500).json({ message: "Server error" });
    }
}

const fetchUser=async(req, res)=>{
    try{
        const userId=returnUserId(req, res);
        if(!userId){
            return res.status(400).json({ message: "No userId or token found" });
        }
        const user=await User.findById(userId);
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ user: true });
    
    }
    catch(err){
        return res.status(500).json({ message: "Server error" });
    }
}

module.exports={
    sendMessage,
    fetchMessages,
    register, 
    login,
    fetchUser
};