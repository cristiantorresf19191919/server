const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const passport = require('passport');


// Load Routes
/* const routesIdeas= require('./routes/ideas');
const routesUsers= require('./routes/users'); */
const routesUsuarios= require('./routes/usuarios');

// conectar a la base de datos de mongoose
const opt = {useNewUrlParser:true};
const mongourl = 'mongodb://usernamedb:passworddb@ds163013.mlab.com:63013/tigre';
mongoose.connect(mongourl,opt);
const db = mongoose.connection;


db.on('error',console.error.bind(console,'...Error de coneccion:'));
db.once('open',()=>{
    console.log('Conectado exitosamente a la base de datos:)');
}) 
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// passport JWT
app.use(passport.initialize());
app.use(passport.session());
//const puerto = process.env.PORT || 3000;
app.set('port',process.env.PORT || 3000);
// Cors MiddleWare wow
app.use(cors());
// How middleware works
app.use((req,res,next)=>{
    console.log(Date.now());
    req.name= 'cristian torres';
    next();
})
app.get('/hola',(req,res)=>{
    res.send('HOLA SOY EL SERVIDOR... ESTO ES UNA PRUEBA');
    console.log('***************************************************');
    console.log('***************************************************');
    console.log('***************************************************');
    console.log('***************************************************');
    console.log('***************************************************');
    console.log('Comenzand pruebas.............................................');
})
// Use routes imported 
/* app.use('/ideas',routesIdeas);
app.use('/users',routesUsers); */
app.use('/usuarios',routesUsuarios);
//Passport COnfig
require('./config/passport')(passport);


app.listen(app.get('port'), ()=>{
    console.log( `Servidor a empezado en el puerto ${app.get('port')}`);
})










