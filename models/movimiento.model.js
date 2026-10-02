const pool = require('../config/db');

class MovimientoModel {
  static async getAll() {
    const query = `
      SELECT mov.id_movimiento, mov.tipo_movimiento, mov.fecha, mov.cantidad, mov.observaciones,
             m.nombre AS material, u.nombre || ' ' || u.apellido AS usuario
      FROM movimiento mov
      JOIN material m ON mov.id_material = m.id_material
      JOIN usuario u ON mov.id_usuario = u.id_usuario
      ORDER BY mov.id_movimiento ASC;
    `;
    const { rows } = await pool.query(query);
    return rows;
  }

  static async getById(id) {
    const query = `
      SELECT mov.id_movimiento, mov.tipo_movimiento, mov.fecha, mov.cantidad, mov.observaciones,
             m.nombre AS material, u.nombre || ' ' || u.apellido AS usuario
      FROM movimiento mov
      JOIN material m ON mov.id_material = m.id_material
      JOIN usuario u ON mov.id_usuario = u.id_usuario
      WHERE mov.id_movimiento = $1;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async create(tipo_movimiento, cantidad, observaciones, id_material, id_usuario) {
    const query = `
      INSERT INTO movimiento (tipo_movimiento, cantidad, observaciones, id_material, id_usuario)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const { rows } = await pool.query(query, [tipo_movimiento, cantidad, observaciones, id_material, id_usuario]);
    return rows[0];
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM movimiento WHERE id_movimiento = $1 RETURNING *;', [id]);
    return rows[0];
  }
}

module.exports = MovimientoModel;