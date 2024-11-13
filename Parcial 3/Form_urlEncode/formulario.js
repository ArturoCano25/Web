const express = require('express');
const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));

app.post('/formulario',(req,res)=>{
    console.log(req.body)
    res.send(`Hola ${req.body.nombre}`);
});

app.listen(8100,()=>{
    console.log(`Escuchando en el puerto : ${8100}`)
});