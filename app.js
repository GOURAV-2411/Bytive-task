const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const {mongoConnect, getDB} = require('./connection/mongo');
const {ObjectId } = require('mongodb');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());

//  POST /tasks:  Create a new task
app.post('/tasks', async (req, res) => {
  const { title, description} = req.body;
  const db = getDB();

  let taskList = db.collection('taskList');
  let task = await taskList.insertOne({
      title,
      description,
      status : "pending"
  })
  res.send({
      message: "Task Added Successfully",
      data: task
  })
})

// GET /tasks: Fetch all tasks
app.get('/tasks',async(req,res)=>{
  const db = getDB();

  let taskList = db.collection('taskList');
  let task = await taskList.find().toArray();

  res.send({
    data : task
  })
})

//GET /tasks/:id: Fetch a task by its ID
app.get('/tasks/:id', async(req,res)=>{
  const taskId = req.params.id; 
  const db = getDB();
  let taskList = db.collection('taskList');
   const task = await taskList.findOne({ _id: new ObjectId(taskId) });
  console.log(taskId);

  res.send({
    data : task
  })
})

//PUT  /tasks/:id: Update the task status 
app.put('/tasks/:id', async(req,res)=>{
  const db = getDB();
  const taskId = req.params.id; 
  const {status} = req.body;
  console.log(taskId);
  console.log(status);
  let taskList = db.collection('taskList');
  let task = await taskList.updateOne({_id : new ObjectId(taskId)},{$set:{status}})

  res.send({
    data: task
  })
})

//DELETE /tasks/:id: Delete a task by its ID
app.delete('/tasks/:id',async(req,res)=>{
  const db = getDB();
  const taskId = req.params.id; 
  console.log(taskId);
  let taskList = db.collection('taskList');
  let task = await taskList.deleteOne({_id : new ObjectId(taskId)});

  res.send({
    data : task
  })
})

mongoConnect().then(()=>{
  console.log("Database connected successfully");
  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  });
}).catch(err=>{
  console.log(err);
})
