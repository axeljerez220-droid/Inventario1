const UsuarioModel = require('../models/usuario.model');

class UsuarioController {
  static async getAll(req, res) {
    try {
      const data = await UsuarioModel.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async getById(req, res) {
    try {
      const data = await UsuarioModel.getById(req.params.id);
      if (!data) return res.status(404).json({ message: 'No encontrado' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async create(req, res) {
    try {
      const { nombre, apellido, email, contrasena, id_rol } = req.body;
      const data = await UsuarioModel.create(nombre, apellido, email, contrasena, id_rol);
      res.status(201).json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async update(req, res) {
    try {
      const { nombre, apellido, email, contrasena, id_rol } = req.body;
      const data = await UsuarioModel.update(req.params.id, nombre, apellido, email, contrasena, id_rol);
      if (!data) return res.status(404).json({ message: 'No encontrado' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async delete(req, res) {
    try {
      const data = await UsuarioModel.delete(req.params.id);
      if (!data) return res.status(404).json({ message: 'No encontrado' });
      res.json({ message: 'Eliminado con éxito', data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UsuarioController;