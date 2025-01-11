// @ts-nocheck
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv").config();

const port=8081;
const app=express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("database connected"))
    .catch((error)=>console.log("database not connected: ", error));

app.use("/", require("./routes"));

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`);
})