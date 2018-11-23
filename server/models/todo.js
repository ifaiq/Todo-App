const mongoose = require('mongoose');


var todo = mongoose.model('todo',
{
    text:{
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


module.exports={todo};