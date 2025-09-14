import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, userModel } from "./db.js";
import { JWT_SECRET } from "./config.js";
import { userMiddleware } from "./middleware.js";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await userModel.create({
            username: username,
            password: password
        })
        
        res.json({
            message: "User signed up"
        })
    } catch(e) {
        res.status(411).json({
            message: "USer already exists"
        })
    }
});

app.post("/api/v1/signin", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const existinguser = await userModel.findOne({
        username,
        password
    })

    if(existinguser) {
        const token  = jwt.sign({
            id: existinguser._id
        }, JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "incorrect credentials"
        })
    }
});

app.post("/api/v1/content", userMiddleware, async (req,res) => {
    const link = req.body.link;
    const type = req.body.type;

    await ContentModel.create({
        link,
        type,
        // @ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "Content added"
    })
})

app.get("/api/v1/content",userMiddleware, async (req,res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId")
    res.json({
        content
    })
})

app.delete("api/v1/content", async (req,res) => {
    const contentId = req.body.contetnId; 

    await ContentModel.deleteMany({
        contentId,
        // @ts-ignore
        userId: req.userId
    })
    res.json({
        message: "deleted"
    })
})

app.post("/api/v1/brain/share", (req,res) => {
    
})

app.get("/api/v1/brain/:shareLink", (req,res) => {
    
});

app.listen(3000)