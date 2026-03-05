import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

 export const userSignUp = async(req,res)=>{
   try{
        const {email,password,name} = req.body
        let emailExists = User.findOne(email)
        if(emailExists){
            res.status(200).json({error:"User already exists"})
        }
        
           const hashedPassword = bcrypt.hash(password,10)
           const newUser = await new User({
            email,
            password:hashedPassword,
            name
           })
           await newUser.save()

           const token =  jwt.sign({email:newUser.email,name:newUser.name},process.env.JWT_SECRET,{expiresIn:"7days"})
           res.status(201).json({message:`User ${newUser.name} has been created successfully`})
            

   }catch(e){
    res.status(500).json({e:"Internal Server Error"})

   }
}