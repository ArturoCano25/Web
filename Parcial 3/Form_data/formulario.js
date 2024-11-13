const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();

app.use(express.json());
app.use(express.text());

const folder = path.join(__dirname + '/archivos/');
const upload = multer({dest:folder});

app.use(upload.single('archivo'));

app.post('/formulario',(req,res)=>{
    console.log(req.body)
    res.send(`Hola ${req.body.nombre}`);
});

app.listen(8100,()=>{
    console.log(`Escuchando en el puerto : ${8100}`)
});