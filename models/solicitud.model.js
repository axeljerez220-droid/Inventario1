
const pool = require('../config/db');

class SolicitudModel {

  // Obtener todas las solicitudes o solamente las de un usuario
  static async getAll(id_usuario = null) {
    let query = `
      SELECT s.id_solicitud, s.fecha, s.estado, s.observaciones,
             s.id_usuario,
             u.nombre || ' ' || u.apellido AS usuario
      FROM solicitud s
      JOIN usuario u ON s.id_usuario = u.id_usuario
    `;

    const params = [];

    if (id_usuario !== null) {
      query += ' WHERE s.id_usuario = $1';
      params.push(id_usuario);
    }

    query += ' ORDER BY s.id_solicitud ASC';

    const { rows } = await pool.query(query, params);
    return rows;
  }

  // Obtener una solicitud por ID, verificando su propietario
  static async getById(id, id_usuario = null) {
    let query = `
      SELECT s.id_solicitud, s.fecha, s.estado, s.observaciones,
             s.id_usuario,
             u.nombre || ' ' || u.apellido AS usuario
      FROM solicitud s
      JOIN usuario u ON s.id_usuario = u.id_usuario
      WHERE s.id_solicitud = $1
    `;

    const params = [id];

    if (id_usuario !== null) {
      query += ' AND s.id_usuario = $2';
      params.push(id_usuario);
    }

    const { rows } = await pool.query(query, params);
    return rows[0];
  }

  // Crear una solicitud
  static async create(estado, observaciones, id_usuario) {
    const query = `
      INSERT INTO solicitud (estado, observaciones, id_usuario)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const { rows } = await pool.query(
      query,
      [estado, observaciones, id_usuario]
    );

    return rows[0];
  }

  // Modificar una solicitud
  static async update(id, estado, observaciones) {
    const query = `
      UPDATE solicitud
      SET estado = $1, observaciones = $2
      WHERE id_solicitud = $3
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [estado, observaciones, id]);
    return rows[0];
  }

  // Eliminar una solicitud
  static async delete(id) {
    const query = `
      DELETE FROM solicitud
      WHERE id_solicitud = $1
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = SolicitudModel;
