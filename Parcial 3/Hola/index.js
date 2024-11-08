const express = require('express');
const app = express();

// app.use((req,res,next) => {
//     res.send();
//     next();
// })

app.get('/empleado', (req, res) => {
    console.log(req.query);
    res.send('Servidor contestado a peticion get');
})

app.post('/empleado', (req, res) => {
    res.send('Servidor contestado a peticion post');
})

app.all((req, res) => {
    res.send('Ruta no encontrada')
})

app.listen(8080, () => {
    console.log('Servidor express escuchado en puerto 8080');
})