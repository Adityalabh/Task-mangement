import { Task } from "../models/Task.js";

export const addTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        console.log(req.id)
        const newTask = await Task.create({
            title, description, dueDate,userId:req.id
        })
        res.status(200).json({ message: 'task created successfully', newTask });
    } catch (error) {
        res.status(500).json(error);
    }

}

export const editTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate } = req.body;
        const task = await Task.findById(id);
        if (!task) {
            return res.json({ messsage: 'task not found' });
        }
        task.set({
            title, description, dueDate
        });
        task.save();
        res.status(201).json({ message: "task edited", task });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(401).json({ message: "task id not found" });
        }

        await Task.findByIdAndDelete(id);
        return res.status(200).json({ message: 'task deleted' });
        // console.log()
    } catch (error) {
        res.status(500).json(error);
    }
}

export const markTaskCompleted = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        console.log(task);
        if(!task){
            return res.status(404).json({message:"task not found"});
        }
        task.status = "completed";
        await task.save();
        return res.status(200).json({message:"mark completed",task});
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllTask = async(req,res)=>{
    try {
        const {id} = req.params; 
        const myTask = await Task.find({userId:id});
        if(!myTask){
            res.status(404).json('task not found');
        }
        res.status(200).json(myTask);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getTaskById = async(req,res)=>{
    try {
        const {id} = req.params;
        const myTask = await Task.findById(id);
        if(!myTask){
            res.status(404).json('task not found');
        }
        res.status(200).json(myTask);
    } catch (error) {
        res.status(500).json(error);
    }
}