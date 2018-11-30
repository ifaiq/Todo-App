const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
var {app} = require('./server');
var {todo} = require('./models/todo');

const todos = [
    {
    _id: new ObjectID(),
    text:"first"},
{
    _id: new ObjectID(), 
    text:"2"},
{
    _id: new ObjectID(),
     text:"3"}
];

beforeEach((done)=>{
todo.deleteMany({}).then(()=>{
return todo.insertMany(todos);
}).then(()=> done());});

describe('POST',()=>{
    it('Should create a todo test',(done)=>{
        var text = 'text for todo';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text)
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            todo.find({text}).then((res)=>{
                expect(res.length).toBe(1)
                expect(res[0].text).toBe(text)
                done();
            }).catch((e)=> done(e));
        });

    });


    it('Should not create a todo test',(done)=>{

        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            todo.find().then((res)=>{
                expect(res.length).toBe(3)
                done();
            }).catch((e)=> done(e));
        });

    });

});

describe('GET', ()=>{
    it('GET TODO',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
        expect(res.body.todos.length).toBe(3);
        })
        .end(done);
    });
    });

    describe('get',()=>{
        it('should return todo doc',(done)=>{
            request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res)=>{
                expect(res.body.t.text).toBe(todos[0].text)
            })

            .end(done);
        });
    it('Return todo error',(done)=>{

var hexid = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexid}`)
        .expect(404)
        .end(done);
        
    })
    
    it('Return 404 error',(done)=>{

                request(app)
                .get(`/todos/123`)
                .expect(404)
                .end(done);
                
            })
            
    
    });