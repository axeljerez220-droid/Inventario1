const pool = require('../config/db');

class RolModel {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM rol ORDER BY id_rol ASC;');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM rol WHERE id_rol = $1;', [id]);
    return rows[0];
  }

  static async create(nombre, descripcion) {
    const { rows } = await pool.query(
      'INSERT INTO rol (nombre, descripcion) VALUES ($1, $2) RETURNING *;',
      [nombre, descripcion]
    );
    return rows[0];
  }

  static async update(id, nombre, descripcion) {
    const { rows } = await pool.query(
      'UPDATE rol SET nombre = $1, descripcion = $2 WHERE id_rol = $3 RETURNING *;',
      [nombre, descripcion, id]
    );
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM rol WHERE id_rol = $1 RETURNING *;', [id]);
    return rows[0];
  }
}

module.exports = RolModel;