
const pool = require('../config/db');

class MovimientoModel {

  // Administrador: todos los movimientos.
  // Docente: solamente los propios.
  static async getAll(id_usuario = null) {
    let query = `
      SELECT mov.id_movimiento, mov.tipo_movimiento,
             mov.fecha, mov.cantidad, mov.observaciones,
             m.nombre AS material,
             u.nombre || ' ' || u.apellido AS usuario
      FROM movimiento mov
      JOIN material m ON mov.id_material = m.id_material
      JOIN usuario u ON mov.id_usuario = u.id_usuario
    `;

    const params = [];

    if (id_usuario !== null) {
      query += ' WHERE mov.id_usuario = $1';
      params.push(id_usuario);
    }

    query += ' ORDER BY mov.id_movimiento ASC';

    const { rows } = await pool.query(query, params);
    return rows;
  }

  static async getById(id, id_usuario = null) {
    let query = `
      SELECT mov.id_movimiento, mov.tipo_movimiento,
             mov.fecha, mov.cantidad, mov.observaciones,
             m.nombre AS material,
             u.nombre || ' ' || u.apellido AS usuario
      FROM movimiento mov
      JOIN material m ON mov.id_material = m.id_material
      JOIN usuario u ON mov.id_usuario = u.id_usuario
      WHERE mov.id_movimiento = $1
    `;

    const params = [id];

    if (id_usuario !== null) {
      query += ' AND mov.id_usuario = $2';
      params.push(id_usuario);
    }

    const { rows } = await pool.query(query, params);
    return rows[0];
  }

  static async create(tipo_movimiento, cantidad, observaciones, id_material, id_usuario) {
    const query = `
      INSERT INTO movimiento
        (tipo_movimiento, cantidad, observaciones, id_material, id_usuario)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [
      tipo_movimiento,
      cantidad,
      observaciones,
      id_material,
      id_usuario
    ]);

    return rows[0];
  }

  static async delete(id) {
    const query = `
      DELETE FROM movimiento
      WHERE id_movimiento = $1
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = MovimientoModel;
