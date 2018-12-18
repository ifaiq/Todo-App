const express = require('express');
const bodyparser = require('body-parser');
const{ObjectID}= require('mongodb');
const mongoose = require('mongoose');
const url ='mongodb://localhost:27017/todo'
const _ = require('lodash');
const {auth} = require('./middle.js/auth')

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



app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
     if(!ObjectID.isValid(id)){
         return res.status(404).send();
     } 
     todo.findByIdAndDelete(id).then((t)=>{
         if(t){
           return res.send({t});
    
         }
         res.status(404).send();
    
         
     }).catch((e)=>{
         res.status(400).send();
    
     })
    
    })


    app.patch('/todos/:id',(req,res)=>{
        var id = req.params.id;
var body= _.pick(req.body,['text', 'completed']);

if(!ObjectID.isValid(id)){
    return res.status(404).send();
} 

if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
}else{
    body.completed = false;
    body.completedAt = null;
}

todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((t)=>{

    if(t){
        return res.send({t});
 
      }
      res.status(404).send();
 
      
  }).catch((e)=>{
      res.status(400).send(e);

})
    });

// POST /users
app.post('/user',(req,res)=>{
var body = _.pick(req.body,['email', 'password']);
        var user1 = new user(body);
        
        user1.save().then(()=>{
            return user1.generateAuthToken();
        }).then((token)=>{
         res.header('x-auth', token).send(user1);

        }).catch((e)=>{
            res.status(400).send(e)
        })
    });

    app.get('/user/me', auth, (req,res)=>{
        res.send(req.user1);
        });

        
app.listen(port,()=>{
    console.log(port);
    console.log();
    console.log(url);
});


module.exports = {app};