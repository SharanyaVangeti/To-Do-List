const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/todo')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
 main
mongoose.connect('mongodb://localhost:27017/test',{ useNewUrlParser: true, useUnifiedTopology:true})
.then(()=> console.log('MongoDB connected'))
.catch(err => console.log(err))

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
})

app.put('/update/:id',(req,res)=>{
    const{id}=req.params;
    TodoModel.findByIdAndUpdate(id,{done:true},{new:true})
    .then(result=> res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
})
app.delete('/delete/:id', (req,res)=>{
    const{id} = req.params;
    TodoModel.findByIdAndDelete(id)
    .then(result=> res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
})
app.post('/add',(req,res)=>{
    const {task} = req.body;
    TodoModel.create({
        task:task
    }).then((result) => res.json(result))
    .catch(err => res.status(500).json({ error: err.message }));
})
const PORT = process.env.PORT ||3001
app.listen(PORT,()=>console.log(`Listening on: ${PORT}`))