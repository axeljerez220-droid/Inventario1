
const pool = require('../config/db');

class NotificacionModel {

  // Administrador: todas las notificaciones.
  // Docente: solamente las propias.
  static async getAll(id_usuario = null) {
    let query = `
      SELECT *
      FROM notificacion
    `;

    const params = [];

    if (id_usuario !== null) {
      query += ' WHERE id_usuario = $1';
      params.push(id_usuario);
    }

    query += ' ORDER BY id_notificacion';

    const result = await pool.query(query, params);
    return result.rows;
  }

  static async getById(id, id_usuario = null) {
    let query = `
      SELECT *
      FROM notificacion
      WHERE id_notificacion = $1
    `;

    const params = [id];

    if (id_usuario !== null) {
      query += ' AND id_usuario = $2';
      params.push(id_usuario);
    }

    const result = await pool.query(query, params);
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

  // Actualizar solamente una notificación del usuario indicado.
  static async update(id, estado, id_usuario = null) {
    let query = `
      UPDATE notificacion
      SET estado = $1
      WHERE id_notificacion = $2
    `;

    const params = [estado, id];

    if (id_usuario !== null) {
      query += ' AND id_usuario = $3';
      params.push(id_usuario);
    }

    query += ' RETURNING *';

    const result = await pool.query(query, params);
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
