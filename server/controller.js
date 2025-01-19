// @ts-nocheck

const { User, Messages }=require("./model");

const sendMessage=async(req, res)=>{
    try{
        const { name, email, message }=req.body;
        if(!email){
            return res.status(400).json({ message: "Email is required, please enter it" });
        }
        if(!message){
            return res.status(400).json({ message: "Enter some message" });
        }
        const newMessage=new Messages({
            name: name,
            email: email,
            message: message
        })
        await newMessage.save();
        return res.status(200).json({ message: "Message send successfully" });
    }
    catch(err){
        return res.status(500).json({ message: "Server error" });
    }
}

const fetchMessages=async(req, res)=>{
    try{
        const messages=await Messages.find();
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
        const newUser=new User({
            username: username,
            email: email,
            password: password
        });
        await newUser.save();
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
        if(user.password!=password){
            return res.status(400).json({ message: "Passwords do not matches" });
        }
        return res.status(200).json({ message: "User login successful" });
    }
    catch(err){
        return res.status(500).json({ message: "Server error" });
    }
}

// const addProject=async(req, res)=>{
//     try{
//         const { title, image,  }
//     }
//     catch(err){
//         return res.status(500).json({ message: "Server error" });
//     }
// }

module.exports={
    sendMessage,
    fetchMessages,
    register, 
    login
};