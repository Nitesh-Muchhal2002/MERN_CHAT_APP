import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path'
import authroutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectMongoDb from "./db/connectMongoDb.js";
import {app,server} from './socket/socket.js'

// const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();
//to parse the incoming requests with JSON payloads (from req.body)
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authroutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"/Frontend/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"Frontend","dist","index.html"));
})

app.get("/", (req, res) => {
  res.send("Hello");
});

server.listen(PORT, () => {
  connectMongoDb();
  console.log(`sever is running on port:${PORT}`);
});
