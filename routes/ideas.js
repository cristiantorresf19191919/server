const express = require('express');
const router = express.Router();
const mongoose= require('mongoose');
// Model Mongoose
require('../models/Idea');
const Idea = mongoose.model('ideas');
// Idea edit get Id
router.get('/edit/:id',(req,res)=>{
    Idea.findOne({
        _id: req.params.id
    })
    .then((encontrado)=>{
        res.json(encontrado);    
    }

    )    
});
// process form
router.get('/',(req,res)=>{
    Idea.find({})
    .sort({date:'desc'})
    .then((ideas)=>{
        res.json(ideas);
        console.log('GET REQUEST ');
    });
});

router.post('/add',(req,res)=>{
    
    const titulo = req.body.title;
    const detalle = req.body.details;
    console.log('POST REQUEST ');
    
    console.log(`req.body.name ${req.body.title}`);
    console.log(`req.body.username ${req.body.details}`);

    if (!titulo){
        res.json({msg:"POnga un titulo"});
    }

    if (!detalle){
        res.json({msg:"POnga Detalles"});
    }

    if (!titulo && !detalle){
        res.json(
            {success:false,
            msg:'no llenaste todos los datos'});
        
        
    }

    else {

        res.json(
            {   success:true,
                msg:'Se ha subido a la base de datos con exito'
            }
        ) 
        // Guardando lo que recive a la base de datos
        const newUser = {
            title : req.body.title,
            details : req.body.details
        }
        new Idea (newUser)
        .save();
        
    } 
    
    
});

router.put('/:id',(req,res)=>{
    console.log('req.body.title ->'+req.body.title);
    console.log('req.body.details ->'+req.body.details);
    console.log('req.params.id ->'+req.params.id);
    Idea.findOne({
        _id: req.params.id
    })
    .then((encontrado)=>{
        // Nuevos Valores
        encontrado.title=req.body.title;
        encontrado.details=req.body.details;
        encontrado.save()
        .then((objModificado)=>{
            res.json(objModificado);

        });
    })
    
});

router.delete('/borrar/:id',(req,res)=>{
    console.log('DELETE REQUEST ');
    console.log('delete element id -> '+req.params.id);
    Idea.deleteOne({
        _id: req.params.id
    })
    .then(()=>
    res.json({msg:'Item Deleted'}));

})

module.exports = router;