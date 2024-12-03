import mongoose from 'mongoose';
const {Schema} = mongoose;

const taskSchema = new Schema({
    title:{
        type:String,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
    },
    status:{
        type:String,
        enum:['pending','completed','overdue'],
        default:'pending'
    },
    dueDate:{
        type:Date,
        // required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

export const Task = mongoose.model('Task',taskSchema);
