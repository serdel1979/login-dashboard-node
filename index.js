const express = require('express');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./db/config');
require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

//coneccion a base de datos
dbConnection();


app.use(express.static('public'))


app.use(cors());


app.use(express.json());

//rutas 
app.use('/api/auth', require('./routes/auth'));

//manejador de rutas
app.get('*',(req,res)=>{
    res.sendFile( path.resolve(__dirname,'public/index.html'));
})


app.listen(PORT,()=>{
    console.log(`servidor corriendo en puerto ${PORT}.`)
    console.log('GET /api/auth/renew');
    console.log('POST /api/auth');
    console.log('POST /api/auth/new');
});