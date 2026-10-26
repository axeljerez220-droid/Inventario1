require('dotenv').config();


const express = require('express');
const cors = require('cors');
const db = require('./config/db'); 


const materialRoutes = require('./routes/material.routes');
const usuarioRoutes = require('./routes/usuario.routes');
const categoriaRoutes = require('./routes/categoria.routes');
const solicitudRoutes = require('./routes/solicitud.routes');
const detalleSolicitudRoutes = require('./routes/detalle.solicitud.routes');
const movimientoRoutes = require('./routes/movimiento.routes');
const notificacionRoutes = require('./routes/notificacion.routes');
const reporteRoutes = require('./routes/reporte.routes');
const rolRoutes = require('./routes/rol.routes');
const ubicacionRoutes = require('./routes/ubicacion.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/materiales', materialRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/detalles-solicitud', detalleSolicitudRoutes);
app.use('/api/movimientos', movimientoRoutes);
app.use('/api/notificaciones', notificacionRoutes);
app.use('/api/reportes', reporteRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/ubicaciones', ubicacionRoutes);
app.use('/api/auth', authRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;