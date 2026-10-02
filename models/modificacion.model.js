const pool = require('../config/db');

class NotificacionModel {
  static async getAll() {
    const query = `
      SELECT n.id_notificacion, n.mensaje, n.fecha, n.estado,
             u.nombre || ' ' || u.apellido AS usuario
      FROM notificacion n
      JOIN usuario u ON n.id_usuario = u.id_usuario
      ORDER BY n.id_notificacion ASC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = `
      SELECT n.id_notificacion, n.mensaje, n.fecha, n.estado,
             u.nombre || ' ' || u.apellido AS usuario
      FROM notificacion n
      JOIN usuario u ON n.id_usuario = u.id_usuario
      WHERE n.id_notificacion = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async create(mensaje, estado, id_usuario) {
    const query = `
      INSERT INTO notificacion (mensaje, estado, id_usuario)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const { rows } = await pool.query(query, [mensaje, estado, id_usuario]);
    return rows[0];
  }

  static async update(id, estado) {
    const query = `
      UPDATE notificacion
      SET estado = $1
      WHERE id_notificacion = $2 RETURNING *;
    `;
    const { rows } = await pool.query(query, [estado, id]);
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM notificacion WHERE id_notificacion = $1 RETURNING *;', [id]);
    return rows[0];
  }
}

module.exports = NotificacionModel;