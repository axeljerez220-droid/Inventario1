const pool = require('../config/db');

class SolicitudModel {
  static async getAll() {
    const query = `
      SELECT s.id_solicitud, s.fecha, s.estado, s.observaciones, 
             u.nombre || ' ' || u.apellido AS usuario
      FROM solicitud s
      JOIN usuario u ON s.id_usuario = u.id_usuario
      ORDER BY s.id_solicitud ASC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = `
      SELECT s.id_solicitud, s.fecha, s.estado, s.observaciones, 
             u.nombre || ' ' || u.apellido AS usuario
      FROM solicitud s
      JOIN usuario u ON s.id_usuario = u.id_usuario
      WHERE s.id_solicitud = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async create(estado, observaciones, id_usuario) {
    const query = `
      INSERT INTO solicitud (estado, observaciones, id_usuario)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const { rows } = await pool.query(query, [estado, observaciones, id_usuario]);
    return rows[0];
  }

  static async update(id, estado, observaciones) {
    const query = `
      UPDATE solicitud
      SET estado = $1, observaciones = $2
      WHERE id_solicitud = $3 RETURNING *;
    `;
    const { rows } = await pool.query(query, [estado, observaciones, id]);
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM solicitud WHERE id_solicitud = $1 RETURNING *;', [id]);
    return rows[0];
  }
}

module.exports = SolicitudModel;