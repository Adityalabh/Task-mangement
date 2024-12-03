import { User } from '../models/User.js';
import dotenv from "dotenv";
import bcryptjs from "bcryptjs"
import jwt  from 'jsonwebtoken';

dotenv.config();
const bcryptSalt = bcryptjs.genSaltSync(10);
const jwtSecret  = process.env.jwtSecret;

export const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const registeredUser = await User.findOne({ email });
        if (registeredUser) {
            return res.status(400).json('user already registered');
        }
        const newUser = await User.create({
            userName: name, email, password: bcryptjs.hashSync(password, bcryptSalt)
        })
        res.status(200).json({ message: 'user registered successfully', newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const registeredUser = await User.findOne({email});
        if(!registeredUser){
            res.status(404).json('user not found');
        }

        const passOk = bcryptjs.compareSync(password,registeredUser.password);
        if(!passOk){
            res.status(401).json({message:'Incorrect password'});
        }
        jwt.sign({id:registeredUser._id,email:registeredUser.email},jwtSecret,{},(err,token)=>{
            if(err) throw err;
            return res.cookie('token',token,{httpOnly:true}).json(registeredUser);
        })

        // return res.status(200).json({message:"user looged successfully"});
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const userLogout = async(req,res)=>{
    try {
        res.clearCookie("token","").json("user logged out");
    } catch (error) {
        res.status(500).json(error);
    }
}