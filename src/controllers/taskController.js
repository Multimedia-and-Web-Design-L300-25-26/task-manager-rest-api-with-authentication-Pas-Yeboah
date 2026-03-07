import Task from '../models/Task'

export const createTask = async(req,res)=>{
    try{
        const task = await Task.create({...req.body,owner:req.user.id})
        res.status(201).json(task)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

export const getTasks  = async(req,res)=>{
    try{
        const task = await Task.find({owner:req.user.id})
        res.status(200).json(task)

    }catch(error){
         res.status(500).json({error:error.message})
    }
}

export const deleteTask = async(req,res)=>{
    try{
        const taskId = req.params.id
        const task = await Task.findOne({id:taskId,owner:req.user.id})
        res.status(200).json(task)
    }catch(error){
          res.status(500).json({error:error.message})
    }
}