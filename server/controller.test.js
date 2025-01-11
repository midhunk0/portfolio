// @ts-nocheck
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { fetchMessages, login, register, sendMessage } from "./controller";

const app = express();
app.use(express.json());
app.post("/sendMessage", sendMessage);
app.get("/fetchMessages", fetchMessages);
app.post("/register", register);
app.post("/login", login);

let mongoServer;

beforeAll(async()=>{
    mongoServer=await MongoMemoryServer.create();
    const uri=mongoServer.getUri();

    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async()=>{
    await mongoose.disconnect();
    await mongoServer.stop();
});

beforeEach(async()=>{
    const collections=await mongoose.connection.db.collections();
    for(const collection of collections){
        await collection.deleteMany();
    }
});

describe("send message", ()=>{
    it("should send a message successfully", async()=>{
        const response=await request(app)
            .post("/sendMessage")
            .send({ name: "john", email: "john@gmail.com", message: "hello" });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Message send successfully");
    });

    it("should return an error if email is missing", async ()=>{
        const response=await request(app)
            .post("/sendMessage")
            .send({ name: "john", email: "", message: "hello" });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email is required, please enter it");
    });

    it("should return an error if message is missing", async()=>{
        const response=await request(app)
        .post("/sendMessage")
        .send({ name: "john", email: "john@gmail.com", message: "" });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Enter some message");
    });
});

describe("fetch messages", ()=>{
    it("should return the messages", async()=>{
        await mongoose.connection.db.collection("messages").insertOne({
            name: "john",
            email: "john@gmail.com",
            message: "hello",
        });

        const response=await request(app).get("/fetchMessages");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Messages fetched");
        expect(response.body.messages).toHaveLength(1); // Ensure messages were fetched
    });

    it("should return no messages if there are no messages", async()=>{
        const response=await request(app).get("/fetchMessages");

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("There is no messages");
    });
});

describe("user registration", ()=>{
    it("should return there is only one user is allowed", async()=>{
        await mongoose.connection.db.collection("users").insertOne({
            username: "temp",
            email: "temp@gmail.com",
            password: "temp"
        });

        const respose=await request(app).post("/register").send({ 
            username: "john0", 
            email: "john@gmail.com", 
            password: "john" 
        });

        expect(respose.status).toBe(400);
        expect(respose.body.message).toBe("There should be only one user");
    });

    it("should return username is required", async()=>{
        const response=await request(app).post("/register").send({
            username: "",
            email: "john@gmail.com",
            password: "john"
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Username is required");
    });

    it("should return email is required", async()=>{
        const response=await request(app).post("/register").send({
            username: "john0",
            email: "",
            password: "john"
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email is required");
    });

    it("should return password is required", async()=>{
        const response=await request(app).post("/register").send({
            username: "john0",
            email: "john@gmail.com",
            password: ""
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Password is required");
    });

    it("should return registration successful", async()=>{
        const respose=await request(app).post("/register").send({ 
            username: "john0", 
            email: "john@gmail.com", 
            password: "john" 
        });

        expect(respose.status).toBe(200);
        expect(respose.body.message).toBe("User registration successfull");
    });
});

describe("user login", ()=>{
    it("should return username or email is required", async()=>{
        const response=await request(app).post("/login").send({
            credential: "",
            password: "john"
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Username or email is required");
    });

    it("should return password is required", async()=>{
        const response=await request(app).post("/login").send({
            credential: "john0",
            password: ""
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Password is required");
    });

    it("should return no user found, if there is no user", async()=>{
        const response=await request(app).post("/login").send({
            credential: "john0",
            password: "john"
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("No user found");
    });

    it("should return passwords not matching", async()=>{
        await mongoose.connection.db.collection("users").insertOne({
            username: "john0",
            email: "john@gmail.com",
            password: "john"
        });

        const response=await request(app).post("/login").send({
            credential: "john0",
            password: "john1"
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Passwords do not matches");
    });

    it("should return login successfull", async()=>{
        await mongoose.connection.db.collection("users").insertOne({
            username: "john0",
            email: "john@gmail.com",
            password: "john"
        });

        const response=await request(app).post("/login").send({
            credential: "john0",
            password: "john"
        });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User login successful");
    });
})