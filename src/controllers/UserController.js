import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

 export const signUp = async(req,res)=>{
   try{
        const {email,password,name} = req.body
        let emailExists = await User.findOne({email})
        if(emailExists){
            res.status(200).json({error:"User already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            email,
            password:hashedPassword,
            name
        })
        await newUser.save()

        const token =  jwt.sign({email:newUser.email,name:newUser.name},process.env.JWT_SECRET,{expiresIn:"7days"})
        res.status(201).json({message:`User ${newUser.name} has been created successfully`,token})
            

        }catch(e){
            res.status(500).json({e:"Internal Server Error"})

        }
  
}

 export const login = async (req,res)=>{
        try{
            const {email, password} = req.body
            let emailExist = User.findOne({email})
            if(!emailExist ) return
            res.status(401).json({error:"Invalid Credentials"})
           let validPassword = await bcrypt.compare(password, emailExist.password)
            if(!validPassword) return res.status(401).json({error:"Unauthorised"})
            const token = jwt.sign( { id: emailExist._id, email: emailExist.email },process.env.JWT_SECRET,{expiresIn:"7days"})
            res.json({token})

        }
        catch(e){
            res.status(400).json({error:e.message})

        }
    
   }