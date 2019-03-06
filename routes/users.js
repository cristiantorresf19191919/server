const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const mongoose = require('mongoose');
//require models
require('../models/User');
const Usuario = mongoose.model('User');

// User Login Route
router.get('/login',(req,res)=>{
    res.send('login');
});
// User Register Route
router.get('/register',(req,res)=>{
    res.send('register');
}),
// post methods
router.post('/register',(req,res)=>{
    console.log('');
    console.log('');
    console.log('');
    console.log('//////////////////////////////////////');
    console.log('//////////////////////////////////////');
    console.log(' se ha echo un post a router users REGISTRO');
    console.log('req.body-> '+JSON.stringify(req.body));
    let password='';
    let correo = req.body.Email;

    function vemail (paramcorreo){
        const ve = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return ve.test(paramcorreo);

    }

    if (req.body.password != req.body.password2){
        res.json({
            success:false,
            msg:'Contraseñas no Coinciden'
        });  
    }    
     else if (req.body.password === req.body.password2){
         password = req.body.password;
         const number = /(?=.*[0-9])/
        
    
        function vpass (parampassword){            
            number.test(parampassword);    
        }

         //begin main
    Usuario.findOne({
        correo : req.body.Email
    })
    .then(encontrado=>{
        if (encontrado){
            res.json({
                success:false,
                msg:'El correo ya se encuentra registrado Pilas'
            })
        } else {
            let newUser = new Usuario({
                nombre: req.body.name,
                correo:req.body.Email,
                celular:req.body.Telefono,
                cedula:req.body.cc,
                contraseña:'',
                rol:req.body.rol
            });
            // encriptamiendo de contraseña por hash asincrona
            bcrypt.genSalt(10)
            .then(salt=>{
                return bcrypt.hash(req.body.password,salt);
            })
            .then((hash,err)=>{
                newUser.contraseña= hash;
                console.log(`la contraseña ${password} ha sido encriptada y es esta ${hash}`)
                res.json({
                    success:true,
                    msg: 'Todo ha salido bien' || err,
                    password: req.body.password,
                    hash: newUser.contraseña,
                    user:newUser
                });
                newUser.save();                                 
            });                       
        }
    })
    //end main  
        

       /*  if (!vemail(req.body.Email)){
            res.json({
                success:false,
                msg:`ups el correo ${correo} no tiene arroba o no termina en .com, escribalo bien`
            })
        }   */     

    
         /* if (password.length < 4){
             res.json({
                 success:false,
                 msg:'Contraseña debe tener al menos 4 caracteres'
             })
         } */

         
     }
    
});

//async find a repeated email 
router.get('/comparaClientes',(req,res)=>{
    console.log('POST A COMPARAR CLIENTES ----------------------------');
    let correoPrueba = req.query['email'];
    Usuario.findOne({correo:correoPrueba})
    .then((correo)=>{if (correo)res.send(true); else res.send(false);})


})

// Login Form POST
router.post('/login', (req, res, next) => {

    console.log('');
    console.log('');
    console.log('##########');
    console.log('');
    console.log('intento de LOGIN post request...');
    console.log('');
    console.log('');
    console.log(JSON.stringify(req.body));
    console.log('');
    console.log('');

   const correo = req.body.Email;
   const password = req.body.Password;

   Usuario.findOne({correo:correo })
   .then(encontrado=>{
       if (!encontrado){
           res.json({
               msg:'Usuario no Encontrado en la base de datos',
               success:false,               
            });
        }
       if (encontrado) {           
        console.log('contraseña puesta'+password);
        console.log('contraseña en la base de datos'+encontrado.contraseña);
           bcrypt.compare(password,encontrado.contraseña)
           .then(isMatch=>{
               
               if (isMatch){
                const token = jwt.sign(encontrado.toJSON(),'clavepersonal',{
                    expiresIn: 604800 // 1 week
                   });
                if (encontrado.correo === "admin@cristian.com" && encontrado.contraseña === "$2a$10$NKUdBQ3GBzASrzJX54MQTOUx5MeJyg66Q0nD6jQqAYBk3DYiw3SeG"){
                    res.json({
                        success:true,
                        msg: `Eres Administrador `,
                        user:encontrado,
                        token:'Token de autenticacion -> '+token,
                        admin:true,
                        role:"ADMIN_ROLE" 

                    })
                } else {
                    res.json({
                        success:true,
                        msg:'Usuario Autenticado'+encontrado.nombre +'Ingresa . TOKEN DE AUTHENTIQUE ES - > '+token ,
                        user:JSON.stringify(encontrado),
                        token:'Token de autenticacion -> '+token,
                        admin:false,
                        role:"CLIENT_ROLE"  
                    });

                }

                   
               }
               if(!isMatch){
                   res.json({
                       success:false,
                       msg:'Usuario encontrado en la base de datos pero Las contraseñas no coinciden revize por favor'
                   })
               }
               console.log('Contraseña encontrada y aprovada :)');

           }).catch(err=>{
               console.log(err);
           });

       }
   })

  });

// Obtener Clientes
router.get('/obtener',(req,res)=>{
    console.log('OBTENER CLIENTES PETICION');
    Usuario.find({})
    .sort({date:'desc'})
    .then((clientes)=>{
        res.json({
            success:true,
            msg: `Usuarios Encontrados`,
            clientes : clientes
        });
        
    });
});



module.exports=router