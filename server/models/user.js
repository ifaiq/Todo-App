const mongoose = require('mongoose');

var user = mongoose.model('user',
{
    Email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    completed:{
        type: Boolean,
        default: false
    },

    completeAt:{
        type: Number,
        default: null
    }
}
);


module.exports={user};