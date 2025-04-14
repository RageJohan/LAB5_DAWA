const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

let estudiantes = [];
let contadorId = 1;

// Página de inicio
app.get('/', (req, res) => {
  res.render('inicio');
});

// Listado de estudiantes
app.get('/estudiantes', (req, res) => {
  res.render('index', { estudiantes });
});

// Nuevo estudiante
app.get('/nuevo', (req, res) => {
  res.render('form', { estudiante: {}, accion: '/crear', titulo: 'Registrar Estudiante' });
});

// Crear estudiante
app.post('/crear', (req, res) => {
  const { nombre, apellido, edad, correo, carrera, genero, universidad, activo } = req.body;
  estudiantes.push({
    id: contadorId++,
    nombre,
    apellido,
    edad,
    correo,
    carrera,
    genero,
    universidad,
    activo: activo === 'on'
  });
  res.redirect('/estudiantes');
});

// Editar estudiante
app.get('/editar/:id', (req, res) => {
  const estudiante = estudiantes.find(e => e.id == req.params.id);
  if (!estudiante) return res.send('Estudiante no encontrado');
  res.render('form', { estudiante, accion: `/actualizar/${estudiante.id}`, titulo: 'Editar Estudiante' });
});

// Actualizar estudiante
app.post('/actualizar/:id', (req, res) => {
  const { nombre, apellido, edad, correo, carrera, genero, universidad, activo } = req.body;
  const estudiante = estudiantes.find(e => e.id == req.params.id);
  if (estudiante) {
    estudiante.nombre = nombre;
    estudiante.apellido = apellido;
    estudiante.edad = edad;
    estudiante.correo = correo;
    estudiante.carrera = carrera;
    estudiante.genero = genero;
    estudiante.universidad = universidad;
    estudiante.activo = activo === 'on';
  }
  res.redirect('/estudiantes');
});

// Eliminar estudiante
app.get('/eliminar/:id', (req, res) => {
  estudiantes = estudiantes.filter(e => e.id != req.params.id);
  res.redirect('/estudiantes');
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
