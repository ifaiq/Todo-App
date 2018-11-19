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

    db.collection('todos').insertOne({
        Text: "some text here",
        completed: false
    
    },(err, result)=>{
        if(err){
            console.log('cannot insert errr has occured');
        }
    else{
        console.log('Okay'+JSON.stringify(result.ops,undefined,2));
    }
});
console.log("\n")
db.collection('user').insertOne({
    Name: "Faiq Shariff",
    age: 23,
    location: "Karachi,Pakistan"

},(err, result)=>{
    if(err){
        console.log('cannot insert errr has occured');
    }
else{
    console.log('Okay'+JSON.stringify(result.ops,undefined,2));
}
});



client.close();

});