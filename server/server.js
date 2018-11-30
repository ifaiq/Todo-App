const express = require('express');
const bodyparser = require('body-parser');
const{ObjectID}= require('mongodb');
const mongoose = require('mongoose');
const url = process.env.MONGOLAB_URI ||'mongodb://localhost:27017/todo'
mongoose.Promise = global.Promise;
mongoose.connect(url);

const {user} = require('./models/user');
const {todo} = require('./models/todo');


var app = express();
var port = process.env.PORT || 3000;

app.use(bodyparser.json());


app.post('/todos',(req,res)=>{

    var todo1 = new todo({
        text: req.body.text
    });
    
    todo1.save().then((result)=>{
        res.send(result);
    },
    (err)=>{
        res.status(400).send(err)
    });
});

app.get('/todos',(req,res)=>{
    
    todo.find().then((todos)=>{
        res.send({todos});
    },
    (err)=>{
        res.status(400).send(err)
    });
});

app.get('/todos/:id',(req,res)=>{
var id = req.params.id;
 if(!ObjectID.isValid(id)){
     return res.status(404).send();
 } 
 todo.findById(id).then((t)=>{
     if(t){
       return res.send({t});

     }
     res.status(404).send();

     
 }).catch((e)=>{
     res.status(400).send();

 })

})


app.listen(port,()=>{
    console.log(port);
    console.log();
    console.log(url);
});


module.exports = {app};