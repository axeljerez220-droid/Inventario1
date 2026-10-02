const pool = require('../config/db');

class UbicacionModel {
  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM ubicacion ORDER BY id_ubicacion ASC;');
    return rows;
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM ubicacion WHERE id_ubicacion = $1;', [id]);
    return rows[0];
  }

  static async create(nombre, descripcion) {
    const { rows } = await pool.query(
      'INSERT INTO ubicacion (nombre, descripcion) VALUES ($1, $2) RETURNING *;',
      [nombre, descripcion]
    );
    return rows[0];
  }

  static async update(id, nombre, descripcion) {
    const { rows } = await pool.query(
      'UPDATE ubicacion SET nombre = $1, descripcion = $2 WHERE id_ubicacion = $3 RETURNING *;',
      [nombre, descripcion, id]
    );
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM ubicacion WHERE id_ubicacion = $1 RETURNING *;', [id]);
    return rows[0];
  }
}

module.exports = UbicacionModel;