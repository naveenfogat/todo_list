const mongoose = require('mongoose')
const { Schema } = mongoose;

const todoSchema = new Schema({
    task:{
        type:String,
        required:true
    },
    priority:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        default:"End of the Day"
    }
});

const Todo = mongoose.model('Todo',todoSchema)
module.exports=Todo