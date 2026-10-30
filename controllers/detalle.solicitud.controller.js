
const DetalleSolicitudModel = require('../models/detalle.solicitud.model');

class DetalleSolicitudController {

  static async getAll(req, res) {
    try {
      const esAdministrador = req.usuario.rol === 'Administrador';
      const id_usuario = esAdministrador ? null : req.usuario.id_usuario;

      const data = await DetalleSolicitudModel.getAll(id_usuario);
      res.json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getBySolicitudId(req, res) {
    try {
      const esAdministrador = req.usuario.rol === 'Administrador';
      const id_usuario = esAdministrador ? null : req.usuario.id_usuario;

      const data = await DetalleSolicitudModel.getBySolicitudId(
        req.params.id_solicitud,
        id_usuario
      );

      res.json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const {
        id_solicitud,
        id_material,
        cantidad_solicitada,
        cantidad_entregada
      } = req.body;

      const esAdministrador = req.usuario.rol === 'Administrador';

      // El docente solamente puede agregar detalles
      // a sus propias solicitudes.
      if (!esAdministrador) {
        const pertenece = await DetalleSolicitudModel.perteneceAUsuario(
          id_solicitud,
          req.usuario.id_usuario
        );

        if (!pertenece) {
          return res.status(403).json({
            mensaje: 'No tenés permiso para agregar detalles a esta solicitud.'
          });
        }
      }

      const data = await DetalleSolicitudModel.create(
        id_solicitud,
        id_material,
        cantidad_solicitada,
        cantidad_entregada
      );

      res.status(201).json(data);

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const { cantidad_solicitada, cantidad_entregada } = req.body;

      const data = await DetalleSolicitudModel.update(
        req.params.id,
        cantidad_solicitada,
        cantidad_entregada
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
      const data = await DetalleSolicitudModel.delete(req.params.id);

      if (!data) {
        return res.status(404).json({ message: 'No encontrado' });
      }

      res.json({ message: 'Eliminado con éxito', data });

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = DetalleSolicitudController;
