import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectionDb } from "./utils/db.js";
import userRoute from "./router/userRoute.js";
import taskRouter from "./router/taskRoute.js";

const app = express();
dotenv.config();

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


const port = process.env.PORT;
app.listen(port,()=>{
    connectionDb();
    console.log(`app listening on ${port}`);
});

app.get('/test',(req,res)=>{
    res.json('i am listening');
})
