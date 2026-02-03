const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:  String,
    email: {type:String, unique:true},
    password : String,
 },{timestamps:true})

const User = mongoose.model('User',userSchema)


const taskSchema = new Schema({
    title: {type:String, required:true},
    description: String,  
    dueDate : Date,
    status: {
        type: String,
        enum : ["pending", "in-progress", "done"],
        default: "pending"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
 },{timestamps:true})

 const Task = mongoose.model('Task', taskSchema)


 module.exports = {Task,User}