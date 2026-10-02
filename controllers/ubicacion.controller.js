const UbicacionModel = require('../models/ubicacion.model');

class UbicacionController {
  static async getAll(req, res) {
    try {
      const data = await UbicacionModel.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await UbicacionModel.getById(req.params.id);
      if (!data) return res.status(404).json({ message: 'No encontrado' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { nombre, descripcion } = req.body;
      const data = await UbicacionModel.create(nombre, descripcion);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const { nombre, descripcion } = req.body;
      const data = await UbicacionModel.update(req.params.id, nombre, descripcion);
      if (!data) return res.status(404).json({ message: 'No encontrado' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const data = await UbicacionModel.delete(req.params.id);
      if (!data) return res.status(404).json({ message: 'No encontrado' });
      res.json({ message: 'Eliminado con éxito', data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UbicacionController;