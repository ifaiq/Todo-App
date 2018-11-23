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
  db.collection('user').findOneAndUpdate({name: 'mike'},{
    $set:
    {
      name: 'Faiq'
    },
    $inc:{
        age:1
    }
  },{
      returnOriginal: false
  }).then((result)=>{
      console.log(result);
  })


});