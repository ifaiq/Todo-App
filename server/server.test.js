const expect = require('expect');
const request = require('supertest');

var {app} = require('./server');
var {todo} = require('./models/todo');


beforeEach((done)=>{
todo.deleteMany({}).then(()=> done());
});

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

            todo.find().then((res)=>{
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
                expect(res.length).toBe(0)
                done();
            }).catch((e)=> done(e));
        });

    });

});