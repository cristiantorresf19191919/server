const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
//require models
require('../models/Usuarios');
// collection usuario
const Usuario = mongoose.model('Usuarios');

router.get('/principal',(req,res)=>{
    res.send('HOLA SOY UN SERVIDOR CARAJO');
});


router.post('/registrar',(req,res)=>{
    console.log(`se ha hecho una post request a registrar, he recibido los siguientes datos ${JSON.stringify(req.body)}`);
    const nombreVar = req.body.name;
    const contraseña = req.body.password;
    const correoVar = req.body.Email;
    const idReferidoVar = req.body.referido; 
    //encripta la contrasñea   
    bcrypt.genSalt(10)
    .then(salt=>{return bcrypt.hash(contraseña,salt)})
    .then((encriptada,error)=>{
        //guarda a collection usuario
        const usuarioTemporal = new Usuario({
            nombre:nombreVar,
            correo:correoVar,
            contraseña:encriptada
        }); 
        usuarioTemporal.save();
        res.json({
            success:true,
            msg: 'Usuario Registrado',
            contraseña: usuarioTemporal.contraseña,
            usuario:usuarioTemporal
        })
      


    })

    
}); //termina mi peticion POST 


//async find a repeated email 
router.get('/comparaClientes',(req,res)=>{
    console.log('POST A COMPARAR CLIENTES ----------------------------');
    let correoPrueba = req.query['email'];
    Usuario.findOne({correo:correoPrueba})
    .then((correo)=>{if (correo)res.send(true); else res.send(false);})


})


module.exports=router



