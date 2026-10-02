const pool = require('../config/db');

class DetalleSolicitudModel {
  static async getAll() {
    const query = `
      SELECT ds.id_detalle, ds.id_solicitud, ds.cantidad_solicitada, ds.cantidad_entregada,
             m.nombre AS material
      FROM detalle_solicitud ds
      JOIN material m ON ds.id_material = m.id_material
      ORDER BY ds.id_detalle ASC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getBySolicitudId(id_solicitud) {
    const query = `
      SELECT ds.id_detalle, ds.id_solicitud, ds.cantidad_solicitada, ds.cantidad_entregada,
             m.nombre AS material
      FROM detalle_solicitud ds
      JOIN material m ON ds.id_material = m.id_material
      WHERE ds.id_solicitud = $1;
    `;
    const { rows } = await pool.query(query, [id_solicitud]);
    return rows;
  }

  static async create(id_solicitud, id_material, cantidad_solicitada, cantidad_entregada = 0) {
    const query = `
      INSERT INTO detalle_solicitud (id_solicitud, id_material, cantidad_solicitada, cantidad_entregada)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const { rows } = await pool.query(query, [id_solicitud, id_material, cantidad_solicitada, cantidad_entregada]);
    return rows[0];
  }

  static async update(id, cantidad_solicitada, cantidad_entregada) {
    const query = `
      UPDATE detalle_solicitud
      SET cantidad_solicitada = $1, cantidad_entregada = $2
      WHERE id_detalle = $3 RETURNING *;
    `;
    const { rows } = await pool.query(query, [cantidad_solicitada, cantidad_entregada, id]);
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM detalle_solicitud WHERE id_detalle = $1 RETURNING *;', [id]);
    return rows[0];
  }
}

module.exports = DetalleSolicitudModel;