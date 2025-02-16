// @ts-nocheck
const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

const projectSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projectLink: {
        type: String
    },
    githubLink: {
        type: String
    },
    image: {
        imageName: String,
        imageType: String,
        image: Buffer
    }
});

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    projects: {
        type: [projectSchema]
    },
    messages: {
        type: [messageSchema]
    }
});

const User=mongoose.model("User", userSchema);

module.exports={ User };