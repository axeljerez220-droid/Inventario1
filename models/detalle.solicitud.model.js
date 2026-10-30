
const pool = require('../config/db');

class DetalleSolicitudModel {

  // Administrador: todos los detalles.
  // Docente: solamente los detalles de sus solicitudes.
  static async getAll(id_usuario = null) {
    let query = `
      SELECT ds.id_detalle, ds.id_solicitud,
             ds.cantidad_solicitada, ds.cantidad_entregada,
             m.nombre AS material
      FROM detalle_solicitud ds
      JOIN material m ON ds.id_material = m.id_material
      JOIN solicitud s ON ds.id_solicitud = s.id_solicitud
    `;

    const params = [];

    if (id_usuario !== null) {
      query += ' WHERE s.id_usuario = $1';
      params.push(id_usuario);
    }

    query += ' ORDER BY ds.id_detalle ASC';

    const { rows } = await pool.query(query, params);
    return rows;
  }

  // Consultar detalles de una solicitud.
  // Si se recibe id_usuario, verifica que la solicitud sea suya.
  static async getBySolicitudId(id_solicitud, id_usuario = null) {
    let query = `
      SELECT ds.id_detalle, ds.id_solicitud,
             ds.cantidad_solicitada, ds.cantidad_entregada,
             m.nombre AS material
      FROM detalle_solicitud ds
      JOIN material m ON ds.id_material = m.id_material
      JOIN solicitud s ON ds.id_solicitud = s.id_solicitud
      WHERE ds.id_solicitud = $1
    `;

    const params = [id_solicitud];

    if (id_usuario !== null) {
      query += ' AND s.id_usuario = $2';
      params.push(id_usuario);
    }

    const { rows } = await pool.query(query, params);
    return rows;
  }

  // Verificar si una solicitud pertenece a un docente.
  static async perteneceAUsuario(id_solicitud, id_usuario) {
    const query = `
      SELECT id_solicitud
      FROM solicitud
      WHERE id_solicitud = $1 AND id_usuario = $2;
    `;

    const { rows } = await pool.query(query, [id_solicitud, id_usuario]);
    return rows.length > 0;
  }

  static async create(
    id_solicitud,
    id_material,
    cantidad_solicitada,
    cantidad_entregada = 0
  ) {
    const query = `
      INSERT INTO detalle_solicitud
        (id_solicitud, id_material, cantidad_solicitada, cantidad_entregada)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [
      id_solicitud,
      id_material,
      cantidad_solicitada,
      cantidad_entregada
    ]);

    return rows[0];
  }

  static async update(id, cantidad_solicitada, cantidad_entregada) {
    const query = `
      UPDATE detalle_solicitud
      SET cantidad_solicitada = $1, cantidad_entregada = $2
      WHERE id_detalle = $3
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [
      cantidad_solicitada,
      cantidad_entregada,
      id
    ]);

    return rows[0];
  }

  static async delete(id) {
    const query = `
      DELETE FROM detalle_solicitud
      WHERE id_detalle = $1
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = DetalleSolicitudModel;
