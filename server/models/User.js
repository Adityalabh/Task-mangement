import mongoose from "mongoose";
const {Schema} = mongoose;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

export const User = mongoose.model("User",userSchema);

