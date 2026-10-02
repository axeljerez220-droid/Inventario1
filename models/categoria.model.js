const pool = require('../config/db');

class CategoriaModel {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM categoria ORDER BY id_categoria ASC;');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM categoria WHERE id_categoria = $1;', [id]);
    return rows[0];
  }

  static async create(nombre, descripcion) {
    const { rows } = await pool.query(
      'INSERT INTO categoria (nombre, descripcion) VALUES ($1, $2) RETURNING *;',
      [nombre, descripcion]
    );
    return rows[0];
  }

  static async update(id, nombre, descripcion) {
    const { rows } = await pool.query(
      'UPDATE categoria SET nombre = $1, descripcion = $2 WHERE id_categoria = $3 RETURNING *;',
      [nombre, descripcion, id]
    );
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM categoria WHERE id_categoria = $1 RETURNING *;', [id]);
    return rows[0];
  }
}

module.exports = CategoriaModel;