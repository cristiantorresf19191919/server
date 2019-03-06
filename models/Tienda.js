const mongoose = require('mongoose');

//pascal case

const TiendaSchema = new mongoose.Schema({

    productos:{
        type:String,
        required:true
    },

    categoria:{
        type: String,
        required:true
    },
    //hacer la referencia a collection productos warning
    productos:{
        type: String,
        required:true
    },
    usuario:{
        type: String,
        required:true
    }, 
    // propiedad de tipo array que guarda calificaion y comentarios
    tienda:{
        type: String,
        required:true
    }

    date : {
        type:Date,
        default:Date.now
    }
    
});


// Aca creo el nombre de mi collection
mongoose.model('tienda',TiendaSchema);