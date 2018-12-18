var {user} = require('./../models/user')

var auth = (req, res, next)=>{
var token = req.header('x-auth');

user.findByToken({token}).then((user1)=>{
    if(!user1){
        return Promise.reject();
    }

    req.user1 = user;
    req.token = token;
    next();
}).catch((e)=>{
    res.status(401).send(e);
});

}

module.exports = {auth};