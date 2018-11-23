const express = require('express');
const bodyparser = require('body-parser');

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/todo'
mongoose.Promise = global.Promise;
mongoose.connect(url);

const {user} = require('./models/user');
const {todo} = require('./models/todo');

var app = express();
app.use(bodyparser.json());


app.post('/todos',(req,res)=>{

    var todo1 = new todo({
        text: req.body.text
    });
    
    todo1.save().then((result)=>{
        res.send(result);
    },
    (err)=>{
        res.send(err)
    });



});

app.listen(3000,()=>{
    console.log('3000');
});