const mongoose = require('mongoose');

//pascal case

const IdeaSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    date : {
        type:Date,
        default:Date.now
    }
    
});

mongoose.model('ideas',IdeaSchema);