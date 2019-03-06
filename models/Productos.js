const mongoose = require ('mongoose');


// pascal case

const ProductosSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    categoria:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    cantidad:{
        type:Number,
        required:true
    },
    codigoref:{
        type:Number,
        required:true
    },
    // encriptacion
    puntos:{
        type:Number,
        required:true
    },
    factura:{
        type:String,
        required:true
    }, 

    date : {
        type:Date,
        default:Date.now
    }
    
});

// luneta is my model
mongoose.model('Productos',ProductosSchema);

