const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kanoomtz02',
    database: 'eventos_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('Conectado a la base de datos.');
});

app.get('/eventosAll', (req, res) => {
    const query = 'SELECT id, nombre, descripcion, fecha, lugar FROM eventos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err.message);
            res.status(500).send('Error al obtener los datos.');
            return;
        }
        res.json(results);
    });
});

const port = process.env.PORT || 8200;

app.listen(port,()=>{
    console.log(`Escuchando en el puerto : ${port}`)
});