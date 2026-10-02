const pool = require('../config/db');

class NotificacionModel {

  static async getAll() {
    const result = await pool.query(
      'SELECT * FROM notificacion ORDER BY id_notificacion'
    );
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query(
      'SELECT * FROM notificacion WHERE id_notificacion = $1',
      [id]
    );
    return result.rows[0];
  }

  static async create(mensaje, estado, id_usuario) {
    const result = await pool.query(
      `INSERT INTO notificacion (mensaje, estado, id_usuario)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [mensaje, estado, id_usuario]
    );
    return result.rows[0];
  }

  static async update(id, estado) {
    const result = await pool.query(
      `UPDATE notificacion
       SET estado = $1
       WHERE id_notificacion = $2
       RETURNING *`,
      [estado, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await pool.query(
      `DELETE FROM notificacion
       WHERE id_notificacion = $1
       RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
}

module.exports = NotificacionModel;