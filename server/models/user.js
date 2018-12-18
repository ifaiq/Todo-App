const mongoose = require('mongoose');
var validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: '${VALUE} is not an email'
        }

    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    tokens:[{
        access:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: true
    }
    }]
});

userSchema.methods.generateAuthToken = function(){
    var user1 = this;
    var access = 'auth';
    var token = jwt.sign({_id: user1._id.toHexString(), access},"abc123").toString();
user1.tokens = user1.tokens.concat([{access, token}])
     return user1.save().then(()=>{
        return token;
    });

}

userSchema.statics.findByToken = function(token){
var user1 = this;
var decode;
try{
    decode = jwt.verify(token, 'abc123');

} catch(e){
return Promise.reject();
}

return user1.findOne({
    '_id':decode._id,
    'tokens.token':token,
    'tokens.access': 'auth'
});
}

userSchema.methods.toJSON = function(){
var user1 = this;
var userObj = user1.toObject();
return _.pick(userObj, ['_id', 'email']);

}
userSchema.pre('save', function(next){
    var user1 = this;

    if(user1.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user1.password, salt,(err, hash)=>{
                user1.password= hash;
                next();
            });
        });
    } else{
        next();
    }
})

var user = mongoose.model('user', userSchema);


module.exports={user};