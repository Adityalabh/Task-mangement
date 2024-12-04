import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectionDb } from "./utils/db.js";
import userRoute from "./router/userRoute.js";
import taskRouter from "./router/taskRoute.js";
import path from "path";

const app = express();
dotenv.config();

const __dirname = path.resolve();
//middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOption = {
    origin:`http://localhost:5173`,
    credentials:true,
}
app.use(cors(corsOption));
app.use('/user',userRoute);
app.use('/task',taskRouter);
app.use(express.static(path.join(__dirname,"/client/dist")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","dist","index.html"));
});

const port = process.env.PORT;
app.listen(port,()=>{
    connectionDb();
    console.log(`app listening on ${port}`);
});

app.get('/test',(req,res)=>{
    res.json('i am listening');
})
