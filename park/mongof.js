const Mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/todo'
Mongo.connect(url, { useNewUrlParser: true },(err, client)=>{

    if(err){
        console.log('Error has occured');

    }

    else{
        console.log("Successfully connected");
    }
    const db = client.db('todo');
    db.collection('todos').find({completed: true}).toArray((err, result)=>{
        if(err){
            console.log(JSON.stringify(err, undefined, 2));
        }
        else{
            console.log(JSON.stringify(result, undefined, 2));
        }
    });

    db.collection('user').find({name:'mike'}).count((err, result)=>{
        if(err){
            console.log(JSON.stringify(err, undefined, 2));
        }
        else{
            console.log(JSON.stringify(result, undefined, 2));
        }
    });

});