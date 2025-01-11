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
    }
});

const User=mongoose.model("User", userSchema);
const Messages=mongoose.model("Messages", messageSchema);

module.exports={ User, Messages };