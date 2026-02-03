//Imports

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Task,User}  = require('./schema.js')

//Server and database setup

mongoose.connect('mongodb://127.0.0.1:27017/TaskManager-DB')
    .then(
        app.listen(5000, ()=>{
        console.log('Server listening on port 5000...')
    }))
    .catch((err)=> console.error(err))

app.use(express.json())



//Authourization functions

app.post('/api/signup', async (req,res)=>{
    const {name,email,password}= req.body

    if (!name || !email || !password ) return res.status(400).json({msg:'Missing fields'})

    const exist = await User.findOne({email});
    if (exist) return res.status(409).json({msg: "User already exist"})

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
        name,email, password: hashedPassword
    })

    res.status(201).json({msg: "User created"})
})

app.post('/api/login', async (req,res)=>{
    const {email,password} = req.body

    const user = await User.findOne({email});
    if (!user) return res.status(401).json({msg:"Invalid username"})
    
    const isMatch = await bcrypt.compare(password,user.password)
    if (!isMatch) return res.status(401).json({msg:"Invalid password"})

    const token = jwt.sign(
        {userId : user._id},
        "SECRET_KEY",
        {expiresIn: "1h"}
    )

    res.json({name: `${user.name}`, msg: `Logged in successfully`, token})
})


const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token)

  if (!token)
    return res.status(401).json({ msg: "No user logged in" });

  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Token expired or wrong token" });
  }
};





//Task manager funtions

app.get('/api/task',auth, async (req,res)=>{
    const tasks = await Task.find({userId: req.user.userId},"_id title description dueDate status")
    if (tasks.length>0) res.json(tasks)
    else res.status(200).json({msg: "You have no tasks yet"})
})

app.post('/api/task', auth , async (req,res)=>{
    const {title, description, dueDate} = req.body

    if (!title) return res.status(400).json({msg: "Title is must to add a task"})

    const task = await Task.create({title,description, dueDate, userId: req.user.userId})

    res.status(201).json({msg:"Task addded successfully", added_task: task})
})

app.delete('/api/task/:id', auth , async (req,res)=>{
    const task = await Task.findOneAndDelete({
        _id : req.params.id,
        userId : req.user.userId
    })

    if (!task) res.status(404).json({msg: "Task not found"})

    else res.status(200).json({msg:"Task deleted successfully", deleted_task : task})
})

app.put('/api/task/:id', auth , async (req,res)=>{
    const {description, dueDate, status} = req.body

    const updates= {};
    if (description) updates.description = description
    if (dueDate) updates.dueDate =dueDate
    if (status) updates.status =status
  
    const task = await Task.findOneAndUpdate({
        _id : req.params.id,
        userId : req.user.userId
    }, updates , {new: true})

    if (!task) res.status(404).json({msg: "Task not found"})

    else res.status(200).json({msg: "Task updated successfully", updated_task: task })
})
