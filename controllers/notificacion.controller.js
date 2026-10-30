
const NotificacionModel = require('../models/notificacion.model');

class NotificacionController {

  static async getAll(req, res) {
    try {
      const esAdministrador = req.usuario.rol === 'Administrador';
      const id_usuario = esAdministrador ? null : req.usuario.id_usuario;

      const data = await NotificacionModel.getAll(id_usuario);
      res.json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const esAdministrador = req.usuario.rol === 'Administrador';
      const id_usuario = esAdministrador ? null : req.usuario.id_usuario;

      const data = await NotificacionModel.getById(
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

  static async create(req, res) {
    try {
      const { mensaje, estado } = req.body;

      // El usuario destinatario se obtiene del token.
      const id_usuario = req.usuario.id_usuario;

      const data = await NotificacionModel.create(
        mensaje,
        estado,
        id_usuario
      );

      res.status(201).json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const esAdministrador = req.usuario.rol === 'Administrador';
      const id_usuario = esAdministrador ? null : req.usuario.id_usuario;

      const { estado } = req.body;

      const data = await NotificacionModel.update(
        req.params.id,
        estado,
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

  static async delete(req, res) {
    try {
      const data = await NotificacionModel.delete(req.params.id);

      if (!data) {
        return res.status(404).json({ message: 'No encontrado' });
      }

      res.json({ message: 'Eliminado con éxito', data });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = NotificacionController;
