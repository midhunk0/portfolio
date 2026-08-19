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
    messages: {
        type: [messageSchema]
    }
});

const projectSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    projectLink: {
        type: String,
        required: true,
    },
    githubLink: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        default: 0,
    }
}, { timestamps: true, });

const User=mongoose.model("User", userSchema);
const Project=mongoose.model("Project", projectSchema);

module.exports={ User, Project };