
const MovimientoModel = require('../models/movimiento.model');

class MovimientoController {

  static async getAll(req, res) {
    try {
      const esAdministrador = req.usuario.rol === 'Administrador';
      const id_usuario = esAdministrador ? null : req.usuario.id_usuario;

      const data = await MovimientoModel.getAll(id_usuario);
      res.json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const esAdministrador = req.usuario.rol === 'Administrador';
      const id_usuario = esAdministrador ? null : req.usuario.id_usuario;

      const data = await MovimientoModel.getById(
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
      const {
        tipo_movimiento,
        cantidad,
        observaciones,
        id_material
      } = req.body;

      // El usuario se obtiene del token JWT.
      const id_usuario = req.usuario.id_usuario;

      const data = await MovimientoModel.create(
        tipo_movimiento,
        cantidad,
        observaciones,
        id_material,
        id_usuario
      );

      res.status(201).json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const data = await MovimientoModel.delete(req.params.id);

      if (!data) {
        return res.status(404).json({ message: 'No encontrado' });
      }

      res.json({ message: 'Eliminado con éxito', data });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = MovimientoController;
