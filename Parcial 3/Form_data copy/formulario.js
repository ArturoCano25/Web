const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const {jsPDF} = require('jspdf');
const fs = require('fs');
const { check, validationResult } = require('express-validator');
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



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '/archivosrec/');
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage: storage})

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// const folder = path.join(__dirname + '/archivos/');
// const upload = multer({dest:folder});

const port = process.env.PORT || 8100;



app.post(
    '/formulario',
    upload.single('archivos'),
    [
        check('nombre').notEmpty().withMessage('El nombre es obligatorio').isAlpha().withMessage('El nombre debe contener solo letras'),
        check('apellido').notEmpty().withMessage('El apellido es obligatorio').isAlpha().withMessage('El apellido debe contener solo letras'),
    ],
    (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombre, apellido } = req.body;
        const archivo = req.file;

        if (!archivo) {
            return res.status(400).send('Es obligatorio subir un archivo.');
        }

        const imagePath = archivo.path;
        const imageData = fs.readFileSync(imagePath);
        const imageBase64 = imageData.toString('base64');
        const imageExtension = path.extname(imagePath).slice(1);

        const doc = new jsPDF();
        doc.text(`Hola ${nombre} ${apellido}`, 10, 10);

        const imageFormat = imageExtension === 'jpg' ? 'JPEG' : 'PNG';
        doc.addImage(`data:image/${imageFormat};base64,${imageBase64}`, imageFormat, 10, 20, 100, 100);

        const pdfBuffer = doc.output('arraybuffer');

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="documento.pdf"');

        res.send(Buffer.from(pdfBuffer));
    }
);

app.listen(8100,()=>{
    console.log(`Escuchando en el puerto : ${8100}`)
});