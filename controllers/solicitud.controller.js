
const SolicitudModel = require('../models/solicitud.model');

class SolicitudController {

  // Consultar solicitudes
  static async getAll(req, res) {
    try {
      const esAdministrador = req.usuario.rol === 'Administrador';

      // El Administrador ve todas; el Docente solamente las propias
      const id_usuario = esAdministrador ? null : req.usuario.id_usuario;

      const data = await SolicitudModel.getAll(id_usuario);
      res.json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Consultar una solicitud
  static async getById(req, res) {
    try {
      const esAdministrador = req.usuario.rol === 'Administrador';

      const id_usuario = esAdministrador ? null : req.usuario.id_usuario;

      const data = await SolicitudModel.getById(
        req.params.id,
        id_usuario
      );

      if (!data) {
        return res.status(404).json({ message: 'No encontrado' });
      }

      res.json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Crear solicitud
  static async create(req, res) {
    try {
      const { estado, observaciones } = req.body;

      // El ID del usuario se obtiene del token, no del Body
      const id_usuario = req.usuario.id_usuario;

      const data = await SolicitudModel.create(
        estado,
        observaciones,
        id_usuario
      );

      res.status(201).json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Modificar solicitud: solamente Administrador
  static async update(req, res) {
    try {
      const { estado, observaciones } = req.body;

      const data = await SolicitudModel.update(
        req.params.id,
        estado,
        observaciones
      );

      if (!data) {
        return res.status(404).json({ message: 'No encontrado' });
      }

      res.json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  // Eliminar solicitud: solamente Administrador
  static async delete(req, res) {
    try {
      const data = await SolicitudModel.delete(req.params.id);

      if (!data) {
        return res.status(404).json({ message: 'No encontrado' });
      }

      res.json({ message: 'Eliminado con éxito', data });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = SolicitudController;
