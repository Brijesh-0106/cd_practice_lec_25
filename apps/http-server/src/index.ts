import type { NextFunction, Request, Response } from "express";
import express from "express";
import mongoose, { Schema } from "mongoose";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function connectMongo() {
    await mongoose.connect("mongodb+srv://brijesh:LnBr1Wpy9ViHHjnB@ci-cd.uf4mdvs.mongodb.net/cd_test")
    console.log("Connected to mongo");
}

const userSchema = new Schema({
    name: String,
    password: String
})

const userModel = mongoose.model('User', userSchema)

connectMongo();

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
        return;
    }
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.send("I love to go to EC2 via cd.yml from github")
})

app.get('/addUser', async (req: Request, res: Response) => {
    const newUser = await userModel.create({
        name: "" + Math.random(),
        password: "Pwd" + Math.random()
    })
    res.send({ msg: "New user is created successfully" })
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})
