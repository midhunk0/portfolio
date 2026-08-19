// @ts-nocheck
const { User, Project }=require("./model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const { returnUserId } = require("./helper");
const jwt_secret=process.env.JWT_SECRET;
const jwt_expires_in="1d";
const cloudinary=require("./cloudinary");
const streamifier=require("streamifier");

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
        res.cookie("auth", token, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24*60*60*1000 });
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
        res.cookie("auth", token, { httpOnly: true, secure: true, sameSite: "None", maxAge: 24*60*60*10000 });
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

// const addProject=async(req, res)=>{
//     try{
//         const userId=returnUserId(req, res);
//         if(!userId){
//             return res.status(400).json({ message: "Unauthorized" });
//         }

//         const { title, description, projectLink, githubLink }=req.body;
//         if(!title){
//             return res.status(400).json({ message: "Title is required" });
//         }
//         if(!description){
//             return res.status(400).json({ message: "Description is required" });
//         }
//         if(!projectLink){
//             return res.status(400).json({ message: "Project link is required" });
//         }
//         if(!githubLink){
//             return res.status(400).json({ message: "GitHub link is required" });
//         }
//         if(!req.file){
//             return res.status(400).json({ message: "Image is required" });
//         }

//         const uploadImage=await new Promise((resolve, reject)=>{
//             const stream=cloudinary.uploader.upload_stream({ folder: "midhunk0/projects" }, (error, result)=>{
//                 if(error){
//                     reject(error);
//                 }
//                 else{
//                     resolve(result);
//                 }
//             })
//             streamifier.createReadStream(req.file.buffer).pipe(stream);
//         })

//         const lastProject=await Project.findOne().sort({ order: -1 });
//         const nextOrder=Number.isFinite(lastProject?.order) ? lastProject.order + 1 : 0;

//         const newProject=await Project.create({
//             title, 
//             description,
//             githubLink,
//             projectLink,
//             image: uploadImage.secure_url,
//             order: nextOrder,
//         })

//         await newProject.save();
//         return res.status(200).json({ message: "Project added successfully" });
//     }
//     catch(err){
//         return res.status(500).json({ message: "Server error" });
//     }
// };

const addProject = async (req, res) => {
    try {
        console.log("1. Request received");

        const userId = returnUserId(req, res);
        console.log("2. User:", userId);

        console.log("3. Body:", req.body);
        console.log("4. File:", req.file);

        const uploadImage = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "midhunk0/projects" },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );

            streamifier
                .createReadStream(req.file.buffer)
                .pipe(stream);
        });

        console.log("5. Image uploaded:", uploadImage.secure_url);

        const lastProject = await Project.findOne()
            .sort({ order: -1 });

        console.log("6. Last project:", lastProject);

        const nextOrder = Number.isFinite(lastProject?.order)
            ? lastProject.order + 1
            : 0;

        console.log("7. Next order:", nextOrder);

        await Project.create({
            title: req.body.title,
            description: req.body.description,
            githubLink: req.body.githubLink,
            projectLink: req.body.projectLink,
            image: uploadImage.secure_url,
            order: nextOrder,
        });

        console.log("8. Project created");

        return res.status(200).json({
            message: "Project added successfully"
        });

    } catch (err) {
        console.error("❌ ADD PROJECT ERROR:", err);

        return res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
};

const getProjectsInDisplayOrder=async()=>{
    const projects=await Project.find().sort({ order: 1, createdAt: 1, _id: 1 });

    const needsOrderRepair=projects.some(
        (project, index) => project.order !== index
    );

    if(!needsOrderRepair){
        return projects;
    }

    await Project.bulkWrite(
        projects.map((project, index)=>({
            updateOne: {
                filter: {
                    _id: project._id,
                },
                update: {
                    $set: {
                        order: index,
                    },
                },
            },
        }))
    );

    return projects.map((project, index)=>{
        project.order=index;
        return project;
    });
}

const fetchProjects=async(req, res)=>{
    try{
        const projects=await getProjectsInDisplayOrder();
        if(!projects.length){
            return res.status(400).json({ message: "No projects found" });
        }
        return res.status(200).json({ message: "Projects fetched successfully", projects: projects });
    }
    catch(err){
        return res.status(500).json({ message: "Server error" });
    }
}

const reorderProjects=async(req, res)=>{
    try{
        const { projects }=req.body;

        if(!Array.isArray(projects)){
            return res.status(400).json({ message: "Projects must be an array" });
        }

        const updates=projects.map((project)=>({
            updateOne: {
                filter: {
                    _id: project.id,
                },
                update: {
                    $set: {
                        order: project.order
                    }
                }
            }
        }));
        await Project.bulkWrite(updates);

        return res.status(200).json({ message: "Project order updated" });
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
    fetchUser,
    addProject,
    fetchProjects,
    reorderProjects,
};
