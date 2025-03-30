import jwt from 'jsonwebtoken' 
import bcrypt from 'bcryptjs'
import UserModel from '../models/UserModel.js'
import BlacklistTokenModel from '../models/BlacklistTokenModel.js';

export const Register=async(req,res,next)=>{
 const {fullname,email,password,confirmpassword,role,age,skills}=req.body;
    // const cleanPwd=password;
    // const password=bcrpyt.
    try{

        if(!fullname || !email || !password || !confirmpassword  || !age){
            throw new Error("All fields are required");
        }

        if(password!==confirmpassword){
            throw new Error("password and confirmpassword do not match");
        }
        let use=await UserModel.findOne({email});
        if(use){
            return res.status(400).json({msg:"user alsready exists"});
            // next();
        }

        const salt=await bcrypt.genSalt(10);
        const pwd=await bcrypt.hash(password,salt);
        // console.log("gey")
        const user=await UserModel.create({
            fullname:fullname,
            email:email,
            password:pwd,
            confirmpassword,
            age,
            role:role,
            skills
        })
        
        const token=jwt.sign({
            name:fullname,
            email:email,
            password: password,
        },process.env.JWT_SECRET,{
            expiresIn:"15h"
        })
        res.cookie("jwt",token,{
            httpOnly:true,
            expiresIn:"15h"
        })
        res.status(201).json({msg:"User created successfully",user:user,token:token});
        next();   
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error:err.message
        })
      }
}

export const Login=async(req,res,next)=>{
    const {email,password}=req.body;
        try{
            if(!email || !password){
                throw new Error("All fields are required");
            }
            const user=await UserModel.findOne({email});
            const isMatch=await bcrypt.compare(password,user.password);
            // console.log(user.password,password);
            if (!user) {
                return res.status(400).json({ msg: "Email does not exist" });
              }
            if(!isMatch){
                console.log("here")
                return res.status(400).json({msg:"invalid credentials"});
            }
                const token=jwt.sign({
                    id:user._id,
                    name:user.fullName,
                    email:user.email,
                    password:user.password
                },process.env.JWT_SECRET,{
                    expiresIn:"15h"
                })
    
                // console.log(token);
            res.cookie("jwt",token,{
                httpOnly:true,
                expiresIn:"15h"
            })
            res.status(201).json({msg:"User logged in successfully",user:user,token:token});
        }catch(e){
            return res.status(400).json({error:e.message});
        }
}

export const Logout=async(req,res,next)=>{
    try {
        const token = req.cookies?.jwt || req.headers?.authorization?.split(" ")[1];
        if (!token) {
          return res.status(400).json({ msg: "No token provided" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const expiresAt = new Date(decoded.exp * 1000);
    
        await BlacklistTokenModel.create({ token, expiresAt });
    
        res.clearCookie("jwt",{
            httpOnly:true,
            expiresIn:"15h"
        })
        res.status(200).json({msg:"User logged out successfully"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error:error.message
        })
    }
}