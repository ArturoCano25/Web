const express = require('express');
const path = require('path');
const app = express();

console.log(__dirname);
console.log(__filename);

app.use(express.json());

app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));

app.get('/administracion',(req,res)=>{
    console.log(req.query)
    res.send('Servidor contestando a peticion query GET')
    res.render('admin');
});

app.get('/maestros',(req,res)=>{
    console.log(req.body)
    res.send('Servidor constestando a peticion body GET')
});

app.get('/estudiantes/:carrera',(req,res)=>{
    console.log(req.params.carrera)
    console.log(req.query.control)
    res.send('Servidor contestando a peticion params GET')
});
//localhost:8100/estudiantes/sistemas?control=22100235

app.listen(8100,()=>{
    console.log(`Escuchando en el puerto : ${8100}`)
});