const CategoriaModel = require('../models/categoria.model');

class CategoriaController {
  static async getAll(req, res) {
    try {
      const data = await CategoriaModel.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await CategoriaModel.getById(req.params.id);
      if (!data) return res.status(404).json({ message: 'No encontrado' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { nombre, descripcion } = req.body;
      const data = await CategoriaModel.create(nombre, descripcion);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const { nombre, descripcion } = req.body;
      const data = await CategoriaModel.update(req.params.id, nombre, descripcion);
      if (!data) return res.status(404).json({ message: 'No encontrado' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const data = await CategoriaModel.delete(req.params.id);
      if (!data) return res.status(404).json({ message: 'No encontrado' });
      res.json({ message: 'Eliminado con éxito', data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = CategoriaController;