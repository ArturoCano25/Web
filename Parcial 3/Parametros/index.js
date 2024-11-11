const express = require('express');
const app = express();
app.use(express.json());
app.use(express.text());

app.get('/administrativos', (req, res) => {
    console.log(req.query);
    res.send('Servidor contestado a peticion get');
})

app.get('/maestros', (req, res) => {
    //localhost:8100/maestros
    console.log(req.body);
    res.send('Servidor contestado a peticion body');
})

app.get('/estudiantes/:carrera', (req, res) => {
    //localhost:8100/estudiantes/sistemas?control=22100171
    console.log(req.params.carrera);
    console.log(req.query.control);
    res.send('Servidor contestado a peticion get');
})

// app.post('/empleado', (req, res) => {
//     res.send('Servidor contestado a peticion post');
// })

// app.all((req, res) => {
//     res.send('Ruta no encontrada')
// })

app.listen(8100, () => {
    console.log('Servidor express escuchado en puerto 8100');
})