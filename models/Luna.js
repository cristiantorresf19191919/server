const mongoose = require ('mongoose');


// pascal case

const LunaSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    come_juciosa:{
        type:String,
        required:true
    }
});

// luneta is my model
mongoose.model('luneta',LunaSchema);

