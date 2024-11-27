const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Kanoomtz02',
  database: 'ligamx',
});


app.get('/equipos', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM equipos');
  res.json(rows);
});

app.get('/equipos/:id', async (req, res) => {
  const { id } = req.params;
  const [rows] = await db.query('SELECT * FROM equipos WHERE id_equipo = ?', [id]);
  res.json(rows[0] || {});
});

app.post('/equipos', async (req, res) => {
  const { nombre_equipo, ciudad, fundacion, colores, estadio, titulos } = req.body;
  await db.query('INSERT INTO equipos (nombre_equipo, ciudad, fundacion, colores, estadio, titulos) VALUES (?, ?, ?, ?, ?, ?)', [nombre_equipo, ciudad, fundacion, colores, estadio, titulos]);
  res.send({ message: 'Equipo creado' });
});

app.put('/equipos/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre_equipo, ciudad, fundacion, colores, estadio, titulos } = req.body;
  await db.query('UPDATE equipos SET nombre_equipo = ?, ciudad = ?, fundacion = ?, colores = ?, estadio = ?, titulos = ? WHERE id_equipo = ?', [nombre_equipo, ciudad, fundacion, colores, estadio, titulos, id]);
  res.send({ message: 'Equipo actualizado' });
});

app.delete('/equipos/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM equipos WHERE id_equipo = ?', [id]);
  res.send({ message: 'Equipo eliminado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));