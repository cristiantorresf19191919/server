const mongoose = require ('mongoose');


// pascal case

const UsuariosSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true
    },
    correo:{
        type:String,
        required:true
    },
    contraseña:{
        type:String,
        required:true
    },

    telefono:{
        type:String,
        required:false
    },
     celular:{
        type:String,
        required:false
    },
    cedula:{
        type:String,
        required:false
    },
    rol:{
        type:String,
        required:false
    },
    pais:{
        type:String,
        required:false
    },   
    ciudad:{
        type:String,
        required:false
    },
    direccion:{
        type:String,
        required:false
    },
    fechaNac:{
        type:String,
        required:false
    },
    sexo:{
        type:String,
        required:false
    },  
    idReferido:{
        type:String,
        required:false
    }, 
    decisionRefer:{
        type:String,
        required:false
        },
    amigos:{
        type:String,
        required:false
    },

    date:{
        type:Date,
        default:Date.now
    }
});

// User is my model
mongoose.model('Usuarios',UsuariosSchema);