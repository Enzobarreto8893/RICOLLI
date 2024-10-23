const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const { Pool } = require('pg');
const cors = require('cors');
const multer = require('multer'); // Importar multer para subir archivos
const QRCode = require('qrcode'); // Importar QRCode para generar códigos QR

// Sirve archivos estáticos desde la carpeta 'qrs'
app.use('/qrs', express.static(path.join(__dirname, 'qrs')));

app.use(cors()); // Habilita CORS para todas las rutas

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ricolli', // Actualiza el nombre de la base de datos aquí
  password: 'Pyramid8893', // Asegúrate de que esta contraseña sea correcta
  port: 5432,
});

// Configuración de multer para almacenar las imágenes en la carpeta 'imagenes'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'imagenes')); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Renombrar el archivo para evitar duplicados
  },
});

const upload = multer({ storage }); // Inicializar multer con la configuración de almacenamiento

// Servir archivos estáticos (imágenes, por ejemplo)
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

// Middleware para manejar JSON en las solicitudes
app.use(express.json()); 

app.post('/recetas', upload.single('imagen'), async (req, res) => {
  const { nombre, descripcion, ingredientes, fecha, hecho } = req.body;
  const imagen = req.file ? req.file.filename : null; // Obtener el nombre del archivo subido

  // Log para verificar los datos recibidos
  console.log("Datos recibidos:", req.body);
  console.log("Imagen recibida:", req.file);

  try {
    const result = await pool.query(
      'INSERT INTO recetas (nombre, descripcion, ingredientes, fecha_creacion, hecho, imagen) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, descripcion, ingredientes, fecha, hecho, imagen]
    );
    const receta = result.rows[0];

    // Generar el código QR con la información de la receta
    const qrData = `Nombre: ${receta.nombre}, Descripción: ${receta.descripcion}, Ingredientes: ${receta.ingredientes}, Fecha: ${receta.fecha_creacion}, Hecho por: ${receta.hecho}`;
    const qrPath = path.join(__dirname, 'qrs', `${receta.id}.png`);

    // Log para verificar el contenido del código QR y la ruta donde se guardará
    console.log("Generando QR con los datos:", qrData);
    console.log("Guardando QR en la ruta:", qrPath);

    await QRCode.toFile(qrPath, qrData, function (err) {
      if (err) {
        console.error("Error generando QR:", err);
        return res.status(500).json({ error: 'Error generando el código QR' });
      }
    });

    // Agregar la ruta del QR a la receta
    const qrUrl = `http://localhost:3000/qrs/${receta.id}.png`;
    console.log("QR generado con éxito en:", qrUrl);

    // Enviar la receta y el QR generado como respuesta
    res.status(201).json({ ...receta, qrUrl });
  } catch (error) {
    console.error('Error agregando receta:', error);
    res.status(500).json({ error: 'Error al agregar la receta' });
  }
});



// Ruta para eliminar una receta
app.delete('/recetas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM recetas WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Receta no encontrada' });
    }
    res.status(200).json({ message: 'Receta eliminada exitosamente', receta: result.rows[0] });
  } catch (error) {
    console.error('Error eliminando receta:', error);
    res.status(500).json({ error: 'Error al eliminar la receta' });
  }
});

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Trazabilidad');
});

// Conexión a la base de datos
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos:', res.rows[0]);
  }
});

// Ruta para obtener las materias primas
app.get('/materias-primas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM materias_primas ORDER BY fecha_recepcion DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener materias primas:', error);
    res.status(500).json({ error: 'Error al obtener materias primas' });
  }
});

// Ruta para obtener las recetas
app.get('/recetas', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, descripcion, ingredientes, imagen FROM recetas ORDER BY fecha_creacion DESC');
    const recetas = result.rows.map((receta) => {
      return {
        ...receta,
        qrUrl: `http://localhost:3000/qrs/${receta.id}.png` // Generar el qrUrl para cada receta
      };
    });
    res.status(200).json(recetas);
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    res.status(500).json({ error: 'Error al obtener recetas' });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
